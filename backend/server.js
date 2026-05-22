// ── Servidor principal — Álbum Estrellas de Ventas 2026 ──────────────────────
require('dotenv').config();
const express  = require('express');
const cors     = require('cors');
const { iniciarScheduler, procesarVentasSemanales } = require('./services/scheduler');

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(express.json());

// ── Rutas ─────────────────────────────────────────────────────────────────────
app.use('/api/auth',   require('./routes/auth'));
app.use('/api/stores', require('./routes/stores'));

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Sincronización manual (útil para pruebas sin esperar el lunes)
// Llamar con: POST /api/sync  (solo desde herramientas internas)
app.post('/api/sync', async (_req, res) => {
  await procesarVentasSemanales();
  res.json({ message: 'Sincronización completada.' });
});

// ── Inicio ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  iniciarScheduler();
});
