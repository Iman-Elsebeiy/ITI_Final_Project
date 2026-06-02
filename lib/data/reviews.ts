"use server";

import { createClient } from "@/lib/supabase/server";

export async function createReview(params: {
  rental_id: string;
  reviewed_id: string;
  rating: number;
  comment?: string;
}) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: "Not authenticated" };

    if (params.rating < 1 || params.rating > 5) {
      return { error: "Rating must be between 1 and 5" };
    }

    // Verify the current user is a participant of this rental and derive the
    // counterparty server-side so a reviewer can't review an arbitrary user.
    const { data: rental } = await supabase
      .from("rentals")
      .select("id, borrower_id, lender_id, status")
      .eq("id", params.rental_id)
      .single();

    if (!rental) return { error: "Order not found" };
    if (rental.borrower_id !== user.id && rental.lender_id !== user.id) {
      return { error: "You are not part of this order" };
    }
    if (rental.status !== "completed") {
      return { error: "You can only review completed orders" };
    }

    const reviewedId =
      rental.borrower_id === user.id ? rental.lender_id : rental.borrower_id;

    // One review per rental per reviewer
    const { data: existing } = await supabase
      .from("reviews")
      .select("id")
      .eq("rental_id", params.rental_id)
      .eq("reviewer_id", user.id)
      .maybeSingle();

    if (existing) return { error: "You already reviewed this order" };

    const { error } = await supabase.from("reviews").insert({
      rental_id: params.rental_id,
      reviewer_id: user.id,
      reviewed_id: reviewedId,
      rating: params.rating,
      comment: params.comment || null,
    });

    if (error) return { error: error.message };

    // Notify the reviewed user
    await supabase.from("notifications").insert({
      user_id: reviewedId,
      type: "review",
      actor_id: user.id,
      rental_id: params.rental_id,
      content: `You received a ${params.rating}-star review`,
    });

    return { success: true };
  } catch {
    return { error: "An unexpected error occurred" };
  }
}

export async function getReviewedRentalIds(): Promise<string[]> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data } = await supabase
      .from("reviews")
      .select("rental_id")
      .eq("reviewer_id", user.id);

    return (data || []).map((r: { rental_id: string }) => r.rental_id);
  } catch {
    return [];
  }
}
