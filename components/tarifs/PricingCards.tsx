"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowRight, Store, ShieldCheck } from "lucide-react";

import { cn } from "@/lib/utils";
import { Container } from "@/components/shared/Container";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { pricingPlans } from "@/lib/content/pricing";

function PlanVisual({ id, highlighted }: { id: string; highlighted: boolean }) {
  const tone = highlighted ? "bg-white/10" : "bg-primary/10";
  const mark = highlighted ? "bg-white/25" : "bg-primary/25";

  if (id === "pro") {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
        className={cn("flex h-11 items-center", tone, "w-fit rounded-xl px-3")}
      >
        <div className="flex -space-x-2">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={cn(
                "h-6 w-6 rounded-full ring-2",
                highlighted ? "ring-ink" : "ring-white",
                mark
              )}
            />
          ))}
        </div>
      </motion.div>
    );
  }

  if (id === "enterprise") {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
        className={cn("flex h-11 items-center gap-1.5", tone, "w-fit rounded-xl px-3")}
      >
        {[0, 1, 2].map((i) => (
          <span key={i} className={cn("flex h-6 w-6 items-center justify-center rounded-md", mark)}>
            <Store className="h-3 w-3" />
          </span>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.span
      whileHover={{ scale: 1.08, rotate: -4 }}
      transition={{ duration: 0.2 }}
      className={cn("flex h-11 w-11 items-center justify-center rounded-xl", tone)}
    >
      <Store className="h-5 w-5" strokeWidth={2.25} />
    </motion.span>
  );
}

export function PricingCards() {
  return (
    <section className="bg-white py-24 sm:py-28">
      <Container>
        <div className="grid gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <RevealOnScroll key={plan.id} delay={index * 0.08}>
              <div
                className={cn(
                  "relative flex h-full flex-col rounded-3xl border p-8 transition-shadow duration-300",
                  plan.highlighted
                    ? "border-primary/30 bg-ink text-white shadow-soft-xl lg:-translate-y-4"
                    : "border-border bg-white shadow-soft hover:shadow-soft-lg"
                )}
              >
                {plan.highlighted ? (
                  <Badge className="absolute -top-3 left-8" variant="default">
                    Le plus populaire
                  </Badge>
                ) : null}

                <PlanVisual id={plan.id} highlighted={plan.highlighted} />

                <h3 className="mt-4 text-lg font-semibold tracking-tight">{plan.name}</h3>
                <p
                  className={cn(
                    "mt-2 text-sm",
                    plan.highlighted ? "text-ink-muted" : "text-muted-foreground"
                  )}
                >
                  {plan.description}
                </p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-semibold tracking-tight">{plan.price}</span>
                  <span
                    className={cn(
                      "text-sm",
                      plan.highlighted ? "text-ink-muted" : "text-muted-foreground"
                    )}
                  >
                    {plan.period}
                  </span>
                </div>
                <p
                  className={cn(
                    "mt-2 flex items-center gap-1.5 text-xs",
                    plan.highlighted ? "text-ink-muted" : "text-muted-foreground"
                  )}
                >
                  <ShieldCheck className="h-3.5 w-3.5" />
                  {plan.id === "enterprise" ? "Conditions établies avec notre équipe" : "Sans engagement"}
                </p>

                <Button
                  asChild
                  className="mt-7"
                  variant={plan.highlighted ? "default" : "secondary"}
                >
                  <Link href={plan.href}>
                    {plan.cta}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>

                <ul className="mt-8 flex flex-1 flex-col gap-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm">
                      <Check
                        className={cn(
                          "mt-0.5 h-4 w-4 shrink-0",
                          plan.highlighted ? "text-primary-300" : "text-primary"
                        )}
                      />
                      <span className={plan.highlighted ? "text-white/90" : "text-foreground/85"}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}
