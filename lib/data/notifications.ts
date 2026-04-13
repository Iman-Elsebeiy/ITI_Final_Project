"use server";

import { createClient } from "@/lib/supabase/server";

export async function getNotifications() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data } = await supabase
      .from("notifications")
      .select("*, actor:profiles!actor_id(id, full_name, avatar_url), item:items!item_id(id, title)")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(20);

    return data || [];
  } catch {
    return [];
  }
}

export async function markNotificationRead(id: string) {
  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("id", id);

    if (error) return { error: error.message };
    return { success: true };
  } catch {
    return { error: "An unexpected error occurred" };
  }
}

export async function getUnreadNotificationCount(): Promise<number> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return 0;

    const { count } = await supabase
      .from("notifications")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)
      .eq("is_read", false);

    return count || 0;
  } catch {
    return 0;
  }
}
