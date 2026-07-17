import QuickActions from "@/components/dashboard/QuickActions";
import RecentActivity from "@/components/dashboard/RecentActivity";
import StatsCards from "@/components/dashboard/StatsCards";

export default function DashboardPage() {
  return (
    <div className="space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-slate-900">Bonjour</h1>
        <p className="mt-1 text-[13.5px] text-slate-500">
          Voici un aperçu de l&apos;activité de votre programme de fidélité.
        </p>
      </div>

      <StatsCards />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
        <QuickActions />
      </div>
    </div>
  );
}
