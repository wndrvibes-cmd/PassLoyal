"use client";

import { useState } from "react";
import Link from "next/link";
import { MoreVertical, Pencil, Power, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Customer, LoyaltyLevel } from "@/types/database";

interface CustomerTableProps {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
  onDelete: (customer: Customer) => void;
  onToggleActive: (customer: Customer) => void;
}

const LOYALTY_LEVEL_LABELS: Record<LoyaltyLevel, string> = {
  bronze: "Bronze",
  silver: "Argent",
  gold: "Or",
  platinum: "Platine",
};

const LOYALTY_LEVEL_STYLES: Record<LoyaltyLevel, string> = {
  bronze: "bg-orange-50 text-orange-700",
  silver: "bg-slate-100 text-slate-600",
  gold: "bg-amber-50 text-amber-700",
  platinum: "bg-indigo-50 text-indigo-700",
};

function formatDate(dateString: string | null) {
  if (!dateString) return "—";
  return new Date(dateString).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function CustomerTable({
  customers,
  onEdit,
  onDelete,
  onToggleActive,
}: CustomerTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left">
          <thead>
            <tr className="border-b border-slate-100 text-[11.5px] font-medium uppercase tracking-wide text-slate-400">
              <th scope="col" className="px-4 py-3">
                Client
              </th>
              <th scope="col" className="px-4 py-3">
                Niveau
              </th>
              <th scope="col" className="px-4 py-3">
                Points
              </th>
              <th scope="col" className="px-4 py-3">
                Visites
              </th>
              <th scope="col" className="px-4 py-3">
                Dépensé
              </th>
              <th scope="col" className="px-4 py-3">
                Inscrit le
              </th>
              <th scope="col" className="px-4 py-3">
                Dernière visite
              </th>
              <th scope="col" className="px-4 py-3">
                Statut
              </th>
              <th scope="col" className="px-4 py-3 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {customers.map((customer) => (
              <CustomerRow
                key={customer.id}
                customer={customer}
                onEdit={() => onEdit(customer)}
                onDelete={() => onDelete(customer)}
                onToggleActive={() => onToggleActive(customer)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CustomerRow({
  customer,
  onEdit,
  onDelete,
  onToggleActive,
}: {
  customer: Customer;
  onEdit: () => void;
  onDelete: () => void;
  onToggleActive: () => void;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <tr className="text-[13.5px] text-slate-700 hover:bg-slate-50/70">
      <td className="px-4 py-3">
        <Link
          href={`/dashboard/customers/${customer.id}`}
          className="flex items-center gap-2.5 font-medium text-slate-900 hover:text-indigo-600"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-blue-400 text-[11px] font-semibold text-white">
            {customer.first_name.charAt(0)}
            {customer.last_name.charAt(0)}
          </span>
          <span className="min-w-0">
            <span className="block truncate">
              {customer.first_name} {customer.last_name}
            </span>
            <span className="block truncate text-[11.5px] font-normal text-slate-400">
              {customer.email ?? "Sans email"}
            </span>
          </span>
        </Link>
      </td>
      <td className="px-4 py-3">
        <span
          className={cn(
            "rounded-full px-2 py-0.5 text-[11px] font-medium",
            LOYALTY_LEVEL_STYLES[customer.loyalty_level]
          )}
        >
          {LOYALTY_LEVEL_LABELS[customer.loyalty_level]}
        </span>
      </td>
      <td className="px-4 py-3 tabular-nums">{customer.total_points}</td>
      <td className="px-4 py-3 tabular-nums">{customer.total_visits}</td>
      <td className="px-4 py-3 tabular-nums">{customer.total_spent} €</td>
      <td className="px-4 py-3 text-slate-500">{formatDate(customer.created_at)}</td>
      <td className="px-4 py-3 text-slate-500">{formatDate(customer.last_visit)}</td>
      <td className="px-4 py-3">
        <span
          className={cn(
            "rounded-full px-2 py-0.5 text-[11px] font-medium",
            customer.is_active ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-500"
          )}
        >
          {customer.is_active ? "Actif" : "Inactif"}
        </span>
      </td>
      <td className="px-4 py-3 text-right">
        <div className="relative inline-block">
          <button
            type="button"
            onClick={() => setIsMenuOpen((value) => !value)}
            aria-haspopup="menu"
            aria-expanded={isMenuOpen}
            aria-label="Actions du client"
            className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <MoreVertical className="h-4 w-4" />
          </button>

          {isMenuOpen && (
            <div
              role="menu"
              className="absolute right-0 top-full z-10 mt-2 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white py-1.5 text-left shadow-lg shadow-slate-900/10"
            >
              <MenuItem
                icon={Pencil}
                label="Modifier"
                onClick={() => {
                  setIsMenuOpen(false);
                  onEdit();
                }}
              />
              <MenuItem
                icon={Power}
                label={customer.is_active ? "Désactiver" : "Activer"}
                onClick={() => {
                  setIsMenuOpen(false);
                  onToggleActive();
                }}
              />
              <MenuItem
                icon={Trash2}
                label="Supprimer"
                tone="danger"
                onClick={() => {
                  setIsMenuOpen(false);
                  onDelete();
                }}
              />
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}

function MenuItem({
  icon: Icon,
  label,
  onClick,
  tone = "default",
}: {
  icon: typeof Pencil;
  label: string;
  onClick: () => void;
  tone?: "default" | "danger";
}) {
  return (
    <button
      type="button"
      role="menuitem"
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-2.5 px-4 py-2.5 text-[13.5px]",
        tone === "danger" ? "text-red-600 hover:bg-red-50" : "text-slate-600 hover:bg-slate-50"
      )}
    >
      <Icon className="h-4 w-4" /> {label}
    </button>
  );
}
