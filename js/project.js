const navbar = document.querySelector(".navbar");
  if (navbar) {
    setTimeout(() => navbar.classList.add("show"), 200);
  }
const scrambleLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  document.querySelectorAll(".nav-menu .acak").forEach(el => {
    let interval = null;
    const original = el.dataset.text || el.innerText;

    function decrypt() {
      let iteration = 0;
      clearInterval(interval);

      interval = setInterval(() => {
        el.innerText = original
          .split("")
          .map((_, i) =>
            i < iteration
              ? original[i]
              : scrambleLetters[Math.floor(Math.random() * scrambleLetters.length)]
          )
          .join("");

        iteration += 0.5;

        if (iteration >= original.length) {
          clearInterval(interval);
          el.innerText = original;
        }
      }, 30);
    }

    el.addEventListener("mouseenter", decrypt);
    el.addEventListener("mouseleave", () => el.innerText = original);

    el.addEventListener("click", e => {
      const targetId = el.getAttribute("href");
      if (!targetId || !targetId.startsWith("#")) return;

      e.preventDefault();
      decrypt();

      const target = document.querySelector(targetId);
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: "smooth" });
        }, 400);
      }
    });
  });

/* 1 CPU */
setInterval(() => {
  const v = Math.floor(Math.random() * 70) + 20;
  cpu.style.width = v + "%";
  cpuText.innerText = v + "%";
}, 1500);

/* 2 RAM */
setInterval(() => {
  const v = Math.floor(Math.random() * 60) + 30;
  ram.style.width = v + "%";
  ramText.innerText = v + "%";
}, 1800);

/* 3 SCAN */
let scan = 0;
setInterval(() => {
  scan = scan >= 100 ? 0 : scan + 10;
  scanBar(scan);
}, 1000);

function scanBar(v) {
  scan.style.width = v + "%";
  scanText.innerText = v === 0 ? "Restarting..." : v + "%";
}

/* 4 LOGIN */
function login() {
  loginStatus.innerText = "Authenticating...";
  setTimeout(() => loginStatus.innerText = "Access Granted ✔", 1200);
}

/* 5 PASSWORD */
pass.addEventListener("input", () => {
  strength.style.width = Math.min(pass.value.length * 10, 100) + "%";
});

/* 6 TERMINAL */
const logs = [
  "Initializing system...",
  "Loading modules...",
  "Verifying access...",
  "System ready."
];
let li = 0;
setInterval(() => {
  terminal.innerText += logs[li] + "\n";
  li = (li + 1) % logs.length;
}, 1300);

/* 7 DOWNLOAD */
let dl = 0;
setInterval(() => {
  dl = dl >= 100 ? 0 : dl + 5;
  download.style.width = dl + "%";
  downloadText.innerText = dl + "%";
}, 800);

/* 8 UPTIME */
let sec = 0;
setInterval(() => {
  sec++;
  const h = String(Math.floor(sec / 3600)).padStart(2, "0");
  const m = String(Math.floor(sec % 3600 / 60)).padStart(2, "0");
  const s = String(sec % 60).padStart(2, "0");
  uptime.innerText = `${h}:${m}:${s}`;
}, 1000);

/* 9 CODE */
function genCode() {
  const chars = "ABCDEFGH0123456789";
  code.innerText = [...Array(10)]
    .map(() => chars[Math.floor(Math.random() * chars.length)])
    .join("");
}

/* 10 TOGGLE */
let online = false;
function toggleServer() {
  online = !online;
  event.target.innerText = online ? "ONLINE" : "OFFLINE";
}
/* ================= DW PET INTERACTIVE LOGIC ================= */
const pet = {
  level: +localStorage.getItem("dw_level") || 1,
  xp: +localStorage.getItem("dw_xp") || 0,
  lastFeed: localStorage.getItem("dw_lastFeed") || null
};

const XP_MAX = 100;

const levelEl = document.getElementById("petLevel");
const xpEl = document.getElementById("petXP");
const moodEl = document.getElementById("petMood");
const statusEl = document.getElementById("petStatus");
const feedBtn = document.getElementById("petFeedBtn");

const petBody = document.querySelector(".pet-body");
const eyes = document.querySelectorAll(".eye");
const mouth = document.querySelector(".pet-mouth");

// ====================== HELPER ======================
function today() {
  return new Date().toDateString();
}

function canFeed() {
  return pet.lastFeed !== today();
}

function save() {
  localStorage.setItem("dw_level", pet.level);
  localStorage.setItem("dw_xp", pet.xp);
  localStorage.setItem("dw_lastFeed", pet.lastFeed);
}

function updateUI() {
  levelEl.textContent = pet.level;
  xpEl.style.width = (pet.xp / XP_MAX) * 100 + "%";
  moodEl.textContent = canFeed() ? "HUNGRY" : "FULL";
  updateFeedState();
}

function updateFeedState() {
  feedBtn.disabled = !canFeed();
  statusEl.textContent = canFeed()
    ? "Pet is hungry"
    : "Already fed today";
}

// ====================== FEED LOGIC ======================
feedBtn.addEventListener("click", () => {
  if (!canFeed()) return;

  pet.xp += 25;
  pet.lastFeed = today();
  statusEl.textContent = "+25 XP";

  // level up
  if (pet.xp >= XP_MAX) {
    pet.xp = 0;
    pet.level++;
    statusEl.textContent = "LEVEL UP!";
    // animasi mouth kecil
    mouth.style.transform = "scaleY(2)";
    setTimeout(()=>mouth.style.transform="scaleY(1)", 400);
  }

  save();
  updateUI();
});

// ====================== MATA IKUT CURSOR ======================
document.addEventListener("mousemove", e => {
  eyes.forEach(eye => {
    const rect = eye.getBoundingClientRect();
    const eyeX = rect.left + rect.width/2;
    const eyeY = rect.top + rect.height/2;

    const dx = e.clientX - eyeX;
    const dy = e.clientY - eyeY;

    const angle = Math.atan2(dy, dx);
    const dist = Math.min(10, Math.hypot(dx, dy)/10); // max 3px movement
    eye.style.transform = `translate(${Math.cos(angle)*dist}px, ${Math.sin(angle)*dist}px)`;
  });
});

// ====================== CLICK INTERACTIVE ======================
petBody.addEventListener("click", () => {
  // blink eyes
  eyes.forEach(eye => eye.style.transform = "scaleY(0.1)");
  setTimeout(()=>eyes.forEach(eye=>eye.style.transform="scaleY(1)"), 150);

  // senyum
  mouth.style.transform = "scaleX(2)";
  setTimeout(()=>mouth.style.transform="scaleX(1)", 300);
});

// ====================== INIT ======================
updateUI();
