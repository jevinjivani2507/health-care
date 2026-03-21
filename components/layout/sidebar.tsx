"use client";

import { motion } from "motion/react";
import { Heart, CaretLeft, CaretRight } from "@phosphor-icons/react";
import { sidebarVariants } from "@/lib/animations";
import { NAV_ITEMS, APP_NAME } from "@/lib/constants";
import { useUIStore } from "@/stores/ui-store";
import { SidebarNavItem } from "./sidebar-nav-item";
import { Button } from "@/components/ui/button";

export function Sidebar() {
  const { sidebarCollapsed, toggleSidebar } = useUIStore();

  return (
    <motion.aside
      variants={sidebarVariants}
      animate={sidebarCollapsed ? "collapsed" : "expanded"}
      className="hidden md:flex flex-col border-r border-sidebar-border bg-sidebar shrink-0 overflow-hidden"
    >
      <div className="flex items-center gap-2 px-4 h-14 border-b border-sidebar-border">
        <Heart weight="fill" className="h-5 w-5 text-primary shrink-0" />
        {!sidebarCollapsed && (
          <span className="font-heading font-bold text-base truncate">
            {APP_NAME}
          </span>
        )}
      </div>

      <nav className="flex-1 py-3 space-y-1 px-2">
        {NAV_ITEMS.map((item) => (
          <SidebarNavItem
            key={item.href}
            href={item.href}
            label={item.label}
            icon={item.icon}
            collapsed={sidebarCollapsed}
          />
        ))}
      </nav>

      <div className="border-t border-sidebar-border p-2">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={toggleSidebar}
          className="w-full"
          aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {sidebarCollapsed ? (
            <CaretRight className="h-4 w-4" />
          ) : (
            <CaretLeft className="h-4 w-4" />
          )}
        </Button>
      </div>
    </motion.aside>
  );
}
