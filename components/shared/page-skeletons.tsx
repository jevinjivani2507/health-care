import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

function StatCardSkeleton({ highlight }: { highlight?: boolean }) {
  return (
    <div
      className={cn(
        "border-border space-y-3 border p-4",
        highlight ? "bg-primary/15" : "bg-card"
      )}
    >
      <div className="flex items-center justify-between">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="size-4 rounded-none" />
      </div>
      <Skeleton className="h-8 w-24 max-w-full" />
      <div className="space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-[80%]" />
      </div>
    </div>
  );
}

/** Matches dashboard: stats row → chart + calendar → 3 chart cards → patient table */
export function DashboardPageSkeleton() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCardSkeleton />
        <StatCardSkeleton highlight />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:items-stretch">
        <div className="border-border bg-card space-y-3 border p-4 md:col-span-8">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-[min(240px,40vh)] w-full" />
        </div>
        <div className="border-border bg-card space-y-3 border p-4 md:col-span-4">
          <div className="space-y-1">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-3 w-32" />
          </div>
          <div className="flex justify-between gap-2 pt-2">
            <Skeleton className="size-8 rounded-none" />
            <Skeleton className="h-4 flex-1" />
            <Skeleton className="size-8 rounded-none" />
          </div>
          <div className="grid grid-cols-7 gap-px bg-border pt-2">
            {Array.from({ length: 7 }).map((_, i) => (
              <Skeleton key={`w-${i}`} className="h-3 w-full rounded-none" />
            ))}
            {Array.from({ length: 35 }).map((_, i) => (
              <Skeleton key={`d-${i}`} className="aspect-square w-full rounded-none" />
            ))}
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="border-border bg-card space-y-2 border p-4 md:col-span-4"
          >
            <Skeleton className="h-3 w-28" />
            <Skeleton className="h-2 w-36" />
            <Skeleton className="h-[180px] w-full" />
          </div>
        ))}
      </div>

      <div className="border-border bg-card space-y-4 border p-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-3 w-72 max-w-full" />
        </div>
        <div className="border-border space-y-2 border-t pt-3">
          {Array.from({ length: 5 }).map((_, r) => (
            <div key={r} className="flex flex-wrap items-center gap-3 gap-y-2">
              <Skeleton className="h-3 w-6" />
              <Skeleton className="size-7 shrink-0 rounded-full" />
              <Skeleton className="h-3 w-32" />
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-5 w-16 rounded-none" />
              <Skeleton className="h-3 w-40" />
              <Skeleton className="h-3 w-28" />
              <Skeleton className="size-6 shrink-0 rounded-none" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Operational Insights: header + filters, KPI row, financial + chart, NPS + recovery, bottom row */
export function AnalyticsPageSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-6 w-56 max-w-full" />
          <Skeleton className="h-3 w-80 max-w-full" />
        </div>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-1">
              <Skeleton className="h-2 w-16" />
              <Skeleton className="h-8 w-[130px] rounded-none" />
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="border-border space-y-2 border bg-card p-4">
            <div className="flex items-start justify-between">
              <Skeleton className="h-2 w-28" />
              <Skeleton className="h-4 w-4 rounded-none" />
            </div>
            <Skeleton className="h-7 w-20" />
            <Skeleton className="h-2 w-14" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[340px_1fr]">
        <div className="border-border space-y-4 border bg-primary/20 p-4">
          <div className="flex items-center gap-2">
            <Skeleton className="size-6 rounded-none bg-primary-foreground/20" />
            <Skeleton className="h-2 w-28 bg-primary-foreground/30" />
          </div>
          <Skeleton className="h-5 w-44 bg-primary-foreground/30" />
          <Skeleton className="h-8 w-24 bg-primary-foreground/30" />
          <div className="flex justify-between gap-2">
            <Skeleton className="h-6 w-16 bg-primary-foreground/30" />
            <Skeleton className="h-6 w-20 rounded-none bg-primary-foreground/20" />
          </div>
          <Skeleton className="h-2 w-full bg-primary-foreground/20" />
          <Skeleton className="h-9 w-full rounded-none bg-primary-foreground/30" />
        </div>
        <div className="border-border bg-card space-y-3 border p-4">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-2 w-64 max-w-full" />
          <Skeleton className="h-[220px] w-full" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="border-border bg-card space-y-3 border p-4">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-2 w-48" />
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="border-border flex items-center justify-between border-b py-3 last:border-0"
            >
              <div className="flex items-center gap-2">
                <Skeleton className="size-2 rounded-full" />
                <Skeleton className="h-3 w-24" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-8" />
                <Skeleton className="h-5 w-16 rounded-none" />
              </div>
            </div>
          ))}
        </div>
        <div className="border-border bg-card space-y-3 border p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="space-y-1">
              <Skeleton className="h-4 w-44" />
              <Skeleton className="h-2 w-56" />
            </div>
            <Skeleton className="h-5 w-28 rounded-none" />
          </div>
          <Skeleton className="h-[160px] w-full" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="border-border bg-card space-y-2 border p-4">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-2 w-56" />
          <Skeleton className="h-[200px] w-full" />
        </div>
        <div className="border-border bg-card space-y-2 border p-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <Skeleton className="h-4 w-44" />
              <Skeleton className="h-2 w-52" />
            </div>
            <Skeleton className="h-3 w-20" />
          </div>
          <Skeleton className="h-[200px] w-full" />
        </div>
      </div>
    </div>
  );
}

