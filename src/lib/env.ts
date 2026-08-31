export const env = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  supabasePublishableKey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
};

export function requirePublicEnv() {
  if (!env.supabaseUrl || !env.supabasePublishableKey) throw new Error("Supabase environment is not configured");
  return env;
}
