"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Gift } from "lucide-react";

import { Container } from "@/components/shared/Container";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { AmbientGlow } from "@/components/shared/AmbientGlow";
import { PhoneMockup } from "@/components/shared/PhoneMockup";
import { TiltCard } from "@/components/shared/TiltCard";
import { Button } from "@/components/ui/button";

export function CtaFinal() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-ink py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
      <AmbientGlow variant="cta" />

      <Container className="relative grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-10">
        <RevealOnScroll className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Prêt à transformer vos clients occasionnels en habitués ?
          </h2>
          <p className="max-w-lg text-balance text-lg text-ink-muted">
            Lancez votre programme de fidélité Apple Wallet et Google Wallet en moins de 15
            minutes, sans engagement.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/contact">
                Demander une démo
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline-light">
              <Link href="/tarifs">Voir les tarifs</Link>
            </Button>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1} className="flex justify-center">
          <TiltCard strength={5} className="relative flex w-full max-w-[260px] items-center justify-center py-6">
            <div
              className="pointer-events-none absolute bottom-2 left-1/2 h-8 w-48 -translate-x-1/2 rounded-full bg-black/50 blur-2xl"
              aria-hidden
            />
            <PhoneMockup variant="apple" className="w-[220px]" />
            <motion.div
              className="absolute -right-4 top-4 z-20 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.07] px-3 py-2 shadow-soft-lg backdrop-blur-md"
              animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
              transition={reduceMotion ? undefined : { duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold-400/20 text-gold-200">
                <Gift className="h-3.5 w-3.5" />
              </span>
              <p className="text-xs font-medium text-white">Récompense débloquée</p>
            </motion.div>
          </TiltCard>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
