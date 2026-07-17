import type { Metadata } from "next";
import { Gift } from "lucide-react";
import ComingSoon from "@/components/dashboard/ComingSoon";

export const metadata: Metadata = {
  title: "Récompenses",
  description: "Gestion des récompenses PassLoyal.",
};

export default function RecompensesPage() {
  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <ComingSoon
        icon={Gift}
        title="Récompenses"
        description="La gestion dédiée des récompenses arrive dans un prochain chapitre. En attendant, vous pouvez ajouter une récompense à un client directement depuis sa fiche."
      />
    </div>
  );
}
