# ⚽ 2026 World Cup Schedule App

![React](https://img.shields.io/badge/React-18-blue)
![Vite](https://img.shields.io/badge/Vite-fast-purple)
![Tailwind](https://img.shields.io/badge/TailwindCSS-modern-38B2AC)
![License](https://img.shields.io/badge/License-Personal-lightgrey)

A **mobile-first, bilingual (EN / 简体中文)** World Cup schedule web app with a bold stadium-style UI.

---

## 🚀 Live Demo (optional)

_Add your deployed link here_

---

## ✨ Features

- 🌍 Language toggle (EN / 中文)
- 📅 Full 104-match schedule
- 🔍 Smart filtering system
- 🎛 iOS-style bottom sheet UX
- 🎵 Embedded World Cup theme music
- 🎨 Stadium-themed background + glass UI
- ⚡ Fully static (no backend)

---

## 🧱 Tech Stack

- React (Vite)
- Tailwind CSS
- lucide-react

---

## 📂 Project Structure

```
2026-world-cup-schedule/
├── src/
│   └── App.jsx
├── public/
│   └── worldcup-bg.png
├── docs/
│   └── prompt.md
├── README.md
└── package.json
```

---

## ▶️ Local Development

```bash
npm install
npm run dev
```

Open:

```
http://localhost:5173
```

---

## 🌐 Deployment

### Vercel

```bash
npm install -g vercel
vercel
```

### Netlify

- Drag & drop `dist/` after:
```bash
npm run build
```

---

## 🎵 Music Player

Uses YouTube embed:

```js
const STREAM_EMBED_URL = "https://www.youtube.com/embed/dZDj2CnG5dE";
```

⚠️ Autoplay with sound is blocked by browsers.

---

## 🖼 Background

Place file:

```
/public/worldcup-bg.png
```

---

## 🛠 Updating Schedule

Update ONLY:

```
matches[] in App.jsx
```

---

## 📄 Prompt System

Located in:

```
docs/prompt.md
```

Used to regenerate:
- Match data
- UI

---

## ⚠️ Notes

- Static app (no API)
- Optimized for mobile UX
- Designed for future updates

---

## 🔮 Future Improvements

- API integration
- Favorites
- Timezone auto-detect
- PWA support

---

## 🏁 License

Personal / educational use only.
