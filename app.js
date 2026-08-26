const network = window.NightCityNet;
const liveSites = network ? network.liveSites() : [];
const ringSites = liveSites.map(function (site) {
  return site.href;
});

function textElement(tagName, text, className) {
  const element = document.createElement(tagName);
  element.textContent = text;
  if (className) element.className = className;
  return element;
}

function renderDirectory() {
  const tableBody = document.querySelector("#site-directory");
  if (!tableBody || !network) return;

  for (let index = 0; index < network.sites.length; index += 2) {
    const row = document.createElement("tr");
    network.sites.slice(index, index + 2).forEach(function (site) {
      const cell = document.createElement("td");
      const name = textElement("b", site.name.toUpperCase());
      if (site.status !== "live") {
        name.className = "dead";
      }
      cell.appendChild(name);

      if (site.status === "live") {
        cell.appendChild(textElement("span", "LIVE!", "new"));
      }

      const description = textElement("p", site.description);
      if (site.status !== "live") description.className = "muted";
      cell.appendChild(description);

      if (site.status === "live") {
        const link = textElement("a", "» ENTER SITE «");
        link.href = site.href;
        cell.appendChild(link);
      }
      row.appendChild(cell);
    });
    if (row.children.length === 1) row.appendChild(document.createElement("td"));
    tableBody.appendChild(row);
  }
}

function renderSitemap() {
  const placeholder = document.querySelector("#network-sitemap-loading");
  if (!placeholder || !network) return;
  const sitemap = placeholder.parentNode;

  network.sites.forEach(function (site) {
    const item = document.createElement("li");
    const name = textElement("b", site.name);
    if (site.status !== "live") name.className = "dead";
    item.appendChild(name);
    item.appendChild(document.createTextNode(" "));
    item.appendChild(textElement(
      "span",
      site.status === "live" ? "LIVE" : "not yet indexed",
      site.status === "live" ? "new static-label" : "muted"
    ));

    if (site.pages.length) {
      const pages = document.createElement("ul");
      site.pages.forEach(function (page) {
        const pageItem = document.createElement("li");
        const link = textElement("a", page[0]);
        link.href = page[1];
        pageItem.appendChild(link);
        pages.appendChild(pageItem);
      });
      item.appendChild(pages);
    }
    sitemap.insertBefore(item, placeholder);
  });
  placeholder.remove();
}

function renderWebring() {
  const ringList = document.querySelector("#ring-members");
  if (!ringList || !network) return;
  const members = liveSites.map(function (site) {
    return {
      name: site.ringName || site.name,
      status: site.ringStatus,
      description: site.ringDescription,
      href: site.href,
    };
  }).concat(network.offlineRingMembers);

  members.forEach(function (member, index) {
    const item = document.createElement("li");
    item.appendChild(textElement("b", member.name));
    item.appendChild(textElement("small", "ring position " + (index + 1) + " · status: " + member.status));
    const description = document.createElement("p");
    if (member.href) {
      const link = textElement("a", member.linkLabel || member.href);
      link.href = member.href;
      description.appendChild(link);
      description.appendChild(document.createTextNode(" — "));
    }
    description.appendChild(document.createTextNode(member.description));
    item.appendChild(description);
    ringList.appendChild(item);
  });

  document.querySelectorAll("[data-ring-total]").forEach(function (element) {
    element.textContent = String(network.ringMemberCount());
  });
  document.querySelectorAll("[data-ring-live]").forEach(function (element) {
    element.textContent = String(liveSites.length);
  });
}

renderDirectory();
renderSitemap();
renderWebring();

const ringPrev = document.querySelector("#ring-prev");
const ringRandom = document.querySelector("#ring-random");
const ringNext = document.querySelector("#ring-next");
if (ringPrev && ringSites.length) ringPrev.addEventListener("click", function (event) {
  event.preventDefault();
  window.location.href = ringSites[ringSites.length - 1];
});
if (ringRandom && ringSites.length) ringRandom.addEventListener("click", function (event) {
  event.preventDefault();
  window.location.href = ringSites[Math.floor(Math.random() * ringSites.length)];
});
if (ringNext && ringSites.length) ringNext.addEventListener("click", function (event) {
  event.preventDefault();
  window.location.href = ringSites[0];
});

const gbForm = document.querySelector("#gb-form");
if (gbForm) {
  gbForm.addEventListener("submit", function (event) {
    event.preventDefault();
    document.querySelector("#gb-msg").classList.add("show");
    gbForm.reset();
  });
}

document.querySelectorAll("code.box").forEach(function (box) {
  box.addEventListener("click", function () {
    const range = document.createRange();
    range.selectNodeContents(box);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  });
});
