import { useState, useCallback } from 'react'

const STORAGE_KEY = 'libertadores_admin'
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD

export function useAdmin() {
  const [isAdmin, setIsAdmin] = useState(() => {
    // Persiste la sesión durante la misma visita
    return sessionStorage.getItem(STORAGE_KEY) === 'true'
  })

  const login = useCallback((password) => {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, 'true')
      setIsAdmin(true)
      return true
    }
    return false
  }, [])

  const logout = useCallback(() => {
    sessionStorage.removeItem(STORAGE_KEY)
    setIsAdmin(false)
  }, [])

  return { isAdmin, login, logout }
}
