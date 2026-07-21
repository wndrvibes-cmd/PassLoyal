export type Sector = {
  icon: "coffee" | "croissant" | "scissors" | "sparkles" | "dumbbell" | "shirt" | "bed" | "store";
  label: string;
  pitch: string;
};

export const sectors: Sector[] = [
  { icon: "coffee", label: "Cafés & restaurants", pitch: "Récompensez chaque passage." },
  { icon: "croissant", label: "Boulangeries", pitch: "Fidélisez sans tampon papier." },
  { icon: "scissors", label: "Coiffeurs", pitch: "Fidélisez vos clients entre deux rendez-vous." },
  { icon: "sparkles", label: "Instituts de beauté", pitch: "Transformez chaque visite en nouvelle occasion de revenir." },
  { icon: "dumbbell", label: "Salles de sport", pitch: "Encouragez la régularité, séance après séance." },
  { icon: "shirt", label: "Boutiques", pitch: "Créez une relation durable avec vos clients." },
  { icon: "bed", label: "Hôtels", pitch: "Donnez envie de revenir à chaque séjour." },
  { icon: "store", label: "Réseaux & franchises", pitch: "Pilotez votre fidélité depuis un seul espace." },
];
