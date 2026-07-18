// Generic tab switcher: works for any [data-tabgroup] button set + matching [data-tabpanel] panels
document.querySelectorAll("[data-tabgroup]").forEach(function (btn) {
  btn.addEventListener("click", function () {
    const group = btn.dataset.tabgroup;
    const target = btn.dataset.tab;
    document.querySelectorAll('[data-tabgroup="' + group + '"]').forEach(function (b) {
      b.classList.toggle("active", b === btn);
    });
    document.querySelectorAll('[data-tabpanel="' + group + '"]').forEach(function (p) {
      p.classList.toggle("active", p.dataset.panel === target);
    });
  });
});

// Login wall: any [data-loginwall] control opens a "please log in" modal instead of doing anything
const backdrop = document.querySelector(".backdrop");
if (backdrop) {
  const closeButton = backdrop.querySelector(".close");
  function openLoginWall() {
    backdrop.hidden = false;
    document.body.style.overflow = "hidden";
    closeButton.focus();
  }
  function closeLoginWall() { backdrop.hidden = true; document.body.style.overflow = ""; }
  document.querySelectorAll("[data-loginwall]").forEach(function (el) {
    el.addEventListener("click", function (event) {
      event.preventDefault();
      openLoginWall();
    });
    if (el.getAttribute("role") === "button") {
      el.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openLoginWall();
        }
      });
    }
  });
  closeButton.addEventListener("click", closeLoginWall);
  backdrop.addEventListener("click", function (event) { if (event.target === backdrop) closeLoginWall(); });
  document.addEventListener("keydown", function (event) { if (event.key === "Escape" && !backdrop.hidden) closeLoginWall(); });
}

// Title quiz (newbie guide page)
const quizForm = document.querySelector("#title-quiz");
if (quizForm) {
  const titles = {
    INT: "Sage", REF: "Bowmaster", DEX: "Bladedancer", TECH: "Quickhand",
    COOL: "Warmheart", WILL: "Wildblood", MOVE: "Windkin", BODY: "Barkshield", EMP: "Druid"
  };
  const blurbs = {
    Sage: "You'd rather out-think the dungeon than out-fight it. Keep a spreadsheet handy.",
    Bowmaster: "Distance is your best friend. Never let anything reach melee range.",
    Bladedancer: "Fast, sharp, and always in the middle of the fight.",
    Quickhand: "Locks, traps, and tech puzzles fall apart in your hands.",
    Warmheart: "Every good Elfline needs someone who can keep the party breathing.",
    Wildblood: "Overwhelming force solves most problems. The rest, you overwhelm harder.",
    Windkin: "If it can be outrun, you've already lapped it twice.",
    Barkshield: "You stand in the fire so your Elfline doesn't have to.",
    Druid: "Beasts, nature, and vibes. You're never really alone out there."
  };
  quizForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const tally = {};
    new FormData(quizForm).forEach(function (value) {
      tally[value] = (tally[value] || 0) + 1;
    });
    let top = "EMP";
    let max = -1;
    Object.keys(tally).forEach(function (stat) {
      if (tally[stat] > max) { max = tally[stat]; top = stat; }
    });
    const title = titles[top] || "Wayfarer";
    const result = document.querySelector("#quiz-result");
    result.innerHTML = '<small>YOUR ELFLINES ONLINE TITLE IN TRAINING</small><b>' + title + '</b><p>' + blurbs[title] + '</p>';
    result.classList.add("show");
    result.scrollIntoView({ behavior: "smooth", block: "center" });
  });
}

