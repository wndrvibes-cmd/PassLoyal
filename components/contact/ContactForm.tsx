"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { site } from "@/lib/content/site";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "");
    const email = String(form.get("email") ?? "");
    const subject = String(form.get("subject") ?? "Demande de contact");
    const message = String(form.get("message") ?? "");

    const body = `Nom : ${name}\nE-mail : ${email}\n\n${message}`;
    const mailto = `mailto:${site.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
    setSent(true);
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
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" name="email" type="email" placeholder="jeanne@moncommerce.fr" required />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="subject">Sujet</Label>
        <Input id="subject" name="subject" placeholder="Demande de démo" required />
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
        Envoyer le message
        <Send className="h-4 w-4" />
      </Button>

      <p className="text-xs text-muted-foreground" role="status">
        {sent
          ? "Votre client e-mail s'est ouvert avec votre message pré-rempli — il ne reste plus qu'à l'envoyer."
          : `En envoyant ce formulaire, votre application e-mail s'ouvrira avec un message pré-rempli à destination de ${site.email}.`}
      </p>
    </form>
  );
}
