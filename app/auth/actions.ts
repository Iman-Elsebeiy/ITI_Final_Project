"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function login(formData: { email: string; password: string }) {
  try {
    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
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
      },
    });

    if (error) {
      return { error: error.message };
    }

    if (data.user && !data.session) {
      return { success: true, needsVerification: true };
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
