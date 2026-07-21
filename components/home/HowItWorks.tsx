"use client";

import { motion, useReducedMotion } from "framer-motion";
import { WalletCards, Bell, Gift } from "lucide-react";

import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { howItWorksSteps, type Step } from "@/lib/content/misc";

function ScanVisual() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative flex h-36 w-full items-center justify-center rounded-2xl bg-ink">
      <div className="grid grid-cols-5 gap-[3px] rounded-lg bg-white p-2">
        {Array.from({ length: 25 }).map((_, i) => (
          <span
            key={i}
            className={
              "h-2 w-2 rounded-[1px] " + ([1, 3, 5, 8, 11, 13, 15, 18, 21, 23].includes(i) ? "bg-ink" : "bg-transparent")
            }
          />
        ))}
      </div>
      <motion.span
        className="absolute h-24 w-24 rounded-xl border-2 border-primary-400"
        animate={reduceMotion ? { opacity: 0.8 } : { scale: [1, 1.08, 1], opacity: [0.5, 1, 0.5] }}
        transition={reduceMotion ? undefined : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function AddVisual() {
  return (
    <div className="flex h-36 w-full items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 via-primary-700 to-ink">
      <div className="flex flex-col items-center gap-2">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white ring-1 ring-white/20">
          <WalletCards className="h-6 w-6" />
        </span>
        <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-[10px] font-medium text-white">
          + Ajoutée
        </span>
      </div>
    </div>
  );
}

function ReturnVisual() {
  return (
    <div className="relative flex h-36 w-full items-center justify-center rounded-2xl bg-secondary/60">
      <div className="flex items-center gap-3">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-primary shadow-soft">
          <Gift className="h-6 w-6" />
        </span>
        <div className="rounded-2xl bg-white px-3 py-2 shadow-soft">
          <p className="flex items-center gap-1 text-xs font-medium text-foreground">
            <Bell className="h-3.5 w-3.5 text-gold-500" />
            Récompense débloquée
          </p>
          <p className="mt-0.5 font-mono text-sm font-semibold text-primary">+50 points</p>
        </div>
      </div>
    </div>
  );
}

const visuals: Record<Step["visual"], () => React.ReactElement> = {
  scan: ScanVisual,
  add: AddVisual,
  return: ReturnVisual,
};

export function HowItWorks() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Comment ça fonctionne"
          title="Trois étapes, aucune friction"
          description="De la découverte de la carte à la fidélisation quotidienne, du point de vue de votre client."
        />

        <div className="relative mt-16 grid gap-8 md:grid-cols-3 md:gap-6">
          <div className="pointer-events-none absolute left-0 right-0 top-8 hidden h-px bg-border md:block" />
          {howItWorksSteps.map((step, index) => {
            const Visual = visuals[step.visual];
            return (
              <RevealOnScroll key={step.number} delay={index * 0.1}>
                <div className="relative flex h-full flex-col gap-5 rounded-3xl border border-border bg-white p-6 shadow-soft">
                  <div className="flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink font-mono text-sm font-semibold text-white">
                      {step.number}
                    </span>
                  </div>
                  <Visual />
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">{step.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
