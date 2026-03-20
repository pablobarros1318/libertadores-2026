import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useMatches() {
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Carga inicial
  useEffect(() => {
    async function fetchMatches() {
      const { data, error } = await supabase
        .from('matches')
        .select('*')
        .order('id')

      if (error) {
        setError(error.message)
      } else {
        setMatches(data)
      }
      setLoading(false)
    }

    fetchMatches()

    // Suscripción realtime — todos ven los cambios al instante
    const channel = supabase
      .channel('matches-changes')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'matches' },
        (payload) => {
          setMatches((prev) =>
            prev.map((m) => (m.id === payload.new.id ? payload.new : m))
          )
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  // Actualiza un partido en Supabase
  async function updateMatch(id, fields) {
    const { error } = await supabase
      .from('matches')
      .update(fields)
      .eq('id', id)

    if (error) throw new Error(error.message)
  }

  return { matches, loading, error, updateMatch }
}
