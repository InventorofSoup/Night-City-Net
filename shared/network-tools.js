(function () {
  "use strict";

  if (document.documentElement.hasAttribute("data-nc-network-tools")) return;
  document.documentElement.setAttribute("data-nc-network-tools", "loading");

  const loader = document.currentScript;
  const sharedBase = loader && loader.src ? new URL(".", loader.src) : new URL("shared/", location.href);
  const root = new URL("../", sharedBase);
  const stylesheet = document.createElement("link");
  stylesheet.rel = "stylesheet";
  stylesheet.href = new URL("network-tools.css?v=2045-01", sharedBase).href;
  document.head.appendChild(stylesheet);

  function registerOfflineCache() {
    if (!("serviceWorker" in navigator)) return Promise.resolve("unsupported");
    if (location.protocol === "file:") return Promise.resolve("online-only");
    return navigator.serviceWorker.register(new URL("service-worker.js", root).href)
      .then(function () { return navigator.serviceWorker.ready; })
      .then(function () { return "active"; })
      .catch(function () { return "unavailable"; });
  }

  function resetTerminal() {
    try { localStorage.clear(); } catch (error) { /* Storage may be restricted. */ }
    try { sessionStorage.clear(); } catch (error) { /* Storage may be restricted. */ }
    if ("caches" in window) {
      caches.keys().then(function (keys) {
        return Promise.all(keys.filter(function (key) { return key.indexOf("night-city-net-") === 0; }).map(function (key) { return caches.delete(key); }));
      }).finally(function () { location.reload(); });
    } else {
      location.reload();
    }
  }

  function mountTools() {
    if (document.querySelector(".nc-network-tools")) return;

    const tools = document.createElement("nav");
    tools.className = "nc-network-tools";
    tools.setAttribute("aria-label", "Night City Net utilities");

    const directory = document.createElement("a");
    directory.href = root.href;
    directory.textContent = "← Night City Net Directory";
    if (location.pathname === root.pathname || location.pathname === root.pathname + "index.html") {
      directory.textContent = "Night City Net Directory";
      directory.setAttribute("aria-current", "page");
    }

    const reset = document.createElement("button");
    reset.type = "button";
    reset.textContent = "Clear All Local NC.NET State";

    const status = document.createElement("span");
    status.textContent = "Regional cache: checking";
    status.setAttribute("role", "status");
    status.setAttribute("aria-live", "polite");

    tools.append(directory, reset, status);
    document.body.appendChild(tools);

    const dialog = document.createElement("dialog");
    dialog.className = "nc-reset-dialog";
    dialog.setAttribute("aria-labelledby", "nc-reset-title");
    dialog.innerHTML = '<small>NC.NET LOCAL TERMINAL CONTROL</small><h2 id="nc-reset-title">Clear all local Night City Net state?</h2><p>This removes dismissed alerts, temporary carts, feed preferences, form progress, and locally stored Night City Net pages from this device. The regional cache will rebuild as pages are revisited. Public site data is never changed.</p><menu><button type="button" value="cancel">Keep current state</button><button type="button" value="confirm">Clear and reload</button></menu>';
    document.body.appendChild(dialog);

    reset.addEventListener("click", function () {
      if (typeof dialog.showModal === "function") dialog.showModal();
      else if (window.confirm("Clear local Night City Net campaign state from this browser?")) resetTerminal();
    });
    dialog.querySelector('[value="cancel"]').addEventListener("click", function () { dialog.close(); });
    dialog.querySelector('[value="confirm"]').addEventListener("click", resetTerminal);
    dialog.addEventListener("close", function () { reset.focus(); });

    offlineState.then(function (state) {
      const labels = {
        active: "Regional cache: active",
        unavailable: "Regional cache: unavailable",
        unsupported: "Regional cache: unsupported",
        "online-only": "Regional cache: online preview"
      };
      status.textContent = labels[state] || "Regional cache: unavailable";
    });

    document.documentElement.setAttribute("data-nc-network-tools", "ready");
  }

  const offlineState = registerOfflineCache();
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mountTools, { once: true });
  else mountTools();
}());
