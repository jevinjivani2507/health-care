"use client";

import { motion } from "motion/react";
import { staggerContainer } from "@/lib/animations";
import { PatientCard } from "./patient-card";
import type { Patient } from "@/types";

export function PatientGrid({ patients }: { patients: Patient[] }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      key="grid"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      {patients.map((patient) => (
        <PatientCard key={patient.id} patient={patient} />
      ))}
    </motion.div>
  );
}
