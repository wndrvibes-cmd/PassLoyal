import type { Metadata } from "next";
import CustomerDetails from "@/components/customers/CustomerDetails";

export const metadata: Metadata = {
  title: "Fiche client",
  description: "Détails, historique et gestion des points d'un client PassLoyal.",
};

interface CustomerDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function CustomerDetailPage({ params }: CustomerDetailPageProps) {
  const { id } = await params;
  return <CustomerDetails customerId={id} />;
}
