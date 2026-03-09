require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// ── Middleware ────────────────────────────────────────────────
app.use(cors({
  or igin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

// ── Routes ────────────────────────────────────────────────────
app.use('/api/auth',        require('./routes/auth'));
app.use('/api/student',     require('./routes/students'));
app.use('/api/teacher',     require('./routes/teachers'));
app.use('/api/stories',     require('./routes/stories'));
app.use('/api/quizzes',     require('./routes/quizzes'));
app.use('/api/assignments', require('./routes/assignments'));
app.use('/api/schedule',    require('./routes/schedule'));
app.use('/api/messages',    require('./routes/messages'));
app.use('/api/analytics',   require('./routes/analytics'));

// ── Health check ─────────────────────────────────────────────
app.get('/api/health', (req, res) => res.json({ status: 'ok', message: 'Rulyn API is running 🚀' }));

// ── 404 ───────────────────────────────────────────────────────
app.use((req, res) => res.status(404).json({ error: 'Route not found' }));

// ── Error handler ─────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n🚀 Rulyn Backend running at http://localhost:${PORT}`);
  console.log(`📡 API base: http://localhost:${PORT}/api\n`);
});
