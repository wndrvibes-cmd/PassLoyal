import { createClient } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";
import { SUPABASE_ANON_KEY, SUPABASE_URL, isSupabaseConfigured } from "@/lib/supabase/client";
import { generateApplePass, isAppleWalletConfigured } from "@/lib/wallet/apple";
import { getPublicWalletCard } from "@/services/wallet";

interface RouteParams {
  params: Promise<{ token: string }>;
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  const { token } = await params;

  if (!isAppleWalletConfigured()) {
    return NextResponse.json(
      {
        error:
          "Apple Wallet n'est pas encore configuré sur ce projet (certificats Apple Developer manquants).",
      },
      { status: 501 }
    );
  }

  if (!isSupabaseConfigured) {
    return NextResponse.json({ error: "Supabase n'est pas configuré." }, { status: 503 });
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  try {
    const card = await getPublicWalletCard(supabase, token);
    if (!card) {
      return NextResponse.json({ error: "Carte introuvable." }, { status: 404 });
    }

    const pkpass = await generateApplePass(card);
    return new NextResponse(new Uint8Array(pkpass), {
      headers: {
        "Content-Type": "application/vnd.apple.pkpass",
        "Content-Disposition": `attachment; filename="passloyal-${token}.pkpass"`,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erreur lors de la génération du pass." },
      { status: 500 }
    );
  }
}
