"use client";

import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { staggerItem } from "@/lib/animations";

interface MetricCardProps {
  title: string;
  children: React.ReactNode;
}

export function MetricCard({ title, children }: MetricCardProps) {
  return (
    <motion.div variants={staggerItem}>
      <Card className="h-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-heading">{title}</CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </motion.div>
  );
}
