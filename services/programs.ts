import type { SupabaseClient } from "@supabase/supabase-js";
import type { ProgramFormValues } from "@/lib/validations/program";
import type { LoyaltyProgram, Merchant } from "@/types/database";

function toRow(input: ProgramFormValues) {
  return {
    ...input,
    description: input.description.trim() || null,
    logo_url: input.logo_url.trim() || null,
  };
}

export async function getOrCreateCurrentMerchant(supabase: SupabaseClient): Promise<Merchant> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Utilisateur non authentifié.");
  }

  const { data: existing, error: fetchError } = await supabase
    .from("merchants")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  if (fetchError) throw fetchError;
  if (existing) return existing as Merchant;

  const { data: created, error: insertError } = await supabase
    .from("merchants")
    .insert({
      user_id: user.id,
      business_name: (user.user_metadata?.business_name as string | undefined) ?? "Mon commerce",
      email: user.email ?? null,
    })
    .select("*")
    .single();

  if (insertError) throw insertError;
  return created as Merchant;
}

export async function listPrograms(
  supabase: SupabaseClient,
  merchantId: string
): Promise<LoyaltyProgram[]> {
  const { data, error } = await supabase
    .from("loyalty_programs")
    .select("*")
    .eq("merchant_id", merchantId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as LoyaltyProgram[];
}

export async function createProgram(
  supabase: SupabaseClient,
  merchantId: string,
  input: ProgramFormValues
): Promise<LoyaltyProgram> {
  const { data, error } = await supabase
    .from("loyalty_programs")
    .insert({ ...toRow(input), merchant_id: merchantId })
    .select("*")
    .single();

  if (error) throw error;
  return data as LoyaltyProgram;
}

export async function updateProgram(
  supabase: SupabaseClient,
  id: string,
  input: ProgramFormValues
): Promise<LoyaltyProgram> {
  const { data, error } = await supabase
    .from("loyalty_programs")
    .update(toRow(input))
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;
  return data as LoyaltyProgram;
}

export async function deleteProgram(supabase: SupabaseClient, id: string): Promise<void> {
  const { error } = await supabase.from("loyalty_programs").delete().eq("id", id);
  if (error) throw error;
}

export async function toggleProgramActive(
  supabase: SupabaseClient,
  id: string,
  isActive: boolean
): Promise<LoyaltyProgram> {
  const { data, error } = await supabase
    .from("loyalty_programs")
    .update({ is_active: isActive })
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;
  return data as LoyaltyProgram;
}

export async function duplicateProgram(
  supabase: SupabaseClient,
  program: LoyaltyProgram
): Promise<LoyaltyProgram> {
  const input: ProgramFormValues = {
    name: `${program.name} (copie)`,
    description: program.description ?? "",
    logo_url: program.logo_url ?? "",
    primary_color: program.primary_color,
    secondary_color: program.secondary_color,
    reward_type: program.reward_type,
    points_per_visit: program.points_per_visit,
    points_per_euro: program.points_per_euro,
    reward_points: program.reward_points,
    qr_code_enabled: program.qr_code_enabled,
    wallet_enabled: program.wallet_enabled,
    is_active: false,
  };

  return createProgram(supabase, program.merchant_id, input);
}
