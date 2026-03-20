import { FECHA_LABELS } from '../lib/data'
import MatchCard from './MatchCard'
import styles from './FixtureView.module.css'

const FECHAS = [1, 2, 3, 4, 5, 6]

export default function FixtureView({ matches, isAdmin, onEdit }) {
  return (
    <div>
      <SectionTitle label="FIXTURE" badge="GRUPO E" />

      {FECHAS.map((f) => {
        const fechaMatches = matches.filter((m) => m.fecha === f)
        const info = FECHA_LABELS[f]
        return (
          <div key={f} className={styles.fechaGroup}>
            <div className={styles.fechaLabel}>
              <span>Fecha {f}</span>
              <span className={styles.fechaDot}>·</span>
              <span className={styles.fechaRange}>{info.range}</span>
              <span className={styles.fechaDot}>·</span>
              <span className={styles.fechaNote}>{info.note}</span>
              <div className={styles.fechaLine} />
            </div>
            {fechaMatches.length === 0 ? (
              <p className={styles.noMatches}>Sin partidos cargados</p>
            ) : (
              fechaMatches.map((m) => (
                <MatchCard
                  key={m.id}
                  match={m}
                  isAdmin={isAdmin}
                  onEdit={onEdit}
                />
              ))
            )}
          </div>
        )
      })}

      <div className={styles.dateStrip}>
        {Object.entries(FECHA_LABELS).map(([f, info]) => (
          <span key={f} className={styles.datePill}>📅 F{f}: {info.range}</span>
        ))}
      </div>
    </div>
  )
}

function SectionTitle({ label, badge }) {
  return (
    <div className={styles.sectionTitle}>
      <div className={styles.lineLeft} />
      <h2 className={styles.titleText}>{label}</h2>
      {badge && <span className={styles.badge}>{badge}</span>}
      <div className={styles.lineRight} />
    </div>
  )
}
