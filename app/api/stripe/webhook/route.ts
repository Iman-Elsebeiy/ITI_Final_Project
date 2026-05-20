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
      const session = event.data.object;
      const meta = session.metadata;

      if (!meta?.item_id || !meta?.borrower_id || !meta?.lender_id) {
        return NextResponse.json({ received: true });
      }

      const supabase = createAdminClient();

      // Create the rental
      const { error: rentalError } = await supabase.from("rentals").insert({
        item_id: meta.item_id,
        borrower_id: meta.borrower_id,
        lender_id: meta.lender_id,
        total_price: parseFloat(meta.total_price),
        start_date: meta.start_date,
        end_date: meta.end_date,
        pickup_location: meta.pickup_location || null,
        status: "active",
      });

      if (rentalError) {
        console.error("Rental insert error:", rentalError);
      }

      // Mark item as unavailable
      await supabase.from("items").update({ available: false }).eq("id", meta.item_id);

      // Notify the lender
      await supabase.from("notifications").insert({
        user_id: meta.lender_id,
        type: "rental",
        actor_id: meta.borrower_id,
        item_id: meta.item_id,
        content: "Someone rented your item!",
      });
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
