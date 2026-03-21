"use client";

import React, { useState, useEffect } from "react";
import { CaretRightIcon, CaretDownIcon } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export interface NavItemData {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  children?: NavItemData[];
  isActive?: boolean;
}

interface NavItemProps {
  item: NavItemData;
  level?: number;
  onItemClick?: (item: NavItemData) => void;
  className?: string;
  isExpanded?: boolean;
}

export const NavItem: React.FC<NavItemProps> = ({
  item,
  level = 0,
  onItemClick,
  className,
  isExpanded = true,
}) => {
  const router = useRouter();
  const hasChildren = item.children && item.children.length > 0;

  const hasActiveChild = item.children?.some((child) => child.isActive);
  const [isItemExpanded, setIsItemExpanded] = useState(
    item.isActive || hasActiveChild || false,
  );

  useEffect(() => {
    if (item.isActive || hasActiveChild) {
      setIsItemExpanded(true);
    }
  }, [item.isActive, hasActiveChild]);

  const handleClick = () => {
    if (hasChildren && isExpanded) {
      setIsItemExpanded(!isItemExpanded);
    }

    if (item.href) {
      router.push(item.href);
    }

    onItemClick?.(item);
  };

  const paddingLeft = level === 0 ? 0 : 48;

  return (
    <div className={cn("select-none", className)}>
      <div className="relative">
        {item.isActive && (
          <div className="bg-foreground absolute top-1/2 -left-0.5 h-4 w-1 -translate-y-1/2 rounded-full" />
        )}

        <button
          onClick={handleClick}
          className={cn(
            "hover:bg-muted/50 flex h-8 w-full cursor-pointer items-center rounded-sm py-1 text-sm transition-all duration-200 ease-in-out",
            item.isActive && "bg-muted",
          )}
          style={{ paddingLeft: isExpanded ? `${paddingLeft + 8}px` : "6px" }}
        >
          {hasChildren ? (
            <div
              className={cn(
                "flex h-5 shrink-0 items-center justify-center overflow-hidden transition-all duration-300 ease-in-out",
                isExpanded ? "w-5 opacity-100" : "w-0 opacity-0",
              )}
            >
              {isItemExpanded ? (
                <CaretDownIcon className="text-muted-foreground h-3 w-3 transition-transform duration-200" />
              ) : (
                <CaretRightIcon className="text-muted-foreground h-3 w-3 transition-transform duration-200" />
              )}
            </div>
          ) : (
            <div
              className={cn(
                "flex h-5 shrink-0 items-center justify-center overflow-hidden opacity-0 transition-all duration-300 ease-in-out",
                isExpanded && level === 0 ? "w-7 opacity-100" : "w-0 opacity-0",
              )}
            />
          )}

          {item.icon && (
            <div
              className={cn(
                "flex size-5 shrink-0 items-center justify-center transition-all duration-300 ease-in-out",
                isExpanded && hasChildren ? "ml-2" : "",
              )}
            >
              {item.icon}
            </div>
          )}

          <span
            className={cn(
              "ml-2 flex-1 overflow-hidden text-left whitespace-nowrap transition-all duration-300 ease-in-out",
              isExpanded ? "opacity-100" : "w-0 opacity-0",
            )}
          >
            {item.label}
          </span>
        </button>
      </div>

      {hasChildren && (
        <div
          className={cn(
            "overflow-hidden transition-all duration-300 ease-in-out",
            isItemExpanded && isExpanded
              ? "max-h-[500px] opacity-100"
              : "max-h-0 opacity-0",
          )}
        >
          <div className="mt-1 space-y-1">
            {item.children?.map((child) => (
              <NavItem
                key={child.id}
                item={child}
                level={level + 1}
                onItemClick={onItemClick}
                isExpanded={isExpanded}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
