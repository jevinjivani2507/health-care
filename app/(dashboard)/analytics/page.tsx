"use client";

import { motion } from "motion/react";
import { AnimatedContainer } from "@/components/shared/animated-container";
import { PageHeader } from "@/components/shared/page-header";
import { MetricCard } from "@/components/analytics/metric-card";
import { BarChart, DonutIndicator } from "@/components/analytics/chart-placeholder";
import { staggerContainer } from "@/lib/animations";
import { usePatientStore } from "@/stores/patient-store";

export default function AnalyticsPage() {
  const patients = usePatientStore((s) => s.patients);
  const active = patients.filter((p) => p.status === "active").length;
  const critical = patients.filter((p) => p.status === "critical").length;
  const inactive = patients.filter((p) => p.status === "inactive").length;

  const genderCounts = patients.reduce(
    (acc, p) => {
      acc[p.gender] = (acc[p.gender] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  // Group diagnoses
  const diagnosisCounts = patients.reduce(
    (acc, p) => {
      const key = p.diagnosis.split(" ")[0]; // first word
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );
  const topDiagnoses = Object.entries(diagnosisCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

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
            <DonutIndicator
              segments={[
                { label: "Active", value: active, colorVar: "--chart-2" },
                { label: "Critical", value: critical, colorVar: "--chart-1" },
                { label: "Inactive", value: inactive, colorVar: "--chart-5" },
              ]}
            />
          </MetricCard>

          <MetricCard title="Gender Demographics">
            <BarChart
              data={Object.entries(genderCounts).map(([label, value], i) => ({
                label,
                value,
                colorVar: `--chart-${(i % 5) + 1}`,
              }))}
            />
          </MetricCard>

          <MetricCard title="Top Diagnoses">
            <BarChart
              data={topDiagnoses.map(([label, value], i) => ({
                label,
                value,
                colorVar: `--chart-${(i % 5) + 1}`,
              }))}
            />
          </MetricCard>

          <MetricCard title="Age Distribution">
            <BarChart
              data={Object.entries(ageGroups).map(([label, value], i) => ({
                label,
                value,
                colorVar: `--chart-${(i % 5) + 1}`,
              }))}
            />
          </MetricCard>

          <MetricCard title="Insurance Providers">
            <BarChart
              data={(() => {
                const counts = patients.reduce(
                  (acc, p) => {
                    acc[p.insuranceProvider] =
                      (acc[p.insuranceProvider] || 0) + 1;
                    return acc;
                  },
                  {} as Record<string, number>
                );
                return Object.entries(counts)
                  .sort(([, a], [, b]) => b - a)
                  .slice(0, 5)
                  .map(([label, value], i) => ({
                    label,
                    value,
                    colorVar: `--chart-${(i % 5) + 1}`,
                  }));
              })()}
            />
          </MetricCard>

          <MetricCard title="Monthly Visit Trend">
            <BarChart
              data={[
                { label: "Oct", value: 24, colorVar: "--chart-3" },
                { label: "Nov", value: 31, colorVar: "--chart-3" },
                { label: "Dec", value: 18, colorVar: "--chart-3" },
                { label: "Jan", value: 28, colorVar: "--chart-3" },
                { label: "Feb", value: 35, colorVar: "--chart-3" },
                { label: "Mar", value: 22, colorVar: "--chart-3" },
              ]}
            />
          </MetricCard>
        </motion.div>
      </div>
    </AnimatedContainer>
  );
}
