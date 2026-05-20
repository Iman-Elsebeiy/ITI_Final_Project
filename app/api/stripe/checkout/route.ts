"use server";

import { NextRequest, NextResponse } from "next/server";
import { getUncachableStripeClient } from "@/lib/stripe/client";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const body = await req.json();
    const { item_id, lender_id, total_price, start_date, end_date, pickup_location, item_title } = body;

    if (!item_id || !lender_id || !total_price || !start_date || !end_date) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const stripe = await getUncachableStripeClient();

    // Use hardcoded production URL env var, fallback to request origin for dev
    const appUrl = process.env.APP_PRODUCTION_URL ||
      `${req.headers.get("x-forwarded-proto") || "https"}://${req.headers.get("x-forwarded-host") || req.headers.get("host") || req.nextUrl.host}`;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "egp",
            unit_amount: Math.round(total_price * 100),
            product_data: {
              name: `Rent: ${item_title}`,
              description: `From ${start_date} to ${end_date}`,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        item_id,
        lender_id,
        borrower_id: user.id,
        total_price: String(total_price),
        start_date,
        end_date,
        pickup_location: pickup_location || "",
      },
      success_url: `${appUrl}/rental-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/item/${item_id}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
