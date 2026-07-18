import type { SupabaseClient } from "@supabase/supabase-js";
import type { AuditLog } from "@/types/database";

/** Best-effort: logging should never block the action that triggered it. */
export async function logEvent(
  supabase: SupabaseClient,
  action: string,
  entityType?: string,
  entityId?: string,
  metadata?: Record<string, unknown>
): Promise<void> {
  try {
    await supabase.rpc("log_audit_event", {
      p_action: action,
      p_entity_type: entityType ?? null,
      p_entity_id: entityId ?? null,
      p_metadata: metadata ?? {},
    });
  } catch {
    // Non-blocking.
  }
}

export interface ListAuditLogsOptions {
  action?: string;
  limit?: number;
}

export async function listAuditLogs(
  supabase: SupabaseClient,
  options: ListAuditLogsOptions = {}
): Promise<AuditLog[]> {
  let query = supabase
    .from("audit_logs")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(options.limit ?? 200);

  if (options.action) {
    query = query.eq("action", options.action);
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as AuditLog[];
}
