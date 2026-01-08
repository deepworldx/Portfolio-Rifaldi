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

/* TYPEWRITER */
function typeText(el, text) {
  el.textContent = "";
  el.style.opacity = 1;
  let i = 0;
  const interval = setInterval(() => {
    el.textContent += text.charAt(i);
    i++;
    if (i >= text.length) clearInterval(interval);
  }, 30);
}

/* FORM */
const form = document.getElementById("contactForm");
const statusText = document.querySelector(".status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  typeText(statusText, "> Transmitting data...");

  try {
    const res = await fetch("https://formspree.io/f/mwvpgwkq", {
      method: "POST",
      body: new FormData(form),
      headers: { "Accept": "application/json" }
    });

    if (res.ok) {
      setTimeout(() => {
        typeText(statusText, "> Transmission successful ✔\n> Message delivered.");
        form.reset();
      }, 800);
    } else {
      throw new Error();
    }
  } catch {
    setTimeout(() => {
      typeText(statusText, "> Transmission failed ✖\n> Connection error.");
    }, 800);
  }
});