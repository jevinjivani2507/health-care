"use client";

import { useState, useMemo } from "react";
import { motion } from "motion/react";
import {
  TrendUp,
  ArrowRight,
  FilePdf,
  FileCsv,
  Circle,
} from "@phosphor-icons/react";
import {
  Line,
  LineChart,
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";
import { AnimatedContainer } from "@/components/shared/animated-container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { cn } from "@/lib/utils";

// ── Stat card ──────────────────────────────────────────────────────────────

interface StatCardProps {
  label: string;
  value: string;
  trend: string;
  trendUp: boolean;
}

function StatCard({ label, value, trend, trendUp }: StatCardProps) {
  return (
    <motion.div variants={staggerItem}>
      <Card>
        <CardContent className="p-4 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
              {label}
            </span>
            <TrendUp className="h-3 w-3 text-muted-foreground/50" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-heading font-bold tracking-tight">
              {value}
            </span>
            <span
              className={cn(
                "text-[10px] font-medium",
                trendUp ? "text-chart-2" : "text-destructive"
              )}
            >
              {trend}
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ── Chart configs ──────────────────────────────────────────────────────────

const deptEfficiencyConfig = {
  occupancy: { label: "Occupancy", color: "var(--chart-4)" },
  discharges: { label: "Discharges", color: "var(--chart-2)" },
} satisfies ChartConfig;

const recoveryConfig = {
  rate: { label: "Recovery Rate", color: "var(--chart-2)" },
} satisfies ChartConfig;

const workloadConfig = {
  cardiology: { label: "Cardiology", color: "var(--chart-4)" },
  neurology: { label: "Neurology", color: "var(--chart-3)" },
  pediatrics: { label: "Pediatrics", color: "var(--chart-2)" },
  emergency: { label: "Emergency", color: "var(--chart-1)" },
} satisfies ChartConfig;

// ── Raw mock data ──────────────────────────────────────────────────────────

const allDeptEfficiencyData: Record<string, { day: string; occupancy: number; discharges: number }[]> = {
  all: [
    { day: "MON", occupancy: 72, discharges: 18 },
    { day: "TUE", occupancy: 68, discharges: 22 },
    { day: "WED", occupancy: 75, discharges: 15 },
    { day: "THU", occupancy: 80, discharges: 20 },
    { day: "FRI", occupancy: 78, discharges: 25 },
    { day: "SAT", occupancy: 65, discharges: 12 },
    { day: "SUN", occupancy: 60, discharges: 10 },
  ],
  cardiology: [
    { day: "MON", occupancy: 85, discharges: 10 },
    { day: "TUE", occupancy: 80, discharges: 12 },
    { day: "WED", occupancy: 88, discharges: 8 },
    { day: "THU", occupancy: 90, discharges: 14 },
    { day: "FRI", occupancy: 82, discharges: 16 },
    { day: "SAT", occupancy: 70, discharges: 6 },
    { day: "SUN", occupancy: 65, discharges: 5 },
  ],
  neurology: [
    { day: "MON", occupancy: 68, discharges: 14 },
    { day: "TUE", occupancy: 72, discharges: 18 },
    { day: "WED", occupancy: 65, discharges: 12 },
    { day: "THU", occupancy: 78, discharges: 16 },
    { day: "FRI", occupancy: 74, discharges: 20 },
    { day: "SAT", occupancy: 58, discharges: 8 },
    { day: "SUN", occupancy: 52, discharges: 6 },
  ],
  pediatrics: [
    { day: "MON", occupancy: 60, discharges: 22 },
    { day: "TUE", occupancy: 55, discharges: 28 },
    { day: "WED", occupancy: 62, discharges: 18 },
    { day: "THU", occupancy: 70, discharges: 24 },
    { day: "FRI", occupancy: 68, discharges: 30 },
    { day: "SAT", occupancy: 50, discharges: 14 },
    { day: "SUN", occupancy: 45, discharges: 10 },
  ],
  emergency: [
    { day: "MON", occupancy: 92, discharges: 30 },
    { day: "TUE", occupancy: 88, discharges: 35 },
    { day: "WED", occupancy: 95, discharges: 28 },
    { day: "THU", occupancy: 90, discharges: 32 },
    { day: "FRI", occupancy: 94, discharges: 38 },
    { day: "SAT", occupancy: 85, discharges: 22 },
    { day: "SUN", occupancy: 80, discharges: 18 },
  ],
};

const allNpsData = [
  { dept: "Cardiology", deptKey: "cardiology", score: 78, badge: "Good", color: "text-chart-2" },
  { dept: "Neurology", deptKey: "neurology", score: 84, badge: "Excellent", color: "text-chart-4" },
  { dept: "Pediatrics", deptKey: "pediatrics", score: 92, badge: "New", color: "text-chart-1" },
  { dept: "Emergency", deptKey: "emergency", score: 71, badge: "Good", color: "text-chart-3" },
];

const allStaffingData = [
  { dept: "General Medicine", deptKey: "all", pct: 90 },
  { dept: "Cardiology", deptKey: "cardiology", pct: 88 },
  { dept: "Neurology", deptKey: "neurology", pct: 75 },
  { dept: "Pediatrics", deptKey: "pediatrics", pct: 82 },
  { dept: "Emergency", deptKey: "emergency", pct: 95 },
  { dept: "Surgical Wing", deptKey: "all", pct: 75 },
  { dept: "Radiology", deptKey: "all", pct: 65 },
];

const allIncidents = [
  {
    id: "INC-9901",
    entity: "Emergency Room",
    deptKey: "emergency",
    provider: "dr-chen",
    patientType: "emergency",
    priority: "Critical",
    date: "Oct 24, 08:45 AM",
    status: "Resolved",
    duration: "2h 45m",
  },
  {
    id: "INC-9904",
    entity: "Cardiology Wing",
    entitySub: "Equipment Failure",
    deptKey: "cardiology",
    provider: "dr-morrison",
    patientType: "inpatient",
    priority: "High",
    date: "Oct 24, 09:12 AM",
    status: "In Progress",
    duration: "—",
  },
  {
    id: "INC-9912",
    entity: "Pediatrics",
    entitySub: "Handover Overrun",
    deptKey: "pediatrics",
    provider: "dr-hudson",
    patientType: "inpatient",
    priority: "Medium",
    date: "Oct 23, 11:30 PM",
    status: "Resolved",
    duration: "1h 12m",
  },
  {
    id: "INC-9918",
    entity: "Neurology",
    entitySub: "Delayed Response",
    deptKey: "neurology",
    provider: "dr-nguyen",
    patientType: "outpatient",
    priority: "High",
    date: "Oct 23, 03:20 PM",
    status: "Resolved",
    duration: "1h 30m",
  },
  {
    id: "INC-9925",
    entity: "Emergency Room",
    entitySub: "Overcrowding",
    deptKey: "emergency",
    provider: "dr-chen",
    patientType: "emergency",
    priority: "Critical",
    date: "Oct 22, 10:05 PM",
    status: "Resolved",
    duration: "3h 15m",
  },
];

// Stats keyed by date range
const statsByRange: Record<string, { admissions: number; admTrend: string; resource: string; resTrend: string; satisfaction: string; satTrend: string; waitTime: string; waitTrend: string; revenue: string; revTrend: string; claims: number; billing: number }> = {
  "7": { admissions: 312, admTrend: "+8.1%", resource: "91.4%", resTrend: "-1.2%", satisfaction: "4.8", satTrend: "+0.1", waitTime: "12 min", waitTrend: "-2m", revenue: "$580K", revTrend: "+6.2%", claims: 34, billing: 87 },
  "30": { admissions: 1284, admTrend: "+12.5%", resource: "88.2%", resTrend: "-2.1%", satisfaction: "4.9", satTrend: "+0.3", waitTime: "14 min", waitTrend: "-4m", revenue: "$2.4M", revTrend: "+8.4%", claims: 142, billing: 84 },
  "90": { admissions: 3842, admTrend: "+15.3%", resource: "85.6%", resTrend: "-3.4%", satisfaction: "4.7", satTrend: "+0.2", waitTime: "16 min", waitTrend: "-3m", revenue: "$7.1M", revTrend: "+11.2%", claims: 418, billing: 81 },
  "365": { admissions: 15680, admTrend: "+18.7%", resource: "82.1%", resTrend: "-4.8%", satisfaction: "4.6", satTrend: "+0.5", waitTime: "18 min", waitTrend: "-6m", revenue: "$28.4M", revTrend: "+14.6%", claims: 1720, billing: 79 },
};

// Recovery data keyed by patient type
const recoveryByType: Record<string, { data: { week: string; rate: number }[]; improvement: string }> = {
  all: { data: [{ week: "Week 1", rate: 62 }, { week: "Week 2", rate: 68 }, { week: "Week 3", rate: 65 }, { week: "Week 4", rate: 74 }, { week: "Current", rate: 78 }], improvement: "8.2%" },
  inpatient: { data: [{ week: "Week 1", rate: 55 }, { week: "Week 2", rate: 60 }, { week: "Week 3", rate: 58 }, { week: "Week 4", rate: 66 }, { week: "Current", rate: 72 }], improvement: "10.1%" },
  outpatient: { data: [{ week: "Week 1", rate: 70 }, { week: "Week 2", rate: 76 }, { week: "Week 3", rate: 74 }, { week: "Week 4", rate: 82 }, { week: "Current", rate: 86 }], improvement: "5.4%" },
  emergency: { data: [{ week: "Week 1", rate: 48 }, { week: "Week 2", rate: 54 }, { week: "Week 3", rate: 52 }, { week: "Week 4", rate: 60 }, { week: "Current", rate: 65 }], improvement: "12.8%" },
};

const deptKeys = ["cardiology", "neurology", "pediatrics", "emergency"] as const;

const priorityColor: Record<string, string> = {
  Critical: "text-destructive",
  High: "text-chart-3",
  Medium: "text-chart-2",
};

const statusVariant: Record<string, "default" | "secondary" | "destructive"> = {
  Resolved: "secondary",
  "In Progress": "default",
};

// ── Page ───────────────────────────────────────────────────────────────────

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("30");
  const [department, setDepartment] = useState("all");
  const [provider, setProvider] = useState("all");
  const [patientType, setPatientType] = useState("all");

  const set = (setter: (v: string) => void) => (v: string | null) => {
    if (v) setter(v);
  };

  // Derived data
  const stats = statsByRange[dateRange];

  const deptEfficiencyData = useMemo(
    () => allDeptEfficiencyData[department] || allDeptEfficiencyData.all,
    [department]
  );

  const npsData = useMemo(
    () =>
      department === "all"
        ? allNpsData
        : allNpsData.filter((d) => d.deptKey === department),
    [department]
  );

  const workloadData = useMemo(() => {
    const base = [
      { hour: "00:00", cardiology: 2, neurology: 1, pediatrics: 3, emergency: 5 },
      { hour: "04:00", cardiology: 1, neurology: 2, pediatrics: 1, emergency: 4 },
      { hour: "08:00", cardiology: 6, neurology: 5, pediatrics: 7, emergency: 8 },
      { hour: "12:00", cardiology: 8, neurology: 7, pediatrics: 6, emergency: 9 },
      { hour: "16:00", cardiology: 7, neurology: 6, pediatrics: 5, emergency: 7 },
      { hour: "20:00", cardiology: 4, neurology: 3, pediatrics: 4, emergency: 6 },
    ];
    if (department === "all") return base;
    // Zero out departments that aren't selected
    return base.map((row) => {
      const filtered: Record<string, number | string> = { hour: row.hour };
      for (const key of deptKeys) {
        filtered[key] = key === department ? row[key] : 0;
      }
      return filtered;
    });
  }, [department]);

  const filteredWorkloadConfig = useMemo(() => {
    if (department === "all") return workloadConfig;
    return Object.fromEntries(
      Object.entries(workloadConfig).filter(([key]) => key === department)
    ) as ChartConfig;
  }, [department]);

  const staffingData = useMemo(
    () =>
      department === "all"
        ? allStaffingData.filter((s) => s.deptKey === "all")
        : allStaffingData.filter((s) => s.deptKey === department),
    [department]
  );

  const recoveryInfo = useMemo(
    () => recoveryByType[patientType] || recoveryByType.all,
    [patientType]
  );

  const incidents = useMemo(() => {
    return allIncidents.filter((inc) => {
      if (department !== "all" && inc.deptKey !== department) return false;
      if (provider !== "all" && inc.provider !== provider) return false;
      if (patientType !== "all" && inc.patientType !== patientType) return false;
      return true;
    });
  }, [department, provider, patientType]);

  return (
    <AnimatedContainer>
      <div className="space-y-6">
        {/* Page header + filters */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-xl font-heading font-bold">Operational Insights</h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Real-time health trends and cross-departmental efficiency metrics.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="space-y-1">
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Date Range</span>
              <Select value={dateRange} onValueChange={set(setDateRange)}>
                <SelectTrigger className="h-8 w-[130px] text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Last 7 Days</SelectItem>
                  <SelectItem value="30">Last 30 Days</SelectItem>
                  <SelectItem value="90">Last 90 Days</SelectItem>
                  <SelectItem value="365">Last Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Department</span>
              <Select value={department} onValueChange={set(setDepartment)}>
                <SelectTrigger className="h-8 w-[140px] text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="cardiology">Cardiology</SelectItem>
                  <SelectItem value="neurology">Neurology</SelectItem>
                  <SelectItem value="pediatrics">Pediatrics</SelectItem>
                  <SelectItem value="emergency">Emergency</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Provider</span>
              <Select value={provider} onValueChange={set(setProvider)}>
                <SelectTrigger className="h-8 w-[130px] text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Providers</SelectItem>
                  <SelectItem value="dr-chen">Dr. Chen</SelectItem>
                  <SelectItem value="dr-morrison">Dr. Morrison</SelectItem>
                  <SelectItem value="dr-hudson">Dr. Hudson</SelectItem>
                  <SelectItem value="dr-nguyen">Dr. Nguyen</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Patient Type</span>
              <Select value={patientType} onValueChange={set(setPatientType)}>
                <SelectTrigger className="h-8 w-[120px] text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="inpatient">In-Patient</SelectItem>
                  <SelectItem value="outpatient">Out-Patient</SelectItem>
                  <SelectItem value="emergency">Emergency</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Stat cards */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          key={dateRange}
        >
          <StatCard label="Total Admissions" value={stats.admissions.toLocaleString()} trend={stats.admTrend} trendUp />
          <StatCard label="Resource Usage" value={stats.resource} trend={stats.resTrend} trendUp={false} />
          <StatCard label="Satisfaction" value={stats.satisfaction} trend={stats.satTrend} trendUp />
          <StatCard label="Avg. Wait Time" value={stats.waitTime} trend={stats.waitTrend} trendUp />
        </motion.div>

        {/* Row 2: Financial Summary + Departmental Efficiency */}
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-4">
          {/* Financial Summary — dark card */}
          <Card className="bg-primary text-primary-foreground">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 bg-primary-foreground/20 flex items-center justify-center">
                  <TrendUp className="h-3 w-3" />
                </div>
                <span className="text-[10px] font-medium uppercase tracking-wider opacity-80">
                  Financial Summary
                </span>
              </div>
              <CardTitle className="text-lg font-heading mt-1">
                Revenue Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-[10px] opacity-60 uppercase tracking-wider">Total Revenue</p>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-2xl font-heading font-bold">{stats.revenue}</span>
                  <span className="text-[10px] opacity-70">{stats.revTrend}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] opacity-60 uppercase tracking-wider">Pending Claims</p>
                  <span className="text-lg font-heading font-bold">{stats.claims}</span>
                </div>
                <Badge variant="secondary" className="text-[10px]">
                  Needs Audit
                </Badge>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-[10px] opacity-60 uppercase tracking-wider">Billing Efficiency</p>
                  <span className="text-xs font-bold">{stats.billing}%</span>
                </div>
                <div className="h-2 bg-primary-foreground/20 w-full">
                  <div
                    className="h-full bg-primary-foreground/60 transition-all duration-500"
                    style={{ width: `${stats.billing}%` }}
                  />
                </div>
              </div>
              <Button
                variant="secondary"
                size="sm"
                className="w-full text-xs gap-1"
              >
                Generate Finance Report
                <ArrowRight className="h-3 w-3" />
              </Button>
            </CardContent>
          </Card>

          {/* Departmental Efficiency */}
          <Card>
            <CardHeader className="pb-1">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-heading">
                    Departmental Efficiency
                  </CardTitle>
                  <p className="text-[10px] text-muted-foreground">
                    Daily bed occupancy vs. Discharge rate
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ChartContainer config={deptEfficiencyConfig} className="h-[220px] w-full">
                <AreaChart
                  accessibilityLayer
                  data={deptEfficiencyData}
                  margin={{ top: 5, right: 5, left: -15, bottom: 0 }}
                >
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis dataKey="day" tickLine={false} axisLine={false} fontSize={10} />
                  <YAxis tickLine={false} axisLine={false} fontSize={10} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Area
                    dataKey="occupancy"
                    type="monotone"
                    stroke="var(--color-occupancy)"
                    fill="var(--color-occupancy)"
                    fillOpacity={0.1}
                    strokeWidth={2}
                  />
                  <Area
                    dataKey="discharges"
                    type="monotone"
                    stroke="var(--color-discharges)"
                    fill="var(--color-discharges)"
                    fillOpacity={0.1}
                    strokeWidth={2}
                    strokeDasharray="4 4"
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Row 3: Department NPS + Recovery Rate Trends */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Department NPS */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-heading">Department NPS</CardTitle>
              <p className="text-[10px] text-muted-foreground">
                Net Promoter Score breakdown
              </p>
            </CardHeader>
            <CardContent className="space-y-0">
              {npsData.length > 0 ? (
                npsData.map((d) => (
                  <div
                    key={d.dept}
                    className="flex items-center justify-between py-3 border-b border-border last:border-0"
                  >
                    <div className="flex items-center gap-2">
                      <Circle weight="fill" className={cn("h-2 w-2", d.color)} />
                      <span className="text-xs font-medium">{d.dept}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-heading font-bold">{d.score}</span>
                      <Badge variant="secondary" className="text-[10px]">
                        {d.badge}
                      </Badge>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-muted-foreground py-4 text-center">
                  No NPS data for selected department
                </p>
              )}
            </CardContent>
          </Card>

          {/* Recovery Rate Trends */}
          <Card>
            <CardHeader className="pb-1">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-heading">
                    Recovery Rate Trends
                  </CardTitle>
                  <p className="text-[10px] text-muted-foreground">
                    Average patient recovery velocity (weekly)
                  </p>
                </div>
                <Badge variant="default" className="text-[10px] gap-0.5">
                  <TrendUp className="h-2.5 w-2.5" />
                  {recoveryInfo.improvement} improvement
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ChartContainer config={recoveryConfig} className="h-[160px] w-full">
                <LineChart
                  accessibilityLayer
                  data={recoveryInfo.data}
                  margin={{ top: 5, right: 5, left: -15, bottom: 0 }}
                >
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis dataKey="week" tickLine={false} axisLine={false} fontSize={10} />
                  <YAxis tickLine={false} axisLine={false} fontSize={10} domain={[40, 100]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    dataKey="rate"
                    type="monotone"
                    stroke="var(--color-rate)"
                    strokeWidth={2}
                    dot={{ r: 3, fill: "var(--color-rate)" }}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Row 4: Hourly Workload + Staffing Distribution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Hourly Workload Density */}
          <Card>
            <CardHeader className="pb-1">
              <CardTitle className="text-sm font-heading">
                Hourly Workload Density
              </CardTitle>
              <p className="text-[10px] text-muted-foreground">
                Patient flow intensity across 24 hours
              </p>
            </CardHeader>
            <CardContent>
              <ChartContainer config={filteredWorkloadConfig} className="h-[200px] w-full">
                <BarChart
                  accessibilityLayer
                  data={workloadData}
                  margin={{ top: 5, right: 5, left: -15, bottom: 0 }}
                >
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis dataKey="hour" tickLine={false} axisLine={false} fontSize={9} />
                  <YAxis tickLine={false} axisLine={false} fontSize={10} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  {(department === "all" ? deptKeys : [department]).map((key) => (
                    <Bar
                      key={key}
                      dataKey={key}
                      fill={`var(--color-${key})`}
                      barSize={department === "all" ? 8 : 24}
                    />
                  ))}
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Staffing Distribution */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-heading">
                    Staffing Distribution
                  </CardTitle>
                  <p className="text-[10px] text-muted-foreground">
                    Active vs. On-call providers
                  </p>
                </div>
                <button className="text-[10px] text-primary font-medium">
                  View Delta &rarr;
                </button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {staffingData.length > 0 ? (
                staffingData.map((s) => (
                  <div key={s.dept} className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium">{s.dept}</span>
                      <span className="text-xs font-mono font-bold">{s.pct}%</span>
                    </div>
                    <div className="h-2.5 bg-muted w-full">
                      <div
                        className="h-full bg-chart-4 transition-all duration-500"
                        style={{ width: `${s.pct}%` }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-muted-foreground py-4 text-center">
                  No staffing data for selected department
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Row 5: Critical Incident Ledger */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <CardTitle className="text-sm font-heading">
                  Critical Incident Ledger
                </CardTitle>
                <p className="text-[10px] text-muted-foreground">
                  Live audit trail of high-priority events
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-muted-foreground">Export Data:</span>
                <Button variant="ghost" size="sm" className="h-6 text-[10px] gap-1 px-2">
                  <FilePdf className="h-3 w-3" /> PDF
                </Button>
                <Button variant="ghost" size="sm" className="h-6 text-[10px] gap-1 px-2">
                  <FileCsv className="h-3 w-3" /> CSV
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="border border-border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-[10px]">INCIDENT ID</TableHead>
                    <TableHead className="text-[10px]">ENTITY / DEPT</TableHead>
                    <TableHead className="text-[10px]">PRIORITY</TableHead>
                    <TableHead className="text-[10px]">TIMESTAMP</TableHead>
                    <TableHead className="text-[10px]">STATUS</TableHead>
                    <TableHead className="text-[10px]">DURATION</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {incidents.length > 0 ? (
                    incidents.map((inc) => (
                      <TableRow key={inc.id}>
                        <TableCell className="text-xs font-mono font-medium">
                          {inc.id}
                        </TableCell>
                        <TableCell>
                          <div>
                            <span className="text-xs font-medium">{inc.entity}</span>
                            {inc.entitySub && (
                              <p className="text-[10px] text-muted-foreground">
                                {inc.entitySub}
                              </p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Circle
                              weight="fill"
                              className={cn("h-2 w-2", priorityColor[inc.priority])}
                            />
                            <span className={cn("text-xs font-medium", priorityColor[inc.priority])}>
                              {inc.priority}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {inc.date}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={statusVariant[inc.status] || "secondary"}
                            className="text-[10px]"
                          >
                            {inc.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs font-mono text-muted-foreground">
                          {inc.duration}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center text-xs text-muted-foreground py-8"
                      >
                        No incidents match the selected filters
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            <p className="text-[10px] text-muted-foreground mt-2">
              Showing {incidents.length} of {allIncidents.length} incidents
            </p>
          </CardContent>
        </Card>
      </div>
    </AnimatedContainer>
  );
}
