"use client";

import { useCallback, useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { getWalletOverview, type AdminWalletOverview } from "@/services/adminWallet";

interface UseAdminWalletResult {
  overview: AdminWalletOverview | null;
  isLoading: boolean;
  error: string | null;
  reload: () => Promise<void>;
}

export function useAdminWallet(): UseAdminWalletResult {
  const [overview, setOverview] = useState<AdminWalletOverview | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const supabase = createSupabaseBrowserClient();
      setOverview(await getWalletOverview(supabase));
    } catch (caughtError) {
      setError(
        caughtError instanceof Error ? caughtError.message : "Impossible de charger les données Wallet."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return { overview, isLoading, error, reload };
}
