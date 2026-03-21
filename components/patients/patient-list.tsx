"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PatientRow } from "./patient-row";
import type { Patient } from "@/types";

export function PatientList({ patients }: { patients: Patient[] }) {
  return (
    <div className="border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Diagnosis</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Age / Gender</TableHead>
            <TableHead>Phone</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.map((patient) => (
            <PatientRow key={patient.id} patient={patient} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
