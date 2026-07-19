import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Container } from "@/components/shared/Container";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { pricingPlans } from "@/lib/content/pricing";

export function PricingCards() {
  return (
    <section className="bg-white py-24 sm:py-28">
      <Container>
        <div className="grid gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <RevealOnScroll key={plan.id} delay={index * 0.08}>
              <div
                className={cn(
                  "relative flex h-full flex-col rounded-3xl border p-8",
                  plan.highlighted
                    ? "border-primary/30 bg-ink text-white shadow-soft-xl lg:-translate-y-4"
                    : "border-border bg-white shadow-soft"
                )}
              >
                {plan.highlighted ? (
                  <Badge className="absolute -top-3 left-8" variant="default">
                    Le plus populaire
                  </Badge>
                ) : null}

                <h3 className="text-lg font-semibold tracking-tight">{plan.name}</h3>
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
