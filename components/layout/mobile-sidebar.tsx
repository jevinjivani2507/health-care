"use client";

import { AnimatePresence, motion } from "motion/react";
import { Heart, X } from "@phosphor-icons/react";
import { NAV_ITEMS, APP_NAME } from "@/lib/constants";
import { SidebarNavItem } from "./sidebar-nav-item";
import { Button } from "@/components/ui/button";

interface MobileSidebarProps {
  open: boolean;
  onClose: () => void;
}

export function MobileSidebar({ open, onClose }: MobileSidebarProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: -256 }}
            animate={{ x: 0 }}
            exit={{ x: -256 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed left-0 top-0 bottom-0 w-64 bg-sidebar border-r border-sidebar-border z-50 md:hidden flex flex-col"
          >
            <div className="flex items-center justify-between px-4 h-14 border-b border-sidebar-border">
              <div className="flex items-center gap-2">
                <Heart weight="fill" className="h-5 w-5 text-primary" />
                <span className="font-heading font-bold text-base">{APP_NAME}</span>
              </div>
              <Button variant="ghost" size="icon-sm" onClick={onClose} aria-label="Close sidebar">
                <X className="h-4 w-4" />
              </Button>
            </div>
            <nav className="flex-1 py-3 space-y-1 px-2">
              {NAV_ITEMS.map((item) => (
                <SidebarNavItem
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  icon={item.icon}
                  collapsed={false}
                />
              ))}
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
