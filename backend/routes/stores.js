// ── Datos de tiendas y álbum ──────────────────────────────────────────────────
const router   = require('express').Router();
const jwt      = require('jsonwebtoken');
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// ── Middleware de autenticación ───────────────────────────────────────────────
function auth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No autorizado.' });
  try {
    req.usuario = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Token inválido o expirado.' });
  }
}

function soloAdmin(req, res, next) {
  if (req.usuario.rol !== 'admin') return res.status(403).json({ error: 'Solo administradores.' });
  next();
}

// ── GET /api/stores/:tiendaId/album ──────────────────────────────────────────
// Devuelve tienda + empleados + semanas con estado de desbloqueo
router.get('/:tiendaId/album', auth, async (req, res) => {
  const { tiendaId } = req.params;

  // Tienda solo puede ver sus propios datos
  if (req.usuario.rol === 'tienda' && req.usuario.tiendaId !== tiendaId) {
    return res.status(403).json({ error: 'Acceso denegado.' });
  }

  const [{ data: tienda }, { data: empleados }, { data: semanas }] = await Promise.all([
    supabase.from('tiendas').select('*').eq('id', tiendaId).single(),
    supabase
      .from('empleados')
      .select(`
        id, nombre, cargo, foto_url, semana_asignada, activo,
        espacios_album (desbloqueado, fecha_desbloqueo, semana_id),
        resultados_ventas (porcentaje_cumplido, cumplio_meta, semana_id)
      `)
      .eq('tienda_id', tiendaId)
      .eq('activo', true)
      .order('semana_asignada'),
    supabase.from('semanas').select('*').order('numero'),
  ]);

  res.json({ tienda, empleados, semanas });
});

// ── GET /api/stores (solo admin) ─────────────────────────────────────────────
// Vista general de todas las tiendas con su progreso
router.get('/', auth, soloAdmin, async (req, res) => {
  const { data: tiendas } = await supabase
    .from('tiendas')
    .select(`
      id, codigo, nombre, region, ciudad, total_empleados,
      empleados (count)
    `)
    .eq('activa', true)
    .order('nombre');

  // Calcular progreso por tienda
  const resumen = await Promise.all(
    (tiendas || []).map(async (t) => {
      const { count } = await supabase
        .from('espacios_album')
        .select('*', { count: 'exact', head: true })
        .eq('desbloqueado', true)
        .in(
          'empleado_id',
          (await supabase.from('empleados').select('id').eq('tienda_id', t.id).eq('activo', true))
            .data?.map(e => e.id) || []
        );
      return { ...t, desbloqueados: count || 0 };
    })
  );

  res.json({ tiendas: resumen });
});

module.exports = router;
