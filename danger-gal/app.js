const releases = {
  arboretum: {
    stamp: "CLOSED MATTER // SANITIZED RELEASE DG-45-0718",
    title: "Loggagia Arboretum Water Lily Recovery",
    body: [
      "Danger Gal confirms the recovery of several rare water lily specimens removed from the Loggagia Arboretum living vault at Night City University.",
      "The investigation identified a coordinated plant-poaching operation using legitimate propagation circles as cover. Puma Squad conducted undercover inquiries, documented the trafficking network, and recovered the specimens without further damage.",
      "A commissioning party was taken into custody after evidence established repeated acquisition of protected biological material. Identifying information, investigative methods, and disposition details remain withheld.",
      "This public release is a simplified account. It is issued to discourage similar thefts and to confirm the safe recovery of the specimens.",
    ],
  },
  credentials: {
    stamp: "PUBLIC ADVISORY // DG-45-0711",
    title: "Residential Credential Impersonation",
    body: [
      "Danger Gal has received reports of individuals presenting cloned contractor badges to gain access to residences in Watson and Little Europe.",
      "Legitimate auditors should provide a dispatch reference that can be verified through the contracting organization using a separately obtained contact channel. Do not use a number supplied by the visitor.",
      "Refusal to permit immediate access does not invalidate a legitimate inspection. Photographing a credential may trigger anti-copy protection; record the visible name, company, dispatch number, and arrival vehicle instead.",
      "Technical indicators that could help reproduce the cloned credentials have been withheld.",
    ],
  },
  witness: {
    stamp: "LIMITED INFORMATION REQUEST // DG-45-0629",
    title: "Unidentified Witness — Glen Transit Concourse",
    body: [
      "Danger Gal requests voluntary contact from an unidentified adult present near the east service corridor of the Glen transit concourse between 19:40 and 20:05 on June 26, 2045.",
      "The person may have observed events relevant to a private welfare inquiry. They are not accused of wrongdoing. Clothing, appearance, and direction of travel are withheld to reduce false identifications.",
      "Anyone responding should reference DG-45-0629 through the secure public drop. Danger Gal will not confirm the underlying client, subject, or event.",
    ],
  },
  badges: {
    stamp: "SAFETY BULLETIN // DG-45-0620",
    title: "Contractor Badge Cloning Indicators",
    body: [
      "A visible badge is not proof of current authorization. Confirm the visit through an independent channel and compare the worker, vehicle, and task against the dispatch record.",
      "Recent cloned credentials have shown delayed photo refresh, inconsistent edge lighting, and authorization summaries broader than the stated assignment.",
      "Do not scan an unfamiliar credential with personal cyberware. Use a building-owned reader or request remote verification.",
      "Replication techniques, affected credential standards, and active investigation details are withheld.",
    ],
  },
};

const publicAgents = {
  Mouse: "Public liaison and field operative recognized for agile recovery work and direct case leadership. Operational biography restricted.",
  Pantera: "Research and intelligence-systems specialist supporting archive work, technical inquiries, and discreet information recovery. Operational biography restricted.",
  Tigress: "Protective field operative and youth-outreach liaison with experience in high-risk environments. Current outreach schedules are not published.",
  "Doc Mittens": "Medical-support and forensic specialist attached to Puma Squad field operations. Patient and case information remains confidential.",
  Lynx: "Field investigator supporting tracking, interviews, evidence recovery, and protective assignments. Active deployment information is restricted.",
};

const policies = {
  privacy: {
    title: "Privacy notice",
    text: "Danger Gal separates public submissions from browsing sessions after intake where technically possible. Network metadata, malicious payloads, conflict-screening records, and legally required audit data may be retained. Case information is never available through public search.",
  },
  terms: {
    title: "Public portal terms",
    text: "Use of this portal does not create an investigator-client relationship, guarantee acceptance, reserve personnel, or establish confidentiality beyond applicable agreement and law. Do not submit material you are not authorized to disclose.",
  },
  disclosure: {
    title: "Public disclosure policy",
    text: "Danger Gal may release limited findings when disclosure supports safety, corrects a material public falsehood, or assists an approved information request. Sources, methods, clients, subjects, and operational details are withheld unless release is authorized and necessary.",
  },
};

const contentDialog = document.querySelector("#content-dialog");
const dialogContent = document.querySelector("#dialog-content");
const accessDialog = document.querySelector("#access-dialog");
const toast = document.querySelector("#toast");
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), 3600);
}

function showContent(html) {
  dialogContent.innerHTML = html;
  contentDialog.showModal();
}

const viewNames = {
  services: ["START", "Start a matter"],
  request: ["INTAKE", "Request intake"],
  releases: ["FILES", "Released files"],
  puma: ["PUMA", "Puma Squad"],
  submit: ["DROP", "Evidence drop"],
};

