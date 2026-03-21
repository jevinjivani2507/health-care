"use client";

import { SquaresFour, ListBullets } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { usePatientStore } from "@/stores/patient-store";
import { cn } from "@/lib/utils";

export function PatientViewToggle() {
  const { viewMode, setViewMode } = usePatientStore();

  return (
    <div className="flex border border-border">
      <Button
        variant={viewMode === "grid" ? "default" : "ghost"}
        size="icon-sm"
        onClick={() => setViewMode("grid")}
        aria-label="Grid view"
        className={cn("rounded-none")}
      >
        <SquaresFour className="h-4 w-4" />
      </Button>
      <Button
        variant={viewMode === "list" ? "default" : "ghost"}
        size="icon-sm"
        onClick={() => setViewMode("list")}
        aria-label="List view"
        className={cn("rounded-none border-l border-border")}
      >
        <ListBullets className="h-4 w-4" />
      </Button>
    </div>
  );
}
