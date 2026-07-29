const roles = ["Solo", "Netrunner", "Tech", "Medtech", "Driver", "Face", "Scout"];
const workTypes = ["Extraction", "Protection", "Investigation", "Transport", "Netrunning", "Recovery", "Technical"];
const districts = ["City Center", "Heywood", "Little Europe", "New Westbrook", "Pacifica", "Santo Domingo", "South Night City", "Watson", "Outside Night City"];

const jobs = [
  {
    id: "RAS-11842", title: "Get the singer out before encore", type: "Extraction", district: "New Westbrook",
    pay: 8500, crew: "3–4", danger: "High", client: "Blue Lantern Mgmt", trust: "VERIFIED CLIENT / 11 JOBS",
    summary: "A contracted performer wants out of an exclusive venue deal tonight. Quiet exit preferred; venue security expects trouble.",
    brief: "Move one willing principal from a private dressing level to a waiting vehicle before the final set ends. The venue controls the street exits and employs armed private security. Client supplies access credentials that may survive one scan.",
    flags: ["ARMED SECURITY", "HARD DEADLINE", "PRINCIPAL CONSENTS"], featured: true,
  },
  {
    id: "RAS-11839", title: "Recover a courier bike and sealed case", type: "Recovery", district: "Watson",
    pay: 3200, crew: "2", danger: "Medium", client: "KITE//LOGISTICS", trust: "BOARD VERIFIED / 4 JOBS",
    summary: "Bike stopped transmitting near the old Kabuki warehouses. Recover the vehicle and unopened cargo. Courier status unknown.",
    brief: "Locate a black Yaiba courier bike and its locked rear case. Return both intact. If the courier is alive, extraction is included. The client will not identify the cargo publicly but denies corporate ownership.",
    flags: ["UNKNOWN CARGO", "COURIER MISSING"],
  },
  {
    id: "RAS-11831", title: "Three nights of discreet protection", type: "Protection", district: "Little Europe",
    pay: 5400, crew: "2", danger: "Medium", client: "MothHouse Records", trust: "VERIFIED CLIENT / ESCROW FUNDED",
    summary: "Protect a producer during studio sessions and transit. Stalker has escalated from messages to physical access attempts.",
    brief: "Provide low-visibility protection during three evening recording sessions, including transport between a Little Europe residence and studio. Client wants the subject’s routine preserved and media attention avoided.",
    flags: ["ESCROW FUNDED", "LOW PROFILE", "KNOWN THREAT"],
  },
  {
    id: "RAS-11827", title: "Audit a warehouse subnet from inside", type: "Netrunning", district: "Santo Domingo",
    pay: 6800, crew: "2–3", danger: "Unknown", client: "PatchTuesday", trust: "NEW CLIENT / ID PARTIAL",
    summary: "Physical access required. Map the local architecture, identify an unauthorized listener, and leave existing systems functional.",
    brief: "A small manufacturer believes a competitor planted a listener inside an isolated warehouse subnet. The runner must enter the site, map the architecture, locate the tap, and provide proof without shutting production down.",
    flags: ["NEW CLIENT", "ONSITE NETRUN", "CORP LINKS DENIED"],
  },
  {
    id: "RAS-11822", title: "Drive a refrigerated van across town", type: "Transport", district: "South Night City",
    pay: 1700, crew: "1–2", danger: "Low", client: "GoodDog Catering", trust: "DISPUTED / 2 LATE PAYMENTS",
    summary: "Pickup in South Night City, delivery in Heywood. Van supplied. Client insists refrigeration stay powered.",
    brief: "Collect a refrigerated catering van and deliver it to a Heywood loading dock within ninety minutes. Do not open the cargo compartment. Two prior runners report delayed payment; client disputes both reviews.",
    flags: ["PAYMENT DISPUTE", "SEALED CARGO", "TOO EASY"],
  },
  {
    id: "RAS-11818", title: "Find who is spoofing our dispatch calls", type: "Investigation", district: "Heywood",
    pay: 4200, crew: "2", danger: "Medium", client: "La Estrella Cabs", trust: "VERIFIED LOCAL BUSINESS",
    summary: "Drivers are being redirected into robberies by a convincing copy of the company dispatcher. Identify the source and obtain evidence.",
    brief: "Trace false dispatch calls that have redirected four drivers into staged pickups. Determine whether the breach is technical, internal, or both. Evidence suitable for leverage is preferred to a public confrontation.",
    flags: ["LOCAL BUSINESS", "POSSIBLE INSIDER"],
  },
  {
    id: "RAS-11809", title: "Rebuild a clinic generator controller", type: "Technical", district: "Pacifica",
    pay: 2300, crew: "1–2", danger: "Medium", client: "Harbor Street Mutual Aid", trust: "COMMUNITY VERIFIED / ESCROW PARTIAL",
    summary: "A damaged controller keeps dropping a neighborhood clinic to battery power. Parts are scarce and the block is contested.",
    brief: "Diagnose and repair or replace the controller for a clinic backup generator. The client can provide limited parts and local guides. Two gangs contest the surrounding blocks but neither has targeted the clinic directly.",
    flags: ["COMMUNITY RATE", "CONTESTED BLOCK", "PARTIAL ESCROW"],
  },
  {
    id: "RAS-11796", title: "Locate missing braindance editor", type: "Investigation", district: "City Center",
    pay: 12000, crew: "3", danger: "High", client: "NO SIGNAL", trust: "ANONYMOUS / ESCROW CONFIRMED",
    summary: "Editor disappeared after completing an unreleased cut. Confirm welfare, recover work shard if offered, and avoid publicity.",
    brief: "Find a freelance editor last seen leaving a City Center post-production suite. The client will provide biometric confirmation and recent contacts after acceptance. Recovery of the editor takes priority over any media.",
    flags: ["ANONYMOUS CLIENT", "ESCROW CONFIRMED", "CORPORATE INTEREST"],
  },
];

