// Select the toggle button by its ID
const toggleBtn = document.getElementById('theme-toggle');

// Detect system preference (dark or light)
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');

// Function to apply a theme and update storage + accessibility label
function applyTheme(theme) {
 document.documentElement.setAttribute('data-theme', theme);
 localStorage.setItem('theme', theme);

 // Update ARIA label for screen reader users
 toggleBtn.setAttribute(
   'aria-label',
   `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`
 );
}

