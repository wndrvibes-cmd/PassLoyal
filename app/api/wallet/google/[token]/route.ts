import { createClient } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";
import { SUPABASE_ANON_KEY, SUPABASE_URL, isSupabaseConfigured } from "@/lib/supabase/client";
import { buildGoogleWalletSaveUrl, isGoogleWalletConfigured } from "@/lib/wallet/google";
import { getPublicWalletCard } from "@/services/wallet";

interface RouteParams {
  params: Promise<{ token: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { token } = await params;

  if (!isGoogleWalletConfigured()) {
    return NextResponse.json(
      {
        error:
          "Google Wallet n'est pas encore configuré sur ce projet (identifiants Google Cloud manquants).",
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

    const saveUrl = buildGoogleWalletSaveUrl(card, request.nextUrl.origin);
    return NextResponse.json({ saveUrl });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erreur lors de la génération du lien Google Wallet.",
      },
      { status: 500 }
    );
  }
}
