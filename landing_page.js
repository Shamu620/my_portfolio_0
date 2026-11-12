document.addEventListener("DOMContentLoaded", () => {

  /* ---------- 1. Footer year ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------- 2. Theme toggle (remembers choice) ---------- */
  const root = document.documentElement;
  const themeBtn = document.getElementById("themeToggle");
  try {
    const saved = localStorage.getItem("theme");
    if (saved) root.setAttribute("data-theme", saved);
  } catch (e) { }

  themeBtn.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
  });

  /* ---------- 3. Mobile menu ---------- */
  const menuBtn = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  function setMenu(open) {
    navLinks.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
  }
  menuBtn.addEventListener("click", () => setMenu(!navLinks.classList.contains("open")));
  navLinks.querySelectorAll("a").forEach(link =>
    link.addEventListener("click", () => setMenu(false))
  );

  /* ---------- 4. Back-to-top button ---------- */
  const toTop = document.getElementById("toTop");
  window.addEventListener("scroll", () => {
    toTop.classList.toggle("show", window.scrollY > 600);
  }, { passive: true });
  toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

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

  /* ---------- 6. Project filter ---------- */
  const filterBtns = document.querySelectorAll(".filter");
  const cards = document.querySelectorAll(".project-card");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const type = btn.dataset.filter;
      cards.forEach(card => {
        const show = type === "all" || card.dataset.category === type;
        card.classList.toggle("hidden", !show);
      });
    });
  });

  /* ---------- 7. Contact form (opens the visitor's email app) ---------- */
  const form = document.getElementById("contactForm");
  const note = document.getElementById("formNote");
  const MY_EMAIL = "shalommumo620@students.uonbi.ac.ke"; // <-- change to your real email

  form.addEventListener("submit", e => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    const subject = encodeURIComponent("Portfolio enquiry from " + name);
    const body = encodeURIComponent(message + "\n\nFrom: " + name + " (" + email + ")");
    // window.location.href = `mailto:${MY_EMAIL}?subject=${subject}&body=${body}`;
    // Opens Gmail web compose in a new tab/window via JavaScript
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${MY_EMAIL}&su=${subject}&body=${body}`;
    window.open(gmailUrl, "_blank", "noopener,noreferrer");

    note.textContent = "Thank you, " + name + ". Your email app should open now.";
    form.reset();
  });
});