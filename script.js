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

// --- المحرك الجديد لسحب المشاريع ---
async function loadProjects() {
  const container = document.getElementById("projects");
  container.innerHTML = '<p style="text-align:center; width:100%; opacity:0.5;">Loading Projects...</p>';

  try {
    // 1. هنجيب قائمة الملفات من GitHub API (تأكد من اسم اليوزر والمستودع)
    // ملاحظة: Netlify CMS بيحفظ المشاريع في projects/data
    const response = await fetch('https://api.github.com/repos/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME/contents/projects/data' );
    const files = await response.json();

    if (!Array.isArray(files)) throw new Error("No projects found");

    container.innerHTML = ''; // مسح رسالة التحميل

    for (const file of files) {
      if (file.name.endsWith('.md')) {
        const res = await fetch(file.download_url);
        const content = await res.text();
        
        // استخراج البيانات من ملف الـ Markdown (Frontmatter)
        const title = content.match(/title:\s*"(.*)"/)?.[1] || content.match(/title:\s*(.*)/)?.[1];
        const image = content.match(/image:\s*"(.*)"/)?.[1] || content.match(/image:\s*(.*)/)?.[1];
        const description = content.match(/description:\s*"(.*)"/)?.[1] || content.match(/description:\s*(.*)/)?.[1];

        if (title) {
          const card = document.createElement('div');
          card.className = 'project-card lang-transition';
          card.innerHTML = `
            <img src="${image}" alt="${title}">
            <div class="project-info">
              <h3>${title}</h3>
              <p>${description || ''}</p>
            </div>
          `;
          container.appendChild(card);
        }
      }
    }
  } catch (error) {
    console.error("Error loading projects:", error);
    container.innerHTML = '<p style="text-align:center; width:100%; opacity:0.5;">Add your first project from Admin Panel!</p>';
  }
}

// تشغيل المحرك
loadProjects();
