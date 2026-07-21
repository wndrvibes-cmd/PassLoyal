"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, TrendingUp, Users, Gift } from "lucide-react";

import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";

const statCards = [
  { icon: Users, label: "Cartes actives", value: "3 482", trend: "+12% ce mois" },
  { icon: TrendingUp, label: "Visites cette semaine", value: "892", trend: "+8% vs sem. dernière" },
  { icon: Gift, label: "Récompenses échangées", value: "214", trend: "+21% ce mois" },
];

const chartBars = [38, 52, 46, 64, 58, 74, 69, 86, 78, 94, 88, 100];

const activity = [
  { name: "Camille B.", action: "a échangé une récompense", time: "il y a 4 min" },
  { name: "Yanis F.", action: "a ajouté sa carte au Wallet", time: "il y a 12 min" },
  { name: "Sarah N.", action: "a franchi 500 points", time: "il y a 26 min" },
];

export function DashboardShowcase() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-secondary/40 py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Tableau de bord"
          title="Votre activité de fidélisation, en un coup d'œil"
          description="Un aperçu illustratif du tableau de bord PassLoyal — pensé pour répondre en un regard à la seule question qui compte : est-ce que mes clients reviennent ?"
        />

        <RevealOnScroll delay={0.1} className="mt-16">
          <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-border bg-white shadow-soft-xl">
            <div className="flex items-center gap-2 border-b border-border bg-secondary/60 px-5 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
              <span className="ml-3 rounded-full bg-white px-3 py-1 text-xs text-muted-foreground shadow-sm">
                app.passloyal.fr/tableau-de-bord
              </span>
            </div>

            <div className="p-6 sm:p-8">
              <div className="grid gap-4 sm:grid-cols-3">
                {statCards.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-border p-5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <stat.icon className="h-4 w-4" strokeWidth={2.25} />
                    </span>
                    <p className="mt-4 font-mono text-2xl font-semibold tracking-tight">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
                    <p className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-emerald-600">
                      <ArrowUpRight className="h-3 w-3" />
                      {stat.trend}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
                <div className="rounded-2xl border border-border p-6">
                  <p className="text-sm font-medium text-foreground">Visites sur 12 semaines</p>
                  <div className="mt-6 flex h-32 items-end gap-2">
                    {chartBars.map((height, index) => (
                      <motion.div
                        key={index}
                        initial={{ height: reduceMotion ? `${height}%` : 0 }}
                        whileInView={{ height: `${height}%` }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={
                          reduceMotion
                            ? { duration: 0 }
                            : { duration: 0.6, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }
                        }
                        className="flex-1 rounded-t-md bg-gradient-to-t from-primary-600 to-primary-400"
                      />
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-border p-6">
                  <p className="text-sm font-medium text-foreground">Activité récente</p>
                  <ul className="mt-4 flex flex-col gap-4">
                    {activity.map((row) => (
                      <li key={row.name} className="flex flex-col gap-0.5">
                        <p className="text-sm text-foreground/85">
                          <span className="font-medium">{row.name}</span> {row.action}
                        </p>
                        <p className="text-xs text-muted-foreground">{row.time}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