function activateView(id, updateHash = true) {
  const view = viewNames[id] ? id : "services";
  document.querySelectorAll("[data-view]").forEach((section) => {
    const active = section.dataset.view === view;
    section.hidden = !active;
    section.classList.toggle("active", active);
  });
  document.querySelectorAll("[data-view-target]").forEach((button) => {
    button.classList.toggle("active", button.dataset.viewTarget === view);
  });
  document.querySelector("#workspace-code").textContent = viewNames[view][0];
  document.querySelector("#workspace-title").textContent = viewNames[view][1];
  document.querySelector("#workspace").scrollIntoView({ block: "start" });
  if (updateHash && location.hash !== `#${view}`) history.pushState(null, "", `#${view}`);
}

document.querySelectorAll("[data-view-target]").forEach((button) => {
  button.addEventListener("click", () => activateView(button.dataset.viewTarget));
});

document.querySelectorAll("[data-view-link]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    activateView(link.dataset.viewLink);
  });
});

document.querySelectorAll("[data-service]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector("#service-select").value = button.dataset.service;
    activateView("request");
    showToast(`${button.dataset.service.toUpperCase()} SELECTED // COMPLETE THE CONFIDENTIAL INTAKE.`);
  });
});

document.querySelector("#intake-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const reference = `DG-PRE-${Math.floor(100000 + Math.random() * 900000)}`;
  document.querySelector("#intake-status").textContent = `RECEIVED // ${reference} // Preliminary conflict and eligibility review started. This reference does not grant client access.`;
  event.currentTarget.reset();
});

document.querySelectorAll("[data-release]").forEach((button) => {
  button.addEventListener("click", () => {
    const release = releases[button.dataset.release];
    showContent(`
      <span class="release-stamp">${release.stamp}</span>
      <h2>${release.title}</h2>
      ${release.body.map((paragraph) => `<p>${paragraph}</p>`).join("")}
      <h3>Information withheld</h3>
      <p><span class="redaction"></span> &nbsp; Client identity, source identities, investigative methods, and non-public evidence.</p>
    `);
  });
});

document.querySelectorAll("[data-agent]").forEach((button) => {
  button.addEventListener("click", () => {
    const name = button.dataset.agent;
    showContent(`
      <span class="release-stamp">PUMA SQUAD // PUBLIC TEAM BRIEF</span>
      <h2>${name}</h2>
      <p>${publicAgents[name]}</p>
      <p>Personal history, current assignments, technical capabilities, contact channels, and deployment status are not available through the public node.</p>
      <p><span class="redaction"></span> <span class="redaction"></span></p>
    `);
  });
});

document.querySelector("#puma-release").addEventListener("click", () => {
  showContent(`
    <span class="release-stamp">PUBLIC OUTREACH FILE // PUMA SQUAD</span>
    <h2>Visible by design. Capable by necessity.</h2>
    <p>Puma Squad is Danger Gal’s public-facing special-investigations team. Mouse, Pantera, Tigress, Doc Mittens, and Lynx support selected recovery matters, public-interest investigations, and community outreach.</p>
    <p>The team’s best-known public recovery involved rare water lily specimens stolen from the Loggagia Arboretum living vault at Night City University. A sanitized account is available in Public Releases.</p>
    <p>Entertainment adaptations and licensed merchandise do not constitute operational records. Do not use public appearances to infer active assignments.</p>
  `);
});

document.querySelector("#tip-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const receipt = `DROP-${Math.floor(10000 + Math.random() * 90000)}`;
  document.querySelector("#tip-status").textContent = `TRANSFER COMPLETE // ${receipt} // Material queued for analyst triage. A response is not guaranteed.`;
  event.currentTarget.reset();
});

function openAccess() {
  document.querySelector("#access-status").textContent = "";
  accessDialog.showModal();
}

document.querySelector("#open-access").addEventListener("click", openAccess);
document.querySelector("#open-access-header").addEventListener("click", openAccess);

document.querySelector("#access-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const status = document.querySelector("#access-status");
  status.textContent = "ACCESS NOT CONFIRMED // Record not recognized, credential expired, or case unavailable through this public node. Contact your assigned coordinator using the channel on your engagement letter.";
});

document.querySelectorAll("[data-policy]").forEach((button) => {
  button.addEventListener("click", () => {
    const policy = policies[button.dataset.policy];
    showContent(`<span class="release-stamp">DANGER GAL PUBLIC NODE</span><h2>${policy.title}</h2><p>${policy.text}</p>`);
  });
});

document.querySelectorAll("[data-close-dialog]").forEach((button) => {
  button.addEventListener("click", () => button.closest("dialog").close());
});

[contentDialog, accessDialog].forEach((dialog) => {
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
});

window.addEventListener("hashchange", () => activateView(location.hash.slice(1), false));
activateView(location.hash.slice(1), false);
