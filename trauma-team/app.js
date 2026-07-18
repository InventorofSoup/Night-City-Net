const backdrop = document.querySelector(".backdrop");
const modalContent = document.querySelector(".modal-content");
const closeButton = document.querySelector(".close");
const prices = {"Bronze Essential":1650,"Silver Priority":7500,"Gold Executive":34000,"Platinum Black":100000};
const districtServices = [
  {district:"Little Europe",status:"Conditional Response",window:"06–12 min",plan:"Gold recommended",detail:"Dense rooftop construction and privately controlled courtyards require a confirmed landing corridor before dispatch.",facility:"Saint Ives Emergency Annex",access:"Silver and above",hours:"Open 24/7"},
  {district:"Upper Marina",status:"Priority Response",window:"03–06 min",plan:"Silver and above",detail:"Maintained waterfront flight lanes and multiple secured landing decks support routine AV access.",facility:"Marina Executive Trauma Center",access:"Gold / Platinum",hours:"Open 24/7"},
  {district:"Downtown",status:"Priority Response",window:"02–05 min",plan:"All active plans",detail:"Dedicated corporate air lanes provide fast access, though tower ownership may determine the receiving pad.",facility:"TTI Central Trauma Pavilion",access:"All active plans",hours:"Open 24/7"},
  {district:"Little China",status:"Conditional Response",window:"07–14 min",plan:"Gold recommended",detail:"Market canopies, utility cabling, and variable street control frequently require a ground-transfer rendezvous.",facility:"Lotus Gate Stabilization Clinic",access:"Silver and above",hours:"06:00–22:00"},
  {district:"University District",status:"Managed Priority",window:"04–08 min",plan:"Silver and above",detail:"Campus security maintains two approved medical pads; student demonstrations can temporarily close the eastern approach.",facility:"Night City University Medical Wing",access:"All active plans",hours:"Open 24/7"},
  {district:"The Glen",status:"Priority Response",window:"03–07 min",plan:"All active plans",detail:"Municipal and private medical corridors remain comparatively reliable during normal operating conditions.",facility:"Glen Regional Receiving Hospital",access:"All active plans",hours:"Open 24/7"},
  {district:"Old Japantown",status:"Conditional Response",window:"08–15 min",plan:"Gold recommended",detail:"Unregistered towers and narrow approach lanes require live route verification before an AV commits.",facility:"Kintsugi Community Surgical Center",access:"Gold / Platinum",hours:"08:00–02:00"},
  {district:"South Night City",status:"Conditional Response",window:"07–13 min",plan:"Silver and above",detail:"Ground teams may stage at the district edge when local traffic barricades block direct aircraft-to-street transfer.",facility:"Southside Urgent Stabilization",access:"All active plans",hours:"Limited intake"},
  {district:"Port of Night City",status:"Commercial Review",window:"09–18 min",plan:"Gold corporate rider",detail:"Port authority clearance, crane activity, and hazardous cargo declarations are checked before deployment.",facility:"Harbor Occupational Trauma Unit",access:"Corporate contracts",hours:"Shift intake only"},
  {district:"Reclamation Zone",status:"Restricted Response",window:"Command assessment",plan:"Platinum review",detail:"Unstable structures and incomplete navigation records prevent standard dispatch. A perimeter transfer may be offered.",facility:"No contracted facility in district",access:"Transfer by approval",hours:"Perimeter rendezvous"},
  {district:"NorCal Military Base",status:"Jurisdiction Restricted",window:"External authorization",plan:"Government contract only",detail:"Trauma Team cannot enter controlled military airspace without authenticated base-command clearance.",facility:"Base medical authority",access:"Military authorization",hours:"Not publicly listed"},
  {district:"Watson Development",status:"Conditional Response",window:"06–11 min",plan:"Silver and above",detail:"Active construction changes landing access weekly; registered development pads receive preference.",facility:"Watson Development MedPoint",access:"Silver and above",hours:"05:00–23:00"},
  {district:"Kabuki",status:"Conditional Response",window:"08–16 min",plan:"Gold recommended",detail:"High pedestrian density and informal rooftop occupancy make verified beacon placement essential.",facility:"Kabuki Market Emergency Cooperative",access:"Silver and above",hours:"10:00–04:00"},
  {district:"New Westbrook",status:"Priority Response",window:"03–06 min",plan:"All active plans",detail:"New construction includes standardized AV pads and contracted vertical access corridors.",facility:"Westbrook Advanced Care Tower",access:"All active plans",hours:"Open 24/7"},
  {district:"Charter Hill",status:"Priority Response",window:"02–05 min",plan:"Silver and above",detail:"Private residential pads and managed airspace support direct extraction for verified members.",facility:"Charter Hill Private Medical",access:"Gold / Platinum",hours:"Open 24/7"},
  {district:"Executive Zone",status:"Priority Response",window:"01–04 min",plan:"Gold / Platinum",detail:"Protected approach lanes and continuous identity telemetry support the region’s fastest dispatch profile.",facility:"Executive Medical Continuity Center",access:"Gold / Platinum",hours:"Open 24/7"},
  {district:"Heywood Docks",status:"Commercial Review",window:"08–15 min",plan:"Gold corporate rider",detail:"Dock traffic and industrial lift operations require an employer or facility liaison during approach.",facility:"Heywood Dockworkers Trauma Station",access:"Employer plans",hours:"Open 24/7"},
  {district:"North Heywood",status:"Managed Priority",window:"05–10 min",plan:"Silver and above",detail:"Routine residential access is available; large incidents may redirect teams to protected arterial routes.",facility:"North Heywood Family Emergency",access:"All active plans",hours:"06:00–00:00"},
  {district:"Heywood Industrial Zone",status:"Conditional Response",window:"09–17 min",plan:"Gold recommended",detail:"Chemical alerts, automated freight, and plant lockdowns can delay direct access to a member.",facility:"HIZ Industrial Burn & Trauma",access:"Silver and above",hours:"Open 24/7"},
  {district:"Santo Domingo",status:"Conditional Response",window:"07–14 min",plan:"Silver and above",detail:"Power-grid instability and intermittent local air traffic control require redundant beacon confirmation.",facility:"Santo Domingo Regional Clinic",access:"All active plans",hours:"Open 24/7"},
  {district:"Pacifica Playground",status:"Restricted Response",window:"Command assessment",plan:"Platinum review",detail:"Collapsed attractions and active territorial conflict prevent routine deployment beyond secured rendezvous points.",facility:"No contracted facility in district",access:"Perimeter transfer only",hours:"By dispatch order"},
  {district:"Rancho Coronado",status:"Conditional Response",window:"06–12 min",plan:"Silver and above",detail:"Broad ground access is offset by unreliable tower lighting and frequent utility interruptions.",facility:"Rancho Coronado Community Trauma",access:"All active plans",hours:"05:00–01:00"},
  {district:"Combat Zone",status:"No Standard Dispatch",window:"No published estimate",plan:"Platinum tactical rider",detail:"Active warfare conditions suspend normal service. Any response requires command approval and an acceptable extraction corridor.",facility:"No contracted facility in district",access:"Tactical extraction only",hours:"Unavailable"},
  {district:"Hot Zone",status:"No Standard Dispatch",window:"No published estimate",plan:"Special contract required",detail:"Radiological, structural, and unexploded-ordnance hazards place the area outside standard membership operations.",facility:"No contracted facility in district",access:"Hazard-cleared transfer only",hours:"Unavailable"}
];

