import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useShallow } from "zustand/shallow";
import type { Patient, PatientFilters, ViewMode } from "@/types";
import { mockPatients } from "@/data/mock-patients";

interface PatientState {
  patients: Patient[];
  viewMode: ViewMode;
  filters: PatientFilters;
  toggleViewMode: () => void;
  setViewMode: (mode: ViewMode) => void;
  setSearchQuery: (query: string) => void;
  setStatusFilter: (status: PatientFilters["status"]) => void;
  addPatient: (patient: Patient) => void;
}

export const usePatientStore = create<PatientState>()(
  persist(
    (set) => ({
      patients: mockPatients,
      viewMode: "grid",
      filters: { status: "all", searchQuery: "" },
      toggleViewMode: () =>
        set((state) => ({
          viewMode: state.viewMode === "grid" ? "list" : "grid",
        })),
      setViewMode: (mode) => set({ viewMode: mode }),
      setSearchQuery: (searchQuery) =>
        set((state) => ({ filters: { ...state.filters, searchQuery } })),
      setStatusFilter: (status) =>
        set((state) => ({ filters: { ...state.filters, status } })),
      addPatient: (patient) =>
        set((state) => ({ patients: [patient, ...state.patients] })),
    }),
    {
      name: "patient-store",
      partialize: (state) => ({ viewMode: state.viewMode }),
    }
  )
);

export function useFilteredPatients() {
  const patients = usePatientStore((s) => s.patients);
  const filters = usePatientStore(useShallow((s) => s.filters));

  return patients.filter((p) => {
    const matchesStatus =
      filters.status === "all" || p.status === filters.status;
    const query = filters.searchQuery.toLowerCase();
    const matchesSearch =
      !query ||
      `${p.firstName} ${p.lastName}`.toLowerCase().includes(query) ||
      p.diagnosis.toLowerCase().includes(query) ||
      p.email.toLowerCase().includes(query);
    return matchesStatus && matchesSearch;
  });
}
