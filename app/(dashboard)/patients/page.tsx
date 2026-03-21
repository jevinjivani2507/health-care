"use client";

import { AnimatedContainer } from "@/components/shared/animated-container";
import { PageHeader } from "@/components/shared/page-header";
import { PatientViewToggle } from "@/components/patients/patient-view-toggle";
import { PatientFilters } from "@/components/patients/patient-filters";
import { PatientGrid } from "@/components/patients/patient-grid";
import { PatientList } from "@/components/patients/patient-list";
import { usePatientStore, useFilteredPatients } from "@/stores/patient-store";
import { useNotifications } from "@/hooks/use-notifications";
import { Button } from "@/components/ui/button";
import { Plus } from "@phosphor-icons/react";

export default function PatientsPage() {
  const viewMode = usePatientStore((s) => s.viewMode);
  const filteredPatients = useFilteredPatients();
  const { sendLocalNotification, requestPermission } = useNotifications();

  const handleAddPatient = async () => {
    await requestPermission();
    sendLocalNotification(
      "New Patient Added",
      "New patient Sarah Johnson has been added to the system.",
      "patient-alert"
    );
  };

  return (
    <AnimatedContainer>
      <div className="space-y-6">
        <PageHeader
          title="Patients"
          description={`${filteredPatients.length} patients found`}
          action={
            <div className="flex items-center gap-3">
              <PatientViewToggle />
              <Button size="sm" onClick={handleAddPatient}>
                <Plus className="h-4 w-4 mr-1" />
                Add Patient
              </Button>
            </div>
          }
        />
        <PatientFilters />
        {filteredPatients.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-sm">No patients match your filters.</p>
          </div>
        ) : viewMode === "grid" ? (
          <PatientGrid patients={filteredPatients} />
        ) : (
          <PatientList patients={filteredPatients} />
        )}
      </div>
    </AnimatedContainer>
  );
}
