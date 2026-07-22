"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { QrCode, ShoppingBag, Gift, type LucideIcon } from "lucide-react";

import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { PhoneMockup } from "@/components/shared/PhoneMockup";
import { CountUp } from "@/components/shared/CountUp";

type Node =
  | { kind: "icon"; icon: LucideIcon; label: string }
  | { kind: "phone"; screen: "wallet" | "lockscreen"; label: string }
  | { kind: "points"; label: string };

const nodes: Node[] = [
  { kind: "icon", icon: QrCode, label: "Le client scanne le QR code en caisse" },
  { kind: "phone", screen: "wallet", label: "Il ajoute PassLoyal à son Apple Wallet ou Google Wallet" },
  { kind: "icon", icon: ShoppingBag, label: "Il effectue un achat en boutique" },
  { kind: "points", label: "Ses points augmentent automatiquement" },
  { kind: "phone", screen: "lockscreen", label: "Il reçoit une notification pour sa récompense" },
  { kind: "icon", icon: Gift, label: "Il débloque sa récompense suivante" },
];

function PointsNode() {
  return (
    <span className="flex h-16 w-16 flex-col items-center justify-center gap-0.5 rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur">
      <span className="font-mono text-lg font-semibold text-gold-200">
        +<CountUp value={20} />
      </span>
      <span className="text-[9px] uppercase tracking-wider text-ink-muted">points</span>
    </span>
  );
}

export function ClientJourney() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "end 0.4"],
  });
  const lineProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section className="bg-ink py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Expérience client"
          title="Une expérience pensée pour vos clients."
          tone="dark"
        />

        <div ref={sectionRef} className="relative mx-auto mt-16 flex max-w-md flex-col items-center gap-10">
          <div className="pointer-events-none absolute left-1/2 top-4 h-[calc(100%-2rem)] w-px -translate-x-1/2 bg-white/10" />
          {!reduceMotion ? (
            <motion.div
              className="pointer-events-none absolute left-1/2 top-4 w-px -translate-x-1/2 bg-gradient-to-b from-primary-400 via-gold-300 to-primary-400 origin-top"
              style={{ height: "calc(100% - 2rem)", scaleY: lineProgress }}
            />
          ) : null}

          {nodes.map((node, index) => (
            <RevealOnScroll
              key={index}
              delay={index * 0.06}
              className="relative z-10 flex flex-col items-center gap-3"
            >
              {node.kind === "icon" ? (
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-primary-300 backdrop-blur">
                  <node.icon className="h-6 w-6" strokeWidth={1.75} />
                </span>
              ) : node.kind === "points" ? (
                <PointsNode />
              ) : (
                <PhoneMockup
                  variant="apple"
                  screen={node.screen}
                  floating={false}
                  className="w-[168px]"
                />
              )}
              <p className="max-w-[220px] text-balance text-center text-sm leading-snug text-ink-muted">
                {node.label}
              </p>
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}
