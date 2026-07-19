export type Feature = {
  slug: string;
  icon:
    | "wallet"
    | "smartphone"
    | "qr-code"
    | "bell"
    | "bar-chart"
    | "zap"
    | "shield-check"
    | "layers";
  title: string;
  description: string;
  detail: string;
  points: string[];
};

export const features: Feature[] = [
  {
    slug: "apple-wallet",
    icon: "wallet",
    title: "Apple Wallet",
    description: "Une carte de fidélité native, rangée dans le Wallet de chaque iPhone.",
    detail:
      "Vos clients ajoutent leur carte PassLoyal en un tap, directement dans l'app Wallet native d'Apple. Elle apparaît sur l'écran verrouillé à proximité de votre boutique, sans jamais quitter l'écosystème Apple.",
    points: [
      "Ajout en un tap, aucune app à installer",
      "Affichage automatique sur l'écran verrouillé à proximité",
      "Mise à jour du solde de points en temps réel",
    ],
  },
  {
    slug: "google-wallet",
    icon: "smartphone",
    title: "Google Wallet",
    description: "Compatible avec tous les smartphones Android via Google Wallet.",
    detail:
      "La même expérience premium côté Android : une carte enregistrée dans Google Wallet, synchronisée instantanément, accessible hors-ligne et mise à jour à distance sans action du client.",
    points: [
      "Compatible avec tous les appareils Android récents",
      "Notifications push natives Google",
      "Synchronisation instantanée des points et récompenses",
    ],
  },
  {
    slug: "qr-code",
    icon: "qr-code",
    title: "QR Code intelligent",
    description: "Un scan en caisse suffit pour créditer les points, sans terminal dédié.",
    detail:
      "Chaque carte génère un QR code unique et sécurisé. Un simple scan avec votre smartphone ou votre terminal de caisse existant suffit pour créditer les points ou valider une récompense.",
    points: [
      "Scan compatible avec tout terminal existant",
      "QR code chiffré et à usage sécurisé",
      "Fonctionne même sans connexion internet en caisse",
    ],
  },
  {
    slug: "notifications",
    icon: "bell",
    title: "Notifications push",
    description: "Relancez vos clients au bon moment, directement sur leur écran verrouillé.",
    detail:
      "Envoyez des notifications ciblées : nouvelle récompense disponible, offre du jour, rappel de points expirants. Pas besoin d'application ni de base d'e-mails — la notification part directement depuis le Wallet.",
    points: [
      "Segmentation par comportement d'achat",
      "Envoi programmé ou déclenché automatiquement",
      "Taux d'ouverture bien supérieur à l'e-mail",
    ],
  },
  {
    slug: "statistiques",
    icon: "bar-chart",
    title: "Statistiques en temps réel",
    description: "Suivez l'engagement, la fréquence de visite et la valeur de vos clients.",
    detail:
      "Un tableau de bord clair présente vos indicateurs clés : nombre de cartes actives, fréquence de passage, panier moyen par client fidélisé, performance de vos campagnes de notifications.",
    points: [
      "Vue d'ensemble de l'activité de votre programme",
      "Export des données à tout moment",
      "Indicateurs pensés pour les commerçants, pas pour les data analysts",
    ],
  },
  {
    slug: "sans-application",
    icon: "zap",
    title: "Sans application",
    description: "Zéro téléchargement, zéro friction — tout se passe dans le Wallet natif.",
    detail:
      "Contrairement aux applications de fidélité classiques, PassLoyal ne demande à vos clients ni téléchargement, ni création de compte, ni mot de passe. La carte vit directement dans l'app Wallet déjà installée sur leur téléphone.",
    points: [
      "Aucun taux d'abandon lié à un téléchargement d'app",
      "Aucune création de compte requise pour le client",
      "Expérience fluide dès la première visite",
    ],
  },
  {
    slug: "installation-rapide",
    icon: "layers",
    title: "Installation rapide",
    description: "Votre programme de fidélité est en ligne en moins de 15 minutes.",
    detail:
      "Créez votre carte, personnalisez ses couleurs et votre logo, définissez vos règles de points et publiez. Aucune compétence technique requise, aucune intégration complexe avec votre caisse.",
    points: [
      "Personnalisation visuelle guidée",
      "Mise en ligne en moins de 15 minutes",
      "Accompagnement à la mise en place inclus",
    ],
  },
  {
    slug: "securite",
    icon: "shield-check",
    title: "Sécurité et fiabilité",
    description: "Une infrastructure pensée pour la fiabilité, la sécurité des données.",
    detail:
      "Chiffrement des données, hébergement européen, conformité aux exigences de confidentialité — la sécurité de vos données et celles de vos clients est structurelle, pas optionnelle.",
    points: [
      "Chiffrement des données en transit et au repos",
      "Hébergement en Europe",
      "Conformité aux bonnes pratiques RGPD",
    ],
  },
];
