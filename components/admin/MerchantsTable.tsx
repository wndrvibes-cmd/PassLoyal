"use client";

import Link from "next/link";
import { CreditCard, Pencil, Power, Trash2, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import type { MerchantWithCounts } from "@/services/adminMerchants";

interface MerchantsTableProps {
  merchants: MerchantWithCounts[];
  onEdit: (merchant: MerchantWithCounts) => void;
  onToggleStatus: (merchant: MerchantWithCounts) => void;
  onDelete: (merchant: MerchantWithCounts) => void;
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function MerchantsTable({
  merchants,
  onEdit,
  onToggleStatus,
  onDelete,
}: MerchantsTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-900/[0.02]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/60 text-[11.5px] font-medium uppercase tracking-wide text-slate-500">
              <th className="px-5 py-3">Commerçant</th>
              <th className="px-5 py-3">Clients</th>
              <th className="px-5 py-3">Programmes</th>
              <th className="px-5 py-3">Statut</th>
              <th className="px-5 py-3">Inscrit le</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {merchants.map((merchant) => (
              <tr key={merchant.id} className="text-[13.5px] text-slate-700 hover:bg-slate-50/60">
                <td className="px-5 py-3.5">
                  <Link
                    href={`/admin/merchants/${merchant.id}`}
                    className="font-medium text-slate-900 hover:text-indigo-600"
                  >
                    {merchant.business_name}
                  </Link>
                  <p className="mt-0.5 text-[12px] text-slate-400">{merchant.email ?? "—"}</p>
                </td>
                <td className="px-5 py-3.5">
                  <span className="inline-flex items-center gap-1.5 text-slate-600">
                    <Users className="h-3.5 w-3.5 text-slate-400" /> {merchant.customers_count}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <span className="inline-flex items-center gap-1.5 text-slate-600">
                    <CreditCard className="h-3.5 w-3.5 text-slate-400" /> {merchant.programs_count}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <span
                    className={cn(
                      "inline-flex rounded-full px-2.5 py-1 text-[11.5px] font-medium",
                      merchant.status === "active"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-red-50 text-red-700"
                    )}
                  >
                    {merchant.status === "active" ? "Actif" : "Suspendu"}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-slate-500">{formatDate(merchant.created_at)}</td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      type="button"
                      onClick={() => onEdit(merchant)}
                      aria-label="Modifier"
                      className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onToggleStatus(merchant)}
                      aria-label={merchant.status === "active" ? "Suspendre" : "Réactiver"}
                      className={cn(
                        "rounded-full p-2 hover:bg-slate-100",
                        merchant.status === "active"
                          ? "text-slate-400 hover:text-amber-600"
                          : "text-slate-400 hover:text-emerald-600"
                      )}
                    >
                      <Power className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(merchant)}
                      aria-label="Supprimer"
                      className="rounded-full p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
