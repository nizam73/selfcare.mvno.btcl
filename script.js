
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


// ====== MIX TAB LOGIC ======

// Normalize Excel column headers (remove spaces, invisible chars)
function normalizeKey(key) {
  return key.replace(/\s+/g, " ").trim();
}

async function loadPackages() {
  try {
    console.log("Loading Excel...");

    const response = await fetch("packages.xlsx");
    if (!response.ok) {
      console.error("File not found or cannot load");
      return;
    }

    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: "array" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    // Convert to JSON with trimmed keys
    let rawData = XLSX.utils.sheet_to_json(sheet, { defval: "" });

    // Fix column names
    const data = rawData.map(row => {
      const fixed = {};
      Object.keys(row).forEach(k => {
        fixed[normalizeKey(k)] = row[k];
      });
      return fixed;
    });

    console.log("Parsed Excel Data:", data);
    renderPackages(data);

  } catch (err) {
    console.error("Error loading Excel file:", err);
  }
}

function renderPackages(data) {
  const categories = {
    talktime: document.getElementById("talktime-list"),
    internet: document.getElementById("internet-list"),
    sms: document.getElementById("sms-list"),
    content: document.getElementById("content-list"),
  };

  if (!data || data.length === 0) {
    console.warn("No data found in Excel");
    return;
  }

  data.forEach((row) => {
    createCard(categories.talktime, row["Talktime Package name"], row["Talktime Quantity"], row["Talktime Amount"], "talktime");
    createCard(categories.internet, row["Internet Package name"], row["Internet Quantity"], row["Internet Amount"], "internet");
    createCard(categories.sms, row["SMS Package name"], row["SMS Quantity"], row["SMS Amount"], "sms");
    createCard(categories.content, row["Content Package name"], row["Content Quantity"], row["Content Amount"], "content");
  });
}

function createCard(container, name, quantity, price, category) {
  if (!container) return;
  if (!name || !quantity) return;

  const card = document.createElement("div");
  card.className = "select-card";

  card.innerHTML = `
    <h4>${quantity}</h4>
    <p>${name}</p>
    <p><b>${price}</b></p>
  `;

  card.addEventListener("click", () =>
    toggleSelect(card, category, name, quantity, price)
  );

  container.appendChild(card);
}

const selected = { talktime: null, internet: null, sms: null, content: null };

function toggleSelect(card, category, name, quantity, price) {
  const prev = document.querySelector(`#${category}-list .selected`);
  if (prev && prev !== card) prev.classList.remove("selected");

  card.classList.toggle("selected");

  selected[category] = card.classList.contains("selected")
    ? { name, quantity, price }
    : null;

  updateSummary();
}

function updateSummary() {
  const list = document.getElementById("summary-list");
  const total = document.getElementById("total-price");

  list.innerHTML = "";
  let totalPrice = 0;

  Object.values(selected).forEach((item) => {
    if (item) {
      const li = document.createElement("li");
      li.innerHTML = `
        <span>${item.quantity} ${item.name}</span>
        <span>${item.price}</span>
      `;
      list.appendChild(li);

      totalPrice += parseInt(item.price) || 0;
    }
  });

  total.textContent = totalPrice;
}

document.getElementById("confirm-btn").addEventListener("click", () => {
  alert("Package confirmation coming soon!");
});

// Load Excel when page is ready
document.addEventListener("DOMContentLoaded", loadPackages);





