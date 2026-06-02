import { NextRequest, NextResponse } from "next/server";
import { getUncachableStripeClient } from "@/lib/stripe/client";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(req: NextRequest) {
  try {
    const sessionId = req.nextUrl.searchParams.get("session_id");
    if (!sessionId) return NextResponse.json({ error: "Missing session_id" }, { status: 400 });

    const stripe = await getUncachableStripeClient();
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json({ error: "Payment not completed" }, { status: 400 });
    }

    const meta = session.metadata as any;
    if (!meta?.item_id || !meta?.borrower_id || !meta?.lender_id) {
      return NextResponse.json({ error: "Missing metadata" }, { status: 400 });
    }

    const supabase = createAdminClient();

    const isSale = meta.transaction_type === "sale";
    const totalPrice = parseFloat(meta.total_price);
    const platformFee = Math.round(totalPrice * 0.1 * 100) / 100;

    // Check if a record already exists for this checkout session (webhook may have created it)
    const { data: existing } = await supabase
      .from("rentals")
      .select("id")
      .eq("stripe_session_id", sessionId)
      .maybeSingle();

    if (!existing) {
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
        stripe_session_id: sessionId,
        status: "active",
      });

      if (rentalError) {
        console.error("Rental insert error:", rentalError);
        return NextResponse.json({ error: rentalError.message }, { status: 500 });
      }

      // Mark item unavailable (sales are permanently sold)
      await supabase.from("items").update({ available: false }).eq("id", meta.item_id);

      // Notify lender / seller
      await supabase.from("notifications").insert({
        user_id: meta.lender_id,
        type: "rental",
        actor_id: meta.borrower_id,
        item_id: meta.item_id,
        content: isSale ? "Someone bought your item!" : "Someone rented your item!",
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Confirm error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
