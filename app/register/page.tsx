import type { Metadata } from "next";
import AuthShell from "@/components/auth/AuthShell";
import RegisterForm from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Créer un compte",
  description: "Créez votre espace commerçant PassLoyal et lancez votre programme de fidélité.",
};

export default function RegisterPage() {
  return (
    <AuthShell
      title="Créez votre compte"
      subtitle="Lancez votre programme de fidélité digitale en quelques minutes."
    >
      <RegisterForm />
    </AuthShell>
  );
}
