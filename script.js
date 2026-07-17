/* ===== DYNAMIC FOOTER YEAR ===== */
document.getElementById('footer-year').textContent = new Date().getFullYear();
/* Static — update this string manually each time you edit the site */
document.getElementById('footer-updated').textContent = 'July 2026';

/* ===== LIVE GITHUB STAT ===== */
fetch('https://api.github.com/users/Awanihub')
  .then(r => r.ok ? r.json() : Promise.reject())
  .then(data => {
    const el = document.getElementById('github-stat');
    if (!el || typeof data.public_repos !== 'number') return;
    el.innerHTML = '<strong>' + data.public_repos + '</strong> public repos on GitHub';
    el.classList.add('visible');
  })
  .catch(() => { /* fails silently — stat just stays hidden */ });

/* ===== HAMBURGER MENU ===== */
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}
document.addEventListener("click", (e) => {
  const nav = document.getElementById("hamburger-nav");
  if (nav && !nav.contains(e.target)) {
    document.querySelector(".menu-links")?.classList.remove("open");
    document.querySelector(".hamburger-icon")?.classList.remove("open");
  }
});

/* ===== DARK MODE ===== */
const root = document.documentElement;
let savedTheme = null;
try { savedTheme = localStorage.getItem("theme"); } catch (e) { /* storage unavailable */ }
if (savedTheme === "dark") root.classList.add("dark");

function updateIcons() {
  const isDark = root.classList.contains("dark");
  document.querySelectorAll(".theme-icon").forEach(el => {
    el.textContent = isDark ? "☀️" : "🌙";
  });
}
updateIcons();

document.querySelectorAll(".theme-toggle").forEach(btn => {
  btn.addEventListener("click", () => {
    root.classList.toggle("dark");
    try { localStorage.setItem("theme", root.classList.contains("dark") ? "dark" : "light"); }
    catch (e) { /* storage unavailable */ }
    updateIcons();
  });
});

/* ===== SCROLL REVEAL ===== */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });

document.querySelectorAll("section:not(#profile), .project-card, .about-card").forEach(el => {
  el.classList.add("reveal");
  revealObserver.observe(el);
});

/* ===== ACTIVE NAV HIGHLIGHT ===== */
const navLinks = document.querySelectorAll(".nav-links a, .menu-links a");

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => {
        a.style.color = a.getAttribute("href") === "#" + entry.target.id
          ? "var(--accent)" : "";
      });
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll("section[id]").forEach(s => navObserver.observe(s));