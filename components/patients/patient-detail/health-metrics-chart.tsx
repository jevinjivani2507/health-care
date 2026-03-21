"use client";

import { useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import type { HealthMetricPoint } from "@/types";

const metrics = [
  { key: "heartRate", label: "Heart Rate", color: "var(--chart-1)" },
  { key: "bloodPressure", label: "Blood Pressure", color: "var(--chart-2)" },
  { key: "glucose", label: "Glucose Levels", color: "var(--chart-3)" },
  { key: "oxygenSaturation", label: "Oxygen Saturation", color: "var(--chart-4)" },
] as const;

type MetricKey = (typeof metrics)[number]["key"];

export function HealthMetricsChart({ data }: { data: HealthMetricPoint[] }) {
  const [activeMetric, setActiveMetric] = useState<MetricKey>("heartRate");

  const active = metrics.find((m) => m.key === activeMetric)!;

  const chartConfig: ChartConfig = {
    [activeMetric]: {
      label: active.label,
      color: active.color,
    },
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <CardTitle className="text-sm font-heading">
            Health Metrics Timeline
          </CardTitle>
          <div className="flex flex-wrap gap-1">
            {metrics.map((m) => (
              <button
                key={m.key}
                onClick={() => setActiveMetric(m.key)}
                className={cn(
                  "px-2 py-1 text-[10px] font-medium transition-colors border",
                  activeMetric === m.key
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="metricFill" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={active.color}
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor={active.color}
                  stopOpacity={0.02}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              fontSize={10}
            />
            <YAxis tickLine={false} axisLine={false} fontSize={10} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              dataKey={activeMetric}
              type="monotone"
              stroke={active.color}
              strokeWidth={2}
              fill="url(#metricFill)"
              dot={{ r: 3, fill: active.color }}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
