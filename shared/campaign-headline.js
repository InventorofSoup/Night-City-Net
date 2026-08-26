(function () {
  "use strict";
  if (!window.NCNCampaign || !location.pathname.includes("/network-54/")) return;

  function escape(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (character) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[character];
    });
  }

  function mount() {
    if (document.querySelector(".nc54-regional-insert")) return;
    const state = window.NCNCampaign.get();
    const insert = document.createElement("aside");
    insert.className = "nc54-regional-insert";
    insert.setAttribute("aria-label", "Game Master regional desk insert");
    insert.innerHTML = '<span>54 REGIONAL DESK // ' + escape(state.date) + ' ' + escape(state.time) + '</span><b>' + escape(state.headlines.network54) + '</b><small>' + escape(state.event.active ? state.event.detail : "No active regional notice.") + '</small>';
    const style = document.createElement("style");
    style.textContent = '.nc54-regional-insert{display:grid;grid-template-columns:190px minmax(0,1fr) minmax(220px,.7fr);gap:18px;align-items:center;margin:0;padding:14px clamp(18px,4vw,58px);color:#fff;background:#171522;border-top:1px solid #514965;border-bottom:1px solid #514965}.nc54-regional-insert span{color:#dbc36f;font:700 10px/1.4 Arial,sans-serif;letter-spacing:.08em}.nc54-regional-insert b{font:800 14px/1.35 Arial,sans-serif}.nc54-regional-insert small{color:#bab5c4;font:11px/1.45 Arial,sans-serif}@media(max-width:760px){.nc54-regional-insert{grid-template-columns:1fr;gap:6px}}';
    document.head.appendChild(style);
    const ticker = document.querySelector(".ticker");
    if (ticker) ticker.insertAdjacentElement("afterend", insert);
    else (document.querySelector("header") || document.body).appendChild(insert);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount, { once: true });
  else mount();
}());
