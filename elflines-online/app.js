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
