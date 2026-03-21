"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNotificationStore } from "@/stores/notification-store";
import { cn } from "@/lib/utils";
import { Bell, Calendar, Flask, Gear, Warning } from "@phosphor-icons/react";
import type { NotificationType } from "@/types";
import type { Icon } from "@phosphor-icons/react";

const typeIcons: Record<NotificationType, Icon> = {
  "patient-alert": Warning,
  appointment: Calendar,
  "lab-result": Flask,
  system: Gear,
};

const typeColors: Record<NotificationType, string> = {
  "patient-alert": "text-destructive",
  appointment: "text-chart-2",
  "lab-result": "text-chart-4",
  system: "text-muted-foreground",
};

export function ActivityFeed() {
  const notifications = useNotificationStore((s) => s.notifications);
  const recent = notifications.slice(0, 6);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-heading">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {recent.map((n) => {
          const Icon = typeIcons[n.type];
          return (
            <div key={n.id} className="flex items-start gap-3">
              <div
                className={cn(
                  "h-7 w-7 flex items-center justify-center bg-muted shrink-0 mt-0.5",
                  typeColors[n.type]
                )}
              >
                <Icon className="h-3.5 w-3.5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium">{n.title}</p>
                <p className="text-xs text-muted-foreground line-clamp-1">
                  {n.message}
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  {new Date(n.timestamp).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
