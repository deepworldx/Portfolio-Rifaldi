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
