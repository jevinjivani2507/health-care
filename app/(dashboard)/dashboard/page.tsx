"use client";

import { AnimatedContainer } from "@/components/shared/animated-container";
import { PageHeader } from "@/components/shared/page-header";
import { StatsGrid } from "@/components/dashboard/stats-grid";
import { RecentPatients } from "@/components/dashboard/recent-patients";
import { ActivityFeed } from "@/components/dashboard/activity-feed";

export default function DashboardPage() {
  return (
    <AnimatedContainer>
      <div className="space-y-6">
        <PageHeader
          title="Dashboard"
          description="Overview of your healthcare practice"
        />
        <StatsGrid />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentPatients />
          <ActivityFeed />
        </div>
      </div>
    </AnimatedContainer>
  );
}
