/**
 * PORTFOLYO - MAIN JAVASCRIPT
 * Aktif Menü Yönetimi, Header Efektleri, Mobil Menü, Spotlight & Toast
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. AKTİF SAYFA YÖNETİMİ (ACTIVE LINK STATE)
     ========================================================================== */
  function updateActiveNavLinks() {
    const currentPath = window.location.pathname.toLowerCase();
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (!href) return;

      const linkPath = href.toLowerCase();

      // Ana Sayfa eşleşmesi
      const isHome = 
        (currentPath.endsWith('/') || currentPath.endsWith('/index.html') || currentPath === '') &&
        (linkPath === '/' || linkPath === 'index.html' || linkPath === './index.html');

      // Alt sayfa eşleşmesi
      const isSubPage = 
        (currentPath.includes('hakkimda') && linkPath.includes('hakkimda')) ||
        (currentPath.includes('projelerim') && linkPath.includes('projelerim')) ||
        (currentPath.includes('iletisim') && linkPath.includes('iletisim'));

      if (isHome || isSubPage) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  updateActiveNavLinks();

  /* ==========================================================================
     2. HEADER SCROLL EFEKTİ (STICKY BLUR NAVBAR)
     ========================================================================== */
  const header = document.querySelector('.site-header');
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  /* ==========================================================================
     3. MOBİL HAMBURGER MENÜ YÖNETİMİ
     ========================================================================== */
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = mobileToggle.classList.toggle('open');
      mobileDrawer.classList.toggle('active', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Mobil menüdeki herhangi bir linke tıklandığında menüyü kapat
    const mobileLinks = mobileDrawer.querySelectorAll('a');
    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('open');
        mobileDrawer.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Dışarı tıklandığında menüyü kapat
    document.addEventListener('click', (e) => {
      if (mobileDrawer.classList.contains('active') && !mobileDrawer.contains(e.target) && !mobileToggle.contains(e.target)) {
        mobileToggle.classList.remove('open');
        mobileDrawer.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  /* ==========================================================================
     4. SPOTLIGHT MOUSE GLOW EFEKTİ (MODERN CARD HOVER)
     ========================================================================== */
  const spotlightCards = document.querySelectorAll('.spotlight-card');
  spotlightCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  /* ==========================================================================
     5. DİNAMİK TELİF HAKKI YILI
     ========================================================================== */
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});

/* ==========================================================================
   6. GLOBAL TOAST BİLDİRİMİ SİSTEMİ
   ========================================================================== */
window.showToast = function (message, type = 'success', duration = 3500) {
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  const iconSvg = type === 'success' 
    ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`
    : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;

  toast.innerHTML = `
    <span class="toast-icon">${iconSvg}</span>
    <span class="toast-message">${message}</span>
  `;

  toastContainer.appendChild(toast);

  // Göster
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  // Süre dolunca kaldır
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 400);
  }, duration);
};
