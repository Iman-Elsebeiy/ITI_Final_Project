"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Profile, UserSettings } from "@/lib/types";

export async function getCurrentProfile(): Promise<Profile | null> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    return data;
  } catch {
    return null;
  }
}

export async function getProfileById(id: string): Promise<Profile | null> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", id)
      .single();
    return data;
  } catch {
    return null;
  }
}

export async function updateProfile(updates: Partial<Profile>) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: "Not authenticated" };

    const { error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", user.id);

    if (error) return { error: error.message };
    return { success: true };
  } catch {
    return { error: "An unexpected error occurred" };
  }
}

export async function getUserSettings(): Promise<UserSettings | null> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data } = await supabase
      .from("user_settings")
      .select("*")
      .eq("id", user.id)
      .single();

    return data;
  } catch {
    return null;
  }
}

export async function updateUserSettings(updates: Partial<UserSettings>) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: "Not authenticated" };

    const { error } = await supabase
      .from("user_settings")
      .upsert({ id: user.id, ...updates });

    if (error) return { error: error.message };
    return { success: true };
  } catch {
    return { error: "An unexpected error occurred" };
  }
}

export async function deleteAccount() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: "Not authenticated" };

    const admin = createAdminClient();
    const { error } = await admin
      .from("profiles")
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", user.id);

    if (error) return { error: error.message };

    await supabase.auth.signOut();
    return { success: true };
  } catch {
    return { error: "An unexpected error occurred" };
  }
}
