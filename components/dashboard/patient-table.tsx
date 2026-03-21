"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePatientStore } from "@/stores/patient-store";
import { cn } from "@/lib/utils";
import { Eye } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

const periods = ["Today", "Weekly", "Monthly", "Yearly"] as const;

const statusVariant: Record<string, "default" | "destructive" | "secondary"> = {
  active: "default",
  critical: "destructive",
  inactive: "secondary",
};

export function PatientTable() {
  const [activePeriod, setActivePeriod] = useState<(typeof periods)[number]>("Today");
  const patients = usePatientStore((s) => s.patients);
  const displayedPatients = patients.slice(0, 5);

  return (
    <Card className="flex h-full min-h-0 flex-col">
      <CardHeader className="shrink-0 pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <CardTitle className="text-base font-heading">
              Patient Overview
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">
              Lorem ipsum dolor sit amet consectetur adipiscing elit.
            </p>
          </div>
          <div className="flex items-center border border-border shrink-0">
            {periods.map((period) => (
              <button
                key={period}
                onClick={() => setActivePeriod(period)}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium transition-colors",
                  activePeriod === period
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex min-h-0 flex-1 flex-col">
        <div className="min-h-0 flex-1 overflow-x-auto border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">#</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Date of Birth</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Email address</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead className="w-16">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedPatients.map((patient, i) => {
                const age =
                  new Date().getFullYear() -
                  new Date(patient.dateOfBirth).getFullYear();
                return (
                  <TableRow key={patient.id}>
                    <TableCell className="text-xs text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        <Avatar className="h-7 w-7">
                          <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                            {patient.firstName[0]}
                            {patient.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-xs font-medium">
                            {patient.firstName} {patient.lastName}
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            {patient.diagnosis.length > 20
                              ? patient.diagnosis.slice(0, 20) + "..."
                              : patient.diagnosis}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs">{age}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {new Date(patient.dateOfBirth).toLocaleDateString(
                        "en-US",
                        { day: "numeric", month: "long", year: "numeric" }
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={statusVariant[patient.status]}
                        className="text-[10px]"
                      >
                        {patient.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {patient.email}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {patient.phone}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        render={<Link href={`/patients/${patient.id}`} />}
                        aria-label={`View ${patient.firstName} ${patient.lastName}`}
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
