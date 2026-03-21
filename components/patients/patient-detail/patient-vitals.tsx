"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Scales,
  Thermometer,
  Heartbeat,
  Drop,
} from "@phosphor-icons/react";
import type { Vitals } from "@/types";
import { cn } from "@/lib/utils";
import type { Icon } from "@phosphor-icons/react";

interface VitalCardProps {
  label: string;
  value: string | number;
  unit: string;
  icon: Icon;
  trend?: string;
  trendUp?: boolean;
}

function VitalCard({ label, value, unit, icon: IconComp, trend, trendUp }: VitalCardProps) {
  return (
    <Card>
      <CardContent className="p-3 text-center space-y-1">
        <div className="flex items-center justify-center gap-1.5 text-muted-foreground">
          <IconComp className="h-4 w-4" />
          <span className="text-[11px] font-medium">{label}</span>
        </div>
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-2xl font-heading font-bold">{value}</span>
          <span className="text-[10px] text-muted-foreground">{unit}</span>
        </div>
        {trend && (
          <span
            className={cn(
              "text-[10px] font-medium",
              trendUp ? "text-chart-2" : "text-destructive"
            )}
          >
            {trend}
          </span>
        )}
      </CardContent>
    </Card>
  );
}

export function PatientVitals({ vitals }: { vitals: Vitals }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      <VitalCard
        label="Weight"
        value={vitals.weight}
        unit="lbs"
        icon={Scales}
        trend="+1.5%"
        trendUp
      />
      <VitalCard
        label="Temperature"
        value={vitals.temperature}
        unit="°F"
        icon={Thermometer}
        trend={vitals.temperature > 99 ? "+1.8" : "+0.3"}
        trendUp={vitals.temperature <= 99}
      />
      <VitalCard
        label="Heart Rate"
        value={vitals.heartRate}
        unit="bpm"
        icon={Heartbeat}
        trend={vitals.heartRate > 90 ? "+2.4%" : "+1.3%"}
        trendUp={vitals.heartRate <= 90}
      />
      <VitalCard
        label="O₂ Saturation"
        value={vitals.oxygenSaturation}
        unit="%"
        icon={Drop}
        trend={vitals.oxygenSaturation >= 95 ? "+1.5%" : "-2.1%"}
        trendUp={vitals.oxygenSaturation >= 95}
      />
    </div>
  );
}
