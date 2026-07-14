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
