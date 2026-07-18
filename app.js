const ringSites = ["trauma-team/", "elflines-online/", "nc-civicnet/", "militech-security/", "network-54/"];
const ringPrev = document.querySelector("#ring-prev");
const ringRandom = document.querySelector("#ring-random");
const ringNext = document.querySelector("#ring-next");
if (ringPrev) ringPrev.addEventListener("click", function (event) {
  event.preventDefault();
  window.location.href = ringSites[ringSites.length - 1];
});
if (ringRandom) ringRandom.addEventListener("click", function (event) {
  event.preventDefault();
  window.location.href = ringSites[Math.floor(Math.random() * ringSites.length)];
});
if (ringNext) ringNext.addEventListener("click", function (event) {
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
