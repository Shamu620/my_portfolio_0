document.addEventListener("DOMContentLoaded", () => {

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canHover = window.matchMedia("(hover: hover)").matches;

  /* ---------- 1. Footer year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- 2. Theme toggle (saved choice is applied by the inline script in <head>) ---------- */
  const root = document.documentElement;
  const themeBtn = document.getElementById("themeToggle");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      if (!reduceMotion) {
        root.classList.add("theme-anim");
        setTimeout(() => root.classList.remove("theme-anim"), 450);
      }
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  }

  /* ---------- 3. Mobile menu ---------- */
  const menuBtn = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  function setMenu(open) {
    if (!menuBtn || !navLinks) return;
    navLinks.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => setMenu(!navLinks.classList.contains("open")));
    navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setMenu(false)));
    document.addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });
  }

  /* ---------- 4. Scroll progress, header shadow, back-to-top ---------- */
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
    if (header) header.classList.toggle("scrolled", y > 8);
    if (toTop) toTop.classList.toggle("show", y > 600);
    progress.style.transform = "scaleX(" + (max > 0 ? Math.min(y / max, 1) : 0) + ")";
    ticking = false;
  }
  window.addEventListener("scroll", () => {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" })
    );
  }

  /* ---------- 5. Hero spotlight follows the cursor ---------- */
  if (canHover && !reduceMotion) {
    document.querySelectorAll("[data-spot]").forEach(el => {
      el.addEventListener("mousemove", e => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", (e.clientX - r.left) + "px");
        el.style.setProperty("--my", (e.clientY - r.top) + "px");
      });
    });
  }

  /* ---------- 6. Scroll reveal (staggered within each group) + stat counters ---------- */
  const revealTargets = [
    ".section-head", ".card", ".stat", ".now-card", ".feature", ".skill-card", ".about-image", ".about-text",
    ".filters", ".project-card", ".t-item", ".cta-band", ".facts", ".cs-section", ".contact-info", ".contact-form"
  ];

  revealTargets.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      el.classList.add("reveal");
      const siblings = Array.from(el.parentElement.children).filter(c => c.matches(selector));
      el.style.setProperty("--d", siblings.indexOf(el) * 90 + "ms");
    });
  });

  const timeline = document.querySelector(".timeline");

  const counterTargets = new Map();
  Array.from(document.querySelectorAll(".stat strong"))
    .filter(el => /^\d+$/.test(el.textContent.trim()))
    .forEach(el => {
      counterTargets.set(el, parseInt(el.textContent.trim(), 10));
      if (!reduceMotion) el.textContent = "0";
    });

  function countUp(el) {
    const target = counterTargets.get(el);
    if (reduceMotion || target === undefined) return;
    const start = performance.now();
    (function frame(now) {
      const t = Math.min((now - start) / 1100, 1);
      el.textContent = String(Math.round(target * (1 - Math.pow(1 - t, 3))));
      if (t < 1) requestAnimationFrame(frame);
    })(start);
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
    }, { threshold: 0.1, rootMargin: "0px 0px -5% 0px" });

    document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));
    if (timeline) revealObserver.observe(timeline);
  } else {
    document.querySelectorAll(".reveal").forEach(el => el.classList.add("in-view"));
    if (timeline) timeline.classList.add("in-view");
    counterTargets.forEach((target, el) => { el.textContent = String(target); });
  }

  /* ---------- 7. Project filter ---------- */
  const filterBtns = document.querySelectorAll(".filter");
  const cards = document.querySelectorAll(".project-card");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => { b.classList.remove("active"); b.setAttribute("aria-pressed", "false"); });
      btn.classList.add("active");
      btn.setAttribute("aria-pressed", "true");
      const type = btn.dataset.filter;
      let shown = 0;

      cards.forEach(card => {
        const show = type === "all" || card.dataset.category === type;
        card.classList.toggle("hidden", !show);
        if (!show) return;

        // Hand over from the scroll reveal to the filter animation
        card.classList.remove("reveal", "pop");
        card.classList.add("in-view");
        if (reduceMotion) return;
        card.style.setProperty("--d", shown * 70 + "ms");
        void card.offsetWidth; // restart the animation
        card.classList.add("pop");
        shown++;
      });
    });
  });

  /* ---------- 8. Tabs (case study comparison) ---------- */
  document.querySelectorAll("[data-tabs]").forEach(group => {
    const tabs = Array.from(group.querySelectorAll('[role="tab"]'));
    const panels = Array.from(group.querySelectorAll('[role="tabpanel"]'));

    function select(tab) {
      tabs.forEach(t => {
        const on = t === tab;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
      });
      panels.forEach(p => { p.hidden = p.id !== tab.getAttribute("aria-controls"); });
    }

    tabs.forEach((tab, i) => {
      tab.addEventListener("click", () => select(tab));
      tab.addEventListener("keydown", e => {
        if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
        const dir = e.key === "ArrowRight" ? 1 : -1;
        const next = tabs[(i + dir + tabs.length) % tabs.length];
        next.focus();
        select(next);
      });
    });
  });

  /* ---------- 9. Table of contents highlight (case study) ---------- */
  const tocLinks = Array.from(document.querySelectorAll(".toc a[href^='#']"));
  if (tocLinks.length && "IntersectionObserver" in window) {
    const targets = tocLinks
      .map(a => document.getElementById(a.getAttribute("href").slice(1)))
      .filter(Boolean);
    const tocObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        tocLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id));
      });
    }, { rootMargin: "-25% 0px -65% 0px" });
    targets.forEach(t => tocObserver.observe(t));
  }

  /* ---------- 10. Contact form (opens Gmail compose with the message filled in) ---------- */
  const form = document.getElementById("contactForm");
  if (form) {
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
  }
});