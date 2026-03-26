const themeToggle = document.getElementById("themeToggle");
const langToggle = document.getElementById("langToggle");
let isDark = true;
let currentLang = "en";

// سويتش الثيم
themeToggle.onclick = () => {
  isDark = !isDark;
  document.body.classList.toggle("light", !isDark);
  document.body.classList.toggle("dark", isDark);
  themeToggle.classList.toggle("active", !isDark);
  themeToggle.querySelector(".toggle-label").innerText = isDark ? "🌙" : "☀️";
};

// سويتش اللغة
langToggle.onclick = () => {
  currentLang = currentLang === "en" ? "ar" : "en";
  langToggle.classList.toggle("active", currentLang === "ar");
  langToggle.querySelector(".toggle-label").innerText = currentLang === "en" ? "AR" : "EN";
  document.body.classList.toggle("rtl", currentLang === "ar");

  const translatableElements = document.querySelectorAll("[data-en]");
  translatableElements.forEach(el => {
    el.style.animation = 'none';
    el.offsetHeight; 
    el.style.animation = null;
    el.classList.add("lang-transition");
    el.innerText = el.getAttribute(`data-${currentLang}`);
  });
};

// كود سحب المشاريع من الـ Admin (سيتم تفعيله بمجرد إضافة مشاريع)
async function loadProjects() {
  const container = document.getElementById("projects");
  // هنا سنضيف الكود الذي يقرأ ملفات الـ Markdown من GitHub لاحقاً
}
loadProjects();
