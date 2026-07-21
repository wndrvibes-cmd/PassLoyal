import { Check, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Container } from "@/components/shared/Container";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { PhoneMockup } from "@/components/shared/PhoneMockup";
import { Badge } from "@/components/ui/badge";

function PunchCard({ className, rotate = 0 }: { className?: string; rotate?: number }) {
  const holes = Array.from({ length: 8 });
  return (
    <div
      className={cn(
        "w-52 shrink-0 rounded-xl border border-stone-300 bg-stone-50 p-4 shadow-lg sm:w-60",
        className
      )}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <p className="text-[10px] font-medium uppercase tracking-widest text-stone-400">
        Carte fidélité
      </p>
      <div className="mt-3 grid grid-cols-4 gap-2">
        {holes.map((_, i) => (
          <span
            key={i}
            className={cn(
              "flex h-6 w-6 items-center justify-center rounded-full border",
              i < 5 ? "border-stone-400 bg-stone-200" : "border-dashed border-stone-300"
            )}
          >
            {i < 5 ? <Check className="h-3 w-3 text-stone-500" /> : null}
          </span>
        ))}
      </div>
    </div>
  );
}

function PlasticCard({ className, rotate = 0 }: { className?: string; rotate?: number }) {
  return (
    <div
      className={cn(
        "w-52 shrink-0 rounded-xl bg-gradient-to-br from-stone-300 to-stone-400 p-4 shadow-lg sm:w-60",
        className
      )}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div className="h-6 w-full rounded-sm bg-stone-800/60" />
      <p className="mt-5 font-mono text-xs tracking-widest text-stone-700">•••• •••• •••• 4821</p>
    </div>
  );
}

export function ProblemSection() {
  return (
    <section className="overflow-hidden bg-white py-24 sm:py-32">
      <Container>
        <RevealOnScroll className="mx-auto flex max-w-2xl flex-col items-center gap-5 text-center">
          <Badge variant="secondary">Le problème</Badge>
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.75rem]">
            Vos clients n&apos;ont pas besoin d&apos;une carte de plus dans leur portefeuille.
          </h2>
        </RevealOnScroll>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-[1fr_auto_1fr] lg:gap-8">
          <RevealOnScroll className="relative mx-auto flex h-72 w-full max-w-sm items-center justify-center sm:h-80">
            <div className="absolute inset-0 rounded-[2rem] bg-stone-100" />
            <PunchCard className="absolute -translate-x-10 -translate-y-6 opacity-90" rotate={-9} />
            <PlasticCard className="absolute translate-x-8 translate-y-8 opacity-80" rotate={7} />
            <span className="absolute right-6 top-6 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-soft">
              <X className="h-4 w-4 text-stone-400" />
            </span>
          </RevealOnScroll>

          <div className="hidden h-px w-12 bg-gradient-to-r from-transparent via-border to-transparent lg:block" />

          <RevealOnScroll delay={0.15} className="mx-auto flex h-72 w-full max-w-sm items-center justify-center sm:h-80">
            <PhoneMockup variant="apple" className="w-[220px] sm:w-[240px]" />
          </RevealOnScroll>
        </div>

        <p className="mx-auto mt-12 max-w-lg text-balance text-center text-sm text-muted-foreground">
          Une carte de plus à chercher, à oublier, à perdre — contre une carte qui vit déjà dans
          leur poche, toujours à jour.
        </p>
      </Container>
    </section>
  );
}
