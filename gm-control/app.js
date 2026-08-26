(function () {
  "use strict";

  const form = document.querySelector("#campaign-form");
  const districts = ["City Center", "Heywood", "Little Europe", "New Westbrook", "Pacifica", "Santo Domingo", "South Night City", "Watson"];

  function h(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (character) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[character];
    });
  }

  function field(name) { return form.elements[name]; }
  function set(name, value) {
    const control = field(name);
    if (!control) return;
    if (control.type === "checkbox") control.checked = Boolean(value);
    else control.value = value == null ? "" : value;
  }

  function fill(state) {
    set("date", state.date); set("time", state.time); set("weather", state.weather); set("airQuality", state.airQuality);
    set("eventActive", state.event.active); set("eventSeverity", state.event.severity); set("eventDistrict", state.event.district); set("eventTitle", state.event.title); set("eventDetail", state.event.detail);
    set("headlineNetwork54", state.headlines.network54); set("headlineFeedfrenzy", state.headlines.feedfrenzy); set("headlineCivicnet", state.headlines.civicnet); set("headlineTrauma", state.headlines.trauma); set("headlineMilitech", state.headlines.militech);
    set("jobActive", state.customJob.active); set("jobId", state.customJob.id); set("jobTitle", state.customJob.title); set("jobDistrict", state.customJob.district); set("jobPay", state.customJob.pay); set("jobDanger", state.customJob.danger); set("jobClient", state.customJob.client); set("jobSummary", state.customJob.summary);
    set("caseActive", state.dangerCase.active); set("caseId", state.dangerCase.id); set("caseStatus", state.dangerCase.status); set("caseSubject", state.dangerCase.subject); set("caseNote", state.dangerCase.note);
    districts.forEach(function (district) { set("district_" + district, state.districtStatuses[district]); });
    document.querySelector("#revision").textContent = "REVISION " + state.revision;
    document.querySelector("#updated").textContent = state.updatedAt ? "Updated " + state.updatedAt.replace("T", " ").slice(0, 16) : "Not yet changed";
    renderPreview(state);
  }

  function readForm() {
    const status = {};
    districts.forEach(function (district) { status[district] = field("district_" + district).value; });
    return {
      date: field("date").value,
      time: field("time").value,
      weather: field("weather").value,
      airQuality: Number(field("airQuality").value),
      event: { active: field("eventActive").checked, severity: field("eventSeverity").value, district: field("eventDistrict").value, title: field("eventTitle").value, detail: field("eventDetail").value },
      districtStatuses: status,
      headlines: { network54: field("headlineNetwork54").value, feedfrenzy: field("headlineFeedfrenzy").value, civicnet: field("headlineCivicnet").value, trauma: field("headlineTrauma").value, militech: field("headlineMilitech").value },
      customJob: { active: field("jobActive").checked, id: field("jobId").value, title: field("jobTitle").value, district: field("jobDistrict").value, pay: Number(field("jobPay").value), danger: field("jobDanger").value, client: field("jobClient").value, summary: field("jobSummary").value },
      dangerCase: { active: field("caseActive").checked, id: field("caseId").value, status: field("caseStatus").value, subject: field("caseSubject").value, note: field("caseNote").value }
    };
  }

  function renderPreview(state) {
    document.querySelector("#preview-content").innerHTML = '<article><b>' + h(state.date) + ' // ' + h(state.time) + '</b><span>' + h(state.weather) + ' · AQI ' + h(state.airQuality) + '</span></article>' +
      '<article><b>' + h(state.event.active ? state.event.title : "No published regional event") + '</b><span>' + h(state.event.active ? state.event.district + ' — ' + state.event.detail : "Player sites remain fully accessible.") + '</span></article>' +
      '<article><b>Rent-A-Samurai</b><span>' + h(state.customJob.active ? state.customJob.id + ' — ' + state.customJob.title : "No GM contract published") + '</span></article>' +
      '<article><b>Danger Gal</b><span>' + h(state.dangerCase.active ? state.dangerCase.id + ' — ' + state.dangerCase.subject : "No GM case published") + '</span></article>';
  }

  document.querySelector("#district-fields").innerHTML = districts.map(function (district) { return '<label>' + district + '<input name="district_' + district + '" required></label>'; }).join("");
  document.querySelectorAll("[data-tab]").forEach(function (button) {
    button.addEventListener("click", function () {
      document.querySelectorAll("[data-tab]").forEach(function (item) { item.classList.toggle("active", item === button); });
      document.querySelectorAll("[data-panel]").forEach(function (panel) { panel.hidden = panel.dataset.panel !== button.dataset.tab; });
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
  form.addEventListener("input", function () { document.querySelector("#save-status").textContent = "Unsaved local changes."; renderPreview(Object.assign(window.NCNCampaign.get(), readForm())); });
  form.addEventListener("submit", function (event) { event.preventDefault(); const state = window.NCNCampaign.set(readForm()); fill(state); document.querySelector("#save-status").textContent = "Published locally. Open player sites will update after reload."; });

  document.querySelector("#export-state").addEventListener("click", function () {
    const blob = new Blob([window.NCNCampaign.export()], { type: "application/json" });
    const link = document.createElement("a"); link.href = URL.createObjectURL(blob); link.download = "night-city-campaign-state.json"; link.click(); setTimeout(function () { URL.revokeObjectURL(link.href); }, 1000);
    document.querySelector("#transfer-status").textContent = "Campaign file prepared for download.";
  });
  document.querySelector("#import-state").addEventListener("change", function (event) {
    const file = event.target.files[0]; if (!file) return;
    file.text().then(function (text) { const state = window.NCNCampaign.import(text); fill(state); document.querySelector("#transfer-status").textContent = "Campaign state imported and published locally."; }).catch(function (error) { document.querySelector("#transfer-status").textContent = "Import failed: " + error.message; });
  });
  document.querySelector("#reset-state").addEventListener("click", function () {
    if (!confirm("Restore the built-in campaign scenario?")) return;
    const state = window.NCNCampaign.reset(); fill(state); document.querySelector("#transfer-status").textContent = "Built-in scenario restored.";
  });

  fill(window.NCNCampaign.get());
}());
