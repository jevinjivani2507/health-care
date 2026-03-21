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
import { HealthMetricsChart } from "@/components/patients/patient-detail/health-metrics-chart";
import { PatientLabs } from "@/components/patients/patient-detail/patient-labs";
import { RiskForecast } from "@/components/patients/patient-detail/risk-forecast";
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
      className="space-y-4"
    >
      {/* Back + Title */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon-sm"
          render={<Link href="/patients" aria-label="Back to patients" />}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-lg font-heading font-bold">Patient Details</h1>
      </div>

      {/* Tabs across the top */}
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="history">Medical Reports</TabsTrigger>
        </TabsList>

        {/* ── Overview Tab ── */}
        <TabsContent value="overview" className="mt-4 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-4">
            {/* Left column — patient info */}
            <div className="space-y-4">
              <PatientHeader patient={patient} />
              <PatientAppointments appointments={patient.appointments} />
            </div>

            {/* Right column — vitals, chart, labs, risk */}
            <div className="space-y-4">
              <PatientVitals vitals={patient.vitals} />
              <HealthMetricsChart data={patient.healthMetrics} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <PatientLabs labs={patient.labs} />
                <RiskForecast patient={patient} />
              </div>
            </div>
          </div>
        </TabsContent>

        {/* ── Appointments Tab ── */}
        <TabsContent value="appointments" className="mt-4">
          <PatientAppointments appointments={patient.appointments} />
        </TabsContent>

        {/* ── Medical Reports Tab ── */}
        <TabsContent value="history" className="mt-4">
          <PatientHistory history={patient.medicalHistory} />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
