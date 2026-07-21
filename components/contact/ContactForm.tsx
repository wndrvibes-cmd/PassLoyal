"use client";

import { useState, type FormEvent } from "react";
import { Send, CheckCircle2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { site } from "@/lib/content/site";
import { sectors } from "@/lib/content/sectors";

type ContactPayload = {
  name: string;
  company: string;
  email: string;
  phone: string;
  sector: string;
  outlets: string;
  message: string;
};

const selectClassName = cn(
  "flex h-12 w-full rounded-xl border border-input bg-white px-4 py-2 text-sm shadow-sm transition-colors",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
  "disabled:cursor-not-allowed disabled:opacity-50"
);

/**
 * No backend is wired up yet — this opens a prefilled mailto: as an honest
 * fallback (same pattern as the rest of the site). Swapping to a real
 * provider later (Resend, Formspree, a custom /api/contact route) only
 * means replacing the body of this one function with a fetch() call; the
 * form UI and payload shape below don't need to change.
 */
function sendViaMailto(payload: ContactPayload) {
  const body = [
    `Nom : ${payload.name}`,
    `Entreprise : ${payload.company}`,
    `E-mail : ${payload.email}`,
    payload.phone ? `Téléphone : ${payload.phone}` : null,
    `Type de commerce : ${payload.sector}`,
    `Nombre de points de vente : ${payload.outlets}`,
    "",
    payload.message,
  ]
    .filter(Boolean)
    .join("\n");

  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(
    "Demande de démo PassLoyal"
  )}&body=${encodeURIComponent(body)}`;

  window.location.href = mailto;
}

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    const payload: ContactPayload = {
      name: String(form.get("name") ?? ""),
      company: String(form.get("company") ?? ""),
      email: String(form.get("email") ?? ""),
      phone: String(form.get("phone") ?? ""),
      sector: String(form.get("sector") ?? ""),
      outlets: String(form.get("outlets") ?? ""),
      message: String(form.get("message") ?? ""),
    };

    sendViaMailto(payload);
    setSent(true);
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-border bg-white p-8 text-center shadow-soft">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <CheckCircle2 className="h-6 w-6" />
        </span>
        <div>
          <p className="font-semibold text-foreground">Votre client e-mail s&apos;est ouvert</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Votre message est pré-rempli à destination de {site.email} — il ne reste plus qu&apos;à
            l&apos;envoyer. Notre équipe vous répond sous 24h ouvrées.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="text-sm font-medium text-primary hover:text-primary-700"
        >
          Revenir au formulaire
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 rounded-3xl border border-border bg-white p-8 shadow-soft"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Nom complet</Label>
          <Input id="name" name="name" placeholder="Jeanne Dupont" required />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="company">Entreprise</Label>
          <Input id="company" name="company" placeholder="Café Lumière" required />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" name="email" type="email" placeholder="jeanne@moncommerce.fr" required />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="phone">Téléphone (facultatif)</Label>
          <Input id="phone" name="phone" type="tel" placeholder="06 12 34 56 78" />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="sector">Type de commerce</Label>
          <select id="sector" name="sector" required defaultValue="" className={selectClassName}>
            <option value="" disabled>
              Sélectionnez votre secteur
            </option>
            {sectors.map((sector) => (
              <option key={sector.label} value={sector.label}>
                {sector.label}
              </option>
            ))}
            <option value="Autre">Autre</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="outlets">Nombre de points de vente</Label>
          <select id="outlets" name="outlets" required defaultValue="" className={selectClassName}>
            <option value="" disabled>
              Sélectionnez
            </option>
            <option value="1">1 commerce</option>
            <option value="2-5">2 à 5</option>
            <option value="6-20">6 à 20</option>
            <option value="20+">Plus de 20</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Parlez-nous de votre commerce et de vos objectifs de fidélisation…"
          required
        />
      </div>

      <Button type="submit" size="lg" className="mt-2 self-start">
        Demander une démo
        <Send className="h-4 w-4" />
      </Button>

      <p className="text-xs text-muted-foreground">
        En envoyant ce formulaire, votre application e-mail s&apos;ouvrira avec un message
        pré-rempli à destination de {site.email}.
      </p>
    </form>
  );
}
