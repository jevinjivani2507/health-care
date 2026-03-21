"use client";

import { Bar, BarChart, XAxis, YAxis, Cell, ReferenceLine } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { LabResult } from "@/types";
import { cn } from "@/lib/utils";

const chartConfig: ChartConfig = {
  value: { label: "Value" },
};

export function PatientLabs({ labs }: { labs: LabResult[] }) {
  const data = labs.map((l) => ({
    name: l.name,
    value: l.value,
    max: l.max,
    min: l.min,
    unit: l.unit,
    inRange: l.value >= l.min && l.value <= l.max,
  }));

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-heading">Labs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {labs.map((lab) => {
            const pct = Math.min(
              ((lab.value - lab.min * 0.5) / (lab.max * 1.2 - lab.min * 0.5)) *
                100,
              100
            );
            const inRange = lab.value >= lab.min && lab.value <= lab.max;
            return (
              <div key={lab.name} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium w-6">{lab.name}</span>
                  <span
                    className={cn(
                      "font-mono text-xs",
                      inRange ? "text-chart-2" : "text-destructive"
                    )}
                  >
                    {lab.value}
                  </span>
                  <span className="text-[10px] text-muted-foreground w-20 text-right">
                    {lab.min} / {lab.max}
                  </span>
                </div>
                <div className="h-2 bg-muted w-full overflow-hidden">
                  <div
                    className={cn(
                      "h-full transition-all duration-500",
                      inRange ? "bg-chart-2" : "bg-destructive"
                    )}
                    style={{ width: `${Math.max(pct, 5)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
