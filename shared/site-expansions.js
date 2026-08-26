(function () {
  "use strict";

  const supported = ["rent-a-samurai", "danger-gal", "feedfrenzy", "nc-civicnet", "trauma-team", "militech-security"];
  const site = supported.find(function (name) { return location.pathname.includes("/" + name + "/"); });
  if (!site || !window.NCNCampaign) return;

  const PLAYER_KEY = "ncnet-player-state-v1";
  const sharedBase = new URL(".", document.currentScript.src);
  const stylesheet = document.createElement("link");
  stylesheet.rel = "stylesheet";
  stylesheet.href = new URL("site-expansions.css?v=2045-01", sharedBase).href;
  document.head.appendChild(stylesheet);
  const compatibilityStyles = document.createElement("link");
  compatibilityStyles.rel = "stylesheet";
  compatibilityStyles.href = new URL("site-expansions-compat.css?v=2045-01", sharedBase).href;
  document.head.appendChild(compatibilityStyles);

  function h(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (character) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[character];
    });
  }

  function token(value) {
    return String(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  function playerState() {
    try { return JSON.parse(localStorage.getItem(PLAYER_KEY) || "{}"); } catch (error) { return {}; }
  }

  function updatePlayer(patch) {
    const next = Object.assign({}, playerState(), patch);
    localStorage.setItem(PLAYER_KEY, JSON.stringify(next));
    return next;
  }

  function campaignSignal(state) {
    const event = state.event || {};
    return '<aside class="nc-live"><b>' + h(state.date) + ' // ' + h(state.time) + '</b><span>' + h(event.active ? event.title : "No active regional advisory") + '</span><small>' + h(state.weather) + ' · AQI ' + h(state.airQuality) + '</small></aside>';
  }

  const renderers = {
    "rent-a-samurai": function (state) {
      const job = state.customJob || {};
      const player = playerState();
      const jobClaimed = player.activeJob === job.id || player.completedJob === job.id;
      const jobAvailable = job.active && !jobClaimed;
      return '<div class="nc-expansion__head"><div><span class="nc-expansion__eyebrow">ROOK AUXILIARY BOARD // LOCAL TERMINAL</span><h2>Your work leaves a record. Decide what kind.</h2><p>Track contracts, maintain a burner identity, review employer behavior, and keep messages attached to the correct bad decision.</p></div>' + campaignSignal(state) + '</div>' +
        tabs(["Contracts", "Burner ID", "Reputation", "Inbox"]) +
        panel("Contracts", '<div class="nc-grid"><article class="nc-card wide" id="nc-gm-contract"><small>' + h(job.id) + ' // GM-PUBLISHED CONTRACT</small><h3>' + h(jobAvailable ? job.title : (jobClaimed ? "Contract removed from the public board" : "No direct Game Master contract is active")) + '</h3><p>' + h(jobAvailable ? job.summary : (jobClaimed ? "This listing now exists only in your personal job ledger and sealed messages." : "The board is showing only its standard public listings.")) + '</p>' + (jobAvailable ? '<span class="nc-chip">' + h(job.district) + '</span><span class="nc-chip">' + h(job.danger) + ' RISK</span><span class="nc-chip">' + h(job.pay) + 'eb</span><div style="margin-top:18px"><button class="nc-button" data-nc-action="save-job">Save contract</button> <button class="nc-button secondary" data-nc-action="apply-job">Apply through burner</button></div>' : '') + '</article><article class="nc-card"><small>PERSONAL JOB LEDGER</small><h3>Saved, active, and completed</h3><div id="nc-job-ledger" class="nc-list"></div></article></div>') +
        panel("Burner ID", '<div class="nc-grid"><article class="nc-card wide"><small>PUBLIC BOARD IDENTITY</small><h3>Register a disposable operator handle</h3><form class="nc-form two" id="nc-burner-form"><label>Handle<input name="handle" required maxlength="24" placeholder="Example: Ash Relay"></label><label>Primary role<select name="role"><option>Solo</option><option>Netrunner</option><option>Tech</option><option>Medtech</option><option>Driver</option><option>Face</option><option>Scout</option></select></label><label class="full">Public line<textarea name="line" rows="3" maxlength="180" placeholder="What should a client know without learning where you sleep?"></textarea></label><button class="nc-button" type="submit">Issue burner identity</button></form><p class="nc-status" id="nc-burner-status" role="status"></p></article><article class="nc-card"><small>BOARD POLICY</small><h3>Burn notices</h3><p>A burned handle remains visible in completed contract records but cannot receive new direct offers. The board does not verify that a new handle belongs to a new person.</p></article></div>') +
        panel("Reputation", '<div class="nc-grid"><article class="nc-card"><small>BOARD SCORE</small><h3 id="nc-rep-score">4.1 / 5</h3><div class="nc-meter"><i style="width:82%"></i></div><p>Calculated from completed work, withdrawals, disputes, and employers who bothered to leave a review.</p></article><article class="nc-card wide"><small>RECENT EMPLOYER NOTES</small><div class="nc-list"><div class="nc-row"><b>KITE//LOGISTICS</b><span>Paid on confirmation. Did not answer questions about cargo.</span><em>4.5 / 5</em></div><div class="nc-row"><b>GoodDog Catering</b><span>Payment arrived thirty-six hours late after three reminders.</span><em>2.0 / 5</em></div><div class="nc-row"><b>Harbor Street Mutual Aid</b><span>Clear scope, partial escrow, neighborhood vouched for client.</span><em>4.8 / 5</em></div></div></article></div>') +
        panel("Inbox", '<div class="nc-grid"><article class="nc-card full"><small>SEALED BOARD MESSAGES</small><div class="nc-list" id="nc-inbox"><div class="nc-row"><b>ROOK / AUTOMATED</b><span>Your identity is your problem. Your contract record is ours.</span><em>PINNED</em></div><div class="nc-row"><b>BLOCKED IDENTIFIER</b><span>Are you available after the municipal crew leaves South Loop?</span><button class="nc-button secondary" data-nc-action="reply">Reply</button></div></div><p class="nc-status" id="nc-inbox-status" role="status"></p></article></div>');
    },
    "danger-gal": function (state) {
      const matter = state.dangerCase || {};
      return '<div class="nc-expansion__head"><div><span class="nc-expansion__eyebrow">DANGER GAL // INVESTIGATIVE SERVICES</span><h2>Information is useful when someone can stand behind it.</h2><p>Public intake, sanitized case tracking, missing-person notices, and evidence handling for matters that have not earned full client access.</p></div>' + campaignSignal(state) + '</div>' +
        tabs(["Case Status", "Background Check", "Missing Persons", "Investigators"]) +
        panel("Case Status", '<div class="nc-grid"><article class="nc-card wide"><small>PUBLIC CASE LOOKUP</small><form class="nc-form" id="nc-case-form"><label>Case number<input name="case" required placeholder="DG-45-7319"></label><button class="nc-button" type="submit">Retrieve sanitized status</button></form><div id="nc-case-result" class="nc-status" role="status"></div></article><article class="nc-card"><small>CURRENT PUBLIC MATTER</small><h3>' + h(matter.active ? matter.subject : "No campaign matter released") + '</h3><p>' + h(matter.note) + '</p><code>' + h(matter.id) + ' // ' + h(matter.status) + '</code></article></div>') +
        panel("Background Check", '<div class="nc-grid"><article class="nc-card wide"><small>PRELIMINARY REQUEST BUILDER</small><form class="nc-form two" id="nc-background-form"><label>Subject name or handle<input name="subject" required></label><label>Requested depth<select name="depth"><option>Identity confirmation — 250eb</option><option>Employment and affiliations — 650eb</option><option>Comprehensive private brief — 1,800eb</option></select></label><label class="full">Purpose<textarea name="purpose" required rows="3"></textarea></label><button class="nc-button" type="submit">Prepare intake reference</button></form><p class="nc-status" id="nc-background-status" role="status"></p></article><article class="nc-card"><small>DISCLOSURE</small><h3>A report is not certainty.</h3><p>Danger Gal distinguishes confirmed records, sourced claims, investigator assessment, and information the client requested but could not be verified.</p></article></div>') +
        panel("Missing Persons", '<div class="nc-grid"><article class="nc-card"><small>DG-MP-2045-118</small><h3>Toma Vale</h3><p>Last confirmed near Kabuki Market. Family requests welfare confirmation, not forced recovery.</p><span class="nc-chip">OPEN / 12 DAYS</span></article><article class="nc-card"><small>DG-MP-2045-126</small><h3>“Patch Cable”</h3><p>Freelance tech missed three scheduled clinic shifts. Vehicle recovered without tools.</p><span class="nc-chip">ACTIVE / 4 DAYS</span></article><article class="nc-card"><small>SUBMIT INFORMATION</small><form class="nc-form" id="nc-evidence-form"><label>Case<select name="case"><option>DG-MP-2045-118</option><option>DG-MP-2045-126</option></select></label><label>Evidence file<input type="file" name="evidence"></label><label>Contact method<input name="contact" placeholder="Optional burner address"></label><button class="nc-button" type="submit">Stage evidence receipt</button></form><p class="nc-status" id="nc-evidence-status" role="status"></p></article></div>') +
        panel("Investigators", '<div class="nc-grid"><article class="nc-card"><small>FIELD LEAD</small><h3>Mara “Puma” Álvarez</h3><p>Protective investigations, missing persons, hostile interviews, and cases where appearing unprepared is useful.</p></article><article class="nc-card"><small>RECORDS SPECIALIST</small><h3>Kei North</h3><p>Corporate history, property chains, employment verification, and the records created to hide other records.</p></article><article class="nc-card"><small>TECHNICAL INVESTIGATOR</small><h3>Iris Coil</h3><p>Device provenance, access logs, sensor contradictions, and evidence that has been “accidentally” reformatted.</p></article></div>');
    },
    feedfrenzy: function (state) {
      return '<div class="nc-expansion__head"><div><span class="nc-expansion__eyebrow">FEEDFRENZY // RECEIPTS, RUMORS, AND REGRETS</span><h2>The story keeps changing because everyone keeps lying.</h2><p>Track confidence, compare contradictory versions, inspect corrections, and reward the loudest interpretation with a completely meaningless vote.</p></div>' + campaignSignal(state) + '</div>' +
        tabs(["Rumor Wire", "Street Video", "Corrections", "Conspiracy Board"]) +
        panel("Rumor Wire", '<div class="nc-grid"><article class="nc-card wide"><small>LIVE CLAIM // SOUTH LOOP</small><h3>' + h(state.headlines.feedfrenzy) + '</h3><p>Three witnesses agree that someone entered the barrier after midnight. None agree on the uniform, vehicle, number of people, or whether midnight had happened yet.</p><div class="nc-meter"><i style="width:46%"></i></div><code>CONFIDENCE: 46% // SOURCES: 3 // USEFUL SOURCES: PENDING</code><div style="margin-top:18px"><button class="nc-button" data-nc-action="vote-believe">I believe it</button> <button class="nc-button secondary" data-nc-action="vote-rigged">Obviously planted</button></div><p class="nc-status" id="nc-vote-status" role="status"></p></article><article class="nc-card"><small>CONTRADICTORY VERSIONS</small><ul><li>Municipal equipment failure</li><li>Militech access-control test</li><li>Illegal utility tap</li><li>Nothing happened; the vapor was promotional</li></ul></article></div>') +
        panel("Street Video", '<div class="nc-grid"><article class="nc-card wide"><small>UPLOADED 19:18 // NO AUDIO VERIFICATION</small><h3>Barrier camera catches a second service van</h3><p>The plate resolves to a vehicle reported dismantled six months ago. Compression artifacts obscure the driver and improve every conspiracy theory.</p><button class="nc-button" data-nc-action="play-clip">Play reconstructed clip</button><p class="nc-status" id="nc-clip-status" role="status"></p></article><article class="nc-card"><small>REACTIONS</small><div class="nc-list"><div class="nc-row"><b>OUTRAGE</b><span>Corporate cleanup</span><em>1,842</em></div><div class="nc-row"><b>LAUGH</b><span>“enhance it again”</span><em>988</em></div><div class="nc-row"><b>SAVE</b><span>For later arguments</span><em>421</em></div></div></article></div>') +
        panel("Corrections", '<div class="nc-grid"><article class="nc-card full"><small>REVISION HISTORY // WE NEVER DELETE, EXCEPT WHEN WE DO</small><div class="nc-list"><div class="nc-row"><b>19:04</b><span>Changed “explosion” to “pressure event” after legal contact.</span><em>WORDING</em></div><div class="nc-row"><b>19:22</b><span>Removed claim that the second van belonged to CivicNet. Logo was a magnetic decal.</span><em>CORRECTION</em></div><div class="nc-row"><b>19:47</b><span>Restored original headline because engagement declined.</span><em>EDITORIAL</em></div></div><div class="nc-story-removed"><b>STORY REMOVED FOLLOWING CORPORATE COMPLAINT</b><p>The complaint, claimant, and original story are unavailable. Comments remain open.</p></div></article></div>') +
        panel("Conspiracy Board", '<div class="nc-grid"><article class="nc-card"><small>THREAD 8,144</small><h3>The district-code swap was intentional</h3><p>Users have connected the wrong code to seven unrelated permits and one noodle receipt.</p></article><article class="nc-card"><small>THREAD 8,152</small><h3>Utility vapor affects memory</h3><p>Evidence currently consists of people forgetting why they opened the thread.</p></article><article class="nc-card"><small>PARTNER CONTENT</small><h3>Protect your thoughts with genuine lead-thread headwear</h3><p>This is an advertisement. FeedFrenzy receives 18eb per completed fear assessment.</p><button class="nc-button secondary" data-nc-action="advertorial">Begin totally independent assessment</button></article></div>');
    },
    "nc-civicnet": function (state) {
      const districtRows = Object.keys(state.districtStatuses || {}).map(function (district) {
        return '<div class="nc-row"><b>' + h(district) + '</b><span>' + h(state.districtStatuses[district]) + '</span><em>2045.07</em></div>';
      }).join("");
      return '<div class="nc-expansion__head"><div><span class="nc-expansion__eyebrow">NC CIVICNET // RESIDENT SELF-SERVICE</span><h2>Additional municipal records and status tools.</h2><p>Lookup results are assembled from departmental systems with different maintenance schedules, definitions, and opinions regarding public access.</p></div>' + campaignSignal(state) + '</div>' +
        tabs(["District Status", "Property & Zoning", "Procurement", "Application Tracker"]) +
        panel("District Status", '<div class="nc-grid"><article class="nc-card wide"><small>CURRENT SERVICE CONDITIONS</small><div class="nc-list">' + districtRows + '</div></article><article class="nc-card"><small>UTILITY SCHEDULE</small><h3>South Loop stabilization</h3><p>Pressure checks: 20:00–23:30<br>Signal testing: 00:15–02:00<br>Barrier review: 06:30</p><p>Schedules may be revised after the scheduled work has occurred.</p></article></div>') +
        panel("Property & Zoning", '<div class="nc-grid"><article class="nc-card wide"><small>PARCEL INFORMATION TERMINAL</small><form class="nc-form two" id="nc-property-form"><label>Street number<input name="number" required inputmode="numeric"></label><label>Street or block name<input name="street" required></label><label class="full">Record type<select name="type"><option>Ownership summary</option><option>Zoning classification</option><option>Open violations</option><option>Utility responsibility</option></select></label><button class="nc-button" type="submit">Search municipal index</button></form><p class="nc-status" id="nc-property-status" role="status"></p></article><article class="nc-card"><small>NOTICE</small><h3>Records may disagree.</h3><p>Reconstruction parcels frequently contain overlapping claims, temporary boundaries, expired entities, and structures that exist without corresponding permits.</p></article></div>') +
        panel("Procurement", '<div class="nc-grid"><article class="nc-card full"><small>RECENT PUBLIC CONTRACTS</small><div class="nc-list"><div class="nc-row"><b>NC-UTL-45-881</b><span>South Loop pressure-control replacement — Alder Municipal Systems</span><em>92,400eb</em></div><div class="nc-row"><b>NC-DAT-45-190</b><span>Public archive migration support — Ziggurat Civic Services</span><em>310,000eb</em></div><div class="nc-row"><b>NC-SAN-45-442</b><span>Temporary market sanitation — All Foods Community Logistics</span><em>18,700eb</em></div></div><button class="nc-button secondary" data-nc-action="procurement-download">Request complete contracting records</button><p class="nc-status" id="nc-procurement-status" role="status"></p></article></div>') +
        panel("Application Tracker", '<div class="nc-grid"><article class="nc-card wide"><small>FORM PROGRESS IS STORED ON THIS TERMINAL</small><form class="nc-form two" id="nc-application-form"><label>Application number<input name="application" required placeholder="NC-APP-45-____"></label><label>Applicant surname or organization<input name="applicant" required></label><label class="full">Department<select name="department"><option>Permits and Licenses</option><option>Public Records</option><option>Municipal Services</option><option>Transit Adjustments</option></select></label><button class="nc-button" type="submit">Check status</button><button class="nc-button secondary" type="button" data-nc-action="save-application">Save incomplete request</button></form><p class="nc-status" id="nc-application-status" role="status"></p></article><article class="nc-card"><small>COMMON RESULT</small><h3>Received / Not assigned</h3><p>An intake timestamp confirms that a system accepted the request. It does not confirm departmental receipt, review, jurisdiction, funding, or future action.</p></article></div>');
    },
    "trauma-team": function (state) {
      return '<div class="nc-expansion__head"><div><span class="nc-expansion__eyebrow">TRAUMA TEAM // MEMBER READINESS CENTER</span><h2>Know what dispatch will see before you need it.</h2><p>Build a local membership card, compare response conditions, review claims, and prepare a clinic request without changing an actual service agreement.</p></div>' + campaignSignal(state) + '</div>' +
        tabs(["Membership Card", "Response Estimate", "Claims", "Appointments"]) +
        panel("Membership Card", '<div class="nc-grid"><article class="nc-card wide"><small>LOCAL READINESS CARD</small><form class="nc-form two" id="nc-member-form"><label>Member display name<input name="name" required></label><label>Plan<select name="plan"><option>Silver</option><option>Executive</option><option>Corporate Gold</option><option>Platinum</option></select></label><label>Primary district<select name="district"><option>City Center</option><option>Heywood</option><option>Little Europe</option><option>New Westbrook</option><option>Santo Domingo</option><option>South Night City</option><option>Watson</option></select></label><label>Emergency contact<input name="contact" required></label><button class="nc-button" type="submit">Generate local card</button></form><p class="nc-status" id="nc-member-status" role="status"></p></article><article class="nc-card"><small>PRIVACY NOTE</small><h3>Stored on this terminal only.</h3><p>This simulator does not create coverage, contact dispatch, or transmit medical information.</p></article></div>') +
        panel("Response Estimate", '<div class="nc-grid"><article class="nc-card wide"><small>REGIONAL ESTIMATE</small><form class="nc-form two" id="nc-response-form"><label>District<select name="district"><option>City Center</option><option>Watson</option><option>Heywood</option><option>Little Europe</option><option>Santo Domingo</option><option>South Night City</option><option>Pacifica</option></select></label><label>Membership tier<select name="tier"><option>Silver</option><option>Executive</option><option>Corporate Gold</option><option>Platinum</option></select></label><label class="full">Condition<select name="condition"><option>Routine regional conditions</option><option>Weather advisory</option><option>Utility disruption</option><option>Active hostile scene</option></select></label><button class="nc-button" type="submit">Estimate response review</button></form><p class="nc-status" id="nc-response-status" role="status"></p></article><article class="nc-card"><small>CURRENT ADVISORY</small><h3>' + h(state.headlines.trauma) + '</h3><p>Estimates are not guarantees. Dispatch may decline entry, delay deployment, change transport, or require scene stabilization.</p></article></div>') +
        panel("Claims", '<div class="nc-grid"><article class="nc-card"><small>TT-CLM-45-2108</small><h3>Cyberware stabilization</h3><p><b>PARTIALLY APPROVED.</b> Emergency stabilization credited. Replacement optics classified as elective restoration.</p></article><article class="nc-card"><small>TT-CLM-45-2121</small><h3>Unauthorized passenger transport</h3><p><b>DENIED.</b> Additional passenger was not listed under the applicable agreement.</p></article><article class="nc-card"><small>HOW DENIALS WORK</small><h3>Coverage follows the agreement.</h3><p>Medical necessity, response eligibility, treatment credit, transport, cyberware repair, and facility charges are reviewed separately.</p></article></div>') +
        panel("Appointments", '<div class="nc-grid"><article class="nc-card wide"><small>NETWORK FACILITY REQUEST</small><form class="nc-form two" id="nc-appointment-form"><label>Service<select name="service"><option>Membership readiness review</option><option>Cyberware compatibility consult</option><option>Post-extraction follow-up</option><option>Biometric record update</option></select></label><label>Preferred district<select name="district"><option>City Center</option><option>Watson</option><option>Heywood</option><option>New Westbrook</option></select></label><label>Preferred date<input type="date" name="date" required></label><label>Member reference<input name="member" required></label><button class="nc-button" type="submit">Request appointment window</button></form><p class="nc-status" id="nc-appointment-status" role="status"></p></article><article class="nc-card"><small>INCIDENT HISTORY</small><div class="nc-list"><div class="nc-row"><b>2045.05.18</b><span>Signal test / no deployment</span><em>CLOSED</em></div><div class="nc-row"><b>2045.02.03</b><span>Ground transport / stabilized</span><em>BILLED</em></div></div></article></div>');
    },
    "militech-security": function (state) {
      return '<div class="nc-expansion__head"><div><span class="nc-expansion__eyebrow">MILITECH SECURITY // CLIENT INTELLIGENCE PREVIEW</span><h2>Operational information for clients who plan before exposure.</h2><p>Sanitized threat briefings, renewal notices, regional posture, equipment summaries, and redacted incident material.</p></div>' + campaignSignal(state) + '</div>' +
        tabs(["Threat Briefings", "Renewals", "After-Action", "Equipment"]) +
        panel("Threat Briefings", '<div class="nc-grid"><article class="nc-card wide"><small>MSR-NC-45-0730 // REGIONAL</small><h3>' + h(state.headlines.militech) + '</h3><p>Duplicated contractor credentials remain the most likely path through temporary service barriers. Verify work orders through a known channel; do not rely on clothing, vehicle markings, or urgency.</p><span class="nc-chip">ACCESS CONTROL</span><span class="nc-chip">MODERATE EXPOSURE</span></article><article class="nc-card"><small>ACCOUNT-SPECIFIC ADVISORY</small><h3>Preview unavailable</h3><p>Present an approved client credential through the existing portal to retrieve property, movement, or personnel-specific guidance.</p></article></div>') +
        panel("Renewals", '<div class="nc-grid"><article class="nc-card"><small>RESIDENTIAL COMMAND</small><h3>Review opens in 18 days</h3><p>Household roster, vendor access, vehicle recognition, and escalation contacts require confirmation.</p><button class="nc-button secondary" data-nc-action="renewal">Prepare renewal review</button></article><article class="nc-card"><small>EVENT PROTECTION</small><h3>No active renewal window</h3><p>Event engagements are reviewed against location, attendance, client history, and regional deployment availability.</p></article><article class="nc-card"><small>MANAGED PATROL</small><h3>Posture review complete</h3><p>Current staffing assumptions remain valid through 2045.08.15 unless operating conditions materially change.</p></article></div>') +
        panel("After-Action", '<div class="nc-grid"><article class="nc-card full"><small>REDACTED REPORT // MSR-AAR-45-881</small><h3>Attempted access using duplicated utility credentials</h3><p>At 21:14, perimeter staff challenged a service team whose work order did not resolve through the property system. The team departed before contracted response arrived. Vehicle identity, recorded faces, client address, and investigative disposition are restricted.</p><div class="nc-list"><div class="nc-row"><b>CONTROL FAILURE</b><span>Visitor-created urgency bypassed initial verbal verification.</span><em>REMEDIATED</em></div><div class="nc-row"><b>EFFECTIVE CONTROL</b><span>Known-vendor callback prevented physical access.</span><em>VALIDATED</em></div><div class="nc-row"><b>CLIENT ACTION</b><span>Replace printed vendor list with current command directory.</span><em>OPEN</em></div></div></article></div>') +
        panel("Equipment", '<div class="nc-grid"><article class="nc-card"><small>PERIMETER</small><h3>Credential relay terminal</h3><p>Validates visitors against client-controlled work orders and retains a contract-scoped decision record.</p></article><article class="nc-card"><small>MOVEMENT</small><h3>Protected convoy transponder</h3><p>Maintains vehicle identity across approved regional command channels without exposing public route details.</p></article><article class="nc-card"><small>INCIDENT</small><h3>Scene documentation kit</h3><p>Captures time, authority, evidence custody, and client-directed continuity decisions under one incident reference.</p></article></div>');
    }
  };

  function tabs(names) {
    return '<nav class="nc-expansion__tabs" aria-label="Additional site tools" role="tablist">' + names.map(function (name, index) {
      return '<button type="button" role="tab" id="nc-tab-' + token(name) + '" aria-controls="nc-panel-' + token(name) + '" class="' + (index ? "" : "active") + '" data-nc-tab="' + h(name) + '" aria-selected="' + (!index) + '">' + h(name) + '</button>';
    }).join("") + '</nav>';
  }

  function panel(name, content) {
    return '<section class="nc-panel" role="tabpanel" id="nc-panel-' + token(name) + '" aria-labelledby="nc-tab-' + token(name) + '" data-nc-panel="' + h(name) + '">' + content + '</section>';
  }

  function setFirstPanel(section) {
    const panels = Array.from(section.querySelectorAll("[data-nc-panel]"));
    panels.forEach(function (panel, index) { panel.hidden = index !== 0; });
  }

  function updateLedger(section) {
    const ledger = section.querySelector("#nc-job-ledger");
    if (!ledger) return;
    const state = playerState();
    const rows = [
      ["SAVED", state.savedJob || "No saved contract", state.savedJob ? "READY" : "EMPTY"],
      ["ACTIVE", state.activeJob || "No accepted contract", state.activeJob ? "OPEN" : "EMPTY"],
      ["COMPLETED", state.completedJob || "No completed contract", state.completedJob ? "ARCHIVE" : "EMPTY"]
    ];
    ledger.innerHTML = rows.map(function (row) { return '<div class="nc-row"><b>' + h(row[0]) + '</b><span>' + h(row[1]) + '</span>' + (row[0] === "ACTIVE" && state.activeJob ? '<button class="nc-button secondary" data-nc-action="complete-job">Mark complete</button>' : '<em>' + h(row[2]) + '</em>') + '</div>'; }).join("");
  }

  function message(section, selector, text) {
    const target = section.querySelector(selector);
    if (target) target.textContent = text;
  }

  function bind(section, campaign) {
    const tablist = section.querySelector('[role="tablist"]');
    tablist.addEventListener("keydown", function (event) {
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
      const buttons = Array.from(tablist.querySelectorAll('[role="tab"]'));
      const current = buttons.indexOf(document.activeElement);
      if (current < 0) return;
      event.preventDefault();
      const direction = event.key === "ArrowRight" ? 1 : -1;
      const next = buttons[(current + direction + buttons.length) % buttons.length];
      next.focus();
      next.click();
    });
    section.addEventListener("click", function (event) {
      const tab = event.target.closest("[data-nc-tab]");
      if (tab) {
        section.querySelectorAll("[data-nc-tab]").forEach(function (item) { const active = item === tab; item.classList.toggle("active", active); item.setAttribute("aria-selected", active); });
        section.querySelectorAll("[data-nc-panel]").forEach(function (item) { item.hidden = item.dataset.ncPanel !== tab.dataset.ncTab; });
        return;
      }
      const action = event.target.closest("[data-nc-action]")?.dataset.ncAction;
      if (!action) return;
      if (action === "save-job") { updatePlayer({ savedJob: campaign.customJob.id }); updateLedger(section); }
      if (action === "apply-job") { updatePlayer({ activeJob: campaign.customJob.id, savedJob: campaign.customJob.id }); updateLedger(section); const listing = section.querySelector("#nc-gm-contract"); if (listing) listing.innerHTML = '<small>CONTRACT MOVED TO PERSONAL LEDGER</small><h3>Public listing removed on this terminal.</h3><p>Employer address, meeting window, and acceptance terms are now available through sealed board messages.</p>'; message(section, "#nc-inbox-status", "Application sent through your current burner identity. Sealed details: South Loop east service entrance // 23:40 // ask for Relay Nine."); }
      if (action === "complete-job") { const current = playerState().activeJob; updatePlayer({ activeJob: "", completedJob: current }); updateLedger(section); message(section, "#nc-inbox-status", "Completion recorded. Employer review and payment confirmation remain pending."); }
      if (action === "reply") message(section, "#nc-inbox-status", "Reply queued in sealed delivery. The board cannot confirm the recipient is still using that address.");
      if (action === "vote-believe" || action === "vote-rigged") message(section, "#nc-vote-status", action === "vote-believe" ? "Vote recorded. Confidence remains 46%; belief is not verification." : "Vote recorded. The poll is now being cited as evidence that the poll was planted.");
      if (action === "play-clip") message(section, "#nc-clip-status", "Reconstruction playing: 00:00–00:17. No verified audio track is attached.");
      if (action === "advertorial") alert("Assessment unavailable. Sponsor reports that your hesitation indicates an urgent need for premium protection.");
      if (action === "procurement-download") message(section, "#nc-procurement-status", "Formal record request opened. Estimated response: 30–180 business days, subject to departmental custody review.");
      if (action === "save-application") { updatePlayer({ civicDraft: true }); message(section, "#nc-application-status", "Incomplete request saved on this terminal. It has not been submitted to a department."); }
      if (action === "renewal") alert("Renewal preparation opened. Client authentication is required before account-specific terms can be displayed.");
    });

    section.addEventListener("submit", function (event) {
      event.preventDefault();
      const form = event.target;
      const data = new FormData(form);
      if (form.id === "nc-burner-form") { updatePlayer({ burner: data.get("handle"), role: data.get("role") }); message(section, "#nc-burner-status", "Burner issued: " + data.get("handle") + " // " + data.get("role") + ". Stored on this terminal."); }
      if (form.id === "nc-case-form") { const id = String(data.get("case")).toUpperCase(); message(section, "#nc-case-result", id === String(campaign.dangerCase.id).toUpperCase() ? campaign.dangerCase.status + " — " + campaign.dangerCase.note : "REFERENCE NOT RELEASED. Confirm the number or present client credentials."); }
      if (form.id === "nc-background-form") message(section, "#nc-background-status", "Intake DG-PRE-" + Math.floor(1000 + Math.random() * 8999) + " prepared. Payment and investigator acceptance remain pending.");
      if (form.id === "nc-evidence-form") message(section, "#nc-evidence-status", data.get("evidence") && data.get("evidence").name ? "Evidence staged locally: " + data.get("evidence").name + ". No file has been transmitted." : "Select a file before generating an evidence receipt.");
      if (form.id === "nc-property-form") message(section, "#nc-property-status", "INDEX RESULT: parcel located. Ownership chain contains two active claims; zoning is TEMPORARY MIXED RECONSTRUCTION. Certified copies require a formal request.");
      if (form.id === "nc-application-form") { updatePlayer({ civicApplication: data.get("application") }); message(section, "#nc-application-status", "STATUS: RECEIVED / NOT ASSIGNED. No reviewing department is currently listed."); }
      if (form.id === "nc-member-form") { updatePlayer({ traumaMember: data.get("name"), traumaPlan: data.get("plan") }); message(section, "#nc-member-status", "Local readiness card generated for " + data.get("name") + " // " + data.get("plan") + ". This is not proof of coverage."); }
      if (form.id === "nc-response-form") { const district = data.get("district"); const restricted = district === "Pacifica"; message(section, "#nc-response-status", restricted ? "RESTRICTED REVIEW: no standard estimate. Dispatch assessment required." : "ESTIMATED COMMAND REVIEW: 02:40–08:20. Travel and scene-entry time are additional."); }
      if (form.id === "nc-appointment-form") message(section, "#nc-appointment-status", "Request TT-APPT-" + Math.floor(10000 + Math.random() * 89999) + " received. A facility has not accepted the request.");
    });
  }

  function mount() {
    if (document.querySelector(".nc-expansion")) return;
    const campaign = window.NCNCampaign.get();
    const section = document.createElement("section");
    section.className = "nc-expansion nc-expansion--" + site;
    section.setAttribute("aria-label", "Additional interactive resources");
    section.innerHTML = renderers[site](campaign);
    const main = document.querySelector("main") || document.querySelector(".workspace") || document.body;
    main.appendChild(section);
    setFirstPanel(section);
    bind(section, campaign);
    updateLedger(section);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount, { once: true });
  else mount();
}());
