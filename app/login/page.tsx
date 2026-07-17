import type { Metadata } from "next";
import AuthShell from "@/components/auth/AuthShell";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Connexion",
  description: "Connectez-vous à votre espace commerçant PassLoyal.",
};

export default function LoginPage() {
  return (
    <AuthShell
      title="Bon retour"
      subtitle="Connectez-vous pour piloter votre programme de fidélité."
    >
      <LoginForm />
    </AuthShell>
  );
}
