"use client";

import { motion } from "framer-motion";
import {
  Building2,
  CreditCard,
  Euro,
  QrCode,
  Smartphone,
  TrendingUp,
  UserPlus,
  Users,
  Wallet,
} from "lucide-react";
import GrowthChart from "@/components/admin/GrowthChart";
import RecentActivity from "@/components/admin/RecentActivity";
import StatCard from "@/components/admin/StatCard";
import Skeleton from "@/components/ui/Skeleton";
import { useAdminDashboard } from "@/hooks/useAdminDashboard";

function formatEuro(value: number) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(
    value
  );
}

export default function AdminOverviewPage() {
  const { stats, growth, recentActivity, isLoading, error } = useAdminDashboard();

  if (isLoading) {
    return (
      <div className="space-y-5 px-4 py-6 sm:px-6 lg:px-8">
        <Skeleton className="h-8 w-56" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className="h-28 w-full" />
          ))}
        </div>
        <Skeleton className="h-72 w-full" />
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <p className="rounded-2xl border border-red-100 bg-red-50 p-6 text-[13.5px] text-red-600">
          {error ?? "Impossible de charger le tableau de bord."}
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
        <h1 className="text-xl font-semibold tracking-tight text-slate-900">Vue d&apos;ensemble</h1>
        <p className="mt-1 text-[13.5px] text-slate-500">
          Toute la plateforme PassLoyal, en temps réel.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Commerçants"
          value={String(stats.merchantsCount)}
          icon={Building2}
          accent="from-indigo-500 to-blue-400"
          hint={`+${stats.newMerchantsThisMonth} ce mois-ci`}
        />
        <StatCard
          label="Clients"
          value={String(stats.customersCount)}
          icon={Users}
          accent="from-fuchsia-500 to-pink-400"
          hint={`+${stats.newCustomersThisMonth} ce mois-ci`}
        />
        <StatCard
          label="Programmes"
          value={String(stats.programsCount)}
          icon={CreditCard}
          accent="from-amber-500 to-orange-400"
        />
        <StatCard
          label="Cartes Wallet"
          value={String(stats.walletPassesCount)}
          icon={Wallet}
          accent="from-slate-700 to-slate-900"
        />
        <StatCard
          label="Apple Wallet"
          value={String(stats.appleWalletCount)}
          icon={Smartphone}
          accent="from-slate-500 to-slate-700"
        />
        <StatCard
          label="Google Wallet"
          value={String(stats.googleWalletCount)}
          icon={Wallet}
          accent="from-blue-500 to-indigo-500"
        />
        <StatCard
          label="Scans QR"
          value={String(stats.scansCount)}
          icon={QrCode}
          accent="from-teal-500 to-emerald-400"
        />
        <StatCard
          label="Nouveaux clients"
          value={String(stats.newCustomersThisMonth)}
          icon={UserPlus}
          accent="from-violet-500 to-purple-400"
          hint="ce mois-ci"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          label="MRR"
          value={formatEuro(stats.mrr)}
          icon={TrendingUp}
          accent="from-emerald-500 to-teal-400"
          hint="Revenu récurrent mensuel"
        />
        <StatCard
          label="ARR"
          value={formatEuro(stats.arr)}
          icon={TrendingUp}
          accent="from-emerald-600 to-emerald-400"
          hint="Revenu récurrent annuel"
        />
        <StatCard
          label="Chiffre d'affaires"
          value={formatEuro(stats.revenue)}
          icon={Euro}
          accent="from-amber-500 to-yellow-400"
          hint="Paiements enregistrés"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.4fr_1fr]">
        <GrowthChart data={growth} />
        <RecentActivity logs={recentActivity} />
      </div>
    </motion.div>
  );
}
