// << mSeven.dev >>

// Select the toggle button
const toggleBtn = document.getElementById('theme-toggle');
const API = 'http://localhost:4000/api/settings'; // Local mock backend

// Apply a given theme to the page
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  toggleBtn.textContent = theme === 'dark' ? '☀️ Toggle Theme' : '🌙 Toggle Theme';
  toggleBtn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
}

// Try to fetch saved theme from backend → fallback to localStorage
fetch(API)
  .then(res => res.json())
  .then(data => applyTheme(data.theme))
  .catch(() => {
    const fallback = localStorage.getItem('theme') || 'light';
    applyTheme(fallback);
  });

// On click: toggle theme, then persist to backend and localStorage
toggleBtn.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';

  applyTheme(next);
  localStorage.setItem('theme', next); // Fallback/local mode

  // Send update to backend
  fetch(API, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ theme: next })
  }).catch(() => null); // Ignore backend errors
});
