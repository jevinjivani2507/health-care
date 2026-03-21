"use client";

import React, { useMemo } from "react";
import { usePathname } from "next/navigation";
import { NavSection } from "./navigation-section";
import { NavItemData } from "./navigation-item";
import { dashboardItems } from "@/constants/sidebar-tabs";
import { cn } from "@/lib/utils";

export interface NavSidebarProps {
  onItemClick?: (item: NavItemData) => void;
  className?: string;
  isExpanded?: boolean;
}

// Helper function to mark active items based on pathname
const markActiveItems = (
  items: NavItemData[],
  pathname: string
): NavItemData[] => {
  return items.map((item) => {
    const isActive = item.href === pathname;
    const children = item.children?.map((child) => ({
      ...child,
      isActive: child.href === pathname,
    }));

    return {
      ...item,
      isActive,
      children,
    };
  });
};

export const NavSidebar: React.FC<NavSidebarProps> = ({
  onItemClick,
  className,
  isExpanded = true,
}) => {
  const pathname = usePathname();

  const activeDashboardItems = useMemo(
    () => markActiveItems(dashboardItems, pathname),
    [pathname]
  );

  return (
    <div
      className={cn(
        "flex h-full flex-col transition-all duration-300",
        className
      )}
    >
      <NavSection
        title="Dashboards"
        items={activeDashboardItems}
        onItemClick={onItemClick}
        isExpanded={isExpanded}
      />
    </div>
  );
};
