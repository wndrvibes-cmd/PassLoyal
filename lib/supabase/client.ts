import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

// Read directly at build time so a Vercel build-cache hit can't keep an
// old NEXT_PUBLIC_SUPABASE_URL/ANON_KEY baked into a chunk whose source
// otherwise didn't change.
export const SUPABASE_URL: string = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_ANON_KEY: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

/** True once real Supabase keys have been set via env vars. */
export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

let browserClient: SupabaseClient | undefined;

/** Singleton Supabase client for use in client components. */
export function createSupabaseBrowserClient(): SupabaseClient {
  if (!browserClient) {
    browserClient = createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
  return browserClient;
}
