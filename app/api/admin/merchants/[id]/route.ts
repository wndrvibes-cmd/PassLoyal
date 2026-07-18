import { NextResponse } from "next/server";
import { getCurrentProfile } from "@/lib/auth/roles";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  const profile = await getCurrentProfile(supabase);

  if (!profile || profile.role !== "super_admin") {
    return NextResponse.json({ error: "Accès refusé." }, { status: 403 });
  }

  const { data: merchant, error: fetchError } = await supabase
    .from("merchants")
    .select("id, user_id, business_name")
    .eq("id", id)
    .maybeSingle();

  if (fetchError) {
    return NextResponse.json({ error: fetchError.message }, { status: 400 });
  }
  if (!merchant) {
    return NextResponse.json({ error: "Commerçant introuvable." }, { status: 404 });
  }

  const { error: deleteError } = await supabase.from("merchants").delete().eq("id", id);
  if (deleteError) {
    return NextResponse.json({ error: deleteError.message }, { status: 400 });
  }

  let adminClient;
  try {
    adminClient = createSupabaseAdminClient();
  } catch (error) {
    // Merchant row is already gone; the orphaned auth user can be cleaned up
    // once the service role key is configured.
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Configuration serveur manquante." },
      { status: 500 }
    );
  }

  await adminClient.auth.admin.deleteUser(merchant.user_id);

  await supabase.rpc("log_audit_event", {
    p_action: "merchant.delete",
    p_entity_type: "merchant",
    p_entity_id: id,
    p_metadata: { business_name: merchant.business_name },
  });

  return NextResponse.json({ success: true });
}
