"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, Users } from "lucide-react";
import DeleteCustomerDialog from "@/components/admin/DeleteCustomerDialog";
import CustomersTable from "@/components/admin/CustomersTable";
import EmptyState from "@/components/programs/EmptyState";
import Skeleton from "@/components/ui/Skeleton";
import { useAdminCustomers } from "@/hooks/useAdminCustomers";
import type { LoyaltyLevel } from "@/types/database";
import { LOYALTY_LEVELS } from "@/types/database";
import type { CustomerWithMerchant } from "@/services/adminCustomers";

const LOYALTY_LEVEL_LABELS: Record<LoyaltyLevel, string> = {
  bronze: "Bronze",
  silver: "Argent",
  gold: "Or",
  platinum: "Platine",
};

export default function AdminCustomersPage() {
  const { customers, isLoading, error, setCustomers } = useAdminCustomers();
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState<LoyaltyLevel | "all">("all");
  const [deleteTarget, setDeleteTarget] = useState<CustomerWithMerchant | null>(null);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return customers.filter((customer) => {
      const matchesQuery =
        !query ||
        `${customer.first_name} ${customer.last_name}`.toLowerCase().includes(query) ||
        (customer.email ?? "").toLowerCase().includes(query) ||
        (customer.merchant_business_name ?? "").toLowerCase().includes(query);
      const matchesLevel = levelFilter === "all" || customer.loyalty_level === levelFilter;
      return matchesQuery && matchesLevel;
    });
  }, [customers, search, levelFilter]);

  if (isLoading) {
    return (
      <div className="space-y-5 px-4 py-6 sm:px-6 lg:px-8">
        <Skeleton className="h-8 w-56" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <p className="rounded-2xl border border-red-100 bg-red-50 p-6 text-[13.5px] text-red-600">{error}</p>
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
        <h1 className="text-xl font-semibold tracking-tight text-slate-900">Clients</h1>
        <p className="mt-1 text-[13.5px] text-slate-500">
          {customers.length} client{customers.length > 1 ? "s" : ""} sur toute la plateforme.
        </p>
      </div>

      {customers.length === 0 ? (
        <EmptyState
          icon={Users}
          title="Aucun client pour l'instant"
          description="Les clients apparaîtront ici dès qu'un commerçant en ajoutera."
        />
      ) : (
        <>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 sm:max-w-sm sm:flex-1">
              <Search className="h-4 w-4 text-slate-400" />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Rechercher un client ou un commerçant…"
                className="w-full bg-transparent text-[13.5px] text-slate-700 placeholder:text-slate-400 focus:outline-none"
              />
            </div>
            <select
              value={levelFilter}
              onChange={(event) => setLevelFilter(event.target.value as LoyaltyLevel | "all")}
              className="rounded-full border border-slate-200 bg-white px-4 py-2.5 text-[13.5px] text-slate-700 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
            >
              <option value="all">Tous les niveaux</option>
              {LOYALTY_LEVELS.map((level) => (
                <option key={level} value={level}>
                  {LOYALTY_LEVEL_LABELS[level]}
                </option>
              ))}
            </select>
          </div>

          {filtered.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 px-4 py-16 text-center text-[13.5px] text-slate-500">
              Aucun client ne correspond à votre recherche.
            </p>
          ) : (
            <CustomersTable customers={filtered} onDelete={setDeleteTarget} />
          )}
        </>
      )}

      {deleteTarget && (
        <DeleteCustomerDialog
          customer={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onDeleted={(id) => {
            setCustomers((previous) => previous.filter((customer) => customer.id !== id));
            setDeleteTarget(null);
          }}
        />
      )}
    </motion.div>
  );
}
