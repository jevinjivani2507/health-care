"use client";

import { motion } from "motion/react";
import {
  Users,
  Smiley,
  Stethoscope,
  CurrencyDollar,
  TrendUp,
  MagnifyingGlass,
} from "@phosphor-icons/react";
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
import { AnimatedContainer } from "@/components/shared/animated-container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { usePatientStore } from "@/stores/patient-store";
import { cn } from "@/lib/utils";
import type { Icon } from "@phosphor-icons/react";

// ── Stat card ───────────────────────────────────────────────────────────────

interface StatCardProps {
  title: string;
  value: string;
  badge: string;
  subtitle: string;
  icon: Icon;
}

function StatCard({ title, value, badge, subtitle, icon: IconComp }: StatCardProps) {
  return (
    <motion.div variants={staggerItem}>
      <Card>
        <CardContent className="p-4 space-y-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <IconComp className="h-4 w-4" />
            <span className="text-xs font-medium">{title}</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-heading font-bold tracking-tight">
              {value}
            </span>
            <Badge variant="default" className="text-[10px] gap-0.5">
              <TrendUp className="h-2.5 w-2.5" />
              {badge}
            </Badge>
          </div>
          <p className="text-[11px] text-muted-foreground">{subtitle}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ── Chart configs ───────────────────────────────────────────────────────────

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

// ── Appointment status badge ────────────────────────────────────────────────

const statusColors: Record<string, "default" | "secondary" | "destructive"> = {
  scheduled: "default",
  completed: "secondary",
  cancelled: "destructive",
};

// ── Page ────────────────────────────────────────────────────────────────────

export default function AnalyticsPage() {
  const patients = usePatientStore((s) => s.patients);

  // Top category data — diagnosis categories
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

  // Earning data (monthly revenue mock)
  const earningData = [
    { month: "January", revenue: 42000 },
    { month: "February", revenue: 38000 },
    { month: "March", revenue: 45000 },
  ];

  // Patient trend data (new vs existing)
  const patientTrendData = [
    { month: "Oct", existing: 8, newPatients: 3 },
    { month: "Nov", existing: 7, newPatients: 4 },
    { month: "Dec", existing: 9, newPatients: 2 },
    { month: "Jan", existing: 6, newPatients: 5 },
    { month: "Feb", existing: 10, newPatients: 3 },
    { month: "Mar", existing: 8, newPatients: 4 },
  ];

  // Upcoming appointments — flatten from patients
  const upcomingAppointments = patients
    .flatMap((p) =>
      p.appointments
        .filter((a) => a.status === "scheduled")
        .map((a) => ({
          ...a,
          patientName: `${p.firstName} ${p.lastName}`,
          patientInitials: `${p.firstName[0]}${p.lastName[0]}`,
        }))
    )
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 5);

  return (
    <AnimatedContainer>
      <div className="space-y-6">
        {/* Stat cards row */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <StatCard
            title="Total Patients"
            value={patients.length.toLocaleString()}
            badge="+4.6%"
            subtitle="From last month"
            icon={Users}
          />
          <StatCard
            title="Satisfaction Rate"
            value="85%"
            badge="+2.1%"
            subtitle="From last month"
            icon={Smiley}
          />
          <StatCard
            title="Total Staff"
            value="139"
            badge="+4.6%"
            subtitle="From last month"
            icon={Stethoscope}
          />
          <StatCard
            title="Total Earning"
            value="$12M"
            badge="+8.2%"
            subtitle="From last month"
            icon={CurrencyDollar}
          />
        </motion.div>

        {/* Charts row — 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Top Category — horizontal bar */}
          <Card>
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

          {/* Earning — vertical bar */}
          <Card>
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

          {/* Patient — line chart new vs existing */}
          <Card>
            <CardHeader className="pb-1">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-heading">Patient</CardTitle>
                  <p className="text-[10px] text-muted-foreground">
                    New vs Existing
                  </p>
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
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    fontSize={10}
                  />
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
        </div>

        {/* Bottom row — Appointments table + Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">
          {/* Upcoming Appointments */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <CardTitle className="text-sm font-heading">
                  Upcoming Appointments
                </CardTitle>
                <div className="relative w-full sm:w-48">
                  <MagnifyingGlass className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    placeholder="Search..."
                    className="pl-8 h-7 text-xs"
                    readOnly
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border border-border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-[10px]">NAME</TableHead>
                      <TableHead className="text-[10px]">DOCTOR</TableHead>
                      <TableHead className="text-[10px]">DATE & TIME</TableHead>
                      <TableHead className="text-[10px]">TYPE</TableHead>
                      <TableHead className="text-[10px]">STATUS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {upcomingAppointments.map((appt) => (
                      <TableRow key={appt.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="text-[9px] bg-primary/10 text-primary">
                                {appt.patientInitials}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-xs font-medium">
                              {appt.patientName}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {appt.physician}
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {new Date(appt.date).toLocaleDateString("en-US", {
                            month: "2-digit",
                            day: "2-digit",
                            year: "numeric",
                          })}{" "}
                          {appt.time}
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {appt.type.toLowerCase()}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={statusColors[appt.status]}
                            className="text-[10px]"
                          >
                            {appt.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                    {upcomingAppointments.length === 0 && (
                      <TableRow>
                        <TableCell
                          colSpan={5}
                          className="text-center text-xs text-muted-foreground py-8"
                        >
                          No upcoming appointments
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Recent Messages / Activity */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-heading">Messages</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                {
                  name: "Dr. Jane Doe",
                  message: "Got it, thanks. I'll review the patient list.",
                  time: "09:52 AM",
                  initials: "JD",
                },
                {
                  name: "Dr. Smith Morrison",
                  message: "On my way. Please prepare the latest vitals.",
                  time: "09:41 AM",
                  initials: "SM",
                },
                {
                  name: "Dr. Emily Hudson",
                  message:
                    "Thank you. I'll check and update the treatment plan.",
                  time: "09:32 AM",
                  initials: "EH",
                },
                {
                  name: "Dr. Alex Nguyen",
                  message: "Lab results are in. Let's discuss at rounds.",
                  time: "09:15 AM",
                  initials: "AN",
                },
              ].map((msg) => (
                <div
                  key={msg.name}
                  className="flex items-start gap-2.5 pb-3 border-b border-border last:border-0 last:pb-0"
                >
                  <Avatar className="h-7 w-7 shrink-0">
                    <AvatarFallback className="text-[9px] bg-primary/10 text-primary">
                      {msg.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium">{msg.name}</span>
                      <span className="text-[10px] text-muted-foreground shrink-0">
                        {msg.time}
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2">
                      {msg.message}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </AnimatedContainer>
  );
}
