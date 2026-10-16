/**
 * PORTFOLYO - PROJELER MOTORU (PROJECTS & MODAL SYSTEM)
 * Filtreleme Barı, Animasyonlu Geçişler, Detaylı Modal Penceresi
 */

// Kapsamlı Proje Veritabanı (Kullanıcının Gerçek Projeleri)
const portfolioProjects = [
  {
    id: 'netflix-scrollytelling',
    title: 'Netflix Evreni: 15 Yıllık Dönüşümün Anatomisi (Scrollytelling)',
    category: 'data',
    categoryLabel: 'Veri Hikâyesi & Scrollytelling',
    featured: true,
    year: '2026',
    summary: '8.807 yapımlık büyük veri seti üzerinde D3.js ve Scrollama ile geliştirilmiş, kullanıcı etkileşimli veri görselleştirme ve scrollytelling deneyimi.',
    problem: 'Ham veri tabloları ve statik grafikler, izleyicinin ve karar vericilerin içerik stratejisindeki 15 yıllık köklü film/dizi dönüşümünü kavramasını zorlaştırıyordu.',
    solution: 'Kaggle veri seti Python ile temizlenerek D3.js v7 ve Scrollama.js kütüphaneleriyle scroll tetiklemeli, hikâye anlatımlı (scrollytelling) interaktif bir veri hikâyesine dönüştürüldü.',
    tags: ['D3.js v7', 'Scrollama.js', 'Python', 'Büyük Veri', 'Scrollytelling', 'UI/UX'],
    demoUrl: '../scrollytelling/site/index.html',
    githubUrl: 'https://github.com/mahir/netflix-scrollytelling',
    gradient: 'from-red-600 to-purple-600',
    accentColor: '#e50914',
    mockupType: 'analytics'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // 1. FİLTRELEME MANTIĞI
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card[data-category]');

  if (filterButtons.length > 0 && projectCards.length > 0) {
    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        // Aktif buton değiştir
        filterButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach((card) => {
          const category = card.getAttribute('data-category');
          
          if (filterValue === 'all' || category === filterValue) {
            card.style.display = 'flex';
            requestAnimationFrame(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0) scale(1)';
            });
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(12px) scale(0.97)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 250);
          }
        });
      });
    });
  }

  // 2. MODAL SİSTEMİ
  const modalBackdrop = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  function openProjectModal(projectId) {
    const project = portfolioProjects.find((p) => p.id === projectId);
    if (!project || !modalBackdrop) return;

    // Modal içeriklerini doldur
    const modalCategory = document.getElementById('modal-category');
    const modalYear = document.getElementById('modal-year');
    const modalTitle = document.getElementById('modal-title');
    const modalSummary = document.getElementById('modal-summary');
    const modalProblem = document.getElementById('modal-problem');
    const modalSolution = document.getElementById('modal-solution');
    const modalTags = document.getElementById('modal-tags');
    const modalDemoBtn = document.getElementById('modal-demo-btn');
    const modalGithubBtn = document.getElementById('modal-github-btn');
    const modalMockupBox = document.getElementById('modal-mockup-box');

    if (modalCategory) modalCategory.textContent = project.categoryLabel;
    if (modalYear) modalYear.textContent = project.year;
    if (modalTitle) modalTitle.textContent = project.title;
    if (modalSummary) modalSummary.textContent = project.summary;
    if (modalProblem) modalProblem.textContent = project.problem;
    if (modalSolution) modalSolution.textContent = project.solution;

    // Mockup alanı stili
    if (modalMockupBox) {
      modalMockupBox.innerHTML = generateMockupHTML(project);
    }

    // Etiketler
    if (modalTags) {
      modalTags.innerHTML = project.tags
        .map((tag) => `<span class="tag-pill">${tag}</span>`)
        .join('');
    }

    // Buton bağlantıları
    if (modalDemoBtn) {
      const isSubfolder = window.location.pathname.includes('/projelerim/') || window.location.pathname.includes('\\projelerim\\');
      modalDemoBtn.href = isSubfolder ? ('../' + project.demoUrl) : project.demoUrl;
    }
    if (modalGithubBtn) modalGithubBtn.href = project.githubUrl;

    // Modalı aç
    modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Modal tetikleyici butonlar
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-open-modal]');
    if (trigger) {
      e.preventDefault();
      const projectId = trigger.getAttribute('data-open-modal');
      openProjectModal(projectId);
    }
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        closeProjectModal();
      }
    });

    // ESC tuşu ile kapatma
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalBackdrop.classList.contains('open')) {
        closeProjectModal();
      }
    });
  }
});

// Mockup HTML Oluşturucu (Harici resim gerektirmeyen şık ve modern CSS tabanlı mockup UI)
function generateMockupHTML(project) {
  return `
    <div style="width:100%; height:260px; background: #0c101a; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); display:flex; flex-direction:column; overflow:hidden; position:relative;">
      <div style="background: rgba(255,255,255,0.04); padding: 10px 16px; display:flex; align-items:center; gap:8px; border-bottom: 1px solid rgba(255,255,255,0.08);">
        <span style="width:10px; height:10px; border-radius:50%; background:#ef4444; display:inline-block;"></span>
        <span style="width:10px; height:10px; border-radius:50%; background:#f59e0b; display:inline-block;"></span>
        <span style="width:10px; height:10px; border-radius:50%; background:#10b981; display:inline-block;"></span>
        <span style="margin-left: 12px; font-family: monospace; font-size: 0.75rem; color: #fca5a5; background: rgba(0,0,0,0.4); padding: 2px 14px; border-radius: 20px;">
          netflix-scrollytelling.interactive/story
        </span>
      </div>
      <div style="flex:1; padding: 20px; display:flex; flex-direction:column; justify-content:center; align-items:center; position:relative; overflow:hidden; text-align:center;">
        <div style="position:absolute; width:200px; height:200px; background:${project.accentColor}; opacity:0.25; filter:blur(45px); border-radius:50%;"></div>
        <div style="font-size: 1.25rem; font-weight:800; color:#ffffff; margin-bottom: 6px; z-index:1;">Netflix Evreni: 8.807 Yapım</div>
        <div style="font-size: 0.88rem; color:#fca5a5; z-index:1;">15 Yıllık Dönüşümün Anatomisi (2008 – 2021)</div>
        <div style="margin-top:16px; display:flex; gap:8px; z-index:1; flex-wrap:wrap; justify-content:center;">
          <span style="padding:4px 12px; background:rgba(239, 68, 68, 0.2); border: 1px solid rgba(239, 68, 68, 0.4); border-radius:20px; font-size:0.75rem; color:#fca5a5; font-weight:600;">8.807 Yapım</span>
          <span style="padding:4px 12px; background:rgba(255,255,255,0.08); border-radius:20px; font-size:0.75rem; color:#e2e8f0; font-weight:600;">D3.js v7</span>
          <span style="padding:4px 12px; background:rgba(255,255,255,0.08); border-radius:20px; font-size:0.75rem; color:#e2e8f0; font-weight:600;">Scrollama.js</span>
        </div>
      </div>
    </div>
  `;
}
