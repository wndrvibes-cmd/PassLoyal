import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "PassLoyal — La fidélité digitale pour commerçants modernes",
    template: "%s · PassLoyal",
  },
  description:
    "PassLoyal permet aux commerçants de créer des cartes de fidélité digitales compatibles Apple Wallet et Google Wallet, avec suivi des points, récompenses et tableau de bord en temps réel.",
  metadataBase: new URL("https://passloyal.fr"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
