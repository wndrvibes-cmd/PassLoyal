"use client";

import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CreditCard, TrendingUp, UserCheck, UserPlus, Users, UserX } from "lucide-react";
import { LOYALTY_LEVELS, type Customer, type LoyaltyLevel } from "@/types/database";

interface CustomerStatsProps {
  customers: Customer[];
}

const LOYALTY_LEVEL_LABELS: Record<LoyaltyLevel, string> = {
  bronze: "Bronze",
  silver: "Argent",
  gold: "Or",
  platinum: "Platine",
};

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

function monthKey(dateString: string) {
  const date = new Date(dateString);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function monthLabel(key: string) {
  const [year, month] = key.split("-");
  const date = new Date(Number(year), Number(month) - 1, 1);
  return date.toLocaleDateString("fr-FR", { month: "short" });
}

export default function CustomerStats({ customers }: CustomerStatsProps) {
  const derived = useMemo(() => {
    const now = Date.now();
    const total = customers.length;
    const active = customers.filter((c) => c.is_active).length;
    const inactive = total - active;
    const newCustomers = customers.filter(
      (c) => now - new Date(c.created_at).getTime() <= THIRTY_DAYS_MS
    ).length;
    const avgVisits = total ? customers.reduce((sum, c) => sum + c.total_visits, 0) / total : 0;
    const avgPoints = total ? customers.reduce((sum, c) => sum + c.total_points, 0) / total : 0;
    const revenue = customers.reduce((sum, c) => sum + c.total_spent, 0);

    const topCustomers = [...customers]
      .sort((a, b) => b.total_points - a.total_points)
      .slice(0, 10);

    const levelDistribution = LOYALTY_LEVELS.map((level) => ({
      level: LOYALTY_LEVEL_LABELS[level],
      count: customers.filter((c) => c.loyalty_level === level).length,
    }));

    const monthBuckets = new Map<string, number>();
    customers.forEach((c) => {
      const key = monthKey(c.created_at);
      monthBuckets.set(key, (monthBuckets.get(key) ?? 0) + 1);
    });
    const sortedMonthKeys = [...monthBuckets.keys()].sort().slice(-6);
    const signupsByMonth = sortedMonthKeys.map((key) => ({
      month: monthLabel(key),
      count: monthBuckets.get(key) ?? 0,
    }));

    return {
      total,
      active,
      inactive,
      newCustomers,
      avgVisits,
      avgPoints,
      revenue,
      topCustomers,
      levelDistribution,
      signupsByMonth,
    };
  }, [customers]);

  const statCards = [
    { label: "Clients", value: String(derived.total), icon: Users, accent: "from-indigo-500 to-blue-400" },
    { label: "Clients actifs", value: String(derived.active), icon: UserCheck, accent: "from-emerald-500 to-teal-400" },
    { label: "Nouveaux (30j)", value: String(derived.newCustomers), icon: UserPlus, accent: "from-amber-500 to-orange-400" },
    { label: "Clients inactifs", value: String(derived.inactive), icon: UserX, accent: "from-slate-500 to-slate-700" },
    { label: "Visites moy.", value: derived.avgVisits.toFixed(1), icon: TrendingUp, accent: "from-fuchsia-500 to-pink-400" },
    { label: "Points moy.", value: derived.avgPoints.toFixed(0), icon: TrendingUp, accent: "from-cyan-500 to-blue-400" },
    {
      label: "CA fidélité",
      value: `${derived.revenue.toLocaleString("fr-FR")} €`,
      icon: CreditCard,
      accent: "from-rose-500 to-red-400",
    },
  ];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
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
            Répartition par niveau de fidélité
          </h3>
          <div className="mt-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={derived.levelDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis
                  dataKey="level"
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
                <Bar dataKey="count" name="Clients" fill="#4f46e5" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h3 className="text-[14px] font-semibold tracking-tight text-slate-900">
            Nouveaux clients (6 derniers mois)
          </h3>
          <div className="mt-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={derived.signupsByMonth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis
                  dataKey="month"
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
                <Bar dataKey="count" name="Inscriptions" fill="#0ea5e9" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <h3 className="text-[14px] font-semibold tracking-tight text-slate-900">
          Top 10 meilleurs clients
        </h3>
        {derived.topCustomers.length === 0 ? (
          <p className="mt-3 text-[13px] text-slate-500">Aucun client pour l&apos;instant.</p>
        ) : (
          <ol className="mt-3 divide-y divide-slate-100">
            {derived.topCustomers.map((customer, index) => (
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
  );
}
