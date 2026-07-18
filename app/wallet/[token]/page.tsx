import type { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { Award, Calendar, Globe, MapPin, Phone, TrendingUp } from "lucide-react";
import { SUPABASE_ANON_KEY, SUPABASE_URL, isSupabaseConfigured } from "@/lib/supabase/client";
import { getPublicWalletCard } from "@/services/wallet";
import AddToWalletButtons from "@/components/wallet/AddToWalletButtons";
import CardPreview from "@/components/wallet/CardPreview";
import QRCodeCard from "@/components/wallet/QRCodeCard";

interface WalletCardPageProps {
  params: Promise<{ token: string }>;
}

export const metadata: Metadata = {
  title: "Votre carte de fidélité",
  description: "Ajoutez votre carte de fidélité à Apple Wallet ou Google Wallet.",
  robots: { index: false, follow: false },
};

const LOYALTY_LEVEL_LABELS: Record<string, string> = {
  bronze: "Bronze",
  silver: "Argent",
  gold: "Or",
  platinum: "Platine",
};

function formatDate(dateString: string | null) {
  if (!dateString) return "—";
  return new Date(dateString).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default async function WalletCardPage({ params }: WalletCardPageProps) {
  const { token } = await params;

  if (!isSupabaseConfigured) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <p className="max-w-sm text-center text-[14px] text-slate-500">
          Cette carte n&apos;est pas encore disponible.
        </p>
      </div>
    );
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  let card = null;
  try {
    card = await getPublicWalletCard(supabase, token);
  } catch {
    card = null;
  }

  if (!card) {
    notFound();
  }

  const headersList = await headers();
  const host = headersList.get("host") ?? "pass-loyal.vercel.app";
  const protocol = host.includes("localhost") ? "http" : "https";
  const walletUrl = `${protocol}://${host}/wallet/${token}`;

  const socialEntries = Object.entries(card.social_links ?? {}).filter(([, value]) => value);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-lg font-semibold tracking-tight text-slate-900">
            {card.business_name ?? "PassLoyal"}
          </h1>
          {card.card_description && (
            <p className="mt-1 text-[13px] text-slate-500">{card.card_description}</p>
          )}
        </div>

        <CardPreview
          data={{
            businessName: card.business_name ?? "",
            logoUrl: card.logo_url ?? "",
            bannerUrl: card.banner_url ?? "",
            primaryColor: card.primary_color,
            secondaryColor: card.secondary_color,
            memberName: `${card.first_name} ${card.last_name}`,
            points: card.total_points,
            level: card.loyalty_level,
          }}
        />

        <AddToWalletButtons token={token} />

        <div className="grid grid-cols-2 gap-3">
          <Metric icon={Award} label="Niveau" value={LOYALTY_LEVEL_LABELS[card.loyalty_level]} />
          <Metric icon={TrendingUp} label="Visites" value={String(card.total_visits)} />
          <Metric icon={Calendar} label="Membre depuis" value={formatDate(card.member_since)} />
          <Metric icon={Calendar} label="Dernière visite" value={formatDate(card.last_visit)} />
        </div>

        <QRCodeCard url={walletUrl} fileName={`carte-${card.first_name}-${card.last_name}`} />

        {(card.address || card.phone || card.website || socialEntries.length > 0) && (
          <div className="rounded-2xl border border-slate-200 bg-white p-5 text-[13px] text-slate-600">
            {card.address && (
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-slate-400" /> {card.address}
              </p>
            )}
            {card.phone && (
              <p className="mt-2 flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-slate-400" /> {card.phone}
              </p>
            )}
            {card.website && (
              <p className="mt-2 flex items-center gap-2">
                <Globe className="h-4 w-4 shrink-0 text-slate-400" />
                <a
                  href={card.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-700"
                >
                  {card.website}
                </a>
              </p>
            )}
            {socialEntries.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2 border-t border-slate-100 pt-3">
                {socialEntries.map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-slate-100 px-3 py-1 text-[12px] font-medium capitalize text-slate-600 hover:bg-slate-200"
                  >
                    {platform}
                  </a>
                ))}
              </div>
            )}
          </div>
        )}

        <p className="text-center text-[12px] text-slate-400">
          Propulsé par PassLoyal · Carte n° {token.slice(0, 8)}
        </p>
      </div>
    </div>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Award;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3">
      <span className="flex items-center gap-1.5 text-[11.5px] font-medium text-slate-500">
        <Icon className="h-3.5 w-3.5" /> {label}
      </span>
      <p className="mt-1 truncate text-[14px] font-semibold text-slate-900">{value}</p>
    </div>
  );
}
