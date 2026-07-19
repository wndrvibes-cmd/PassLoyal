import type { Metadata } from "next";

import { Hero } from "@/components/home/Hero";
import { LogoCloud } from "@/components/home/LogoCloud";
import { HowItWorks } from "@/components/home/HowItWorks";
import { WhyUs } from "@/components/home/WhyUs";
import { FeatureGrid } from "@/components/home/FeatureGrid";
import { StatsBand } from "@/components/home/StatsBand";
import { Testimonials } from "@/components/home/Testimonials";
import { PricingTeaser } from "@/components/home/PricingTeaser";
import { FaqTeaser } from "@/components/home/FaqTeaser";
import { CtaFinal } from "@/components/home/CtaFinal";
import { site } from "@/lib/content/site";

export const metadata: Metadata = {
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <LogoCloud />
      <HowItWorks />
      <WhyUs />
      <FeatureGrid />
      <StatsBand />
      <Testimonials />
      <PricingTeaser />
      <FaqTeaser />
      <CtaFinal />
    </>
  );
}
