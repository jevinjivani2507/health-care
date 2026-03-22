"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bell } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { bellShake } from "@/lib/animations";
import { useNotificationStore } from "@/stores/notification-store";
import { cn } from "@/lib/utils";

export function NotificationBell() {
  const { notifications, unreadCount, markAsRead, markAllAsRead } =
    useNotificationStore();
  const [open, setOpen] = useState(false);
  const [shouldShake, setShouldShake] = useState(false);

  useEffect(() => {
    if (unreadCount > 0) {
      setShouldShake(true);
      const timer = setTimeout(() => setShouldShake(false), 700);
      return () => clearTimeout(timer);
    }
  }, [unreadCount]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const typeColors: Record<string, string> = {
    "patient-alert": "text-destructive",
    appointment: "text-chart-2",
    system: "text-muted-foreground",
    "lab-result": "text-chart-4",
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => setOpen(!open)}
        className="relative"
        aria-label="Notifications"
      >
        <motion.div
          variants={bellShake}
          animate={shouldShake ? "shake" : "idle"}
        >
          <Bell className="h-5 w-5" />
        </motion.div>
        {unreadCount > 0 && (
          <span className="bg-destructive text-destructive-foreground absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center text-[10px] font-bold">
            {unreadCount}
          </span>
        )}
      </Button>

      <AnimatePresence>
        {open && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
              className="bg-popover border-border absolute top-full right-0 z-50 mt-2 w-80 border shadow-lg"
              onPointerDown={(e) => e.stopPropagation()}
            >
              <div className="border-border flex items-center justify-between border-b p-3">
                <span className="text-sm font-medium">Notifications</span>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-primary text-xs hover:underline"
                  >
                    Mark all as read
                  </button>
                )}
              </div>
              <ScrollArea className="h-80">
                {notifications.length === 0 ? (
                  <p className="text-muted-foreground p-4 text-center text-sm">
                    No notifications
                  </p>
                ) : (
                  <div>
                    {notifications.map((n) => (
                      <button
                        key={n.id}
                        onClick={() => markAsRead(n.id)}
                        className={cn(
                          "border-border hover:bg-muted/50 w-full border-b p-3 text-left transition-colors last:border-0",
                          !n.read && "bg-muted/30",
                        )}
                      >
                        <div className="flex items-start gap-2">
                          {!n.read && (
                            <span className="bg-primary mt-1.5 h-2 w-2 shrink-0" />
                          )}
                          <div className="min-w-0 flex-1">
                            <p
                              className={cn(
                                "text-xs font-medium",
                                typeColors[n.type],
                              )}
                            >
                              {n.title}
                            </p>
                            <p className="text-muted-foreground mt-0.5 line-clamp-2 text-xs">
                              {n.message}
                            </p>
                            <p className="text-muted-foreground mt-1 text-[10px]">
                              {new Date(n.timestamp).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  hour: "numeric",
                                  minute: "2-digit",
                                },
                              )}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
