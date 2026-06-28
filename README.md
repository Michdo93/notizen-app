# 📝 Notizen-App

GitHub Pages Frontend für die Notizen-App mit FastAPI Backend auf Render.com.

🔗 **Frontend:** `https://Michdo93.github.io/notizen-app/`  
🔗 **Backend-Repo:** `notizen-backend` auf Render.com

## Setup

### 1. Backend deployen
Siehe [notizen-backend/README.md](../notizen-backend/README.md)

### 2. Backend-URL eintragen
In `js/api.js` die Render.com URL eintragen:
```javascript
const API_BASE = 'https://notizen-backend.onrender.com'; // ← anpassen
```

### 3. Frontend deployen
```
Settings → Pages → Source: main / root
```

## Features
- **Login / Registrierung** – JWT-basiert, 7 Tage gültig
- **Notizen** – Erstellen, bearbeiten, löschen, anpinnen
- **Farben** – 8 Notiz-Farben wählbar
- **Suche** – Live-Filterung im Browser
- **Admin-Panel** – Benutzerverwaltung, Statistiken
- **Responsiv** – Sidebar-Navigation, Mobile-Hamburger-Menü

## Hinweis: Cold Start
Render.com Free-Tier schläft nach 15 Min. Inaktivität ein. Der erste Request nach Inaktivität dauert ~30 Sekunden. Für produktive Nutzung: Render.com Paid Plan oder regelmäßige Pings (z.B. UptimeRobot).
