"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Envelope,
  Phone,
  ShieldCheck,
  Stethoscope,
  Calendar,
  Warning,
} from "@phosphor-icons/react";
import type { Patient } from "@/types";
import { cn } from "@/lib/utils";

const statusVariant: Record<string, "default" | "destructive" | "secondary"> = {
  active: "default",
  critical: "destructive",
  inactive: "secondary",
};

export function PatientHeader({ patient }: { patient: Patient }) {
  const age =
    new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear();
  const physician =
    patient.medicalHistory[0]?.physician ?? "Not assigned";

  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        {/* Identity */}
        <div className="flex items-start gap-3">
          <Avatar className="h-14 w-14">
            <AvatarFallback className="text-lg bg-primary/10 text-primary font-heading">
              {patient.firstName[0]}
              {patient.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-base font-heading font-bold">
                {patient.firstName} {patient.lastName}
              </h2>
              <Badge variant={statusVariant[patient.status]} className="text-[10px]">
                {patient.status}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              {patient.gender}, {age} yrs &middot;{" "}
              {new Date(patient.dateOfBirth).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <Envelope className="h-3 w-3" /> {patient.email}
              </span>
              <span className="flex items-center gap-1">
                <Phone className="h-3 w-3" /> {patient.phone}
              </span>
            </div>
          </div>
        </div>

        {/* Physician & Insurance */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Stethoscope className="h-4 w-4 text-primary shrink-0" />
            <div>
              <p className="text-muted-foreground text-[10px]">Primary Physician</p>
              <p className="font-medium">{physician}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
            <div>
              <p className="text-muted-foreground text-[10px]">Insurance</p>
              <p className="font-medium">{patient.insuranceProvider}</p>
            </div>
          </div>
        </div>

        {/* Allergies */}
        <div>
          <div className="flex items-center gap-1.5 mb-1.5">
            <Warning className="h-3.5 w-3.5 text-destructive" />
            <span className="text-xs font-medium">Allergies</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {patient.allergies.map((a) => (
              <Badge
                key={a}
                variant={a === "None known" ? "secondary" : "outline"}
                className="text-[10px]"
              >
                {a}
              </Badge>
            ))}
          </div>
        </div>

        {/* Latest Problems */}
        <div>
          <p className="text-xs font-medium mb-1.5">Latest Problems</p>
          <div className="space-y-1">
            {patient.medicalHistory.slice(0, 3).map((entry) => (
              <div
                key={entry.id}
                className="flex items-center justify-between text-xs py-1 border-b border-border last:border-0"
              >
                <span className="text-muted-foreground">{entry.diagnosis}</span>
                <span className="text-[10px] text-muted-foreground/70">
                  {new Date(entry.date).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
