"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles, QrCode } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/shared/Container";
import { PhoneMockup } from "@/components/shared/PhoneMockup";
import { AmbientGlow } from "@/components/shared/AmbientGlow";
import { TiltCard } from "@/components/shared/TiltCard";
import { CountUp } from "@/components/shared/CountUp";
import { featureIcons } from "@/components/shared/featureIcons";
import { reassurancePoints } from "@/lib/content/misc";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-ink">
      <div className="pointer-events-none absolute inset-0 bg-grid mask-fade-x opacity-40" />
      <AmbientGlow variant="hero" />

      <Container className="relative grid gap-10 pb-24 pt-14 md:gap-8 lg:grid-cols-2 lg:items-center lg:gap-12 lg:pb-32 lg:pt-24">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={container}
          className="flex flex-col items-start gap-7"
        >
          <motion.div variants={item}>
            <Badge variant="outline-light">
              <Sparkles className="h-3.5 w-3.5" />
              Le programme de fidélité directement dans le Wallet
            </Badge>
          </motion.div>

          <motion.h1
            variants={item}
            className="text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]"
          >
            Vos cartes de fidélité, déjà dans la poche de vos clients.
          </motion.h1>

          <motion.p
            variants={item}
            className="max-w-lg text-balance text-lg leading-relaxed text-ink-muted"
          >
            PassLoyal transforme votre programme de fidélité en carte Apple Wallet et Google
            Wallet — sans application à télécharger, sans carte plastique.
          </motion.p>

          <motion.div variants={item} className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/contact">
                Demander une démo
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline-light">
              <Link href="/fonctionnalites">Découvrir PassLoyal</Link>
            </Button>
          </motion.div>

          <motion.div
            variants={item}
            className="grid w-full grid-cols-2 gap-x-6 gap-y-4 border-t border-white/10 pt-8 sm:grid-cols-4"
          >
            {reassurancePoints.map((point) => {
              const Icon = featureIcons[point.icon];
              return (
                <div key={point.label} className="flex items-center gap-2">
                  <Icon className="h-4 w-4 shrink-0 text-primary-300" strokeWidth={2.25} />
                  <p className="text-xs leading-snug text-ink-muted">{point.label}</p>
                </div>
              );
            })}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto flex w-full max-w-lg items-center justify-center py-4 lg:py-0"
        >
          <TiltCard strength={4} className="relative flex w-full items-center justify-center">
            <div
              className="pointer-events-none absolute bottom-6 left-1/2 h-10 w-64 -translate-x-1/2 rounded-full bg-black/50 blur-2xl sm:w-72"
              aria-hidden
            />

            <div className="absolute -left-2 top-16 hidden -rotate-[10deg] scale-[0.82] opacity-90 sm:block">
              <PhoneMockup variant="google" floating={false} />
            </div>

            <div className="relative z-10 rotate-[4deg]">
              <PhoneMockup variant="apple" className="w-[250px] sm:w-[290px] lg:w-[320px]" />
            </div>

            <motion.div
              className="absolute -left-2 top-40 z-20 hidden items-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.07] px-3 py-2.5 shadow-soft-lg backdrop-blur-md sm:left-2 sm:top-48 sm:flex"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={
                reduceMotion
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 1, scale: 1, y: [0, 8, 0] }
              }
              transition={
                reduceMotion
                  ? { duration: 0.4, delay: 0.5 }
                  : {
                      opacity: { duration: 0.4, delay: 0.6 },
                      scale: { duration: 0.4, delay: 0.6 },
                      y: { duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 },
                    }
              }
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-ink">
                <QrCode className="h-4 w-4" />
              </span>
              <p className="text-xs font-medium text-white">Scannez pour ajouter</p>
            </motion.div>

            <motion.div
              className="absolute -right-2 top-6 z-20 hidden items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.07] px-3 py-2.5 shadow-soft-lg backdrop-blur-md sm:right-4 sm:top-10 sm:flex"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={
                reduceMotion
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 1, scale: 1, y: [0, -8, 0] }
              }
              transition={
                reduceMotion
                  ? { duration: 0.4, delay: 1 }
                  : {
                      opacity: { duration: 0.4, delay: 1.1 },
                      scale: { duration: 0.4, delay: 1.1 },
                      y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.1 },
                    }
              }
            >
              <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold-400/20 text-gold-200">
                {!reduceMotion ? (
                  <motion.span
                    className="absolute inset-0 rounded-full bg-gold-300/60"
                    initial={{ opacity: 0.9, scale: 0.6 }}
                    animate={{ opacity: 0, scale: 2.2 }}
                    transition={{ duration: 0.9, delay: 1.1, ease: "easeOut" }}
                  />
                ) : null}
                <Sparkles className="relative h-4 w-4" />
              </span>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-ink-muted">Récompense</p>
                <p className="font-mono text-sm font-semibold text-white">
                  +<CountUp value={50} /> points
                </p>
              </div>
            </motion.div>
          </TiltCard>
        </motion.div>
      </Container>
    </section>
  );
}
