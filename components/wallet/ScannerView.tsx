"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Camera, CheckCircle2, Gift, Loader2, Minus, Plus, ScanLine, X } from "lucide-react";
import QrScanner from "qr-scanner";
import { toast } from "sonner";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { addPoints, redeemReward, removePoints } from "@/services/customers";
import { findCustomerByToken, recordScan } from "@/services/wallet";
import type { Customer } from "@/types/database";

function extractToken(raw: string): string {
  try {
    const url = new URL(raw);
    const parts = url.pathname.split("/").filter(Boolean);
    return parts[parts.length - 1] ?? raw;
  } catch {
    return raw.trim();
  }
}

export default function ScannerView() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const scannerRef = useRef<QrScanner | null>(null);

  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [manualCode, setManualCode] = useState("");
  const [isLookingUp, setIsLookingUp] = useState(false);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isMutating, setIsMutating] = useState(false);
  const [addAmount, setAddAmount] = useState("");
  const [removeAmount, setRemoveAmount] = useState("");
  const [rewardName, setRewardName] = useState("");
  const [rewardCost, setRewardCost] = useState("");
  const [confirmation, setConfirmation] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      scannerRef.current?.stop();
      scannerRef.current?.destroy();
    };
  }, []);

  const handleLookup = async (rawCode: string) => {
    const token = extractToken(rawCode);
    if (!token) return;

    setIsLookingUp(true);

    try {
      const supabase = createSupabaseBrowserClient();
      const found = await findCustomerByToken(supabase, token);
      if (!found) {
        toast.error("Aucun client ne correspond à ce QR Code.");
        return;
      }
      const { duplicate } = await recordScan(supabase, found.id, "view");
      setCustomer(found);
      if (duplicate) {
        toast.info("Ce QR Code vient déjà d'être scanné.");
      } else {
        toast.success(`${found.first_name} ${found.last_name} identifié(e).`);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Échec de la lecture du QR Code.");
    } finally {
      setIsLookingUp(false);
    }
  };

  const startCamera = async () => {
    if (!videoRef.current) return;
    setCameraError(null);

    try {
      const hasCamera = await QrScanner.hasCamera();
      if (!hasCamera) {
        setCameraError("Aucune caméra détectée sur cet appareil.");
        return;
      }

      const scanner = new QrScanner(
        videoRef.current,
        (result) => handleLookup(result.data),
        { highlightScanRegion: true, highlightCodeOutline: true, maxScansPerSecond: 2 }
      );
      scannerRef.current = scanner;
      await scanner.start();
      setIsCameraActive(true);
    } catch (error) {
      setCameraError(
        error instanceof Error ? error.message : "Impossible d'accéder à la caméra."
      );
    }
  };

  const stopCamera = () => {
    scannerRef.current?.stop();
    setIsCameraActive(false);
  };

  const handleManualSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!manualCode.trim()) return;
    handleLookup(manualCode.trim());
  };

  const showConfirmation = (message: string) => {
    setConfirmation(message);
    setTimeout(() => setConfirmation(null), 2500);
  };

  const handleAddPoints = async () => {
    if (!customer) return;
    const amount = Number(addAmount);
    if (!Number.isFinite(amount) || amount <= 0) {
      toast.error("Indiquez un nombre de points positif.");
      return;
    }
    setIsMutating(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const { customer: updated } = await addPoints(supabase, customer.id, amount);
      await recordScan(supabase, customer.id, "add_points");
      setCustomer(updated);
      setAddAmount("");
      showConfirmation(`+${amount} points ajoutés`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Échec de l'opération.");
    } finally {
      setIsMutating(false);
    }
  };

  const handleRemovePoints = async () => {
    if (!customer) return;
    const amount = Number(removeAmount);
    if (!Number.isFinite(amount) || amount <= 0) {
      toast.error("Indiquez un nombre de points positif.");
      return;
    }
    setIsMutating(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const { customer: updated } = await removePoints(supabase, customer.id, amount);
      await recordScan(supabase, customer.id, "remove_points");
      setCustomer(updated);
      setRemoveAmount("");
      showConfirmation(`-${amount} points retirés`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Échec de l'opération.");
    } finally {
      setIsMutating(false);
    }
  };

  const handleRedeemReward = async () => {
    if (!customer) return;
    const cost = Number(rewardCost);
    if (!rewardName.trim() || !Number.isFinite(cost) || cost <= 0) {
      toast.error("Indiquez un nom de récompense et un coût en points positif.");
      return;
    }
    setIsMutating(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const { customer: updated } = await redeemReward(
        supabase,
        customer.id,
        rewardName.trim(),
        cost
      );
      await recordScan(supabase, customer.id, "redeem_reward");
      setCustomer(updated);
      setRewardName("");
      setRewardCost("");
      showConfirmation("Récompense validée");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Échec de l'opération.");
    } finally {
      setIsMutating(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-[14px] font-semibold tracking-tight text-slate-900">Scanner</h2>
          {isCameraActive ? (
            <button
              type="button"
              onClick={stopCamera}
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 text-[12.5px] font-medium text-slate-600 hover:bg-slate-50"
            >
              <X className="h-3.5 w-3.5" /> Arrêter
            </button>
          ) : (
            <button
              type="button"
              onClick={startCamera}
              className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-3 py-1.5 text-[12.5px] font-medium text-white hover:bg-slate-800"
            >
              <Camera className="h-3.5 w-3.5" /> Activer la caméra
            </button>
          )}
        </div>

        <div className="relative mx-auto mt-4 aspect-square w-full max-w-sm overflow-hidden rounded-2xl bg-slate-900">
          <video ref={videoRef} className="h-full w-full object-cover" muted playsInline />
          {!isCameraActive && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white/60">
              <ScanLine className="h-8 w-8" />
              <p className="text-[12.5px]">Caméra inactive</p>
            </div>
          )}
        </div>

        {cameraError && (
          <p className="mt-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-[13px] text-red-600">
            {cameraError}
          </p>
        )}

        <form onSubmit={handleManualSubmit} className="mt-4 flex items-center gap-2">
          <input
            type="text"
            value={manualCode}
            onChange={(event) => setManualCode(event.target.value)}
            placeholder="Ou saisissez le code manuellement"
            aria-label="Code du client"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[13.5px] text-slate-900 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
          />
          <button
            type="submit"
            disabled={isLookingUp}
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-[13px] font-medium text-white disabled:pointer-events-none disabled:opacity-60"
          >
            {isLookingUp ? <Loader2 className="h-4 w-4 animate-spin" /> : "Rechercher"}
          </button>
        </form>
      </div>

      {customer && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-blue-400 text-[14px] font-semibold text-white">
              {customer.first_name.charAt(0)}
              {customer.last_name.charAt(0)}
            </span>
            <div>
              <p className="text-[15px] font-semibold text-slate-900">
                {customer.first_name} {customer.last_name}
              </p>
              <p className="text-[12.5px] text-slate-500">
                {customer.total_points} points · {customer.total_visits} visites
              </p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={1}
                value={addAmount}
                onChange={(event) => setAddAmount(event.target.value)}
                placeholder="Points"
                aria-label="Points à ajouter"
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-[13.5px] focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
              />
              <button
                type="button"
                onClick={handleAddPoints}
                disabled={isMutating}
                aria-label="Ajouter des points"
                className="inline-flex shrink-0 items-center justify-center rounded-xl bg-emerald-600 p-2.5 text-white hover:bg-emerald-700 disabled:pointer-events-none disabled:opacity-60"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={1}
                value={removeAmount}
                onChange={(event) => setRemoveAmount(event.target.value)}
                placeholder="Points"
                aria-label="Points à retirer"
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-[13.5px] focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
              />
              <button
                type="button"
                onClick={handleRemovePoints}
                disabled={isMutating}
                aria-label="Retirer des points"
                className="inline-flex shrink-0 items-center justify-center rounded-xl bg-red-600 p-2.5 text-white hover:bg-red-700 disabled:pointer-events-none disabled:opacity-60"
              >
                <Minus className="h-4 w-4" />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={rewardName}
                onChange={(event) => setRewardName(event.target.value)}
                placeholder="Récompense"
                aria-label="Nom de la récompense"
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-[13.5px] focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
              />
              <input
                type="number"
                min={1}
                value={rewardCost}
                onChange={(event) => setRewardCost(event.target.value)}
                placeholder="Coût"
                aria-label="Coût en points"
                className="w-20 shrink-0 rounded-xl border border-slate-200 px-2 py-2 text-[13.5px] focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
              />
              <button
                type="button"
                onClick={handleRedeemReward}
                disabled={isMutating}
                aria-label="Valider la récompense"
                className="inline-flex shrink-0 items-center justify-center rounded-xl bg-fuchsia-600 p-2.5 text-white hover:bg-fuchsia-700 disabled:pointer-events-none disabled:opacity-60"
              >
                <Gift className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      <AnimatePresence>
        {confirmation && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-[13.5px] font-medium text-white shadow-2xl"
          >
            <CheckCircle2 className="h-4 w-4 text-emerald-400" /> {confirmation}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
