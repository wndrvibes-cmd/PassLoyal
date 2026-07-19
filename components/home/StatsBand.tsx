import { Container } from "@/components/shared/Container";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { stats } from "@/lib/content/misc";

export function StatsBand() {
  return (
    <section className="relative overflow-hidden bg-ink py-20">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-600/20 blur-[120px]" />

      <Container className="relative">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          {stats.map((stat, index) => (
            <RevealOnScroll key={stat.label} delay={index * 0.08}>
              <div className="text-center">
                <p className="font-mono text-3xl font-semibold text-white sm:text-4xl">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-2 text-sm text-ink-muted">{stat.label}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}
