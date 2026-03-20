import { useState } from 'react'
import { TEAMS } from '../lib/data'
import styles from './EditMatchModal.module.css'

export default function EditMatchModal({ match, onSave, onClose }) {
  const home = TEAMS[match.home]
  const away = TEAMS[match.away]

  const [homeScore, setHomeScore] = useState(
    match.home_score !== null ? String(match.home_score) : ''
  )
  const [awayScore, setAwayScore] = useState(
    match.away_score !== null ? String(match.away_score) : ''
  )
  const [matchTime, setMatchTime] = useState(match.match_time ?? '')
  const [matchDate, setMatchDate] = useState(match.match_date ?? '')
  const [status, setStatus] = useState(match.status ?? 'pending')
  const [saving, setSaving] = useState(false)

  async function handleSave() {
    setSaving(true)
    const fields = {
      home_score:  homeScore !== '' ? parseInt(homeScore) : null,
      away_score:  awayScore !== '' ? parseInt(awayScore) : null,
      match_time:  matchTime || null,
      match_date:  matchDate || null,
      status,
    }
    await onSave(match.id, fields)
    setSaving(false)
  }

  function handleClear() {
    setHomeScore('')
    setAwayScore('')
    setMatchTime('')
    setMatchDate('')
    setStatus('pending')
  }

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <span className={styles.modalTitle}>
            {home.flag} {home.name} <span className={styles.vs}>vs</span> {away.flag} {away.name}
          </span>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        <div className={styles.form}>
          {/* Fecha y hora */}
          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>Fecha</label>
              <input
                type="date"
                value={matchDate}
                onChange={(e) => setMatchDate(e.target.value)}
                className={styles.input}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Horario</label>
              <input
                type="time"
                value={matchTime}
                onChange={(e) => setMatchTime(e.target.value)}
                className={styles.input}
              />
            </div>
          </div>

          {/* Resultado */}
          <div className={styles.field}>
            <label className={styles.label}>Resultado</label>
            <div className={styles.scoreInputs}>
              <div className={styles.scoreTeam}>
                <span className={styles.scoreFlag}>{home.flag}</span>
                <span className={styles.scoreTeamName}>{home.name}</span>
                <input
                  type="number"
                  min="0"
                  max="30"
                  value={homeScore}
                  onChange={(e) => setHomeScore(e.target.value)}
                  className={styles.scoreInput}
                  placeholder="–"
                />
              </div>
              <span className={styles.scoreSep}>:</span>
              <div className={`${styles.scoreTeam} ${styles.scoreTeamAway}`}>
                <input
                  type="number"
                  min="0"
                  max="30"
                  value={awayScore}
                  onChange={(e) => setAwayScore(e.target.value)}
                  className={styles.scoreInput}
                  placeholder="–"
                />
                <span className={styles.scoreTeamName}>{away.name}</span>
                <span className={styles.scoreFlag}>{away.flag}</span>
              </div>
            </div>
          </div>

          {/* Estado */}
          <div className={styles.field}>
            <label className={styles.label}>Estado</label>
            <div className={styles.statusGroup}>
              {['pending', 'live', 'finished'].map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={`${styles.statusBtn} ${status === s ? styles.statusBtnActive : ''} ${styles[`status_${s}`]}`}
                >
                  { s === 'pending'  ? '⏳ Pendiente'  :
                    s === 'live'     ? '🔴 En Vivo'    :
                                       '✅ Finalizado' }
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <button className={styles.btnDanger} onClick={handleClear}>
            Limpiar
          </button>
          <button className={styles.btnSecondary} onClick={onClose}>
            Cancelar
          </button>
          <button className={styles.btnPrimary} onClick={handleSave} disabled={saving}>
            {saving ? 'Guardando…' : 'Guardar'}
          </button>
        </div>
      </div>
    </div>
  )
}
