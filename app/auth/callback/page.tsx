"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();

    const handleCallback = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error || !session) {
        router.replace("/login?error=auth_failed");
        return;
      }

      const userId = session.user.id;

      const { data: profile } = await supabase
        .from("profiles")
        .select("id, role, university")
        .eq("id", userId)
        .single();

      if (!profile) {
        const meta = session.user.user_metadata || {};
        await supabase.from("profiles").insert({
          id: userId,
          email: session.user.email || "",
          full_name: meta.full_name || meta.name || "",
          university: meta.university || "",
          faculty: meta.faculty || "",
        });
        await supabase.from("user_settings").upsert({ id: userId });
        router.replace("/setup");
        return;
      }

      if (profile.role === "admin") {
        router.replace("/admin");
        return;
      }

      router.replace("/home");
    };

    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        handleCallback();
      } else if (event === "INITIAL_SESSION") {
        if (session) {
          handleCallback();
        } else {
          router.replace("/login?error=auth_failed");
        }
      }
    });
  }, [router]);

  return (
    <div className="min-h-screen bg-[#F1F3F5] flex items-center justify-center">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-md mb-4">
          <svg className="animate-spin h-8 w-8 text-[#1DA5A6]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-[#2C2C2C]">Signing you in...</h2>
        <p className="text-sm text-[#2C2C2C]/50 mt-1">Please wait</p>
      </div>
    </div>
  );
}
