"use client";

import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

type Variant = "apple" | "google";

const QR_CELLS = [
  1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1,
];

function QrPattern() {
  return (
    <div className="grid grid-cols-5 gap-[2px] rounded-md bg-white p-1.5 shadow-inner">
      {QR_CELLS.map((filled, i) => (
        <div
          key={i}
          className={cn("h-1.5 w-1.5 rounded-[1px]", filled ? "bg-ink" : "bg-transparent")}
        />
      ))}
    </div>
  );
}

function WalletCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-500 via-primary-700 to-ink p-5 shadow-soft-lg ring-1 ring-white/10">
      <div className="pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-widest text-white/60">
            Carte fidélité
          </p>
          <p className="mt-0.5 text-base font-semibold text-white">Café Lumière</p>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-sm font-semibold text-white">
          CL
        </div>
      </div>

      <div className="relative mt-8 flex items-end justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-white/50">Points</p>
          <p className="font-mono text-2xl font-semibold text-white">1 240</p>
        </div>
        <QrPattern />
      </div>
    </div>
  );
}

export function PhoneMockup({
  variant = "apple",
  className,
  floating = true,
}: {
  variant?: Variant;
  className?: string;
  floating?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const shouldFloat = floating && !reduceMotion;

  return (
    <motion.div
      className={cn("relative mx-auto w-[270px] select-none", className)}
      animate={shouldFloat ? { y: [0, -14, 0] } : undefined}
      transition={shouldFloat ? { duration: 6, repeat: Infinity, ease: "easeInOut" } : undefined}
    >
      <div className="relative rounded-[2.75rem] border-[6px] border-ink bg-ink p-2 shadow-soft-xl">
        <div
          className="relative overflow-hidden rounded-[2.25rem] bg-gradient-to-b from-[#0c1024] to-[#151b36]"
          style={{ aspectRatio: "9 / 19.5" }}
        >
          {variant === "apple" ? (
            <div className="absolute left-1/2 top-3 z-20 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />
          ) : (
            <div className="absolute left-1/2 top-4 z-20 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-black/70" />
          )}

          <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-6 pt-4 text-[11px] font-medium text-white/70">
            <span>9:41</span>
            <span className="tracking-wide">{variant === "apple" ? "" : "5G"}</span>
          </div>

          <div className="relative z-0 flex h-full flex-col justify-end px-4 pb-8 pt-16">
            <p className="mb-4 text-center text-xs font-medium uppercase tracking-wider text-white/40">
              {variant === "apple" ? "Wallet" : "Google Wallet"}
            </p>
            <WalletCard />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
