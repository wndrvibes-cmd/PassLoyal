"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { QrCode, ShoppingBag, Gift, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
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

// Desktop scrollytelling: each step drives what the single sticky phone shows.
const steps = [
  { title: "Le client scanne le QR code", screen: "wallet" as const, tag: "Scan en caisse" },
  { title: "Il ajoute PassLoyal à son Wallet", screen: "wallet" as const, tag: "Carte ajoutée" },
  { title: "Il effectue un achat en boutique", screen: "wallet" as const, tag: "Achat validé" },
  { title: "Ses points augmentent automatiquement", screen: "wallet" as const, tag: "Points en hausse" },
  { title: "Il reçoit une notification pour sa récompense", screen: "lockscreen" as const, tag: "Notification" },
  { title: "Il débloque sa récompense suivante", screen: "lockscreen" as const, tag: "Récompense débloquée" },
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

function MobileJourney() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "end 0.4"],
  });
  const lineProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div ref={sectionRef} className="relative mx-auto mt-16 flex max-w-md flex-col items-center gap-10 lg:hidden">
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
            <PhoneMockup variant="apple" screen={node.screen} floating={false} className="w-[168px]" />
          )}
          <p className="max-w-[220px] text-balance text-center text-sm leading-snug text-ink-muted">
            {node.label}
          </p>
        </RevealOnScroll>
      ))}
    </div>
  );
}

function DesktopJourney() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = steps[activeIndex];

  return (
    <div className="mt-16 hidden lg:grid lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
      <div className="sticky top-28 flex h-fit flex-col items-center gap-4 self-start">
        <PhoneMockup variant="apple" screen={active.screen} floating={false} className="w-[240px]" />
        <AnimatePresence mode="wait">
          <motion.span
            key={active.tag}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-xs font-medium text-white backdrop-blur"
          >
            {active.tag}
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="flex flex-col gap-6">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            onViewportEnter={() => setActiveIndex(index)}
            viewport={{ margin: "-40% 0px -40% 0px" }}
            animate={{
              opacity: activeIndex === index ? 1 : 0.4,
              scale: activeIndex === index ? 1 : 0.98,
            }}
            transition={{ duration: 0.3 }}
            className={cn(
              "flex items-center gap-4 rounded-2xl border p-5",
              activeIndex === index
                ? "border-primary-400/40 bg-white/[0.06]"
                : "border-white/5 bg-transparent"
            )}
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 font-mono text-sm text-white">
              {index + 1}
            </span>
            <p className="text-balance text-base text-white">{step.title}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function ClientJourney() {
  return (
    <section className="bg-ink py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Expérience client"
          title="Une expérience pensée pour vos clients."
          tone="dark"
        />

        <MobileJourney />
        <DesktopJourney />
      </Container>
    </section>
  );
}
