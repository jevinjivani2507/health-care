"use client";

import { AnimatedContainer } from "@/components/shared/animated-container";
import { StatsGrid } from "@/components/dashboard/stats-grid";
import { PatientOverviewChart } from "@/components/dashboard/patient-overview-chart";
import { CalendarWidget } from "@/components/dashboard/calendar-widget";
import { PatientTable } from "@/components/dashboard/patient-table";

export default function DashboardPage() {
  return (
    <AnimatedContainer>
      <div className="space-y-6">
        <StatsGrid />
        <div className="flex flex-col lg:flex-row gap-6">
          <PatientOverviewChart />
          <CalendarWidget />
        </div>
        <PatientTable />
      </div>
    </AnimatedContainer>
  );
}
