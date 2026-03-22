"use client";

import { useMemo, useState } from "react";
import { addMonths, format, isSameDay, startOfDay } from "date-fns";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] as const;

type EventKind = "appointment" | "meeting" | "surgery";

const EVENT_DOT: Record<EventKind, string> = {
  appointment: "bg-orange-500",
  meeting: "bg-red-500",
  surgery: "bg-violet-500",
};

type TimelineEvent = {
  kind: EventKind;
  /** Shown in hover tooltip, e.g. "Appointment at 3:00 PM" */
  label: string;
};

/** Demo schedule keyed by yyyy-MM-dd (dots follow this order) */
const EVENT_TIMELINES: Record<string, TimelineEvent[]> = {
  "2026-03-06": [
    { kind: "meeting", label: "Meeting at 11:00 AM" },
    { kind: "appointment", label: "Appointment at 3:00 PM" },
    { kind: "surgery", label: "Surgery from 4:00–5:00 PM" },
  ],
  "2026-03-12": [
    { kind: "meeting", label: "Meeting at 9:30 AM" },
    { kind: "surgery", label: "Surgery from 1:00–2:30 PM" },
  ],
  "2026-03-25": [
    { kind: "appointment", label: "Appointment at 8:00 AM" },
    { kind: "appointment", label: "Appointment at 3:00 PM" },
    { kind: "meeting", label: "Meeting at 12:00 PM" },
    { kind: "surgery", label: "Surgery from 4:00–5:00 PM" },
  ],
  "2026-03-30": [{ kind: "meeting", label: "Meeting at 2:00 PM" }],
};

function buildMonthCells(viewMonth: Date) {
  const year = viewMonth.getFullYear();
  const month = viewMonth.getMonth();
  const first = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0).getDate();
  const startPad = first.getDay();

  const cells: { date: Date; inMonth: boolean }[] = [];
  const prevMonthLast = new Date(year, month, 0).getDate();

  for (let i = 0; i < startPad; i++) {
    const day = prevMonthLast - startPad + i + 1;
    cells.push({ date: new Date(year, month - 1, day), inMonth: false });
  }
  for (let d = 1; d <= lastDay; d++) {
    cells.push({ date: new Date(year, month, d), inMonth: true });
  }
  let next = 1;
  while (cells.length < 42) {
    cells.push({ date: new Date(year, month + 1, next), inMonth: false });
    next += 1;
  }
  return cells;
}

