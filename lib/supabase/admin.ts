import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_URL } from "./client";

/**
 * Service-role Supabase client for privileged operations (creating/deleting
 * auth users) that RLS can never allow, however permissive the policy.
 * Only ever import this from a Route Handler (app/api/**), never from a
 * client component. Never call this without having already verified the
 * caller is a super_admin — it bypasses every RLS policy in the project.
 */
export function createSupabaseAdminClient(): SupabaseClient {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!serviceRoleKey) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY n'est pas configurée. Ajoutez-la à .env.local (dev) et aux variables d'environnement Vercel (production)."
    );
  }

  return createClient(SUPABASE_URL, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