/** Patients list: page header, search/filter, grid of cards */
export function PatientsPageSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-36" />
          <Skeleton className="h-4 w-40" />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Skeleton className="h-9 w-20 rounded-none" />
          <Skeleton className="h-9 w-28 rounded-none" />
          <Skeleton className="h-9 w-32 rounded-none" />
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Skeleton className="h-10 w-full flex-1 rounded-none" />
        <Skeleton className="h-10 w-full sm:w-40 rounded-none" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="border-border space-y-3 border bg-card p-4">
            <div className="flex items-start gap-3">
              <Skeleton className="size-10 shrink-0 rounded-full" />
              <div className="min-w-0 flex-1 space-y-2">
                <Skeleton className="h-4 w-[75%]" />
                <Skeleton className="h-3 w-full" />
              </div>
            </div>
            <Skeleton className="h-5 w-20 rounded-none" />
            <div className="flex justify-between gap-2">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-3 w-28" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Patient detail: back + title, tabs, 2-column overview */
export function PatientDetailPageSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Skeleton className="size-8 rounded-none" />
        <Skeleton className="h-6 w-40" />
      </div>

      <div className="flex gap-2 border-b border-border pb-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-28 rounded-none" />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[320px_1fr]">
        <div className="space-y-4">
          <div className="border-border space-y-4 border bg-card p-4">
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-start">
              <Skeleton className="size-16 shrink-0 rounded-full" />
              <div className="w-full space-y-2 text-center sm:text-left">
                <Skeleton className="mx-auto h-5 w-40 sm:mx-0" />
                <Skeleton className="mx-auto h-4 w-24 rounded-none sm:mx-0" />
              </div>
            </div>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex justify-between gap-2">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-3 w-32" />
              </div>
            ))}
            <div className="flex flex-wrap gap-2 pt-2">
              <Skeleton className="h-6 w-20 rounded-none" />
              <Skeleton className="h-6 w-24 rounded-none" />
            </div>
          </div>
          <div className="border-border space-y-3 border bg-card p-4">
            <Skeleton className="h-4 w-32" />
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-2 border-b border-border pb-3 last:border-0">
                <Skeleton className="h-3 w-[66%]" />
                <Skeleton className="h-3 w-full" />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="border-border space-y-2 border bg-card p-3">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-2 w-12" />
              </div>
            ))}
          </div>
          <div className="border-border space-y-3 border bg-card p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <Skeleton className="h-4 w-48" />
              <div className="flex gap-1">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-7 w-20 rounded-none" />
                ))}
              </div>
            </div>
            <Skeleton className="h-[200px] w-full" />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="border-border space-y-3 border bg-card p-4">
              <Skeleton className="h-4 w-20" />
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between gap-2">
                    <Skeleton className="h-3 w-8" />
                    <Skeleton className="h-3 w-10" />
                  </div>
                  <Skeleton className="h-2 w-full" />
                </div>
              ))}
            </div>
            <div className="border-border space-y-3 border bg-card p-4">
              <Skeleton className="h-4 w-28" />
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="size-10 shrink-0 rounded-full" />
                  <div className="min-w-0 flex-1 space-y-1">
                    <Skeleton className="h-3 w-36" />
                    <Skeleton className="h-2 w-16" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
