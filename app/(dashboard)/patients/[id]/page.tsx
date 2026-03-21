"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { fadeInUp } from "@/lib/animations";
import { PatientHeader } from "@/components/patients/patient-detail/patient-header";
import { PatientVitals } from "@/components/patients/patient-detail/patient-vitals";
import { PatientHistory } from "@/components/patients/patient-detail/patient-history";
import { PatientAppointments } from "@/components/patients/patient-detail/patient-appointments";
import { usePatientStore } from "@/stores/patient-store";

export default function PatientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const patients = usePatientStore((s) => s.patients);
  const patient = patients.find((p) => p.id === id);

  if (!patient) {
    notFound();
  }

  return (
    <motion.div
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      className="space-y-6"
    >
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon-sm" render={<Link href="/patients" aria-label="Back to patients" />}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <span className="text-sm text-muted-foreground">Back to patients</span>
      </div>

      <PatientHeader patient={patient} />

      <Tabs defaultValue="vitals">
        <TabsList>
          <TabsTrigger value="vitals">Vitals</TabsTrigger>
          <TabsTrigger value="history">Medical History</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
        </TabsList>
        <TabsContent value="vitals" className="mt-4">
          <PatientVitals vitals={patient.vitals} />
        </TabsContent>
        <TabsContent value="history" className="mt-4">
          <PatientHistory history={patient.medicalHistory} />
        </TabsContent>
        <TabsContent value="appointments" className="mt-4">
          <PatientAppointments appointments={patient.appointments} />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
