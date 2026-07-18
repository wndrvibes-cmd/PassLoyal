import { z } from "zod";

const urlOrEmpty = z
  .string()
  .trim()
  .refine((value) => value === "" || /^https?:\/\/.+/i.test(value), {
    message: "URL invalide (doit commencer par http:// ou https://).",
  });

export const walletCardDesignSchema = z.object({
  business_name: z.string().trim().max(80, "80 caractères maximum."),
  description: z.string().trim().max(280, "280 caractères maximum."),
  logo_url: urlOrEmpty,
  icon_url: urlOrEmpty,
  banner_url: urlOrEmpty,
  primary_color: z.string().regex(/^#[0-9a-fA-F]{6}$/, "Couleur invalide."),
  secondary_color: z.string().regex(/^#[0-9a-fA-F]{6}$/, "Couleur invalide."),
  address: z.string().trim().max(160, "160 caractères maximum."),
  phone: z.string().trim().max(30, "30 caractères maximum."),
  website: urlOrEmpty,
  facebook: urlOrEmpty,
  instagram: urlOrEmpty,
  twitter: urlOrEmpty,
});

export type WalletCardDesignFormValues = z.infer<typeof walletCardDesignSchema>;
