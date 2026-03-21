"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const DAYS = ["S", "M", "T", "W", "T", "F", "S"];

interface CalendarEvent {
  day: number;
  type: "appointment" | "meeting" | "surgery";
}

const events: CalendarEvent[] = [
  { day: 4, type: "appointment" },
  { day: 5, type: "meeting" },
  { day: 6, type: "surgery" },
  { day: 12, type: "appointment" },
  { day: 15, type: "meeting" },
  { day: 20, type: "surgery" },
  { day: 25, type: "appointment" },
];

const eventDotColors: Record<string, string> = {
  appointment: "bg-chart-2",
  meeting: "bg-chart-4",
  surgery: "bg-destructive",
};

export function CalendarWidget() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const today = now.getDate();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthName = new Date(year, month).toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDayOfMonth; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const getEvent = (day: number) => events.find((e) => e.day === day);

  return (
    <Card className="w-full lg:w-72 shrink-0">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-heading">Calendar</CardTitle>
        <p className="text-xs text-muted-foreground">{monthName}</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-0">
          {DAYS.map((d, i) => (
            <div
              key={i}
              className="h-7 flex items-center justify-center text-[10px] font-medium text-muted-foreground"
            >
              {d}
            </div>
          ))}
          {cells.map((day, i) => {
            const event = day ? getEvent(day) : null;
            return (
              <div
                key={i}
                className={cn(
                  "h-7 flex flex-col items-center justify-center text-xs relative",
                  day === today &&
                    "bg-primary text-primary-foreground font-bold",
                  !day && "opacity-0"
                )}
              >
                {day}
                {event && (
                  <span
                    className={cn(
                      "absolute bottom-0.5 h-1 w-1 rounded-full",
                      eventDotColors[event.type]
                    )}
                  />
                )}
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border">
          {[
            { label: "Appointment", color: "bg-chart-2" },
            { label: "Meeting", color: "bg-chart-4" },
            { label: "Surgery", color: "bg-destructive" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <span className={cn("h-1.5 w-1.5 rounded-full", item.color)} />
              <span className="text-[10px] text-muted-foreground">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
