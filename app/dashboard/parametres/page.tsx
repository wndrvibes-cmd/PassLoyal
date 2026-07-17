import type { Metadata } from "next";
import { Settings } from "lucide-react";
import ComingSoon from "@/components/dashboard/ComingSoon";

export const metadata: Metadata = {
  title: "Paramètres",
  description: "Paramètres du compte PassLoyal.",
};

export default function ParametresPage() {
  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <ComingSoon
        icon={Settings}
        title="Paramètres"
        description="La page de paramètres (profil, facturation, notifications) arrive dans un prochain chapitre."
      />
    </div>
  );
}
