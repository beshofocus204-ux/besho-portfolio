// كود السويتشات مع ثبات الاتجاه
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
  
  // لاحظ: شلنا كود الـ RTL عشان الاتجاه يفضل ثابت لليسار
  
  document.querySelectorAll("[data-en]").forEach(el => {
    el.innerText = el.getAttribute(`data-${currentLang}`);
  });
};

// أنميشن التمرير (Scroll Reveal)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.style.opacity = 1;
  });
}, { threshold: 0.1 });

document.querySelectorAll('section, .glass-box').forEach(el => {
  el.style.opacity = 0;
  el.style.transition = "opacity 1s ease";
  observer.observe(el);
});
