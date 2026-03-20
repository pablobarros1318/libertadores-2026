import { useState } from 'react'
import { useMatches } from './hooks/useMatches'
import { useAdmin } from './hooks/useAdmin'
import Header from './components/Header'
import NavTabs from './components/NavTabs'
import FixtureView from './components/FixtureView'
import StandingsView from './components/StandingsView'
import GroupsView from './components/GroupsView'
import EditMatchModal from './components/EditMatchModal'
import Toast from './components/Toast'
import styles from './App.module.css'

const TABS = [
  { id: 'fixture',    label: 'Grupo E' },
  { id: 'standings',  label: 'Posiciones' },
  { id: 'groups',     label: 'Todos los Grupos' },
]

export default function App() {
  const [activeTab, setActiveTab] = useState('fixture')
  const [editingMatch, setEditingMatch] = useState(null)
  const [toast, setToast] = useState(null)

  const { matches, loading, error, updateMatch } = useMatches()
  const { isAdmin, login, logout } = useAdmin()

  function showToast(msg) {
    setToast(msg)
    setTimeout(() => setToast(null), 2800)
  }

  async function handleSave(id, fields) {
    try {
      await updateMatch(id, fields)
      setEditingMatch(null)
      showToast('✓ Partido actualizado')
    } catch (e) {
      showToast('Error: ' + e.message)
    }
  }

  if (error) {
    return (
      <div className={styles.errorScreen}>
        <p>Error al conectar con Supabase:</p>
        <code>{error}</code>
        <p>Revisá las variables de entorno.</p>
      </div>
    )
  }

  return (
    <div className={styles.app}>
      <Header isAdmin={isAdmin} onLogin={login} onLogout={logout} />
      <NavTabs tabs={TABS} active={activeTab} onChange={setActiveTab} />

      <main className={styles.main}>
        {loading ? (
          <div className={styles.loading}>
            <div className={styles.spinner} />
            <p>Cargando fixture…</p>
          </div>
        ) : (
          <>
            {activeTab === 'fixture' && (
              <FixtureView
                matches={matches}
                isAdmin={isAdmin}
                onEdit={setEditingMatch}
              />
            )}
            {activeTab === 'standings' && (
              <StandingsView matches={matches} />
            )}
            {activeTab === 'groups' && <GroupsView />}
          </>
        )}
      </main>

      {editingMatch && (
        <EditMatchModal
          match={editingMatch}
          onSave={handleSave}
          onClose={() => setEditingMatch(null)}
        />
      )}

      {toast && <Toast message={toast} />}
    </div>
  )
}
