import Link from "next/link";
import { ShieldCheck, Sparkles, Wallet } from "lucide-react";

interface AuthShellProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export default function AuthShell({ title, subtitle, children }: AuthShellProps) {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-slate-900 lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(closest-side,rgba(79,70,229,0.35),transparent)]"
        />

        <Link href="/" className="relative flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-blue-500 text-white shadow-md shadow-indigo-500/30">
            <Wallet className="h-4 w-4" strokeWidth={2.5} />
          </span>
          <span className="text-[15px] font-semibold tracking-tight text-white">PassLoyal</span>
        </Link>

        <div className="relative">
          <p className="text-[13px] font-medium uppercase tracking-[0.2em] text-indigo-300">
            Espace commerçant
          </p>
          <h2 className="mt-4 max-w-sm text-3xl font-semibold leading-tight text-white">
            Pilotez la fidélité de vos clients en un seul endroit.
          </h2>
          <ul className="mt-8 space-y-3 text-[14px] text-slate-300">
            <li className="flex items-center gap-2.5">
              <ShieldCheck className="h-4 w-4 text-indigo-400" /> Données hébergées et sécurisées
            </li>
            <li className="flex items-center gap-2.5">
              <Sparkles className="h-4 w-4 text-indigo-400" /> Cartes Apple Wallet & Google Wallet
            </li>
          </ul>
        </div>

        <p className="relative text-[12.5px] text-slate-500">
          © {new Date().getFullYear()} PassLoyal. Tous droits réservés.
        </p>
      </div>

      <div className="flex items-center justify-center bg-white px-4 py-12 sm:px-6">
        <div className="w-full max-w-sm">
          <Link href="/" className="mb-8 flex items-center gap-2.5 lg:hidden">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-blue-500 text-white shadow-md shadow-indigo-500/30">
              <Wallet className="h-4 w-4" strokeWidth={2.5} />
            </span>
            <span className="text-[15px] font-semibold tracking-tight text-slate-900">
              PassLoyal
            </span>
          </Link>

          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">{title}</h1>
          <p className="mt-2 text-[14.5px] text-slate-500">{subtitle}</p>

          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
