document.addEventListener("DOMContentLoaded", () => {

  /* ================= NAVBAR ================= */
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    setTimeout(() => {
      navbar.classList.add("show");
    }, 200);
  }

  /* ================= ACAK TEXT (MENU ONLY) ================= */
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  document.querySelectorAll(".nav-menu .acak").forEach(el => {
    let interval = null;
    const original = el.dataset.text || el.innerText;
    const randomVersion = el.dataset.random || original;

    function decrypt() {
      let iteration = 0;
      clearInterval(interval);

      interval = setInterval(() => {
        el.innerText = original
          .split("")
          .map((char, index) => {
            if (index < iteration) return original[index];
            return letters[Math.floor(Math.random() * letters.length)];
          })
          .join("");

        if (iteration >= original.length) {
          clearInterval(interval);
          el.innerText = original;
        }

        iteration += 1 / 2;
      }, 30);
    }

    function resetText() {
      clearInterval(interval);
      el.innerText = randomVersion;
    }

    el.addEventListener("mouseenter", decrypt);
    el.addEventListener("mouseleave", resetText);

    el.addEventListener("click", e => {
  const targetId = el.getAttribute("href");

  // kalau anchor (#about dll)
  if (targetId.startsWith("#")) {
    e.preventDefault();
    decrypt();

    const target = document.querySelector(targetId);
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }, 450);
    }
  }
});

  });

  /* ================= GLITCH NICKNAME ================= */
  const glitchEl = document.getElementById("glitch");
  if (glitchEl) {
    const original = glitchEl.innerText;
    glitchEl.setAttribute("data-text", original);

    const chars = "!@#$%^&*()_+-=[]{}<>?/\\|";

    setInterval(() => {
      const glitched = original
        .split("")
        .map(char =>
          Math.random() < 0.15 && char !== " "
            ? chars[Math.floor(Math.random() * chars.length)]
            : char
        )
        .join("");

      glitchEl.innerText = glitched;
      glitchEl.setAttribute("data-text", glitched);

      setTimeout(() => {
        glitchEl.innerText = original;
        glitchEl.setAttribute("data-text", original);
      }, 80);
    }, 600);
  }

  /* ================= HERO FADE IN ================= */
  const hero = document.querySelector(".hero-content");
  if (hero) {
    hero.style.opacity = 0;
    hero.style.transform = "translateY(20px)";
    hero.style.transition = "opacity 1s ease, transform 1s ease";

    setTimeout(() => {
      hero.style.opacity = 1;
      hero.style.transform = "translateY(0)";
    }, 400);
  }

  /* ================= MATRIX BACKGROUND ================= */
  const canvas = document.getElementById("matrix");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const fontSize = 28;
  const chars =
    "アァカサタナハマヤラワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  let columns;
  let drops;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = Math.floor(canvas.width / fontSize);
    drops = Array(columns).fill(1);
  }

  resize();
  window.addEventListener("resize", resize);

  function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "rgba(121, 191, 52, 0.25)";
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.98) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  setInterval(drawMatrix, 20);
});

const errorEl = document.querySelector(".error-glitch");
const chars = "!@#$%^&*()_+-=<>?/\\|";

setInterval(() => {
  if (!errorEl) return;

  const original = errorEl.dataset.text;
  const glitched = original
    .split("")
    .map(c =>
      Math.random() < 0.3
        ? chars[Math.floor(Math.random() * chars.length)]
        : c
    )
    .join("");

  errorEl.innerText = glitched;

  setTimeout(() => {
    errorEl.innerText = original;
  }, 120);
}, 1100);
