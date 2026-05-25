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
/* ===== Golden Cursor Stars ===== */

(function () {
  const container = document.querySelector(".cursor-stars");

  if (!container) return;

  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReduced) return;

  let lastSpawn = 0;
  const STAR_INTERVAL = 35;
  const MAX_STARS = 45;

  function createStar(x, y) {
    const star = document.createElement("div");

    star.className = "star";

    const size = Math.random() * 6 + 6;

    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    star.style.left = `${x}px`;
    star.style.top = `${y}px`;

    const offsetX = (Math.random() - 0.5) * 16;
    const offsetY = (Math.random() - 0.5) * 16;

    star.style.transform = `translate(${offsetX}px, ${offsetY}px)`;

    container.appendChild(star);

    if (container.children.length > MAX_STARS) {
      container.removeChild(container.firstChild);
    }

    setTimeout(() => {
      star.remove();
    }, 900);
  }

  window.addEventListener("mousemove", (e) => {
    const now = performance.now();

    if (now - lastSpawn < STAR_INTERVAL) return;

    lastSpawn = now;

    if (Math.random() > 0.45) return;

    createStar(e.clientX, e.clientY);
  });
})();