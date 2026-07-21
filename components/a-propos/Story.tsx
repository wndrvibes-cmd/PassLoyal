import { Container } from "@/components/shared/Container";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { Badge } from "@/components/ui/badge";

function BrandMark() {
  return (
    <div className="relative mx-auto flex aspect-square w-full max-w-xs items-center justify-center overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary-500 via-primary-700 to-ink lg:mx-0">
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-12 -left-8 h-40 w-40 rounded-full bg-gold-400/20 blur-2xl" />
      <div className="relative flex flex-col items-center gap-4">
        <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white/10 ring-1 ring-white/20 backdrop-blur">
          <svg viewBox="0 0 24 24" className="h-8 w-8 text-white" fill="none" stroke="currentColor" strokeWidth="1.75">
            <rect x="3" y="6" width="18" height="13" rx="3" />
            <path d="M3 10h18" />
            <circle cx="7.5" cy="14.5" r="1" fill="currentColor" stroke="none" />
          </svg>
        </span>
        <div className="h-px w-16 bg-white/20" />
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/60">PassLoyal</span>
      </div>
    </div>
  );
}

export function Story() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <Container className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
        <RevealOnScroll>
          <BrandMark />
        </RevealOnScroll>

        <div className="flex flex-col gap-6">
          <Badge>Notre histoire</Badge>
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Née d&apos;un constat simple dans les commerces de quartier
          </h2>

          <div className="flex flex-col gap-5 text-lg leading-relaxed text-muted-foreground">
            <RevealOnScroll delay={0.05}>
              <p>
                Les cartes de fidélité en papier se perdent, les applications dédiées ne sont
                jamais téléchargées, et les programmes de fidélité finissent oubliés dans un tiroir
                — ou désinstallés au bout d&apos;une semaine.
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <p>
                Pourtant, un objet accompagne déjà chaque client dans sa poche : son téléphone, et
                plus précisément son Wallet — déjà conçu pour ranger cartes d&apos;embarquement,
                billets et cartes bancaires. Pourquoi pas la carte de fidélité de votre commerce ?
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={0.15}>
              <p className="text-foreground">
                Nous construisons PassLoyal pour aider les commerces à créer une relation plus
                simple et plus durable avec leurs clients — sans application à télécharger, sans
                compte à créer.
              </p>
            </RevealOnScroll>
          </div>
        </div>
      </Container>
    </section>
  );
}
