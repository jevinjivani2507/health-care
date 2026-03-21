"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { Vitals } from "@/types";

interface VitalBarProps {
  label: string;
  value: string | number;
  progress: number;
  unit?: string;
}

function VitalBar({ label, value, progress, unit }: VitalBarProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">
          {value} {unit}
        </span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
}

export function PatientVitals({ vitals }: { vitals: Vitals }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-heading">Current Vitals</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <VitalBar
          label="Blood Pressure"
          value={vitals.bloodPressure}
          progress={(() => {
            const sys = parseInt(vitals.bloodPressure.split("/")[0]);
            return Math.min((sys / 180) * 100, 100);
          })()}
          unit="mmHg"
        />
        <VitalBar
          label="Heart Rate"
          value={vitals.heartRate}
          progress={Math.min((vitals.heartRate / 120) * 100, 100)}
          unit="bpm"
        />
        <VitalBar
          label="O2 Saturation"
          value={vitals.oxygenSaturation}
          progress={vitals.oxygenSaturation}
          unit="%"
        />
        <VitalBar
          label="Temperature"
          value={vitals.temperature}
          progress={Math.min(((vitals.temperature - 95) / 8) * 100, 100)}
          unit="°F"
        />
        <VitalBar
          label="Respiratory Rate"
          value={vitals.respiratoryRate}
          progress={Math.min((vitals.respiratoryRate / 30) * 100, 100)}
          unit="breaths/min"
        />
      </CardContent>
    </Card>
  );
}
