const CACHE_NAME = "minuteur-cache-v1";
const urlsToCache = [
  "./index.html",
  "./style.css",
  "./index.js",
  "./icon-app.png",
  "./manifest.json"
];

// Install event: cache app shell
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting(); // active immédiatement la nouvelle version
});

// Activate event: cleanup old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim(); // prend le contrôle sans attendre
});

// Fetch event: serve from cache, fallback to network + offline fallback
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return (
        response ||
        fetch(event.request).catch(() => {
          // fallback: si hors-ligne et ressource introuvable
          if (event.request.mode === "navigate") {
            return caches.match("./index.html");
          }
        })
      );
    })
  );
});
