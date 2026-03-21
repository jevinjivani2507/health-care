"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { usePatientStore } from "@/stores/patient-store";
import { cn } from "@/lib/utils";

const statusVariant: Record<string, "default" | "destructive" | "secondary"> = {
  active: "default",
  critical: "destructive",
  inactive: "secondary",
};

export function RecentPatients() {
  const patients = usePatientStore((s) => s.patients);
  const recent = patients.slice(0, 5);

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-heading">Recent Patients</CardTitle>
          <Link
            href="/patients"
            className="text-xs text-primary hover:underline"
          >
            View all
          </Link>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {recent.map((patient) => (
          <Link
            key={patient.id}
            href={`/patients/${patient.id}`}
            className="flex items-center gap-3 p-2 hover:bg-muted/50 transition-colors -mx-2"
          >
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-xs bg-primary/10 text-primary">
                {patient.firstName[0]}
                {patient.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {patient.firstName} {patient.lastName}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {patient.diagnosis}
              </p>
            </div>
            <Badge variant={statusVariant[patient.status]} className="text-[10px]">
              {patient.status}
            </Badge>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
