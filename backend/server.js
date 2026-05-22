require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const { iniciarScheduler, procesarVentasSemanales } = require('./services/scheduler');

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(express.json());

app.use('/api/auth',   require('./routes/auth'));
app.use('/api/stores', require('./routes/stores'));

app.get('/api/health', (_req, res) => res.json({ status:'ok', timestamp: new Date().toISOString() }));

app.post('/api/sync', async (_req, res) => {
  await procesarVentasSemanales();
  res.json({ message: 'Sincronización completada.' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  iniciarScheduler();
});
