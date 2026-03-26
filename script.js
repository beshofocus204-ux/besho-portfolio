const themeToggle = document.getElementById("themeToggle");
const langToggle = document.getElementById("langToggle");
let isDark = true;
let currentLang = "en";

themeToggle.onclick = () => {
  isDark = !isDark;
  document.body.classList.toggle("light", !isDark);
  themeToggle.classList.toggle("active", !isDark);
  themeToggle.querySelector(".toggle-label").innerText = isDark ? "🌙" : "☀️";
};

langToggle.onclick = () => {
  currentLang = currentLang === "en" ? "ar" : "en";
  langToggle.classList.toggle("active", currentLang === "ar");
  langToggle.querySelector(".toggle-label").innerText = currentLang === "en" ? "AR" : "EN";
  document.querySelectorAll("[data-en]").forEach(el => {
    el.innerText = el.getAttribute(`data-${currentLang}`);
  });
};

// أنميشن التمرير (Scroll Reveal) لجميع السكاشن والبوكسات والعناصر الجديدة
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = "translateY(0)";
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll("section, .glass-box, .stat-item, .hero-image-container, .hero-text-content").forEach(el => {
  el.style.opacity = 0;
  el.style.transform = "translateY(30px)";
  el.style.transition = "all 0.8s cubic-bezier(0.2, 0, 0.2, 1)";
  observer.observe(el);
});
