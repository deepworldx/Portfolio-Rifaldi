document.addEventListener("DOMContentLoaded", () => {

  /* ================= NAVBAR SHOW ================= */
  // Menampilkan navbar dengan delay kecil
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    setTimeout(() => {
      navbar.classList.add("show");
    }, 200);
  }

  /* ================= ACAK TEXT NAV ================= */
  // Karakter untuk efek scramble
  const scrambleLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  document.querySelectorAll(".nav-menu .acak").forEach(el => {
    let interval = null;
    const original = el.dataset.text || el.innerText;

    // Fungsi efek decrypt / scramble
    function decrypt() {
      let iteration = 0;
      clearInterval(interval);

      interval = setInterval(() => {
        el.innerText = original
          .split("")
          .map((char, i) =>
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

    // Hover masuk
    el.addEventListener("mouseenter", decrypt);

    // Hover keluar
    el.addEventListener("mouseleave", () => {
      el.innerText = original;
    });

    // Klik navigasi smooth scroll
    el.addEventListener("click", e => {
      const targetId = el.getAttribute("href");
      if (!targetId || !targetId.startsWith("#")) return;

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
    });
  });

  /* ================= GLITCH NICKNAME ================= */
  // Efek glitch pada teks nickname
  const glitchEl = document.getElementById("glitch");
  if (glitchEl) {
    const original = glitchEl.innerText;
    const glitchChars = "!@#$%^&*()_+-=[]{}<>?/\\|";

    setInterval(() => {
      glitchEl.innerText = original
        .split("")
        .map(c =>
          Math.random() < 0.15 && c !== " "
            ? glitchChars[Math.floor(Math.random() * glitchChars.length)]
            : c
        )
        .join("");

      setTimeout(() => {
        glitchEl.innerText = original;
      }, 80);
    }, 600);
  }

  /* ================= HERO FADE IN ================= */
  // Animasi fade-in hero section
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
  // Efek matrix canvas
  const canvas = document.getElementById("matrix");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    const fontSize = 28;
    const matrixChars = "アァカサタナハマヤラワ$!@#$!#%!%&#$^*#^(#$#%";

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
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        ctx.fillStyle = "rgba(121,191,52,0.35)";
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.98) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    setInterval(drawMatrix, 90);
  }

  /* ================= ERROR GLITCH TEXT ================= */
  // Efek glitch teks error
  const errorEl = document.querySelector(".error-glitch");
  if (errorEl) {
    const original = errorEl.dataset.text || errorEl.innerText;
    const errorChars = "!@#$%^&*()_+-=<>?/\\|";

    setInterval(() => {
      errorEl.innerText = original
        .split("")
        .map(c =>
          Math.random() < 0.3
            ? errorChars[Math.floor(Math.random() * errorChars.length)]
            : c
        )
        .join("");

      setTimeout(() => {
        errorEl.innerText = original;
      }, 120);
    }, 1100);
  }

  /* ================= SOFT SKILL REVEAL ================= */
  // Animasi progress soft skill saat terlihat
  const softItems = document.querySelectorAll(".soft-item");
  if (softItems.length) {
    const softObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const item = entry.target;
        const fill = item.querySelector(".fill");
        if (fill) fill.style.width = item.dataset.level + "%";

        item.style.opacity = 1;
        item.style.transform = "translateY(0)";
        softObserver.unobserve(item);
      });
    }, { threshold: 0.4 });

    softItems.forEach(item => softObserver.observe(item));
  }

  /* ================= PROFILE REVEAL ================= */
  // Animasi muncul profile
  const profile = document.querySelector(".profile-wrapper");
  if (profile) {
    const profileObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        profile.style.opacity = 1;
        profile.style.transform = "translateY(0)";
        profileObserver.unobserve(profile);
      });
    }, { threshold: 0.4 });

    profileObserver.observe(profile);

    // Efek glitch shake ringan
    setInterval(() => {
      profile.style.transform = "translateX(-2px)";
      setTimeout(() => profile.style.transform = "translateX(2px)", 40);
      setTimeout(() => profile.style.transform = "translateX(0)", 80);
    }, 5000);
  }

});

/* ================= GREEN FLAME CANVAS ================= */
// Efek api hijau menggunakan partikel canvas
const flame = document.getElementById("greenFlame");
if (flame) {
  const ctx = flame.getContext("2d");

  function resize() {
    flame.width = flame.offsetWidth;
    flame.height = flame.offsetHeight;
  }

  resize();
  window.addEventListener("resize", resize);

  const particles = [];

  function spawn() {
    particles.push({
      x: Math.random() * flame.width,
      y: flame.height + 10,
      r: Math.random() * 10 + 6,
      vy: Math.random() * 0.8 + 0.6,
      life: 80
    });
  }

  function draw() {
    ctx.clearRect(0, 0, flame.width, flame.height);

    particles.forEach((p, i) => {
      p.y -= p.vy;
      p.life--;

      const g = ctx.createRadialGradient(
        p.x, p.y, 0,
        p.x, p.y, p.r
      );
      g.addColorStop(0, "rgba(180,255,120,0.7)");
      g.addColorStop(0.5, "rgba(122,240,5,0.4)");
      g.addColorStop(1, "rgba(0,0,0,0)");

      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();

      if (p.life <= 0) {
        particles.splice(i, 1);
      }
    });

    if (particles.length < 70) spawn();

    requestAnimationFrame(draw);
  }

  draw();
}

/* ================= WORK EXPERIENCE EFFECT ================= */
const workItems = document.querySelectorAll(".about-skills li");

const workObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    workItems.forEach((item, i) => {
      setTimeout(() => {
        item.classList.add("show");
        typeEffect(item);
      }, i * 250);
    });

    workObserver.disconnect();
  });
}, { threshold: 0.4 });

const workSection = document.querySelector(".about-skills");
if (workSection) workObserver.observe(workSection);

/* Typing glitch effect */
function typeEffect(el) {
  const text = el.innerText;
  let i = 0;
  el.innerText = "";

  const interval = setInterval(() => {
    el.innerText += text[i];
    i++;
    if (i >= text.length) clearInterval(interval);
  }, 20);
}