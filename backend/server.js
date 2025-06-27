// << mSeven.dev >>

/*
  Simple User-Settings API
  • GET  /api/settings   → { theme: "dark" }
  • PUT  /api/settings   → { status: "saved" }
  Stores data in settings.json (same folder).
*/

const express = require('express');
const fs       = require('fs');
const path     = require('path');
const cors     = require('cors');

const app  = express();
const PORT = process.env.PORT || 4000;
const DATA = path.join(__dirname, 'settings.json');

app.use(cors());
app.use(express.json());

// helper ─ read theme from file (defaults to 'light')
const readTheme  = () =>
  fs.existsSync(DATA) ? JSON.parse(fs.readFileSync(DATA, 'utf8')).theme || 'light'
                      : 'light';

// helper ─ write theme to file
const writeTheme = theme =>
  fs.writeFileSync(DATA, JSON.stringify({ theme }, null, 2));

// GET  /api/settings
app.get('/api/settings', (_, res) => res.json({ theme: readTheme() }));

// PUT  /api/settings  { theme: "dark" }
app.put('/api/settings', (req, res) => {
  const { theme } = req.body;
  if (!['light', 'dark'].includes(theme))
    return res.status(400).json({ error: 'theme must be light or dark' });

  writeTheme(theme);
  res.json({ status: 'saved' });
});

app.listen(PORT, () =>
  console.log(`⚡  Settings API running → http://localhost:${PORT}`)
);
