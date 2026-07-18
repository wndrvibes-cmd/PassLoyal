"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Building2, Plus, Search } from "lucide-react";
import DeleteMerchantDialog from "@/components/admin/DeleteMerchantDialog";
import MerchantForm from "@/components/admin/MerchantForm";
import MerchantsTable from "@/components/admin/MerchantsTable";
import SuspendMerchantDialog from "@/components/admin/SuspendMerchantDialog";
import EmptyState from "@/components/programs/EmptyState";
import Skeleton from "@/components/ui/Skeleton";
import { useAdminMerchants } from "@/hooks/useAdminMerchants";
import type { MerchantWithCounts } from "@/services/adminMerchants";

export default function AdminMerchantsPage() {
  const { merchants, isLoading, error, reload, setMerchants } = useAdminMerchants();
  const [search, setSearch] = useState("");
  const [formTarget, setFormTarget] = useState<{ mode: "create" | "edit"; merchant: MerchantWithCounts | null } | null>(
    null
  );
  const [statusTarget, setStatusTarget] = useState<MerchantWithCounts | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<MerchantWithCounts | null>(null);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return merchants;
    return merchants.filter(
      (merchant) =>
        merchant.business_name.toLowerCase().includes(query) ||
        (merchant.email ?? "").toLowerCase().includes(query)
    );
  }, [merchants, search]);

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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-slate-900">Commerçants</h1>
          <p className="mt-1 text-[13.5px] text-slate-500">
            {merchants.length} commerçant{merchants.length > 1 ? "s" : ""} sur la plateforme.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setFormTarget({ mode: "create", merchant: null })}
          className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-slate-900 px-5 py-2.5 text-[13.5px] font-medium text-white shadow-md shadow-slate-900/15 transition-transform hover:-translate-y-0.5"
        >
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-indigo-600 to-blue-500 transition-transform duration-300 group-hover:translate-x-0" />
          <span className="relative flex items-center gap-2">
            <Plus className="h-4 w-4" /> Nouveau commerçant
          </span>
        </button>
      </div>

      {merchants.length === 0 ? (
        <EmptyState
          icon={Building2}
          title="Aucun commerçant pour l'instant"
          description="Créez le premier commerçant de la plateforme pour commencer."
          actionLabel="Nouveau commerçant"
          onAction={() => setFormTarget({ mode: "create", merchant: null })}
        />
      ) : (
        <>
          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 sm:max-w-sm">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Rechercher un commerçant…"
              className="w-full bg-transparent text-[13.5px] text-slate-700 placeholder:text-slate-400 focus:outline-none"
            />
          </div>

          <MerchantsTable
            merchants={filtered}
            onEdit={(merchant) => setFormTarget({ mode: "edit", merchant })}
            onToggleStatus={setStatusTarget}
            onDelete={setDeleteTarget}
          />
        </>
      )}

      {formTarget && (
        <MerchantForm
          merchant={formTarget.merchant}
          onClose={() => setFormTarget(null)}
          onSaved={() => {
            setFormTarget(null);
            reload();
          }}
        />
      )}

      {statusTarget && (
        <SuspendMerchantDialog
          merchant={statusTarget}
          onClose={() => setStatusTarget(null)}
          onUpdated={(updated) => {
            setMerchants((previous) =>
              previous.map((merchant) => (merchant.id === updated.id ? { ...merchant, ...updated } : merchant))
            );
            setStatusTarget(null);
          }}
        />
      )}

      {deleteTarget && (
        <DeleteMerchantDialog
          merchant={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onDeleted={(id) => {
            setMerchants((previous) => previous.filter((merchant) => merchant.id !== id));
            setDeleteTarget(null);
          }}
        />
      )}
    </motion.div>
  );
}
