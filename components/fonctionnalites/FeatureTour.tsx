"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BarChart3, Store, LayoutDashboard, Palette } from "lucide-react";

import { cn } from "@/lib/utils";
import { Container } from "@/components/shared/Container";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { PhoneMockup } from "@/components/shared/PhoneMockup";

const QR_CELLS = [
  1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1,
];

function ConfigVisual() {
  return (
    <div className="flex h-64 w-full max-w-sm flex-col gap-4 rounded-2xl border border-border bg-white p-5 shadow-soft-lg">
      <div className="flex items-center gap-3">
        <span className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-800" />
        <div className="flex-1">
          <div className="h-2 w-24 rounded-full bg-foreground/10" />
          <div className="mt-1.5 h-2 w-16 rounded-full bg-foreground/10" />
        </div>
      </div>
      <div>
        <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          Couleur de marque
        </p>
        <div className="mt-2 flex gap-2">
          {["bg-primary-500", "bg-ink", "bg-gold-400", "bg-emerald-500"].map((c, i) => (
            <span
              key={c}
              className={cn(
                "h-7 w-7 rounded-full ring-2 ring-offset-2",
                c,
                i === 0 ? "ring-primary-500" : "ring-transparent"
              )}
            />
          ))}
        </div>
      </div>
      <div>
        <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          Règle de points
        </p>
        <div className="mt-2 flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-xs text-foreground/80">
          1€ dépensé = 1 point
        </div>
      </div>
    </div>
  );
}

function QrVisual() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative flex h-64 w-full max-w-sm items-center justify-center rounded-2xl bg-ink">
      <div className="grid grid-cols-5 gap-[3px] rounded-lg bg-white p-2.5">
        {QR_CELLS.map((filled, i) => (
          <span key={i} className={cn("h-2.5 w-2.5 rounded-[1px]", filled ? "bg-ink" : "bg-transparent")} />
        ))}
      </div>
      <motion.span
        className="absolute h-40 w-40 rounded-2xl border-2 border-primary-400"
        animate={reduceMotion ? { opacity: 0.8 } : { scale: [1, 1.06, 1], opacity: [0.5, 1, 0.5] }}
        transition={reduceMotion ? undefined : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function NotificationVisual() {
  return (
    <div className="flex h-64 w-full max-w-sm items-center justify-center">
      <PhoneMockup variant="apple" screen="lockscreen" floating={false} className="w-[200px]" />
    </div>
  );
}

function StatsVisual() {
  const bars = [40, 65, 50, 80, 70, 95];
  return (
    <div className="flex h-64 w-full max-w-sm flex-col justify-end gap-4 rounded-2xl border border-border bg-white p-6 shadow-soft-lg">
      <div className="flex items-center gap-2 text-muted-foreground">
        <BarChart3 className="h-4 w-4" />
        <p className="text-xs font-medium">Visites par semaine</p>
      </div>
      <div className="flex h-32 items-end gap-2.5">
        {bars.map((h, i) => (
          <span
            key={i}
            className="flex-1 rounded-t-md bg-gradient-to-t from-primary-600 to-primary-400"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  );
}

function MultiStoreVisual() {
  return (
    <div className="flex h-64 w-full max-w-sm items-center justify-center gap-6 rounded-2xl border border-border bg-white p-6 shadow-soft-lg">
      <div className="flex flex-col gap-3">
        {[1, 2, 3].map((i) => (
          <span key={i} className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-muted-foreground">
            <Store className="h-4 w-4" />
          </span>
        ))}
      </div>
      <div className="h-px flex-1 border-t border-dashed border-border" />
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-ink text-white">
        <LayoutDashboard className="h-6 w-6" />
      </span>
    </div>
  );
}

function PersonalizationVisual() {
  return (
    <div className="flex h-64 w-full max-w-sm items-center justify-center rounded-2xl border border-border bg-white p-6 shadow-soft-lg">
      <div className="flex flex-col items-center gap-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Palette className="h-6 w-6" />
        </span>
        <div className="flex gap-2">
          {["bg-primary-500", "bg-gold-400", "bg-emerald-500", "bg-rose-400"].map((c) => (
            <span key={c} className={cn("h-6 w-6 rounded-full", c)} />
          ))}
        </div>
        <div className="w-40 rounded-xl bg-gradient-to-br from-primary-500 to-ink p-3">
          <p className="text-[10px] font-medium text-white/70">Aperçu de la carte</p>
          <p className="mt-1 text-xs font-semibold text-white">Votre Commerce</p>
        </div>
      </div>
    </div>
  );
}

const stops = [
  {
    number: "01",
    title: "Créez votre programme",
    description:
      "Définissez vos règles de points et vos récompenses en quelques minutes, sans compétence technique.",
    Visual: ConfigVisual,
  },
  {
    number: "02",
    title: "Ajoutez à Apple Wallet",
    description: "Vos clients ajoutent leur carte en un tap, directement dans l'app Wallet native d'iPhone.",
    Visual: () => (
      <div className="flex h-64 w-full max-w-sm items-center justify-center">
        <PhoneMockup variant="apple" floating={false} className="w-[200px]" />
      </div>
    ),
  },
  {
    number: "03",
    title: "Compatible Google Wallet",
    description: "La même expérience premium sur Android, avec Google Wallet.",
    Visual: () => (
      <div className="flex h-64 w-full max-w-sm items-center justify-center">
        <PhoneMockup variant="google" floating={false} className="w-[200px]" />
      </div>
    ),
  },
  {
    number: "04",
    title: "QR code intelligent",
    description: "Un scan en caisse suffit pour créditer les points, avec le matériel que vous avez déjà.",
    Visual: QrVisual,
  },
  {
    number: "05",
    title: "Notifications",
    description: "Relancez vos clients au bon moment, directement sur leur écran verrouillé.",
    Visual: NotificationVisual,
  },
  {
    number: "06",
    title: "Statistiques",
    description: "Suivez l'engagement et la fréquence de visite depuis un tableau de bord clair.",
    Visual: StatsVisual,
  },
  {
    number: "07",
    title: "Gestion multi-boutiques",
    description: "Pilotez plusieurs établissements depuis un seul espace centralisé.",
    Visual: MultiStoreVisual,
  },
  {
    number: "08",
    title: "Personnalisation",
    description: "Logo, couleurs et récompenses : votre carte reflète votre identité de marque.",
    Visual: PersonalizationVisual,
  },
];

export function FeatureTour() {
  return (
    <section className="bg-white py-4 sm:py-8">
      <Container className="flex flex-col gap-20 py-16 sm:gap-28">
        <h2 className="sr-only">Découvrir PassLoyal fonctionnalité par fonctionnalité</h2>
        {stops.map((stop, index) => {
          const reversed = index % 2 === 1;
          return (
            <div
              key={stop.number}
              className={cn(
                "grid items-center gap-10 lg:grid-cols-2 lg:gap-16",
                reversed && "lg:[&>*:first-child]:order-2"
              )}
            >
              <RevealOnScroll>
                <p className="text-sm font-medium text-primary">{stop.number}</p>
                <h3 className="mt-3 text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
                  {stop.title}
                </h3>
                <p className="mt-3 max-w-md leading-relaxed text-muted-foreground">
                  {stop.description}
                </p>
              </RevealOnScroll>

              <RevealOnScroll delay={0.1} className="flex justify-center">
                <stop.Visual />
              </RevealOnScroll>
            </div>
          );
        })}
      </Container>
    </section>
  );
}
