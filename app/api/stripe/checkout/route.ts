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
    const { item_id, start_date, end_date, pickup_location } = body;

    if (!item_id) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Fetch the item server-side — never trust client-supplied price, type, or owner
    const { data: item, error: itemError } = await supabase
      .from("items")
      .select("id, title, owner_id, price, listing_type, rental_period, available")
      .eq("id", item_id)
      .single();

    if (itemError || !item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }
    if (!item.available) {
      return NextResponse.json({ error: "This item is no longer available" }, { status: 400 });
    }
    if (item.owner_id === user.id) {
      return NextResponse.json({ error: "You cannot buy or rent your own item" }, { status: 400 });
    }

    const txType = item.listing_type === "sale" ? "sale" : "rent";
    const lender_id = item.owner_id;
    const item_title = item.title;

    // Derive the authoritative total server-side
    let total_price: number;
    if (txType === "sale") {
      total_price = Number(item.price);
    } else {
      if (!start_date || !end_date) {
        return NextResponse.json({ error: "Missing rental dates" }, { status: 400 });
      }
      const days = Math.ceil(
        (new Date(end_date).getTime() - new Date(start_date).getTime()) / (1000 * 60 * 60 * 24)
      );
      if (!days || days <= 0) {
        return NextResponse.json({ error: "Invalid rental dates" }, { status: 400 });
      }
      const multiplier: Record<string, number> = {
        hourly: days * 24,
        daily: days,
        weekly: Math.ceil(days / 7),
        monthly: Math.ceil(days / 30),
        semester: 1,
      };
      total_price = Number(item.price) * (multiplier[item.rental_period] || days);
    }

    if (!total_price || total_price <= 0) {
      return NextResponse.json({ error: "Invalid price" }, { status: 400 });
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
              name: txType === "sale" ? `Buy: ${item_title}` : `Rent: ${item_title}`,
              description: txType === "sale" ? "One-time purchase" : `From ${start_date} to ${end_date}`,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        item_id,
        lender_id,
        borrower_id: user.id,
        transaction_type: txType,
        total_price: String(total_price),
        start_date: txType === "sale" ? "" : start_date,
        end_date: txType === "sale" ? "" : end_date,
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
