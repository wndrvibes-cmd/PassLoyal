"use client";

import { useCallback, useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { listSubscriptions, type SubscriptionWithMerchant } from "@/services/adminSubscriptions";

interface UseAdminSubscriptionsResult {
  subscriptions: SubscriptionWithMerchant[];
  isLoading: boolean;
  error: string | null;
  reload: () => Promise<void>;
  setSubscriptions: React.Dispatch<React.SetStateAction<SubscriptionWithMerchant[]>>;
}

export function useAdminSubscriptions(): UseAdminSubscriptionsResult {
  const [subscriptions, setSubscriptions] = useState<SubscriptionWithMerchant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const supabase = createSupabaseBrowserClient();
      setSubscriptions(await listSubscriptions(supabase));
    } catch (caughtError) {
      setError(
        caughtError instanceof Error ? caughtError.message : "Impossible de charger les abonnements."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return { subscriptions, isLoading, error, reload, setSubscriptions };
}
