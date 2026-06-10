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

export async function uploadAvatar(formData: FormData) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: "Not authenticated" };

    const file = formData.get("avatar") as File;
    if (!file || file.size === 0) return { error: "No file provided" };
    if (file.size > 5 * 1024 * 1024) return { error: "File too large. Max size is 5MB" };

    const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
    const allowed = ["jpg", "jpeg", "png", "gif", "webp"];
    if (!allowed.includes(ext)) return { error: "Invalid file type. Use JPG, PNG, GIF or WebP" };

    const admin = createAdminClient();

    // Ensure bucket exists
    const { data: buckets } = await admin.storage.listBuckets();
    const bucketExists = buckets?.some((b) => b.name === "avatars");
    if (!bucketExists) {
      await admin.storage.createBucket("avatars", { public: true, fileSizeLimit: 5242880 });
    }

    const path = `${user.id}/avatar.${ext}`;
    const bytes = await file.arrayBuffer();

    const { error: uploadError } = await admin.storage
      .from("avatars")
      .upload(path, bytes, {
        contentType: file.type,
        upsert: true,
      });

    if (uploadError) return { error: uploadError.message };

    const { data: { publicUrl } } = admin.storage.from("avatars").getPublicUrl(path);

    const avatarUrl = `${publicUrl}?t=${Date.now()}`;

    const { error: updateError } = await admin
      .from("profiles")
      .update({ avatar_url: avatarUrl })
      .eq("id", user.id);

    if (updateError) return { error: updateError.message };

    return { success: true, avatarUrl };
  } catch {
    return { error: "An unexpected error occurred" };
  }
}

export async function removeAvatar() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: "Not authenticated" };

    const admin = createAdminClient();

    // Try to remove all common extensions
    await admin.storage.from("avatars").remove([
      `${user.id}/avatar.jpg`,
      `${user.id}/avatar.jpeg`,
      `${user.id}/avatar.png`,
      `${user.id}/avatar.gif`,
      `${user.id}/avatar.webp`,
    ]);

    const { error } = await admin
      .from("profiles")
      .update({ avatar_url: null })
      .eq("id", user.id);

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

    // Hard delete: remove the profile row (cascades to the user's items,
    // rentals, favorites, etc. via FKs) and then the auth user itself. This
    // frees up the email address so the person can sign up again later — a
    // soft delete (deleted_at) left the auth user behind and blocked re-signup.
    await admin.from("profiles").delete().eq("id", user.id);
    const { error } = await admin.auth.admin.deleteUser(user.id);

    if (error) return { error: error.message };

    await supabase.auth.signOut();
    return { success: true };
  } catch {
    return { error: "An unexpected error occurred" };
  }
}
