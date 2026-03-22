/**
 * HealthHub service worker
 *
 * Local notifications: the app posts { type: "SHOW_NOTIFICATION" } from a
 * controlled page after Notification permission is granted; this handler
 * calls registration.showNotification().
 *
 * Push notifications (server-driven) would add:
 *   self.addEventListener("push", (event) => { ... showNotification ... })
 * plus a push subscription from the client and a backend using VAPID keys.
 */

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SHOW_NOTIFICATION") {
    const { title, body } = event.data.payload;
    const p = self.registration.showNotification(title, {
      body,
      icon: "/icon-192.png",
      badge: "/icon-192.png",
      tag: "healthhub-notification",
      renotify: true,
    });
    if (typeof event.waitUntil === "function") {
      event.waitUntil(p);
    }
  }
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window" }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && "focus" in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow("/dashboard");
      }
    })
  );
});
