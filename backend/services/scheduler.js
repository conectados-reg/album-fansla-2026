// ── Automatización semanal ────────────────────────────────────────────────────
// Se ejecuta cada lunes a las 6am (hora de Bogotá/Colombia UTC-5)
// 1. Lee ventas desde Google Sheets
// 2. Marca empleados inactivos (despedidos)
// 3. Registra resultados de ventas
// 4. Desbloquea espacios de quienes cumplieron 100%

require('dotenv').config();
const cron                = require('node-cron');
const { createClient }    = require('@supabase/supabase-js');
const { leerDatosVentas } = require('./googleSheets');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

async function procesarVentasSemanales() {
  console.log(`[${new Date().toISOString()}] Iniciando procesamiento semanal...`);

  try {
    // 1. Obtener semana activa
    const { data: semana, error: errSem } = await supabase
      .from('semanas')
      .select('*')
      .eq('activa', true)
      .single();

    if (errSem || !semana) {
      console.warn('[Scheduler] No hay semana activa. Verificar tabla semanas.');
      return;
    }
    console.log(`[Scheduler] Semana activa: ${semana.numero} (${semana.fecha_inicio} → ${semana.fecha_fin})`);

    // 2. Leer datos del Google Sheet
    const datosVentas = await leerDatosVentas();
    console.log(`[Scheduler] ${datosVentas.length} registros leídos desde Google Sheets.`);

    let desbloqueados = 0;
    let inactivos     = 0;
    let registrados   = 0;

    for (const dato of datosVentas) {

      // 3. Buscar empleado por su ID de Sheets
      const { data: empleado } = await supabase
        .from('empleados')
        .select('id, nombre, semana_asignada, activo')
        .eq('sheets_row_id', dato.sheetsId)
        .single();

      if (!empleado) continue;

      // 4. Marcar como inactivo si fue despedido
      if (!dato.activo && empleado.activo) {
        await supabase
          .from('empleados')
          .update({ activo: false })
          .eq('id', empleado.id);
        console.log(`  ✗ Inactivo: ${empleado.nombre}`);
        inactivos++;
        continue;
      }

      // Solo procesar si la semana del dato coincide con la semana activa
      // y es la semana asignada al empleado
      if (dato.semana !== semana.numero || empleado.semana_asignada !== semana.numero) continue;

      // 5. Guardar resultado de ventas
      await supabase
        .from('resultados_ventas')
        .upsert({
          empleado_id:         empleado.id,
          semana_id:           semana.id,
          porcentaje_cumplido: dato.porcentaje,
          cumplio_meta:        dato.porcentaje >= 100,
          fecha_registro:      new Date().toISOString(),
        }, { onConflict: 'empleado_id,semana_id' });
      registrados++;

      // 6. Desbloquear espacio si cumplió 100%
      if (dato.porcentaje >= 100) {
        await supabase
          .from('espacios_album')
          .upsert({
            empleado_id:      empleado.id,
            semana_id:        semana.id,
            desbloqueado:     true,
            fecha_desbloqueo: new Date().toISOString(),
          }, { onConflict: 'empleado_id,semana_id' });
        console.log(`  ★ Desbloqueado: ${empleado.nombre} (${dato.porcentaje}%)`);
        desbloqueados++;
      }
    }

    console.log(`[Scheduler] Completado → ${registrados} registros, ${desbloqueados} desbloqueados, ${inactivos} inactivos.`);

  } catch (err) {
    console.error('[Scheduler] Error en procesamiento:', err.message);
  }
}

function iniciarScheduler() {
  // Cada lunes a las 6:00am hora Colombia (UTC-5)
  cron.schedule('0 6 * * 1', procesarVentasSemanales, {
    timezone: 'America/Bogota',
  });
  console.log('[Scheduler] Activo — se ejecuta cada lunes 6:00am (Bogotá).');
}

// También exponer para ejecutar manualmente desde el endpoint /api/sync
module.exports = { iniciarScheduler, procesarVentasSemanales };
