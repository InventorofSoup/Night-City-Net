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
    if (!("serviceWorker" in navigator) || location.protocol === "file:") return;
    navigator.serviceWorker.register(new URL("service-worker.js", root).href).catch(function () {
      /* The site remains fully usable when registration is unavailable. */
    });
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

    const reset = document.createElement("button");
    reset.type = "button";
    reset.textContent = "Reset This Terminal";

    const status = document.createElement("span");
    status.textContent = "Regional cache: checking";

    tools.append(directory, reset, status);
    document.body.appendChild(tools);

    const dialog = document.createElement("dialog");
    dialog.className = "nc-reset-dialog";
    dialog.innerHTML = '<small>NC.NET LOCAL TERMINAL CONTROL</small><h2>Clear this browser’s campaign state?</h2><p>This removes dismissed alerts, temporary carts, feed preferences, form progress, and cached Night City Net pages from this device. It does not alter the public sites.</p><menu><button type="button" value="cancel">Keep current state</button><button type="button" value="confirm">Clear and reload</button></menu>';
    document.body.appendChild(dialog);

    reset.addEventListener("click", function () {
      if (typeof dialog.showModal === "function") dialog.showModal();
      else if (window.confirm("Clear local Night City Net campaign state from this browser?")) resetTerminal();
    });
    dialog.querySelector('[value="cancel"]').addEventListener("click", function () { dialog.close(); });
    dialog.querySelector('[value="confirm"]').addEventListener("click", resetTerminal);

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then(function () { status.textContent = "Regional cache: active"; });
    } else {
      status.textContent = "Regional cache: unsupported";
    }

    document.documentElement.setAttribute("data-nc-network-tools", "ready");
  }

  registerOfflineCache();
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mountTools, { once: true });
  else mountTools();
}());
