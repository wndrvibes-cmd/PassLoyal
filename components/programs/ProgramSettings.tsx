"use client";

import { CreditCard, Gift, QrCode, Sparkles, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProgramFormValues } from "@/lib/validations/program";
import type { RewardType } from "@/types/database";

interface ProgramSettingsProps {
  draft: ProgramFormValues;
  onChange: (patch: Partial<ProgramFormValues>) => void;
  errors: Partial<Record<keyof ProgramFormValues, string>>;
}

const REWARD_TYPE_OPTIONS: {
  value: RewardType;
  label: string;
  description: string;
  icon: typeof CreditCard;
}[] = [
  {
    value: "points",
    label: "Carte à points",
    description: "1 point par action, récompense à X points.",
    icon: Sparkles,
  },
  {
    value: "stamps",
    label: "Carte à tampons",
    description: "Un tampon par visite, récompense après X tampons.",
    icon: CreditCard,
  },
  {
    value: "custom",
    label: "Récompenses personnalisées",
    description: "Définissez vos propres règles dans la description.",
    icon: Gift,
  },
];

export default function ProgramSettings({ draft, onChange, errors }: ProgramSettingsProps) {
  const isStamps = draft.reward_type === "stamps";
  const isCustom = draft.reward_type === "custom";
  const isPoints = draft.reward_type === "points";

  return (
    <div className="space-y-6">
      <fieldset>
        <legend className="mb-2 text-[13.5px] font-medium text-slate-700">
          Type de programme
        </legend>
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
          {REWARD_TYPE_OPTIONS.map((type) => {
            const Icon = type.icon;
            const isSelected = draft.reward_type === type.value;
            return (
              <label
                key={type.value}
                className={cn(
                  "flex cursor-pointer flex-col gap-2 rounded-xl border p-3.5 transition-colors",
                  isSelected
                    ? "border-indigo-400 bg-indigo-50/70 ring-1 ring-indigo-400"
                    : "border-slate-200 hover:border-slate-300"
                )}
              >
                <input
                  type="radio"
                  name="reward_type"
                  value={type.value}
                  checked={isSelected}
                  onChange={() => onChange({ reward_type: type.value })}
                  className="sr-only"
                />
                <Icon className={cn("h-4 w-4", isSelected ? "text-indigo-600" : "text-slate-400")} />
                <span className="text-[13px] font-medium text-slate-900">{type.label}</span>
                <span className="text-[11.5px] leading-snug text-slate-500">
                  {type.description}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {!isCustom && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="points_per_visit"
              className="mb-1.5 block text-[13.5px] font-medium text-slate-700"
            >
              {isStamps ? "Tampons par visite" : "Points par visite"}
            </label>
            <input
              id="points_per_visit"
              type="number"
              min={0}
              value={draft.points_per_visit}
              onChange={(event) => onChange({ points_per_visit: Number(event.target.value) })}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[14px] text-slate-900 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
            />
            {errors.points_per_visit && (
              <p className="mt-1 text-[12px] text-red-600">{errors.points_per_visit}</p>
            )}
          </div>

          {isPoints && (
            <div>
              <label
                htmlFor="points_per_euro"
                className="mb-1.5 block text-[13.5px] font-medium text-slate-700"
              >
                Points par euro dépensé
              </label>
              <input
                id="points_per_euro"
                type="number"
                min={0}
                step="0.1"
                value={draft.points_per_euro}
                onChange={(event) => onChange({ points_per_euro: Number(event.target.value) })}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[14px] text-slate-900 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
              />
              {errors.points_per_euro && (
                <p className="mt-1 text-[12px] text-red-600">{errors.points_per_euro}</p>
              )}
            </div>
          )}

          <div>
            <label
              htmlFor="reward_points"
              className="mb-1.5 block text-[13.5px] font-medium text-slate-700"
            >
              {isStamps ? "Tampons requis pour la récompense" : "Points requis pour la récompense"}
            </label>
            <input
              id="reward_points"
              type="number"
              min={1}
              value={draft.reward_points}
              onChange={(event) => onChange({ reward_points: Number(event.target.value) })}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[14px] text-slate-900 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
            />
            {errors.reward_points && (
              <p className="mt-1 text-[12px] text-red-600">{errors.reward_points}</p>
            )}
          </div>
        </div>
      )}

      {isCustom && (
        <p className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-[13px] text-slate-500">
          Décrivez les règles de votre récompense personnalisée dans le champ « Description »
          ci-dessus.
        </p>
      )}

      <div className="space-y-2.5">
        <p className="text-[13.5px] font-medium text-slate-700">Canaux activés</p>

        <ToggleRow
          icon={Wallet}
          label="Apple Wallet & Google Wallet"
          description="Vos clients ajoutent leur carte à leur portefeuille mobile."
          checked={draft.wallet_enabled}
          onChange={(checked) => onChange({ wallet_enabled: checked })}
        />
        <ToggleRow
          icon={QrCode}
          label="QR Code"
          description="Scan en caisse pour créditer points ou tampons."
          checked={draft.qr_code_enabled}
          onChange={(checked) => onChange({ qr_code_enabled: checked })}
        />
      </div>
    </div>
  );
}

function ToggleRow({
  icon: Icon,
  label,
  description,
  checked,
  onChange,
}: {
  icon: typeof Wallet;
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-slate-200 p-3.5">
      <span className="flex items-start gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
          <Icon className="h-4 w-4" />
        </span>
        <span>
          <span className="block text-[13px] font-medium text-slate-900">{label}</span>
          <span className="block text-[11.5px] text-slate-500">{description}</span>
        </span>
      </span>
      <span className="relative inline-flex h-6 w-11 shrink-0 items-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          className="peer sr-only"
        />
        <span className="h-6 w-11 rounded-full bg-slate-200 transition-colors peer-checked:bg-indigo-600" />
        <span className="absolute left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5" />
      </span>
    </label>
  );
}
