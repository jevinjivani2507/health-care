"use client";

import { motion, AnimatePresence } from "motion/react";
import { useSidebarStore } from "@/stores/sidebar-store";
import { NavSidebar, NavItemData } from "@/components/navigation";
import ProfileSection from "@/components/navigation/profile-section";
import { XIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

const Sidebar = () => {
  const { isExpanded, toggleSidebar } = useSidebarStore();
  const handleItemClick = (item: NavItemData) => {
    console.log("Navigation item clicked:", item);
    if (item.href) {
      console.log("Navigate to:", item.href);
    }
  };

  return (
    <>
      {/* Backdrop for mobile */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        className={`bg-sidebar border-sidebar-border fixed top-0 left-0 z-50 flex h-screen flex-col overflow-hidden border-r transition-transform duration-300 ease-in-out md:relative md:z-auto md:translate-x-0 ${
          isExpanded ? "translate-x-0" : "-translate-x-full"
        }`}
        animate={{
          width: isExpanded ? "16rem" : "4rem",
        }}
        initial={false}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
      >
        {/* Close button for mobile */}
        {isExpanded && (
          <div className="absolute top-2 right-2 md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="size-8"
            >
              <XIcon className="size-5" />
            </Button>
          </div>
        )}

        <div className="border-border h-14 flex-shrink-0 border-b">
          <ProfileSection isExpanded={isExpanded} userName="ByeWind" />
        </div>

        <div className="scrollbar-hide flex-1 overflow-y-auto px-4 py-4">
          <NavSidebar onItemClick={handleItemClick} isExpanded={isExpanded} />
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
