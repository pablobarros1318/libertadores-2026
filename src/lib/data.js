// ============================================================
// Datos estáticos del torneo
// ============================================================

export const TEAMS = {
  platense:    { name: 'Platense',       country: 'Argentina', flag: '🇦🇷', logo: '/escudos/platense.png' },
  peñarol:     { name: 'Peñarol',        country: 'Uruguay',   flag: '🇺🇾', logo: '/escudos/penarol.png' },
  corinthians: { name: 'Corinthians',    country: 'Brasil',    flag: '🇧🇷', logo: '/escudos/corinthians.png' },
  santafe:     { name: 'Ind. Santa Fe',  country: 'Colombia',  flag: '🇨🇴', logo: '/escudos/santafe.png' },
}

export const FECHA_LABELS = {
  1: { range: '7 – 9 de Abril',      note: 'Local vs Corinthians' },
  2: { range: '14 – 16 de Abril',    note: 'Visita Peñarol (Montevideo)' },
  3: { range: '28 – 30 de Abril',    note: 'Local vs Ind. Santa Fe' },
  4: { range: '5 – 7 de Mayo',       note: 'Visita Corinthians (San Pablo)' },
  5: { range: '19 – 21 de Mayo',     note: 'Local vs Peñarol' },
  6: { range: '26 – 28 de Mayo',     note: 'Visita Ind. Santa Fe (Bogotá)' },
}

export const ALL_GROUPS = [
  {
    letter: 'A',
    teams: [
      { name: 'Flamengo',       flag: '🇧🇷' },
      { name: 'Estudiantes',    flag: '🇦🇷' },
      { name: 'Cusco',          flag: '🇵🇪' },
      { name: 'Ind. Medellín',  flag: '🇨🇴' },
    ],
  },
  {
    letter: 'B',
    teams: [
      { name: 'Nacional',       flag: '🇺🇾' },
      { name: 'Universitario',  flag: '🇵🇪' },
      { name: 'Coquimbo Unido', flag: '🇨🇱' },
      { name: 'D. Tolima',      flag: '🇨🇴' },
    ],
  },
  {
    letter: 'C',
    teams: [
      { name: 'Fluminense',     flag: '🇧🇷' },
      { name: 'Bolivar',        flag: '🇧🇴' },
      { name: 'D. La Guaira',   flag: '🇻🇪' },
      { name: 'Ind. Rivadavia', flag: '🇦🇷' },
    ],
  },
  {
    letter: 'D',
    teams: [
      { name: 'Boca Juniors',   flag: '🇦🇷' },
      { name: 'Cruzeiro',       flag: '🇧🇷' },
      { name: 'U. Católica',    flag: '🇨🇱' },
      { name: 'Barcelona SC',   flag: '🇪🇨' },
    ],
  },
  {
    letter: 'E',
    isOurGroup: true,
    teams: [
      { name: 'Peñarol',        flag: '🇺🇾' },
      { name: 'Corinthians',    flag: '🇧🇷' },
      { name: 'Ind. Santa Fe',  flag: '🇨🇴' },
      { name: 'Platense',       flag: '🇦🇷', isPlatense: true },
    ],
  },
  {
    letter: 'F',
    teams: [
      { name: 'Palmeiras',      flag: '🇧🇷' },
      { name: 'Cerro Porteño',  flag: '🇵🇾' },
      { name: 'Junior',         flag: '🇨🇴' },
      { name: 'Sporting Cristal', flag: '🇵🇪' },
    ],
  },
  {
    letter: 'G',
    teams: [
      { name: 'Liga de Quito',  flag: '🇪🇨' },
      { name: 'Lanús',          flag: '🇦🇷' },
      { name: 'Always Ready',   flag: '🇧🇴' },
      { name: 'Mirassol',       flag: '🇧🇷' },
    ],
  },
  {
    letter: 'H',
    teams: [
      { name: 'Ind. del Valle', flag: '🇪🇨' },
      { name: 'Libertad',       flag: '🇵🇾' },
      { name: 'R. Central',     flag: '🇦🇷' },
      { name: 'UCV FC',         flag: '🇻🇪' },
    ],
  },
]

// Calcula la tabla de posiciones a partir del array de partidos
export function calcStandings(matches) {
  const teamKeys = Object.keys(TEAMS)
  const stats = {}
  teamKeys.forEach((t) => {
    stats[t] = { pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0, pts: 0 }
  })

  matches.forEach((m) => {
    if (m.home_score === null || m.away_score === null) return
    const hs = parseInt(m.home_score)
    const as_ = parseInt(m.away_score)
    stats[m.home].pj++
    stats[m.away].pj++
    stats[m.home].gf += hs
    stats[m.home].gc += as_
    stats[m.away].gf += as_
    stats[m.away].gc += hs
    if (hs > as_) {
      stats[m.home].g++
      stats[m.home].pts += 3
      stats[m.away].p++
    } else if (hs < as_) {
      stats[m.away].g++
      stats[m.away].pts += 3
      stats[m.home].p++
    } else {
      stats[m.home].e++
      stats[m.home].pts++
      stats[m.away].e++
      stats[m.away].pts++
    }
  })

  return teamKeys
    .sort((a, b) => {
      const sa = stats[a]
      const sb = stats[b]
      if (sb.pts !== sa.pts) return sb.pts - sa.pts
      const dga = sa.gf - sa.gc
      const dgb = sb.gf - sb.gc
      if (dgb !== dga) return dgb - dga
      if (sb.gf !== sa.gf) return sb.gf - sa.gf
      return 0
    })
    .map((t) => ({ team: t, ...stats[t], dg: stats[t].gf - stats[t].gc }))
}
