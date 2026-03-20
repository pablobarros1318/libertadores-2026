-- ============================================================
-- CONMEBOL Libertadores 2026 — Filial Horacio Barros
-- Ejecutar en Supabase > SQL Editor
-- ============================================================

-- Tabla de partidos del Grupo E
CREATE TABLE IF NOT EXISTS matches (
  id          INTEGER PRIMARY KEY,
  fecha       INTEGER NOT NULL,
  home        TEXT NOT NULL,
  away        TEXT NOT NULL,
  home_score  INTEGER DEFAULT NULL,
  away_score  INTEGER DEFAULT NULL,
  match_time  TEXT DEFAULT NULL,        -- ej: "20:30"
  match_date  TEXT DEFAULT NULL,        -- ej: "2026-04-08"
  status      TEXT DEFAULT 'pending'    -- 'pending' | 'live' | 'finished'
);

-- Insertar los 12 partidos del Grupo E con localías correctas
INSERT INTO matches (id, fecha, home, away) VALUES
  -- FECHA 1: Platense LOCAL vs Corinthians
  (1,  1, 'platense',    'corinthians'),
  (2,  1, 'peñarol',     'santafe'),
  -- FECHA 2: Platense VISITANTE en Montevideo vs Peñarol
  (3,  2, 'peñarol',     'platense'),
  (4,  2, 'corinthians', 'santafe'),
  -- FECHA 3: Platense LOCAL vs Ind. Santa Fe
  (5,  3, 'platense',    'santafe'),
  (6,  3, 'corinthians', 'peñarol'),
  -- FECHA 4: Platense VISITANTE en San Pablo vs Corinthians
  (7,  4, 'corinthians', 'platense'),
  (8,  4, 'santafe',     'peñarol'),
  -- FECHA 5: Platense LOCAL vs Peñarol
  (9,  5, 'platense',    'peñarol'),
  (10, 5, 'santafe',     'corinthians'),
  -- FECHA 6: Platense VISITANTE en Bogotá vs Ind. Santa Fe
  (11, 6, 'santafe',     'platense'),
  (12, 6, 'peñarol',     'corinthians')
ON CONFLICT (id) DO NOTHING;

-- Habilitar Row Level Security
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;

-- Política: cualquiera puede LEER
CREATE POLICY "Lectura pública" ON matches
  FOR SELECT USING (true);

-- Política: cualquiera puede ACTUALIZAR
-- (la autenticación la manejamos en el frontend con contraseña)
CREATE POLICY "Actualización pública" ON matches
  FOR UPDATE USING (true);

-- Habilitar Realtime para actualizaciones en vivo
ALTER PUBLICATION supabase_realtime ADD TABLE matches;
