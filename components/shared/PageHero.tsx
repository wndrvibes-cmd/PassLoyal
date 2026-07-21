import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AmbientGlow } from "@/components/shared/AmbientGlow";

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="relative overflow-hidden bg-ink py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
      <AmbientGlow variant="page" />

      <Container className="relative">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} tone="dark" as="h1" />
      </Container>
    </section>
  );
}
