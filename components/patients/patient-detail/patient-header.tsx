"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Envelope, Phone, MapPin } from "@phosphor-icons/react";
import type { Patient } from "@/types";

const statusVariant: Record<string, "default" | "destructive" | "secondary"> = {
  active: "default",
  critical: "destructive",
  inactive: "secondary",
};

export function PatientHeader({ patient }: { patient: Patient }) {
  return (
    <div className="flex flex-col sm:flex-row items-start gap-4">
      <Avatar className="h-16 w-16">
        <AvatarFallback className="text-xl bg-primary/10 text-primary">
          {patient.firstName[0]}
          {patient.lastName[0]}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-2xl font-heading font-bold">
            {patient.firstName} {patient.lastName}
          </h1>
          <Badge variant={statusVariant[patient.status]}>{patient.status}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">{patient.diagnosis}</p>
        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mt-2">
          <span className="flex items-center gap-1">
            <Envelope className="h-3.5 w-3.5" />
            {patient.email}
          </span>
          <span className="flex items-center gap-1">
            <Phone className="h-3.5 w-3.5" />
            {patient.phone}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {patient.address}
          </span>
        </div>
      </div>
    </div>
  );
}
