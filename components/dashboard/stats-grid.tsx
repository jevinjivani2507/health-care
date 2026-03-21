"use client";

import { Users, Stethoscope, UserList, Bed } from "@phosphor-icons/react";
import { StatsCard } from "./stats-card";
import { usePatientStore } from "@/stores/patient-store";

export function StatsGrid() {
  const patients = usePatientStore((s) => s.patients);

  return (
    <div className="grid h-full min-h-0 w-full flex-1 grid-cols-2 gap-4 lg:grid-cols-4 lg:grid-rows-1">
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
    </div>
  );
}
