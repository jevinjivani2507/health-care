"use client";

import { useCallback } from "react";
import { useNotificationStore } from "@/stores/notification-store";
import type { AppNotification, NotificationType } from "@/types";

async function postShowNotificationToServiceWorker(title: string, body: string) {
  if (!("serviceWorker" in navigator)) return;
  try {
    const registration = await navigator.serviceWorker.ready;
    const worker = registration.active ?? navigator.serviceWorker.controller;
    if (!worker) return;
    worker.postMessage({
      type: "SHOW_NOTIFICATION",
      payload: { title, body },
    });
  } catch {
    // SW not available or message failed
  }
}

export function useNotifications() {
  const { addNotification } = useNotificationStore();

  const requestPermission = useCallback(async () => {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission();
      return permission === "granted";
    }
    return false;
  }, []);

  const sendLocalNotification = useCallback(
    (
      title: string,
      message: string,
      type: NotificationType = "system",
      patientId?: string,
    ) => {
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

      // OS notification via service worker (requires permission)
      if (
        typeof window !== "undefined" &&
        "Notification" in window &&
        Notification.permission === "granted"
      ) {
        void postShowNotificationToServiceWorker(title, message);
      }
    },
    [addNotification],
  );

  return { requestPermission, sendLocalNotification };
}
