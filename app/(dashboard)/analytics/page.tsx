"use client";

import { motion } from "motion/react";
import { AnimatedContainer } from "@/components/shared/animated-container";
import { PageHeader } from "@/components/shared/page-header";
import { MetricCard } from "@/components/analytics/metric-card";
import {
  StatusPieChart,
  VerticalBarChart,
  HorizontalBarChart,
  AgeRadarChart,
  InsuranceRadialChart,
  MonthlyAreaChart,
} from "@/components/analytics/chart-placeholder";
import { staggerContainer } from "@/lib/animations";
import { usePatientStore } from "@/stores/patient-store";
import type { ChartConfig } from "@/components/ui/chart";

export default function AnalyticsPage() {
  const patients = usePatientStore((s) => s.patients);
  const active = patients.filter((p) => p.status === "active").length;
  const critical = patients.filter((p) => p.status === "critical").length;
  const inactive = patients.filter((p) => p.status === "inactive").length;

  // Gender data
  const genderCounts = patients.reduce(
    (acc, p) => {
      acc[p.gender] = (acc[p.gender] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );
  const genderData = Object.entries(genderCounts).map(([name, count]) => ({
    name,
    count,
  }));
  const genderConfig: ChartConfig = Object.fromEntries(
    genderData.map((d, i) => [
      d.name,
      { label: d.name, color: `var(--chart-${(i % 5) + 1})` },
    ])
  );

  // Diagnoses data
  const diagnosisCounts = patients.reduce(
    (acc, p) => {
      const key = p.diagnosis.split(" ")[0];
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );
  const diagnosisData = Object.entries(diagnosisCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([name, count]) => ({ name, count }));
  const diagnosisConfig: ChartConfig = Object.fromEntries(
    diagnosisData.map((d, i) => [
      d.name,
      { label: d.name, color: `var(--chart-${(i % 5) + 1})` },
    ])
  );

  // Age distribution
  const now = new Date().getFullYear();
  const ageGroups = patients.reduce(
    (acc, p) => {
      const age = now - new Date(p.dateOfBirth).getFullYear();
      if (age < 40) acc["<40"] = (acc["<40"] || 0) + 1;
      else if (age < 55) acc["40-54"] = (acc["40-54"] || 0) + 1;
      else if (age < 70) acc["55-69"] = (acc["55-69"] || 0) + 1;
      else acc["70+"] = (acc["70+"] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );
  const ageData = Object.entries(ageGroups).map(([group, count]) => ({
    group,
    count,
  }));

  // Insurance data
  const insuranceCounts = patients.reduce(
    (acc, p) => {
      acc[p.insuranceProvider] = (acc[p.insuranceProvider] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );
  const insuranceData = Object.entries(insuranceCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([name, count], i) => ({
      name,
      count,
      fill: `var(--chart-${(i % 5) + 1})`,
    }));

  // Monthly trend data
  const monthlyData = [
    { month: "Oct", visits: 24, admissions: 8 },
    { month: "Nov", visits: 31, admissions: 12 },
    { month: "Dec", visits: 18, admissions: 6 },
    { month: "Jan", visits: 28, admissions: 10 },
    { month: "Feb", visits: 35, admissions: 14 },
    { month: "Mar", visits: 22, admissions: 9 },
  ];

  return (
    <AnimatedContainer>
      <div className="space-y-6">
        <PageHeader
          title="Analytics"
          description="Insights into your patient population"
        />

        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <MetricCard title="Patient Status Distribution">
            <StatusPieChart
              data={[
                { name: "active", value: active, color: "var(--chart-2)" },
                { name: "critical", value: critical, color: "var(--chart-1)" },
                { name: "inactive", value: inactive, color: "var(--chart-5)" },
              ]}
            />
          </MetricCard>

          <MetricCard title="Gender Demographics">
            <VerticalBarChart data={genderData} config={genderConfig} />
          </MetricCard>

          <MetricCard title="Top Diagnoses">
            <HorizontalBarChart data={diagnosisData} config={diagnosisConfig} />
          </MetricCard>

          <MetricCard title="Age Distribution">
            <AgeRadarChart data={ageData} />
          </MetricCard>

          <MetricCard title="Insurance Providers">
            <InsuranceRadialChart data={insuranceData} />
          </MetricCard>

          <MetricCard title="Monthly Visit Trend">
            <MonthlyAreaChart data={monthlyData} />
          </MetricCard>
        </motion.div>
      </div>
    </AnimatedContainer>
  );
}
