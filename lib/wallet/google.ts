/**
 * Google Wallet integration.
 *
 * Unlike Apple Wallet, adding a Google Wallet pass doesn't require binary
 * signing — a "save" link is a signed JWT pointing at a loyalty object you
 * create via the Google Wallet REST API, opened as
 * https://pay.google.com/gp/v/save/<jwt>.
 *
 * Requires a Google Cloud service account with the Wallet Objects API
 * enabled (developers.google.com/wallet/generic/getting-started). Set:
 *
 *   GOOGLE_WALLET_ISSUER_ID              your Wallet issuer account ID
 *   GOOGLE_WALLET_SERVICE_ACCOUNT_EMAIL  service account client_email
 *   GOOGLE_WALLET_PRIVATE_KEY            service account private_key (PEM,
 *                                        with newlines escaped as \n)
 *
 * The JWT construction below is fully implemented — once the env vars are
 * set, buildGoogleWalletSaveUrl() produces a real, working save link.
 * What's still needed is a one-time setup step (not per-card): creating a
 * loyalty class for this issuer via the Wallet Objects API before objects
 * can reference it — see the TODO below.
 */

import jwt from "jsonwebtoken";
import type { PublicWalletCard } from "@/types/database";

export const GOOGLE_WALLET_ENV_VARS = [
  "GOOGLE_WALLET_ISSUER_ID",
  "GOOGLE_WALLET_SERVICE_ACCOUNT_EMAIL",
  "GOOGLE_WALLET_PRIVATE_KEY",
] as const;

export function isGoogleWalletConfigured(): boolean {
  return GOOGLE_WALLET_ENV_VARS.every((key) => Boolean(process.env[key]));
}

export function buildGoogleWalletSaveUrl(card: PublicWalletCard, origin: string): string {
  if (!isGoogleWalletConfigured()) {
    throw new Error(
      "Google Wallet n'est pas configuré. Ajoutez GOOGLE_WALLET_ISSUER_ID, " +
        "GOOGLE_WALLET_SERVICE_ACCOUNT_EMAIL et GOOGLE_WALLET_PRIVATE_KEY pour activer les cartes Google Wallet."
    );
  }

  const issuerId = process.env.GOOGLE_WALLET_ISSUER_ID as string;
  const serviceAccountEmail = process.env.GOOGLE_WALLET_SERVICE_ACCOUNT_EMAIL as string;
  const privateKey = (process.env.GOOGLE_WALLET_PRIVATE_KEY as string).replace(/\\n/g, "\n");

  // TODO (one-time setup, not per-card): create a loyalty class for this
  // issuer via the Wallet Objects API before objects can reference it.
  const classId = `${issuerId}.passloyal_loyalty_class`;
  const objectId = `${issuerId}.${card.token}`;

  const loyaltyObject = {
    id: objectId,
    classId,
    state: "ACTIVE",
    accountId: card.token,
    accountName: `${card.first_name} ${card.last_name}`,
    loyaltyPoints: {
      label: "Points",
      balance: { int: card.total_points },
    },
    barcode: {
      type: "QR_CODE",
      value: `${origin}/wallet/${card.token}`,
    },
  };

  const payload = {
    iss: serviceAccountEmail,
    aud: "google",
    typ: "savetowallet",
    iat: Math.floor(Date.now() / 1000),
    origins: [origin],
    payload: { loyaltyObjects: [loyaltyObject] },
  };

  const signedJwt = jwt.sign(payload, privateKey, { algorithm: "RS256" });
  return `https://pay.google.com/gp/v/save/${signedJwt}`;
}
