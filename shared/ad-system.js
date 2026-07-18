(function () {
  "use strict";

  const loader = document.currentScript;
  const sharedBase = loader && loader.src ? new URL(".", loader.src) : new URL("../shared/", location.href);
  const adBase = new URL("../shared-ads/", sharedBase);
  const stylesheet = document.createElement("link");
  stylesheet.rel = "stylesheet";
  stylesheet.href = new URL("ad-system.css", sharedBase).href;
  document.head.appendChild(stylesheet);

  const legit = [
    ["legit/spider-cyberchair.png", "Rocklin Spider Cyberchair"],
    ["legit/microcutie.png", "MicroCutie Personal Defense"],
    ["legit/superflash.png", "Superflash Jacket"],
    ["legit/trauma-medscan.png", "Trauma Team MedScan"],
    ["legit/ziggurat.png", "Ziggurat City Database"],
    ["legit/garden.png", "The Garden"],
    ["legit/digital-gladiator.png", "Digital Gladiator"],
    ["legit/cybereye.png", "Sponsored Cybereye"],
    ["legit/dynalar.png", "Dynalar Cyberhand"],
    ["legit/biotechnica-health.png", "Biotechnica Health Monitor"],
    ["legit/masetto.png", "Masetto Holo-Wear"],
    ["legit/fire-brand.png", "Fire Brand Bunker Gear"],
    ["legit/tanson-bellhop.png", "Tanson Bellhop"],
    ["legit/killstrom.png", "Killstrom Sonic Boom Amp"],
    ["legit/drink-master.png", "Drink Master 3000"],
    ["legit/habitat.png", "One Touch Habitat"],
    ["legit/combat-cabb.png", "Combat Cabb"],
    ["legit/aerocab.png", "Aerocab"],
    ["legit/ncart.png", "NCART"],
    ["legit/playland.png", "Playland by the Sea"],
    ["legit/elflines.png", "Elflines Online"],
    ["legit/kibble.png", "Kibble Krunch"],
    ["legit/bc-dynalar-fingers.png", "Dynalar Modular Finger Enthusiast"],
    ["legit/bc-laser-jacket.png", "Laser Light Street Jacket"],
    ["legit/bc-doberman.png", "KTech Doberman 500"],
    ["legit/bc-mr-biscuit.png", "Mr. Biscuit Multi-Food Processor"],
    ["legit/bc-aerial-sphere.png", "WorldSat Aerial Sphere"],
    ["legit/bc-jetboy.png", "Tanson JetBoy"],
    ["legit/bc-grundy.png", "The Grundy"],
    ["legit/bc-boomerang.png", "Ranger Combat Boomerang"],
    ["legit/bc-rush-revolution.png", "Segotari Rush Revolution"],
    ["legit/bc-zonda.png", "Zonda Metrocar"],
    ["legit/miller.png", "Miller Protection"],
    ["legit/neonova.png", "NeoNova"],
    ["legit/companion.png", "Companion Technologies"],
    ["legit/vektor.png", "Vektor Dataforts"],
    ["legit/vortec.png", "Vortec Precision Systems"]
  ].map(function (entry) { return { src: entry[0], label: entry[1], scam: false }; });

  const scams = [
    ["scam/scam-01-euroclear-refund.png", "Unclaimed account restitution"],
    ["scam/scam-02-rapid-angel.png", "Free emergency coverage"],
    ["scam/scam-03-memory-chip-liquidation.png", "Mil-spec memory chips"],
    ["scam/scam-04-civic-warrant.png", "Civic warrant detected"],
    ["scam/scam-05-kibble-futures.png", "Kibble Futures"],
    ["scam/scam-06-human-trial.png", "Human Trial 7"],
    ["scam/scam-07-container-homes.png", "Luxury container homes"],
    ["scam/scam-08-mara-transit.png", "Mara needs your help"],
    ["scam/scam-09-estate-beneficiary.png", "Estate beneficiary located"],
    ["scam/scam-10-agent-upgrade.png", "Agent 12 upgrade"],
    ["scam/scam-11-channel-88-viewer-reward.png", "Channel 88 viewer reward"],
    ["scam/scam-12-power-disconnection.png", "Grid disconnection pending"],
    ["scam/scam-13-cyberware-warranty.png", "Cyberware warranty extension"],
    ["scam/scam-14-courier-job-bond.png", "MetroFlash courier recruitment"],
    ["scam/scam-15-pet-restoration.png", "SecondTail pet restoration"],
    ["scam/scam-16-radiopure-detox.png", "RadioPure detox patch"],
    ["scam/scam-17-identity-reset.png", "Credstar identity reset"],
    ["scam/scam-18-braindance-refund.png", "Braindance refund approved"],
    ["scam/scam-19-home-safety-audit.png", "Mandatory home safety audit"],
    ["scam/scam-20-relief-fund.png", "Children of the Red Relief Fund"],
    ["scam/scam-21-preparatory-school.png", "Aras Heights Preparatory"],
    ["scam/scam-22-luck-grid-lottery.png", "Night City Luck Grid"],
    ["scam/scam-23-identity-breach-recovery.png", "Datavault recovery authority"],
    ["scam/scam-24-iron-saint-protection.png", "Iron Saint personal defense"],
    ["scam/scam-25-eldergrove-game-item.png", "Eldergrove founder armor"]
  ].map(function (entry) { return { src: entry[0], label: entry[1], scam: true }; });

  const path = location.pathname.toLowerCase();
  const site = path.includes("network-54") ? "network54" : path.includes("nc-civicnet") ? "civic" : path.includes("elflines-online") ? "elflines" : path.includes("trauma-team") ? "trauma" : "none";
  if (site === "none" || path.includes("webring")) return;

  const byName = function (names, source) {
    return source.filter(function (item) { return names.some(function (name) { return item.src.includes(name); }); });
  };
  const pools = {
    network54: legit.concat(scams),
    civic: byName(["ncart", "aerocab", "habitat", "ziggurat", "bc-mr-biscuit", "bc-zonda", "playland", "combat-cabb"], legit)
      .concat(byName(["civic-warrant", "power-disconnection", "home-safety", "relief-fund", "container-homes", "estate-beneficiary", "identity-breach", "agent-upgrade", "euroclear", "human-trial"], scams)),
    elflines: byName(["elflines", "kibble", "rush-revolution", "digital-gladiator", "superflash", "killstrom", "drink-master", "garden", "playland", "laser-jacket"], legit)
      .concat(byName(["eldergrove", "memory-chip", "agent-upgrade", "mara-transit", "identity-reset", "braindance-refund", "courier-job", "viewer-reward", "luck-grid", "pet-restoration"], scams)),
    trauma: byName(["trauma-medscan", "biotechnica-health", "cybereye", "dynalar", "habitat", "bc-aerial-sphere", "bc-zonda", "rocklin"], legit)
  };
  const pool = pools[site];
  if (!pool || !pool.length) return;

  const labels = {
    network54: ["COMMERCIAL GUIDANCE", "Paid placements selected by audience profile"],
    civic: ["OUTSOURCED PORTAL SPONSORS", "Ad inventory administered by the lowest qualified bidder"],
    elflines: ["DATAPOOL SPONSORS", "Ad revenue funds approximately none of our server costs"],
    trauma: ["MEMBER SERVICES PARTNERS", "Independent products shown for member convenience"]
  }[site];

  let cursor = Math.abs(Array.from(path).reduce(function (sum, char) { return ((sum * 31) + char.charCodeAt(0)) | 0; }, 7)) % pool.length;
  const section = document.createElement("section");
  section.className = "nc-ad-deck nc-ad-" + site;
  section.innerHTML = '<header><div><small>' + labels[0] + '</small><h2>' + labels[1] + '</h2></div><button type="button" class="nc-ad-refresh">Show different placements</button></header><div class="nc-ad-grid" aria-live="polite"></div><p class="nc-ad-fine">External destinations are not preserved in this 2045 archive. Advertiser identity and certificate status may vary by Data Pool relay.</p>';

  const target = document.querySelector("main") || document.querySelector("#content") || document.body;
  const footer = document.querySelector("footer");
  if (footer && footer.parentNode) footer.parentNode.insertBefore(section, footer); else target.appendChild(section);

  const grid = section.querySelector(".nc-ad-grid");
  function render() {
    grid.innerHTML = "";
    const count = site === "trauma" ? 2 : 3;
    for (let i = 0; i < count; i += 1) {
      const item = pool[(cursor + i) % pool.length];
      const button = document.createElement("button");
      button.type = "button";
      button.className = "nc-ad-card";
      button.setAttribute("aria-label", "Open advertisement: " + item.label);
      button.innerHTML = '<span>PAID PLACEMENT</span><img src="' + new URL(item.src, adBase).href + '" alt="' + item.label.replace(/"/g, "&quot;") + ' advertisement" loading="lazy" decoding="async"><b>' + item.label + '</b>';
      button.addEventListener("click", function () { openNotice(item); });
      grid.appendChild(button);
    }
  }

  function openNotice(item) {
    const modal = document.createElement("div");
    modal.className = "nc-ad-backdrop";
    const title = item.scam ? "SECURITY HANDSHAKE FAILED" : "ARCHIVED DESTINATION UNAVAILABLE";
    const copy = item.scam
      ? "The destination certificate does not match the advertiser identity. This connection has been quarantined by the local relay. No account or payment information was transmitted."
      : "This sponsor destination was not preserved with the Night City archive. The advertisement remains available as a period record, but its external service cannot be reached.";
    modal.innerHTML = '<div class="nc-ad-modal" role="dialog" aria-modal="true" aria-label="Advertisement status"><small>DATAPOOL LINK STATUS</small><h2>' + title + '</h2><p>' + copy + '</p><code>' + item.label + ' // RELAY ' + (item.scam ? 'CERT-MISMATCH' : 'ARCHIVE-ONLY') + '</code><button type="button">Return to site</button></div>';
    document.body.appendChild(modal);
    const close = function () { modal.remove(); document.removeEventListener("keydown", key); };
    const key = function (event) { if (event.key === "Escape") close(); };
    modal.querySelector("button").addEventListener("click", close);
    modal.addEventListener("click", function (event) { if (event.target === modal) close(); });
    document.addEventListener("keydown", key);
    modal.querySelector("button").focus();
  }

  section.querySelector(".nc-ad-refresh").addEventListener("click", function () {
    cursor = (cursor + (site === "trauma" ? 2 : 3)) % pool.length;
    render();
  });
  render();
}());
