"use client";

import { useEffect, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Plus, X } from "lucide-react";
import { toast } from "sonner";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { listPayments, recordPayment, updateSubscription } from "@/services/adminSubscriptions";
import { SUBSCRIPTION_PLANS, SUBSCRIPTION_STATUSES, type SubscriptionPayment, type SubscriptionPlan, type SubscriptionStatus } from "@/types/database";
import type { SubscriptionWithMerchant } from "@/services/adminSubscriptions";

const PLAN_LABELS: Record<SubscriptionPlan, string> = { starter: "Starter", pro: "Pro", premium: "Premium" };
const STATUS_LABELS: Record<SubscriptionStatus, string> = {
  trialing: "Essai",
  active: "Actif",
  past_due: "Impayé",
  canceled: "Résilié",
};

interface EditSubscriptionDialogProps {
  subscription: SubscriptionWithMerchant;
  onClose: () => void;
  onSaved: (subscription: SubscriptionWithMerchant) => void;
}

export default function EditSubscriptionDialog({
  subscription,
  onClose,
  onSaved,
}: EditSubscriptionDialogProps) {
  const [plan, setPlan] = useState<SubscriptionPlan>(subscription.plan);
  const [price, setPrice] = useState(String(subscription.price));
  const [status, setStatus] = useState<SubscriptionStatus>(subscription.status);
  const [periodEnd, setPeriodEnd] = useState(subscription.current_period_end?.slice(0, 10) ?? "");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [payments, setPayments] = useState<SubscriptionPayment[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRecordingPayment, setIsRecordingPayment] = useState(false);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    listPayments(supabase, subscription.id).then(setPayments).catch(() => {});
  }, [subscription.id]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const updated = await updateSubscription(supabase, subscription.id, {
        plan,
        price: Number(price) || 0,
        status,
        current_period_end: periodEnd ? new Date(periodEnd).toISOString() : "",
      });
      toast.success("Abonnement mis à jour.");
      onSaved({ ...subscription, ...updated });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Une erreur est survenue.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRecordPayment = async () => {
    const amount = Number(paymentAmount);
    if (!amount || amount <= 0) {
      toast.error("Montant invalide.");
      return;
    }
    setIsRecordingPayment(true);
    try {
      const supabase = createSupabaseBrowserClient();
      await recordPayment(supabase, subscription.id, amount);
      toast.success("Paiement enregistré.");
      setPaymentAmount("");
      setPayments(await listPayments(supabase, subscription.id));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Une erreur est survenue.");
    } finally {
      setIsRecordingPayment(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        aria-hidden
        className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="subscription-form-title"
        className="fixed inset-x-0 bottom-0 z-50 max-h-[92vh] overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:max-h-[88vh] sm:w-full sm:max-w-md sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-3xl"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white/95 px-6 py-4 backdrop-blur">
          <h2 id="subscription-form-title" className="text-[16px] font-semibold tracking-tight text-slate-900">
            {subscription.merchant_business_name}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="plan" className="mb-1.5 block text-[13.5px] font-medium text-slate-700">Plan</label>
              <select
                id="plan"
                value={plan}
                onChange={(event) => setPlan(event.target.value as SubscriptionPlan)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[14px] text-slate-900 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
              >
                {SUBSCRIPTION_PLANS.map((value) => (
                  <option key={value} value={value}>{PLAN_LABELS[value]}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="price" className="mb-1.5 block text-[13.5px] font-medium text-slate-700">Prix (€/mois)</label>
              <input
                id="price"
                type="number"
                min={0}
                step="0.01"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[14px] text-slate-900 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="status" className="mb-1.5 block text-[13.5px] font-medium text-slate-700">Statut</label>
              <select
                id="status"
                value={status}
                onChange={(event) => setStatus(event.target.value as SubscriptionStatus)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[14px] text-slate-900 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
              >
                {SUBSCRIPTION_STATUSES.map((value) => (
                  <option key={value} value={value}>{STATUS_LABELS[value]}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="period_end" className="mb-1.5 block text-[13.5px] font-medium text-slate-700">Renouvellement</label>
              <input
                id="period_end"
                type="date"
                value={periodEnd}
                onChange={(event) => setPeriodEnd(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[14px] text-slate-900 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full px-5 py-2.5 text-[13.5px] font-medium text-slate-600 hover:bg-slate-100"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-slate-900 px-6 py-2.5 text-[13.5px] font-medium text-white shadow-md shadow-slate-900/15 transition-transform hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-70"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-indigo-600 to-blue-500 transition-transform duration-300 group-hover:translate-x-0" />
              <span className="relative flex items-center gap-2">
                {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                Enregistrer
              </span>
            </button>
          </div>

          <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
            <p className="text-[12.5px] font-medium text-slate-600">Enregistrer un paiement manuel</p>
            <p className="mt-0.5 text-[11.5px] text-slate-400">
              En attendant l&apos;intégration Stripe, consignez ici les paiements reçus.
            </p>
            <div className="mt-2.5 flex items-center gap-2">
              <input
                type="number"
                min={0}
                step="0.01"
                value={paymentAmount}
                onChange={(event) => setPaymentAmount(event.target.value)}
                placeholder="Montant en €"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-[13.5px] text-slate-900 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
              />
              <button
                type="button"
                onClick={handleRecordPayment}
                disabled={isRecordingPayment}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-2 text-[13px] font-medium text-white hover:bg-slate-800 disabled:opacity-70"
              >
                {isRecordingPayment ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Plus className="h-3.5 w-3.5" />}
                Ajouter
              </button>
            </div>

            {payments.length > 0 && (
              <ul className="mt-3 space-y-1.5 border-t border-slate-200 pt-3">
                {payments.map((payment) => (
                  <li key={payment.id} className="flex items-center justify-between text-[12.5px] text-slate-600">
                    <span>{new Date(payment.paid_at).toLocaleDateString("fr-FR")}</span>
                    <span className="font-medium text-slate-900">{payment.amount} €</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </form>
      </motion.div>
    </AnimatePresence>
  );
}
