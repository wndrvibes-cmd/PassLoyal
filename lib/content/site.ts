export const site = {
  name: "PassLoyal",
  tagline: "La fidélité digitale pour commerçants modernes",
  description:
    "PassLoyal transforme votre programme de fidélité en carte Apple Wallet et Google Wallet. Sans application, sans carte plastique, avec des statistiques en temps réel.",
  url: "https://passloyal.fr",
  email: "contact@passloyal.fr",
  phone: "+33 1 23 45 67 89",
  address: {
    line1: "14 rue de la Paix",
    postalCode: "75002",
    city: "Paris",
    country: "France",
  },
  social: {
    linkedin: "https://linkedin.com/company/passloyal",
    instagram: "https://instagram.com/passloyal",
    twitter: "https://twitter.com/passloyal",
  },
  legal: {
    companyName: "PassLoyal SAS",
    rcs: "RCS Paris 900 000 000",
    siret: "900 000 000 00012",
    capital: "10 000 €",
    directeurPublication: "Directeur de la publication : Le représentant légal de PassLoyal SAS",
    hebergeur: {
      name: "Vercel Inc.",
      address: "440 N Barranca Ave #4133, Covina, CA 91723, USA",
    },
  },
} as const;

export const mainNav = [
  { label: "Fonctionnalités", href: "/fonctionnalites" },
  { label: "Tarifs", href: "/tarifs" },
  { label: "À propos", href: "/a-propos" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerNav = {
  produit: [
    { label: "Fonctionnalités", href: "/fonctionnalites" },
    { label: "Tarifs", href: "/tarifs" },
    { label: "FAQ", href: "/tarifs#faq" },
  ],
  entreprise: [
    { label: "À propos", href: "/a-propos" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Mentions légales", href: "/legal/mentions-legales" },
    { label: "CGU", href: "/legal/cgu" },
    { label: "Confidentialité", href: "/legal/confidentialite" },
    { label: "Cookies", href: "/legal/cookies" },
  ],
} as const;
