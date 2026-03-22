"use client";

import { AppShellSkeleton } from "@/components/shared/shell-skeleton";
import { DashboardPageSkeleton } from "@/components/shared/page-skeletons";

/** Full shell + dashboard content while auth/session is resolving */
export function LoadingSkeleton() {
  return (
    <AppShellSkeleton>
      <DashboardPageSkeleton />
    </AppShellSkeleton>
  );
}
