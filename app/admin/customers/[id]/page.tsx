"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Building2, Calendar, Mail, Pencil, Phone, Trash2 } from "lucide-react";
import CustomerForm from "@/components/customers/CustomerForm";
import CustomerHistory from "@/components/customers/CustomerHistory";
import DeleteCustomerDialog from "@/components/admin/DeleteCustomerDialog";
import Skeleton from "@/components/ui/Skeleton";
import { cn } from "@/lib/utils";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { useAdminCustomer } from "@/hooks/useAdminCustomer";
import { cancelReward, cancelVisit } from "@/services/customers";
import type { LoyaltyLevel } from "@/types/database";

const LOYALTY_LEVEL_LABELS: Record<LoyaltyLevel, string> = {
  bronze: "Bronze",
  silver: "Argent",
  gold: "Or",
  platinum: "Platine",
};

function formatDate(dateString: string | null) {
  if (!dateString) return "—";
  return new Date(dateString).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function AdminCustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { customer, visits, rewards, isLoading, error, reload, setCustomer } = useAdminCustomer(id);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  if (isLoading) {
    return (
      <div className="space-y-5 px-4 py-6 sm:px-6 lg:px-8">
        <Skeleton className="h-8 w-56" />
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (error || !customer) {
    return (
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <p className="rounded-2xl border border-red-100 bg-red-50 p-6 text-[13.5px] text-red-600">
          {error ?? "Client introuvable."}
        </p>
      </div>
    );
  }

  const handleCancelVisit = async (visitId: string) => {
    setIsMutating(true);
    try {
      const supabase = createSupabaseBrowserClient();
      await cancelVisit(supabase, customer.id, visitId);
      await reload();
    } finally {
      setIsMutating(false);
    }
  };

  const handleCancelReward = async (rewardId: string) => {
    setIsMutating(true);
    try {
      const supabase = createSupabaseBrowserClient();
      await cancelReward(supabase, customer.id, rewardId);
      await reload();
    } finally {
      setIsMutating(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-6 px-4 py-6 sm:px-6 lg:px-8"
    >
      <Link
        href="/admin/customers"
        className="inline-flex items-center gap-1.5 text-[13px] font-medium text-slate-500 hover:text-slate-700"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Tous les clients
      </Link>

      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-900/[0.02] sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold tracking-tight text-slate-900">
              {customer.first_name} {customer.last_name}
            </h1>
            <span
              className={cn(
                "rounded-full px-2.5 py-1 text-[11.5px] font-medium",
                customer.is_active ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"
              )}
            >
              {customer.is_active ? "Actif" : "Inactif"}
            </span>
          </div>
          <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-slate-500">
            {customer.email && (
              <span className="inline-flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5" /> {customer.email}
              </span>
            )}
            {customer.phone && (
              <span className="inline-flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5" /> {customer.phone}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" /> Client depuis le {formatDate(customer.created_at)}
            </span>
          </div>
          {customer.merchant_business_name && (
            <Link
              href={`/admin/merchants/${customer.merchant_id}`}
              className="mt-2 inline-flex items-center gap-1.5 text-[13px] font-medium text-indigo-600 hover:text-indigo-700"
            >
              <Building2 className="h-3.5 w-3.5" /> {customer.merchant_business_name}
            </Link>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-[13px] font-medium text-slate-700 hover:bg-slate-50"
          >
            <Pencil className="h-3.5 w-3.5" /> Modifier
          </button>
          <button
            type="button"
            onClick={() => setIsDeleting(true)}
            className="inline-flex items-center gap-2 rounded-full border border-red-100 px-4 py-2 text-[13px] font-medium text-red-600 hover:bg-red-50"
          >
            <Trash2 className="h-3.5 w-3.5" /> Supprimer
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/[0.02]">
          <p className="text-[12.5px] text-slate-500">Niveau</p>
          <p className="mt-1 text-[17px] font-semibold text-slate-900">
            {LOYALTY_LEVEL_LABELS[customer.loyalty_level]}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/[0.02]">
          <p className="text-[12.5px] text-slate-500">Points</p>
          <p className="mt-1 text-[17px] font-semibold text-slate-900">{customer.total_points}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/[0.02]">
          <p className="text-[12.5px] text-slate-500">Visites</p>
          <p className="mt-1 text-[17px] font-semibold text-slate-900">{customer.total_visits}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/[0.02]">
          <p className="text-[12.5px] text-slate-500">Dernière visite</p>
          <p className="mt-1 text-[17px] font-semibold text-slate-900">{formatDate(customer.last_visit)}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/[0.02]">
        <h3 className="mb-2 text-[14px] font-semibold tracking-tight text-slate-900">Historique</h3>
        <CustomerHistory
          visits={visits}
          rewards={rewards}
          programs={[]}
          onCancelVisit={(visit) => handleCancelVisit(visit.id)}
          onCancelReward={(reward) => handleCancelReward(reward.id)}
          isMutating={isMutating}
        />
      </div>

      {isEditing && (
        <CustomerForm
          merchantId={customer.merchant_id}
          customer={customer}
          onClose={() => setIsEditing(false)}
          onSaved={(updated) => {
            setCustomer((previous) => (previous ? { ...previous, ...updated } : previous));
            setIsEditing(false);
          }}
        />
      )}

      {isDeleting && (
        <DeleteCustomerDialog
          customer={customer}
          onClose={() => setIsDeleting(false)}
          onDeleted={() => router.push("/admin/customers")}
        />
      )}
    </motion.div>
  );
}
