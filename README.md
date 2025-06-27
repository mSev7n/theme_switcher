# 🌗 Theme Switcher

Toggle between light and dark themes with smooth transitions. Built with semantic HTML, CSS custom properties, and vanilla JS.

---

## Live Demo
https://msev7n.github.io/theme_switcher/

---

## Features
- Light/Dark mode toggle 🌙 / ☀️  
- Remembers preference via `localStorage`  
- Follows system setting on first visit  
- Keyboard-friendly & screen-reader labeled  
- Responsive on mobile, tablet, desktop  
- Subtle hover, scale, and shadow effects

---

## Tech Stack
- **HTML5** (semantic layout)  
- **CSS3** with custom properties  
- **JavaScript ES6** (no frameworks)


## 🧪 Backend Simulation

This project includes a mock backend built with Express to simulate real-world theme persistence.

While the live site on GitHub Pages uses `localStorage`, the full version supports:

| Method | Endpoint         | Description
____________________________________________________________
| GET    | /api/settings    | Returns saved theme preference |

| PUT    | /api/settings    | Updates user's theme           |

### 🛠 To test the backend locally:

1. Clone the repo
2. Run:

```
git clone https://github.com/your-username/theme_switcher.git
cd theme_switcher/backend
npm install
node server.js
```
Then open index.html in your browser; the theme is now saved in backend/settings.json.

## ♿ Accessibility Compliance Report

This project includes the following accessibility features:

- ✅ Fully **keyboard navigable** (Tab + Enter)
- ✅ Clear **focus indicators** for interactive elements
- ✅ Descriptive `aria-label` on the toggle button
- ✅ Uses **semantic HTML elements** (`<main>`, `<button>`)
- ✅ Text/background color contrast meets **WCAG AA** standards
- ✅ Responsive layout supports **zooming** and **mobile use**

These efforts ensure the interface is usable for keyboard users, screen reader users, and users with visual impairments.

---

 << mSeven.dev >>
