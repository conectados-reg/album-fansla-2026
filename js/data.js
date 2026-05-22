// ─── DATOS DE EJEMPLO ───────────────────────────────────────────────────────
// Cuando llegue la base de datos real, este archivo se reemplaza por
// llamadas al backend (backend/routes/stores.js + Supabase)

const CURRENT_WEEK = 2;

const SEMANAS = [
  { numero: 1, nombre: 'Semana 1 — Fase de Grupos', fechas: '9 – 15 Jun 2026', estado: 'pasada' },
  { numero: 2, nombre: 'Semana 2 — Fase de Grupos', fechas: '16 – 22 Jun 2026', estado: 'actual' },
  { numero: 3, nombre: 'Semana 3 — Octavos',        fechas: '23 – 29 Jun 2026', estado: 'futura' },
  { numero: 4, nombre: 'Semana 4 — Cuartos',        fechas: '30 Jun – 6 Jul',   estado: 'futura' },
  { numero: 5, nombre: 'Semana 5 — Semifinal',      fechas: '7 – 13 Jul 2026',  estado: 'futura' },
  { numero: 6, nombre: 'Semana 6 — Final',          fechas: '14 – 19 Jul 2026', estado: 'futura' },
];

const TIENDAS = {
  'TDA-001': {
    codigo: 'TDA-001',
    nombre: 'Tienda Centro Bogotá',
    region: 'Cundinamarca',
    password: 'tienda001',
    totalEmpleados: 60,
    empleados: [
      // SEMANA 1 (empleados 1-10)
      { id:'e01', nombre:'María García',      cargo:'Asesora',   semana:1, cumplioMeta:true,  foto:null },
      { id:'e02', nombre:'Carlos Martínez',   cargo:'Asesor',    semana:1, cumplioMeta:true,  foto:null },
      { id:'e03', nombre:'Ana López',         cargo:'Asesora',   semana:1, cumplioMeta:true,  foto:null },
      { id:'e04', nombre:'Sofía Rodríguez',   cargo:'Asesora',   semana:1, cumplioMeta:true,  foto:null },
      { id:'e05', nombre:'Juan Pérez',        cargo:'Asesor',    semana:1, cumplioMeta:true,  foto:null },
      { id:'e06', nombre:'Laura Gómez',       cargo:'Asesora',   semana:1, cumplioMeta:true,  foto:null },
      { id:'e07', nombre:'Diego Hernández',   cargo:'Asesor',    semana:1, cumplioMeta:true,  foto:null },
      { id:'e08', nombre:'Valentina Torres',  cargo:'Asesora',   semana:1, cumplioMeta:false, foto:null },
      { id:'e09', nombre:'Andrés Ramírez',    cargo:'Asesor',    semana:1, cumplioMeta:false, foto:null },
      { id:'e10', nombre:'Camila Díaz',       cargo:'Asesora',   semana:1, cumplioMeta:false, foto:null },
      // SEMANA 2 (empleados 11-20) — semana actual, en curso
      { id:'e11', nombre:'Felipe Castro',     cargo:'Asesor',    semana:2, cumplioMeta:true,  foto:null },
      { id:'e12', nombre:'Isabella Vargas',   cargo:'Asesora',   semana:2, cumplioMeta:true,  foto:null },
      { id:'e13', nombre:'Sebastián Moreno',  cargo:'Asesor',    semana:2, cumplioMeta:true,  foto:null },
      { id:'e14', nombre:'Daniela Jiménez',   cargo:'Asesora',   semana:2, cumplioMeta:true,  foto:null },
      { id:'e15', nombre:'Miguel Reyes',      cargo:'Asesor',    semana:2, cumplioMeta:false, foto:null },
      { id:'e16', nombre:'Alejandra Ruiz',    cargo:'Asesora',   semana:2, cumplioMeta:false, foto:null },
      { id:'e17', nombre:'Nicolás Sánchez',   cargo:'Asesor',    semana:2, cumplioMeta:false, foto:null },
      { id:'e18', nombre:'Gabriela Aguilar',  cargo:'Asesora',   semana:2, cumplioMeta:false, foto:null },
      { id:'e19', nombre:'David Medina',      cargo:'Asesor',    semana:2, cumplioMeta:false, foto:null },
      { id:'e20', nombre:'Paula Rojas',       cargo:'Asesora',   semana:2, cumplioMeta:false, foto:null },
      // SEMANA 3-6 (empleados 21-60) — futuras
      { id:'e21', nombre:'Tomás Herrera',     cargo:'Asesor',    semana:3, cumplioMeta:false, foto:null },
      { id:'e22', nombre:'Juliana Pinto',     cargo:'Asesora',   semana:3, cumplioMeta:false, foto:null },
      { id:'e23', nombre:'Mateo Cardona',     cargo:'Asesor',    semana:3, cumplioMeta:false, foto:null },
      { id:'e24', nombre:'Sara Ospina',       cargo:'Asesora',   semana:3, cumplioMeta:false, foto:null },
      { id:'e25', nombre:'Ricardo Suárez',    cargo:'Asesor',    semana:3, cumplioMeta:false, foto:null },
      { id:'e26', nombre:'Natalia Peña',      cargo:'Asesora',   semana:3, cumplioMeta:false, foto:null },
      { id:'e27', nombre:'Esteban Giraldo',   cargo:'Asesor',    semana:3, cumplioMeta:false, foto:null },
      { id:'e28', nombre:'Lucía Castaño',     cargo:'Asesora',   semana:3, cumplioMeta:false, foto:null },
      { id:'e29', nombre:'Andrés Vargas',     cargo:'Asesor',    semana:3, cumplioMeta:false, foto:null },
      { id:'e30', nombre:'Carolina Ríos',     cargo:'Asesora',   semana:3, cumplioMeta:false, foto:null },
      { id:'e31', nombre:'Javier Molina',     cargo:'Asesor',    semana:4, cumplioMeta:false, foto:null },
      { id:'e32', nombre:'Verónica Luna',     cargo:'Asesora',   semana:4, cumplioMeta:false, foto:null },
      { id:'e33', nombre:'Samuel Acosta',     cargo:'Asesor',    semana:4, cumplioMeta:false, foto:null },
      { id:'e34', nombre:'Andrea Bermúdez',   cargo:'Asesora',   semana:4, cumplioMeta:false, foto:null },
      { id:'e35', nombre:'Camilo Lozano',     cargo:'Asesor',    semana:4, cumplioMeta:false, foto:null },
      { id:'e36', nombre:'Mariana Mejía',     cargo:'Asesora',   semana:4, cumplioMeta:false, foto:null },
      { id:'e37', nombre:'Daniel Guerrero',   cargo:'Asesor',    semana:4, cumplioMeta:false, foto:null },
      { id:'e38', nombre:'Paola Castillo',    cargo:'Asesora',   semana:4, cumplioMeta:false, foto:null },
      { id:'e39', nombre:'Fernando Trujillo', cargo:'Asesor',    semana:4, cumplioMeta:false, foto:null },
      { id:'e40', nombre:'Mónica Salazar',    cargo:'Asesora',   semana:4, cumplioMeta:false, foto:null },
      { id:'e41', nombre:'Alejandro Cruz',    cargo:'Asesor',    semana:5, cumplioMeta:false, foto:null },
      { id:'e42', nombre:'Tatiana Arbeláez',  cargo:'Asesora',   semana:5, cumplioMeta:false, foto:null },
      { id:'e43', nombre:'Germán Ávila',      cargo:'Asesor',    semana:5, cumplioMeta:false, foto:null },
      { id:'e44', nombre:'Lina Montoya',      cargo:'Asesora',   semana:5, cumplioMeta:false, foto:null },
      { id:'e45', nombre:'Héctor Cano',       cargo:'Asesor',    semana:5, cumplioMeta:false, foto:null },
      { id:'e46', nombre:'Xiomara Duarte',    cargo:'Asesora',   semana:5, cumplioMeta:false, foto:null },
      { id:'e47', nombre:'Álvaro Núñez',      cargo:'Asesor',    semana:5, cumplioMeta:false, foto:null },
      { id:'e48', nombre:'Stefanía Mora',     cargo:'Asesora',   semana:5, cumplioMeta:false, foto:null },
      { id:'e49', nombre:'Jonathan Palacios', cargo:'Asesor',    semana:5, cumplioMeta:false, foto:null },
      { id:'e50', nombre:'Rebeca Sandoval',   cargo:'Asesora',   semana:5, cumplioMeta:false, foto:null },
      { id:'e51', nombre:'Mauricio Forero',   cargo:'Asesor',    semana:6, cumplioMeta:false, foto:null },
      { id:'e52', nombre:'Gloria Pineda',     cargo:'Asesora',   semana:6, cumplioMeta:false, foto:null },
      { id:'e53', nombre:'César Arango',      cargo:'Asesor',    semana:6, cumplioMeta:false, foto:null },
      { id:'e54', nombre:'Beatriz Londoño',   cargo:'Asesora',   semana:6, cumplioMeta:false, foto:null },
      { id:'e55', nombre:'Rodrigo Zapata',    cargo:'Asesor',    semana:6, cumplioMeta:false, foto:null },
      { id:'e56', nombre:'Catalina Henao',    cargo:'Asesora',   semana:6, cumplioMeta:false, foto:null },
      { id:'e57', nombre:'Wilson Córdoba',    cargo:'Asesor',    semana:6, cumplioMeta:false, foto:null },
      { id:'e58', nombre:'Adriana Cárdenas',  cargo:'Asesora',   semana:6, cumplioMeta:false, foto:null },
      { id:'e59', nombre:'Fabio Quintero',    cargo:'Asesor',    semana:6, cumplioMeta:false, foto:null },
      { id:'e60', nombre:'Patricia Muñoz',    cargo:'Asesora',   semana:6, cumplioMeta:false, foto:null },
    ]
  },

  'TDA-002': {
    codigo: 'TDA-002',
    nombre: 'Tienda Norte Medellín',
    region: 'Antioquia',
    password: 'tienda002',
    totalEmpleados: 30,
    empleados: [
      { id:'f01', nombre:'Luz Amparo Vélez',  cargo:'Asesora',   semana:1, cumplioMeta:true,  foto:null },
      { id:'f02', nombre:'Jhon Castaño',      cargo:'Asesor',    semana:1, cumplioMeta:true,  foto:null },
      { id:'f03', nombre:'Diana Arroyave',    cargo:'Asesora',   semana:1, cumplioMeta:true,  foto:null },
      { id:'f04', nombre:'Oscar Marulanda',   cargo:'Asesor',    semana:1, cumplioMeta:false, foto:null },
      { id:'f05', nombre:'Leidy Gaviria',     cargo:'Asesora',   semana:1, cumplioMeta:false, foto:null },
      { id:'f06', nombre:'Sergio Tobón',      cargo:'Asesor',    semana:2, cumplioMeta:true,  foto:null },
      { id:'f07', nombre:'Marcela Uribe',     cargo:'Asesora',   semana:2, cumplioMeta:true,  foto:null },
      { id:'f08', nombre:'Nelson Palacio',    cargo:'Asesor',    semana:2, cumplioMeta:false, foto:null },
      { id:'f09', nombre:'Sandra Restrepo',   cargo:'Asesora',   semana:2, cumplioMeta:false, foto:null },
      { id:'f10', nombre:'Gustavo Echeverry', cargo:'Asesor',    semana:2, cumplioMeta:false, foto:null },
      { id:'f11', nombre:'Carmen Alzate',     cargo:'Asesora',   semana:3, cumplioMeta:false, foto:null },
      { id:'f12', nombre:'Iván Hoyos',        cargo:'Asesor',    semana:3, cumplioMeta:false, foto:null },
      { id:'f13', nombre:'Esperanza Ríos',    cargo:'Asesora',   semana:3, cumplioMeta:false, foto:null },
      { id:'f14', nombre:'Raúl Betancur',     cargo:'Asesor',    semana:3, cumplioMeta:false, foto:null },
      { id:'f15', nombre:'Patricia Cano',     cargo:'Asesora',   semana:3, cumplioMeta:false, foto:null },
      { id:'f16', nombre:'Edwin Montoya',     cargo:'Asesor',    semana:4, cumplioMeta:false, foto:null },
      { id:'f17', nombre:'Lorena Duque',      cargo:'Asesora',   semana:4, cumplioMeta:false, foto:null },
      { id:'f18', nombre:'Fabián Giraldo',    cargo:'Asesor',    semana:4, cumplioMeta:false, foto:null },
      { id:'f19', nombre:'Claudia Osorio',    cargo:'Asesora',   semana:4, cumplioMeta:false, foto:null },
      { id:'f20', nombre:'Mauricio Peláez',   cargo:'Asesor',    semana:4, cumplioMeta:false, foto:null },
      { id:'f21', nombre:'Adriana Franco',    cargo:'Asesora',   semana:5, cumplioMeta:false, foto:null },
      { id:'f22', nombre:'Rodrigo Ángel',     cargo:'Asesor',    semana:5, cumplioMeta:false, foto:null },
      { id:'f23', nombre:'Natalia Zapata',    cargo:'Asesora',   semana:5, cumplioMeta:false, foto:null },
      { id:'f24', nombre:'Gabriel Soto',      cargo:'Asesor',    semana:5, cumplioMeta:false, foto:null },
      { id:'f25', nombre:'Melissa Agudelo',   cargo:'Asesora',   semana:5, cumplioMeta:false, foto:null },
      { id:'f26', nombre:'Hernán Acevedo',    cargo:'Asesor',    semana:6, cumplioMeta:false, foto:null },
      { id:'f27', nombre:'Isabel Arenas',     cargo:'Asesora',   semana:6, cumplioMeta:false, foto:null },
      { id:'f28', nombre:'Camilo Jaramillo',  cargo:'Asesor',    semana:6, cumplioMeta:false, foto:null },
      { id:'f29', nombre:'Yenny Cárdenas',    cargo:'Asesora',   semana:6, cumplioMeta:false, foto:null },
      { id:'f30', nombre:'Luis Correa',       cargo:'Asesor',    semana:6, cumplioMeta:false, foto:null },
    ]
  },

  'TDA-003': {
    codigo: 'TDA-003',
    nombre: 'Tienda Sur Cali',
    region: 'Valle del Cauca',
    password: 'tienda003',
    totalEmpleados: 12,
    empleados: [
      { id:'g01', nombre:'Amparo Caicedo',    cargo:'Asesora',   semana:1, cumplioMeta:true,  foto:null },
      { id:'g02', nombre:'Jhon Mosquera',     cargo:'Asesor',    semana:1, cumplioMeta:false, foto:null },
      { id:'g03', nombre:'Leidy Mina',        cargo:'Asesora',   semana:2, cumplioMeta:true,  foto:null },
      { id:'g04', nombre:'Carlos Prado',      cargo:'Asesor',    semana:2, cumplioMeta:false, foto:null },
      { id:'g05', nombre:'Sandra Lozano',     cargo:'Asesora',   semana:3, cumplioMeta:false, foto:null },
      { id:'g06', nombre:'Édgar Valencia',    cargo:'Asesor',    semana:3, cumplioMeta:false, foto:null },
      { id:'g07', nombre:'Marcela Ortiz',     cargo:'Asesora',   semana:4, cumplioMeta:false, foto:null },
      { id:'g08', nombre:'Nelson Sinisterra', cargo:'Asesor',    semana:4, cumplioMeta:false, foto:null },
      { id:'g09', nombre:'Gloria Angulo',     cargo:'Asesora',   semana:5, cumplioMeta:false, foto:null },
      { id:'g10', nombre:'Jesús Ramos',       cargo:'Asesor',    semana:5, cumplioMeta:false, foto:null },
      { id:'g11', nombre:'Rocío Castillo',    cargo:'Asesora',   semana:6, cumplioMeta:false, foto:null },
      { id:'g12', nombre:'Alberto Guerrero',  cargo:'Asesor',    semana:6, cumplioMeta:false, foto:null },
    ]
  },

  'ADMIN': {
    codigo: 'ADMIN',
    nombre: 'Administrador',
    password: 'admin2026',
    esAdmin: true
  }
};

function getTiendaData(codigo) {
  return TIENDAS[codigo] || null;
}

function calcularProgreso(tienda) {
  const desbloqueados = tienda.empleados.filter(e => e.cumplioMeta).length;
  return { desbloqueados, total: tienda.totalEmpleados };
}
