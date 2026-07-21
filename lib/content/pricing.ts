export type PricingPlan = {
  id: "starter" | "pro" | "enterprise";
  name: string;
  price: string;
  period: string;
  description: string;
  cta: string;
  href: string;
  highlighted: boolean;
  features: string[];
};

export const pricingPlans: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    price: "29€",
    period: "/ mois",
    description: "Pour lancer votre premier programme de fidélité digital.",
    cta: "Commencer",
    href: "/contact",
    highlighted: false,
    features: [
      "1 carte de fidélité personnalisée",
      "Jusqu'à 500 cartes actives",
      "Apple Wallet et Google Wallet",
      "QR code de validation en caisse",
      "50 notifications push par mois",
      "Statistiques essentielles",
      "Support par e-mail",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: "79€",
    period: "/ mois",
    description: "Pour les commerces qui veulent fidéliser à grande échelle.",
    cta: "Essayer Pro",
    href: "/contact",
    highlighted: true,
    features: [
      "Jusqu'à 3 cartes de fidélité",
      "Cartes actives illimitées",
      "Apple Wallet et Google Wallet",
      "Notifications push illimitées",
      "Statistiques avancées et exports",
      "Personnalisation complète de la carte",
      "Support prioritaire",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Sur devis",
    period: "",
    description: "Pour les enseignes multi-boutiques et les franchises.",
    cta: "Nous contacter",
    href: "/contact",
    highlighted: false,
    features: [
      "Cartes et boutiques illimitées",
      "Multi-établissements et multi-équipes",
      "API et intégrations sur mesure",
      "Statistiques consolidées par enseigne",
      "Accompagnement dédié à la mise en place",
      "Support prioritaire avec interlocuteur dédié",
    ],
  },
];

export const pricingComparison: {
  label: string;
  starter: string;
  pro: string;
  enterprise: string;
}[] = [
  { label: "Cartes de fidélité", starter: "1", pro: "3", enterprise: "Illimité" },
  { label: "Cartes clients actives", starter: "500", pro: "Illimité", enterprise: "Illimité" },
  { label: "Apple Wallet & Google Wallet", starter: "Inclus", pro: "Inclus", enterprise: "Inclus" },
  { label: "Notifications push", starter: "50 / mois", pro: "Illimité", enterprise: "Illimité" },
  { label: "Statistiques", starter: "Essentielles", pro: "Avancées", enterprise: "Consolidées multi-sites" },
  { label: "Personnalisation de carte", starter: "Standard", pro: "Complète", enterprise: "Complète + marque" },
  { label: "API & intégrations", starter: "—", pro: "—", enterprise: "Inclus" },
  { label: "Support", starter: "E-mail", pro: "Prioritaire", enterprise: "Dédié" },
];
