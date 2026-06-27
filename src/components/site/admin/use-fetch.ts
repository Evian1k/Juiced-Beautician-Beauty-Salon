'use client'

import * as React from 'react'

export type Booking = {
  id: string
  service: string
  specialist: string
  date: string
  time: string
  name: string
  phone: string
  email: string
  notes: string | null
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  createdAt: string
}

export type Message = {
  id: string
  name: string
  email: string
  phone: string | null
  subject: string | null
  message: string
  createdAt: string
}

export type Subscriber = {
  id: string
  email: string
  name: string | null
  createdAt: string
}

export type Stats = {
  counts: { bookings: number; messages: number; subscribers: number; pendingBookings: number }
  trend: { date: string; bookings: number; messages: number }[]
  topServices: { service: string; count: number }[]
}

export function useFetch<T>(url: string) {
  const [data, setData] = React.useState<T | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [nonce, setNonce] = React.useState(0)
  const refresh = React.useCallback(() => setNonce((n) => n + 1), [])

  React.useEffect(() => {
    let cancelled = false
    setLoading(true)
    fetch(url, { credentials: 'include' })
      .then(async (r) => {
        if (!r.ok) {
          const txt = await r.json().catch(() => ({}))
          throw new Error(txt.error || `HTTP ${r.status}`)
        }
        return r.json()
      })
      .then((d) => { if (!cancelled) { setData(d); setError(null) } })
      .catch((e) => { if (!cancelled) setError(e.message) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [url, nonce])

  return { data, loading, error, refresh }
}
