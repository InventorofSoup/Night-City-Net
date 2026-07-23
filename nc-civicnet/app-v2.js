// ---- shared "notice" modal, used by almost every form/button on the site ----
function showNotice(title, body, code) {
  const backdrop = document.querySelector("#notice-backdrop");
  if (!backdrop) return;
  backdrop.querySelector("h2").textContent = title;
  backdrop.querySelector("p").textContent = body;
  const codeEl = backdrop.querySelector("code");
  if (code) { codeEl.textContent = code; codeEl.hidden = false; } else { codeEl.hidden = true; }
  const loginBtn = backdrop.querySelector(".restricted-login");
  loginBtn.hidden = !(code && code.startsWith("NCCN-DATA-401"));
  backdrop.hidden = false;
}
function closeNotice() {
  const backdrop = document.querySelector("#notice-backdrop");
  if (backdrop) backdrop.hidden = true;
}
document.addEventListener("DOMContentLoaded", function () {
  const backdrop = document.querySelector("#notice-backdrop");
  if (backdrop) {
    backdrop.addEventListener("click", function (e) { if (e.target === backdrop) closeNotice(); });
    backdrop.querySelectorAll("button").forEach(function (b) {
      if (!b.classList.contains("restricted-login")) b.addEventListener("click", closeNotice);
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !backdrop.hidden) closeNotice(); });
  }

  // restricted record buttons
  document.querySelectorAll("[data-restricted]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      showNotice("Sign-in Required", (btn.dataset.restricted || "This record") + " is not available through Public Access. Sign in with an authorized municipal, district, contractor, property-owner, or corporate account to request this file.", "NCCN-DATA-401 • VERIFIED RECORD ACCESS REQUIRED");
    });
  });

  // generic forms that just produce a canned notice on submit
  document.querySelectorAll("[data-notice-title]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      showNotice(form.dataset.noticeTitle, form.dataset.noticeBody, form.dataset.noticeCode || "");
    });
  });
  document.querySelectorAll("[data-notice-btn]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      showNotice(btn.dataset.noticeTitle, btn.dataset.noticeBody, btn.dataset.noticeCode || "");
    });
  });

  // NORA
  const noraBtn = document.querySelector(".nora-btn");
  if (noraBtn) {
    const nora = document.querySelector(".nora");
    noraBtn.addEventListener("click", function () { nora.hidden = !nora.hidden; });
    nora.querySelector("button").addEventListener("click", function () { nora.hidden = true; });
  }

  // tabs (guide / gov-tabs / district page tabs)
  document.querySelectorAll("[data-tabgroup]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const group = btn.dataset.tabgroup, target = btn.dataset.tab;
      document.querySelectorAll('[data-tabgroup="' + group + '"]').forEach(function (b) { b.classList.toggle("active", b === btn); });
      document.querySelectorAll('[data-tabpanel="' + group + '"]').forEach(function (p) { p.hidden = p.dataset.panel !== target; });
    });
  });

  // multi-alert rotating emergency popup (home page only)
  const alertBackdrop = document.querySelector(".alert-backdrop");
  if (alertBackdrop && typeof popupAlerts !== "undefined") {
    let idx = 0;
    const already = sessionStorage.getItem("ncmip-alert-dismissed") === "1";
    function renderPopup() {
      const a = popupAlerts[idx];
      alertBackdrop.querySelector(".popup-index").textContent = "NOTICE " + (idx + 1) + " OF " + popupAlerts.length;
      alertBackdrop.querySelector(".popup-severity").textContent = a.severity.toUpperCase() + " • " + a.category.toUpperCase();
      alertBackdrop.querySelector(".popup-title").textContent = a.title;
      alertBackdrop.querySelector(".popup-detail").textContent = a.detail;
      alertBackdrop.querySelector(".popup-district").textContent = a.district;
      alertBackdrop.querySelector(".popup-agency").textContent = a.agency;
      alertBackdrop.querySelector(".popup-verified").textContent = a.verified ? "VERIFIED MUNICIPAL FEED" : "UNVERIFIED / CONTRACTOR DATA";
      const instr = a.category === "Water" ? "Do not rely on color or odor to determine water safety. Use contracted potable sources where available." : a.category === "Weather" ? "Avoid exposed metal, damaged garment seals, and unprotected street-level travel after 19:00." : "Allow additional travel time. Do not wait on bypassed platforms after a security announcement.";
      alertBackdrop.querySelector(".popup-instruction-text").textContent = instr;
      alertBackdrop.className = "alert-backdrop";
      alertBackdrop.querySelector(".alert-popup").className = "alert-popup popup-" + a.severity;
      alertBackdrop.querySelector(".next-btn").textContent = idx < popupAlerts.length - 1 ? "Next notice →" : "Return to first";
    }
    if (!already) {
      window.setTimeout(function () { renderPopup(); alertBackdrop.hidden = false; }, 850);
    }
    alertBackdrop.querySelector(".next-btn").addEventListener("click", function () { idx = (idx + 1) % popupAlerts.length; renderPopup(); });
    function dismissPopup() {
      const mute = alertBackdrop.querySelector(".mute-alert input").checked;
      if (mute) sessionStorage.setItem("ncmip-alert-dismissed", "1");
      alertBackdrop.hidden = true;
    }
    alertBackdrop.querySelector(".dismiss-alert").addEventListener("click", dismissPopup);
    alertBackdrop.querySelector(".close-x").addEventListener("click", dismissPopup);
  }

  // accessibility / text-size / language utility bar controls
  const accBtn = document.querySelector("#acc-toggle");
  if (accBtn) accBtn.addEventListener("click", function () {
    const on = document.body.classList.toggle("accessible-mode");
    accBtn.setAttribute("aria-pressed", String(on));
    accBtn.textContent = "Accessibility: " + (on ? "ON" : "OFF");
  });
  const langBtn = document.querySelector("#lang-toggle");
  if (langBtn) langBtn.addEventListener("click", function () {
    showNotice(
      "Language Service Unavailable",
      "The contracted Spanish-language portal is not synchronized with this public terminal. Telephone interpretation may be requested during staffed municipal hours; connection, accuracy, and response are not guaranteed.",
      "NCCN-LANG-503 • PARTIAL TRANSLATION SERVICE"
    );
  });
  const aMinus = document.querySelector("#text-minus"), aPlus = document.querySelector("#text-plus");
  let scale = 100;
  function applyScale() { document.documentElement.style.fontSize = scale + "%"; }
  if (aMinus) aMinus.addEventListener("click", function () { scale = Math.max(85, scale - 10); applyScale(); });
  if (aPlus) aPlus.addEventListener("click", function () { scale = Math.min(130, scale + 10); applyScale(); });
  const printBtn = document.querySelector("#print-btn");
  if (printBtn) printBtn.addEventListener("click", function () { window.print(); });

  // populate + wire the header "jump to district" dropdown
  const jumpSelect = document.querySelector(".district-jump");
  if (jumpSelect && typeof districts !== "undefined") {
    districts.forEach(function (d) {
      const opt = document.createElement("option");
      opt.value = d.id; opt.textContent = d.code + " — " + d.name;
      jumpSelect.appendChild(opt);
    });
    const params = new URLSearchParams(location.search);
    if (params.get("id")) jumpSelect.value = params.get("id");
    jumpSelect.addEventListener("change", function () {
      window.location.href = "district.html?id=" + jumpSelect.value;
    });
  }

  // header site search -> search.html
  const siteSearch = document.querySelector(".site-search");
  if (siteSearch) siteSearch.addEventListener("submit", function (e) {
    e.preventDefault();
    const q = siteSearch.querySelector("input").value.trim();
    if (q) window.location.href = "search.html?q=" + encodeURIComponent(q);
  });

  // The footer deliberately lists incomplete municipal services. They should
  // still acknowledge a click instead of behaving like broken links.
  document.querySelectorAll('footer a[href="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const label = link.textContent.trim();
      showNotice(
        "Resource Unavailable",
        label + " is listed in the municipal directory, but the associated public file is missing, expired, or awaiting contractor restoration. No completion estimate is available.",
        "NCCN-RESOURCE-404 • DIRECTORY ENTRY RETAINED"
      );
    });
  });
});

// Lowest-bid advertising exchange used by every CivicNet department page.
(function loadCivicAdExchange() {
  const script = document.currentScript;
  const siteBase = script && script.src ? new URL(".", script.src) : new URL(".", location.href);
  const adLoader = document.createElement("script");
  adLoader.src = new URL("../shared/ad-system.js", siteBase).href;
  document.body.appendChild(adLoader);
}());
