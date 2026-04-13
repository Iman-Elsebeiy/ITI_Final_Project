"use server";

import { createClient } from "@/lib/supabase/server";
import type { Item } from "@/lib/types";

export async function getUserFavorites(): Promise<(Item & { favorite_id: string; added_at: string })[]> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data } = await supabase
      .from("favorites")
      .select(`
        id,
        created_at,
        item:items(
          *,
          owner:profiles!owner_id(id, full_name, university, avatar_url)
        )
      `)
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (!data) return [];

    const results: (Item & { favorite_id: string; added_at: string })[] = [];
    for (const f of data) {
      const item = Array.isArray(f.item) ? f.item[0] : f.item;
      if (item) {
        results.push({ ...(item as Item), favorite_id: f.id, added_at: f.created_at, is_favorite: true });
      }
    }
    return results;
  } catch {
    return [];
  }
}

export async function toggleFavorite(itemId: string) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: "Not authenticated" };

    const { data: existing } = await supabase
      .from("favorites")
      .select("id")
      .eq("user_id", user.id)
      .eq("item_id", itemId)
      .single();

    if (existing) {
      const { error } = await supabase.from("favorites").delete().eq("id", existing.id);
      if (error) return { error: error.message };
      return { success: true, isFavorite: false };
    } else {
      const { error } = await supabase.from("favorites").insert({ user_id: user.id, item_id: itemId });
      if (error) return { error: error.message };
      return { success: true, isFavorite: true };
    }
  } catch {
    return { error: "An unexpected error occurred" };
  }
}

export async function getFavoriteCount(): Promise<number> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return 0;

    const { count } = await supabase
      .from("favorites")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id);

    return count || 0;
  } catch {
    return 0;
  }
}
