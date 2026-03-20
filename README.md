# Copa Libertadores 2026 — Filial Horacio Barros 
Fixture interactivo del Grupo E con tabla de posiciones en tiempo real.  
Stack: **React + Vite · Supabase · Vercel**

---

## Setup paso a paso

### 1. Clonar y preparar el repo

```bash
git clone <tu-repo>
cd libertadores
npm install
```

---

### 2. Crear el proyecto en Supabase

1. Entrá a [supabase.com](https://supabase.com) y creá una cuenta gratuita
2. **New project** → poné un nombre (ej: `libertadores-2026`) → elegí la región más cercana (South America)
3. Esperá que termine de provisionar (~2 min)

#### Crear las tablas

1. En el panel de Supabase, ir a **SQL Editor**
2. Copiar y ejecutar todo el contenido de `supabase/migration.sql`
3. Verificar que la tabla `matches` se creó con los 12 partidos

#### Obtener las credenciales

1. Ir a **Project Settings → API**
2. Copiar:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public key** → `VITE_SUPABASE_ANON_KEY`

---

### 3. Configurar variables de entorno

Copiar el archivo de ejemplo y completarlo:

```bash
cp .env.example .env
```

Editar `.env`:

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_ADMIN_PASSWORD=elegí_una_contraseña_segura
```

> El `.env` nunca se sube al repo (está en `.gitignore`).  
> Las variables se configuran por separado en Vercel.

---

### 4. Agregar el logo de la Filial

Copiar el logo al directorio `public/`:

```bash
cp logo-filial.png public/logo-filial.png
```

El archivo debe llamarse exactamente `logo-filial.png`.

---

### 5. Correr en local

```bash
npm run dev
```

Abrir [http://localhost:5173](http://localhost:5173)

---

### 6. Deploy en Vercel

1. Subir el proyecto a GitHub
2. Ir a [vercel.com](https://vercel.com) → **New Project** → importar el repo
3. Vercel detecta Vite automáticamente — no hace falta configurar nada del build
4. En **Environment Variables**, agregar las mismas 3 variables del `.env`:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_ADMIN_PASSWORD`
5. **Deploy** → en ~1 minuto tenés la URL pública

---

## 🔧 Cómo usar

### Ver el fixture
Cualquier persona con el link puede ver el fixture, la tabla de posiciones y todos los grupos.

### Editar resultados (admin)
1. Hacer clic en el candado 🔒 del header
2. Ingresar la contraseña configurada en `VITE_ADMIN_PASSWORD`
3. Hacer clic en cualquier partido para editar:
   - Fecha y horario
   - Resultado (goles local/visitante)
   - Estado: Pendiente / En Vivo / Finalizado
4. Los cambios se ven en **tiempo real** para todos los que tengan la página abierta

### Actualizar contraseña
Cambiar `VITE_ADMIN_PASSWORD` en las variables de entorno de Vercel y hacer redeploy.

---

## 📁 Estructura del proyecto

```
libertadores/
├── public/
│   └── logo-filial.png          # Logo de la Filial Horacio Barros
├── src/
│   ├── components/
│   │   ├── Header.jsx/.css      # Logo, título, login admin
│   │   ├── NavTabs.jsx/.css     # Navegación entre vistas
│   │   ├── FixtureView.jsx/.css # Vista de partidos por fecha
│   │   ├── MatchCard.jsx/.css   # Tarjeta individual de partido
│   │   ├── StandingsView.jsx    # Tabla de posiciones
│   │   ├── GroupsView.jsx       # Todos los grupos + llaves
│   │   ├── EditMatchModal.jsx   # Modal de edición (solo admin)
│   │   └── Toast.jsx            # Notificaciones
│   ├── hooks/
│   │   ├── useMatches.js        # Fetch + realtime Supabase
│   │   └── useAdmin.js          # Autenticación con contraseña
│   ├── lib/
│   │   ├── supabase.js          # Cliente Supabase
│   │   └── data.js              # Equipos, fechas, cálculo posiciones
│   ├── styles/
│   │   └── globals.css          # Variables CSS, reset, animaciones
│   ├── App.jsx                  # Componente raíz
│   └── main.jsx                 # Entry point React
├── supabase/
│   └── migration.sql            # Tablas + datos iniciales + RLS
├── .env.example                 # Template de variables de entorno
├── .gitignore
├── index.html
├── package.json
└── vite.config.js
```

