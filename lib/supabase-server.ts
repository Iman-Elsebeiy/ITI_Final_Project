import { createServerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import env from "./env";

export const createSupabaseServer = async () =>
  createServerClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY, {
    cookies: await cookies(),
  });
