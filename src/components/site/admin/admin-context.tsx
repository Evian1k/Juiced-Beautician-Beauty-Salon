'use client'

import * as React from 'react'

type AdminState = {
  isLoginOpen: boolean
  openLogin: () => void
  closeLogin: () => void
  isAuthed: boolean
  setAuthed: (v: boolean) => void
  isDashboardOpen: boolean
  openDashboard: () => void
  closeDashboard: () => void
}

const AdminContext = React.createContext<AdminState | undefined>(undefined)

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isLoginOpen, setLoginOpen] = React.useState(false)
  const [isAuthed, setAuthed] = React.useState(false)
  const [isDashboardOpen, setDashboardOpen] = React.useState(false)

  React.useEffect(() => {
    fetch('/api/admin/stats', { credentials: 'include' })
      .then((r) => { if (r.ok) setAuthed(true) })
      .catch(() => {})
  }, [])

  const openLogin = React.useCallback(() => setLoginOpen(true), [])
  const closeLogin = React.useCallback(() => setLoginOpen(false), [])

  const openDashboard = React.useCallback(() => {
    if (isAuthed) {
      setDashboardOpen(true)
      if (typeof document !== 'undefined') document.body.style.overflow = 'hidden'
    } else {
      setLoginOpen(true)
    }
  }, [isAuthed])

  const closeDashboard = React.useCallback(() => {
    setDashboardOpen(false)
    if (typeof document !== 'undefined') document.body.style.overflow = ''
  }, [])

  return (
    <AdminContext.Provider
      value={{
        isLoginOpen, openLogin, closeLogin,
        isAuthed, setAuthed,
        isDashboardOpen, openDashboard, closeDashboard,
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const ctx = React.useContext(AdminContext)
  if (!ctx) throw new Error('useAdmin must be used inside AdminProvider')
  return ctx
}
