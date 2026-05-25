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

  const STAR_INTERVAL = 8;
  const MAX_STARS = 180;

  function createStar(x, y) {
    const star = document.createElement("div");

    const colors = [
      "gold",
      "blue",
      "violet",
      "white",
      "cyan",
    ];

    const randomColor =
      colors[Math.floor(Math.random() * colors.length)];

    star.className = `star ${randomColor}`;

    const size = Math.random() * 10 + 10;

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

  window.addEventListener("mousemove", (e) => {
    const now = performance.now();

    if (now - lastSpawn < STAR_INTERVAL) return;

    lastSpawn = now;

    if (Math.random() > 0.12) return;

    createStar(e.clientX, e.clientY);
  });

  /* ===== Scroll Stars ===== */

  window.addEventListener("scroll", () => {
    const x = window.innerWidth * 0.5;

    const y = window.innerHeight * 0.5;

    for (let i = 0; i < 3; i++) {
      createStar(
        x + (Math.random() - 0.5) * 120,
        y + (Math.random() - 0.5) * 120
      );
    }
  });
})();