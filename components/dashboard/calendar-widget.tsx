"use client";

import { useMemo, useState } from "react";
import {
  addMonths,
  differenceInCalendarDays,
  format,
  isSameDay,
  isWithinInterval,
  startOfDay,
} from "date-fns";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] as const;

type EventKind = "appointment" | "meeting" | "surgery";

const EVENT_DOT: Record<EventKind, string> = {
  appointment: "bg-orange-500",
  meeting: "bg-red-500",
  surgery: "bg-violet-500",
};

/** Demo events keyed by yyyy-MM-dd (order = dot order left-to-right) */
const EVENTS_BY_DATE: Record<string, EventKind[]> = {
  "2026-03-06": ["appointment", "meeting", "surgery"],
  "2026-03-12": ["meeting", "surgery"],
  "2026-03-25": ["appointment", "appointment", "meeting", "surgery"],
  "2026-03-30": ["meeting"],
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

function inclusiveRangeDayCount(from: Date, to: Date) {
  return differenceInCalendarDays(to, from) + 1;
}

export function CalendarWidget() {
  const [viewMonth, setViewMonth] = useState(() => new Date(2026, 2, 1));

  const [range, setRange] = useState<{ from: Date; to: Date } | null>({
    from: startOfDay(new Date(2026, 2, 4)),
    to: startOfDay(new Date(2026, 2, 19)),
  });

  const [rangeAnchor, setRangeAnchor] = useState<Date | null>(null);

  const cells = useMemo(() => buildMonthCells(viewMonth), [viewMonth]);

  const selectedCount =
    range != null ? inclusiveRangeDayCount(range.from, range.to) : 0;

  const monthLabel = format(viewMonth, "MMMM yyyy");

  function handleDayClick(raw: Date) {
    const d = startOfDay(raw);

    if (rangeAnchor !== null) {
      const from = rangeAnchor <= d ? rangeAnchor : d;
      const to = rangeAnchor <= d ? d : rangeAnchor;
      setRange({ from, to });
      setRangeAnchor(null);
      return;
    }

    setRangeAnchor(d);
    setRange({ from: d, to: d });
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
          {range != null && (
            <div className="text-right">
              <p className="font-mono text-xs font-medium tabular-nums tracking-tight text-foreground">
                {selectedCount} {selectedCount === 1 ? "day" : "days"} selected
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

              const inSelectedRange =
                range != null &&
                isWithinInterval(startOfDay(date), {
                  start: range.from,
                  end: range.to,
                });

              const isStart = range != null && isSameDay(date, range.from);
              const isEnd = range != null && isSameDay(date, range.to);
              const isEndpoint = isStart || isEnd;
              const inRangeMiddle = inSelectedRange && !isEndpoint;

              const events = EVENTS_BY_DATE[key];

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleDayClick(date)}
                  className={cn(
                    "relative flex min-h-[3rem] flex-col items-center justify-center gap-1 px-0.5 py-2 font-mono text-[12px] tabular-nums transition-colors duration-150",
                    !inMonth &&
                      cn("pointer-events-none text-muted-foreground/40"),
                    inMonth && !inSelectedRange && "text-foreground",
                    inMonth && !inSelectedRange && "bg-card",
                    inRangeMiddle &&
                      "bg-primary/10 text-foreground hover:bg-primary/15",
                    !inRangeMiddle &&
                      inMonth &&
                      inSelectedRange &&
                      "text-foreground",
                    isEndpoint &&
                      "z-[1] bg-primary text-primary-foreground shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)] hover:bg-primary/92",
                    inMonth && !inSelectedRange && "hover:bg-muted/50",
                    inMonth &&
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  )}
                >
                  <span
                    className={cn(
                      "leading-none",
                      isEndpoint && "font-semibold"
                    )}
                  >
                    {dayNum}
                  </span>
                  {inMonth && events && events.length > 0 && (
                    <span className="flex h-2 items-center justify-center gap-0.5">
                      {events.map((ev, evi) => (
                        <span
                          key={`${key}-${evi}`}
                          className={cn(
                            "size-1.5 shrink-0 rounded-full",
                            EVENT_DOT[ev],
                            isEndpoint && "ring-1 ring-primary-foreground/35"
                          )}
                          aria-hidden
                        />
                      ))}
                    </span>
                  )}
                </button>
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
