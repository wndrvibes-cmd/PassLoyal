"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Maximize2, Printer, RefreshCw, X } from "lucide-react";
import QRCode from "qrcode";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface QRCodeCardProps {
  url: string;
  fileName: string;
  onRegenerate?: () => void;
  isRegenerating?: boolean;
}

export default function QRCodeCard({
  url,
  fileName,
  onRegenerate,
  isRegenerating,
}: QRCodeCardProps) {
  const [pngDataUrl, setPngDataUrl] = useState<string | null>(null);
  const [svgMarkup, setSvgMarkup] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function generate() {
      try {
        const [png, svg] = await Promise.all([
          QRCode.toDataURL(url, { width: 480, margin: 1 }),
          QRCode.toString(url, { type: "svg", margin: 1 }),
        ]);
        if (isMounted) {
          setPngDataUrl(png);
          setSvgMarkup(svg);
        }
      } catch {
        toast.error("Impossible de générer le QR Code.");
      }
    }

    generate();
    return () => {
      isMounted = false;
    };
  }, [url]);

  const downloadPng = () => {
    if (!pngDataUrl) return;
    const link = document.createElement("a");
    link.href = pngDataUrl;
    link.download = `${fileName}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadSvg = () => {
    if (!svgMarkup) return;
    const blob = new Blob([svgMarkup], { type: "image/svg+xml" });
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = `${fileName}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  };

  const handlePrint = () => {
    if (!pngDataUrl) return;
    const printWindow = window.open("", "_blank", "width=480,height=600");
    if (!printWindow) {
      toast.error("Autorisez les pop-ups pour imprimer le QR Code.");
      return;
    }
    printWindow.document.write(
      `<html><head><title>QR Code</title></head><body style="display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;"><img src="${pngDataUrl}" style="width:320px;height:320px;" /></body></html>`
    );
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-[14px] font-semibold tracking-tight text-slate-900">QR Code</h3>
        {onRegenerate && (
          <button
            type="button"
            onClick={onRegenerate}
            disabled={isRegenerating}
            className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-indigo-600 hover:text-indigo-700 disabled:pointer-events-none disabled:opacity-50"
          >
            <RefreshCw className={cn("h-3.5 w-3.5", isRegenerating && "animate-spin")} />{" "}
            Régénérer
          </button>
        )}
      </div>

      <button
        type="button"
        onClick={() => pngDataUrl && setIsFullscreen(true)}
        className="mx-auto mt-4 block rounded-xl border border-slate-100 p-3"
        aria-label="Afficher le QR Code en plein écran"
      >
        {pngDataUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={pngDataUrl} alt="QR Code du client" className="h-40 w-40" />
        ) : (
          <div className="h-40 w-40 animate-pulse rounded-lg bg-slate-100" />
        )}
      </button>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={downloadPng}
          disabled={!pngDataUrl}
          className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-[12.5px] font-medium text-slate-700 hover:bg-slate-50 disabled:pointer-events-none disabled:opacity-50"
        >
          <Download className="h-3.5 w-3.5" /> PNG
        </button>
        <button
          type="button"
          onClick={downloadSvg}
          disabled={!svgMarkup}
          className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-[12.5px] font-medium text-slate-700 hover:bg-slate-50 disabled:pointer-events-none disabled:opacity-50"
        >
          <Download className="h-3.5 w-3.5" /> SVG
        </button>
        <button
          type="button"
          onClick={handlePrint}
          disabled={!pngDataUrl}
          className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-[12.5px] font-medium text-slate-700 hover:bg-slate-50 disabled:pointer-events-none disabled:opacity-50"
        >
          <Printer className="h-3.5 w-3.5" /> Imprimer
        </button>
        <button
          type="button"
          onClick={() => setIsFullscreen(true)}
          disabled={!pngDataUrl}
          className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-[12.5px] font-medium text-slate-700 hover:bg-slate-50 disabled:pointer-events-none disabled:opacity-50"
        >
          <Maximize2 className="h-3.5 w-3.5" /> Plein écran
        </button>
      </div>

      <AnimatePresence>
        {isFullscreen && pngDataUrl && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFullscreen(false)}
              aria-hidden
              className="fixed inset-0 z-50 bg-slate-900/90"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              role="dialog"
              aria-modal="true"
              aria-label="QR Code en plein écran"
              className="fixed inset-0 z-50 flex items-center justify-center p-8"
            >
              <button
                type="button"
                onClick={() => setIsFullscreen(false)}
                aria-label="Fermer"
                className="absolute right-6 top-6 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </button>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={pngDataUrl}
                alt="QR Code du client"
                className="max-h-[70vh] max-w-[70vw] rounded-2xl bg-white p-6"
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
