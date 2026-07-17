"use client";

import { Search } from "lucide-react";
import { LOYALTY_LEVELS, type LoyaltyLevel } from "@/types/database";

export type CustomerSortBy = "name" | "points" | "visits" | "created_at" | "last_visit";
export type CustomerSortDir = "asc" | "desc";
export type CustomerStatusFilter = "all" | "active" | "inactive";

export interface CustomerFilterState {
  search: string;
  loyaltyLevel: LoyaltyLevel | "all";
  status: CustomerStatusFilter;
  minPoints: string;
  maxPoints: string;
  minVisits: string;
  maxVisits: string;
  signupFrom: string;
  signupTo: string;
  sortBy: CustomerSortBy;
  sortDir: CustomerSortDir;
}

export const DEFAULT_CUSTOMER_FILTERS: CustomerFilterState = {
  search: "",
  loyaltyLevel: "all",
  status: "all",
  minPoints: "",
  maxPoints: "",
  minVisits: "",
  maxVisits: "",
  signupFrom: "",
  signupTo: "",
  sortBy: "created_at",
  sortDir: "desc",
};

const LOYALTY_LEVEL_LABELS: Record<LoyaltyLevel, string> = {
  bronze: "Bronze",
  silver: "Argent",
  gold: "Or",
  platinum: "Platine",
};

const SORT_OPTIONS: { value: CustomerSortBy; label: string }[] = [
  { value: "created_at", label: "Date d'inscription" },
  { value: "name", label: "Nom" },
  { value: "points", label: "Points" },
  { value: "visits", label: "Visites" },
  { value: "last_visit", label: "Dernière visite" },
];

interface CustomerFiltersProps {
  filters: CustomerFilterState;
  onChange: (patch: Partial<CustomerFilterState>) => void;
  onReset: () => void;
}

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-[13px] text-slate-900 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10";
const labelClass = "mb-1 block text-[12px] font-medium text-slate-600";

export default function CustomerFilters({ filters, onChange, onReset }: CustomerFiltersProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          value={filters.search}
          onChange={(event) => onChange({ search: event.target.value })}
          placeholder="Rechercher un client (nom, email, téléphone)…"
          aria-label="Rechercher un client"
          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-[13.5px] text-slate-900 placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
        />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <div>
          <label htmlFor="loyaltyLevel" className={labelClass}>
            Niveau
          </label>
          <select
            id="loyaltyLevel"
            value={filters.loyaltyLevel}
            onChange={(event) =>
              onChange({ loyaltyLevel: event.target.value as CustomerFilterState["loyaltyLevel"] })
            }
            className={inputClass}
          >
            <option value="all">Tous</option>
            {LOYALTY_LEVELS.map((level) => (
              <option key={level} value={level}>
                {LOYALTY_LEVEL_LABELS[level]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="status" className={labelClass}>
            Statut
          </label>
          <select
            id="status"
            value={filters.status}
            onChange={(event) =>
              onChange({ status: event.target.value as CustomerStatusFilter })
            }
            className={inputClass}
          >
            <option value="all">Tous</option>
            <option value="active">Actifs</option>
            <option value="inactive">Inactifs</option>
          </select>
        </div>

        <div>
          <label htmlFor="minPoints" className={labelClass}>
            Points min
          </label>
          <input
            id="minPoints"
            type="number"
            min={0}
            value={filters.minPoints}
            onChange={(event) => onChange({ minPoints: event.target.value })}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="maxPoints" className={labelClass}>
            Points max
          </label>
          <input
            id="maxPoints"
            type="number"
            min={0}
            value={filters.maxPoints}
            onChange={(event) => onChange({ maxPoints: event.target.value })}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="minVisits" className={labelClass}>
            Visites min
          </label>
          <input
            id="minVisits"
            type="number"
            min={0}
            value={filters.minVisits}
            onChange={(event) => onChange({ minVisits: event.target.value })}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="maxVisits" className={labelClass}>
            Visites max
          </label>
          <input
            id="maxVisits"
            type="number"
            min={0}
            value={filters.maxVisits}
            onChange={(event) => onChange({ maxVisits: event.target.value })}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="signupFrom" className={labelClass}>
            Inscrit depuis
          </label>
          <input
            id="signupFrom"
            type="date"
            value={filters.signupFrom}
            onChange={(event) => onChange({ signupFrom: event.target.value })}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="signupTo" className={labelClass}>
            Inscrit jusqu&apos;au
          </label>
          <input
            id="signupTo"
            type="date"
            value={filters.signupTo}
            onChange={(event) => onChange({ signupTo: event.target.value })}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="sortBy" className={labelClass}>
            Trier par
          </label>
          <select
            id="sortBy"
            value={filters.sortBy}
            onChange={(event) => onChange({ sortBy: event.target.value as CustomerSortBy })}
            className={inputClass}
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="sortDir" className={labelClass}>
            Ordre
          </label>
          <select
            id="sortDir"
            value={filters.sortDir}
            onChange={(event) => onChange({ sortDir: event.target.value as CustomerSortDir })}
            className={inputClass}
          >
            <option value="desc">Décroissant</option>
            <option value="asc">Croissant</option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            type="button"
            onClick={onReset}
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-[13px] font-medium text-slate-600 transition-colors hover:bg-slate-50"
          >
            Réinitialiser
          </button>
        </div>
      </div>
    </div>
  );
}
