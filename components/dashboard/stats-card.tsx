"use client";

import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { staggerItem } from "@/lib/animations";
import type { Icon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { DotsThree, TrendUp } from "@phosphor-icons/react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: Icon;
  trend?: string;
  description?: string;
  highlighted?: boolean;
}

export function StatsCard({
  title,
  value,
  icon: IconComponent,
  trend,
  description,
  highlighted = false,
}: StatsCardProps) {
  return (
    <motion.div variants={staggerItem}>
      <Card
        className={cn(
          "transition-colors",
          highlighted && "bg-primary text-primary-foreground"
        )}
      >
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "h-8 w-8 flex items-center justify-center",
                  highlighted
                    ? "bg-primary-foreground/20"
                    : "bg-muted"
                )}
              >
                <IconComponent
                  className={cn(
                    "h-4 w-4",
                    highlighted
                      ? "text-primary-foreground"
                      : "text-muted-foreground"
                  )}
                />
              </div>
              <span
                className={cn(
                  "text-xs font-medium",
                  highlighted
                    ? "text-primary-foreground/80"
                    : "text-muted-foreground"
                )}
              >
                {title}
              </span>
            </div>
            <DotsThree
              className={cn(
                "h-5 w-5",
                highlighted
                  ? "text-primary-foreground/50"
                  : "text-muted-foreground/50"
              )}
              weight="bold"
            />
          </div>

          <div className="flex items-baseline gap-2">
            <span
              className={cn(
                "text-3xl font-heading font-bold tracking-tight",
                !highlighted && "text-foreground"
              )}
            >
              {typeof value === "number" ? value.toLocaleString() : value}
            </span>
            {trend && (
              <span
                className={cn(
                  "flex items-center gap-0.5 text-[10px] font-medium",
                  highlighted
                    ? "text-primary-foreground/70"
                    : "text-chart-2"
                )}
              >
                <TrendUp className="h-3 w-3" />
                {trend}
              </span>
            )}
          </div>

          {description && (
            <p
              className={cn(
                "text-[11px] leading-relaxed",
                highlighted
                  ? "text-primary-foreground/70"
                  : "text-muted-foreground"
              )}
            >
              {description}
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
