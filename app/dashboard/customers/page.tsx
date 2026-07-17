"use client";

import { useMemo, useState } from "react";
import { Plus, Upload, Users } from "lucide-react";
import { toast } from "sonner";
import Skeleton from "@/components/ui/Skeleton";
import CustomerCard from "@/components/customers/CustomerCard";
import CustomerEmptyState from "@/components/customers/CustomerEmptyState";
import CustomerFilters, {
  DEFAULT_CUSTOMER_FILTERS,
  type CustomerFilterState,
} from "@/components/customers/CustomerFilters";
import CustomerForm from "@/components/customers/CustomerForm";
import CustomerStats from "@/components/customers/CustomerStats";
import CustomerTable from "@/components/customers/CustomerTable";
import DeleteCustomerDialog from "@/components/customers/DeleteCustomerDialog";
import ExportCustomers from "@/components/customers/ExportCustomers";
import ImportCustomers from "@/components/customers/ImportCustomers";
import { useCustomers } from "@/hooks/useCustomers";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { toggleCustomerActive } from "@/services/customers";
import type { Customer } from "@/types/database";

export default function CustomersPage() {
  const { merchant, customers, isLoading, error, setCustomers, reload } = useCustomers();

  const [filters, setFilters] = useState<CustomerFilterState>(DEFAULT_CUSTOMER_FILTERS);
  const [formState, setFormState] = useState<{ open: boolean; customer: Customer | null }>({
    open: false,
    customer: null,
  });
  const [deletingCustomer, setDeletingCustomer] = useState<Customer | null>(null);
  const [isImportOpen, setIsImportOpen] = useState(false);

  const patchFilters = (patch: Partial<CustomerFilterState>) => {
    setFilters((previous) => ({ ...previous, ...patch }));
  };

  const filteredCustomers = useMemo(() => {
    let result = customers.filter((customer) => {
      if (filters.status === "active" && !customer.is_active) return false;
      if (filters.status === "inactive" && customer.is_active) return false;
      if (filters.loyaltyLevel !== "all" && customer.loyalty_level !== filters.loyaltyLevel) {
        return false;
      }
      if (filters.minPoints && customer.total_points < Number(filters.minPoints)) return false;
      if (filters.maxPoints && customer.total_points > Number(filters.maxPoints)) return false;
      if (filters.minVisits && customer.total_visits < Number(filters.minVisits)) return false;
      if (filters.maxVisits && customer.total_visits > Number(filters.maxVisits)) return false;
      if (filters.signupFrom && customer.created_at < filters.signupFrom) return false;
      if (filters.signupTo && customer.created_at > `${filters.signupTo}T23:59:59`) return false;

      if (filters.search) {
        const query = filters.search.toLowerCase();
        const haystack = `${customer.first_name} ${customer.last_name} ${customer.email ?? ""} ${
          customer.phone ?? ""
        }`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }

      return true;
    });

    result = [...result].sort((a, b) => {
      const direction = filters.sortDir === "asc" ? 1 : -1;
      switch (filters.sortBy) {
        case "name":
          return (
            direction *
            `${a.first_name} ${a.last_name}`.localeCompare(`${b.first_name} ${b.last_name}`)
          );
        case "points":
          return direction * (a.total_points - b.total_points);
        case "visits":
          return direction * (a.total_visits - b.total_visits);
        case "last_visit":
          return direction * (a.last_visit ?? "").localeCompare(b.last_visit ?? "");
        case "created_at":
        default:
          return direction * a.created_at.localeCompare(b.created_at);
      }
    });

    return result;
  }, [customers, filters]);

  const handleSaved = (customer: Customer, mode: "create" | "edit") => {
    setCustomers((previous) =>
      mode === "create"
        ? [customer, ...previous]
        : previous.map((item) => (item.id === customer.id ? customer : item))
    );
    setFormState({ open: false, customer: null });
  };

  const handleDeleted = (id: string) => {
    setCustomers((previous) => previous.filter((item) => item.id !== id));
    setDeletingCustomer(null);
  };

  const handleToggleActive = async (customer: Customer) => {
    const supabase = createSupabaseBrowserClient();
    try {
      const updated = await toggleCustomerActive(supabase, customer.id, !customer.is_active);
      setCustomers((previous) => previous.map((item) => (item.id === updated.id ? updated : item)));
      toast.success(updated.is_active ? "Client activé." : "Client désactivé.");
    } catch (caughtError) {
      toast.error(
        caughtError instanceof Error ? caughtError.message : "Impossible de mettre à jour le client."
      );
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-5 px-4 py-6 sm:px-6 lg:px-8">
        <Skeleton className="h-8 w-56" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="rounded-2xl border border-slate-200 bg-white p-5">
              <Skeleton className="h-11 w-11 rounded-full" />
              <Skeleton className="mt-4 h-4 w-2/3" />
              <Skeleton className="mt-2 h-3 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <p className="rounded-2xl border border-red-100 bg-red-50 p-6 text-[13.5px] text-red-600">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-slate-900">Clients</h1>
          <p className="mt-1 text-[13.5px] text-slate-500">
            Le CRM fidélité de {merchant?.business_name}.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <ExportCustomers customers={filteredCustomers} />
          <button
            type="button"
            onClick={() => setIsImportOpen(true)}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-[13px] font-medium text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50"
          >
            <Upload className="h-4 w-4" /> Importer
          </button>
          <button
            type="button"
            onClick={() => setFormState({ open: true, customer: null })}
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-slate-900 px-5 py-2.5 text-[13.5px] font-medium text-white shadow-md shadow-slate-900/15 transition-transform hover:-translate-y-0.5"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-indigo-600 to-blue-500 transition-transform duration-300 group-hover:translate-x-0" />
            <span className="relative flex items-center gap-2">
              <Plus className="h-4 w-4" /> Ajouter un client
            </span>
          </button>
        </div>
      </div>

      <CustomerStats customers={customers} />

      {customers.length === 0 ? (
        <CustomerEmptyState
          icon={Users}
          title="Aucun client pour l'instant"
          description="Ajoutez votre premier client ou importez une liste au format CSV."
          actionLabel="Ajouter un client"
          onAction={() => setFormState({ open: true, customer: null })}
        />
      ) : (
        <>
          <CustomerFilters
            filters={filters}
            onChange={patchFilters}
            onReset={() => setFilters(DEFAULT_CUSTOMER_FILTERS)}
          />

          {filteredCustomers.length === 0 ? (
            <CustomerEmptyState
              icon={Users}
              title="Aucun résultat"
              description="Aucun client ne correspond à ces filtres."
              actionLabel="Réinitialiser les filtres"
              onAction={() => setFilters(DEFAULT_CUSTOMER_FILTERS)}
            />
          ) : (
            <>
              <div className="hidden md:block">
                <CustomerTable
                  customers={filteredCustomers}
                  onEdit={(customer) => setFormState({ open: true, customer })}
                  onDelete={(customer) => setDeletingCustomer(customer)}
                  onToggleActive={handleToggleActive}
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:hidden">
                {filteredCustomers.map((customer) => (
                  <CustomerCard
                    key={customer.id}
                    customer={customer}
                    onEdit={() => setFormState({ open: true, customer })}
                    onDelete={() => setDeletingCustomer(customer)}
                    onToggleActive={() => handleToggleActive(customer)}
                  />
                ))}
              </div>
            </>
          )}
        </>
      )}

      {formState.open && merchant && (
        <CustomerForm
          merchantId={merchant.id}
          customer={formState.customer}
          onClose={() => setFormState({ open: false, customer: null })}
          onSaved={handleSaved}
        />
      )}

      {deletingCustomer && (
        <DeleteCustomerDialog
          customer={deletingCustomer}
          onClose={() => setDeletingCustomer(null)}
          onDeleted={handleDeleted}
        />
      )}

      {isImportOpen && merchant && (
        <ImportCustomers
          merchantId={merchant.id}
          onClose={() => setIsImportOpen(false)}
          onImported={() => {
            setIsImportOpen(false);
            reload();
          }}
        />
      )}
    </div>
  );
}
