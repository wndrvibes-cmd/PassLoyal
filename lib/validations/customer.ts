import { z } from "zod";
import { GENDERS, LOYALTY_LEVELS, WALLET_PLATFORMS } from "@/types/database";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const customerSchema = z.object({
  first_name: z.string().trim().min(1, "Le prénom est requis.").max(60, "60 caractères maximum."),
  last_name: z.string().trim().min(1, "Le nom est requis.").max(60, "60 caractères maximum."),
  email: z
    .string()
    .trim()
    .refine((value) => value === "" || EMAIL_PATTERN.test(value), {
      message: "Email invalide.",
    }),
  phone: z.string().trim().max(30, "30 caractères maximum."),
  birthday: z.string().trim(),
  gender: z.union([z.literal(""), z.enum(GENDERS)]),
  wallet_platform: z.union([z.literal(""), z.enum(WALLET_PLATFORMS)]),
  loyalty_level: z.enum(LOYALTY_LEVELS),
  is_active: z.boolean(),
});

export type CustomerFormValues = z.infer<typeof customerSchema>;
