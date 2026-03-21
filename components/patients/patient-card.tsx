"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { staggerItem, hoverScale } from "@/lib/animations";
import type { Patient } from "@/types";

const statusVariant: Record<string, "default" | "destructive" | "secondary"> = {
  active: "default",
  critical: "destructive",
  inactive: "secondary",
};

export function PatientCard({ patient }: { patient: Patient }) {
  return (
    <motion.div variants={staggerItem} {...hoverScale}>
      <Link href={`/patients/${patient.id}`}>
        <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-start justify-between">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary/10 text-primary text-sm">
                  {patient.firstName[0]}
                  {patient.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <Badge variant={statusVariant[patient.status]} className="text-[10px]">
                {patient.status}
              </Badge>
            </div>
            <div>
              <p className="text-sm font-medium">
                {patient.firstName} {patient.lastName}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {patient.diagnosis}
              </p>
            </div>
            <div className="flex items-center justify-between text-[10px] text-muted-foreground">
              <span>{patient.gender}, {new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear()} yrs</span>
              <span>{patient.insuranceProvider}</span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
