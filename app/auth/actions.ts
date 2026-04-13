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
    const admin = createAdminClient();

    // Use admin to create user directly — no confirmation email is sent
    const { data: newUser, error: createError } = await admin.auth.admin.createUser({
      email: formData.email,
      password: formData.password,
      email_confirm: true,
      user_metadata: {
        full_name: formData.fullName,
        university: formData.university,
        faculty: formData.faculty,
      },
    });

    if (createError) {
      if (createError.message?.includes("already registered") || createError.message?.includes("already been registered")) {
        return { error: "This email is already registered. Please sign in instead." };
      }
      return { error: createError.message };
    }

    if (!newUser.user) {
      return { error: "Signup failed. Please try again." };
    }

    const userId = newUser.user.id;

    // Create profile and settings
    const { error: profileError } = await admin.from("profiles").insert({
      id: userId,
      email: formData.email,
      full_name: formData.fullName,
      university: formData.university,
      faculty: formData.faculty,
    });
    if (profileError) {
      console.error("Profile insert error:", profileError);
      await admin.auth.admin.deleteUser(userId);
      return { error: "Failed to create profile. Please try again." };
    }

    const { error: settingsError } = await admin.from("user_settings").upsert({ id: userId });
    if (settingsError) {
      console.error("Settings insert error:", settingsError);
    }

    // Sign in the user on the regular client
    const supabase = await createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });
    if (signInError) {
      return { error: signInError.message };
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
