// Simple demo data for the project.
const coins = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    price: 73556.45,
    change: -0.5,
    cap: "1.45T",
    icon: "assets/coin-btc.svg"
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    price: 2001.97,
    change: -1.19,
    cap: "241B",
    icon: "assets/coin-eth.svg"
  },
  {
    symbol: "BNB",
    name: "BNB",
    price: 714.29,
    change: 1.34,
    cap: "104B",
    icon: "assets/coin-bnb.svg"
  },
  {
    symbol: "XRP",
    name: "XRP",
    price: 1.33,
    change: -1.33,
    cap: "76B",
    icon: "assets/coin-xrp.svg"
  },
  {
    symbol: "NEAR",
    name: "NEAR Protocol",
    price: 5.12,
    change: 4.18,
    cap: "6.2B",
    icon: "assets/coin-near.svg"
  },
  {
    symbol: "CYBER",
    name: "Cyber",
    price: 4.67,
    change: 7.13,
    cap: "1.2B",
    icon: "assets/coin-cyber.svg"
  }
];

const inrPerUsd = 83.4;

const nav = document.getElementById("nav");
const menuBtn = document.getElementById("menuBtn");
const themeBtn = document.getElementById("themeBtn");
const trendingCoins = document.getElementById("trendingCoins");
const marketTable = document.getElementById("marketTable");
const coinSelect = document.getElementById("coinSelect");
const amountInput = document.getElementById("amountInput");
const resultText = document.getElementById("resultText");
const heroPrice = document.getElementById("heroPrice");
const buyForm = document.getElementById("buyForm");
const loginTab = document.getElementById("loginTab");
const signupTab = document.getElementById("signupTab");
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const authMessage = document.getElementById("authMessage");

function formatPrice(price) {
  return "$" + price.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function changeClass(change) {
  return change >= 0 ? "up" : "down";
}

function changeText(change) {
  return (change >= 0 ? "+" : "") + change.toFixed(2) + "%";
}

function renderCoins() {
  trendingCoins.innerHTML = "";
  marketTable.innerHTML = "";
  coinSelect.innerHTML = "";

  coins.slice(0, 4).forEach(function (coin) {
    trendingCoins.innerHTML += `
      <article class="coin-card">
        <img src="${coin.icon}" alt="${coin.name}">
        <span>${coin.name}</span>
        <strong>${coin.symbol}</strong>
        <strong class="price">${formatPrice(coin.price)}</strong>
        <span class="${changeClass(coin.change)}">${changeText(coin.change)}</span>
      </article>
    `;
  });

  coins.forEach(function (coin) {
    marketTable.innerHTML += `
      <tr>
        <td>
          <div class="coin-cell">
            <img src="${coin.icon}" alt="${coin.name}">
            <div>
              <strong>${coin.name}</strong><br>
              <span>${coin.symbol}</span>
            </div>
          </div>
        </td>
        <td>${formatPrice(coin.price)}</td>
        <td class="${changeClass(coin.change)}">${changeText(coin.change)}</td>
        <td>$${coin.cap}</td>
      </tr>
    `;

    coinSelect.innerHTML += `<option value="${coin.symbol}">${coin.symbol}</option>`;
  });

  heroPrice.textContent = formatPrice(coins[0].price);
  calculateCrypto();
}

function calculateCrypto() {
  const amountInr = Number(amountInput.value);
  const selectedSymbol = coinSelect.value;
  const coin = coins.find(function (item) {
    return item.symbol === selectedSymbol;
  });

  if (!coin || amountInr <= 0) {
    resultText.textContent = "0 " + selectedSymbol;
    return;
  }

  const amountUsd = amountInr / inrPerUsd;
  const cryptoAmount = amountUsd / coin.price;
  resultText.textContent = cryptoAmount.toFixed(6) + " " + coin.symbol;
}

// This creates a simple live-price effect for the demo.
function updatePrices() {
  coins.forEach(function (coin) {
    const movement = (Math.random() - 0.5) * 0.01;
    coin.price = coin.price + coin.price * movement;
    coin.change = coin.change + movement * 100;
  });

  renderCoins();
}

menuBtn.addEventListener("click", function () {
  nav.classList.toggle("open");
});

themeBtn.addEventListener("click", function () {
  document.body.classList.toggle("light");
  themeBtn.textContent = document.body.classList.contains("light") ? "Light" : "Dark";
});

amountInput.addEventListener("input", calculateCrypto);
coinSelect.addEventListener("change", calculateCrypto);

buyForm.addEventListener("submit", function (event) {
  event.preventDefault();
  calculateCrypto();
});

loginTab.addEventListener("click", function () {
  loginTab.classList.add("active");
  signupTab.classList.remove("active");
  loginForm.classList.remove("hidden");
  signupForm.classList.add("hidden");
  authMessage.textContent = "";
});

signupTab.addEventListener("click", function () {
  signupTab.classList.add("active");
  loginTab.classList.remove("active");
  signupForm.classList.remove("hidden");
  loginForm.classList.add("hidden");
  authMessage.textContent = "";
});

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  authMessage.textContent = "Login successful for demo account.";
});

signupForm.addEventListener("submit", function (event) {
  event.preventDefault();
  authMessage.textContent = "Signup successful. Demo account created.";
});

document.querySelectorAll(".nav a").forEach(function (link) {
  link.addEventListener("click", function () {
    nav.classList.remove("open");
  });
});

renderCoins();
setInterval(updatePrices, 5000);
