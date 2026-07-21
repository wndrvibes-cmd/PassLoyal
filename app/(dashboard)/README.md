# (dashboard) — réservé pour la future application SaaS

Ce groupe de routes est vide intentionnellement : aucune fonctionnalité n'est encore développée ici. Les dossiers ci-dessous réservent la structure des futures pages authentifiées.

`(dashboard)` est un [route group](https://nextjs.org/docs/app/building-your-application/routing/route-groups) Next.js : le nom entre parenthèses n'apparaît jamais dans l'URL. Quand ces pages seront construites, ce groupe aura son propre `layout.tsx` (navigation latérale, garde d'authentification) distinct de celui du site vitrine dans `app/(marketing)/`.

| Dossier | Contenu prévu |
|---|---|
| `overview/` | Tableau de bord principal — vue d'ensemble de l'activité de fidélisation |
| `cartes/` | Création et gestion des cartes de fidélité |
| `clients/` | CRM — liste et fiches clients, historique de points |
| `recompenses/` | Configuration des récompenses et paliers de points |
| `campagnes/` | Notifications push et campagnes de relance |
| `statistiques/` | Rapports et exports de données |
| `wallet/` | Suivi des cartes Apple Wallet / Google Wallet émises |
| `parametres/` | Réglages du compte et de la boutique |
| `facturation/` | Abonnement, moyens de paiement, factures (Stripe) |
| `equipe/` | Gestion des membres de l'équipe et des rôles |
| `notifications/` | Centre de notifications in-app |
| `api/` | Route handlers (`route.ts`) consommés par ces pages — résout en `/api/*` puisque les route groups ne modifient pas l'URL |

Aucun de ces dossiers ne contient de `page.tsx` pour l'instant — ils ne sont donc pas encore routables.
