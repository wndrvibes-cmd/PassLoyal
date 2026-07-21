export type FaqItem = {
  question: string;
  answer: string;
};

export const generalFaq: FaqItem[] = [
  {
    question: "Mes clients doivent-ils télécharger une application ?",
    answer:
      "Non. La carte de fidélité PassLoyal s'ajoute directement dans l'application Wallet déjà installée sur leur téléphone (Apple Wallet sur iPhone, Google Wallet sur Android). Aucun téléchargement, aucune création de compte.",
  },
  {
    question: "Comment mes clients ajoutent-ils leur carte ?",
    answer:
      "En scannant un QR code affiché en caisse, sur votre vitrine ou reçu en SMS. Un tap suffit ensuite pour ajouter la carte à leur Wallet — l'opération prend moins de dix secondes.",
  },
  {
    question: "Ai-je besoin d'un terminal de caisse spécifique ?",
    answer:
      "Non. PassLoyal fonctionne avec le matériel que vous avez déjà : un smartphone, une tablette ou votre terminal de caisse actuel suffisent pour scanner le QR code de chaque carte.",
  },
  {
    question: "Puis-je personnaliser le design de ma carte ?",
    answer:
      "Oui, entièrement : logo, couleurs, informations affichées et règles de points sont personnalisables pour correspondre à votre identité de marque.",
  },
  {
    question: "Que se passe-t-il si mon client change de téléphone ?",
    answer:
      "Sa carte reste liée à son compte Apple ou Google et se synchronise automatiquement sur son nouvel appareil, sans aucune action de votre part.",
  },
  {
    question: "Combien de temps prend la mise en place ?",
    answer:
      "La plupart des commerçants publient leur première carte en moins de quinze minutes. Notre équipe reste disponible pour vous accompagner si besoin.",
  },
];

export const contactFaq: FaqItem[] = [
  {
    question: "Sous combien de temps recevrai-je une réponse ?",
    answer:
      "Notre équipe répond sous 24h ouvrées à toute demande envoyée depuis ce formulaire ou par e-mail.",
  },
  {
    question: "Puis-je demander une démo avant de m'engager ?",
    answer:
      "Oui, une démonstration personnalisée de PassLoyal peut être organisée avant toute souscription, sans engagement de votre part.",
  },
  {
    question: "Proposez-vous un accompagnement à la mise en place ?",
    answer:
      "Oui, chaque nouveau commerçant est accompagné pour la création de sa première carte et la définition de ses règles de points.",
  },
];

export const securityFaq: FaqItem[] = [
  {
    question: "Où sont hébergées les données de mes clients ?",
    answer:
      "Toutes les données sont hébergées en Europe, chiffrées en transit et au repos, conformément aux exigences du RGPD.",
  },
  {
    question: "PassLoyal revend-il les données de mes clients ?",
    answer:
      "Non. Les données collectées via votre programme de fidélité vous appartiennent et ne sont ni revendues ni partagées avec des tiers à des fins commerciales.",
  },
  {
    question: "Que se passe-t-il si je résilie mon abonnement ?",
    answer:
      "Vous pouvez exporter l'intégralité de vos données clients avant résiliation. Les cartes déjà installées dans le Wallet de vos clients cessent simplement de se mettre à jour.",
  },
  {
    question: "Le QR code de chaque carte peut-il être falsifié ?",
    answer:
      "Non. Chaque QR code est chiffré et à usage contrôlé, ce qui empêche toute duplication ou falsification lors du scan en caisse.",
  },
];

export const pricingFaq: FaqItem[] = [
  {
    question: "Puis-je changer d'offre à tout moment ?",
    answer:
      "Oui, vous pouvez passer de Starter à Pro (ou inversement) à tout moment. Le changement prend effet immédiatement et la facturation est ajustée au prorata.",
  },
  {
    question: "Y a-t-il un engagement de durée ?",
    answer:
      "Aucun engagement. Les offres Starter et Pro sont sans engagement, résiliables à tout moment. L'offre Enterprise est adaptée selon vos besoins lors de l'échange avec notre équipe.",
  },
  {
    question: "Comment est calculé le nombre de cartes actives ?",
    answer:
      "Une carte est considérée active tant qu'elle reste installée dans le Wallet d'un client. Les cartes supprimées par le client ne sont plus comptabilisées.",
  },
  {
    question: "L'offre Enterprise convient-elle aux franchises ?",
    answer:
      "Oui, c'est son usage principal : gestion multi-boutiques, statistiques consolidées par enseigne et accompagnement dédié au déploiement sur l'ensemble du réseau.",
  },
];
