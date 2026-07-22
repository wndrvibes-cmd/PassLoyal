"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { FileText, Ban, UserX, WalletCards, HeartHandshake, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Container } from "@/components/shared/Container";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";

const stages = [
  { icon: FileText, label: "Carte papier", muted: true },
  { icon: Ban, label: "Oubliée", muted: true },
  { icon: UserX, label: "Client perdu", muted: true },
  { icon: WalletCards, label: "PassLoyal", muted: false },
  { icon: HeartHandshake, label: "Relation durable", muted: false },
];

export function Transformation() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section className="bg-secondary/40 py-20 sm:py-24">
      <Container>
        <RevealOnScroll className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Pourquoi PassLoyal existe
          </p>
          <h2 className="mt-3 text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
            D&apos;une carte qu&apos;on oublie à une relation qui dure
          </h2>
        </RevealOnScroll>

        <div ref={ref} className="relative mx-auto mt-14 max-w-3xl">
          <div className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px bg-border sm:block" />
          {!reduceMotion ? (
            <motion.div
              className="pointer-events-none absolute left-0 top-7 hidden h-px origin-left bg-gradient-to-r from-muted-foreground/40 via-primary to-primary sm:block"
              style={{ right: 0, scaleX: progress }}
            />
          ) : null}

          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-5 sm:gap-x-2">
            {stages.map((stage, index) => (
              <RevealOnScroll
                key={stage.label}
                delay={index * 0.08}
                className={cn(
                  "relative flex flex-col items-center gap-3 text-center",
                  index === 2 && "col-span-2 sm:col-span-1"
                )}
              >
                <span
                  className={cn(
                    "flex h-14 w-14 items-center justify-center rounded-2xl border shadow-soft",
                    stage.muted
                      ? "border-border bg-white text-muted-foreground"
                      : "border-primary/20 bg-gradient-to-br from-primary-500 to-primary-800 text-white"
                  )}
                >
                  <stage.icon className="h-6 w-6" strokeWidth={1.75} />
                </span>
                <p
                  className={cn(
                    "text-sm font-medium",
                    stage.muted ? "text-muted-foreground" : "text-foreground"
                  )}
                >
                  {stage.label}
                </p>
                {index < stages.length - 1 ? (
                  <ArrowRight className="absolute -right-3 top-5 hidden h-4 w-4 text-border sm:-right-4 sm:block" />
                ) : null}
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
