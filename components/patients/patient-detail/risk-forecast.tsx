"use client";

import { RadialBar, RadialBarChart, PolarAngleAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  type ChartConfig,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import type { Patient } from "@/types";

interface RiskGaugeProps {
  label: string;
  value: number;
  level: string;
  factors: string[];
  color: string;
}

function RiskGauge({ label, value, level, factors, color }: RiskGaugeProps) {
  const config: ChartConfig = {
    risk: { label, color },
  };

  return (
    <div className="flex items-center gap-3 py-2 border-b border-border last:border-0">
      <ChartContainer config={config} className="h-16 w-16 shrink-0 !aspect-square">
        <RadialBarChart
          data={[{ risk: value, fill: color }]}
          innerRadius="70%"
          outerRadius="100%"
          startAngle={90}
          endAngle={-270}
          barSize={6}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            angleAxisId={0}
            tick={false}
          />
          <RadialBar
            dataKey="risk"
            background={{ fill: "var(--muted)" }}
            cornerRadius={4}
            angleAxisId={0}
          />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="central"
            className="fill-foreground text-sm font-bold"
          >
            {value}%
          </text>
        </RadialBarChart>
      </ChartContainer>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium">{label}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-[10px] text-muted-foreground">Level</span>
          <span
            className={cn(
              "text-[10px] font-medium",
              level === "High"
                ? "text-destructive"
                : level === "Moderate"
                  ? "text-chart-3"
                  : "text-chart-2"
            )}
          >
            {level}
          </span>
        </div>
        <p className="text-[10px] text-muted-foreground mt-0.5 truncate">
          {factors.join(", ")}
        </p>
      </div>
    </div>
  );
}

export function RiskForecast({ patient }: { patient: Patient }) {
  // Derive risk values from patient data
  const sys = parseInt(patient.vitals.bloodPressure.split("/")[0]);
  const cardiovascularRisk = patient.status === "critical" ? 42 : sys > 140 ? 35 : sys > 130 ? 23 : 12;
  const strokeRisk = patient.vitals.heartRate > 95 ? 18 : patient.vitals.heartRate > 85 ? 10 : 6;
  const diabetesRisk = patient.diagnosis.toLowerCase().includes("diabetes") ? 64 : patient.vitals.weight > 180 ? 32 : 15;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-heading">Risk Forecast</CardTitle>
      </CardHeader>
      <CardContent className="space-y-0">
        <RiskGauge
          label="Cardiovascular Risk"
          value={cardiovascularRisk}
          level={cardiovascularRisk > 30 ? "High" : cardiovascularRisk > 15 ? "Moderate" : "Low"}
          factors={["Cholesterol", `BP: ${patient.vitals.bloodPressure}`]}
          color={cardiovascularRisk > 30 ? "var(--destructive)" : cardiovascularRisk > 15 ? "var(--chart-3)" : "var(--chart-2)"}
        />
        <RiskGauge
          label="Stroke Risk"
          value={strokeRisk}
          level={strokeRisk > 15 ? "Moderate" : "Low"}
          factors={[`HR: ${patient.vitals.heartRate} bpm`, patient.vitals.heartRate > 90 ? "Elevated rate" : "Normal rhythm"]}
          color={strokeRisk > 15 ? "var(--chart-3)" : "var(--chart-2)"}
        />
        <RiskGauge
          label="Type 2 Diabetes Risk"
          value={diabetesRisk}
          level={diabetesRisk > 50 ? "High" : diabetesRisk > 25 ? "Moderate" : "Low"}
          factors={[`Weight: ${patient.vitals.weight} lbs`, diabetesRisk > 50 ? "HbA1c: 5.4%" : "Normal glucose"]}
          color={diabetesRisk > 50 ? "var(--destructive)" : diabetesRisk > 25 ? "var(--chart-3)" : "var(--chart-2)"}
        />
      </CardContent>
    </Card>
  );
}
