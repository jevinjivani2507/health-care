"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";

const chartData = [
  { time: "01am", onTime: 20, onLate: 10 },
  { time: "02am", onTime: 35, onLate: 18 },
  { time: "03am", onTime: 28, onLate: 22 },
  { time: "04am", onTime: 55, onLate: 15 },
  { time: "05am", onTime: 48, onLate: 30 },
  { time: "06am", onTime: 72, onLate: 25 },
  { time: "07am", onTime: 59, onLate: 10 },
  { time: "08am", onTime: 65, onLate: 35 },
  { time: "09am", onTime: 80, onLate: 28 },
  { time: "10am", onTime: 62, onLate: 40 },
  { time: "11am", onTime: 90, onLate: 32 },
  { time: "12pm", onTime: 75, onLate: 22 },
];

const chartConfig = {
  onTime: {
    label: "On Time",
    color: "var(--chart-2)",
  },
  onLate: {
    label: "On Late",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig;

export function PatientOverviewChart() {
  return (
    <Card className="flex h-full min-h-0 flex-1 flex-col">
      <CardHeader className="shrink-0 pb-2">
        <CardTitle className="text-base font-heading">
          Patient Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="flex min-h-0 flex-1 flex-col pt-0">
        <ChartContainer
          config={chartConfig}
          className="!aspect-auto h-full min-h-[220px] w-full flex-1 md:min-h-[260px]"
        >
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="fillOnTime" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-onTime)"
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-onTime)"
                  stopOpacity={0.02}
                />
              </linearGradient>
              <linearGradient id="fillOnLate" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-onLate)"
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-onLate)"
                  stopOpacity={0.02}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize={11}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize={11}
            />
            <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
            <ChartLegend
              content={<ChartLegendContent />}
              verticalAlign="top"
              align="right"
            />
            <Area
              dataKey="onTime"
              type="monotone"
              stroke="var(--color-onTime)"
              strokeWidth={2}
              fill="url(#fillOnTime)"
              dot={false}
            />
            <Area
              dataKey="onLate"
              type="monotone"
              stroke="var(--color-onLate)"
              strokeWidth={2}
              fill="url(#fillOnLate)"
              dot={false}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
