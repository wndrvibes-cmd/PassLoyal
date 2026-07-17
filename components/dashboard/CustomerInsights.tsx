"use client";

import Link from "next/link";
import { AlertTriangle, Sparkles, UserPlus, ArrowRight } from "lucide-react";
import Skeleton from "@/components/ui/Skeleton";
import { useCustomers } from "@/hooks/useCustomers";

const SIXTY_DAYS_MS = 60 * 24 * 60 * 60 * 1000;

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("fr-FR", { day: "2-digit", month: "short" });
}

export default function CustomerInsights() {
  const { customers, isLoading } = useCustomers();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="rounded-2xl border border-slate-200 bg-white p-5">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="mt-4 h-24 w-full" />
          </div>
        ))}
      </div>
    );
  }

  const newCustomers = [...customers]
    .sort((a, b) => b.created_at.localeCompare(a.created_at))
    .slice(0, 5);

  const topCustomers = [...customers].sort((a, b) => b.total_points - a.total_points).slice(0, 5);

  const now = Date.now();
  const dormantCustomers = customers.filter(
    (customer) =>
      customer.is_active &&
      customer.last_visit &&
      now - new Date(customer.last_visit).getTime() > SIXTY_DAYS_MS
  );

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-[14px] font-semibold tracking-tight text-slate-900">
            <UserPlus className="h-4 w-4 text-indigo-500" /> Nouveaux clients
          </h2>
          <Link
            href="/dashboard/customers"
            className="text-[12.5px] font-medium text-indigo-600 hover:text-indigo-700"
          >
            Voir tout
          </Link>
        </div>
        {newCustomers.length === 0 ? (
          <p className="mt-4 text-[13px] text-slate-500">Aucun client pour l&apos;instant.</p>
        ) : (
          <ul className="mt-3 space-y-2.5">
            {newCustomers.map((customer) => (
              <li key={customer.id}>
                <Link
                  href={`/dashboard/customers/${customer.id}`}
                  className="flex items-center justify-between gap-2 rounded-lg px-1.5 py-1 hover:bg-slate-50"
                >
                  <span className="truncate text-[13px] text-slate-700">
                    {customer.first_name} {customer.last_name}
                  </span>
                  <span className="shrink-0 text-[11.5px] text-slate-400">
                    {formatDate(customer.created_at)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-[14px] font-semibold tracking-tight text-slate-900">
            <Sparkles className="h-4 w-4 text-amber-500" /> Top clients
          </h2>
          <Link
            href="/dashboard/customers"
            className="text-[12.5px] font-medium text-indigo-600 hover:text-indigo-700"
          >
            Voir tout
          </Link>
        </div>
        {topCustomers.length === 0 ? (
          <p className="mt-4 text-[13px] text-slate-500">Aucun client pour l&apos;instant.</p>
        ) : (
          <ul className="mt-3 space-y-2.5">
            {topCustomers.map((customer, index) => (
              <li key={customer.id}>
                <Link
                  href={`/dashboard/customers/${customer.id}`}
                  className="flex items-center gap-2.5 rounded-lg px-1.5 py-1 hover:bg-slate-50"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[10px] font-semibold text-slate-500">
                    {index + 1}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-[13px] text-slate-700">
                    {customer.first_name} {customer.last_name}
                  </span>
                  <span className="shrink-0 text-[11.5px] font-medium text-slate-900">
                    {customer.total_points} pts
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="flex items-center gap-2 text-[14px] font-semibold tracking-tight text-slate-900">
          <AlertTriangle className="h-4 w-4 text-red-500" /> Alertes
        </h2>
        {dormantCustomers.length === 0 ? (
          <p className="mt-4 text-[13px] text-slate-500">Aucune alerte pour l&apos;instant.</p>
        ) : (
          <div className="mt-3 rounded-xl border border-amber-100 bg-amber-50 p-3">
            <p className="text-[13px] text-amber-800">
              <span className="font-semibold">{dormantCustomers.length}</span> client
              {dormantCustomers.length > 1 ? "s" : ""} sans visite depuis plus de 60 jours.
            </p>
            <Link
              href="/dashboard/customers"
              className="mt-2 inline-flex items-center gap-1 text-[12.5px] font-medium text-amber-700 hover:text-amber-800"
            >
              Voir les clients <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
