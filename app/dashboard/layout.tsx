"use client";

import { useState } from "react";
import { Toaster } from "sonner";
import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="lg:pl-64">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        <main>{children}</main>
      </div>
      <Toaster position="top-right" richColors closeButton />
    </div>
  );
}