// Illustrated 2045 game archive: the gallery changes with the section being viewed.
(function mountElflinesArchive() {
  const script = document.currentScript;
  const siteBase = script && script.src ? new URL(".", script.src) : new URL(".", location.href);
  const media = function (path) { return new URL("media/" + path, siteBase).href; };
  const page = location.pathname.split("/").pop() || "index.html";
  const sets = {
    "index.html": {
      kicker: "CAPTURED ON NIGHT CITY-3",
      title: "The battles people call in sick to finish.",
      copy: "Player captures from active raids, contested Miasma breaches, and the server events that became local legend before the next reset.",
      items: [
        ["actions/01_Elfline_Raid.png", "Elfline Raid"], ["actions/02_Dragon_Battle.png", "Dragon Battle"],
        ["actions/03_Miasma_Breach.png", "Miasma Breach"], ["actions/05_Boss_Showdown.png", "Boss Showdown"],
        ["actions/09_Siege_Defense.png", "Siege Defense"], ["actions/10_Team_Finisher.png", "Team Finisher"]
      ]
    },
    "newbie-guide.html": {
      kicker: "TITLE REFERENCE // CHARACTER CREATION",
      title: "Choose the legend people will remember.",
      copy: "Every Title favors a different approach to the Elflands. Study the silhouettes, then use the player quiz above when you are ready to commit.",
      items: [
        ["classes/01_Sage.png", "Sage"], ["classes/02_Bowmaster.png", "Bowmaster"], ["classes/03_Bladedancer.png", "Bladedancer"],
        ["classes/04_Quickhand.png", "Quickhand"], ["classes/05_Warmheart.png", "Warmheart"], ["classes/06_Wildblood.png", "Wildblood"],
        ["classes/07_Windkin.png", "Windkin"], ["classes/08_Barkshield.png", "Barkshield"], ["classes/09_Druid.png", "Druid"],
        ["classes/10_Wayfarer.png", "Wayfarer"]
      ]
    },
    "resources.html": {
      kicker: "FIELD ARCHIVE // COMMUNITY VERIFIED",
      title: "Places to reach. Things to survive.",
      copy: "The practical visual index maintained by Night City players. Location records are followed by the creature silhouettes most often omitted from official patch notes.",
      items: [
        ["locations/01_Elfhold.png", "Elfhold"], ["locations/02_Autumn_Palace.png", "Autumn Palace"], ["locations/03_Port_Treasure.png", "Port Treasure"],
        ["locations/04_Razorfire_Caverns.png", "Razorfire Caverns"], ["locations/05_Twisted_Eldertree.png", "Twisted Eldertree"],
        ["locations/06_Flooded_Palace.png", "Flooded Palace"], ["locations/07_Warlocks_Tower.png", "Warlock's Tower"],
        ["locations/08_Deepgrave.png", "Deepgrave"], ["locations/09_Black_Mountain_Pass.png", "Black Mountain Pass"],
        ["locations/10_Heart_of_Miasma.png", "Heart of Miasma"], ["monsters/01_Bearwolf.png", "Bearwolf"],
        ["monsters/02_Cursed_Head.png", "Cursed Head"], ["monsters/03_Draglin.png", "Draglin"], ["monsters/04_Dragon.png", "Dragon"],
        ["monsters/05_Golem.png", "Golem"], ["monsters/06_Gremlin.png", "Gremlin"], ["monsters/07_Restless_Spirit.png", "Restless Spirit"],
        ["monsters/08_Slime.png", "Slime"], ["monsters/09_Zazzolif.png", "Zazzolif"], ["monsters/10_Miasmelf.png", "Miasmelf"],
        ["monsters/11_Miasmelf_Boss.png", "Miasmelf Boss"], ["monsters/12_Miasma_Core.png", "Miasma Core"]
      ]
    }
  };
  const set = sets[page];
  if (set) {
    const section = document.createElement("section");
    section.className = "elo-visual-archive";
    section.innerHTML = '<header><div><p class="eyebrow">' + set.kicker + '</p><h2>' + set.title + '</h2><p>' + set.copy + '</p></div><span>' + set.items.length + ' RECORDS</span></header><div class="elo-visual-grid"></div>';
    const grid = section.querySelector(".elo-visual-grid");
    set.items.forEach(function (item) {
      const figure = document.createElement("figure");
      const imageGroup = item[0].split("/")[0].replace(/[^a-z0-9-]/gi, "").toLowerCase();
      figure.className = "elo-image-" + imageGroup;
      figure.innerHTML = '<img src="' + media(item[0]) + '" alt="' + item[1] + ' from Elflines Online" loading="lazy" decoding="async"><figcaption><b>' + item[1] + '</b><small>PLAYER CAPTURE</small></figcaption>';
      grid.appendChild(figure);
    });
    const footer = document.querySelector("footer");
    if (footer) footer.parentNode.insertBefore(section, footer);
  }

  const heroArt = document.querySelector(".hero-art");
  if (heroArt && page === "index.html") {
    heroArt.classList.add("elo-photo-hero");
    heroArt.insertAdjacentHTML("afterbegin", '<img src="' + media("actions/01_Elfline_Raid.png") + '" alt="An Elflines Online raid party entering battle">');
  }

  const adLoader = document.createElement("script");
  adLoader.src = new URL("../shared/ad-system.js", siteBase).href;
  document.body.appendChild(adLoader);
}());
