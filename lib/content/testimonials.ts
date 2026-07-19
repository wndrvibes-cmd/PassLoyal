export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Nos clients ont adopté la carte Wallet en quelques jours, sans que nous ayons rien à expliquer. Le taux de retour en boutique a nettement augmenté dès le premier mois.",
    author: "Camille Beaumont",
    role: "Fondatrice",
    company: "Café Lumière",
    rating: 5,
  },
  {
    quote:
      "On a testé plusieurs solutions de fidélité avant PassLoyal. C'est la première qui ne demande aucune application à nos clients — et ça change tout sur le taux d'adoption.",
    author: "Yanis Ferrand",
    role: "Gérant",
    company: "Boulangerie Ferrand",
    rating: 5,
  },
  {
    quote:
      "La mise en place a pris moins de vingt minutes. Le tableau de bord est clair, on sait exactement combien de clients reviennent grâce au programme.",
    author: "Sarah Nguyen",
    role: "Responsable marketing",
    company: "Studio Bloom",
    rating: 5,
  },
  {
    quote:
      "Sur nos six boutiques, PassLoyal nous donne enfin une vision consolidée de la fidélité client. Le support a été présent à chaque étape du déploiement.",
    author: "Thomas Lefèvre",
    role: "Directeur réseau",
    company: "Maison Lefèvre",
    rating: 5,
  },
  {
    quote:
      "Les notifications push sur l'écran verrouillé ont un taux d'ouverture largement supérieur à nos anciennes campagnes e-mail. Un vrai levier de retour en magasin.",
    author: "Inès Dubreuil",
    role: "Co-fondatrice",
    company: "Atelier Dubreuil",
    rating: 5,
  },
  {
    quote:
      "PassLoyal a remplacé nos cartes en papier tamponnées à la main. Plus professionnel, plus fiable, et nos clients adorent voir leur solde en temps réel.",
    author: "Karim Haddad",
    role: "Gérant",
    company: "Épicerie Haddad",
    rating: 5,
  },
];
