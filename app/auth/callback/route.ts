import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const ALLOWED_REDIRECTS = ["/home", "/forgot-password", "/setup", "/profile", "/settings"];

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const rawNext = searchParams.get("next") ?? "/home";

  const next = ALLOWED_REDIRECTS.includes(rawNext) ? rawNext : "/home";

  if (code) {
    try {
      const supabase = await createClient();
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error) {
        return NextResponse.redirect(`${origin}${next}`);
      }
    } catch {
      return NextResponse.redirect(`${origin}/login?error=auth_failed`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth_failed`);
}