const runners = [
  { id: "rivet", handle: "Rivet", initials: "RV", roles: ["Tech", "Driver"], status: "Available now", rate: "1,000eb+", verified: true, score: "4.8 / 5", jobs: 19, area: "Santo Domingo", pitch: "Vehicle systems, improvised repairs, and ugly machines made reliable enough to get everyone home.", preferred: "Recovery, transport, field repair", refused: "Human cargo without consent" },
  { id: "nightjar", handle: "Nightjar", initials: "NJ", roles: ["Netrunner", "Scout"], status: "Selective", rate: "2,500eb+", verified: true, score: "4.9 / 5", jobs: 31, area: "Citywide", pitch: "Quiet architecture work, signal tracing, and reconnaissance for crews that understand the word quiet.", preferred: "Investigation, controlled intrusion", refused: "Blackwall contact, revenge leaks" },
  { id: "brickhouse", handle: "Brickhouse", initials: "BH", roles: ["Solo", "Driver"], status: "Available now", rate: "1,000eb+", verified: true, score: "4.6 / 5", jobs: 27, area: "Heywood", pitch: "Protection and extraction specialist. Plans exits before entrances. Brings own transport when the rate supports it.", preferred: "Protection, extraction", refused: "Wetwork on civilians" },
  { id: "velvet", handle: "Velvet Static", initials: "VS", roles: ["Face", "Scout"], status: "Available now", rate: "1,000eb+", verified: false, disputed: true, score: "4.2 / 5", jobs: 12, area: "New Westbrook", pitch: "Guest lists, social access, identity work, and conversations people remember differently afterward.", preferred: "Social entry, negotiation", refused: "Kidnapping, cult recruitment" },
  { id: "patch", handle: "Patchwork", initials: "PW", roles: ["Medtech", "Tech"], status: "Crew only", rate: "Negotiable", verified: true, score: "4.7 / 5", jobs: 23, area: "Watson", pitch: "Field medicine, cyberware stabilization, and getting injured professionals to the next sunrise.", preferred: "Crew support, community work", refused: "Organ harvesting" },
  { id: "switchback", handle: "Switchback", initials: "SB", roles: ["Driver", "Scout"], status: "Available now", rate: "500eb+", verified: true, score: "4.5 / 5", jobs: 16, area: "South Night City", pitch: "Routes, pursuit breaks, discreet pickup, and off-road shortcuts that do not appear on municipal maps.", preferred: "Transport, extraction", refused: "Unrestrained explosives in cabin" },
  { id: "sable", handle: "Sable", initials: "SA", roles: ["Solo", "Scout"], status: "Selective", rate: "2,500eb+", verified: true, score: "4.9 / 5", jobs: 38, area: "Little Europe", pitch: "Counter-surveillance, protective advance work, and precise force when avoiding force has failed.", preferred: "High-risk protection", refused: "Open-ended gang wars" },
  { id: "zero", handle: "Zero Coolant", initials: "0C", roles: ["Netrunner", "Tech"], status: "Available now", rate: "1,000eb+", verified: false, disputed: true, score: "3.9 / 5", jobs: 8, area: "Pacifica", pitch: "Industrial control systems and cheap subnet work. Ignore the handle; refrigeration incident was settled.", preferred: "Infrastructure, sabotage", refused: "Nothing listed" },
];

