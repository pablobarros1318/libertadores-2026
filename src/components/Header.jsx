import { useState } from 'react'
import styles from './Header.module.css'

export default function Header({ isAdmin, onLogin, onLogout }) {
  const [showLogin, setShowLogin] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  function handleLogin(e) {
    e.preventDefault()
    const ok = onLogin(password)
    if (ok) {
      setShowLogin(false)
      setPassword('')
      setError(false)
    } else {
      setError(true)
    }
  }

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <img
            src="/logo-filial.png"
            alt="Filial Horacio Barros"
            className={styles.logo}
          />
          <div className={styles.titles}>
            <h1 className={styles.h1}>Copa Libertadores 2026</h1>
            <p className={styles.sub}>Filial Horacio Barros · Costa Atlántica</p>
          </div>
        </div>

        <div className={styles.right}>
          <span className={styles.seasonBadge}>2026</span>
          {isAdmin ? (
            <button className={styles.adminBtn} onClick={onLogout} title="Cerrar sesión admin">
              🔓 Admin
            </button>
          ) : (
            <button
              className={styles.adminBtn}
              onClick={() => setShowLogin((v) => !v)}
              title="Iniciar sesión admin"
            >
              🔒
            </button>
          )}
        </div>
      </div>

      {showLogin && !isAdmin && (
        <div className={styles.loginBar}>
          <form className={styles.loginForm} onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Contraseña admin"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false) }}
              className={`${styles.loginInput} ${error ? styles.loginInputError : ''}`}
              autoFocus
            />
            <button type="submit" className={styles.loginSubmit}>Entrar</button>
            <button type="button" className={styles.loginCancel} onClick={() => setShowLogin(false)}>✕</button>
          </form>
          {error && <span className={styles.loginError}>Contraseña incorrecta</span>}
        </div>
      )}
    </header>
  )
}
