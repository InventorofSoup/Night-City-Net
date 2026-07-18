(function () {
  "use strict";

  if (document.querySelector("[data-nc-ad-system]")) return;
  document.documentElement.setAttribute("data-nc-ad-system", "loading");

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
    ["scam/scam-17-identity-reset-banner.png", "Credstar identity reset"],
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
    civic: byName(["miller", "neonova", "companion", "vortec"], legit)
      .concat(byName(["power-disconnection", "relief-fund", "identity-reset-banner", "viewer-reward", "euroclear"], scams)),
    elflines: byName(["elflines", "kibble", "rush-revolution", "digital-gladiator", "superflash", "killstrom", "drink-master", "garden", "playland", "laser-jacket"], legit)
      .concat(byName(["eldergrove", "memory-chip", "agent-upgrade", "mara-transit", "identity-reset", "braindance-refund", "courier-job", "viewer-reward", "luck-grid", "pet-restoration"], scams)),
    trauma: byName(["trauma-medscan", "biotechnica-health", "cybereye", "dynalar", "habitat", "bc-aerial-sphere", "bc-zonda", "rocklin"], legit)
  };
  const pool = pools[site];
  if (!pool || !pool.length) return;

  let cursor = Math.abs(Array.from(path).reduce(function (sum, char) { return ((sum * 31) + char.charCodeAt(0)) | 0; }, 7)) % pool.length;

  const wideNames = ["elflines", "aerial-sphere", "grundy", "viewer-reward", "power-disconnection", "eldergrove", "relief-fund", "identity-reset", "miller", "companion", "neonova", "euroclear", "vortec", "spider-cyberchair", "superflash", "trauma-medscan", "ziggurat", "garden", "digital-gladiator", "cybereye", "dynalar", "biotechnica", "masetto", "fire-brand", "tanson-bellhop", "killstrom", "drink-master", "habitat", "combat-cabb", "aerocab", "ncart", "playland"];
  const sideNames = ["kibble", "jetboy", "laser-jacket", "memory-chip", "mara-transit", "courier-job", "radiopure", "preparatory-school", "identity-breach", "iron-saint", "doberman", "mr-biscuit", "boomerang", "dynalar-fingers", "cyberware-warranty", "rapid-angel", "luck-grid"];
  const tallNames = ["kibble", "jetboy", "laser-jacket", "memory-chip", "mara-transit", "courier-job", "radiopure", "preparatory-school", "identity-breach", "iron-saint"];
  const ultraWideNames = ["identity-reset-banner", "elflines", "aerial-sphere", "grundy"];
  const cardNames = ["doberman", "mr-biscuit", "boomerang", "dynalar-fingers", "cyberware-warranty", "rapid-angel", "luck-grid", "pet-restoration", "container-homes", "human-trial", "estate-beneficiary"];
  const subset = function (names) {
    const matches = byName(names, pool);
    return matches.length ? matches : pool;
  };
  const widePool = subset(wideNames).filter(function (item) {
    return !sideNames.some(function (name) { return item.src.includes(name); });
  });
  const sidePool = subset(sideNames);
  const tallPool = subset(tallNames);
  const allInventory = legit.concat(scams);
  const bannerPool = ultraWideNames.map(function (name) {
    return allInventory.find(function (item) { return item.src.includes(name); });
  }).filter(Boolean);
  const traumaBannerPool = byName(["elflines", "aerial-sphere", "grundy"], legit);
  const cardPool = byName(cardNames, allInventory);
  const pick = function (source, offset) { return source[(cursor + offset) % source.length]; };

  function createSlot(kind, source, offset, options) {
    const slot = document.createElement(options && options.element ? options.element : "aside");
    slot.className = "nc-ad-slot nc-ad-" + kind + " nc-ad-" + site;
    slot.setAttribute("data-nc-ad-system", kind);
    slot.setAttribute("aria-label", options && options.label ? options.label : "Advertisement");
    const tag = site === "civic" ? "CONTRACTED PLACEMENT" : site === "trauma" ? "MEMBER PARTNER" : "ADVERTISEMENT";
    slot.innerHTML = '<span class="nc-ad-tag">' + tag + '</span><button type="button" class="nc-ad-image" aria-label="Open advertisement"><img loading="lazy" decoding="async"></button>' + ((options && options.controls) ? '<div class="nc-ad-controls"><button type="button" class="nc-ad-next" aria-label="Show another advertisement">NEXT</button><button type="button" class="nc-ad-close" aria-label="Close advertisement">&times;</button></div>' : '');
    let index = offset;
    const imageButton = slot.querySelector(".nc-ad-image");
    const image = imageButton.querySelector("img");
    const draw = function () {
      const item = pick(source, index);
      image.src = new URL(item.src, adBase).href;
      image.alt = item.label + " advertisement";
      imageButton.setAttribute("aria-label", "Open advertisement: " + item.label);
      imageButton.onclick = function () { openNotice(item); };
    };
    const next = slot.querySelector(".nc-ad-next");
    if (next) next.addEventListener("click", function () { index += 1; draw(); });
    const close = slot.querySelector(".nc-ad-close");
    if (close) close.addEventListener("click", function () { slot.remove(); });
    draw();
    return slot;
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

  function mountNetwork54NativeAds() {
    const placements = [
      [document.querySelector(".billboard"), pick(bannerPool, 0), "billboard"],
      [document.querySelector(".left-ad"), pick(tallPool, 1), "rail"],
      [document.querySelector(".right-ad"), pick(tallPool, 4), "rail"],
      [document.querySelector(".sponsor-card"), pick(cardPool, 7), "sponsor"]
    ];
    placements.forEach(function (entry) {
      const host = entry[0];
      const item = entry[1];
      if (!host || host.querySelector(".nc-ad-native-creative")) return;
      host.classList.add("nc-ad-native", "nc-ad-native-" + entry[2]);
      host.setAttribute("data-nc-ad-system", "native");
      host.innerHTML = '<button type="button" class="nc-ad-native-creative" aria-label="Open advertisement: ' + item.label.replace(/"/g, "&quot;") + '"><span>ADVERTISEMENT</span><img src="' + new URL(item.src, adBase).href + '" alt="' + item.label.replace(/"/g, "&quot;") + ' advertisement" loading="lazy" decoding="async"></button>';
      host.querySelector("button").addEventListener("click", function () { openNotice(item); });
    });
  }

  function mountElflinesNativeAds() {
    document.querySelectorAll(".ad-banner, .ad").forEach(function (host, index) {
      if (host.querySelector(".nc-elflines-native-creative")) return;
      const isBanner = host.classList.contains("ad-banner");
      const source = isBanner ? bannerPool : cardPool;
      const item = pick(source, index + 2);
      host.classList.add("nc-elflines-native", isBanner ? "nc-elflines-native-banner" : "nc-elflines-native-card");
      host.setAttribute("data-nc-ad-system", "native");
      host.innerHTML = '<button type="button" class="nc-elflines-native-creative" aria-label="Open advertisement: ' + item.label.replace(/"/g, "&quot;") + '"><span>ADVERTISEMENT</span><img src="' + new URL(item.src, adBase).href + '" alt="' + item.label.replace(/"/g, "&quot;") + ' advertisement" loading="lazy" decoding="async"></button>';
      host.querySelector("button").addEventListener("click", function () { openNotice(item); });
    });
  }

  const main = document.querySelector("main") || document.querySelector("#content") || document.body;
  const footer = document.querySelector("footer");
  const sections = main ? Array.from(main.children).filter(function (child) { return /^(SECTION|ARTICLE|DIV)$/.test(child.tagName); }) : [];

  if (site === "elflines") {
    const leaderboard = createSlot("leaderboard", bannerPool, 0, { label: "Featured advertisement" });
    main.insertBefore(leaderboard, main.firstChild);
    mountElflinesNativeAds();
    if (footer && footer.parentNode) footer.parentNode.insertBefore(createSlot("footer", bannerPool, 6, { label: "Footer advertisement" }), footer);
  } else if (site === "civic") {
    const first = createSlot("civic-inline", widePool, 1, { element: "div", label: "Contracted portal placement" });
    const second = createSlot("civic-inline", widePool, 5, { element: "div", label: "Contracted portal placement" });
    if (sections[0]) sections[0].insertAdjacentElement("afterend", first); else main.appendChild(first);
    if (sections.length > 3) sections[Math.floor(sections.length / 2)].insertAdjacentElement("afterend", second); else if (footer && footer.parentNode) footer.parentNode.insertBefore(second, footer);
    if (footer && footer.parentNode) footer.parentNode.insertBefore(createSlot("civic-footer", bannerPool, 8, { element: "div", label: "Municipal contractor advertisement" }), footer);
  } else if (site === "network54") {
    mountNetwork54NativeAds();
    window.setTimeout(mountNetwork54NativeAds, 500);
    window.setTimeout(mountNetwork54NativeAds, 1500);
  } else if (site === "trauma") {
    const partner = createSlot("trauma-inline", widePool, 0, { element: "div", label: "Trauma Team member partner" });
    if (sections[0]) sections[0].insertAdjacentElement("afterend", partner); else main.appendChild(partner);
    if (footer && footer.parentNode) footer.parentNode.insertBefore(createSlot("trauma-footer", traumaBannerPool, 3, { element: "div", label: "Trauma Team member partner" }), footer);
  }

  document.documentElement.setAttribute("data-nc-ad-system", "ready");
}());
