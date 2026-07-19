"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/shared/Container";
import { PhoneMockup } from "@/components/shared/PhoneMockup";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { stats } from "@/lib/content/misc";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink">
      <div className="pointer-events-none absolute inset-0 bg-grid mask-fade-x opacity-40" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-primary-600/30 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[360px] w-[360px] rounded-full bg-primary-400/20 blur-[110px]" />

      <Container className="relative grid gap-16 pb-24 pt-14 lg:grid-cols-2 lg:items-center lg:gap-12 lg:pb-32 lg:pt-24">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={container}
          className="flex flex-col items-start gap-7"
        >
          <motion.div variants={item}>
            <Badge variant="outline-light">
              <Sparkles className="h-3.5 w-3.5" />
              Déjà 1200+ commerçants fidélisent avec PassLoyal
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
            Wallet — sans application, sans carte plastique, avec des statistiques en temps réel.
          </motion.p>

          <motion.div variants={item} className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/contact">
                Demander une démo
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline-light">
              <Link href="/fonctionnalites">Voir les fonctionnalités</Link>
            </Button>
          </motion.div>

          <motion.div
            variants={item}
            className="grid w-full grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4"
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-mono text-2xl font-semibold text-white sm:text-3xl">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-1 text-xs text-ink-muted">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto flex w-full max-w-sm items-center justify-center py-4 lg:py-0"
        >
          <div className="absolute -left-4 top-10 hidden -rotate-6 scale-[0.85] opacity-70 sm:block">
            <PhoneMockup variant="google" floating={false} />
          </div>
          <div className="relative rotate-3">
            <PhoneMockup variant="apple" />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