function options(selected) {
  return Object.keys(prices).map(function (name) {
    return "<option " + (name === selected ? "selected" : "") + ">" + name + "</option>";
  }).join("");
}
function districtOptions(includePrompt) {
  const prompt = includePrompt ? '<option value="" selected disabled>Select a Night City area</option>' : '';
  return prompt + districtServices.map(function (entry) {
    return '<option value="' + entry.district + '">' + entry.district + '</option>';
  }).join("");
}
function findDistrict(name) {
  return districtServices.find(function (entry) { return entry.district === name; });
}
function facilityRow(entry) {
  return '<tr><td><b>' + entry.facility + '</b><br><small>' + entry.district + ' · ' + entry.access + '</small></td><td>' + entry.hours + '</td></tr>';
}
function markup(type, plan) {
  if (type === "sign-in") return '<p class="eyebrow">MEMBER ACCESS</p><h2>Secure sign in</h2><p>Use the credentials linked to your active Trauma Team membership.</p><form id="sign-in-form"><label>MEMBER ID</label><input required placeholder="TTI-2045-XXXXXX"><label>ACCESS CODE</label><input required type="password" placeholder="••••••••"><button class="button dark">Continue to member portal</button></form>';
  if (type === "quote") return '<p class="eyebrow">MEMBERSHIP ESTIMATOR</p><h2>Price my protection</h2><p>Your final rate is determined after eligibility, location, and risk review. This estimate is not an offer of coverage.</p><form id="quote-form"><label>SELECT A PLAN</label><select name="plan">' + options(plan || "Silver Priority") + '</select><label>HOME RESPONSE ZONE</label><select name="zone"><option value="1">Priority Response Zone</option><option value="1.35">Conditional Response Zone</option><option value="2.15">Restricted Response Zone</option></select><label>MEMBER AGE</label><select name="age"><option value="1">18–34</option><option value="1.18">35–54</option><option value="1.47">55+</option></select><button class="button dark">Calculate estimate</button></form><div class="result" hidden></div>';
  if (type === "zones") return '<p class="eyebrow">REGIONAL SERVICE CHECK</p><h2>Search your area</h2><p>Select the district and enter the street location to receive a preliminary regional classification. Conditions are reassessed when an incident begins.</p><form id="zone-form"><label>NIGHT CITY AREA</label><select name="district" required>' + districtOptions(true) + '</select><label>STREET OR PROPERTY</label><input name="address" required placeholder="Building, street, or managed property"><button class="button dark">Check response conditions</button></form><div class="result area-result" hidden></div>';
  if (type === "clinics") return '<p class="eyebrow">NETWORK FACILITY LOCATOR</p><h2>Find care nearby</h2><p>Select an area to view its representative receiving facility or transfer restriction. Facility participation and intake status can change without notice.</p><form id="clinic-form"><label>SEARCH NIGHT CITY AREA</label><select name="district" required>' + districtOptions(true) + '</select><button class="button dark">Show district facilities</button></form><div class="result clinic-result" hidden></div><table id="clinic-results" hidden><tbody></tbody></table>';
  return '<p class="eyebrow">NIGHT CITY REGIONAL DIVISION</p><h2>Service agreement summary</h2><p><b>1. Dispatch discretion.</b> Trauma Team International retains exclusive discretion over personnel, vehicle, equipment, route, timing, and method of response.</p><p><b>2. Area conditions.</b> No plan creates an obligation to enter an area determined unsafe for responding personnel or assets.</p><p><b>3. Financial responsibility.</b> Any service, care, transport, medication, cyberware procedure, or facility charge not explicitly included in your active plan remains the member’s responsibility.</p><p><b>4. Biometric verification.</b> Response benefits require successful verification unless a dispatch supervisor approves an exception.</p><p>This summary is informational and does not replace a signed membership agreement.</p>';
}
function openModal(type, plan) {
  modalContent.innerHTML = markup(type, plan);
  backdrop.hidden = false;
  document.body.style.overflow = "hidden";
  const focus = modalContent.querySelector("input,select,button");
  if (focus) focus.focus();
  connectForms();
}
function closeModal() { backdrop.hidden = true; document.body.style.overflow = ""; }
function showResult(message) {
  const result = modalContent.querySelector(".result");
  result.hidden = false;
  result.innerHTML = message;
}
function connectForms() {
  const signIn = document.querySelector("#sign-in-form");
  if (signIn) signIn.addEventListener("submit", function (event) {
    event.preventDefault();
    modalContent.innerHTML = '<p class="eyebrow">MEMBER ACCESS</p><h2>Verification unavailable</h2><p>We’re unable to complete your sign-in at this terminal. Please call Member Services at <b>+1 800 555 0113</b> for assistance.</p>';
  });
  const quote = document.querySelector("#quote-form");
  if (quote) quote.addEventListener("submit", function (event) {
    event.preventDefault();
    const form = new FormData(quote);
    const estimate = Math.round(prices[form.get("plan")] * Number(form.get("zone")) * Number(form.get("age")) / 50) * 50;
    showResult('<small>PRELIMINARY ANNUAL ESTIMATE</small><b>€$' + estimate.toLocaleString() + '</b><small>Excludes enrollment fee, treatment overages, cyberware riders, dependent coverage, and regional threat surcharges.</small>');
  });
  const zone = document.querySelector("#zone-form");
  if (zone) zone.addEventListener("submit", function (event) {
    event.preventDefault();
    const form = new FormData(zone);
    const entry = findDistrict(form.get("district"));
    if (!entry) return;
    const address = form.get("address").toString().replace(/[<>]/g, "");
    showResult('<small>' + entry.district.toUpperCase() + ' · PRELIMINARY STATUS</small><b>' + entry.status + '</b><span><strong>Projected window:</strong> ' + entry.window + '</span><span><strong>Membership guidance:</strong> ' + entry.plan + '</span><small>' + entry.detail + '</small><em>Address received: ' + address + '</em>');
  });
  const clinic = document.querySelector("#clinic-form");
  if (clinic) clinic.addEventListener("submit", function (event) {
    event.preventDefault();
    const form = new FormData(clinic);
    const entry = findDistrict(form.get("district"));
    if (!entry) return;
    const result = modalContent.querySelector(".clinic-result");
    const table = modalContent.querySelector("#clinic-results");
    result.hidden = false;
    result.innerHTML = '<small>' + entry.district.toUpperCase() + ' FACILITY NETWORK</small><b>' + entry.facility + '</b><small>' + entry.detail + '</small>';
    table.hidden = false;
    table.querySelector("tbody").innerHTML = facilityRow(entry);
  });
}
document.querySelectorAll("[data-modal]").forEach(function (button) {
  button.addEventListener("click", function () { openModal(button.dataset.modal, button.dataset.plan); });
});
closeButton.addEventListener("click", closeModal);
backdrop.addEventListener("click", function (event) { if (event.target === backdrop) closeModal(); });
document.addEventListener("keydown", function (event) { if (event.key === "Escape" && !backdrop.hidden) closeModal(); });

