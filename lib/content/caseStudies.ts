export type CaseStudy = {
  company: string;
  sector: string;
  summary: string;
  metric: { value: string; label: string };
};

export const caseStudies: CaseStudy[] = [
  {
    company: "Café Lumière",
    sector: "Café indépendant, Paris",
    summary:
      "Remplacement des cartes tamponnées par une carte Wallet en une matinée. Les clients réguliers ont adopté la carte dès leur passage suivant, sans explication nécessaire en caisse.",
    metric: { value: "+42%", label: "de visites en 3 mois" },
  },
  {
    company: "Boulangerie Ferrand",
    sector: "Boulangerie artisanale, Lyon",
    summary:
      "Passage d'un programme papier peu suivi à une carte Wallet avec notifications push. Le taux d'adoption a dépassé les attentes dès la première semaine.",
    metric: { value: "91%", label: "des clients ont ajouté leur carte" },
  },
  {
    company: "Maison Lefèvre",
    sector: "Réseau de 6 boutiques, France",
    summary:
      "Déploiement sur six boutiques avec statistiques consolidées par enseigne, permettant à la direction réseau de piloter la fidélisation depuis un tableau de bord unique.",
    metric: { value: "6", label: "boutiques pilotées depuis un seul tableau de bord" },
  },
];
