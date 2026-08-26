"use strict";

const CACHE = "night-city-net-2045-v2";
const ROOT = new URL("./", self.location.href).pathname;
const CORE = [
  ROOT,
  ROOT + "index.html",
  ROOT + "styles.css",
  ROOT + "webring.html",
  ROOT + "sitemap.html",
  ROOT + "404.html",
  ROOT + "shared/site-directory.js",
  ROOT + "shared/network-tools.css",
  ROOT + "shared/network-tools.js"
];

self.addEventListener("install", function (event) {
  event.waitUntil(caches.open(CACHE).then(function (cache) {
    return Promise.all(CORE.map(function (url) {
      return fetch(url, { cache: "reload" }).then(function (response) {
        if (!response.ok) throw new Error("Core file unavailable: " + url);
        return cache.put(url, response);
      }).catch(function (error) {
        console.warn("Night City Net offline cache skipped a core file.", error);
      });
    }));
  }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener("activate", function (event) {
  event.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (key) { return key.indexOf("night-city-net-") === 0 && key !== CACHE; }).map(function (key) { return caches.delete(key); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener("fetch", function (event) {
  const request = event.request;
  if (request.method !== "GET") return;
  if (request.headers.has("range")) return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(fetch(request).then(function (response) {
      const copy = response.clone();
      if (!response.ok) return response;
      return caches.open(CACHE).then(function (cache) {
        return cache.put(request, copy);
      }).catch(function () {
        /* Navigation should still succeed when storage is restricted. */
      }).then(function () { return response; });
    }).catch(function () {
      return caches.match(request, { ignoreSearch: true }).then(function (cached) {
        return cached || caches.match(ROOT + "404.html");
      });
    }));
    return;
  }

  const refreshed = fetch(request).then(function (response) {
    if (!response.ok || response.type !== "basic") return response;
    const copy = response.clone();
    return caches.open(CACHE).then(function (cache) {
      return cache.put(request, copy);
    }).catch(function () {
      /* Assets remain available online when storage is restricted. */
    }).then(function () { return response; });
  });
  event.waitUntil(refreshed.catch(function () { /* Offline requests may have no fresh response. */ }));

  event.respondWith(caches.match(request).then(function (cached) {
    return cached || refreshed;
  }));
});
