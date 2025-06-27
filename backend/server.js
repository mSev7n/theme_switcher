// << mSeven.dev >>

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

// Use a JSON file to store the theme preference
const SETTINGS_FILE = path.join(__dirname, 'settings.json');

// Middleware
app.use(cors());
app.use(express.json());

// Helper to safely read the saved theme
function getSavedTheme() {
  try {
    if (!fs.existsSync(SETTINGS_FILE)) return 'light';
    const data = JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf8'));
    return data.theme || 'light';
  } catch {
    return 'light';
  }
}

// Helper to write the theme to file
function saveTheme(theme) {
  fs.writeFileSync(SETTINGS_FILE, JSON.stringify({ theme }, null, 2));
}

// GET /api/settings → returns current theme
app.get('/api/settings', (req, res) => {
  const theme = getSavedTheme();
  res.json({ theme });
});

// PUT /api/settings → updates theme
app.put('/api/settings', (req, res) => {
  const { theme } = req.body;
  if (!['light', 'dark'].includes(theme)) {
    return res.status(400).json({ error: 'Invalid theme value' });
  }

  saveTheme(theme);
  res.json({ status: 'saved' });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ mSeven Settings API running on http://localhost:${PORT}`);
});
