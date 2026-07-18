"use client";

import { useCallback, useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { getOrCreateCurrentMerchant } from "@/services/programs";
import { getOrCreateCardDesign, getOrCreateWalletPass } from "@/services/wallet";
import type { WalletCardDesign, WalletPass } from "@/types/database";

interface UseWalletPassResult {
  pass: WalletPass | null;
  cardDesign: WalletCardDesign | null;
  isLoading: boolean;
  error: string | null;
  reload: () => Promise<void>;
  setPass: React.Dispatch<React.SetStateAction<WalletPass | null>>;
}

export function useWalletPass(customerId: string): UseWalletPassResult {
  const [pass, setPass] = useState<WalletPass | null>(null);
  const [cardDesign, setCardDesign] = useState<WalletCardDesign | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const supabase = createSupabaseBrowserClient();
      const currentMerchant = await getOrCreateCurrentMerchant(supabase);
      const design = await getOrCreateCardDesign(supabase, currentMerchant.id);
      const currentPass = await getOrCreateWalletPass(supabase, customerId, design.id);
      setCardDesign(design);
      setPass(currentPass);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Impossible de charger la carte Wallet de ce client."
      );
    } finally {
      setIsLoading(false);
    }
  }, [customerId]);

  useEffect(() => {
    reload();
  }, [reload]);

  return { pass, cardDesign, isLoading, error, reload, setPass };
}
