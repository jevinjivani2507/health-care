"use client";

import { cn } from "@/lib/utils";

interface BarChartProps {
  data: { label: string; value: number; colorVar: string }[];
  maxValue?: number;
}

export function BarChart({ data, maxValue }: BarChartProps) {
  const max = maxValue ?? Math.max(...data.map((d) => d.value));

  return (
    <div className="space-y-2">
      {data.map((item) => (
        <div key={item.label} className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">{item.label}</span>
            <span className="font-medium">{item.value}</span>
          </div>
          <div className="h-3 bg-muted w-full overflow-hidden">
            <div
              className="h-full transition-all duration-500"
              style={{
                width: `${(item.value / max) * 100}%`,
                backgroundColor: `var(${item.colorVar})`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

interface DonutIndicatorProps {
  segments: { label: string; value: number; colorVar: string }[];
}

export function DonutIndicator({ segments }: DonutIndicatorProps) {
  const total = segments.reduce((sum, s) => sum + s.value, 0);
  let accumulated = 0;

  return (
    <div className="flex items-center gap-6">
      <div className="relative h-24 w-24 shrink-0">
        <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
          {segments.map((segment) => {
            const pct = (segment.value / total) * 100;
            const offset = accumulated;
            accumulated += pct;
            return (
              <circle
                key={segment.label}
                cx="18"
                cy="18"
                r="15.915"
                fill="none"
                strokeWidth="3"
                strokeDasharray={`${pct} ${100 - pct}`}
                strokeDashoffset={-offset}
                style={{ stroke: `var(${segment.colorVar})` }}
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold">{total}</span>
        </div>
      </div>
      <div className="space-y-1.5">
        {segments.map((segment) => (
          <div key={segment.label} className="flex items-center gap-2 text-xs">
            <span
              className="h-2.5 w-2.5 shrink-0"
              style={{ backgroundColor: `var(${segment.colorVar})` }}
            />
            <span className="text-muted-foreground">{segment.label}</span>
            <span className="font-medium ml-auto">{segment.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
