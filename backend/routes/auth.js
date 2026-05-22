// ── Autenticación de tiendas y admin ─────────────────────────────────────────
const router   = require('express').Router();
const bcrypt   = require('bcryptjs');
const jwt      = require('jsonwebtoken');
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { codigo, password } = req.body;

  if (!codigo || !password) {
    return res.status(400).json({ error: 'Código y contraseña son requeridos.' });
  }

  const codigoUpper = codigo.trim().toUpperCase();

  // ── Login admin ───────────────────────────────────────────────────────────
  if (codigoUpper === 'ADMIN') {
    const { data: admin } = await supabase
      .from('admins')
      .select('*')
      .eq('email', codigo.trim().toLowerCase())
      .single();

    if (!admin) return res.status(401).json({ error: 'Credenciales inválidas.' });

    const valido = await bcrypt.compare(password, admin.password_hash);
    if (!valido) return res.status(401).json({ error: 'Credenciales inválidas.' });

    const token = jwt.sign(
      { rol: 'admin', id: admin.id },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );
    return res.json({ token, rol: 'admin', nombre: admin.nombre });
  }

  // ── Login tienda ──────────────────────────────────────────────────────────
  const { data: tienda } = await supabase
    .from('tiendas')
    .select('*')
    .eq('codigo', codigoUpper)
    .eq('activa', true)
    .single();

  if (!tienda) return res.status(401).json({ error: 'Tienda no encontrada.' });

  const valido = await bcrypt.compare(password, tienda.password_hash);
  if (!valido) return res.status(401).json({ error: 'Contraseña incorrecta.' });

  const token = jwt.sign(
    { rol: 'tienda', tiendaId: tienda.id, codigo: tienda.codigo },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  );

  res.json({
    token,
    rol: 'tienda',
    tienda: { id: tienda.id, codigo: tienda.codigo, nombre: tienda.nombre, region: tienda.region },
  });
});

module.exports = router;
