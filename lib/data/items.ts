"use server";

import { createClient } from "@/lib/supabase/server";
import type { Item } from "@/lib/types";

const BUCKET_NAME = "item-images";

export async function uploadItemImage(formData: FormData): Promise<{ url?: string; error?: string }> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: "Not authenticated" };

    const file = formData.get("file") as File;
    if (!file) return { error: "No file provided" };

    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const fileName = `${user.id}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, file, { contentType: file.type, upsert: false });

    if (uploadError) return { error: uploadError.message };

    const { data: urlData } = supabase.storage.from(BUCKET_NAME).getPublicUrl(fileName);
    return { url: urlData.publicUrl };
  } catch {
    return { error: "Upload failed" };
  }
}

export async function getItems(options?: {
  category?: string;
  search?: string;
  sortBy?: string;
  limit?: number;
}): Promise<Item[]> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    let query = supabase
      .from("items")
      .select("*, owner:profiles!owner_id(id, full_name, university, avatar_url)");

    if (options?.category) {
      query = query.eq("category", options.category);
    }

    if (options?.search) {
      query = query.ilike("title", `%${options.search}%`);
    }

    switch (options?.sortBy) {
      case "price-low":
        query = query.order("price", { ascending: true });
        break;
      case "price-high":
        query = query.order("price", { ascending: false });
        break;
      case "newest":
        query = query.order("created_at", { ascending: false });
        break;
      default:
        query = query.order("created_at", { ascending: false });
    }

    if (options?.limit) {
      query = query.limit(options.limit);
    }

    const { data: items } = await query;
    if (!items) return [];

    if (user) {
      const { data: favorites } = await supabase
        .from("favorites")
        .select("item_id")
        .eq("user_id", user.id);

      const favIds = new Set((favorites || []).map((f: { item_id: string }) => f.item_id));
      return items.map((item: Item) => ({ ...item, is_favorite: favIds.has(item.id) }));
    }

    return items;
  } catch {
    return [];
  }
}

export async function getItemById(id: string): Promise<Item | null> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("items")
      .select("*, owner:profiles!owner_id(id, full_name, university, avatar_url, location)")
      .eq("id", id)
      .single();
    return data;
  } catch {
    return null;
  }
}

export async function getUserItems(): Promise<Item[]> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data } = await supabase
      .from("items")
      .select("*")
      .eq("owner_id", user.id)
      .order("created_at", { ascending: false });

    return data || [];
  } catch {
    return [];
  }
}

export async function createItem(itemData: {
  title: string;
  description?: string;
  category: string;
  price: number;
  rental_period: string;
  condition: string;
  location?: string;
  deposit?: number;
  availability_date?: string;
  image_paths?: string[];
}) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: "Not authenticated" };

    const { data, error } = await supabase
      .from("items")
      .insert({ ...itemData, owner_id: user.id })
      .select()
      .single();

    if (error) return { error: error.message };
    return { success: true, data };
  } catch {
    return { error: "An unexpected error occurred" };
  }
}

export async function updateItem(id: string, updates: Partial<Item>) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: "Not authenticated" };

    const { error } = await supabase
      .from("items")
      .update(updates)
      .eq("id", id)
      .eq("owner_id", user.id);

    if (error) return { error: error.message };
    return { success: true };
  } catch {
    return { error: "An unexpected error occurred" };
  }
}

export async function deleteItem(id: string) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: "Not authenticated" };

    const { error } = await supabase
      .from("items")
      .delete()
      .eq("id", id)
      .eq("owner_id", user.id);

    if (error) return { error: error.message };
    return { success: true };
  } catch {
    return { error: "An unexpected error occurred" };
  }
}

export async function getItemCount(): Promise<number> {
  try {
    const supabase = await createClient();
    const { count } = await supabase
      .from("items")
      .select("*", { count: "exact", head: true })
      .eq("available", true);
    return count || 0;
  } catch {
    return 0;
  }
}
