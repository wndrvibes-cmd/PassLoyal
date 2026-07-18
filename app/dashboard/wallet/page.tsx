"use client";

import Skeleton from "@/components/ui/Skeleton";
import CardDesignForm from "@/components/wallet/CardDesignForm";
import WalletStats from "@/components/wallet/WalletStats";
import { useWalletCardDesign } from "@/hooks/useWalletCardDesign";

export default function WalletPage() {
  const { cardDesign, passes, scans, customers, isLoading, error, setCardDesign } =
    useWalletCardDesign();

  if (isLoading) {
    return (
      <div className="space-y-5 px-4 py-6 sm:px-6 lg:px-8">
        <Skeleton className="h-8 w-56" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-24 w-full" />
          ))}
        </div>
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (error || !cardDesign) {
    return (
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <p className="rounded-2xl border border-red-100 bg-red-50 p-6 text-[13.5px] text-red-600">
          {error ?? "Impossible de charger la carte de fidélité."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-slate-900">Wallet</h1>
        <p className="mt-1 text-[13.5px] text-slate-500">
          Personnalisez la carte que vos clients ajoutent à Apple Wallet et Google Wallet.
        </p>
      </div>

      <WalletStats passes={passes} scans={scans} customers={customers} />

      <CardDesignForm cardDesign={cardDesign} onSaved={setCardDesign} />
    </div>
  );
}
