(function () {
  "use strict";

  const KEY = "ncnet-campaign-state-v1";
  const DEFAULTS = {
    date: "2045-07-30",
    time: "19:42",
    weather: "Red haze with intermittent chemical rain",
    airQuality: 287,
    event: {
      active: true,
      severity: "advisory",
      district: "South Night City",
      title: "South Loop utility pressure incident",
      detail: "Temporary barriers and signal interference remain near the South Loop service corridor. Public routes remain open."
    },
    districtStatuses: {
      "City Center": "Open — elevated private security",
      "Heywood": "Open — utility crews active",
      "Little Europe": "Open — evening congestion",
      "New Westbrook": "Open — event traffic",
      "Pacifica": "Travel discouraged — no standard municipal response",
      "Santo Domingo": "Open — industrial delays",
      "South Night City": "Open — South Loop diversion",
      "Watson": "Open — intermittent CitiNet service"
    },
    headlines: {
      network54: "Utility work causes minor delays; premium venues remain accessible",
      feedfrenzy: "WHAT BURST UNDER SOUTH LOOP—and why did three agencies change the district code?",
      civicnet: "Temporary pedestrian diversion at South Loop service corridor",
      trauma: "Member routing advisory issued for South Night City",
      militech: "Contracted clients advised to validate service access credentials"
    },
    customJob: {
      active: true,
      id: "GM-2045-01",
      title: "Observe the South Loop repair perimeter",
      district: "South Night City",
      pay: 1800,
      danger: "Medium",
      client: "Blocked Identifier",
      summary: "Record who enters the utility perimeter after the municipal crew clears out. No confrontation requested."
    },
    dangerCase: {
      active: true,
      id: "DG-45-7319",
      status: "ACTIVE / CLIENT CONTACT PENDING",
      subject: "South Loop credential duplication",
      note: "Public release confirms duplicated contractor badges. Names remain restricted."
    },
    revision: 1,
    updatedAt: "2045-07-30T19:42:00"
  };

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function merge(base, update) {
    const output = clone(base);
    Object.keys(update || {}).forEach(function (key) {
      if (key === "__proto__" || key === "prototype" || key === "constructor") return;
      const value = update[key];
      if (value && typeof value === "object" && !Array.isArray(value) && output[key] && typeof output[key] === "object") {
        output[key] = merge(output[key], value);
      } else {
        output[key] = value;
      }
    });
    return output;
  }

  function read() {
    try {
      const stored = JSON.parse(localStorage.getItem(KEY) || "null");
      return stored ? merge(DEFAULTS, stored) : clone(DEFAULTS);
    } catch (error) {
      return clone(DEFAULTS);
    }
  }

  function write(next) {
    const state = merge(DEFAULTS, next || {});
    state.revision = Number(state.revision || 0) + 1;
    state.updatedAt = new Date().toISOString();
    localStorage.setItem(KEY, JSON.stringify(state));
    window.dispatchEvent(new CustomEvent("ncnet:campaign-change", { detail: clone(state) }));
    return state;
  }

  function reset() {
    localStorage.removeItem(KEY);
    const state = clone(DEFAULTS);
    window.dispatchEvent(new CustomEvent("ncnet:campaign-change", { detail: state }));
    return state;
  }

  function importState(text) {
    const parsed = JSON.parse(text);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("Campaign file is not valid.");
    return write(parsed);
  }

  window.NCNCampaign = {
    key: KEY,
    defaults: clone(DEFAULTS),
    get: read,
    set: write,
    reset: reset,
    export: function () { return JSON.stringify(read(), null, 2); },
    import: importState,
    subscribe: function (callback) {
      const listener = function (event) { callback(event.detail); };
      window.addEventListener("ncnet:campaign-change", listener);
      return function () { window.removeEventListener("ncnet:campaign-change", listener); };
    }
  };
}());
