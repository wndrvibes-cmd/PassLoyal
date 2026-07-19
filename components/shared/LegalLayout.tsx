import { Container } from "@/components/shared/Container";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";

export function LegalLayout({
  title,
  updatedAt,
  children,
}: {
  title: string;
  updatedAt: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-white py-24 sm:py-28">
      <Container className="max-w-3xl">
        <RevealOnScroll>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Document légal
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
          <p className="mt-3 text-sm text-muted-foreground">Dernière mise à jour : {updatedAt}</p>
          <p className="mt-6 rounded-2xl border border-dashed border-border bg-secondary/50 p-4 text-sm text-muted-foreground">
            Ce contenu est fourni à titre indicatif pour la mise en ligne du site et doit être
            relu et validé par un professionnel du droit avant publication définitive.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1} className="prose-legal mt-12 flex flex-col gap-8">
          {children}
        </RevealOnScroll>
      </Container>
    </section>
  );
}
