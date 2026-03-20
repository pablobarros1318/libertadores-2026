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
  4: { range: '5 – 7 de Mayo',       note: 'Local vs Peñarol' },
  5: { range: '19 – 21 de Mayo',     note: 'Visita vs Ind. Santa Fe (Bogotá)' },
  6: { range: '26 – 28 de Mayo',     note: 'Visita vs Corinthians (São Paulo)' },
}

export const ALL_GROUPS = [
  {
    letter: 'A',
    teams: [
      { name: 'Flamengo',       flag: '🇧🇷', logo: '/escudos/flamengo.png' },
      { name: 'Estudiantes',    flag: '🇦🇷', logo: '/escudos/estudiantes.png' },
      { name: 'Cusco',          flag: '🇵🇪', logo: '/escudos/cusco.png' },
      { name: 'Ind. Medellín',  flag: '🇨🇴', logo: '/escudos/medellin.png' },
    ],
  },
  {
    letter: 'B',
    teams: [
      { name: 'Nacional',       flag: '🇺🇾',logo: '/escudos/nacional.png' },
      { name: 'Universitario',  flag: '🇵🇪', logo: '/escudos/universitario.png' },
      { name: 'Coquimbo Unido', flag: '🇨🇱', logo: '/escudos/coquimbo.png' },
      { name: 'D. Tolima',      flag: '🇨🇴', logo: '/escudos/tolima.png' },
    ],
  },
  {
    letter: 'C',
    teams: [
      { name: 'Fluminense',     flag: '🇧🇷', logo: '/escudos/fluminense.png' },
      { name: 'Bolivar',        flag: '🇧🇴', logo: '/escudos/bolivar.png' },
      { name: 'D. La Guaira',   flag: '🇻🇪', logo: '/escudos/laguaira.png' },
      { name: 'Ind. Rivadavia', flag: '🇦🇷', logo: '/escudos/rivadavia.png' },
    ],
  },
  {
    letter: 'D',
    teams: [
      { name: 'Boca Juniors',   flag: '🇦🇷', logo: '/escudos/boca.png' },
      { name: 'Cruzeiro',       flag: '🇧🇷', logo: '/escudos/cruzeiro.png' },
      { name: 'U. Católica',    flag: '🇨🇱', logo: '/escudos/catolica.png' },
      { name: 'Barcelona SC',   flag: '🇪🇨', logo: '/escudos/barcelona.png' },
    ],
  },
  {
    letter: 'E',
    isOurGroup: true,
    teams: [
      { name: 'Peñarol',        flag: '🇺🇾', logo: '/escudos/penarol.png' },
      { name: 'Corinthians',    flag: '🇧🇷', logo: '/escudos/corinthians.png' },
      { name: 'Ind. Santa Fe',  flag: '🇨🇴', logo: '/escudos/santafe.png' },
      { name: 'Platense',       flag: '🇦🇷', logo: '/escudos/platense.png',isPlatense: true },
    ],
  },
  {
    letter: 'F',
    teams: [
      { name: 'Palmeiras',      flag: '🇧🇷', logo: '/escudos/palmeiras.png' },
      { name: 'Cerro Porteño',  flag: '🇵🇾', logo: '/escudos/cerro.png' },
      { name: 'Junior',         flag: '🇨🇴', logo: '/escudos/junior.png' },
      { name: 'Sporting Cristal', flag: '🇵🇪', logo: '/escudos/cristal.png' },
    ],
  },
  {
    letter: 'G',
    teams: [
      { name: 'Liga de Quito',  flag: '🇪🇨', logo: '/escudos/quito.png' },
      { name: 'Lanús',          flag: '🇦🇷', logo: '/escudos/lanus.png' },
      { name: 'Always Ready',   flag: '🇧🇴', logo: '/escudos/alwaysready.png' },
      { name: 'Mirassol',       flag: '🇧🇷', logo: '/escudos/mirassol.png' },
    ],
  },
  {
    letter: 'H',
    teams: [
      { name: 'Ind. del Valle', flag: '🇪🇨', logo: '/escudos/delvalle.png' },
      { name: 'Libertad',       flag: '🇵🇾', logo: '/escudos/libertad.png' },
      { name: 'R. Central',     flag: '🇦🇷', logo: '/escudos/central.png' },
      { name: 'UCV FC',         flag: '🇻🇪', logo: '/escudos/ucv.png' },
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
