"use server";

import { createClient } from "@/lib/supabase/server";
import type { Rental } from "@/lib/types";

export async function getUserRentals(options?: {
  type?: "borrowed" | "lended" | "all";
  status?: string;
  search?: string;
}): Promise<Rental[]> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    let query = supabase
      .from("rentals")
      .select(`
        *,
        item:items(id, title, image_paths, category),
        borrower:profiles!borrower_id(id, full_name, avatar_url),
        lender:profiles!lender_id(id, full_name, avatar_url)
      `)
      .or(`borrower_id.eq.${user.id},lender_id.eq.${user.id}`);

    if (options?.status && options.status !== "all") {
      query = query.eq("status", options.status);
    }

    if (options?.search) {
      query = query.ilike("item.title", `%${options.search}%`);
    }

    query = query.order("created_at", { ascending: false });

    const { data } = await query;

    if (!data) return [];

    return data.map((rental: Rental & { borrower_id: string; lender_id: string }) => ({
      ...rental,
      _type: rental.borrower_id === user.id ? "borrowed" : "lended",
    }));
  } catch {
    return [];
  }
}

export async function getRentalHistory(): Promise<Rental[]> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data } = await supabase
      .from("rentals")
      .select(`
        *,
        item:items(id, title, image_paths, category),
        borrower:profiles!borrower_id(id, full_name, avatar_url),
        lender:profiles!lender_id(id, full_name, avatar_url)
      `)
      .or(`borrower_id.eq.${user.id},lender_id.eq.${user.id}`)
      .in("status", ["completed", "cancelled"])
      .order("updated_at", { ascending: false });

    if (!data) return [];

    return data.map((rental: Rental & { borrower_id: string; lender_id: string }) => ({
      ...rental,
      _type: rental.borrower_id === user.id ? "borrowed" : "lended",
    }));
  } catch {
    return [];
  }
}

export async function createRental(rentalData: {
  item_id: string;
  lender_id: string;
  total_price: number;
  start_date: string;
  end_date: string;
  pickup_location?: string;
}) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: "Not authenticated" };

    const { data, error } = await supabase
      .from("rentals")
      .insert({ ...rentalData, borrower_id: user.id })
      .select()
      .single();

    if (error) return { error: error.message };
    return { success: true, data };
  } catch {
    return { error: "An unexpected error occurred" };
  }
}

export async function updateRentalStatus(id: string, status: string) {
  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from("rentals")
      .update({ status })
      .eq("id", id);

    if (error) return { error: error.message };
    return { success: true };
  } catch {
    return { error: "An unexpected error occurred" };
  }
}

export async function getRentalStats() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { activeRentals: 0, totalEarnings: 0, totalSpent: 0, itemsListed: 0 };

    const [activeRes, earningsRes, spentRes, itemsRes] = await Promise.all([
      supabase.from("rentals").select("*", { count: "exact", head: true })
        .or(`borrower_id.eq.${user.id},lender_id.eq.${user.id}`)
        .eq("status", "active"),
      supabase.from("rentals").select("total_price")
        .eq("lender_id", user.id).eq("status", "completed"),
      supabase.from("rentals").select("total_price")
        .eq("borrower_id", user.id).eq("status", "completed"),
      supabase.from("items").select("*", { count: "exact", head: true })
        .eq("owner_id", user.id),
    ]);

    const totalEarnings = (earningsRes.data || []).reduce((sum: number, r: { total_price: number }) => sum + r.total_price, 0);
    const totalSpent = (spentRes.data || []).reduce((sum: number, r: { total_price: number }) => sum + r.total_price, 0);

    return {
      activeRentals: activeRes.count || 0,
      totalEarnings,
      totalSpent,
      itemsListed: itemsRes.count || 0,
    };
  } catch {
    return { activeRentals: 0, totalEarnings: 0, totalSpent: 0, itemsListed: 0 };
  }
}
