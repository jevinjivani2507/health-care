"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { useUIStore } from "@/stores/ui-store";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { MobileSidebar } from "@/components/layout/mobile-sidebar";
import { LoadingSkeleton } from "@/components/shared/loading-skeleton";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const { sidebarCollapsed, toggleSidebar } = useUIStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  // Wire mobile sidebar toggle from the header's hamburger
  // The header calls toggleSidebar which we intercept for mobile
  useEffect(() => {
    // On mobile, subscribe to sidebar toggle for mobile behavior
    const unsubscribe = useUIStore.subscribe((state, prevState) => {
      if (state.sidebarCollapsed !== prevState.sidebarCollapsed) {
        if (window.innerWidth < 768) {
          setMobileOpen((prev) => !prev);
          // Revert the desktop state since this was meant for mobile
          // We want to keep the state separate
        }
      }
    });
    return unsubscribe;
  }, []);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <MobileSidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