const routes = ["jobs", "runners", "crew", "post", "profile"];
const dialog = document.querySelector("#detail-dialog");
const dialogContent = document.querySelector("#dialog-content");
const toast = document.querySelector("#toast");
let activeRole = "All";
let toastTimer;

function money(value) {
  return `${new Intl.NumberFormat("en-US").format(value)}eb`;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3400);
}

function showDialog(html) {
  dialogContent.innerHTML = html;
  dialog.showModal();
}

function activateRoute(id, updateHash = true) {
  const route = routes.includes(id) ? id : "jobs";
  document.querySelectorAll("[data-route]").forEach((view) => {
    const active = view.dataset.route === route;
    view.hidden = !active;
    view.classList.toggle("active", active);
  });
  document.querySelectorAll("[data-route-target]").forEach((button) => button.classList.toggle("active", button.dataset.routeTarget === route));
  document.querySelector("#market").scrollIntoView({ block: "start" });
  if (updateHash && location.hash !== `#${route}`) history.pushState(null, "", `#${route}`);
}

function flagClass(flag) {
  if (/ESCROW|CONSENTS|COMMUNITY RATE|LOCAL BUSINESS/.test(flag)) return "good";
  if (/UNKNOWN|DISPUTE|CORP|ARMED|ANONYMOUS|CONTESTED|TOO EASY/.test(flag)) return "warn";
  return "";
}

function renderJobs() {
  const query = document.querySelector("#job-search").value.trim().toLowerCase();
  const type = document.querySelector("#job-type").value;
  const district = document.querySelector("#job-district").value;
  const minPay = Number(document.querySelector("#job-pay").value);
  const shown = jobs.filter((job) => {
    const haystack = `${job.title} ${job.client} ${job.summary} ${job.flags.join(" ")}`.toLowerCase();
    return (!query || haystack.includes(query)) && (type === "all" || job.type === type) && (district === "all" || job.district === district) && job.pay >= minPay;
  });

  document.querySelector("#job-board").innerHTML = shown.map((job) => `
    <article class="job-card${job.featured ? " featured" : ""}" data-id="${job.id}">
      <div class="job-meta"><span class="pay">${money(job.pay)}</span><span>${job.district}</span><span>${job.type.toUpperCase()}</span><span>DANGER: ${job.danger.toUpperCase()}</span></div>
      <div class="job-title"><h2>${job.title}</h2><span>CLIENT // ${job.client} · CREW ${job.crew}</span></div>
      <div><p class="job-summary">${job.summary}</p><div class="job-flags">${job.flags.map((flag) => `<span class="flag ${flagClass(flag)}">${flag}</span>`).join("")}</div></div>
      <div class="job-action"><span class="trust">CLIENT STATUS<b>${job.trust}</b></span><button type="button" data-job="${job.id}">READ CONTRACT</button></div>
    </article>
  `).join("");
  document.querySelector("#job-result-count").textContent = `${shown.length} CONTRACT${shown.length === 1 ? "" : "S"}`;
  document.querySelector("#job-empty").hidden = shown.length !== 0;
}

