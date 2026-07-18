"use client";

import { useCallback, useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { listAuditLogs } from "@/services/adminAuditLogs";
import type { AuditLog } from "@/types/database";

interface UseAdminLogsResult {
  logs: AuditLog[];
  isLoading: boolean;
  error: string | null;
  reload: (action?: string) => Promise<void>;
}

export function useAdminLogs(): UseAdminLogsResult {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async (action?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const supabase = createSupabaseBrowserClient();
      setLogs(await listAuditLogs(supabase, { action, limit: 200 }));
    } catch (caughtError) {
      setError(
        caughtError instanceof Error ? caughtError.message : "Impossible de charger les journaux."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return { logs, isLoading, error, reload };
}
