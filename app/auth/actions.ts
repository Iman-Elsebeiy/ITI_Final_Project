"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { redirect } from "next/navigation";

export async function login(formData: { email: string; password: string }) {
  try {
    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      if (error.message === "Invalid login credentials") {
        return { error: "Invalid email or password. If you don't have an account, please sign up first." };
      }
      if (error.message === "Email not confirmed") {
        return { error: "Please check your email and confirm your account before signing in." };
      }
      return { error: error.message };
    }

    return { success: true };
  } catch {
    return { error: "An unexpected error occurred. Please try again." };
  }
}

export async function signup(formData: {
  email: string;
  password: string;
  fullName: string;
  university: string;
  faculty: string;
}) {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          full_name: formData.fullName,
          university: formData.university,
          faculty: formData.faculty,
        },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:5000"}/auth/callback?next=/setup`,
      },
    });

    if (error) {
      if (error.message?.includes("already registered")) {
        return { error: "This email is already registered. Please sign in instead." };
      }
      return { error: error.message };
    }

    if (!data.user) {
      return { error: "Signup failed. Please try again." };
    }

    const userId = data.user.id;
    const admin = createAdminClient();

    if (!data.session) {
      await admin.auth.admin.updateUserById(userId, {
        email_confirm: true,
      });
    }

    const { data: existingProfile } = await admin
      .from("profiles")
      .select("id")
      .eq("id", userId)
      .single();

    if (!existingProfile) {
      const { error: profileError } = await admin.from("profiles").insert({
        id: userId,
        email: formData.email,
        full_name: formData.fullName,
        university: formData.university,
        faculty: formData.faculty,
      });
      if (profileError) {
        console.error("Profile insert error:", profileError);
        return { error: "Failed to create profile. Please try again." };
      }
      const { error: settingsError } = await admin.from("user_settings").upsert({ id: userId });
      if (settingsError) {
        console.error("Settings insert error:", settingsError);
      }
    }

    if (!data.session) {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
      if (signInError) {
        return { error: signInError.message };
      }
    }

    return { success: true };
  } catch {
    return { error: "An unexpected error occurred. Please try again." };
  }
}

export async function logout() {
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
  } catch {
    // Sign out failed but we still redirect to login
  }
  redirect("/login");
}

export async function forgotPassword(email: string) {
  try {
    const supabase = await createClient();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:5000"}/auth/callback?next=/forgot-password`,
    });

    if (error) {
      return { error: error.message };
    }

    return { success: true };
  } catch {
    return { error: "An unexpected error occurred. Please try again." };
  }
}

export async function resetPassword(password: string) {
  try {
    const supabase = await createClient();

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      return { error: error.message };
    }

    return { success: true };
  } catch {
    return { error: "An unexpected error occurred. Please try again." };
  }
}
