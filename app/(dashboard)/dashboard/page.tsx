"use client";

import { AnimatedContainer } from "@/components/shared/animated-container";
import { StatsGrid } from "@/components/dashboard/stats-grid";
import { PatientOverviewChart } from "@/components/dashboard/patient-overview-chart";
import { CalendarWidget } from "@/components/dashboard/calendar-widget";
import { PatientTable } from "@/components/dashboard/patient-table";
import { motion } from "motion/react";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
  LineChart,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { usePatientStore } from "@/stores/patient-store";

const fadeIn = (delay: number = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.3, delay: delay * 0.1 },
});

// ── Chart configs ──────────────────────────────────────────────────────────

const categoryColors = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

const earningConfig = {
  revenue: { label: "Revenue", color: "var(--chart-2)" },
} satisfies ChartConfig;

const patientLineConfig = {
  existing: { label: "Existing", color: "var(--chart-2)" },
  newPatients: { label: "New", color: "var(--chart-4)" },
} satisfies ChartConfig;

const earningData = [
  { month: "January", revenue: 42000 },
  { month: "February", revenue: 38000 },
  { month: "March", revenue: 45000 },
];

const patientTrendData = [
  { month: "Oct", existing: 8, newPatients: 3 },
  { month: "Nov", existing: 7, newPatients: 4 },
  { month: "Dec", existing: 9, newPatients: 2 },
  { month: "Jan", existing: 6, newPatients: 5 },
  { month: "Feb", existing: 10, newPatients: 3 },
  { month: "Mar", existing: 8, newPatients: 4 },
];

export default function DashboardPage() {
  const patients = usePatientStore((s) => s.patients);

  // Diagnosis category data
  const diagnosisCounts = patients.reduce(
    (acc, p) => {
      const key = p.diagnosis.split(" ")[0];
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );
  const categoryData = Object.entries(diagnosisCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([name, count]) => ({ name, count }));

  const categoryConfig: ChartConfig = Object.fromEntries(
    categoryData.map((d, i) => [
      d.name,
      { label: d.name, color: categoryColors[i] },
    ])
  );

  return (
    <AnimatedContainer>
      <motion.div
        {...fadeIn(0)}
        className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-12 md:items-stretch"
      >
        {/* Row 1: stat cards */}
        <motion.div
          {...fadeIn(0)}
          className="flex min-h-0 w-full min-w-0 flex-col md:col-span-12"
        >
          <StatsGrid />
        </motion.div>

        {/* Row 2: Patient Overview chart + calendar */}
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

        {/* Row 3: 3 chart cards (from analytics) */}
        <motion.div {...fadeIn(2)} className="md:col-span-4">
          <Card className="h-full">
            <CardHeader className="pb-1">
              <CardTitle className="text-sm font-heading">Top Category</CardTitle>
              <p className="text-[10px] text-muted-foreground">Latest 3 months</p>
            </CardHeader>
            <CardContent>
              <ChartContainer config={categoryConfig} className="h-[200px] w-full">
                <BarChart
                  accessibilityLayer
                  data={categoryData}
                  layout="vertical"
                  margin={{ top: 0, right: 5, left: 0, bottom: 0 }}
                >
                  <CartesianGrid horizontal={false} strokeDasharray="3 3" />
                  <XAxis type="number" tickLine={false} axisLine={false} fontSize={10} hide />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tickLine={false}
                    axisLine={false}
                    fontSize={10}
                    width={75}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={14}>
                    {categoryData.map((_, i) => (
                      <Cell key={i} fill={categoryColors[i]} />
                    ))}
                  </Bar>
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div {...fadeIn(2)} className="md:col-span-4">
          <Card className="h-full">
            <CardHeader className="pb-1">
              <CardTitle className="text-sm font-heading">Earning</CardTitle>
              <p className="text-[10px] text-muted-foreground">Latest 3 months</p>
            </CardHeader>
            <CardContent>
              <ChartContainer config={earningConfig} className="h-[200px] w-full">
                <BarChart
                  accessibilityLayer
                  data={earningData}
                  margin={{ top: 5, right: 5, left: -15, bottom: 0 }}
                >
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    fontSize={10}
                    tickFormatter={(v) => v.slice(0, 3)}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    fontSize={10}
                    tickFormatter={(v) => `${v / 1000}k`}
                  />
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                    formatter={(value) => [`$${Number(value).toLocaleString()}`, "Revenue"]}
                  />
                  <Bar
                    dataKey="revenue"
                    fill="var(--color-revenue)"
                    radius={[4, 4, 0, 0]}
                    barSize={28}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div {...fadeIn(2)} className="md:col-span-4">
          <Card className="h-full">
            <CardHeader className="pb-1">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-heading">Patient</CardTitle>
                  <p className="text-[10px] text-muted-foreground">New vs Existing</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ChartContainer config={patientLineConfig} className="h-[200px] w-full">
                <LineChart
                  accessibilityLayer
                  data={patientTrendData}
                  margin={{ top: 5, right: 5, left: -15, bottom: 0 }}
                >
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={10} />
                  <YAxis tickLine={false} axisLine={false} fontSize={10} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Line
                    dataKey="existing"
                    type="monotone"
                    stroke="var(--color-existing)"
                    strokeWidth={2}
                    dot={{ r: 3, fill: "var(--color-existing)" }}
                  />
                  <Line
                    dataKey="newPatients"
                    type="monotone"
                    stroke="var(--color-newPatients)"
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    dot={{ r: 3, fill: "var(--color-newPatients)" }}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Row 4: full-width patient table */}
        <motion.div
          {...fadeIn(3)}
          className="flex min-h-0 w-full min-w-0 flex-col md:col-span-12"
        >
          <PatientTable />
        </motion.div>
      </motion.div>
    </AnimatedContainer>
  );
}
