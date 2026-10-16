# 🚀 Mahir Atmaca - Modern & Minimalist Kişisel Portfolyo Web Sitesi

Modern, minimalist ve yüksek UI/UX standartlarına sahip, **Çok Sayfalı Mimariye (Multi-Page Architecture / Dedicated Pages)** sahip kişisel portfolyo web sitesi.

> **ÖNEMLİ MİMARİ NOT:** Bu proje tek sayfa (SPA scroll) değildir. Tüm sayfalar (`/`, `/hakkimda`, `/projelerim`, `/iletisim`) bağımsız ve kendine ait dedicated route'lar olarak çalışmaktadır. Sayfalar arasında akıcı sayfa animasyonları (Page Transitions), aktif menü durumu (Active Link State) ve mobil hamburger menü yer almaktadır.

---

## 📂 Sayfa & Rota Yapısı

| Rota / Dosya | Sayfa Adı | Açıklama |
| :--- | :--- | :--- |
| `/` (`index.html`) | **Ana Sayfa** | Hero alanı, dinamik yetkinlik rozeti, öne çıkan vitrin projeleri, sonsuz marquee teknoloji şeridi, CTA yönlendirmeleri. |
| `/hakkimda` (`hakkimda.html`) | **Hakkımda** | Detaylı biyografi, çalışma felsefesi, 4 kategorili Skills Matrix (Tasarım, Web, Veri, DevOps), dikey kariyer & eğitim timeline'ı, indirilebilir CV butonu. |
| `/projelerim` (`projelerim.html`) | **Projelerim** | Kategori filtreleme barı, seçkin Netflix Scrollytelling proje vitrini, canlı demo ve interaktif **Proje Detay Modalı (Quick View)**. |
| `/iletisim` (`iletisim.html`) | **İletişim** | GMT+3 İstanbul gerçek zamanlı canlı saat & mesai durumu widget'ı, tek tıkla e-posta kopyalama butonu, sosyal medya kartları, floating label iletişim formu ve Toast bildirimleri. |

---

## 🎨 Tasarım & UI/UX Standartları

- **Görsel Dil:** Clean Dark Glassmorphism, subtle borders (`rgba(255,255,255,0.08)`), mouse spotlight ışıması ve derinlik.
- **Renk Paleti:**
  - Ana Arka Plan: `#0A0D14` / `#0F121A` (Koyu Grafit & Kömür)
  - Kart Panelleri: `rgba(20, 25, 38, 0.72)` (Glassmorphism & Backdrop Blur)
  - Vurgu Renkleri: `#3B82F6` (Elektrik Mavisi), `#06B6D4` (Cyan), `#10B981` (Zümrüt Yeşili)
- **Tipografi:** Google Fonts *Plus Jakarta Sans* ve *JetBrains Mono*.
- **Sayfa Geçişleri (Page Transitions):** Sayfa üstü gradient progress bar ve yumuşak `fade-in-up` / `fade-out-down` animasyonları.
- **Aktif Link Göstergesi:** Hangi sayfadaysanız o menü sekmesi parlayan bir pill ve alt ışıma ile vurgulanır.
- **Mobil Uyumluluk:** Tam responsive tasarım ve animasyonlu hamburger menü drawer'ı.

---

## 🛠️ Nasıl Çalıştırılır?

Bu site sıfır bağımlılıkla saf HTML5, modern CSS3 ve Vanilla JavaScript ile kodlanmıştır.

### Seçenek 1: Doğrudan Tarayıcıda Açma
Herhangi bir kurulum gerektirmeden `index.html` dosyasına çift tıklayarak tarayıcınızda açabilirsiniz.

### Seçenek 2: Yerel Web Sunucusu (Önerilen)
VS Code **Live Server** eklentisiyle veya terminalden Python ile:

```bash
# Python ile yerel sunucu başlatma
python -m http.server 3000
```
Ardından tarayıcınızdan `http://localhost:3000` adresine gidin.

---

## 👨‍💻 Kişiselleştirme

- **İsim & Bilgiler:** `index.html`, `hakkimda.html`, `projelerim.html` ve `iletisim.html` dosyalarındaki başlık ve profil alanlarını düzenleyebilirsiniz.
- **Proje Listesi:** `assets/js/projects.js` dosyasındaki `portfolioProjects` dizisine yeni projeler ekleyebilir veya mevcutları güncelleyebilirsiniz.
- **İletişim & Sosyal Medya:** `iletisim.html` içindeki GitHub, LinkedIn ve sosyal medya bağlantılarını kendi profil linklerinizle değiştirebilirsiniz.
