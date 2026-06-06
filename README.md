<div align="center">

<img src="public/timecraftlogo.svg" alt="TimeCraft" width="120" />

# TimeCraft

**Freelancer ve bağımsız çalışanlar için zaman, ücret ve proje takibi.**

Tek panelde net metrikler, anlık görünürlük ve sade bir dashboard deneyimi.

[![Live Demo](https://img.shields.io/badge/demo-timecraftt.netlify.app-00C7B7?style=flat-square&logo=netlify&logoColor=white)](https://timecraftt.netlify.app)
[![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white&style=flat-square)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white&style=flat-square)](https://vite.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38BDF8?logo=tailwindcss&logoColor=white&style=flat-square)](https://tailwindcss.com)
[![Motion](https://img.shields.io/badge/Motion-12-FF4D9F?style=flat-square)](https://motion.dev)

**[Canlı Demo](https://timecraftt.netlify.app)** · **[Kaynak Kod](https://github.com/MachineX41/TimeCraft)** · **[Issues](https://github.com/MachineX41/TimeCraft/issues)**

</div>

<br />

<p align="center">
  <img src="public/readme.png" alt="TimeCraft dashboard önizlemesi" width="100%" />
</p>

---

## Hakkında

TimeCraft; freelancer ve bağımsız çalışanların proje, mesai ve ücret takibini **tek bir çalışma alanında** toplaması için geliştirilmiş bir web uygulamasıdır. Dağınık tablolar ve notlar yerine net metrikler, filtreleme, arama ve sade bir dashboard sunar.

| | |
|---|---|
| **Canlı site** | [https://timecraftt.netlify.app](https://timecraftt.netlify.app) |
| **Kaynak kod** | [github.com/MachineX41/TimeCraft](https://github.com/MachineX41/TimeCraft) |
| **Hosting** | [Netlify](https://www.netlify.com) |
| **Veri** | Tarayıcı `localStorage` — backend veya kayıt gerekmez |

### Sayfalar

- **`/`** — Landing: hero, metrikler, hakkında, özellikler, SSS, CTA
- **`/dashboard`** — Proje listesi, KPI kartları, filtre/arama, proje çekmecesi

---

## Öne çıkan özellikler

| Alan | Açıklama |
|------|----------|
| **Proje yönetimi** | Oluştur, düzenle, sil · durum: Beklemede / Devam Ediyor / Tamamlandı |
| **Canlı metrikler** | Toplam kazanç, mesai saati, aktif iş sayısı otomatik hesaplanır |
| **Arama & filtre** | Segmented control + anlık proje/müşteri araması |
| **Kalıcı veri** | `localStorage` ile JSON saklama, şema doğrulamalı yükleme |
| **Animasyonlar** | Motion reveal, sayfa geçişleri, interaktif CTA border efektleri |
| **Premium UI** | Glass navbar, BorderGlow paneller, topografik drawer dokusu |
| **Responsive** | Mobil kart layout, bottom sheet drawer, tablet/desktop tablo |
| **Erişilebilirlik** | ARIA, klavye navigasyonu, `prefers-reduced-motion` desteği |

---

## Teknoloji yığını

| Katman | Teknoloji |
|--------|-----------|
| UI | [React 19](https://react.dev) |
| Build | [Vite 8](https://vite.dev) |
| Routing | [React Router 7](https://reactrouter.com) |
| Stil | [Tailwind CSS 4](https://tailwindcss.com) + özel BEM |
| Animasyon | [Motion](https://motion.dev) |
| Efektler | [tsParticles](https://particles.js.org) (hero sparkles) |
| Lint | ESLint 10 |
| Deploy | [Netlify](https://www.netlify.com) + `netlify.toml` |

**Yerel asetler:** Google Sans (variable font), Zen Dots, `countours.svg` topografik doku

---

## Hızlı başlangıç

### Gereksinimler

- Node.js **18.18+** veya **20+**
- npm **10+** (pnpm / yarn / bun da kullanılabilir)

### Kurulum

```bash
git clone https://github.com/MachineX41/TimeCraft.git
cd TimeCraft
npm install
npm run dev
```

Tarayıcıda: [http://localhost:5173](http://localhost:5173)

### Build

```bash
npm run build    # dist/ üretir
npm run preview  # production build önizleme
npm run lint     # ESLint kontrolü
```

---

## Proje yapısı

```
timecraft/
├─ public/
│  ├─ timecraftlogo.svg       # logo + favicon
│  ├─ readme.png              # README önizleme görseli
│  ├─ header.png, headerr.png # dashboard / hero arka plan
│  ├─ footer.png              # footer zemin
│  └─ countours.svg           # drawer doku
├─ src/
│  ├─ pages/                  # Home, Dashboard
│  ├─ components/             # Navbar, Footer, ProjectTable, ProjectDrawer…
│  │  ├─ home/                # landing bölümleri
│  │  └─ ui/                  # CtaButton, SparklesCore, ShinyText, RevealMotion
│  ├─ interfaces/             # projectSchema, mock veri
│  ├─ utils/                  # storage, stats, search
│  └─ constants/              # BorderGlow ayarları
├─ netlify.toml               # Netlify build + SPA redirect
├─ vite.config.js
└─ index.html
```

---

## Veri modeli

Projeler `localStorage` anahtarı `timecraft-projects` altında saklanır. İlk açılışta örnek projeler yüklenir.

```json
{
  "id": "proj-001",
  "clientName": "Nova Digital",
  "projectTitle": "E-ticaret Arayüz Tasarımı",
  "hourlyRate": 850,
  "hoursWorked": 24,
  "status": "Devam Ediyor",
  "about": "Proje açıklaması…",
  "createdAt": "2026-04-12T09:00:00.000Z"
}
```

- **Durumlar:** `Beklemede` · `Devam Ediyor` · `Tamamlandı`
- **Kazanç:** `hourlyRate × hoursWorked` (TRY)

---

## Dağıtım (Netlify)

Proje [Netlify](https://www.netlify.com) üzerinde yayında: **[timecraftt.netlify.app](https://timecraftt.netlify.app)**

`netlify.toml` build ayarlarını ve React Router SPA yönlendirmesini içerir:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Yeni deploy kurulumu

1. Netlify → **Add new site** → **Import an existing project**
2. GitHub: `MachineX41/TimeCraft`
3. Ayarlar `netlify.toml`'dan otomatik okunur → **Deploy**

> **GitHub About alanı:** Repo sayfasında sağ üst **⚙️ About → Edit** → Website alanına `https://timecraftt.netlify.app` yazın. Eski Vercel linki burada kalıyorsa bu adımdan güncellenir.

---

## Responsive

| Breakpoint | Davranış |
|------------|----------|
| ≤ 767px | Kompakt navbar, kart layout, bottom sheet drawer |
| 768–1023px | Tablet layout, drawer rail |
| ≥ 1024px | Tam tablo, mega menü, geniş hero |

---

## Yol haritası

- [ ] Bulut senkronizasyonu / opsiyonel auth
- [ ] Haftalık / aylık rapor + PDF export
- [ ] Fatura taslakları
- [ ] Start/stop zaman takibi
- [ ] İngilizce dil desteği
- [ ] Açık tema

---

## Katkı

Issue ve pull request'ler memnuniyetle karşılanır.

```bash
git checkout -b feat/yeni-ozellik
npm run lint
git commit -m "feat: açıklama"
git push origin feat/yeni-ozellik
```

---

<div align="center">

**[timecraftt.netlify.app](https://timecraftt.netlify.app)** · Made for freelancers

</div>
