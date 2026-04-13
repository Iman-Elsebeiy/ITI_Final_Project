export const publicEnv = {
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "",
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || "",
  NEXT_PUBLIC_SUPABASE_ITEM_IMAGES_BUCKET:
    process.env.NEXT_PUBLIC_SUPABASE_ITEM_IMAGES_BUCKET ||
    process.env.SUPABASE_ITEM_IMAGES_BUCKET ||
    "",
  NEXT_PUBLIC_SUPABASE_STUDENT_IDS_BUCKET:
    process.env.NEXT_PUBLIC_SUPABASE_STUDENT_IDS_BUCKET ||
    process.env.SUPABASE_STUDENT_IDS_BUCKET ||
    "",
  NEXT_PUBLIC_SUPABASE_AVATARS_BUCKET:
    process.env.NEXT_PUBLIC_SUPABASE_AVATARS_BUCKET ||
    process.env.SUPABASE_AVATARS_BUCKET ||
    "",
};

if (!publicEnv.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error("Missing public environment variable: NEXT_PUBLIC_SUPABASE_URL");
}

if (!publicEnv.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) {
  throw new Error(
    "Missing public environment variable: NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"
  );
}

if (!publicEnv.NEXT_PUBLIC_APP_URL) {
  throw new Error(
    "Missing public environment variable: NEXT_PUBLIC_APP_URL"
  );
}
