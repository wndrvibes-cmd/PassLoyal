import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { Button } from "@/components/ui/button";
import { pricingPlans } from "@/lib/content/pricing";

export function PricingTeaser() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Tarifs"
          title="Une offre simple, adaptée à votre taille"
          description="Pas de frais cachés, pas d'engagement. Changez d'offre à tout moment selon la croissance de votre programme."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <RevealOnScroll key={plan.id} delay={index * 0.08}>
              <div
                className={cn(
                  "flex h-full flex-col rounded-3xl border p-8 transition-all duration-300",
                  plan.highlighted
                    ? "border-primary/30 bg-ink text-white shadow-soft-xl hover:shadow-soft-xl"
                    : "border-border bg-white shadow-soft hover:-translate-y-1 hover:shadow-soft-lg"
                )}
              >
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

                <ul className="mt-7 flex flex-1 flex-col gap-3">
                  {plan.features.slice(0, 4).map((feature) => (
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

                <Button
                  asChild
                  className="mt-8"
                  variant={plan.highlighted ? "default" : "secondary"}
                >
                  <Link href={plan.href}>
                    {plan.cta}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/tarifs"
            className="text-sm font-medium text-primary transition-colors hover:text-primary-700"
          >
            Comparer les offres en détail →
          </Link>
        </div>
      </Container>
    </section>
  );
}
