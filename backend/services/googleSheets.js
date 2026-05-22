// ── Google Sheets — lector de datos de ventas ────────────────────────────────
// El Google Sheet debe tener estas columnas (fila 1 = encabezados):
// A: empleado_sheets_id | B: tienda_codigo | C: semana | D: porcentaje | E: estado
//
// Ejemplo de fila:
// EMP-001 | TDA-001 | 2 | 100 | activo
// EMP-002 | TDA-001 | 2 | 85  | activo
// EMP-003 | TDA-002 | 1 | 100 | inactivo   ← se eliminará del álbum

require('dotenv').config();
const { google } = require('googleapis');

const auth = new google.auth.GoogleAuth({
  keyFile: process.env.GOOGLE_SERVICE_ACCOUNT_FILE,
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

async function leerDatosVentas() {
  const client = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: client });

  const tab   = process.env.GOOGLE_SHEET_TAB || 'Ventas';
  const range = `${tab}!A2:E`;

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range,
  });

  const filas = response.data.values || [];

  return filas
    .filter(fila => fila[0] && fila[1])
    .map(fila => ({
      sheetsId:      fila[0]?.trim(),
      tiendaCodigo:  fila[1]?.trim().toUpperCase(),
      semana:        parseInt(fila[2]) || 0,
      porcentaje:    parseFloat(fila[3]) || 0,
      activo:        fila[4]?.trim().toLowerCase() !== 'inactivo',
    }));
}

module.exports = { leerDatosVentas };
