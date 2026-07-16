document.querySelectorAll(".gov-form").forEach(function (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const msg = form.querySelector(".form-msg");
    if (msg) msg.classList.add("show");
    form.querySelectorAll("input,textarea,select").forEach(function (el) {
      if (el.type !== "submit") el.disabled = true;
    });
  });
});

const calcRun = document.querySelector("#calc-run");
if (calcRun) {
  calcRun.addEventListener("click", function () {
    const [feeMult, daysMult] = document.querySelector("#calc-district").value.split(",").map(Number);
    const [baseFee, baseDays] = document.querySelector("#calc-permit").value.split(",").map(Number);
    const fee = Math.max(25, Math.round(baseFee * feeMult / 5) * 5);
    const days = Math.round(baseDays * daysMult);
    const result = document.querySelector("#calc-result");
    result.innerHTML = "<b>Estimated fee: " + fee + "eb (nonrefundable)</b><br>Estimated processing time: " + days + "&ndash;" + (days + Math.round(days * 0.45)) + " business days.<br><small>This is a public estimate only and does not constitute a quote, a queue position, or a guarantee of approval.</small>";
    result.classList.add("show");
  });
}

const backdrop = document.querySelector(".backdrop.records-gate");
if (backdrop) {
  const closeBtn = backdrop.querySelector(".close");
  function openGate(label) {
    backdrop.querySelector(".modal-label").textContent = label || "This record";
    backdrop.hidden = false;
  }
  function closeGate() { backdrop.hidden = true; }
  document.querySelectorAll("[data-restricted]").forEach(function (btn) {
    btn.addEventListener("click", function (event) {
      event.preventDefault();
      openGate(btn.dataset.restricted);
    });
  });
  if (closeBtn) closeBtn.addEventListener("click", closeGate);
  backdrop.addEventListener("click", function (event) { if (event.target === backdrop) closeGate(); });
  document.addEventListener("keydown", function (event) { if (event.key === "Escape" && !backdrop.hidden) closeGate(); });
}

const noraBtn = document.querySelector(".nora-btn");
if (noraBtn) {
  const noraPanel = document.querySelector(".nora-panel");
  noraBtn.addEventListener("click", function () { noraPanel.hidden = !noraPanel.hidden; });
  noraPanel.querySelector(".close").addEventListener("click", function () { noraPanel.hidden = true; });
}

const emPopup = document.querySelector(".backdrop.emergency-popup");
if (emPopup) {
  window.setTimeout(function () { emPopup.hidden = false; }, 600);
  emPopup.querySelector(".close").addEventListener("click", function () { emPopup.hidden = true; });
  emPopup.querySelector(".dismiss").addEventListener("click", function () { emPopup.hidden = true; });
  emPopup.addEventListener("click", function (event) { if (event.target === emPopup) emPopup.hidden = true; });
}
