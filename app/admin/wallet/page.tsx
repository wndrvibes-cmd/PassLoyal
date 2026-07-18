"use client";

import { motion } from "framer-motion";
import { CheckCircle2, QrCode, ScanLine, Smartphone, Wallet, XCircle } from "lucide-react";
import StatCard from "@/components/admin/StatCard";
import Skeleton from "@/components/ui/Skeleton";
import { useAdminWallet } from "@/hooks/useAdminWallet";

export default function AdminWalletPage() {
  const { overview, isLoading, error } = useAdminWallet();

  if (isLoading) {
    return (
      <div className="space-y-5 px-4 py-6 sm:px-6 lg:px-8">
        <Skeleton className="h-8 w-56" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-28 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !overview) {
    return (
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <p className="rounded-2xl border border-red-100 bg-red-50 p-6 text-[13.5px] text-red-600">
          {error ?? "Impossible de charger les données Wallet."}
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-6 px-4 py-6 sm:px-6 lg:px-8"
    >
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-slate-900">Wallet</h1>
        <p className="mt-1 text-[13.5px] text-slate-500">
          Cartes Apple Wallet et Google Wallet émises sur toute la plateforme.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard label="Cartes Apple Wallet" value={String(overview.appleCount)} icon={Smartphone} accent="from-slate-700 to-slate-900" />
        <StatCard label="Cartes Google Wallet" value={String(overview.googleCount)} icon={Wallet} accent="from-blue-500 to-indigo-500" />
        <StatCard label="Cartes actives" value={String(overview.activeCount)} icon={CheckCircle2} accent="from-emerald-500 to-teal-400" />
        <StatCard label="Cartes expirées" value={String(overview.expiredCount)} icon={XCircle} accent="from-red-500 to-orange-400" hint="Client désactivé" />
        <StatCard label="QR codes générés" value={String(overview.totalPasses)} icon={QrCode} accent="from-amber-500 to-orange-400" />
        <StatCard label="Scans enregistrés" value={String(overview.totalScans)} icon={ScanLine} accent="from-fuchsia-500 to-pink-400" />
      </div>
    </motion.div>
  );
}
