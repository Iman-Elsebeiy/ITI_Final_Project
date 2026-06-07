import { createAdminClient } from "@/lib/supabase/admin";

type AdminClient = ReturnType<typeof createAdminClient>;

const PLATFORM_FEE_RATE = 0.1;

/**
 * Fulfill a paid Stripe Checkout session. Shared by the confirm route
 * (synchronous, the real fulfillment path) and the webhook. Idempotent:
 * keyed on the rental's `stripe_session_id`.
 *
 * Side effects on first run:
 *  - creates the rental/sale record (with 10% platform fee)
 *  - marks the item unavailable
 *  - notifies both the seller/lender and the buyer/borrower
 *  - opens a conversation between the two parties with a greeting message
 */
export async function fulfillCheckoutSession(
  session: { id: string; metadata?: Record<string, string> | null }
): Promise<{ error?: string; alreadyProcessed?: boolean }> {
  const meta = session.metadata || {};
  if (!meta.item_id || !meta.borrower_id || !meta.lender_id) {
    return { error: "Missing metadata" };
  }

  const supabase = createAdminClient();

  const isSale = meta.transaction_type === "sale";
  const totalPrice = parseFloat(meta.total_price);
  const platformFee = Math.round(totalPrice * PLATFORM_FEE_RATE * 100) / 100;

  // Idempotency: bail out if this checkout session was already processed.
  const { data: existing } = await supabase
    .from("rentals")
    .select("id")
    .eq("stripe_session_id", session.id)
    .maybeSingle();

  if (existing) {
    return { alreadyProcessed: true };
  }

  const { data: rental, error: rentalError } = await supabase
    .from("rentals")
    .insert({
      item_id: meta.item_id,
      renter_id: meta.borrower_id,
      owner_id: meta.lender_id,
      borrower_id: meta.borrower_id,
      lender_id: meta.lender_id,
      transaction_type: isSale ? "sale" : "rent",
      total_price: totalPrice,
      platform_fee: platformFee,
      start_date: isSale ? null : meta.start_date || null,
      end_date: isSale ? null : meta.end_date || null,
      pickup_location: meta.pickup_location || null,
      stripe_session_id: session.id,
      status: "active",
    })
    .select("id")
    .single();

  if (rentalError || !rental) {
    // 23505 = unique_violation on stripe_session_id: a concurrent confirm/webhook
    // already created this rental. Treat as already-processed, not an error.
    if ((rentalError as { code?: string } | null)?.code === "23505") {
      return { alreadyProcessed: true };
    }
    console.error("Rental insert error:", rentalError);
    return { error: rentalError?.message || "Failed to create rental" };
  }

  // Mark item unavailable (sales are permanently sold) and grab its title.
  const { data: item } = await supabase
    .from("items")
    .update({ available: false })
    .eq("id", meta.item_id)
    .select("title")
    .maybeSingle();
  const itemTitle = item?.title || "the item";

  // Notify the seller / lender and the buyer / borrower.
  await supabase.from("notifications").insert([
    {
      user_id: meta.lender_id,
      type: "rental",
      actor_id: meta.borrower_id,
      item_id: meta.item_id,
      rental_id: rental.id,
      content: isSale ? "Someone bought your item!" : "Someone rented your item!",
    },
    {
      user_id: meta.borrower_id,
      type: "rental",
      actor_id: meta.lender_id,
      item_id: meta.item_id,
      rental_id: rental.id,
      content: isSale ? "Your purchase is confirmed!" : "Your rental is confirmed!",
    },
  ]);

  // Open a conversation between buyer and seller so they can coordinate.
  await ensureConversation(supabase, meta.borrower_id, meta.lender_id, itemTitle, isSale);

  return {};
}

async function ensureConversation(
  supabase: AdminClient,
  buyerId: string,
  sellerId: string,
  itemTitle: string,
  isSale: boolean
) {
  try {
    let conversationId: string | null = null;

    // Look for an existing conversation shared by the two parties.
    const { data: buyerParts } = await supabase
      .from("conversation_participants")
      .select("conversation_id")
      .eq("user_id", buyerId);

    if (buyerParts && buyerParts.length > 0) {
      const ids = buyerParts.map((p: { conversation_id: string }) => p.conversation_id);
      const { data: shared } = await supabase
        .from("conversation_participants")
        .select("conversation_id")
        .eq("user_id", sellerId)
        .in("conversation_id", ids);
      if (shared && shared.length > 0) {
        conversationId = shared[0].conversation_id;
      }
    }

    if (!conversationId) {
      const { data: conv, error: convError } = await supabase
        .from("conversations")
        .insert({})
        .select("id")
        .single();
      if (convError || !conv) {
        console.error("Conversation create error:", convError);
        return;
      }
      conversationId = conv.id;
      await supabase.from("conversation_participants").insert([
        { conversation_id: conversationId, user_id: buyerId },
        { conversation_id: conversationId, user_id: sellerId },
      ]);
    }

    // Seller greets the buyer to kick off coordination.
    const greeting = isSale
      ? `Hi! Thanks for buying "${itemTitle}". Let's arrange the handover here.`
      : `Hi! Thanks for renting "${itemTitle}". Let's coordinate pickup and return here.`;

    await supabase.from("messages").insert({
      conversation_id: conversationId,
      sender_id: sellerId,
      content: greeting,
    });
    await supabase
      .from("conversations")
      .update({ updated_at: new Date().toISOString() })
      .eq("id", conversationId);

    // Let the buyer know they have a message waiting.
    await supabase.from("notifications").insert({
      user_id: buyerId,
      type: "message",
      actor_id: sellerId,
      content: "You have a new message",
    });
  } catch (err) {
    console.error("ensureConversation error:", err);
  }
}
