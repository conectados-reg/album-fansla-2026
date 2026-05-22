document.addEventListener('DOMContentLoaded', () => {
  const session = requireAuth();
  if (!session) return;
  const params = new URLSearchParams(window.location.search);
  const codigo = params.get('tienda') || session.codigo;
  const tienda = getTiendaData(codigo);
  if (!tienda) { window.location.href = 'index.html'; return; }
  renderNavbar(tienda);
  renderHero(tienda);
  renderSemanas(tienda);
  renderStats(tienda);
  document.getElementById('btnLogout').addEventListener('click', logout);
});

function renderNavbar(tienda) {
  const { desbloqueados, total } = calcularProgreso(tienda);
  const pct = Math.round((desbloqueados / total) * 100);
  document.getElementById('navTienda').textContent    = tienda.nombre;
  document.getElementById('navRegion').textContent    = tienda.region;
  document.getElementById('navSemana').textContent    = `Semana ${CURRENT_WEEK} de 6`;
  document.getElementById('navPct').textContent       = `${pct}%`;
  document.getElementById('progressFill').style.width = `${pct}%`;
}

function renderHero(tienda) {
  const { desbloqueados, total } = calcularProgreso(tienda);
  const semanaActual = SEMANAS.find(s => s.numero === CURRENT_WEEK);
  const porSemana    = Math.ceil(total / 6);
  document.getElementById('statTotal').textContent         = total;
  document.getElementById('statDesbloqueados').textContent = desbloqueados;
  document.getElementById('statSemana').textContent        = CURRENT_WEEK;
  document.getElementById('statPorSemana').textContent     = porSemana;
  document.getElementById('heroTienda').textContent = tienda.nombre;
  document.getElementById('heroRegion').textContent = tienda.region;
  document.getElementById('heroFechas').textContent = semanaActual ? semanaActual.fechas : '';
}

function renderSemanas(tienda) {
  const container = document.getElementById('albumContainer');
  container.innerHTML = '';
  SEMANAS.forEach(semana => {
    const empleadosSemana = tienda.empleados.filter(e => e.semana === semana.numero);
    if (!empleadosSemana.length) return;
    container.appendChild(buildSemanaSection(semana, empleadosSemana));
  });
}

function buildSemanaSection(semana, empleados) {
  const section = document.createElement('section');
  section.className = `semana-section semana-${semana.estado}`;
  section.id = `semana-${semana.numero}`;
  const desb = empleados.filter(e => e.cumplioMeta).length;
  const badgeTexto = { pasada:'Completada', actual:'En curso', futura:'Bloqueada' }[semana.estado];
  const badgeIcon  = { pasada:'✓', actual:'▶', futura:'🔒' }[semana.estado];
  section.innerHTML = `
    <div class="semana-header">
      <div class="semana-info">
        <span class="semana-num">Semana ${semana.numero}</span>
        <span class="semana-nombre">${semana.nombre.split('—')[1]?.trim()||''}</span>
        <span class="semana-fechas">${semana.fechas}</span>
      </div>
      <div class="semana-meta">
        <span class="semana-badge badge-${semana.estado}">${badgeIcon} ${badgeTexto}</span>
        <span class="semana-counter">${desb}/${empleados.length} desbloqueados</span>
      </div>
    </div>
    <div class="cards-grid">${empleados.map(e => buildCard(e, semana.estado)).join('')}</div>`;
  return section;
}

function buildCard(empleado, estadoSemana) {
  const inicial = empleado.nombre.charAt(0).toUpperCase();
  if (estadoSemana === 'futura') {
    return `<div class="sticker sticker-futura"><div class="sticker-inner"><div class="sticker-silhouette">?</div><div class="sticker-lock-icon">🔒</div></div><div class="sticker-footer"><span class="sticker-status">Por desbloquear</span></div></div>`;
  }
  if (empleado.cumplioMeta) {
    return `<div class="sticker sticker-desbloqueado"><div class="sticker-shine"></div><div class="sticker-inner"><div class="sticker-foto">${empleado.foto?`<img src="${empleado.foto}" alt="${empleado.nombre}" />`:`<div class="sticker-inicial">${inicial}</div>`}</div><div class="sticker-badge-meta">⭐ 100%</div></div><div class="sticker-footer"><span class="sticker-nombre">${empleado.nombre}</span><span class="sticker-cargo">${empleado.cargo}</span></div></div>`;
  }
  const label = estadoSemana === 'actual' ? 'En curso' : 'No cumplió';
  const clase  = estadoSemana === 'actual' ? 'sticker-en-curso' : 'sticker-bloqueado';
  return `<div class="sticker ${clase}"><div class="sticker-inner"><div class="sticker-silhouette">${inicial}</div>${estadoSemana==='actual'?'<div class="pulse-ring"></div>':''}</div><div class="sticker-footer"><span class="sticker-nombre">${empleado.nombre}</span><span class="sticker-status">${label}</span></div></div>`;
}

function renderStats(tienda) {
  const container = document.getElementById('statsBar');
  if (!container) return;
  container.innerHTML = SEMANAS.map(s => {
    const emps = tienda.empleados.filter(e => e.semana === s.numero);
    const ok   = emps.filter(e => e.cumplioMeta).length;
    const pct  = emps.length ? Math.round((ok/emps.length)*100) : 0;
    return `<div class="mini-stat mini-${s.estado}" onclick="scrollToSemana(${s.numero})"><span class="mini-num">S${s.numero}</span><div class="mini-bar-wrap"><div class="mini-bar-fill" style="width:${pct}%"></div></div><span class="mini-pct">${pct}%</span></div>`;
  }).join('');
}

function scrollToSemana(num) {
  const el = document.getElementById(`semana-${num}`);
  if (el) el.scrollIntoView({ behavior:'smooth', block:'start' });
}
