"use client";

import { motion } from "motion/react";
import { Users, UserCheck, Warning, CalendarCheck } from "@phosphor-icons/react";
import { staggerContainer } from "@/lib/animations";
import { StatsCard } from "./stats-card";
import { usePatientStore } from "@/stores/patient-store";

export function StatsGrid() {
  const patients = usePatientStore((s) => s.patients);
  const active = patients.filter((p) => p.status === "active").length;
  const critical = patients.filter((p) => p.status === "critical").length;
  const todayAppointments = patients.reduce((count, p) => {
    const today = new Date().toISOString().split("T")[0];
    return count + p.appointments.filter((a) => a.date === today && a.status === "scheduled").length;
  }, 0);

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="grid grid-cols-2 lg:grid-cols-4 gap-4"
    >
      <StatsCard
        title="Total Patients"
        value={patients.length}
        icon={Users}
        trend={`${active} active`}
      />
      <StatsCard
        title="Active"
        value={active}
        icon={UserCheck}
        variant="primary"
        trend="Currently under care"
      />
      <StatsCard
        title="Critical"
        value={critical}
        icon={Warning}
        variant="destructive"
        trend="Require attention"
      />
      <StatsCard
        title="Today's Appts"
        value={todayAppointments}
        icon={CalendarCheck}
        variant="success"
        trend="Scheduled for today"
      />
    </motion.div>
  );
}
