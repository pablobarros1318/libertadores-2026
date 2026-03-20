import { TEAMS } from '../lib/data'
import styles from './MatchCard.module.css'

export default function MatchCard({ match, isAdmin, onEdit }) {
  const home = TEAMS[match.home]
  const away = TEAMS[match.away]
  const isPlatense = match.home === 'platense' || match.away === 'platense'
  const hasScore = match.home_score !== null && match.away_score !== null

  const statusLabel = {
    pending:  { text: 'PENDIENTE', cls: styles.pending },
    live:     { text: '● EN VIVO',  cls: styles.live },
    finished: { text: 'FINALIZADO', cls: styles.finished },
  }[match.status] ?? { text: 'PENDIENTE', cls: styles.pending }

  function handleClick() {
    if (isAdmin) onEdit(match)
  }

  return (
    <div className={`${styles.card} ${isPlatense ? styles.featured : ''}`}>
      {isPlatense && <div className={styles.featuredBadge}>🦑 PLATENSE</div>}

      <div className={`${styles.body} ${isAdmin ? styles.clickable : ''}`} onClick={handleClick}>
        {/* Local */}
        <div className={styles.teamSide}>
          <span className={styles.flag}>
            {home.logo?
            <img src={home.logo} alt={home.name} className={styles.teamLogo} />
            : <span className={styles.flag}>{home.flag}</span>}
          </span>
          <div>
            <div className={styles.teamName}>{home.name}</div>
            <div className={styles.teamCountry}>{home.country}</div>
          </div>
        </div>

        {/* Centro */}
        <div className={styles.center}>
          <div className={styles.scoreRow}>
            <div className={`${styles.scoreBox} ${hasScore ? styles.scoreBoxFilled : ''}`}>
              {hasScore ? match.home_score : '–'}
            </div>
            <div className={styles.scoreSep}>:</div>
            <div className={`${styles.scoreBox} ${hasScore ? styles.scoreBoxFilled : ''}`}>
              {hasScore ? match.away_score : '–'}
            </div>
          </div>
          <div className={styles.time}>
            {match.match_time
              ? `🕐 ${match.match_time}${match.match_date ? ` · ${formatDate(match.match_date)}` : ''}`
              : isAdmin ? 'Sin horario' : 'Horario a Confirmar'}
          </div>
          <span className={`${styles.status} ${statusLabel.cls}`}>{statusLabel.text}</span>
        </div>

        {/* Visitante */}
        <div className={`${styles.teamSide} ${styles.away}`}>
          {away.logo?
            <img src={away.logo} alt={away.name} className={styles.teamLogo} />
            : <span className={styles.flag}>{away.flag}</span>
          }
          <div>
            <div className={styles.teamName}>{away.name}</div>
            <div className={styles.teamCountry}>{away.country}</div>
          </div>
        </div>
      </div>

      {isAdmin && (
        <div className={styles.adminHint}>Clic para editar</div>
      )}
    </div>
  )
}

function formatDate(dateStr) {
  // dateStr: "2026-04-08" → "8 abr"
  const d = new Date(dateStr + 'T12:00:00')
  return d.toLocaleDateString('es-AR', { day: 'numeric', month: 'short' })
}
