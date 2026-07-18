import type { SupabaseClient } from "@supabase/supabase-js";
import type { Profile } from "@/types/database";

/** Fetches the profile (and role) of the currently authenticated user, if any. */
export async function getCurrentProfile(supabase: SupabaseClient): Promise<Profile | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (error) throw error;
  return (data as Profile | null) ?? null;
}
