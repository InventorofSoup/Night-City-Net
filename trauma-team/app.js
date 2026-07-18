const backdrop = document.querySelector(".backdrop");
const modalContent = document.querySelector(".modal-content");
const closeButton = document.querySelector(".close");
const prices = {"Bronze Essential":1650,"Silver Priority":7500,"Gold Executive":34000,"Platinum Black":100000};

function options(selected) {
  return Object.keys(prices).map(function (name) {
    return "<option " + (name === selected ? "selected" : "") + ">" + name + "</option>";
  }).join("");
}
function markup(type, plan) {
  if (type === "sign-in") return '<p class="eyebrow">MEMBER ACCESS</p><h2>Secure sign in</h2><p>Use the credentials linked to your active Trauma Team membership.</p><form id="sign-in-form"><label>MEMBER ID</label><input required placeholder="TTI-2045-XXXXXX"><label>ACCESS CODE</label><input required type="password" placeholder="••••••••"><button class="button dark">Continue to member portal</button></form>';
  if (type === "quote") return '<p class="eyebrow">MEMBERSHIP ESTIMATOR</p><h2>Price my protection</h2><p>Your final rate is determined after eligibility, location, and risk review. This estimate is not an offer of coverage.</p><form id="quote-form"><label>SELECT A PLAN</label><select name="plan">' + options(plan || "Silver Priority") + '</select><label>HOME RESPONSE ZONE</label><select name="zone"><option value="1">Priority Response Zone</option><option value="1.35">Conditional Response Zone</option><option value="2.15">Restricted Response Zone</option></select><label>MEMBER AGE</label><select name="age"><option value="1">18–34</option><option value="1.18">35–54</option><option value="1.47">55+</option></select><button class="button dark">Calculate estimate</button></form><div class="result" hidden></div>';
  if (type === "zones") return '<p class="eyebrow">REGIONAL SERVICE CHECK</p><h2>Check an address</h2><p>Enter an address to receive a preliminary service classification. Current conditions can change without notice.</p><form id="zone-form"><label>NIGHT CITY ADDRESS</label><input required placeholder="Street address or district"><button class="button dark">Check response conditions</button></form><div class="result" hidden></div>';
  if (type === "clinics") return '<p class="eyebrow">NETWORK FACILITY LOCATOR</p><h2>Find care nearby</h2><p>Showing example facilities in the Night City Regional Division. Access varies by plan.</p><label>SEARCH DISTRICT</label><select><option>All Night City districts</option><option>City Center</option><option>Watson</option><option>Heywood</option><option>Santo Domingo</option></select><table><tr><td><b>TTI Central Trauma Pavilion</b><br><small>City Center · Gold / Platinum</small></td><td>Open 24/7</td></tr><tr><td><b>St. Agnes Network Clinic</b><br><small>Watson · Silver and above</small></td><td>Open 06:00–22:00</td></tr><tr><td><b>Southside Urgent Stabilization</b><br><small>Santo Domingo · All active plans</small></td><td>Limited intake</td></tr></table>';
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
    showResult('<small>PRELIMINARY STATUS</small><b>Conditional Response</b><small>Dispatch availability is evaluated at time of incident. Gold or Platinum coverage is recommended for this area.</small>');
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