function openJob(id) {
  const job = jobs.find((item) => item.id === id);
  showDialog(`
    <span class="dialog-code">${job.id} // PUBLIC CONTRACT PREVIEW</span>
    <h2>${job.title}</h2>
    <div class="dialog-facts"><div><span>PAY</span><b>${money(job.pay)}</b></div><div><span>DISTRICT</span><b>${job.district}</b></div><div><span>CREW / DANGER</span><b>${job.crew} / ${job.danger}</b></div></div>
    <p>${job.brief}</p>
    <h3>Client disclosures</h3>
    <p>${job.flags.join(" // ")}</p>
    <h3>Board note</h3>
    <p>${job.trust}. Board verification confirms only the stated marker. It does not guarantee complete disclosure, payment beyond funded escrow, legality, or survival.</p>
    <div class="dialog-actions"><button type="button" data-apply-job="${job.id}">APPLY TO CONTRACT</button><button type="button" class="secondary" data-report-job="${job.id}">REPORT LISTING</button></div>
  `);
}

function renderRunners() {
  const query = document.querySelector("#runner-search").value.trim().toLowerCase();
  const available = document.querySelector("#available-only").checked;
  const shown = runners.filter((runner) => {
    const haystack = `${runner.handle} ${runner.roles.join(" ")} ${runner.pitch} ${runner.preferred}`.toLowerCase();
    return (!query || haystack.includes(query)) && (activeRole === "All" || runner.roles.includes(activeRole)) && (!available || runner.status === "Available now");
  });
  document.querySelector("#runner-grid").innerHTML = shown.map((runner) => `
    <article class="runner-card">
      <div class="runner-portrait">${runner.initials}<span class="runner-status${runner.status === "Available now" ? "" : " selective"}">${runner.status.toUpperCase()}</span></div>
      <div class="runner-body"><h2>${runner.handle}</h2><span class="roles">${runner.roles.join(" / ").toUpperCase()}</span><p>${runner.pitch}</p>
        <div class="runner-stats"><span>BOARD SCORE<b>${runner.score}${runner.disputed ? " · DISPUTED" : ""}</b></span><span>LISTED JOBS<b>${runner.jobs}</b></span><span>BASE RATE<b>${runner.rate}</b></span><span>AREA<b>${runner.area}</b></span></div>
      </div>
      <div class="runner-actions"><button type="button" data-runner="${runner.id}">VIEW PROFILE</button><button type="button" data-hire="${runner.id}">DIRECT OFFER</button></div>
    </article>
  `).join("");
  document.querySelector("#runner-empty").hidden = shown.length !== 0;
}

function openRunner(id) {
  const runner = runners.find((item) => item.id === id);
  showDialog(`
    <span class="dialog-code">RUNNER PROFILE // ${runner.verified ? "BOARD VERIFIED" : "IDENTITY PARTIAL"}${runner.disputed ? " // CLAIM DISPUTED" : ""}</span>
    <h2>${runner.handle}</h2>
    <div class="dialog-facts"><div><span>ROLES</span><b>${runner.roles.join(" / ")}</b></div><div><span>STATUS</span><b>${runner.status}</b></div><div><span>BASE RATE</span><b>${runner.rate}</b></div></div>
    <p>${runner.pitch}</p><h3>Preferred work</h3><p>${runner.preferred}</p><h3>Public red lines</h3><p>${runner.refused}</p>
    <h3>Reputation notice</h3><p>${runner.score} across ${runner.jobs} listed jobs. Reviews may be anonymous, incomplete, contested, or written by people with excellent reasons to lie.</p>
    <div class="dialog-actions"><button type="button" data-hire="${runner.id}">SEND DIRECT OFFER</button><button type="button" class="secondary" data-report-runner="${runner.id}">REPORT PROFILE</button></div>
  `);
}

