// No usage/customer-count stats are shown anywhere on the site: PassLoyal is
// pre-launch and there are no real, verifiable numbers yet. These reassurance
// points replace fabricated metrics with honest, factually-true-by-design
// product properties instead.
export type ReassurancePoint = {
  icon: "wallet" | "smartphone" | "qr-code" | "shield-check";
  label: string;
};

export const reassurancePoints: ReassurancePoint[] = [
  { icon: "wallet", label: "Apple Wallet & Google Wallet" },
  { icon: "smartphone", label: "Aucune application à télécharger" },
  { icon: "qr-code", label: "Ajout de la carte en un scan" },
  { icon: "shield-check", label: "Accompagnement à la mise en place" },
];

export type Step = {
  number: string;
  visual: "scan" | "add" | "return";
  title: string;
  description: string;
};

export const howItWorksSteps: Step[] = [
  {
    number: "01",
    visual: "scan",
    title: "Le client scanne",
    description: "Un QR code affiché en caisse, en vitrine ou sur le ticket de caisse suffit.",
  },
  {
    number: "02",
    visual: "add",
    title: "Il ajoute sa carte",
    description: "En un tap, la carte rejoint Apple Wallet ou Google Wallet — aucune app à installer.",
  },
  {
    number: "03",
    visual: "return",
    title: "Il revient et fidélise",
    description: "Points, récompenses et notifications le rappellent à chaque visite.",
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

export type ComparisonRow = {
  label: string;
  paper: string | boolean;
  passloyal: string | boolean;
};

export const paperComparison: ComparisonRow[] = [
  { label: "Support de la carte", paper: "Papier, se perd ou s'oublie", passloyal: "Apple Wallet & Google Wallet, toujours dans la poche" },
  { label: "Mise à jour du solde", paper: "Tamponnée à la main, erreurs possibles", passloyal: "Automatique et en temps réel" },
  { label: "Relance des clients", paper: false, passloyal: "Notifications push ciblées" },
  { label: "Statistiques d'usage", paper: false, passloyal: "Tableau de bord en temps réel" },
  { label: "Personnalisation de marque", paper: "Impression limitée", passloyal: "Couleurs, logo et récompenses sur mesure" },
  { label: "Coût récurrent", paper: "Réimpression à chaque rupture de stock", passloyal: "Un abonnement, aucune impression" },
];
