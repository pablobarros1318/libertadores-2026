import { ALL_GROUPS } from '../lib/data'
import styles from './GroupsView.module.css'

export default function GroupsView() {
  return (
    <div>
      <div className={styles.sectionTitle}>
        <div className={styles.line} />
        <h2 className={styles.titleText}>TODOS LOS GRUPOS</h2>
        <div className={styles.lineR} />
      </div>

      <p className={styles.subtitle}>
        Panorama general · Los 2 primeros de cada grupo clasifican a Octavos de Final
      </p>

      <div className={styles.grid}>
        {ALL_GROUPS.map((g) => (
          <div key={g.letter} className={`${styles.card} ${g.isOurGroup ? styles.ourGroup : ''}`}>
            <div className={styles.cardHeader}>
              <span className={styles.letter}>GRUPO {g.letter}</span>
              {g.isOurGroup && <span className={styles.ourBadge}>TU GRUPO ⭐</span>}
            </div>
            <div className={styles.teamsList}>
              {g.teams.map((t) => (
                <div key={t.name} className={`${styles.teamItem} ${t.isPlatense ? styles.platense : ''}`}>
                  <span>{t.flag}</span>
                  <span>{t.name}</span>
                  {t.isPlatense && <span className={styles.squid}>🦑</span>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.knockoutInfo}>
        <div className={styles.sectionTitle} style={{ marginBottom: 14 }}>
          <div className={styles.line} />
          <h3 className={styles.koTitle}>LLAVE ELIMINATORIA</h3>
          <div className={styles.lineR} />
        </div>
        <div className={styles.koGrid}>
          <div className={styles.koPill}>📋 Octavos — ida: 11–13 ago · vuelta: 18–20 ago</div>
          <div className={styles.koPill}>📋 Cuartos — ida: 8–10 sep · vuelta: 15–17 sep</div>
          <div className={styles.koPill}>📋 Semis — ida: 13–14 oct · vuelta: 20–21 oct</div>
          <div className={styles.koPill}>🏆 Final — 28 nov · Montevideo 🇺🇾</div>
        </div>
      </div>
    </div>
  )
}
