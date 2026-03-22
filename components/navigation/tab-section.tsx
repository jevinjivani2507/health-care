"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { dashboardItems } from "@/constants/sidebar-tabs";

export interface TabItem {
  id: string;
  label: string;
  href?: string;
}

export interface Tab {
  id: string;
  label: string;
  items: TabItem[];
}

export interface TabSectionProps {
  isExpanded: boolean;
  onItemClick?: (item: TabItem) => void;
  className?: string;
}

export const TabSection = ({
  isExpanded,
  onItemClick,
  className,
}: TabSectionProps) => {
  const router = useRouter();

  const handleItemClick = (item: TabItem) => {
    if (item.href) {
      router.push(item.href);
    }
    onItemClick?.(item);
  };

  return (
    <div
      className={cn(
        "w-full transition-all duration-300",
        className,
        isExpanded ? "mb-6" : "",
      )}
    >
      {/* Tab Content */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isExpanded ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="space-y-1 pb-3">
          {dashboardItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item)}
              className="text-muted-foreground hover:text-foreground hover:bg-muted flex h-8 w-full items-center rounded-sm px-4 text-sm transition-all duration-200 ease-in-out"
            >
              <span className="bg-secondary size-1 rounded-full" />
              <span
                className={cn(
                  "ml-2 overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out",
                  isExpanded ? "w-auto opacity-100" : "w-0 opacity-0",
                )}
              >
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
