"use client";

import { useState } from "react";
import { Loader2, Smartphone, Wallet } from "lucide-react";
import { toast } from "sonner";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { markWalletAdded } from "@/services/wallet";

interface AddToWalletButtonsProps {
  token: string;
}

async function markAddedSafely(token: string, platform: "apple" | "google") {
  try {
    const supabase = createSupabaseBrowserClient();
    await markWalletAdded(supabase, token, platform);
  } catch {
    // Non-blocking: the user already has their pass either way.
  }
}

export default function AddToWalletButtons({ token }: AddToWalletButtonsProps) {
  const [isAddingApple, setIsAddingApple] = useState(false);
  const [isAddingGoogle, setIsAddingGoogle] = useState(false);

  const handleAddApple = async () => {
    setIsAddingApple(true);
    try {
      const response = await fetch(`/api/wallet/apple/${token}`);
      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.error ?? "Impossible d'ajouter la carte à Apple Wallet.");
      }
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      window.location.href = blobUrl;
      await markAddedSafely(token, "apple");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Échec de l'ajout à Apple Wallet.");
    } finally {
      setIsAddingApple(false);
    }
  };

  const handleAddGoogle = async () => {
    setIsAddingGoogle(true);
    try {
      const response = await fetch(`/api/wallet/google/${token}`);
      const body = await response.json().catch(() => null);
      if (!response.ok || !body?.saveUrl) {
        throw new Error(body?.error ?? "Impossible d'ajouter la carte à Google Wallet.");
      }
      window.open(body.saveUrl as string, "_blank", "noopener,noreferrer");
      await markAddedSafely(token, "google");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Échec de l'ajout à Google Wallet.");
    } finally {
      setIsAddingGoogle(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <button
        type="button"
        onClick={handleAddApple}
        disabled={isAddingApple}
        className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-black px-5 py-3 text-[13.5px] font-medium text-white transition-transform hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-70"
      >
        {isAddingApple ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Smartphone className="h-4 w-4" />
        )}
        Ajouter à Apple Wallet
      </button>
      <button
        type="button"
        onClick={handleAddGoogle}
        disabled={isAddingGoogle}
        className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-[13.5px] font-medium text-slate-900 transition-transform hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-70"
      >
        {isAddingGoogle ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Wallet className="h-4 w-4" />
        )}
        Ajouter à Google Wallet
      </button>
    </div>
  );
}