export function CalendarWidget() {
  const [viewMonth, setViewMonth] = useState(() => new Date(2026, 2, 1));

  const [selectedDate, setSelectedDate] = useState<Date | null>(
    startOfDay(new Date(2026, 2, 15)),
  );

  const cells = useMemo(() => buildMonthCells(viewMonth), [viewMonth]);

  const monthLabel = format(viewMonth, "MMMM yyyy");

  function handleDayClick(raw: Date) {
    setSelectedDate(startOfDay(raw));
  }

  return (
    <Card className="flex h-full min-h-0 w-full flex-col border-border/80 bg-card shadow-sm">
      <CardHeader className="shrink-0 gap-0 pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-0.5">
            <CardTitle className="text-base font-heading tracking-tight">
              Calendar
            </CardTitle>
            <p className="text-xs text-muted-foreground">{monthLabel}</p>
          </div>
          {selectedDate != null && (
            <div className="text-right">
              <p className="font-mono text-xs font-medium tabular-nums tracking-tight text-foreground">
                {format(selectedDate, "MMM d, yyyy")}
              </p>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex min-h-0 flex-1 flex-col gap-5 pt-0">
        <div className="flex items-center justify-between gap-3 border-b border-border/60 pb-4">
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            className="size-8 shrink-0 rounded-none border-border/80 bg-background shadow-none"
            onClick={() => setViewMonth((m) => addMonths(m, -1))}
            aria-label="Previous month"
          >
            <CaretLeft className="size-4" weight="bold" />
          </Button>
          <span className="min-w-0 flex-1 truncate text-center font-mono text-sm font-medium tabular-nums tracking-tight text-foreground">
            {monthLabel}
          </span>
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            className="size-8 shrink-0 rounded-none border-border/80 bg-background shadow-none"
            onClick={() => setViewMonth((m) => addMonths(m, 1))}
            aria-label="Next month"
          >
            <CaretRight className="size-4" weight="bold" />
          </Button>
        </div>

        <div className="overflow-hidden rounded-none border border-border/80 bg-card">
          <div className="grid grid-cols-7 border-b border-border/80 bg-muted/40 px-0.5 py-2.5">
            {WEEKDAYS.map((d) => (
              <div
                key={d}
                className="text-center font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground"
              >
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-px bg-border/50 p-px">
            {cells.map(({ date, inMonth }) => {
              const key = format(date, "yyyy-MM-dd");
              const dayNum = date.getDate();

              const isSelected =
                selectedDate != null && isSameDay(date, selectedDate);

              const timeline = EVENT_TIMELINES[key];
              const hasTimeline = Boolean(
                inMonth && timeline && timeline.length > 0,
              );

              const dayButton = (
                <button
                  type="button"
                  onClick={() => handleDayClick(date)}
                  className={cn(
                    "relative flex h-full min-h-[3rem] w-full flex-col items-center justify-center gap-1 px-0.5 py-2 font-mono text-[12px] tabular-nums transition-colors duration-150",
                    !inMonth &&
                      cn("pointer-events-none text-muted-foreground/40"),
                    inMonth && !isSelected && "bg-card text-foreground",
                    isSelected &&
                      "z-[1] bg-primary text-primary-foreground shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)] hover:bg-primary/92",
                    inMonth && !isSelected && "hover:bg-muted/50",
                    inMonth &&
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  )}
                >
                  <span
                    className={cn("leading-none", isSelected && "font-semibold")}
                  >
                    {dayNum}
                  </span>
                  {inMonth && timeline && timeline.length > 0 && (
                    <span className="flex h-2 items-center justify-center gap-0.5">
                      {timeline.map((ev, evi) => (
                        <span
                          key={`${key}-${evi}`}
                          className={cn(
                            "size-1.5 shrink-0 rounded-full",
                            EVENT_DOT[ev.kind],
                            isSelected && "ring-1 ring-primary-foreground/35",
                          )}
                          aria-hidden
                        />
                      ))}
                    </span>
                  )}
                </button>
              );

              return (
                <div
                  key={key}
                  className="relative flex min-h-[3rem] w-full min-w-0 flex-col"
                >
                  {hasTimeline ? (
                    <Tooltip>
                      {/*
                        Do not use display:contents on the trigger — it removes the
                        anchor box and the tooltip positions at (0,0).
                      */}
                      <TooltipTrigger
                        render={
                          <div className="flex h-full min-h-[3rem] w-full flex-col" />
                        }
                      >
                        {dayButton}
                      </TooltipTrigger>
                      <TooltipContent
                        side="top"
                        sideOffset={8}
                        className="max-w-[min(280px,calc(100vw-2rem))] flex-col items-stretch gap-0 px-3 py-2.5 text-left"
                      >
                        <p className="mb-2 border-b border-background/20 pb-1.5 font-mono text-[10px] font-medium tracking-wide text-background/80 uppercase">
                          {format(date, "EEE, MMM d")}
                        </p>
                        <ul className="flex flex-col gap-2">
                          {timeline!.map((ev, i) => (
                            <li
                              key={`${key}-tl-${i}`}
                              className="flex gap-2.5 text-xs leading-snug text-background"
                            >
                              <span
                                className={cn(
                                  "mt-1.5 size-1.5 shrink-0 rounded-full",
                                  EVENT_DOT[ev.kind],
                                )}
                                aria-hidden
                              />
                              <span>{ev.label}</span>
                            </li>
                          ))}
                        </ul>
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    dayButton
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border/60 pt-4 font-mono text-[10px] lowercase tracking-wide text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span
              className={cn("size-1.5 rounded-full", EVENT_DOT.appointment)}
            />
            appointment
          </span>
          <span className="flex items-center gap-1.5">
            <span className={cn("size-1.5 rounded-full", EVENT_DOT.meeting)} />
            meeting
          </span>
          <span className="flex items-center gap-1.5">
            <span className={cn("size-1.5 rounded-full", EVENT_DOT.surgery)} />
            surgery
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
