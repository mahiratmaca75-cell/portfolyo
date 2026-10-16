/**
 * PORTFOLYO - İLETİŞİM MOTORU (CONTACT PAGE LOGIC)
 * Canlı Saat & Durum Widget'ı, E-posta Kopyalama, Form Doğrulama ve Toast
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. CANLI SAAT VE MESAİ SAATİ WIDGET'I (GMT+3 İSTANBUL)
     ========================================================================== */
  const liveClockEl = document.getElementById('live-clock');
  const workingStatusEl = document.getElementById('working-status');

  function updateLiveTime() {
    if (!liveClockEl) return;

    const now = new Date();
    // Türkiye saati GMT+3 hesaplaması
    const options = {
      timeZone: 'Europe/Istanbul',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };

    const timeString = new Intl.DateTimeFormat('tr-TR', options).format(now);
    liveClockEl.textContent = `${timeString} (GMT+3)`;

    if (workingStatusEl) {
      // Saat değerini alıp mesai kontrolü yapalım
      const istanbulHour = parseInt(
        new Intl.DateTimeFormat('tr-TR', { timeZone: 'Europe/Istanbul', hour: '2-digit', hour12: false }).format(now),
        10
      );

      if (istanbulHour >= 9 && istanbulHour < 19) {
        workingStatusEl.innerHTML = `<span style="color:#10b981;">●</span> Mesai saatleri içerisindeyim (Hızlı Yanıt)`;
      } else {
        workingStatusEl.innerHTML = `<span style="color:#f59e0b;">●</span> Mesai dışındayım (İlk fırsatta döneceğim)`;
      }
    }
  }

  if (liveClockEl) {
    updateLiveTime();
    setInterval(updateLiveTime, 1000);
  }

  /* ==========================================================================
     2. TEK TIKLA E-POSTA KOPYALAMA
     ========================================================================== */
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const emailToCopy = document.getElementById('email-address-text');

  if (copyEmailBtn && emailToCopy) {
    copyEmailBtn.addEventListener('click', () => {
      const email = emailToCopy.textContent.trim();
      navigator.clipboard.writeText(email).then(() => {
        const originalText = copyEmailBtn.innerHTML;
        copyEmailBtn.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span style="color:#10b981; font-weight:700;">Kopyalandı!</span>
        `;
        copyEmailBtn.style.borderColor = '#10b981';

        if (window.showToast) {
          window.showToast('E-posta adresi panoya başarıyla kopyalandı!', 'success');
        }

        setTimeout(() => {
          copyEmailBtn.innerHTML = originalText;
          copyEmailBtn.style.borderColor = '';
        }, 2500);
      }).catch(() => {
        if (window.showToast) {
          window.showToast('Kopyalama başarısız oldu.', 'info');
        }
      });
    });
  }

  /* ==========================================================================
     3. KARAKTER SAYACI (MESAJ ALANI İÇİN)
     ========================================================================== */
  const messageInput = document.getElementById('form-message');
  const charCounter = document.getElementById('char-count');

  if (messageInput && charCounter) {
    messageInput.addEventListener('input', () => {
      const length = messageInput.value.length;
      charCounter.textContent = `${length} / 500`;
      if (length > 450) {
        charCounter.style.color = '#ef4444';
      } else {
        charCounter.style.color = '';
      }
    });
  }

  /* ==========================================================================
     4. İLETİŞİM FORMU DOĞRULAMA VE GÖNDERİM
     ========================================================================== */
  const contactForm = document.getElementById('portfolio-contact-form');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm && submitBtn) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const subject = document.getElementById('form-subject').value.trim();
      const message = document.getElementById('form-message').value.trim();

      // Basit Doğrulama
      if (!name || !email || !message) {
        if (window.showToast) {
          window.showToast('Lütfen Ad, E-posta ve Mesaj alanlarını eksiksiz doldurun.', 'info');
        }
        return;
      }

      // E-posta Regex Kontrolü
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        if (window.showToast) {
          window.showToast('Lütfen geçerli bir e-posta adresi girin.', 'info');
        }
        return;
      }

      // Gönderim Animasyonu
      const originalBtnHTML = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg style="animation: spin 1s linear infinite;" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10"></path>
        </svg>
        <span>İletiliyor...</span>
      `;

      // Simüle Edilmiş Gönderim Süreci
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHTML;
        contactForm.reset();
        if (charCounter) charCounter.textContent = '0 / 500';

        if (window.showToast) {
          window.showToast('Mesajınız başarıyla iletildi! En kısa sürede dönüş yapacağım.', 'success', 5000);
        }

        // Başarı modalı veya bildirimi
        showSuccessModal(name);
      }, 1200);
    });
  }

  function showSuccessModal(name) {
    const successBox = document.createElement('div');
    successBox.className = 'modal-backdrop open';
    successBox.innerHTML = `
      <div class="modal-dialog" style="max-width:480px; text-align:center; padding: 2.5rem 2rem;">
        <div style="width:64px; height:64px; margin:0 auto 1.25rem; background:rgba(16,185,129,0.15); border:1px solid rgba(16,185,129,0.4); border-radius:50%; display:flex; align-items:center; justify-content:center; color:#10b981;">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <h3 style="font-size:1.5rem; margin-bottom:0.6rem;">Teşekkürler, ${name}!</h3>
        <p style="color:#94a3b8; font-size:0.95rem; line-height:1.6; margin-bottom:1.75rem;">
          Mesajınız güvenli bir şekilde ulaştı. Projeniz veya talebiniz ile ilgili en geç <strong>24 saat</strong> içerisinde belirttiğiniz e-posta adresine geri dönüş yapacağım.
        </p>
        <button class="btn btn-primary" style="width:100%;" id="success-modal-close">
          Tamamdır, Teşekkürler
        </button>
      </div>
    `;

    document.body.appendChild(successBox);
    document.body.style.overflow = 'hidden';

    const closeBtn = successBox.querySelector('#success-modal-close');
    closeBtn.addEventListener('click', () => {
      successBox.remove();
      document.body.style.overflow = '';
    });
  }
});
