"use strict";

const CACHE = "night-city-net-2045-v1";
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
  event.waitUntil(caches.open(CACHE).then(function (cache) { return cache.addAll(CORE); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener("activate", function (event) {
  event.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (key) { return key.indexOf("night-city-net-") === 0 && key !== CACHE; }).map(function (key) { return caches.delete(key); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener("fetch", function (event) {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(fetch(request).then(function (response) {
      const copy = response.clone();
      if (response.ok) caches.open(CACHE).then(function (cache) { cache.put(request, copy); });
      return response;
    }).catch(function () {
      return caches.match(request, { ignoreSearch: true }).then(function (cached) {
        return cached || caches.match(ROOT + "404.html");
      });
    }));
    return;
  }

  event.respondWith(caches.match(request, { ignoreSearch: true }).then(function (cached) {
    if (cached) return cached;
    return fetch(request).then(function (response) {
      if (response.ok && response.type === "basic") {
        const copy = response.clone();
        caches.open(CACHE).then(function (cache) { cache.put(request, copy); });
      }
      return response;
    });
  }));
});
