'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Lock, Sparkles, ArrowRight } from 'lucide-react'
import { Logo } from '@/components/site/logo'
import { useAdmin } from '@/components/site/admin/admin-context'
import { toast } from 'sonner'

export function AdminLoginModal() {
  const { isLoginOpen, closeLogin, setAuthed, openDashboard } = useAdmin()
  const [pin, setPin] = React.useState('')
  const [submitting, setSubmitting] = React.useState(false)

  React.useEffect(() => {
    if (!isLoginOpen) {
      setPin('')
      setSubmitting(false)
    } else {
      if (typeof document !== 'undefined') document.body.style.overflow = 'hidden'
    }
    return () => {
      if (!isLoginOpen && typeof document !== 'undefined') document.body.style.overflow = ''
    }
  }, [isLoginOpen])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!pin) {
      toast.error('Please enter the admin PIN.')
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin }),
      })
      const data = await res.json()
      if (!res.ok) {
        toast.error(data.error || 'Login failed.')
        return
      }
      setAuthed(true)
      closeLogin()
      toast.success('Welcome back. Opening dashboard...')
      setTimeout(() => openDashboard(), 200)
    } catch (err) {
      toast.error('Network error. Try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isLoginOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-charcoal/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={closeLogin}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 280 }}
            className="relative bg-background w-full max-w-md rounded-3xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Decorative header */}
            <div className="relative bg-gradient-to-br from-charcoal to-foreground p-8 text-center">
              <button
                onClick={closeLogin}
                className="absolute top-4 right-4 h-9 w-9 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="flex justify-center mb-4">
                <Logo variant="stacked" showText />
              </div>
              <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.28em] text-rosegold font-sans-lux">
                <Lock className="h-3 w-3" />
                <span>Admin Access</span>
              </div>
              <p className="mt-2 text-xs text-white/60 font-sans-lux font-light">
                Restricted area · Authorised personnel only
              </p>
            </div>

            <form onSubmit={submit} className="p-8">
              <label className="block mb-4">
                <span className="block text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-sans-lux mb-2">
                  Enter PIN
                </span>
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  autoFocus
                  placeholder="••••••••"
                  className="w-full bg-cream/40 border border-border rounded-lg px-4 py-3.5 text-base text-foreground focus:outline-none focus:border-rosegold transition-colors tracking-[0.3em] text-center"
                />
              </label>

              <button
                type="submit"
                disabled={submitting}
                className="w-full btn-luxury-primary inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs uppercase tracking-[0.2em] font-sans-lux disabled:opacity-60"
              >
                {submitting ? 'Verifying...' : <>Unlock <ArrowRight className="h-3.5 w-3.5" /></>}
              </button>

              <div className="mt-5 pt-5 border-t border-border text-center">
                <p className="text-[10px] text-muted-foreground font-sans-lux leading-relaxed">
                  Default PIN: <code className="text-rosegold font-mono">juiced2026</code><br />
                  Set <code className="font-mono">ADMIN_PIN</code> env var in production to change.
                </p>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
