// Select the toggle button by its ID
const toggleBtn = document.getElementById('theme-toggle');

// Detect system preference (dark or light)
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');

// Function to apply a theme and update storage + accessibility label
function applyTheme(theme) {
    // 1. Flip the data-attribute so the CSS variables change
    document.documentElement.setAttribute('data-theme', theme);
  
    // 2. Remember the user’s choice
    localStorage.setItem('theme', theme);
  
    // 3. Update the aria-label for screen readers
    const opposite = theme === 'dark' ? 'light' : 'dark';
    toggleBtn.setAttribute('aria-label', `Switch to ${opposite} mode`);
  
    // 4. Swap the icon + text inside the button
    //    🌙 shows when we’re in LIGHT mode (so user can switch to dark)
    //    ☀️ shows when we’re in DARK mode  (so user can switch to light)
    toggleBtn.textContent =
      (theme === 'dark' ? '☀️' : '🌙') + ' Toggle Theme';
  }

// On page load: use saved theme or system preference
const savedTheme = localStorage.getItem('theme');

if (savedTheme) {
 applyTheme(savedTheme);
} else {
 applyTheme(systemPrefersDark.matches ? 'dark' : 'light');
}

// Toggle theme on button click
toggleBtn.addEventListener('click', () => {
 const currentTheme = document.documentElement.getAttribute('data-theme');
 const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
 applyTheme(newTheme);
});

// Check for system theme changes while the page is open (For Mac Users macOS "Auto" mode switch)
// will modify this code later that's why it's commented
/*

systemPrefersDark.addEventListener('change', (e) => {
 if (!localStorage.getItem('theme')) {
   applyTheme(e.matches ? 'dark' : 'light');
 }
});

*/

