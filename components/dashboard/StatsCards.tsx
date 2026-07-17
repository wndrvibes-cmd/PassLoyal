"use client";

import { CreditCard, History, Smartphone, Sparkles, Users, Wallet } from "lucide-react";
import Skeleton from "@/components/ui/Skeleton";
import { usePrograms } from "@/hooks/usePrograms";

interface StatItem {
  label: string;
  value: string;
  icon: typeof Users;
  accent: string;
}

function formatRelativeTime(dateString: string) {
  const diffMs = Date.now() - new Date(dateString).getTime();
  const diffMinutes = Math.round(diffMs / 60000);
  if (diffMinutes < 1) return "à l'instant";
  if (diffMinutes < 60) return `il y a ${diffMinutes} min`;
  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours < 24) return `il y a ${diffHours} h`;
  const diffDays = Math.round(diffHours / 24);
  return `il y a ${diffDays} j`;
}

export default function StatsCards() {
  const { programs, isLoading } = usePrograms();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="rounded-2xl border border-slate-200 bg-white p-5">
            <Skeleton className="h-10 w-10 rounded-xl" />
            <Skeleton className="mt-4 h-3 w-2/3" />
            <Skeleton className="mt-2 h-5 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  const activeProgram = programs.find((program) => program.is_active) ?? null;
  const walletActive = programs.some((program) => program.is_active && program.wallet_enabled);
  const sortedByUpdated = [...programs].sort((a, b) => a.updated_at.localeCompare(b.updated_at));
  const lastUpdated = sortedByUpdated[sortedByUpdated.length - 1]?.updated_at;

  const stats: StatItem[] = [
    {
      label: "Programmes",
      value: String(programs.length),
      icon: CreditCard,
      accent: "from-indigo-500 to-blue-400",
    },
    {
      label: "Programme actif",
      value: activeProgram?.name ?? "Aucun",
      icon: Sparkles,
      accent: "from-emerald-500 to-teal-400",
    },
    {
      label: "Dernière modification",
      value: lastUpdated ? formatRelativeTime(lastUpdated) : "—",
      icon: History,
      accent: "from-amber-500 to-orange-400",
    },
    {
      label: "Clients",
      value: "0",
      icon: Users,
      accent: "from-fuchsia-500 to-pink-400",
    },
    {
      label: "Apple Wallet",
      value: walletActive ? "Actif" : "Inactif",
      icon: Smartphone,
      accent: "from-slate-700 to-slate-900",
    },
    {
      label: "Google Wallet",
      value: walletActive ? "Actif" : "Inactif",
      icon: Wallet,
      accent: "from-blue-500 to-indigo-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/[0.02]"
          >
            <span
              className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-md ${stat.accent}`}
            >
              <Icon className="h-5 w-5" strokeWidth={2.25} />
            </span>
            <p className="mt-4 text-[13px] font-medium text-slate-500">{stat.label}</p>
            <p className="mt-1 truncate text-[17px] font-semibold tracking-tight text-slate-900">
              {stat.value}
            </p>
          </div>
        );
      })}
    </div>
  );
}
