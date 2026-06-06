const themeConfig = {
  "marketing-coral": {
    "--color-primary": "#e85d75",
    "--color-secondary": "#1e293b",
    "--color-accent": "#f59e0b",
    "--color-bg": "#fff7ed",
    "--color-soft": "#fff1f2",
    "--color-surface": "#ffffff",
    "--color-border": "#f3d4d8",
    "--color-text": "#1f2937",
    "--color-muted": "#6b7280"
  }
};

const activeTheme = document.body?.dataset.theme;
if (activeTheme && themeConfig[activeTheme]) {
  Object.entries(themeConfig[activeTheme]).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value);
  });
}

const menuButton = document.querySelector(".menu-button");
const siteMenu = document.querySelector(".site-menu");

if (menuButton && siteMenu) {
  menuButton.addEventListener("click", () => {
    const open = siteMenu.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("menu-open", open);
  });

  siteMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteMenu.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    });
  });
}

document.querySelectorAll("[data-reveal]").forEach((item) => {
  item.classList.add("is-visible");
});

if ("IntersectionObserver" in window) {
  document.querySelectorAll("[data-reveal]").forEach((item) => item.classList.remove("is-visible"));
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );
  document.querySelectorAll("[data-reveal]").forEach((item) => observer.observe(item));
}

document.addEventListener("click", (event) => {
  const link = event.target.closest("a[href^='#']");
  if (!link) return;
  const target = document.querySelector(link.getAttribute("href"));
  if (!target) return;
  event.preventDefault();
  target.scrollIntoView({ behavior: "smooth", block: "start" });
});
