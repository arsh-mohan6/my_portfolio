/* Scroll reveal — respects reduced motion */
(function () {
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const revealEls = document.querySelectorAll(".reveal");

  if (prefersReduced) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  revealEls.forEach((el) => observer.observe(el));
})();

/* ===== Luxury Cursor Stars ===== */

(function () {
  const container = document.querySelector(".cursor-stars");

  if (!container) return;

  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReduced) return;

  let lastSpawn = 0;

  const STAR_INTERVAL = 14;
  const MAX_STARS = 180;

  function createStar(x, y) {
    const star = document.createElement("div");

    const colors = [
      "gold",
      "gold",
      "gold",
      "white",
      "blue",
    ];

    const randomColor =
      colors[Math.floor(Math.random() * colors.length)];

    star.className = `star ${randomColor}`;

    const size = Math.random() * 4 + 5;

    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    star.style.left = `${x}px`;
    star.style.top = `${y}px`;

    const offsetX = (Math.random() - 0.5) * 34;
    const offsetY = (Math.random() - 0.5) * 34;

    star.style.transform = `
      translate(${offsetX}px, ${offsetY}px)
    `;

    container.appendChild(star);

    if (container.children.length > MAX_STARS) {
      container.removeChild(container.firstChild);
    }

    setTimeout(() => {
      star.remove();
    }, 1100);
  }

  /* ===== Mouse Stars ===== */
  let lastX = 0;
  let lastY = 0;
  window.addEventListener("mousemove", (e) => {
  const dx = e.clientX - lastX;
  const dy = e.clientY - lastY;

  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < 12) return;

  lastX = e.clientX;
  lastY = e.clientY;

  const now = performance.now();

  if (now - lastSpawn < STAR_INTERVAL) return;

  lastSpawn = now;

  createStar(
    e.clientX + (Math.random() - 0.5) * 10,
    e.clientY + (Math.random() - 0.5) * 10
  );
});

  /* ===== Scroll Stars ===== */
})();