import { NextRequest, NextResponse } from "next/server";
import { getUncachableStripeClient } from "@/lib/stripe/client";
import { fulfillCheckoutSession } from "@/lib/stripe/fulfillment";

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

      const result = await fulfillCheckoutSession({
        id: session.id,
        metadata: session.metadata,
      });

      if (result.error) {
        return NextResponse.json({ error: result.error }, { status: 500 });
      }
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
