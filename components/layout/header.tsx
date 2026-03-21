"use client";

import { Heart, List } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { useUIStore } from "@/stores/ui-store";
import { NotificationBell } from "./notification-bell";
import { UserMenu } from "./user-menu";

export function Header() {
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);

  return (
    <header className="flex items-center justify-between h-14 px-4 md:px-6 border-b border-border bg-background shrink-0">
      <div className="flex items-center gap-2 md:hidden">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <List className="h-5 w-5" />
        </Button>
        <Heart weight="fill" className="h-5 w-5 text-primary" />
        <span className="font-heading font-bold text-sm">HealthHub</span>
      </div>
      <div className="hidden md:block" />
      <div className="flex items-center gap-2">
        <NotificationBell />
        <UserMenu />
      </div>
    </header>
  );
}
