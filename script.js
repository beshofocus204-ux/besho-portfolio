// 1. أنميشن التمرير (Scroll Reveal)
const observerOptions = { threshold: 0.15 };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, observerOptions);

// إضافة كلاس reveal لكل السكاشن والكروت
document.querySelectorAll('section, .service-card, .project-card').forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

// 2. سويتش الثيم واللغة
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
  document.body.classList.toggle("rtl", currentLang === "ar");
  document.querySelectorAll("[data-en]").forEach(el => {
    el.innerText = el.getAttribute(`data-${currentLang}`);
  });
};

// 3. سحب المشاريع (تأكد من تغيير البيانات)
async function loadProjects() {
  const container = document.getElementById("projects-container");
  try {
    const response = await fetch('https://api.github.com/repos/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME/contents/projects/data' );
    const files = await response.json();
    if (!Array.isArray(files)) return;
    container.innerHTML = '';
    for (const file of files) {
      if (file.name.endsWith('.md')) {
        const res = await fetch(file.download_url);
        const content = await res.text();
        const title = content.match(/title:\s*"(.*)"/)?.[1] || content.match(/title:\s*(.*)/)?.[1];
        const image = content.match(/image:\s*"(.*)"/)?.[1] || content.match(/image:\s*(.*)/)?.[1];
        const card = document.createElement('div');
        card.className = 'project-card reveal';
        card.innerHTML = `<img src="${image}"><div class="project-info"><h3>${title}</h3></div>`;
        container.appendChild(card);
        observer.observe(card); // تفعيل الأنميشن للمشاريع الجديدة
      }
    }
  } catch (e) { console.log("Add projects in Admin!"); }
}
loadProjects();
