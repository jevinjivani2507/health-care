"use client";

import { motion } from "motion/react";
import {
  Users,
  Stethoscope,
  UserList,
  Bed,
} from "@phosphor-icons/react";
import { staggerContainer } from "@/lib/animations";
import { StatsCard } from "./stats-card";
import { usePatientStore } from "@/stores/patient-store";

export function StatsGrid() {
  const patients = usePatientStore((s) => s.patients);
  const active = patients.filter((p) => p.status === "active").length;
  const critical = patients.filter((p) => p.status === "critical").length;

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="grid grid-cols-2 lg:grid-cols-4 gap-4"
    >
      <StatsCard
        title="Visitors"
        value={4592}
        icon={Users}
        trend="+15.8%"
        description="Stay informed with real-time data to enhance patient care and visitor management."
      />
      <StatsCard
        title="Doctors"
        value={260}
        icon={Stethoscope}
        trend="+15.3%"
        description="Stay updated with essential details on the medical team for effective support and management."
        highlighted
      />
      <StatsCard
        title="Patient"
        value={patients.length > 0 ? 540 : 0}
        icon={UserList}
        trend="+15.8%"
        description="Keep track of patient information at a glance, with easy access to key details for personalised care."
      />
      <StatsCard
        title="Total Bed"
        value={1205}
        icon={Bed}
        description="Available"
      />
    </motion.div>
  );
}
