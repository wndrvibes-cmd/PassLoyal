import { z } from "zod";
import { REWARD_TYPES } from "@/types/database";

export const programSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Le nom doit contenir au moins 2 caractères.")
    .max(60, "60 caractères maximum."),
  description: z.string().trim().max(280, "280 caractères maximum."),
  logo_url: z
    .string()
    .trim()
    .refine((value) => value === "" || /^https?:\/\/.+/i.test(value), {
      message: "URL de logo invalide (doit commencer par http:// ou https://).",
    }),
  primary_color: z.string().regex(/^#[0-9a-fA-F]{6}$/, "Couleur invalide."),
  secondary_color: z.string().regex(/^#[0-9a-fA-F]{6}$/, "Couleur invalide."),
  reward_type: z.enum(REWARD_TYPES),
  points_per_visit: z
    .number({ invalid_type_error: "Nombre invalide." })
    .min(0, "Doit être positif.")
    .max(1000, "Valeur trop élevée."),
  points_per_euro: z
    .number({ invalid_type_error: "Nombre invalide." })
    .min(0, "Doit être positif.")
    .max(1000, "Valeur trop élevée."),
  reward_points: z
    .number({ invalid_type_error: "Nombre invalide." })
    .min(1, "Doit être supérieur à 0.")
    .max(100000, "Valeur trop élevée."),
  qr_code_enabled: z.boolean(),
  wallet_enabled: z.boolean(),
  is_active: z.boolean(),
});

export type ProgramFormValues = z.infer<typeof programSchema>;
