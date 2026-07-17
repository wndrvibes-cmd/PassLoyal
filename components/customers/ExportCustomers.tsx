"use client";

import { useState } from "react";
import { FileSpreadsheet, FileText, Loader2 } from "lucide-react";
import Papa from "papaparse";
import { toast } from "sonner";
import type { Customer } from "@/types/database";

interface ExportCustomersProps {
  customers: Customer[];
}

const EXPORT_COLUMNS = [
  "first_name",
  "last_name",
  "email",
  "phone",
  "birthday",
  "gender",
  "wallet_platform",
  "loyalty_level",
  "total_points",
  "total_visits",
  "total_spent",
  "is_active",
  "last_visit",
  "created_at",
] as const;

function toRows(customers: Customer[]) {
  return customers.map((customer) =>
    Object.fromEntries(EXPORT_COLUMNS.map((column) => [column, customer[column] ?? ""]))
  );
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export default function ExportCustomers({ customers }: ExportCustomersProps) {
  const [isExportingExcel, setIsExportingExcel] = useState(false);

  const handleExportCsv = () => {
    if (customers.length === 0) {
      toast.info("Aucun client à exporter.");
      return;
    }
    const csv = Papa.unparse(toRows(customers));
    downloadBlob(new Blob([csv], { type: "text/csv;charset=utf-8;" }), "clients-passloyal.csv");
    toast.success("Export CSV téléchargé.");
  };

  const handleExportExcel = async () => {
    if (customers.length === 0) {
      toast.info("Aucun client à exporter.");
      return;
    }
    setIsExportingExcel(true);
    try {
      const XLSX = await import("xlsx");
      const worksheet = XLSX.utils.json_to_sheet(toRows(customers));
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Clients");
      const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" }) as unknown as BlobPart;
      downloadBlob(
        new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }),
        "clients-passloyal.xlsx"
      );
      toast.success("Export Excel téléchargé.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Échec de l'export Excel.");
    } finally {
      setIsExportingExcel(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={handleExportCsv}
        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-[13px] font-medium text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50"
      >
        <FileText className="h-4 w-4" /> CSV
      </button>
      <button
        type="button"
        onClick={handleExportExcel}
        disabled={isExportingExcel}
        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-[13px] font-medium text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50 disabled:pointer-events-none disabled:opacity-60"
      >
        {isExportingExcel ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <FileSpreadsheet className="h-4 w-4" />
        )}
        Excel
      </button>
    </div>
  );
}
