import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/shared/Container";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { AmbientGlow } from "@/components/shared/AmbientGlow";
import { Button } from "@/components/ui/button";

export function CtaFinal() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
      <AmbientGlow variant="cta" />

      <Container className="relative">
        <RevealOnScroll className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Prêt à transformer vos clients occasionnels en habitués ?
          </h2>
          <p className="text-balance text-lg text-ink-muted">
            Lancez votre programme de fidélité Apple Wallet et Google Wallet en moins de 15
            minutes, sans engagement.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/contact">
                Demander une démo
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline-light">
              <Link href="/tarifs">Voir les tarifs</Link>
            </Button>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
