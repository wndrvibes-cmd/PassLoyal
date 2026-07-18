"use client";

import { useMemo } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CreditCard, ScanLine, Smartphone, Wallet } from "lucide-react";
import type { Customer, WalletPass, WalletScan } from "@/types/database";

interface WalletStatsProps {
  passes: WalletPass[];
  scans: WalletScan[];
  customers: Customer[];
}

function dayKey(dateString: string) {
  return new Date(dateString).toISOString().slice(0, 10);
}

function dayLabel(key: string) {
  return new Date(key).toLocaleDateString("fr-FR", { day: "2-digit", month: "short" });
}

export default function WalletStats({ passes, scans, customers }: WalletStatsProps) {
  const derived = useMemo(() => {
    const totalCards = passes.length;
    const activeCards = passes.filter((pass) => pass.apple_added_at || pass.google_added_at).length;
    const totalScans = scans.length;
    const appleAdds = passes.filter((pass) => pass.apple_added_at).length;
    const googleAdds = passes.filter((pass) => pass.google_added_at).length;

    const buckets = new Map<string, number>();
    scans.forEach((scan) => {
      const key = dayKey(scan.created_at);
      buckets.set(key, (buckets.get(key) ?? 0) + 1);
    });
    const sortedKeys = [...buckets.keys()].sort().slice(-7);
    const dailyUsage = sortedKeys.map((key) => ({
      day: dayLabel(key),
      count: buckets.get(key) ?? 0,
    }));

    const topClients = [...customers].sort((a, b) => b.total_points - a.total_points).slice(0, 5);

    return { totalCards, activeCards, totalScans, appleAdds, googleAdds, dailyUsage, topClients };
  }, [passes, scans, customers]);

  const statCards = [
    {
      label: "Cartes créées",
      value: String(derived.totalCards),
      icon: CreditCard,
      accent: "from-indigo-500 to-blue-400",
    },
    {
      label: "Cartes actives",
      value: String(derived.activeCards),
      icon: Wallet,
      accent: "from-emerald-500 to-teal-400",
    },
    {
      label: "Scans",
      value: String(derived.totalScans),
      icon: ScanLine,
      accent: "from-amber-500 to-orange-400",
    },
    {
      label: "Ajouts Apple Wallet",
      value: String(derived.appleAdds),
      icon: Smartphone,
      accent: "from-slate-700 to-slate-900",
    },
    {
      label: "Ajouts Google Wallet",
      value: String(derived.googleAdds),
      icon: Smartphone,
      accent: "from-blue-500 to-indigo-500",
    },
  ];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-900/[0.02]"
            >
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-md ${stat.accent}`}
              >
                <Icon className="h-4 w-4" strokeWidth={2.25} />
              </span>
              <p className="mt-3 text-[12px] font-medium text-slate-500">{stat.label}</p>
              <p className="mt-0.5 truncate text-[16px] font-semibold tracking-tight text-slate-900">
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h3 className="text-[14px] font-semibold tracking-tight text-slate-900">
            Utilisation quotidienne
          </h3>
          {derived.dailyUsage.length === 0 ? (
            <p className="mt-4 text-[13px] text-slate-500">Aucun scan pour l&apos;instant.</p>
          ) : (
            <div className="mt-4 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={derived.dailyUsage}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis
                    dataKey="day"
                    tick={{ fontSize: 12, fill: "#64748b" }}
                    axisLine={{ stroke: "#e2e8f0" }}
                    tickLine={false}
                  />
                  <YAxis
                    allowDecimals={false}
                    tick={{ fontSize: 12, fill: "#64748b" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    cursor={{ fill: "#f8fafc" }}
                    contentStyle={{ borderRadius: 12, borderColor: "#e2e8f0", fontSize: 12.5 }}
                  />
                  <Bar dataKey="count" name="Scans" fill="#4f46e5" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h3 className="text-[14px] font-semibold tracking-tight text-slate-900">Top clients</h3>
          {derived.topClients.length === 0 ? (
            <p className="mt-4 text-[13px] text-slate-500">Aucun client pour l&apos;instant.</p>
          ) : (
            <ol className="mt-3 divide-y divide-slate-100">
              {derived.topClients.map((customer, index) => (
                <li key={customer.id} className="flex items-center gap-3 py-2.5">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[11px] font-semibold text-slate-500">
                    {index + 1}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-[13.5px] text-slate-700">
                    {customer.first_name} {customer.last_name}
                  </span>
                  <span className="shrink-0 text-[13px] font-medium tabular-nums text-slate-900">
                    {customer.total_points} pts
                  </span>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </div>
  );
}
