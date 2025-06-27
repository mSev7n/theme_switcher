// << mSeven.dev >>

// 1. Select the toggle button
const toggleBtn = document.getElementById('theme-toggle');

// 2. Detect system preference (dark or light)
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');

// 3. Determine whether we're running locally (API available) or on GitHub Pages (static)
const API =
  window.location.hostname === 'localhost' ? 'http://localhost:4000/api/settings' : null;

// 4. Apply the given theme to the document + UI
function applyTheme(theme) {
  // A. Set the data-attribute for CSS variables
  document.documentElement.setAttribute('data-theme', theme);

  // B. Store theme in localStorage as fallback
  localStorage.setItem('theme', theme);

  // C. Update accessibility: screen readers know the next mode
  const opposite = theme === 'dark' ? 'light' : 'dark';
  toggleBtn.setAttribute('aria-label', `Switch to ${opposite} mode`);

  // D. Update button icon and label
  toggleBtn.textContent = (theme === 'dark' ? '☀️' : '🌙') + ' Toggle Theme';
}

// 5. On page load — use backend if possible, fallback to localStorage/system
if (API) {
  fetch(API)
    .then(res => res.json())
    .then(data => applyTheme(data.theme))
    .catch(() => {
      // If backend fails, use saved or system preference
      const fallback = localStorage.getItem('theme') || (systemPrefersDark.matches ? 'dark' : 'light');
      applyTheme(fallback);
    });
} else {
  const savedTheme = localStorage.getItem('theme');
  applyTheme(savedTheme || (systemPrefersDark.matches ? 'dark' : 'light'));
}

// 6. On toggle click — flip theme, update UI, save to API/localStorage
toggleBtn.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const newTheme = current === 'dark' ? 'light' : 'dark';

  applyTheme(newTheme);

  // Save new preference to backend
  if (API) {
    fetch(API, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ theme: newTheme })
    }).catch(() => null); // ignore errors
  }
});

// Check for system theme changes live (macOS auto mode)
// will modify this later that's why it  is commented
/*
systemPrefersDark.addEventListener('change', (e) => {
  if (!localStorage.getItem('theme')) {
    applyTheme(e.matches ? 'dark' : 'light');
  }
});
*/
