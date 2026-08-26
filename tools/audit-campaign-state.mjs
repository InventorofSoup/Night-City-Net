import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = fs.readFileSync(path.join(root, "shared", "campaign-state.js"), "utf8");
const storage = new Map();
const events = [];
const windowObject = {
  dispatchEvent(event) { events.push(event); },
  addEventListener() {},
  removeEventListener() {}
};
const context = {
  window: windowObject,
  localStorage: {
    getItem(key) { return storage.has(key) ? storage.get(key) : null; },
    setItem(key, value) { storage.set(key, String(value)); },
    removeItem(key) { storage.delete(key); }
  },
  CustomEvent: class CustomEvent {
    constructor(type, options) { this.type = type; this.detail = options.detail; }
  },
  Date,
  JSON,
  console
};

vm.runInNewContext(source, context, { filename: "campaign-state.js" });
const campaign = windowObject.NCNCampaign;
assert.ok(campaign, "Campaign API was not created");
assert.equal(campaign.get().date, "2045-07-30", "Default campaign state is unavailable");

const changed = campaign.set({ weather: "Clear enough to be suspicious", customJob: { pay: 4200 } });
assert.equal(changed.weather, "Clear enough to be suspicious");
assert.equal(changed.customJob.pay, 4200);
assert.equal(changed.customJob.title, campaign.defaults.customJob.title, "Nested defaults were not preserved");
assert.ok(events.some((event) => event.type === "ncnet:campaign-change"), "Campaign changes did not publish an event");

const exported = campaign.export();
storage.clear();
const imported = campaign.import(exported);
assert.equal(imported.weather, "Clear enough to be suspicious", "Export/import did not preserve campaign state");
const hostile = JSON.parse('{"__proto__":{"compromised":true},"weather":"Safe import"}');
campaign.import(JSON.stringify(hostile));
assert.equal({}.compromised, undefined, "Campaign import allowed prototype pollution");

campaign.reset();
assert.equal(campaign.get().weather, campaign.defaults.weather, "Reset did not restore defaults");
console.log("PASS: campaign defaults, nested updates, events, export/import, and reset behavior are valid.");