function beginDirectOffer(id) {
  const runner = runners.find((item) => item.id === id);
  dialog.close();
  document.querySelector("#posting-type").value = "direct";
  document.querySelector("#direct-runner-label").hidden = false;
  document.querySelector("#direct-runner").value = id;
  activateRoute("post");
  showToast(`DIRECT OFFER SELECTED // ${runner.handle.toUpperCase()}`);
}

function buildCrew(event) {
  event.preventDefault();
  const selected = [...document.querySelectorAll('#crew-roles input:checked')].map((input) => input.value);
  const size = Number(document.querySelector("#crew-size").value);
  const output = document.querySelector("#crew-output");
  if (!selected.length) {
    output.innerHTML = '<span class="stencil">SELECTION REQUIRED</span><h2>Pick at least one role.</h2><p>The board cannot build a crew around “somebody good at stuff.”</p>';
    return;
  }
  const ranked = runners
    .filter((runner) => runner.status !== "Selective" || selected.some((role) => runner.roles.includes(role)))
    .map((runner) => ({ runner, matches: runner.roles.filter((role) => selected.includes(role)).length }))
    .filter((item) => item.matches)
    .sort((a, b) => b.matches - a.matches || Number(b.runner.verified) - Number(a.runner.verified))
    .slice(0, size);
  output.innerHTML = `
    <span class="stencil">SUGGESTED CREW // ${selected.join(" + ").toUpperCase()}</span>
    <h2>${ranked.length === size ? "Possible crew found." : "Partial crew only."}</h2>
    <p>Contact each runner separately. A match is not an acceptance, reservation, or compatibility guarantee.</p>
    <div class="crew-list">${ranked.map(({ runner }) => `<div class="crew-pick"><i>${runner.initials}</i><b>${runner.handle}</b><span>${runner.roles.join(" / ")} · ${runner.status}</span></div>`).join("")}</div>`;
}

function fillSelect(id, values, includePrompt = false) {
  const select = document.querySelector(id);
  select.innerHTML = `${includePrompt ? '<option value="">Choose one</option>' : ""}${values.map((value) => `<option>${value}</option>`).join("")}`;
}

fillSelect("#job-type", ["All work", ...workTypes]);
document.querySelector("#job-type").firstElementChild.value = "all";
fillSelect("#job-district", ["All districts", ...districts]);
document.querySelector("#job-district").firstElementChild.value = "all";
fillSelect("#contract-type", workTypes, true);
fillSelect("#contract-district", districts, true);
fillSelect("#profile-district", ["Citywide", ...districts]);
document.querySelector("#direct-runner").innerHTML = runners.map((runner) => `<option value="${runner.id}">${runner.handle} // ${runner.roles.join(" + ")}</option>`).join("");
document.querySelector("#role-chips").innerHTML = ["All", ...roles].map((role) => `<button type="button" class="${role === "All" ? "active" : ""}" data-role="${role}">${role.toUpperCase()}</button>`).join("");
document.querySelector("#crew-roles").innerHTML = roles.map((role) => `<label><input type="checkbox" value="${role}"> ${role}</label>`).join("");
document.querySelector("#profile-roles").innerHTML = roles.map((role) => `<label><input type="checkbox" name="role" value="${role}"> ${role}</label>`).join("");
document.querySelector("#open-count").textContent = `${jobs.length} OPEN CONTRACTS`;

document.querySelectorAll("[data-route-target]").forEach((button) => button.addEventListener("click", () => activateRoute(button.dataset.routeTarget)));
document.querySelectorAll("[data-route-link]").forEach((link) => link.addEventListener("click", (event) => { event.preventDefault(); activateRoute(link.dataset.routeLink); }));
document.querySelector("#job-filters").addEventListener("input", renderJobs);
document.querySelector("#job-filters").addEventListener("reset", () => setTimeout(renderJobs));
document.querySelector("#job-board").addEventListener("click", (event) => {
  const button = event.target.closest("[data-job]");
  if (button) openJob(button.dataset.job);
});
document.querySelector("#runner-filters").addEventListener("input", renderRunners);
document.querySelector("#role-chips").addEventListener("click", (event) => {
  const button = event.target.closest("[data-role]");
  if (!button) return;
  activeRole = button.dataset.role;
  document.querySelectorAll("[data-role]").forEach((item) => item.classList.toggle("active", item === button));
  renderRunners();
});
document.querySelector("#runner-grid").addEventListener("click", (event) => {
  const profileButton = event.target.closest("[data-runner]");
  const hireButton = event.target.closest("[data-hire]");
  if (profileButton) openRunner(profileButton.dataset.runner);
  if (hireButton) beginDirectOffer(hireButton.dataset.hire);
});
document.querySelector("#crew-form").addEventListener("submit", buildCrew);

