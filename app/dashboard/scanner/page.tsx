import type { Metadata } from "next";
import ScannerView from "@/components/wallet/ScannerView";

export const metadata: Metadata = {
  title: "Scanner",
  description: "Scannez le QR Code d'un client pour gérer ses points et récompenses.",
};

export default function ScannerPage() {
  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-5">
        <h1 className="text-xl font-semibold tracking-tight text-slate-900">Scanner</h1>
        <p className="mt-1 text-[13.5px] text-slate-500">
          Identifiez un client en scannant sa carte, puis créditez des points ou validez une
          récompense.
        </p>
      </div>
      <ScannerView />
    </div>
  );
}
