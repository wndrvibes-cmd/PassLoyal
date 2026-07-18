"use client";

import Link from "next/link";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LoyaltyLevel } from "@/types/database";
import type { CustomerWithMerchant } from "@/services/adminCustomers";

interface CustomersTableProps {
  customers: CustomerWithMerchant[];
  onDelete: (customer: CustomerWithMerchant) => void;
}

const LOYALTY_LEVEL_LABELS: Record<LoyaltyLevel, string> = {
  bronze: "Bronze",
  silver: "Argent",
  gold: "Or",
  platinum: "Platine",
};

export default function CustomersTable({ customers, onDelete }: CustomersTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-900/[0.02]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/60 text-[11.5px] font-medium uppercase tracking-wide text-slate-500">
              <th className="px-5 py-3">Client</th>
              <th className="px-5 py-3">Commerçant</th>
              <th className="px-5 py-3">Niveau</th>
              <th className="px-5 py-3">Points</th>
              <th className="px-5 py-3">Visites</th>
              <th className="px-5 py-3">Statut</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {customers.map((customer) => (
              <tr key={customer.id} className="text-[13.5px] text-slate-700 hover:bg-slate-50/60">
                <td className="px-5 py-3.5">
                  <Link
                    href={`/admin/customers/${customer.id}`}
                    className="font-medium text-slate-900 hover:text-indigo-600"
                  >
                    {customer.first_name} {customer.last_name}
                  </Link>
                  <p className="mt-0.5 text-[12px] text-slate-400">{customer.email ?? "—"}</p>
                </td>
                <td className="px-5 py-3.5 text-slate-600">{customer.merchant_business_name ?? "—"}</td>
                <td className="px-5 py-3.5 text-slate-600">{LOYALTY_LEVEL_LABELS[customer.loyalty_level]}</td>
                <td className="px-5 py-3.5 text-slate-600">{customer.total_points}</td>
                <td className="px-5 py-3.5 text-slate-600">{customer.total_visits}</td>
                <td className="px-5 py-3.5">
                  <span
                    className={cn(
                      "inline-flex rounded-full px-2.5 py-1 text-[11.5px] font-medium",
                      customer.is_active ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"
                    )}
                  >
                    {customer.is_active ? "Actif" : "Inactif"}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-right">
                  <button
                    type="button"
                    onClick={() => onDelete(customer)}
                    aria-label="Supprimer"
                    className="rounded-full p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
