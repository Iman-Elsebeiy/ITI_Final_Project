import { NextRequest, NextResponse } from "next/server";
import { getUncachableStripeClient } from "@/lib/stripe/client";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const stripe = await getUncachableStripeClient();

    let event: any;
    try {
      event = JSON.parse(body);
    } catch {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
      const eventSession = event.data.object;
      if (!eventSession?.id) {
        return NextResponse.json({ received: true });
      }

      // Re-fetch the session from Stripe so a forged webhook payload cannot
      // create transactions — we only trust data Stripe itself returns.
      const session = await stripe.checkout.sessions.retrieve(eventSession.id);
      if (session.payment_status !== "paid") {
        return NextResponse.json({ received: true });
      }

      const meta = session.metadata as any;

      if (!meta?.item_id || !meta?.borrower_id || !meta?.lender_id) {
        return NextResponse.json({ received: true });
      }

      const supabase = createAdminClient();

      const isSale = meta.transaction_type === "sale";
      const totalPrice = parseFloat(meta.total_price);
      const platformFee = Math.round(totalPrice * 0.1 * 100) / 100;

      // Idempotency: skip if this checkout session was already processed
      const { data: existing } = await supabase
        .from("rentals")
        .select("id")
        .eq("stripe_session_id", session.id)
        .maybeSingle();

      if (existing) {
        return NextResponse.json({ received: true });
      }

      // Create the rental / sale record
      const { error: rentalError } = await supabase.from("rentals").insert({
        item_id: meta.item_id,
        renter_id: meta.borrower_id,
        owner_id: meta.lender_id,
        borrower_id: meta.borrower_id,
        lender_id: meta.lender_id,
        transaction_type: isSale ? "sale" : "rent",
        total_price: totalPrice,
        platform_fee: platformFee,
        start_date: isSale ? null : (meta.start_date || null),
        end_date: isSale ? null : (meta.end_date || null),
        pickup_location: meta.pickup_location || null,
        stripe_session_id: session.id,
        status: "active",
      });

      if (rentalError) {
        console.error("Rental insert error:", rentalError);
        return NextResponse.json({ error: rentalError.message }, { status: 500 });
      }

      // Mark item as unavailable (sales are permanently sold)
      await supabase.from("items").update({ available: false }).eq("id", meta.item_id);

      // Notify the lender / seller
      await supabase.from("notifications").insert({
        user_id: meta.lender_id,
        type: "rental",
        actor_id: meta.borrower_id,
        item_id: meta.item_id,
        content: isSale ? "Someone bought your item!" : "Someone rented your item!",
      });
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
