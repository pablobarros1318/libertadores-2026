import { calcStandings, TEAMS } from '../lib/data'
import styles from './StandingsView.module.css'

export default function StandingsView({ matches }) {
  const standings = calcStandings(matches)

  return (
    <div>
      <div className={styles.sectionTitle}>
        <div className={styles.line} />
        <h2 className={styles.titleText}>TABLA</h2>
        <span className={styles.badge}>GRUPO E</span>
        <div className={styles.lineR} />
      </div>

      <div className={styles.legend}>
        <span className={styles.legendItem}>
          <span className={styles.dot} style={{ background: 'var(--green)' }} />
          Clasificado 1° — Octavos directos
        </span>
        <span className={styles.legendItem}>
          <span className={styles.dot} style={{ background: 'var(--gold)' }} />
          Clasificado 2° — Play-In
        </span>
      </div>

      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <span className={styles.colPos}>#</span>
          <span className={styles.colTeam}>EQUIPO</span>
          <span className={styles.colNum}>PJ</span>
          <span className={`${styles.colNum} ${styles.pts}`}>PTS</span>
          <span className={styles.colNum}>G</span>
          <span className={styles.colNum}>E</span>
          <span className={styles.colNum}>P</span>
          <span className={styles.colNum}>GF</span>
          <span className={styles.colNum}>GC</span>
          <span className={styles.colNum}>DG</span>
        </div>

        {standings.map((s, i) => {
          const pos = i + 1
          const t = TEAMS[s.team]
          const rowClass = [
            styles.tableRow,
            pos === 1 ? styles.q1 : '',
            pos === 2 ? styles.q2 : '',
            s.team === 'platense' ? styles.platenseRow : '',
          ].join(' ')

          return (
            <div key={s.team} className={rowClass}>
              <span className={styles.colPos}>{pos}</span>
              <span className={styles.colTeam}>
                {t.logo
                  ? <img src={t.logo} alt={t.name} className={styles.teamLogo} />
                  : <span>{t.flag}</span>
                }
                <span className={styles.teamName}>{t.name}</span>
              </span>
              <span className={styles.colNum}>{s.pj}</span>
              <span className={`${styles.colNum} ${styles.pts}`}>{s.pts}</span>
              <span className={styles.colNum}>{s.g}</span>
              <span className={styles.colNum}>{s.e}</span>
              <span className={styles.colNum}>{s.p}</span>
              <span className={styles.colNum}>{s.gf}</span>
              <span className={styles.colNum}>{s.gc}</span>
              <span className={styles.colNum}>{s.dg > 0 ? `+${s.dg}` : s.dg}</span>
            </div>
          )
        })}
      </div>

      <p className={styles.note}>
        La tabla se actualiza automáticamente con cada resultado cargado en el Fixture.
      </p>
    </div>
  )
}
