"use client";

import { useEffect } from "react";

/**
 * Registers the app service worker once so local/OS notifications and SW
 * messaging work from any route (not only where useNotifications mounts).
 */
export function ServiceWorkerRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("/sw.js").catch(() => {
      // Registration can fail in dev or unsupported contexts; app still works without SW
    });
  }, []);

  return null;
}
