"use client";

import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { staggerItem } from "@/lib/animations";
import type { Icon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: Icon;
  trend?: string;
  variant?: "default" | "primary" | "destructive" | "success";
}

const variantClasses = {
  default: "text-foreground",
  primary: "text-primary",
  destructive: "text-destructive",
  success: "text-chart-2",
};

export function StatsCard({
  title,
  value,
  icon: Icon,
  trend,
  variant = "default",
}: StatsCardProps) {
  return (
    <motion.div variants={staggerItem}>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                {title}
              </p>
              <p
                className={cn(
                  "text-2xl font-heading font-bold mt-1",
                  variantClasses[variant]
                )}
              >
                {value}
              </p>
              {trend && (
                <p className="text-xs text-muted-foreground mt-1">{trend}</p>
              )}
            </div>
            <div className="h-10 w-10 flex items-center justify-center bg-muted">
              <Icon className={cn("h-5 w-5", variantClasses[variant])} />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
