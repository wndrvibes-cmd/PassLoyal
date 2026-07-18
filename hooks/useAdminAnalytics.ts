"use client";

import { useCallback, useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { getGrowthTimeSeries, getPlatformStats, type MonthlyPoint, type PlatformStats } from "@/services/adminAnalytics";

interface UseAdminAnalyticsResult {
  stats: PlatformStats | null;
  growth: MonthlyPoint[];
  isLoading: boolean;
  error: string | null;
  reload: () => Promise<void>;
}

export function useAdminAnalytics(): UseAdminAnalyticsResult {
  const [stats, setStats] = useState<PlatformStats | null>(null);
  const [growth, setGrowth] = useState<MonthlyPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const supabase = createSupabaseBrowserClient();
      const [platformStats, growthSeries] = await Promise.all([
        getPlatformStats(supabase),
        getGrowthTimeSeries(supabase, 12),
      ]);
      setStats(platformStats);
      setGrowth(growthSeries);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error ? caughtError.message : "Impossible de charger les analytics."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return { stats, growth, isLoading, error, reload };
}
