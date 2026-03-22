"use client";

import { HeartIcon, ListIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { useSidebarStore } from "@/stores/sidebar-store";
import { NotificationBell } from "./notification-bell";
import { UserMenu } from "./user-menu";
import { SidebarIcon } from "@phosphor-icons/react";

export function Header() {
  const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);

  return (
    <header className="border-border bg-background flex h-14 shrink-0 items-center justify-between border-b px-4 md:px-6">
      <div className="flex w-full items-center justify-between">
        <Button
          variant="ghost"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
          size="icon"
          className="size-8"
        >
          <SidebarIcon className="size-5" />
        </Button>
      </div>
      <div className="flex items-center gap-2 md:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
          className="size-8"
        >
          <ListIcon className="size-5" />
        </Button>
        <HeartIcon className="text-primary size-5" />
        <span className="font-heading text-sm font-bold">HealthHub</span>
      </div>
      <div className="hidden md:block" />
      <div className="flex items-center gap-2">
        <NotificationBell />
        <UserMenu />
      </div>
    </header>
  );
}
