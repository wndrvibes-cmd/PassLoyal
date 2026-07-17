import type { Metadata } from "next";
import ProgramList from "@/components/programs/ProgramList";

export const metadata: Metadata = {
  title: "Programmes de fidélité",
  description: "Créez et gérez vos programmes de fidélité PassLoyal.",
};

export default function ProgramsPage() {
  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <ProgramList />
    </div>
  );
}
