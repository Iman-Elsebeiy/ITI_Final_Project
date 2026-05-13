function getRequiredEnv(key: string): string {
  const value = process.env[key as keyof NodeJS.ProcessEnv];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

const publishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!publishableKey) {
  throw new Error(
    "Missing required environment variable: NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY"
  );
}

const env = {
  NEXT_PUBLIC_SUPABASE_URL: getRequiredEnv("NEXT_PUBLIC_SUPABASE_URL"),
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: publishableKey,
  SUPABASE_SERVICE_ROLE_KEY: getRequiredEnv("SUPABASE_SERVICE_ROLE_KEY"),
  NEXT_PUBLIC_APP_URL: getRequiredEnv("NEXT_PUBLIC_APP_URL"),
  SUPABASE_ITEM_IMAGES_BUCKET: getRequiredEnv("SUPABASE_ITEM_IMAGES_BUCKET"),
  SUPABASE_STUDENT_IDS_BUCKET: getRequiredEnv("SUPABASE_STUDENT_IDS_BUCKET"),
  SUPABASE_AVATARS_BUCKET: getRequiredEnv("SUPABASE_AVATARS_BUCKET"),
};

export default env;
