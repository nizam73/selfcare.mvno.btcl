function openTab(evt, tabId) {
  const contents = document.querySelectorAll(".tab-content");
  contents.forEach(tab => tab.style.display = "none");

  const links = document.querySelectorAll("nav a");
  links.forEach(link => link.classList.remove("active"));

  document.getElementById(tabId).style.display = "flex";
  evt.currentTarget.classList.add("active");
}


// Placeholder for interaction
document.querySelector(".recharge-btn").addEventListener("click", () => {
  alert("Recharge feature coming soon!");
});
