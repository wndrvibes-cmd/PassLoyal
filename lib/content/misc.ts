export type Stat = {
  value: string;
  suffix?: string;
  label: string;
};

export const stats: Stat[] = [
  { value: "1200", suffix: "+", label: "commerçants équipés" },
  { value: "3.4", suffix: "M", label: "cartes Wallet actives" },
  { value: "38", suffix: "%", label: "de visites en plus en moyenne" },
  { value: "15", suffix: " min", label: "pour lancer votre programme" },
];

export type Step = {
  number: string;
  title: string;
  description: string;
};

export const howItWorksSteps: Step[] = [
  {
    number: "01",
    title: "Créez votre carte",
    description:
      "Personnalisez votre carte de fidélité avec votre logo, vos couleurs et vos règles de points en quelques minutes, sans compétence technique.",
  },
  {
    number: "02",
    title: "Partagez le QR code",
    description:
      "Affichez votre QR code en caisse, sur votre vitrine ou envoyez-le par SMS. Vos clients l'ajoutent à leur Wallet en un tap.",
  },
  {
    number: "03",
    title: "Fidélisez au quotidien",
    description:
      "Chaque passage en caisse crédite des points, déclenche des récompenses et alimente vos statistiques en temps réel.",
  },
];

export type Value = {
  icon: "heart" | "target" | "sparkles" | "handshake";
  title: string;
  description: string;
};

export const companyValues: Value[] = [
  {
    icon: "target",
    title: "Simplicité radicale",
    description:
      "Chaque décision produit est filtrée par une question : est-ce que ça simplifie la vie du commerçant et de son client ? Sinon, on ne le construit pas.",
  },
  {
    icon: "sparkles",
    title: "Exigence du détail",
    description:
      "Nous croyons que le soin apporté aux détails — une animation, un texte, un délai de chargement — est ce qui distingue un outil professionnel d'un gadget.",
  },
  {
    icon: "handshake",
    title: "Proximité commerçante",
    description:
      "Nous construisons PassLoyal avec des commerçants, pas seulement pour eux. Chaque fonctionnalité part d'un besoin réel observé sur le terrain.",
  },
  {
    icon: "heart",
    title: "Confiance durable",
    description:
      "La donnée de vos clients vous appartient. Nous la protégeons avec la même rigueur que si c'était la nôtre.",
  },
];

export type WhyUsPoint = {
  icon: "zap" | "smartphone" | "line-chart" | "headphones";
  title: string;
  description: string;
};

export const whyUsPoints: WhyUsPoint[] = [
  {
    icon: "zap",
    title: "Zéro friction pour vos clients",
    description:
      "Pas d'application à télécharger, pas de compte à créer. La carte s'ajoute au Wallet en un tap et reste toujours à jour.",
  },
  {
    icon: "smartphone",
    title: "Compatible avec tous les téléphones",
    description:
      "Apple Wallet sur iPhone, Google Wallet sur Android : vos clients sont couverts, quel que soit leur appareil.",
  },
  {
    icon: "line-chart",
    title: "Des décisions basées sur la donnée",
    description:
      "Visualisez qui revient, à quelle fréquence et grâce à quelle récompense, pour ajuster votre programme en continu.",
  },
  {
    icon: "headphones",
    title: "Un accompagnement humain",
    description:
      "De la création de votre première carte au déploiement multi-boutiques, notre équipe reste joignable à chaque étape.",
  },
];

export const trustedLogos: string[] = [
  "Café Lumière",
  "Boulangerie Ferrand",
  "Studio Bloom",
  "Maison Lefèvre",
  "Atelier Dubreuil",
  "Épicerie Haddad",
  "Salon Verdier",
  "Librairie Nomade",
];
