
function openTab(evt, tabId) {
  const contents = document.querySelectorAll(".tab-content");
  contents.forEach((tab) => (tab.style.display = "none"));

  const links = document.querySelectorAll("nav a");
  links.forEach((link) => link.classList.remove("active"));

  document.getElementById(tabId).style.display = "flex";
  evt.currentTarget.classList.add("active");

  // Smooth scroll into view if navbar overflows horizontally
  evt.currentTarget.scrollIntoView({
    behavior: "smooth",
    inline: "center",
    block: "nearest"
  });
}

// ====== Global click listeners for buttons ======
document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.classList.contains("recharge-btn")) {
      alert("Recharge feature coming soon!");
    }

    if (e.target.classList.contains("buynow-btn")) {
      alert("Buy Now feature coming soon!");
    }
  });
});










