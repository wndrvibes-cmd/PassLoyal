"use client";

import { use, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Building2,
  CreditCard,
  Mail,
  Pencil,
  Phone,
  Power,
  Trash2,
  Users,
  Wallet,
} from "lucide-react";
import DeleteMerchantDialog from "@/components/admin/DeleteMerchantDialog";
import MerchantForm from "@/components/admin/MerchantForm";
import StatCard from "@/components/admin/StatCard";
import SuspendMerchantDialog from "@/components/admin/SuspendMerchantDialog";
import Skeleton from "@/components/ui/Skeleton";
import { cn } from "@/lib/utils";
import { useAdminMerchant } from "@/hooks/useAdminMerchant";
import { useRouter } from "next/navigation";

const PLAN_LABELS: Record<string, string> = { starter: "Starter", pro: "Pro", premium: "Premium" };
const SUBSCRIPTION_STATUS_LABELS: Record<string, string> = {
  trialing: "Essai",
  active: "Actif",
  past_due: "Impayé",
  canceled: "Résilié",
};

export default function AdminMerchantDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { merchant, stats, programs, customers, subscription, isLoading, error, reload, setMerchant } =
    useAdminMerchant(id);

  const [isEditing, setIsEditing] = useState(false);
  const [isSuspending, setIsSuspending] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  if (isLoading) {
    return (
      <div className="space-y-5 px-4 py-6 sm:px-6 lg:px-8">
        <Skeleton className="h-8 w-56" />
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (error || !merchant) {
    return (
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <p className="rounded-2xl border border-red-100 bg-red-50 p-6 text-[13.5px] text-red-600">
          {error ?? "Commerçant introuvable."}
        </p>
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
      <Link
        href="/admin/merchants"
        className="inline-flex items-center gap-1.5 text-[13px] font-medium text-slate-500 hover:text-slate-700"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Tous les commerçants
      </Link>

      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-900/[0.02] sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-500 text-white shadow-md shadow-indigo-500/25">
            <Building2 className="h-5 w-5" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold tracking-tight text-slate-900">
                {merchant.business_name}
              </h1>
              <span
                className={cn(
                  "rounded-full px-2.5 py-1 text-[11.5px] font-medium",
                  merchant.status === "active"
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-red-50 text-red-700"
                )}
              >
                {merchant.status === "active" ? "Actif" : "Suspendu"}
              </span>
            </div>
            <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-slate-500">
              {merchant.email && (
                <span className="inline-flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5" /> {merchant.email}
                </span>
              )}
              {merchant.phone && (
                <span className="inline-flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5" /> {merchant.phone}
                </span>
              )}
            </div>
          </div>
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
            onClick={() => setIsSuspending(true)}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-[13px] font-medium text-slate-700 hover:bg-slate-50"
          >
            <Power className="h-3.5 w-3.5" /> {merchant.status === "active" ? "Suspendre" : "Réactiver"}
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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Clients" value={String(stats?.customersCount ?? 0)} icon={Users} accent="from-fuchsia-500 to-pink-400" />
        <StatCard label="Programmes" value={String(stats?.programsCount ?? 0)} icon={CreditCard} accent="from-amber-500 to-orange-400" />
        <StatCard label="Cartes Wallet" value={String(stats?.walletPassesCount ?? 0)} icon={Wallet} accent="from-slate-700 to-slate-900" />
      </div>

      {subscription && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/[0.02]">
          <h3 className="text-[14px] font-semibold tracking-tight text-slate-900">Abonnement</h3>
          <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13.5px] text-slate-600">
            <span>Plan : <strong className="text-slate-900">{PLAN_LABELS[subscription.plan]}</strong></span>
            <span>Prix : <strong className="text-slate-900">{subscription.price} €/mois</strong></span>
            <span>Statut : <strong className="text-slate-900">{SUBSCRIPTION_STATUS_LABELS[subscription.status]}</strong></span>
            <Link href="/admin/subscriptions" className="text-indigo-600 hover:text-indigo-700">
              Gérer dans Abonnements →
            </Link>
          </div>
        </div>
      )}

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/[0.02]">
        <h3 className="text-[14px] font-semibold tracking-tight text-slate-900">Programmes de fidélité</h3>
        {programs.length === 0 ? (
          <p className="mt-3 text-[13px] text-slate-400">Aucun programme créé pour l&apos;instant.</p>
        ) : (
          <ul className="mt-3 divide-y divide-slate-100">
            {programs.map((program) => (
              <li key={program.id} className="flex items-center justify-between py-2.5 text-[13.5px]">
                <span className="font-medium text-slate-800">{program.name}</span>
                <span className={cn("rounded-full px-2.5 py-1 text-[11.5px] font-medium", program.is_active ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500")}>
                  {program.is_active ? "Actif" : "Inactif"}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/[0.02]">
        <div className="flex items-center justify-between">
          <h3 className="text-[14px] font-semibold tracking-tight text-slate-900">Clients</h3>
          <span className="text-[12.5px] text-slate-400">{customers.length} au total</span>
        </div>
        {customers.length === 0 ? (
          <p className="mt-3 text-[13px] text-slate-400">Aucun client pour l&apos;instant.</p>
        ) : (
          <ul className="mt-3 divide-y divide-slate-100">
            {customers.slice(0, 10).map((customer) => (
              <li key={customer.id} className="flex items-center justify-between py-2.5 text-[13.5px]">
                <Link href={`/admin/customers/${customer.id}`} className="font-medium text-slate-800 hover:text-indigo-600">
                  {customer.first_name} {customer.last_name}
                </Link>
                <span className="text-slate-500">{customer.total_points} pts · {customer.total_visits} visites</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {isEditing && (
        <MerchantForm
          merchant={merchant}
          onClose={() => setIsEditing(false)}
          onSaved={(updated) => {
            setMerchant(updated);
            setIsEditing(false);
          }}
        />
      )}

      {isSuspending && (
        <SuspendMerchantDialog
          merchant={merchant}
          onClose={() => setIsSuspending(false)}
          onUpdated={(updated) => {
            setMerchant(updated);
            setIsSuspending(false);
            reload();
          }}
        />
      )}

      {isDeleting && (
        <DeleteMerchantDialog
          merchant={merchant}
          onClose={() => setIsDeleting(false)}
          onDeleted={() => router.push("/admin/merchants")}
        />
      )}
    </motion.div>
  );
}
