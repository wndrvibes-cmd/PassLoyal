import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/shared/Container";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-ink">
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-600/25 blur-[120px]" />

          <Container className="relative flex flex-col items-center gap-6 py-24 text-center">
            <span className="font-mono text-sm font-medium uppercase tracking-widest text-primary-300">
              Erreur 404
            </span>
            <h1 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Cette page n'existe pas ou plus.
            </h1>
            <p className="max-w-md text-balance text-ink-muted">
              Elle a peut-être été déplacée. Retournez à l'accueil pour retrouver votre chemin.
            </p>
            <Button asChild size="lg">
              <Link href="/">
                Retour à l'accueil
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
