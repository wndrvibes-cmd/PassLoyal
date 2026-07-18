import { NextResponse } from "next/server";
import { getCurrentProfile } from "@/lib/auth/roles";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createSupabaseServerClient();
  const profile = await getCurrentProfile(supabase);

  if (!profile || profile.role !== "super_admin") {
    return NextResponse.json({ error: "Accès refusé." }, { status: 403 });
  }

  const body = await request.json().catch(() => null);
  const businessName = typeof body?.business_name === "string" ? body.business_name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";

  if (!businessName || !email) {
    return NextResponse.json(
      { error: "Le nom du commerce et l'email sont requis." },
      { status: 400 }
    );
  }

  let adminClient;
  try {
    adminClient = createSupabaseAdminClient();
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Configuration serveur manquante." },
      { status: 500 }
    );
  }

  const { data: invited, error: inviteError } = await adminClient.auth.admin.inviteUserByEmail(
    email,
    { data: { business_name: businessName } }
  );

  if (inviteError || !invited?.user) {
    return NextResponse.json(
      { error: inviteError?.message ?? "Échec de l'invitation du commerçant." },
      { status: 400 }
    );
  }

  const { data: merchant, error: merchantError } = await supabase
    .from("merchants")
    .insert({ user_id: invited.user.id, business_name: businessName, email })
    .select("*")
    .single();

  if (merchantError) {
    await adminClient.auth.admin.deleteUser(invited.user.id);
    return NextResponse.json({ error: merchantError.message }, { status: 400 });
  }

  await supabase.rpc("log_audit_event", {
    p_action: "merchant.create",
    p_entity_type: "merchant",
    p_entity_id: merchant.id,
    p_metadata: { business_name: businessName, email },
  });

  return NextResponse.json({ merchant });
}
