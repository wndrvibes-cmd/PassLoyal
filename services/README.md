# services/ — réservé pour la logique d'intégration de la future application SaaS

Chaque sous-dossier accueillera la logique métier qui parle à un service externe ou encapsule un domaine technique — à isoler des composants React (`components/`) et des routes (`app/`). Rien n'est encore implémenté.

| Dossier | Responsabilité prévue |
|---|---|
| `auth/` | Authentification (session, connexion, inscription, rôles) |
| `stripe/` | Abonnements, facturation, webhooks Stripe |
| `supabase/` | Clients Supabase (browser/server) et requêtes base de données |
| `apple-wallet/` | Génération et mise à jour des passes Apple Wallet (`.pkpass`) |
| `google-wallet/` | Génération et mise à jour des objets Google Wallet |
| `api/` | Client HTTP partagé et helpers d'appel API internes |
| `webhooks/` | Réception et validation des webhooks entrants (Stripe, Wallet…) |
| `notifications/` | Envoi de notifications push depuis le Wallet |
| `qr-code/` | Génération et validation des QR codes de carte |
| `upload/` | Upload et traitement des logos/images marchands |
| `analytics/` | Agrégation des statistiques de fidélisation |
| `emails/` | Envoi d'e-mails transactionnels |
