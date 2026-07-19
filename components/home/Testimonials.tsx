import { Star } from "lucide-react";

import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { testimonials } from "@/lib/content/testimonials";

export function Testimonials() {
  return (
    <section className="bg-secondary/40 py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Avis clients"
          title="Des commerçants qui voient déjà la différence"
          description="Un aperçu de ce que nos clients constatent après avoir remplacé leurs cartes papier par PassLoyal."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <RevealOnScroll key={testimonial.author} delay={(index % 3) * 0.08}>
              <div className="flex h-full flex-col gap-5 rounded-3xl border border-border bg-white p-7 shadow-soft">
                <div className="flex gap-0.5 text-amber-400">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="flex-1 leading-relaxed text-foreground/90">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-3 border-t border-border pt-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-sm font-semibold text-white">
                    {testimonial.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{testimonial.author}</p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}
