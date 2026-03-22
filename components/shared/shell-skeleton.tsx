"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Local pulse blocks — avoids hydration edge cases from sharing `Skeleton` across the RSC/client boundary. */
function Shimmer({
  className,
  ...rest
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("animate-pulse rounded-none bg-muted", className)}
      aria-hidden="true"
      {...rest}
    />
  );
}

/** Top bar placeholder: menu + mobile title strip, notifications + user */
export function HeaderSkeleton() {
  return (
    <header className="border-border bg-background flex h-14 w-full shrink-0 items-center justify-between border-b px-4 md:px-6">
      <div className="flex items-center gap-3">
        <Shimmer className="size-8 shrink-0" />
        <div className="flex items-center gap-2 md:hidden">
          <Shimmer className="size-5 shrink-0" />
          <Shimmer className="h-4 w-24" />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Shimmer className="size-8 shrink-0" />
        <Shimmer className="size-8 shrink-0 rounded-full" />
      </div>
    </header>
  );
}

/** Left rail: profile strip + nav section */
export function SidebarSkeleton() {
  return (
    <aside className="bg-sidebar border-sidebar-border flex h-full w-full flex-col border-r">
      <div className="border-sidebar-border flex h-14 shrink-0 items-center gap-3 border-b px-4">
        <Shimmer className="size-8 shrink-0 rounded-full" />
        <div className="min-w-0 flex-1 space-y-1.5">
          <Shimmer className="h-3 w-24" />
          <Shimmer className="h-2 w-16" />
        </div>
      </div>
      <div className="scrollbar-hide flex-1 space-y-3 overflow-y-auto px-4 py-4">
        <Shimmer className="h-3 w-20" />
        <div className="space-y-2 pt-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <Shimmer className="size-5 shrink-0" />
              <Shimmer className="h-3 flex-1" />
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

type AppShellSkeletonProps = {
  children: ReactNode;
};

/**
 * Full dashboard chrome while session or data is loading — mirrors `(dashboard)/layout` structure.
 */
export function AppShellSkeleton({ children }: AppShellSkeletonProps) {
  return (
    <div className="bg-background flex h-screen overflow-hidden">
      <div className="border-sidebar-border hidden w-64 shrink-0 md:block">
        <SidebarSkeleton />
      </div>
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <HeaderSkeleton />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
