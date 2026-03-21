"use client";

import { MagnifyingGlass } from "@phosphor-icons/react";
import { Input } from "@/components/ui/input";
import { usePatientStore } from "@/stores/patient-store";
import type { PatientStatus } from "@/types";

export function PatientFilters() {
  const { filters, setSearchQuery, setStatusFilter } = usePatientStore();

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search patients..."
          value={filters.searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>
      <select
        value={filters.status}
        onChange={(e) => setStatusFilter(e.target.value as PatientStatus | "all")}
        className="h-9 px-3 text-sm border border-input bg-background text-foreground outline-none focus:ring-2 focus:ring-ring"
        aria-label="Filter by status"
      >
        <option value="all">All statuses</option>
        <option value="active">Active</option>
        <option value="critical">Critical</option>
        <option value="inactive">Inactive</option>
      </select>
    </div>
  );
}
