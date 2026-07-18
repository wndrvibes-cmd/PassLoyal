"use client";

import { motion } from "framer-motion";
import { Award, Smartphone } from "lucide-react";
import type { LoyaltyLevel } from "@/types/database";

export interface CardPreviewData {
  businessName: string;
  logoUrl: string;
  bannerUrl: string;
  primaryColor: string;
  secondaryColor: string;
  memberName: string;
  points: number;
  level: LoyaltyLevel;
}

const LOYALTY_LEVEL_LABELS: Record<LoyaltyLevel, string> = {
  bronze: "Bronze",
  silver: "Argent",
  gold: "Or",
  platinum: "Platine",
};

interface CardPreviewProps {
  data: CardPreviewData;
}

export default function CardPreview({ data }: CardPreviewProps) {
  const businessName = data.businessName.trim() || "Votre commerce";
  const memberName = data.memberName.trim() || "Nom du client";

  return (
    <div className="space-y-4">
      <p className="text-[13px] font-medium uppercase tracking-[0.15em] text-slate-400">
        Aperçu en temps réel
      </p>

      {/* Apple Wallet style */}
      <motion.div
        layout
        className="relative w-full overflow-hidden rounded-2xl shadow-[0_20px_45px_-20px_rgba(15,23,42,0.45)]"
        style={{
          background: `linear-gradient(135deg, ${data.primaryColor}, ${data.secondaryColor})`,
        }}
      >
        {data.bannerUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={data.bannerUrl}
            alt=""
            className="h-20 w-full object-cover opacity-80"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
        )}
        <div className="p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {data.logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={data.logoUrl}
                  alt=""
                  className="h-7 w-7 rounded-md object-cover"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-white/20 text-white">
                  <Award className="h-4 w-4" />
                </span>
              )}
              <p className="truncate text-[12px] font-medium text-white/85">{businessName}</p>
            </div>
            <Smartphone className="h-4 w-4 text-white/70" />
          </div>

          <p className="mt-6 truncate text-[16px] font-semibold text-white">{memberName}</p>
          <p className="mt-1 text-[12px] text-white/75">
            {LOYALTY_LEVEL_LABELS[data.level]} · {data.points} points
          </p>
        </div>
      </motion.div>

      {/* Google Wallet style */}
      <motion.div
        layout
        className="relative w-full overflow-hidden rounded-2xl p-5 shadow-[0_18px_40px_-18px_rgba(15,23,42,0.4)]"
        style={{
          background: `linear-gradient(135deg, ${data.secondaryColor}, ${data.primaryColor})`,
        }}
      >
        <p className="text-[10px] font-medium tracking-wide text-white/80">GOOGLE WALLET</p>
        <p className="mt-4 truncate text-[14px] font-semibold text-white">{memberName}</p>
        <p className="mt-1 text-[11.5px] text-white/70">
          {businessName} · {LOYALTY_LEVEL_LABELS[data.level]} · {data.points} pts
        </p>
      </motion.div>
    </div>
  );
}
