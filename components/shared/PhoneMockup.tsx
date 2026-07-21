"use client";

import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

type Variant = "apple" | "google";
type Screen = "wallet" | "lockscreen";

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
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "linear-gradient(115deg, transparent 30%, rgb(255 255 255 / 0.16) 45%, transparent 60%)",
        }}
      />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-widest text-white/60">
            Carte fidélité
          </p>
          <p className="mt-0.5 text-base font-semibold text-white">Votre Commerce</p>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-sm font-semibold text-white">
          VC
        </div>
      </div>

      <div className="relative mt-8 flex items-end justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-white/50">Points</p>
          <p className="font-mono text-2xl font-semibold text-gold-200">1 240</p>
        </div>
        <QrPattern />
      </div>
    </div>
  );
}

function LockScreen() {
  return (
    <div className="flex h-full flex-col items-center px-6 pt-20">
      <p className="font-mono text-5xl font-light text-white">9:41</p>
      <p className="mt-1 text-xs text-white/50">Lundi 21 juillet</p>

      <div className="mt-10 w-full rounded-2xl bg-white/10 p-3.5 text-left backdrop-blur-md ring-1 ring-white/10">
        <div className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[9px] bg-gradient-to-br from-primary-500 to-primary-800 text-[10px] font-bold text-white">
            PL
          </span>
          <p className="text-[11px] font-medium text-white/90">PassLoyal</p>
          <span className="ml-auto text-[10px] text-white/40">maintenant</span>
        </div>
        <p className="mt-2 text-[13px] leading-snug text-white">
          Nouvelle récompense débloquée — <span className="text-gold-300">+50 points</span>{" "}
          chez Votre Commerce.
        </p>
      </div>
    </div>
  );
}

export function PhoneMockup({
  variant = "apple",
  screen = "wallet",
  className,
  floating = true,
}: {
  variant?: Variant;
  screen?: Screen;
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
          <div
            className="pointer-events-none absolute inset-0 z-30 opacity-[0.06]"
            style={{
              background:
                "linear-gradient(125deg, white 10%, transparent 28%, transparent 72%, white 90%)",
            }}
          />
          {variant === "apple" ? (
            <div className="absolute left-1/2 top-3 z-20 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />
          ) : (
            <div className="absolute left-1/2 top-4 z-20 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-black/70" />
          )}

          {screen === "wallet" ? (
            <>
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
            </>
          ) : (
            <div className="relative z-0 h-full">
              <LockScreen />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
