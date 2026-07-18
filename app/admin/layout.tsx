"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Toaster } from "sonner";
import Header from "@/components/admin/Header";
import Sidebar from "@/components/admin/Sidebar";

const PAGE_TITLES: Record<string, string> = {
  "/admin": "Vue d'ensemble",
  "/admin/merchants": "Commerçants",
  "/admin/customers": "Clients",
  "/admin/subscriptions": "Abonnements",
  "/admin/wallet": "Wallet",
  "/admin/analytics": "Analytique",
  "/admin/logs": "Logs",
  "/admin/settings": "Paramètres de la plateforme",
};

function resolveTitle(pathname: string): string {
  if (PAGE_TITLES[pathname]) return PAGE_TITLES[pathname];
  const match = Object.keys(PAGE_TITLES)
    .filter((path) => path !== "/admin" && pathname.startsWith(path))
    .sort((a, b) => b.length - a.length)[0];
  return match ? PAGE_TITLES[match] : "Super Admin";
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="lg:pl-64">
        <Header title={resolveTitle(pathname)} onMenuClick={() => setIsSidebarOpen(true)} />
        <main>{children}</main>
      </div>
      <Toaster position="top-right" richColors closeButton />
    </div>
  );
}
