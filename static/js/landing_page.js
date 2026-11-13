document.addEventListener("DOMContentLoaded", () => {

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. Footer year ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------- 2. Theme toggle (remembers choice, fades between themes) ---------- */
  const root = document.documentElement;
  const themeBtn = document.getElementById("themeToggle");
  // The saved theme is applied by a tiny inline script in <head> to avoid a flash.

  themeBtn.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    if (!reduceMotion) {
      root.classList.add("theme-anim");
      setTimeout(() => root.classList.remove("theme-anim"), 450);
    }
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
  });

  /* ---------- 3. Mobile menu ---------- */
  const menuBtn = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  function setMenu(open) {
    navLinks.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  menuBtn.addEventListener("click", () => setMenu(!navLinks.classList.contains("open")));
  navLinks.querySelectorAll("a").forEach(link =>
    link.addEventListener("click", () => setMenu(false))
  );
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") setMenu(false);
  });

  /* ---------- 4. Scroll effects: header shadow, progress bar, back-to-top ---------- */
  const header = document.getElementById("header");
  const toTop = document.getElementById("toTop");
  const progress = document.createElement("div");
  progress.className = "scroll-progress";
  progress.setAttribute("aria-hidden", "true");
  document.body.prepend(progress);

  let ticking = false;
  function onScroll() {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    header.classList.toggle("scrolled", y > 8);
    toTop.classList.toggle("show", y > 600);
    progress.style.transform = "scaleX(" + (max > 0 ? Math.min(y / max, 1) : 0) + ")";
    ticking = false;
  }
  window.addEventListener("scroll", () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(onScroll);
    }
  }, { passive: true });
  onScroll();

  toTop.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" })
  );

  /* ---------- 5. Highlight the active nav link ---------- */
  const sections = document.querySelectorAll("main section[id]");
  const links = document.querySelectorAll(".nav-links a");

  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + entry.target.id));
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach(s => navObserver.observe(s));

  /* ---------- 6. Scroll reveal (staggered within each group) ---------- */
  const revealTargets = [
    ".section-head",
    ".about-image",
    ".about-text",
    ".stat",
    ".skill-card",
    ".filters",
    ".project-card",
    ".t-item",
    ".contact-info",
    ".contact-form"
  ];

  revealTargets.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      el.classList.add("reveal");
      const siblings = Array.from(el.parentElement.children).filter(c => c.matches(selector));
      el.style.setProperty("--d", siblings.indexOf(el) * 90 + "ms");
    });
  });

  const timeline = document.querySelector(".timeline");

  // Stat counters: numeric values count up when they appear
  const counters = Array.from(document.querySelectorAll(".stat strong"))
    .filter(el => /^\d+$/.test(el.textContent.trim()));
  const counterTargets = new Map();
  counters.forEach(el => {
    counterTargets.set(el, parseInt(el.textContent.trim(), 10));
    if (!reduceMotion) el.textContent = "0";
  });

  function countUp(el) {
    const target = counterTargets.get(el);
    if (reduceMotion || target === undefined) return;
    const duration = 1100;
    const start = performance.now();
    function frame(now) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = String(Math.round(target * eased));
      if (t < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.classList.add("in-view");
        if (el.classList.contains("stat")) {
          const num = el.querySelector("strong");
          if (num) countUp(num);
        }
        obs.unobserve(el);
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });

    document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));
    if (timeline) revealObserver.observe(timeline);
  } else {
    // Very old browsers: just show everything
    document.querySelectorAll(".reveal").forEach(el => el.classList.add("in-view"));
    if (timeline) timeline.classList.add("in-view");
    counterTargets.forEach((target, el) => { el.textContent = String(target); });
  }

  /* ---------- 7. Project filter (cards ease in when shown) ---------- */
  const filterBtns = document.querySelectorAll(".filter");
  const cards = document.querySelectorAll(".project-card");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const type = btn.dataset.filter;
      let shown = 0;

      cards.forEach(card => {
        const show = type === "all" || card.dataset.category === type;
        card.classList.toggle("hidden", !show);
        if (!show) return;

        // Hand over from the scroll-reveal to the filter animation
        card.classList.remove("reveal", "in-view", "pop");
        if (reduceMotion) return;
        card.style.setProperty("--d", shown * 70 + "ms");
        void card.offsetWidth; // restart the animation
        card.classList.add("pop");
        shown++;
      });
    });
  });

  /* ---------- 8. Contact form (opens Gmail compose with the message filled in) ---------- */
  const form = document.getElementById("contactForm");
  const note = document.getElementById("formNote");
  const MY_EMAIL = "shalommumo620@students.uonbi.ac.ke";

  form.addEventListener("submit", e => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    const subject = encodeURIComponent("Portfolio enquiry from " + name);
    const body = encodeURIComponent(message + "\n\nFrom: " + name + " (" + email + ")");
    const gmailUrl = "https://mail.google.com/mail/?view=cm&fs=1&to=" +
      encodeURIComponent(MY_EMAIL) + "&su=" + subject + "&body=" + body;
    window.open(gmailUrl, "_blank", "noopener,noreferrer");

    note.textContent = "Thank you, " + name + ". Gmail should open in a new tab with your message ready to send.";
    form.reset();
  });
});