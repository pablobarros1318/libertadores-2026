import styles from './NavTabs.module.css'

export default function NavTabs({ tabs, active, onChange }) {
  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tab} ${active === tab.id ? styles.active : ''}`}
            onClick={() => onChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  )
}
