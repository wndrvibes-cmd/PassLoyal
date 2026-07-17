import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/landing/Hero";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "PassLoyal — La fidélité digitale pour commerçants modernes",
  description:
    "PassLoyal permet aux commerçants de créer des cartes de fidélité digitales compatibles Apple Wallet et Google Wallet, avec suivi des points, récompenses et tableau de bord en temps réel.",
  keywords: [
    "carte de fidélité digitale",
    "Apple Wallet",
    "Google Wallet",
    "programme de fidélité",
    "SaaS commerçants",
    "fidélisation client",
  ],
  openGraph: {
    title: "PassLoyal — La fidélité digitale pour commerçants modernes",
    description:
      "Remplacez vos cartes papier par des cartes Apple Wallet et Google Wallet. Points, récompenses et statistiques en temps réel.",
    type: "website",
    locale: "fr_FR",
    siteName: "PassLoyal",
  },
  twitter: {
    card: "summary_large_image",
    title: "PassLoyal — La fidélité digitale pour commerçants modernes",
    description:
      "Remplacez vos cartes papier par des cartes Apple Wallet et Google Wallet. Points, récompenses et statistiques en temps réel.",
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Footer />
    </main>
  );
}
