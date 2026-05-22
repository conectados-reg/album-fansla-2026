require('dotenv').config();
const cron             = require('node-cron');
const { createClient } = require('@supabase/supabase-js');
const { leerDatosVentas } = require('./googleSheets');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

async function procesarVentasSemanales() {
  console.log(`[${new Date().toISOString()}] Iniciando procesamiento semanal...`);
  try {
    const { data: semana, error: errSem } = await supabase.from('semanas').select('*').eq('activa', true).single();
    if (errSem || !semana) { console.warn('[Scheduler] No hay semana activa.'); return; }
    console.log(`[Scheduler] Semana activa: ${semana.numero}`);

    const datosVentas = await leerDatosVentas();
    console.log(`[Scheduler] ${datosVentas.length} registros leídos.`);

    let desbloqueados = 0, inactivos = 0, registrados = 0;

    for (const dato of datosVentas) {
      const { data: empleado } = await supabase.from('empleados')
        .select('id, nombre, semana_asignada, activo').eq('sheets_row_id', dato.sheetsId).single();
      if (!empleado) continue;

      if (!dato.activo && empleado.activo) {
        await supabase.from('empleados').update({ activo:false }).eq('id', empleado.id);
        console.log(`  ✗ Inactivo: ${empleado.nombre}`);
        inactivos++; continue;
      }

      if (dato.semana !== semana.numero || empleado.semana_asignada !== semana.numero) continue;

      await supabase.from('resultados_ventas').upsert({
        empleado_id: empleado.id, semana_id: semana.id,
        porcentaje_cumplido: dato.porcentaje, cumplio_meta: dato.porcentaje >= 100,
        fecha_registro: new Date().toISOString(),
      }, { onConflict:'empleado_id,semana_id' });
      registrados++;

      if (dato.porcentaje >= 100) {
        await supabase.from('espacios_album').upsert({
          empleado_id: empleado.id, semana_id: semana.id,
          desbloqueado: true, fecha_desbloqueo: new Date().toISOString(),
        }, { onConflict:'empleado_id,semana_id' });
        console.log(`  ★ Desbloqueado: ${empleado.nombre} (${dato.porcentaje}%)`);
        desbloqueados++;
      }
    }
    console.log(`[Scheduler] Completado → ${registrados} registros, ${desbloqueados} desbloqueados, ${inactivos} inactivos.`);
  } catch (err) {
    console.error('[Scheduler] Error:', err.message);
  }
}

function iniciarScheduler() {
  cron.schedule('0 6 * * 1', procesarVentasSemanales, { timezone:'America/Bogota' });
  console.log('[Scheduler] Activo — cada lunes 6:00am (Bogotá).');
}

module.exports = { iniciarScheduler, procesarVentasSemanales };
