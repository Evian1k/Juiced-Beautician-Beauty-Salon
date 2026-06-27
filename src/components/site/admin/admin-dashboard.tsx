'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, MessageSquare, Users, BarChart3, LogOut, ExternalLink } from 'lucide-react'
import { Logo } from '@/components/site/logo'
import { useAdmin } from '@/components/site/admin/admin-context'
import { BookingsPanel } from '@/components/site/admin/panels/bookings-panel'
import { MessagesPanel } from '@/components/site/admin/panels/messages-panel'
import { SubscribersPanel } from '@/components/site/admin/panels/subscribers-panel'
import { StatsPanel } from '@/components/site/admin/panels/stats-panel'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

type Tab = 'stats' | 'bookings' | 'messages' | 'subscribers'

const TABS: { id: Tab; label: string; icon: typeof Calendar }[] = [
  { id: 'stats', label: 'Overview', icon: BarChart3 },
  { id: 'bookings', label: 'Bookings', icon: Calendar },
  { id: 'messages', label: 'Messages', icon: MessageSquare },
  { id: 'subscribers', label: 'Subscribers', icon: Users },
]

export function AdminDashboard() {
  const { isDashboardOpen, closeDashboard, setAuthed } = useAdmin()
  const [tab, setTab] = React.useState<Tab>('stats')

  const logout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' })
      setAuthed(false)
      closeDashboard()
      toast.success('Logged out.')
    } catch {
      toast.error('Could not log out.')
    }
  }

  return (
    <AnimatePresence>
      {isDashboardOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] bg-background flex flex-col"
        >
          {/* Top bar */}
          <header className="border-b border-border bg-cream/50 backdrop-blur">
            <div className="px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 sm:gap-5">
                <Logo />
                <div className="hidden sm:block border-l border-border pl-5">
                  <div className="text-[10px] uppercase tracking-[0.28em] text-rosegold font-sans-lux">Admin Dashboard</div>
                  <div className="font-serif-display text-sm text-foreground">Juiced Beautician · Nairobi</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => { closeDashboard() }}
                  className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-border text-[10px] uppercase tracking-[0.16em] font-sans-lux hover:bg-background transition-colors"
                >
                  <ExternalLink className="h-3 w-3" /> View Site
                </button>
                <button
                  onClick={logout}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-charcoal text-ivory text-[10px] uppercase tracking-[0.16em] font-sans-lux hover:bg-destructive transition-colors"
                >
                  <LogOut className="h-3 w-3" /> Logout
                </button>
                <button
                  onClick={closeDashboard}
                  className="sm:hidden h-9 w-9 rounded-full border border-border flex items-center justify-center"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="px-4 sm:px-6 flex gap-1 overflow-x-auto">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={cn(
                    'relative px-4 sm:px-5 py-3 text-xs uppercase tracking-[0.16em] font-sans-lux transition-colors whitespace-nowrap inline-flex items-center gap-1.5',
                    tab === t.id ? 'text-rosegold' : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  <t.icon className="h-3.5 w-3.5" />
                  {t.label}
                  {tab === t.id && (
                    <motion.span
                      layoutId="admin-tab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-rosegold"
                    />
                  )}
                </button>
              ))}
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 overflow-y-auto">
            <div className="container mx-auto px-4 sm:px-6 py-6 max-w-5xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={tab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {tab === 'stats' && <StatsPanel />}
                  {tab === 'bookings' && <BookingsPanel />}
                  {tab === 'messages' && <MessagesPanel />}
                  {tab === 'subscribers' && <SubscribersPanel />}
                </motion.div>
              </AnimatePresence>
            </div>
          </main>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
