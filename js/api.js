// ── Konfiguration ─────────────────────────────────────────────────────────────
// WICHTIG: Hier die Render.com Backend-URL eintragen
const API_BASE = window.location.hostname === 'localhost'
  ? 'http://localhost:8000'
  : 'https://notizen-backend.onrender.com'; // ← Render.com URL anpassen

// ── Auth Helpers ──────────────────────────────────────────────────────────────
function getToken() { return localStorage.getItem('nz_token'); }
function getUser()  { try { return JSON.parse(localStorage.getItem('nz_user')); } catch { return null; } }
function setAuth(token, user) {
  localStorage.setItem('nz_token', token);
  localStorage.setItem('nz_user', JSON.stringify(user));
}
function clearAuth() {
  localStorage.removeItem('nz_token');
  localStorage.removeItem('nz_user');
}
function isLoggedIn() { return !!getToken(); }
function isAdmin()    { return getUser()?.is_admin === true; }

// ── Redirect Guards ───────────────────────────────────────────────────────────
function requireAuth() {
  if (!isLoggedIn()) { window.location.href = '../index.html'; }
}
function requireAdmin() {
  if (!isLoggedIn()) { window.location.href = '../index.html'; return; }
  if (!isAdmin())    { window.location.href = 'app.html'; }
}
function redirectIfLoggedIn() {
  if (isLoggedIn()) { window.location.href = 'pages/app.html'; }
}

// ── API Wrapper ───────────────────────────────────────────────────────────────
async function api(method, path, body = null, auth = true) {
  const headers = { 'Content-Type': 'application/json' };
  if (auth) headers['Authorization'] = `Bearer ${getToken()}`;
  const opts = { method, headers };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(API_BASE + path, opts);
  if (res.status === 401) { clearAuth(); window.location.href = '../index.html'; return; }
  if (res.status === 204) return null;
  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || 'Fehler');
  return data;
}

async function apiForm(path, formData) {
  const res = await fetch(API_BASE + path, {
    method: 'POST',
    body: formData,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || 'Login fehlgeschlagen');
  return data;
}

// ── UI Helpers ────────────────────────────────────────────────────────────────
function showError(id, msg)   { const el = document.getElementById(id); if(el) { el.textContent = msg; el.style.display = 'block'; } }
function hideError(id)        { const el = document.getElementById(id); if(el) el.style.display = 'none'; }
function showSuccess(id, msg) { const el = document.getElementById(id); if(el) { el.textContent = msg; el.style.display = 'block'; } }

function fmtDate(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function openModal(id)  { document.getElementById(id).style.display = 'flex'; }
function closeModal(id) { document.getElementById(id).style.display = 'none'; }

// Close modal on overlay click
document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.style.display = 'none';
  }
});

// Hamburger
function toggleSidebar() {
  document.querySelector('.sidebar')?.classList.toggle('open');
  document.querySelector('.mobile-nav-overlay')?.classList.toggle('open');
}

// ── Note Colors ───────────────────────────────────────────────────────────────
const NOTE_COLORS = [
  '#1e1f26','#2d1a1a','#1a2d1a','#1a1a2d',
  '#2d2a1a','#2a1a2d','#1a2a2d','#2d1a2a',
];
