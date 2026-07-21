import { Check, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { paperComparison } from "@/lib/content/misc";

function Cell({ value, tone }: { value: string | boolean; tone: "paper" | "passloyal" }) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="h-5 w-5 text-primary" />
    ) : (
      <X className="h-5 w-5 text-muted-foreground/50" />
    );
  }

  return (
    <span className={cn("text-sm leading-snug", tone === "passloyal" ? "text-foreground/85 font-medium" : "text-muted-foreground")}>
      {value}
    </span>
  );
}

export function ComparisonSection() {
  return (
    <section className="bg-secondary/40 py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Comparatif"
          title="La carte tamponnée appartient au passé"
          description="Ce que la carte papier ne pourra jamais faire — et que PassLoyal fait par défaut."
        />

        <RevealOnScroll className="mt-14 overflow-x-auto rounded-3xl border border-border bg-white shadow-soft">
          <table className="w-full min-w-[560px] border-collapse text-left">
            <thead>
              <tr className="border-b border-border">
                <th className="px-6 py-5 text-sm font-medium text-muted-foreground">Critère</th>
                <th className="px-6 py-5 text-sm font-semibold text-muted-foreground">Carte papier</th>
                <th className="px-6 py-5 text-sm font-semibold text-primary">PassLoyal</th>
              </tr>
            </thead>
            <tbody>
              {paperComparison.map((row, index) => (
                <tr
                  key={row.label}
                  className={cn(index !== paperComparison.length - 1 && "border-b border-border")}
                >
                  <td className="px-6 py-5 text-sm font-medium text-foreground">{row.label}</td>
                  <td className="px-6 py-5">
                    <Cell value={row.paper} tone="paper" />
                  </td>
                  <td className="px-6 py-5">
                    <Cell value={row.passloyal} tone="passloyal" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
