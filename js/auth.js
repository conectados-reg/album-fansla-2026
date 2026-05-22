document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const codigo   = document.getElementById('storeCode').value.trim().toUpperCase();
    const password = document.getElementById('password').value.trim();
    const errorEl  = document.getElementById('loginError');
    errorEl.textContent = '';
    if (!codigo || !password) { errorEl.textContent = 'Ingresa el código de tienda y la contraseña.'; return; }
    const tienda = getTiendaData(codigo);
    if (!tienda || tienda.password !== password) { errorEl.textContent = 'Código o contraseña incorrectos.'; return; }
    sessionStorage.setItem('session', JSON.stringify({ codigo, nombre: tienda.nombre, esAdmin: tienda.esAdmin || false }));
    if (tienda.esAdmin) { window.location.href = 'admin.html'; }
    else { window.location.href = `album.html?tienda=${codigo}`; }
  });
});

function getSession() {
  try { return JSON.parse(sessionStorage.getItem('session')); } catch { return null; }
}

function requireAuth(adminOnly = false) {
  const session = getSession();
  if (!session) { window.location.href = 'index.html'; return null; }
  if (adminOnly && !session.esAdmin) { window.location.href = 'index.html'; return null; }
  return session;
}

function logout() {
  sessionStorage.removeItem('session');
  window.location.href = 'index.html';
}
