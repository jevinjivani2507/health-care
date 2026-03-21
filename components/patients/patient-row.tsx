"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { TableCell, TableRow } from "@/components/ui/table";
import type { Patient } from "@/types";

const statusVariant: Record<string, "default" | "destructive" | "secondary"> = {
  active: "default",
  critical: "destructive",
  inactive: "secondary",
};

export function PatientRow({ patient }: { patient: Patient }) {
  const age = new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear();

  return (
    <TableRow className="cursor-pointer hover:bg-muted/50">
      <TableCell>
        <Link href={`/patients/${patient.id}`} className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-xs bg-primary/10 text-primary">
              {patient.firstName[0]}
              {patient.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <span className="font-medium text-sm">
            {patient.firstName} {patient.lastName}
          </span>
        </Link>
      </TableCell>
      <TableCell className="text-sm">{patient.diagnosis}</TableCell>
      <TableCell>
        <Badge variant={statusVariant[patient.status]} className="text-[10px]">
          {patient.status}
        </Badge>
      </TableCell>
      <TableCell className="text-sm text-muted-foreground">
        {age} / {patient.gender}
      </TableCell>
      <TableCell className="text-sm text-muted-foreground">
        {patient.phone}
      </TableCell>
    </TableRow>
  );
}
