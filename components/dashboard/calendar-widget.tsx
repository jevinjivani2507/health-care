"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Calendar, CalendarDayButton } from "@/components/ui/calendar";
import { useState } from "react";
import { addDays } from "date-fns";
import { DateRange } from "react-day-picker";

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
  const [date, setDate] = useState<Date | undefined>(undefined);
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
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 11, 8),
    to: addDays(new Date(new Date().getFullYear(), 11, 8), 10),
  });

  return (
    <Card className="w-full lg:w-72 shrink-0">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-heading">Calendar</CardTitle>
        <p className="text-xs text-muted-foreground">{monthName}</p>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="range"
          defaultMonth={range?.from}
          selected={range}
          onSelect={setRange}
          numberOfMonths={1}
          captionLayout="dropdown"
          className="[--cell-size:--spacing(10)] md:[--cell-size:--spacing(12)]"
          formatters={{
            formatMonthDropdown: (date) => {
              return date.toLocaleString("default", { month: "long" });
            },
          }}
          components={{
            DayButton: ({ children, modifiers, day, ...props }) => {
              const isWeekend =
                day.date.getDay() === 0 || day.date.getDay() === 6;
              return (
                <CalendarDayButton day={day} modifiers={modifiers} {...props}>
                  {children}
                  {!modifiers.outside && (
                    <span>{isWeekend ? "$120" : "$100"}</span>
                  )}
                </CalendarDayButton>
              );
            },
          }}
        />
      </CardContent>
    </Card>
  );
}