document.querySelector("#posting-type").addEventListener("change", (event) => {
  document.querySelector("#direct-runner-label").hidden = event.target.value !== "direct";
});
document.querySelector("#contract-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const direct = document.querySelector("#posting-type").value === "direct";
  const reference = `RAS-${direct ? "DIRECT" : "POST"}-${Math.floor(10000 + Math.random() * 90000)}`;
  document.querySelector("#contract-status").textContent = `${direct ? "OFFER SEALED" : "BOARD REVIEW QUEUED"} // ${reference} // This preview does not create a live shared listing.`;
  event.currentTarget.reset();
  document.querySelector("#direct-runner-label").hidden = true;
});
document.querySelector("#profile-form").addEventListener("submit", (event) => {
  event.preventDefault();
  if (!document.querySelector('#profile-roles input:checked')) {
    document.querySelector("#profile-status").textContent = "SELECT AT LEAST ONE PRIMARY ROLE.";
    return;
  }
  const reference = `RAS-PROFILE-${Math.floor(10000 + Math.random() * 90000)}`;
  document.querySelector("#profile-status").textContent = `PENDING PROFILE CREATED // ${reference} // Identity and claim review required before public listing.`;
  event.currentTarget.reset();
});

dialog.addEventListener("click", (event) => {
  const apply = event.target.closest("[data-apply-job]");
  const hire = event.target.closest("[data-hire]");
  if (apply) {
    dialog.close();
    showToast(`APPLICATION DROP OPENED // ${apply.dataset.applyJob} // CLIENT CONTACT REMAINS SEALED`);
  }
  if (hire) beginDirectOffer(hire.dataset.hire);
  if (event.target.closest("[data-report-job], [data-report-runner]")) {
    dialog.close();
    showToast("REPORT RECEIVED // BOARD MODERATION QUEUE UPDATED");
  }
  if (event.target === dialog) dialog.close();
});
document.querySelector("[data-close-dialog]").addEventListener("click", () => dialog.close());

document.querySelector("#open-safety").addEventListener("click", () => showDialog(`
  <span class="dialog-code">BOARD SAFETY // READ BEFORE ACCEPTANCE</span><h2>The listing is not the truth.</h2>
  <ul><li>Verify the client through a channel they did not provide.</li><li>Keep exact meet locations off public posts.</li><li>Agree on payment, expenses, and extraction before deployment.</li><li>Disclose conflicts inside the crew.</li><li>A funded escrow marker covers only the displayed amount.</li></ul>
  <p>Rent-A-Samurai hosts claims and reputation signals. It does not investigate every contract, dispatch emergency assistance, or guarantee any participant.</p>
`));
document.querySelector("#open-burn-policy").addEventListener("click", () => showDialog(`
  <span class="dialog-code">MODERATION POLICY // BURN NOTICES</span><h2>Permanent marks require evidence.</h2>
  <p>A burn notice may be added for verified nonpayment, deliberate ambush, stolen credentials, review manipulation, or material falsification. Accused users may publish one dispute statement.</p>
  <p>Rumor alone receives a temporary caution marker, not a permanent notice. Board moderators may be wrong, bribed, threatened, asleep, or all four.</p>
`));

window.addEventListener("hashchange", () => activateRoute(location.hash.slice(1), false));
renderJobs();
renderRunners();
activateRoute(location.hash.slice(1), false);
