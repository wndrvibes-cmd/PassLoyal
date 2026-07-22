export type Sector = {
  icon: "coffee" | "croissant" | "scissors" | "sparkles" | "dumbbell" | "shirt" | "bed" | "store";
  label: string;
  pitch: string;
  /** Tailwind gradient stops giving each sector its own subtle identity within the brand palette. */
  tone: string;
};

export const sectors: Sector[] = [
  { icon: "coffee", label: "Cafés & restaurants", pitch: "Récompensez chaque passage.", tone: "from-primary-500 to-primary-700" },
  { icon: "croissant", label: "Boulangeries", pitch: "Fidélisez sans tampon papier.", tone: "from-gold-400 to-gold-600" },
  { icon: "scissors", label: "Coiffeurs", pitch: "Fidélisez vos clients entre deux rendez-vous.", tone: "from-primary-400 to-gold-400" },
  { icon: "sparkles", label: "Instituts de beauté", pitch: "Transformez chaque visite en nouvelle occasion de revenir.", tone: "from-gold-300 to-primary-500" },
  { icon: "dumbbell", label: "Salles de sport", pitch: "Encouragez la régularité, séance après séance.", tone: "from-ink to-primary-600" },
  { icon: "shirt", label: "Boutiques", pitch: "Créez une relation durable avec vos clients.", tone: "from-primary-600 to-ink" },
  { icon: "bed", label: "Hôtels", pitch: "Donnez envie de revenir à chaque séjour.", tone: "from-gold-500 to-ink" },
  { icon: "store", label: "Réseaux & franchises", pitch: "Pilotez votre fidélité depuis un seul espace.", tone: "from-primary-700 to-gold-500" },
];
