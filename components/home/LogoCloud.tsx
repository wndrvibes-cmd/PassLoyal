import { Container } from "@/components/shared/Container";
import { trustedLogos } from "@/lib/content/misc";

export function LogoCloud() {
  const loop = [...trustedLogos, ...trustedLogos];

  return (
    <section className="border-b border-border bg-white py-14">
      <Container>
        <p className="text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Ils fidélisent leurs clients avec PassLoyal
        </p>

        <div className="relative mt-8 overflow-hidden mask-fade-x">
          <div className="flex w-max animate-marquee items-center gap-16">
            {loop.map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="whitespace-nowrap text-lg font-semibold tracking-tight text-foreground/25"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
