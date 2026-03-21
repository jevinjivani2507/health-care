"use client";

import { useEffect, useCallback } from "react";
import { useNotificationStore } from "@/stores/notification-store";
import type { AppNotification, NotificationType } from "@/types";

export function useNotifications() {
  const { addNotification } = useNotificationStore();

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // SW registration failed silently
      });
    }
  }, []);

  const requestPermission = useCallback(async () => {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission();
      return permission === "granted";
    }
    return false;
  }, []);

  const sendLocalNotification = useCallback(
    (title: string, message: string, type: NotificationType = "system", patientId?: string) => {
      const notification: AppNotification = {
        id: `n-${Date.now()}`,
        type,
        title,
        message,
        timestamp: new Date().toISOString(),
        read: false,
        patientId,
      };

      addNotification(notification);

      // Send to service worker for OS notification
      if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
          type: "SHOW_NOTIFICATION",
          payload: { title, body: message },
        });
      }
    },
    [addNotification]
  );

  return { requestPermission, sendLocalNotification };
}
