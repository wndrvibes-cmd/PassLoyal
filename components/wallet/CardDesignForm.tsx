"use client";

import { useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import {
  walletCardDesignSchema,
  type WalletCardDesignFormValues,
} from "@/lib/validations/walletCardDesign";
import { updateCardDesign } from "@/services/wallet";
import type { WalletCardDesign } from "@/types/database";
import CardPreview from "./CardPreview";

function toDraft(design: WalletCardDesign): WalletCardDesignFormValues {
  return {
    business_name: design.business_name ?? "",
    description: design.description ?? "",
    logo_url: design.logo_url ?? "",
    icon_url: design.icon_url ?? "",
    banner_url: design.banner_url ?? "",
    primary_color: design.primary_color,
    secondary_color: design.secondary_color,
    address: design.address ?? "",
    phone: design.phone ?? "",
    website: design.website ?? "",
    facebook: design.social_links.facebook ?? "",
    instagram: design.social_links.instagram ?? "",
    twitter: design.social_links.twitter ?? "",
  };
}

interface CardDesignFormProps {
  cardDesign: WalletCardDesign;
  onSaved: (design: WalletCardDesign) => void;
}

export default function CardDesignForm({ cardDesign, onSaved }: CardDesignFormProps) {
  const [draft, setDraft] = useState<WalletCardDesignFormValues>(() => toDraft(cardDesign));
  const [errors, setErrors] = useState<
    Partial<Record<keyof WalletCardDesignFormValues, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const patchDraft = (patch: Partial<WalletCardDesignFormValues>) => {
    setDraft((previous) => ({ ...previous, ...patch }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = walletCardDesignSchema.safeParse(draft);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof WalletCardDesignFormValues, string>> = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof WalletCardDesignFormValues;
        fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      toast.error("Vérifiez les champs en erreur.");
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const supabase = createSupabaseBrowserClient();
      const saved = await updateCardDesign(supabase, cardDesign.id, result.data);
      toast.success("Carte enregistrée.");
      onSaved(saved);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Une erreur est survenue.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-8 lg:grid-cols-[1.3fr_1fr]">
      <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field
            id="business_name"
            label="Nom de l'entreprise"
            value={draft.business_name}
            onChange={(value) => patchDraft({ business_name: value })}
            error={errors.business_name}
            placeholder="Café des Halles"
          />
          <Field
            id="phone"
            label="Téléphone"
            type="tel"
            value={draft.phone}
            onChange={(value) => patchDraft({ phone: value })}
            error={errors.phone}
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="mb-1.5 block text-[13.5px] font-medium text-slate-700"
          >
            Description
          </label>
          <textarea
            id="description"
            rows={3}
            value={draft.description}
            onChange={(event) => patchDraft({ description: event.target.value })}
            placeholder="Une phrase qui présente votre commerce."
            className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[14px] text-slate-900 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
          />
          {errors.description && (
            <p className="mt-1 text-[12px] text-red-600">{errors.description}</p>
          )}
        </div>

        <Field
          id="address"
          label="Adresse"
          value={draft.address}
          onChange={(value) => patchDraft({ address: value })}
          error={errors.address}
          placeholder="12 rue des Halles, 75001 Paris"
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field
            id="logo_url"
            label="Logo (URL)"
            value={draft.logo_url}
            onChange={(value) => patchDraft({ logo_url: value })}
            error={errors.logo_url}
            placeholder="https://…"
          />
          <Field
            id="icon_url"
            label="Icône (URL)"
            value={draft.icon_url}
            onChange={(value) => patchDraft({ icon_url: value })}
            error={errors.icon_url}
            placeholder="https://…"
          />
        </div>
        <Field
          id="banner_url"
          label="Bannière (URL)"
          value={draft.banner_url}
          onChange={(value) => patchDraft({ banner_url: value })}
          error={errors.banner_url}
          placeholder="https://…"
        />

        <div className="grid grid-cols-2 gap-4">
          <ColorField
            id="primary_color"
            label="Couleur principale"
            value={draft.primary_color}
            onChange={(value) => patchDraft({ primary_color: value })}
            error={errors.primary_color}
          />
          <ColorField
            id="secondary_color"
            label="Couleur secondaire"
            value={draft.secondary_color}
            onChange={(value) => patchDraft({ secondary_color: value })}
            error={errors.secondary_color}
          />
        </div>

        <Field
          id="website"
          label="Site web"
          value={draft.website}
          onChange={(value) => patchDraft({ website: value })}
          error={errors.website}
          placeholder="https://…"
        />

        <div>
          <p className="mb-2 text-[13.5px] font-medium text-slate-700">Réseaux sociaux</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <Field
              id="facebook"
              label="Facebook"
              value={draft.facebook}
              onChange={(value) => patchDraft({ facebook: value })}
              error={errors.facebook}
              placeholder="https://facebook.com/…"
            />
            <Field
              id="instagram"
              label="Instagram"
              value={draft.instagram}
              onChange={(value) => patchDraft({ instagram: value })}
              error={errors.instagram}
              placeholder="https://instagram.com/…"
            />
            <Field
              id="twitter"
              label="Twitter / X"
              value={draft.twitter}
              onChange={(value) => patchDraft({ twitter: value })}
              error={errors.twitter}
              placeholder="https://x.com/…"
            />
          </div>
        </div>

        <div className="flex justify-end border-t border-slate-100 pt-5">
          <button
            type="submit"
            disabled={isSubmitting}
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-slate-900 px-6 py-2.5 text-[13.5px] font-medium text-white shadow-md shadow-slate-900/15 transition-transform hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-70"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-indigo-600 to-blue-500 transition-transform duration-300 group-hover:translate-x-0" />
            <span className="relative flex items-center gap-2">
              {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
              Enregistrer la carte
            </span>
          </button>
        </div>
      </div>

      <div>
        <CardPreview
          data={{
            businessName: draft.business_name,
            logoUrl: draft.logo_url,
            bannerUrl: draft.banner_url,
            primaryColor: draft.primary_color,
            secondaryColor: draft.secondary_color,
            memberName: "Jean Dupont",
            points: 120,
            level: "gold",
          }}
        />
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[13.5px] font-medium text-slate-700">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[14px] text-slate-900 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
      />
      {error && <p className="mt-1 text-[12px] text-red-600">{error}</p>}
    </div>
  );
}

function ColorField({
  id,
  label,
  value,
  onChange,
  error,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[13.5px] font-medium text-slate-700">
        {label}
      </label>
      <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2 py-1.5">
        <input
          type="color"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-label={label}
          className="h-8 w-8 shrink-0 cursor-pointer rounded-lg border-0 bg-transparent p-0"
        />
        <input
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full bg-transparent text-[13.5px] text-slate-700 focus:outline-none"
        />
      </div>
      {error && <p className="mt-1 text-[12px] text-red-600">{error}</p>}
    </div>
  );
}
