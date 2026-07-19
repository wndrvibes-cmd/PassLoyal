import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { pricingComparison } from "@/lib/content/pricing";

export function ComparisonTable() {
  return (
    <section className="bg-secondary/40 py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Comparatif"
          title="Comparez les offres en détail"
          description="Pour choisir sereinement, voici exactement ce qui change entre Starter, Pro et Enterprise."
        />

        <RevealOnScroll className="mt-14 overflow-x-auto rounded-3xl border border-border bg-white shadow-soft">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="px-6 py-5 font-medium text-muted-foreground">Fonctionnalité</th>
                <th className="px-6 py-5 font-semibold">Starter</th>
                <th className="px-6 py-5 font-semibold text-primary">Pro</th>
                <th className="px-6 py-5 font-semibold">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {pricingComparison.map((row, index) => (
                <tr
                  key={row.label}
                  className={index !== pricingComparison.length - 1 ? "border-b border-border" : ""}
                >
                  <td className="px-6 py-4 text-foreground/85">{row.label}</td>
                  <td className="px-6 py-4 text-muted-foreground">{row.starter}</td>
                  <td className="px-6 py-4 font-medium text-foreground">{row.pro}</td>
                  <td className="px-6 py-4 text-muted-foreground">{row.enterprise}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
