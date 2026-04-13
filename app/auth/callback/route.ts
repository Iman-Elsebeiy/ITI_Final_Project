import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

const ALLOWED_REDIRECTS = ["/home", "/forgot-password", "/setup", "/profile", "/settings"];

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const rawNext = searchParams.get("next") ?? "/setup";

  const next = ALLOWED_REDIRECTS.includes(rawNext) ? rawNext : "/home";

  if (code) {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error && data.user) {
        const admin = createAdminClient();
        const { data: existingProfile } = await admin
          .from("profiles")
          .select("id")
          .eq("id", data.user.id)
          .single();

        if (!existingProfile) {
          const meta = data.user.user_metadata || {};
          const { error: profileError } = await admin.from("profiles").insert({
            id: data.user.id,
            email: data.user.email || "",
            full_name: meta.full_name || "",
            university: meta.university || "",
            faculty: meta.faculty || "",
          });
          if (profileError) {
            console.error("Callback profile insert error:", profileError);
          }
          const { error: settingsError } = await admin.from("user_settings").upsert({ id: data.user.id });
          if (settingsError) {
            console.error("Callback settings upsert error:", settingsError);
          }
        }

        return NextResponse.redirect(`${origin}${next}`);
      }
    } catch {
      return NextResponse.redirect(`${origin}/login?error=auth_failed`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth_failed`);
}
