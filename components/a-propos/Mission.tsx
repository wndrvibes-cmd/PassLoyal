import { Container } from "@/components/shared/Container";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";

export function Mission() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-primary-600/25 blur-[120px]" />

      <Container className="relative">
        <RevealOnScroll className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary-300">
            Notre mission
          </p>
          <p className="mt-6 text-balance text-2xl font-medium leading-snug text-white sm:text-3xl">
            Rendre la fidélisation client aussi simple qu'un tap, pour chaque commerçant qui n'a
            ni le temps ni l'équipe pour construire son propre outil.
          </p>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
