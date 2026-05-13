import { createClient } from "@supabase/supabase-js";
import { publicEnv } from "./public-env";

export const supabaseBrowser = createClient(
  publicEnv.NEXT_PUBLIC_SUPABASE_URL,
  publicEnv.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      persistSession: true,
      storageKey: "supabase.auth.token",
    },
  }
);
