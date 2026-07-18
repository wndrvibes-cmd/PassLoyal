"use client";

import { useCallback, useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { getOrCreateCurrentMerchant } from "@/services/programs";
import { listCustomers } from "@/services/customers";
import { getOrCreateCardDesign, listMerchantScans, listWalletPasses } from "@/services/wallet";
import type { Customer, Merchant, WalletCardDesign, WalletPass, WalletScan } from "@/types/database";

interface UseWalletCardDesignResult {
  merchant: Merchant | null;
  cardDesign: WalletCardDesign | null;
  passes: WalletPass[];
  scans: WalletScan[];
  customers: Customer[];
  isLoading: boolean;
  error: string | null;
  reload: () => Promise<void>;
  setCardDesign: React.Dispatch<React.SetStateAction<WalletCardDesign | null>>;
}

export function useWalletCardDesign(): UseWalletCardDesignResult {
  const [merchant, setMerchant] = useState<Merchant | null>(null);
  const [cardDesign, setCardDesign] = useState<WalletCardDesign | null>(null);
  const [passes, setPasses] = useState<WalletPass[]>([]);
  const [scans, setScans] = useState<WalletScan[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const supabase = createSupabaseBrowserClient();
      const currentMerchant = await getOrCreateCurrentMerchant(supabase);
      const [design, currentPasses, currentScans, currentCustomers] = await Promise.all([
        getOrCreateCardDesign(supabase, currentMerchant.id),
        listWalletPasses(supabase, currentMerchant.id),
        listMerchantScans(supabase, currentMerchant.id),
        listCustomers(supabase, currentMerchant.id),
      ]);
      setMerchant(currentMerchant);
      setCardDesign(design);
      setPasses(currentPasses);
      setScans(currentScans);
      setCustomers(currentCustomers);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Impossible de charger la carte de fidélité."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return {
    merchant,
    cardDesign,
    passes,
    scans,
    customers,
    isLoading,
    error,
    reload,
    setCardDesign,
  };
}
