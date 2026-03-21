"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { NavItem, NavItemData } from "./navigation-item";

export interface NavSectionProps {
  title: string;
  items: NavItemData[];
  onItemClick?: (item: NavItemData) => void;
  className?: string;
  isExpanded?: boolean;
}

export const NavSection: React.FC<NavSectionProps> = ({
  title,
  items,
  onItemClick,
  className,
  isExpanded = true,
}) => {
  return (
    <div className={cn("mb-6 w-full transition-all duration-300", className)}>
      <h3 className="text-muted-foreground/80 relative mb-3 h-4 px-2 text-sm font-medium tracking-wider">
        <span
          className={cn(
            "absolute top-0 left-2 transition-opacity duration-300 ease-in-out",
            isExpanded ? "opacity-100" : "pointer-events-none opacity-0",
          )}
        >
          {title}
        </span>
        <span
          className={cn(
            "absolute top-0 left-2 pl-1 transition-opacity duration-300 ease-in-out",
            !isExpanded ? "opacity-100" : "pointer-events-none opacity-0",
          )}
        >
          {title.charAt(0)}
        </span>
      </h3>

      <div className="space-y-1">
        {items.map((item) => (
          <NavItem
            key={item.id}
            item={item}
            onItemClick={onItemClick}
            isExpanded={isExpanded}
          />
        ))}
      </div>
    </div>
  );
};
