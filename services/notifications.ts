import type { SupabaseClient } from "@supabase/supabase-js";
import type { AppNotification, NotificationType } from "@/types/database";

export async function createNotification(
  supabase: SupabaseClient,
  customerId: string,
  type: NotificationType,
  title: string,
  message: string
): Promise<AppNotification> {
  const { data, error } = await supabase
    .from("notifications")
    .insert({ customer_id: customerId, type, title, message })
    .select("*")
    .single();

  if (error) throw error;
  return data as AppNotification;
}

/** Best-effort: a notification failing to write should never block the
 * underlying points/reward action that triggered it. */
export async function notifySafely(
  supabase: SupabaseClient,
  customerId: string,
  type: NotificationType,
  title: string,
  message: string
): Promise<void> {
  try {
    await createNotification(supabase, customerId, type, title, message);
  } catch {
    // Non-blocking: notification delivery is architecture-only for now
    // (no push/email/SMS provider is wired up yet).
  }
}

export async function listNotifications(
  supabase: SupabaseClient,
  customerId: string
): Promise<AppNotification[]> {
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("customer_id", customerId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as AppNotification[];
}
