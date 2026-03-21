"use client";

import {
  Bar,
  BarChart as RechartsBarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Pie,
  PieChart as RechartsPieChart,
  Cell,
  Area,
  AreaChart as RechartsAreaChart,
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart as RechartsRadialBarChart,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";

// ── Pie Chart (Patient Status) ──────────────────────────────────────────────

interface PieChartProps {
  data: { name: string; value: number; color: string }[];
}

const pieConfig = {
  active: { label: "Active", color: "var(--chart-2)" },
  critical: { label: "Critical", color: "var(--chart-1)" },
  inactive: { label: "Inactive", color: "var(--chart-5)" },
} satisfies ChartConfig;

export function StatusPieChart({ data }: PieChartProps) {
  return (
    <ChartContainer config={pieConfig} className="h-[220px] w-full">
      <RechartsPieChart>
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={80}
          strokeWidth={2}
          stroke="var(--background)"
        >
          {data.map((entry) => (
            <Cell key={entry.name} fill={entry.color} />
          ))}
        </Pie>
        <ChartLegend content={<ChartLegendContent />} />
      </RechartsPieChart>
    </ChartContainer>
  );
}

// ── Vertical Bar Chart (Gender) ─────────────────────────────────────────────

interface VerticalBarChartProps {
  data: { name: string; count: number }[];
  config: ChartConfig;
}

export function VerticalBarChart({ data, config }: VerticalBarChartProps) {
  return (
    <ChartContainer config={config} className="h-[220px] w-full">
      <RechartsBarChart
        accessibilityLayer
        data={data}
        margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
      >
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={11} />
        <YAxis tickLine={false} axisLine={false} fontSize={11} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="count" radius={[2, 2, 0, 0]}>
          {data.map((_, i) => (
            <Cell
              key={i}
              fill={`var(--chart-${(i % 5) + 1})`}
            />
          ))}
        </Bar>
      </RechartsBarChart>
    </ChartContainer>
  );
}

// ── Horizontal Bar Chart (Diagnoses) ────────────────────────────────────────

interface HorizontalBarChartProps {
  data: { name: string; count: number }[];
  config: ChartConfig;
}

export function HorizontalBarChart({ data, config }: HorizontalBarChartProps) {
  return (
    <ChartContainer config={config} className="h-[220px] w-full">
      <RechartsBarChart
        accessibilityLayer
        data={data}
        layout="vertical"
        margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
      >
        <CartesianGrid horizontal={false} strokeDasharray="3 3" />
        <XAxis type="number" tickLine={false} axisLine={false} fontSize={11} />
        <YAxis
          type="category"
          dataKey="name"
          tickLine={false}
          axisLine={false}
          fontSize={10}
          width={70}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="count" radius={[0, 2, 2, 0]}>
          {data.map((_, i) => (
            <Cell key={i} fill={`var(--chart-${(i % 5) + 1})`} />
          ))}
        </Bar>
      </RechartsBarChart>
    </ChartContainer>
  );
}

// ── Radar Chart (Age Distribution) ──────────────────────────────────────────

interface RadarChartProps {
  data: { group: string; count: number }[];
}

const radarConfig = {
  count: { label: "Patients", color: "var(--chart-3)" },
} satisfies ChartConfig;

export function AgeRadarChart({ data }: RadarChartProps) {
  return (
    <ChartContainer config={radarConfig} className="h-[220px] w-full">
      <RechartsRadarChart data={data} cx="50%" cy="50%" outerRadius="70%">
        <PolarGrid stroke="var(--border)" />
        <PolarAngleAxis dataKey="group" fontSize={11} />
        <PolarRadiusAxis fontSize={10} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Radar
          dataKey="count"
          fill="var(--color-count)"
          fillOpacity={0.3}
          stroke="var(--color-count)"
          strokeWidth={2}
        />
      </RechartsRadarChart>
    </ChartContainer>
  );
}

// ── Radial Bar Chart (Insurance) ────────────────────────────────────────────

interface RadialBarChartProps {
  data: { name: string; count: number; fill: string }[];
}

const radialConfig = {
  count: { label: "Patients" },
} satisfies ChartConfig;

export function InsuranceRadialChart({ data }: RadialBarChartProps) {
  return (
    <ChartContainer config={radialConfig} className="h-[220px] w-full">
      <RechartsRadialBarChart
        data={data}
        innerRadius={30}
        outerRadius={100}
        startAngle={180}
        endAngle={0}
        cx="50%"
        cy="80%"
      >
        <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
        <RadialBar
          dataKey="count"
          background={{ fill: "var(--muted)" }}
          cornerRadius={4}
        />
        <ChartLegend
          content={<ChartLegendContent nameKey="name" />}
          verticalAlign="bottom"
        />
      </RechartsRadialBarChart>
    </ChartContainer>
  );
}

// ── Area Chart (Monthly Trend) ──────────────────────────────────────────────

interface AreaChartProps {
  data: { month: string; visits: number; admissions: number }[];
}

const areaConfig = {
  visits: { label: "Visits", color: "var(--chart-2)" },
  admissions: { label: "Admissions", color: "var(--chart-4)" },
} satisfies ChartConfig;

export function MonthlyAreaChart({ data }: AreaChartProps) {
  return (
    <ChartContainer config={areaConfig} className="h-[220px] w-full">
      <RechartsAreaChart
        accessibilityLayer
        data={data}
        margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
      >
        <defs>
          <linearGradient id="areaVisits" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-visits)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="var(--color-visits)" stopOpacity={0.02} />
          </linearGradient>
          <linearGradient id="areaAdmissions" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-admissions)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="var(--color-admissions)" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={11} />
        <YAxis tickLine={false} axisLine={false} fontSize={11} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Area
          dataKey="visits"
          type="monotone"
          stroke="var(--color-visits)"
          strokeWidth={2}
          fill="url(#areaVisits)"
          dot={false}
        />
        <Area
          dataKey="admissions"
          type="monotone"
          stroke="var(--color-admissions)"
          strokeWidth={2}
          fill="url(#areaAdmissions)"
          dot={false}
        />
      </RechartsAreaChart>
    </ChartContainer>
  );
}
