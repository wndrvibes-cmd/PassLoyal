"use client";

import { useCallback, useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { getGrowthTimeSeries, getPlatformStats, type MonthlyPoint, type PlatformStats } from "@/services/adminAnalytics";
import { listAuditLogs } from "@/services/adminAuditLogs";
import type { AuditLog } from "@/types/database";

interface UseAdminDashboardResult {
  stats: PlatformStats | null;
  growth: MonthlyPoint[];
  recentActivity: AuditLog[];
  isLoading: boolean;
  error: string | null;
  reload: () => Promise<void>;
}

export function useAdminDashboard(): UseAdminDashboardResult {
  const [stats, setStats] = useState<PlatformStats | null>(null);
  const [growth, setGrowth] = useState<MonthlyPoint[]>([]);
  const [recentActivity, setRecentActivity] = useState<AuditLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const supabase = createSupabaseBrowserClient();
      const [platformStats, growthSeries, activity] = await Promise.all([
        getPlatformStats(supabase),
        getGrowthTimeSeries(supabase, 6),
        listAuditLogs(supabase, { limit: 10 }),
      ]);
      setStats(platformStats);
      setGrowth(growthSeries);
      setRecentActivity(activity);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error ? caughtError.message : "Impossible de charger le tableau de bord."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return { stats, growth, recentActivity, isLoading, error, reload };
}
