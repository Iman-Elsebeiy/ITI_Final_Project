import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

const ALLOWED_REDIRECTS = ["/home", "/forgot-password", "/setup", "/profile", "/settings", "/admin"];

function getOrigin(request: Request): string {
  const forwardedHost = request.headers.get("x-forwarded-host");
  const forwardedProto = request.headers.get("x-forwarded-proto") || "https";
  const host = request.headers.get("host");

  if (forwardedHost) {
    return `${forwardedProto}://${forwardedHost}`;
  }
  if (host && !host.includes("0.0.0.0")) {
    const proto = host.includes("localhost") ? "http" : "https";
    return `${proto}://${host}`;
  }
  return "https://ef56ebb3-2ce1-4dec-8167-5daa1513dfea-00-1oty1kskkkchh.spock.replit.dev";
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const rawNext = searchParams.get("next") ?? "/home";
  const next = ALLOWED_REDIRECTS.includes(rawNext) ? rawNext : "/home";
  const origin = getOrigin(request);

  if (code) {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);

      if (!error && data.user) {
        const admin = createAdminClient();

        const { data: existingProfile } = await admin
          .from("profiles")
          .select("id, role")
          .eq("id", data.user.id)
          .single();

        if (!existingProfile) {
          const meta = data.user.user_metadata || {};
          await admin.from("profiles").insert({
            id: data.user.id,
            email: data.user.email || "",
            full_name: meta.full_name || meta.name || "",
            university: "",
            faculty: "",
          });
          await admin.from("user_settings").upsert({ id: data.user.id });
          return NextResponse.redirect(`${origin}/setup`);
        }

        if (existingProfile.role === "admin") {
          return NextResponse.redirect(`${origin}/admin`);
        }

        return NextResponse.redirect(`${origin}${next}`);
      }

      console.error("exchangeCodeForSession error:", error);
    } catch (e) {
      console.error("Callback exception:", e);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth_failed`);
}
