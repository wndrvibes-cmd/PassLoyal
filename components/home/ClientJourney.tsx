import { QrCode, ScanLine, Store, Gift, type LucideIcon } from "lucide-react";

import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { PhoneMockup } from "@/components/shared/PhoneMockup";

type Node =
  | { kind: "icon"; icon: LucideIcon; label: string }
  | { kind: "phone"; screen: "wallet" | "lockscreen"; label: string };

const nodes: Node[] = [
  { kind: "icon", icon: QrCode, label: "Le client scanne le QR code en caisse" },
  { kind: "icon", icon: ScanLine, label: "Sa caméra reconnaît la carte en un instant" },
  { kind: "phone", screen: "wallet", label: "La carte rejoint son Apple Wallet ou Google Wallet" },
  { kind: "phone", screen: "lockscreen", label: "Il reçoit une notification pour chaque récompense" },
  { kind: "icon", icon: Store, label: "Il revient naturellement en boutique" },
  { kind: "icon", icon: Gift, label: "Et débloque sa récompense suivante" },
];

export function ClientJourney() {
  return (
    <section className="bg-ink py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Expérience client"
          title="Une expérience pensée pour vos clients."
          tone="dark"
        />

        <div className="relative mx-auto mt-16 flex max-w-md flex-col items-center gap-10">
          <div className="pointer-events-none absolute left-1/2 top-4 h-[calc(100%-2rem)] w-px -translate-x-1/2 bg-gradient-to-b from-white/20 via-white/10 to-transparent" />

          {nodes.map((node, index) => (
            <RevealOnScroll key={index} delay={index * 0.06} className="relative z-10 flex flex-col items-center gap-3">
              {node.kind === "icon" ? (
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-primary-300 backdrop-blur">
                  <node.icon className="h-6 w-6" strokeWidth={1.75} />
                </span>
              ) : (
                <PhoneMockup
                  variant="apple"
                  screen={node.screen}
                  floating={false}
                  className="w-[168px]"
                />
              )}
              <p className="max-w-[220px] text-balance text-center text-sm leading-snug text-ink-muted">
                {node.label}
              </p>
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}
