"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Euro, FileSpreadsheet, FileText, Loader2, QrCode, TrendingUp, Users, Wallet } from "lucide-react";
import Papa from "papaparse";
import { toast } from "sonner";
import GrowthChart from "@/components/admin/GrowthChart";
import StatCard from "@/components/admin/StatCard";
import Skeleton from "@/components/ui/Skeleton";
import { useAdminAnalytics } from "@/hooks/useAdminAnalytics";

function formatEuro(value: number) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(value);
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export default function AdminAnalyticsPage() {
  const { stats, growth, isLoading, error } = useAdminAnalytics();
  const [isExportingExcel, setIsExportingExcel] = useState(false);

  const exportRows = () => {
    if (!stats) return [];
    return [
      { indicateur: "MRR", valeur: stats.mrr },
      { indicateur: "ARR", valeur: stats.arr },
      { indicateur: "Chiffre d'affaires", valeur: stats.revenue },
      { indicateur: "Commerçants", valeur: stats.merchantsCount },
      { indicateur: "Nouveaux commerçants (mois)", valeur: stats.newMerchantsThisMonth },
      { indicateur: "Clients", valeur: stats.customersCount },
      { indicateur: "Nouveaux clients (mois)", valeur: stats.newCustomersThisMonth },
      { indicateur: "Cartes Wallet", valeur: stats.walletPassesCount },
      { indicateur: "Apple Wallet", valeur: stats.appleWalletCount },
      { indicateur: "Google Wallet", valeur: stats.googleWalletCount },
      { indicateur: "Scans QR", valeur: stats.scansCount },
    ];
  };

  const handleExportCsv = () => {
    const rows = exportRows();
    if (rows.length === 0) {
      toast.info("Aucune donnée à exporter.");
      return;
    }
    const csv = Papa.unparse(rows);
    downloadBlob(new Blob([csv], { type: "text/csv;charset=utf-8;" }), "passloyal-analytics.csv");
    toast.success("Export CSV téléchargé.");
  };

  const handleExportExcel = async () => {
    const rows = exportRows();
    if (rows.length === 0) {
      toast.info("Aucune donnée à exporter.");
      return;
    }
    setIsExportingExcel(true);
    try {
      const XLSX = await import("xlsx");
      const worksheet = XLSX.utils.json_to_sheet(rows);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Analytics");
      const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" }) as unknown as BlobPart;
      downloadBlob(
        new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }),
        "passloyal-analytics.xlsx"
      );
      toast.success("Export Excel téléchargé.");
    } catch (exportError) {
      toast.error(exportError instanceof Error ? exportError.message : "Échec de l'export Excel.");
    } finally {
      setIsExportingExcel(false);
    }
  };

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
          {error ?? "Impossible de charger les analytics."}
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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-slate-900">Analytique</h1>
          <p className="mt-1 text-[13.5px] text-slate-500">Indicateurs clés de la plateforme, sur 12 mois.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleExportCsv}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-[13px] font-medium text-slate-700 hover:border-slate-300 hover:bg-slate-50"
          >
            <FileText className="h-4 w-4" /> CSV
          </button>
          <button
            type="button"
            onClick={handleExportExcel}
            disabled={isExportingExcel}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-[13px] font-medium text-slate-700 hover:border-slate-300 hover:bg-slate-50 disabled:opacity-60"
          >
            {isExportingExcel ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileSpreadsheet className="h-4 w-4" />}
            Excel
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="MRR" value={formatEuro(stats.mrr)} icon={TrendingUp} accent="from-emerald-500 to-teal-400" />
        <StatCard label="ARR" value={formatEuro(stats.arr)} icon={TrendingUp} accent="from-emerald-600 to-emerald-400" />
        <StatCard label="Chiffre d'affaires" value={formatEuro(stats.revenue)} icon={Euro} accent="from-amber-500 to-yellow-400" />
        <StatCard label="Cartes Wallet" value={String(stats.walletPassesCount)} icon={Wallet} accent="from-slate-700 to-slate-900" />
        <StatCard label="Nouveaux commerçants" value={String(stats.newMerchantsThisMonth)} icon={Users} accent="from-indigo-500 to-blue-400" hint="ce mois-ci" />
        <StatCard label="Nouveaux clients" value={String(stats.newCustomersThisMonth)} icon={Users} accent="from-fuchsia-500 to-pink-400" hint="ce mois-ci" />
        <StatCard label="Scans QR" value={String(stats.scansCount)} icon={QrCode} accent="from-teal-500 to-emerald-400" />
        <StatCard label="Export" value="CSV / Excel" icon={Download} accent="from-slate-500 to-slate-700" hint="Boutons ci-dessus" />
      </div>

      <GrowthChart data={growth} />
    </motion.div>
  );
}
