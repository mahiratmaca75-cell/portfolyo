/**
 * PORTFOLYO - PAGE TRANSITION ENGINE
 * Çok Sayfalı Mimari (Multi-Page Dedicated Pages) için pürüzsüz geçiş animasyonları
 */

(function () {
  'use strict';

  // Sayfa Üstü Yükleme İlerleme Çubuğu oluştur
  let progressBar = document.getElementById('page-progress-bar');
  if (!progressBar) {
    progressBar = document.createElement('div');
    progressBar.id = 'page-progress-bar';
    document.body.prepend(progressBar);
  }

  // Sayfa yüklendiğinde ilerleme çubuğunu tamamla ve kaldır
  function finishLoading() {
    if (progressBar) {
      progressBar.style.width = '100%';
      setTimeout(() => {
        progressBar.style.opacity = '0';
        setTimeout(() => {
          progressBar.style.width = '0%';
          progressBar.style.opacity = '1';
        }, 300);
      }, 200);
    }
  }

  // Sayfa ilk açılışı
  if (document.readyState === 'complete') {
    finishLoading();
  } else {
    window.addEventListener('load', finishLoading);
  }

  // Tarayıcı Geri/İleri tuşları (Bfcache) için temizleme
  window.addEventListener('pageshow', (event) => {
    const wrapper = document.querySelector('.page-transition-wrapper');
    if (wrapper) {
      wrapper.classList.remove('is-exiting');
    }
    finishLoading();
  });

  // Sayfalar arası link tıklamalarını yakalama ve akıcı geçiş
  document.addEventListener('DOMContentLoaded', () => {
    const internalLinks = document.querySelectorAll('a[href]:not([target="_blank"]):not([href^="#"]):not([href^="mailto:"]):not([href^="tel:"]):not([href^="javascript:"])');

    internalLinks.forEach((link) => {
      link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Boş veya mevcut sayfa içi çapa ise engelleme
        if (!href || href === '#' || href.startsWith('#')) return;

        // Harici link mi kontrol et
        try {
          const url = new URL(this.href, window.location.href);
          if (url.origin !== window.location.origin) return; // Dış bağlantı, normal davran

          // Mevcut sayfayla tam olarak aynı sayfa ise geçiş tetikleme
          if (url.pathname === window.location.pathname && url.search === window.location.search) {
            e.preventDefault();
            return;
          }

          // Sayfa geçiş animasyonunu başlat
          e.preventDefault();
          const targetUrl = this.href;

          // 1. İlerleme çubuğunu başlat
          if (progressBar) {
            progressBar.style.width = '75%';
          }

          // 2. Sayfa çıkış animasyonunu uygula
          const wrapper = document.querySelector('.page-transition-wrapper');
          if (wrapper) {
            wrapper.classList.add('is-exiting');
          }

          // 3. Kısa bir süre sonra yeni sayfaya git
          setTimeout(() => {
            window.location.href = targetUrl;
          }, 240);
        } catch (err) {
          // URL ayrıştırma hatası olursa varsayılan akışa izin ver
        }
      });
    });
  });
})();
