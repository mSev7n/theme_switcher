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
/*

systemPrefersDark.addEventListener('change', (e) => {
 if (!localStorage.getItem('theme')) {
   applyTheme(e.matches ? 'dark' : 'light');
 }
});

*/

