"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, FileUp, Loader2, Upload, X } from "lucide-react";
import Papa from "papaparse";
import { toast } from "sonner";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { bulkImportCustomers, type ImportResult, type ImportRow } from "@/services/customers";

interface ImportCustomersProps {
  merchantId: string;
  onClose: () => void;
  onImported: () => void;
}

const EXPECTED_HEADERS = [
  "first_name",
  "last_name",
  "email",
  "phone",
  "birthday",
  "gender",
  "wallet_platform",
  "loyalty_level",
];

export default function ImportCustomers({ merchantId, onClose, onImported }: ImportCustomersProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [rows, setRows] = useState<ImportRow[]>([]);
  const [parseError, setParseError] = useState<string | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [result, setResult] = useState<ImportResult | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setParseError(null);
    setResult(null);

    Papa.parse<Record<string, string>>(file, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim().toLowerCase(),
      complete: (parsed) => {
        if (parsed.errors.length > 0) {
          setParseError(parsed.errors[0]?.message ?? "Fichier CSV invalide.");
          setRows([]);
          return;
        }

        const hasRequiredHeaders = ["first_name", "last_name"].every((header) =>
          parsed.meta.fields?.includes(header)
        );
        if (!hasRequiredHeaders) {
          setParseError(
            `Colonnes manquantes. Attendu au minimum : first_name, last_name. Colonnes trouvées : ${
              parsed.meta.fields?.join(", ") || "aucune"
            }.`
          );
          setRows([]);
          return;
        }

        const parsedRows: ImportRow[] = parsed.data.map((row) => ({
          first_name: row.first_name ?? "",
          last_name: row.last_name ?? "",
          email: row.email ?? "",
          phone: row.phone ?? "",
          birthday: row.birthday ?? "",
          gender: row.gender ?? "",
          wallet_platform: row.wallet_platform ?? "",
          loyalty_level: row.loyalty_level ?? "",
        }));
        setRows(parsedRows);
      },
      error: (error: Error) => {
        setParseError(error.message);
        setRows([]);
      },
    });
  };

  const handleImport = async () => {
    if (rows.length === 0) return;
    setIsImporting(true);

    try {
      const supabase = createSupabaseBrowserClient();
      const importResult = await bulkImportCustomers(supabase, merchantId, rows);
      setResult(importResult);
      if (importResult.inserted > 0) {
        toast.success(`${importResult.inserted} client(s) importé(s).`);
        onImported();
      } else {
        toast.info("Aucun nouveau client importé.");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Échec de l'import.");
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={isImporting ? undefined : onClose}
        aria-hidden
        className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="import-customers-title"
        className="fixed inset-x-0 bottom-0 z-50 max-h-[90vh] overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:max-h-[85vh] sm:w-full sm:max-w-lg sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-3xl"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white/95 px-6 py-4 backdrop-blur">
          <h2
            id="import-customers-title"
            className="text-[16px] font-semibold tracking-tight text-slate-900"
          >
            Importer des clients (CSV)
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-5 p-6">
          <p className="text-[13px] text-slate-500">
            Colonnes attendues : <code className="text-[12px]">{EXPECTED_HEADERS.join(", ")}</code>.
            Seuls <code className="text-[12px]">first_name</code> et{" "}
            <code className="text-[12px]">last_name</code> sont obligatoires.
          </p>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex w-full flex-col items-center gap-2 rounded-xl border border-dashed border-slate-300 px-4 py-8 text-center transition-colors hover:border-indigo-300 hover:bg-indigo-50/40"
          >
            <FileUp className="h-6 w-6 text-slate-400" />
            <span className="text-[13.5px] font-medium text-slate-700">
              {fileName ?? "Choisir un fichier CSV"}
            </span>
            <span className="text-[12px] text-slate-400">
              {rows.length > 0 ? `${rows.length} ligne(s) détectée(s)` : "Cliquez pour parcourir"}
            </span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,text/csv"
            onChange={handleFileChange}
            className="sr-only"
          />

          {parseError && (
            <p className="flex items-start gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-[13px] text-red-600">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {parseError}
            </p>
          )}

          {result && (
            <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-[13px] text-slate-600">
              <p>
                <span className="font-medium text-emerald-600">{result.inserted}</span> importé(s) ·{" "}
                <span className="font-medium text-amber-600">{result.skippedDuplicates}</span> doublon(s)
                ignoré(s) ·{" "}
                <span className="font-medium text-red-600">{result.errors.length}</span> erreur(s)
              </p>
              {result.errors.length > 0 && (
                <ul className="max-h-32 space-y-1 overflow-y-auto text-[12px] text-red-600">
                  {result.errors.map((error) => (
                    <li key={error.row}>
                      Ligne {error.row} : {error.reason}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full px-5 py-2.5 text-[13.5px] font-medium text-slate-600 hover:bg-slate-100"
            >
              Fermer
            </button>
            <button
              type="button"
              onClick={handleImport}
              disabled={rows.length === 0 || isImporting}
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-slate-900 px-6 py-2.5 text-[13.5px] font-medium text-white shadow-md shadow-slate-900/15 transition-transform hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-50"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-indigo-600 to-blue-500 transition-transform duration-300 group-hover:translate-x-0" />
              <span className="relative flex items-center gap-2">
                {isImporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                Importer
              </span>
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
