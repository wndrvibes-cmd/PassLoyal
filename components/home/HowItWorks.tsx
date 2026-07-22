"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { WalletCards, Bell, Gift, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { howItWorksSteps, type Step } from "@/lib/content/misc";

function ScanVisual() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-ink">
      <div className="grid grid-cols-5 gap-[2px] rounded-md bg-white p-1.5">
        {Array.from({ length: 25 }).map((_, i) => (
          <span
            key={i}
            className={
              "h-1.5 w-1.5 rounded-[1px] " + ([1, 3, 5, 8, 11, 13, 15, 18, 21, 23].includes(i) ? "bg-ink" : "bg-transparent")
            }
          />
        ))}
      </div>
      <motion.span
        className="absolute h-14 w-14 rounded-lg border-2 border-primary-400"
        animate={reduceMotion ? { opacity: 0.8 } : { scale: [1, 1.08, 1], opacity: [0.5, 1, 0.5] }}
        transition={reduceMotion ? undefined : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function AddVisual() {
  return (
    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 via-primary-700 to-ink">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-white ring-1 ring-white/20">
        <WalletCards className="h-5 w-5" />
      </span>
    </div>
  );
}

function ReturnVisual() {
  return (
    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-secondary/60">
      <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-white text-primary shadow-soft">
        <Gift className="h-5 w-5" />
        <Bell className="absolute -right-1.5 -top-1.5 h-4 w-4 rounded-full bg-gold-400 p-0.5 text-white" />
      </span>
    </div>
  );
}

const visuals: Record<Step["visual"], () => React.ReactElement> = {
  scan: ScanVisual,
  add: AddVisual,
  return: ReturnVisual,
};

export function HowItWorks() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.6"] });
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section className="bg-white py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Comment ça fonctionne"
          title="Trois étapes, aucune friction"
          description="De la découverte de la carte à la fidélisation quotidienne, du point de vue de votre client."
        />

        <div
          ref={ref}
          className="relative mt-16 overflow-hidden rounded-3xl border border-border bg-secondary/30 shadow-soft"
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 hidden h-px bg-border md:block" />
          {!reduceMotion ? (
            <motion.div
              className="pointer-events-none absolute left-0 top-0 hidden h-px origin-left bg-gradient-to-r from-primary-400 via-primary to-gold-400 md:block"
              style={{ right: 0, scaleX: progress }}
            />
          ) : null}

          <div className="grid md:grid-cols-3">
            {howItWorksSteps.map((step, index) => {
              const Visual = visuals[step.visual];
              return (
                <RevealOnScroll
                  key={step.number}
                  delay={index * 0.1}
                  className={cn(
                    "relative flex items-start gap-5 p-7 sm:p-8",
                    index !== 0 && "border-t border-border md:border-t-0 md:border-l"
                  )}
                >
                  {index !== 0 ? (
                    <ArrowRight className="absolute -left-3 top-1/2 hidden h-6 w-6 -translate-y-1/2 rounded-full bg-white text-muted-foreground/60 shadow-soft md:block" />
                  ) : null}
                  <Visual />
                  <div>
                    <span className="font-mono text-xs font-semibold text-primary">{step.number}</span>
                    <h3 className="mt-1 text-lg font-semibold tracking-tight">{step.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted-foreground">{step.description}</p>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
