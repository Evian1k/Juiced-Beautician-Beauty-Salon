'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Moon, Sun, Phone, Calendar } from 'lucide-react'
import { useTheme } from 'next-themes'
import { TapAwareLogo } from '@/components/site/admin/tap-aware-logo'
import { navLinks, business } from '@/lib/data'
import { useBooking } from '@/components/site/booking-context'
import { cn, openWhatsApp } from '@/lib/utils'
import { ScrollProgress } from '@/components/site/scroll-progress'
import { MessageCircle } from 'lucide-react'

export function Header() {
  const [scrolled, setScrolled] = React.useState(false)
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const { theme, setTheme } = useTheme()
  const { open: openBooking } = useBooking()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href: string) => {
    setMobileOpen(false)
    if (href.startsWith('#')) {
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <>
      <ScrollProgress />
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-background/85 backdrop-blur-xl border-b border-border/60 py-3'
            : 'bg-transparent py-5'
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <TapAwareLogo onNavigate={() => handleNav('#home')} tone={scrolled ? 'auto' : 'light'} />

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNav(link.href) }}
                className={`relative px-4 py-2 text-sm font-sans-lux tracking-wide transition-colors group ${scrolled ? 'text-foreground/80 hover:text-foreground' : 'text-white/90 hover:text-white'}`}
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-0 bg-rosegold transition-all duration-300 group-hover:w-3/4" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
              className={`hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors ${scrolled ? 'border-border hover:border-rosegold hover:text-rosegold' : 'border-white/30 text-white hover:border-rosegold hover:text-rosegold'}`}
            >
              {mounted && theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            <a
              href={`tel:${business.phone}`}
              aria-label="Call us"
              className={`hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors ${scrolled ? 'border-border hover:border-rosegold hover:text-rosegold' : 'border-white/30 text-white hover:border-rosegold hover:text-rosegold'}`}
            >
              <Phone className="h-4 w-4" />
            </a>

            <button
              onClick={() => openBooking()}
              className="hidden sm:inline-flex btn-luxury-primary items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-[0.18em] font-sans-lux rounded-full"
            >
              <Calendar className="h-3.5 w-3.5" />
              <span>Book Now</span>
            </button>

            <button
              onClick={() => setMobileOpen(true)}
              className={`lg:hidden h-10 w-10 inline-flex items-center justify-center rounded-full border transition-colors ${scrolled ? 'border-border' : 'border-white/30 text-white'}`}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[60] backdrop-blur-md" style={{ backgroundColor: 'rgba(26, 20, 19, 0.65)' }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 280 }}
              className="fixed top-0 right-0 bottom-0 z-[70] w-full max-w-sm bg-background shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-border">
                <TapAwareLogo />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="h-10 w-10 inline-flex items-center justify-center rounded-full border border-border"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto p-6 flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={(e) => { e.preventDefault(); handleNav(link.href) }}
                      className="block py-3 font-serif-display text-2xl text-foreground hover:text-rosegold transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="p-6 border-t border-border flex flex-col gap-3">
                <button
                  onClick={() => { setMobileOpen(false); openBooking() }}
                  className="btn-luxury-primary px-5 py-3.5 text-xs uppercase tracking-[0.18em] font-sans-lux rounded-full inline-flex items-center justify-center gap-2"
                >
                  <Calendar className="h-3.5 w-3.5" /> Book Appointment
                </button>
                <div className="flex gap-2">
                  <a
                    href={`tel:${business.phone}`}
                    className="flex-1 btn-luxury-outline px-4 py-3 text-xs uppercase tracking-[0.18em] font-sans-lux rounded-full inline-flex items-center justify-center gap-2"
                  >
                    <Phone className="h-3.5 w-3.5" /> Call
                  </a>
                  <button
                    onClick={() => openWhatsApp(`Hello Juiced Beautician, I'd like to enquire about your services.`)}
                    className="flex-1 px-4 py-3 text-xs uppercase tracking-[0.18em] font-sans-lux rounded-full inline-flex items-center justify-center gap-2 bg-[#25D366] text-white hover:bg-[#1ebe5d] transition-colors"
                  >
                    <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
                  </button>
                </div>
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="mt-1 px-4 py-2 text-xs uppercase tracking-[0.18em] font-sans-lux rounded-full inline-flex items-center justify-center gap-2 border border-border"
                >
                  {mounted && theme === 'dark' ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
                  {mounted && theme === 'dark' ? 'Light mode' : 'Dark mode'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
