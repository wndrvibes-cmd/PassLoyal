import type { SupabaseClient } from "@supabase/supabase-js";
import { logEvent } from "@/services/adminAuditLogs";
import type { PlatformSettings } from "@/types/database";

export async function getOrCreatePlatformSettings(
  supabase: SupabaseClient
): Promise<PlatformSettings> {
  const { data: existing, error: fetchError } = await supabase
    .from("platform_settings")
    .select("*")
    .eq("is_singleton", true)
    .maybeSingle();

  if (fetchError) throw fetchError;
  if (existing) return existing as PlatformSettings;

  const { data: created, error: insertError } = await supabase
    .from("platform_settings")
    .insert({})
    .select("*")
    .single();

  if (insertError) throw insertError;
  return created as PlatformSettings;
}

export interface PlatformSettingsFormValues {
  platform_name: string;
  logo_url: string;
  support_email: string;
  maintenance_mode: boolean;
  wallet_default_primary_color: string;
  wallet_default_secondary_color: string;
}

export async function updatePlatformSettings(
  supabase: SupabaseClient,
  id: string,
  input: PlatformSettingsFormValues
): Promise<PlatformSettings> {
  const { data, error } = await supabase
    .from("platform_settings")
    .update({
      platform_name: input.platform_name.trim(),
      logo_url: input.logo_url.trim() || null,
      support_email: input.support_email.trim() || null,
      maintenance_mode: input.maintenance_mode,
      wallet_default_primary_color: input.wallet_default_primary_color,
      wallet_default_secondary_color: input.wallet_default_secondary_color,
    })
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;
  await logEvent(supabase, "settings.update", "platform_settings", id);
  return data as PlatformSettings;
}
