"use client";

import { AnimatedContainer } from "@/components/shared/animated-container";
import { StatsGrid } from "@/components/dashboard/stats-grid";
import { PatientOverviewChart } from "@/components/dashboard/patient-overview-chart";
import { CalendarWidget } from "@/components/dashboard/calendar-widget";
import { PatientTable } from "@/components/dashboard/patient-table";
import { motion } from "motion/react";
// import { fadeIn } from "@/lib/animations-utils";

export const fadeIn = (delay: number = 0) => {
  return {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.3, delay: delay * 0.1 },
  };
};

export default function DashboardPage() {
  return (
    <AnimatedContainer>
      <motion.div
        {...fadeIn(0)}
        className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-12 md:items-stretch"
      >
        {/* Row 1: all stat cards */}
        <motion.div
          {...fadeIn(0)}
          className="flex min-h-0 w-full min-w-0 flex-col md:col-span-12"
        >
          <StatsGrid />
        </motion.div>
        {/* Row 2: chart (~2/3) + calendar (~1/3) */}
        <motion.div
          {...fadeIn(1)}
          className="flex h-full min-h-0 w-full min-w-0 flex-col md:col-span-8"
        >
          <PatientOverviewChart />
        </motion.div>
        <motion.div
          {...fadeIn(1)}
          className="flex h-full min-h-0 w-full min-w-0 flex-col md:col-span-4"
        >
          <CalendarWidget />
        </motion.div>
        {/* Row 3: full-width table */}
        <motion.div
          {...fadeIn(2)}
          className="flex min-h-0 w-full min-w-0 flex-col md:col-span-12"
        >
          <PatientTable />
        </motion.div>
      </motion.div>
    </AnimatedContainer>
  );
}