// Restored Night City regional photography and legitimate member-service placements.
(function mountRegionalFieldArchive() {
  const script = document.currentScript;
  const siteBase = script && script.src ? new URL(".", script.src) : new URL(".", location.href);
  const media = function (name) { return new URL("media/" + name, siteBase).href; };
  const hero = document.querySelector(".hero-art");
  if (hero) {
    hero.classList.add("tti-photo-hero");
    hero.insertAdjacentHTML("afterbegin", '<img src="' + media("trauma-flight.png") + '" alt="Trauma Team AV flying above Night City">');
  }
  const section = document.createElement("section");
  section.className = "tti-field-archive";
  section.innerHTML = '<header><div><p class="eyebrow">NIGHT CITY REGIONAL OPERATIONS</p><h2>Care arrives as a team.</h2><p>Operational photography from active regional platforms, flight crews, and protected receiving corridors. Images are retained for member education and response-familiarity training.</p></div><span>REGIONAL FILE // 2045</span></header><div class="tti-photo-grid"><figure><img src="' + media("trauma-team-ground-crew.png") + '" alt="Trauma Team flight and ground crew preparing a patient transfer" loading="lazy"><figcaption><b>Transfer-ready on arrival</b><small>GROUND CREW // PATIENT HANDOFF</small></figcaption></figure><figure><img src="' + media("trauma-flight.png") + '" alt="Trauma Team response aircraft crossing Night City" loading="lazy"><figcaption><b>Direct aerial routing</b><small>AV RESPONSE // PRIORITY CORRIDOR</small></figcaption></figure><figure><img src="' + media("trauma-patrol-poster.png") + '" alt="Trauma Team regional air-ambulance service poster" loading="lazy"><figcaption><b>Recognize the aircraft</b><small>MEMBER EDUCATION // ARCHIVE PRINT</small></figcaption></figure><figure><img src="' + media("trauma-city-approach.png") + '" alt="Trauma Team aircraft approaching the Night City skyline" loading="lazy"><figcaption><b>Regional approach pattern</b><small>FLIGHT OPERATIONS // NIGHT CITY</small></figcaption></figure></div>';
  const footer = document.querySelector("footer");
  if (footer) footer.parentNode.insertBefore(section, footer);
  const adLoader = document.createElement("script");
  adLoader.src = new URL("../shared/ad-system.js", siteBase).href;
  document.body.appendChild(adLoader);
}());
