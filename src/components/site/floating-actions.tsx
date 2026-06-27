'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, ArrowUp, MessageCircle } from 'lucide-react'
import { business } from '@/lib/data'
import { openWhatsApp } from '@/lib/utils'

export function FloatingActions() {
  const [showTop, setShowTop] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed right-4 sm:right-6 bottom-6 z-40 flex flex-col gap-3">
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            className="h-11 w-11 rounded-full bg-background border border-border shadow-lg flex items-center justify-center text-foreground hover:bg-charcoal hover:text-ivory transition-colors"
          >
            <ArrowUp className="h-4 w-4" />
          </motion.button>
        )}
      </AnimatePresence>

      <a
        href={`tel:${business.phone}`}
        aria-label="Call us"
        className="h-13 w-13 p-3.5 rounded-full bg-charcoal text-ivory shadow-xl flex items-center justify-center hover:bg-foreground transition-colors animate-pulse-glow"
      >
        <Phone className="h-5 w-5" />
      </a>

      <button
        onClick={() => openWhatsApp(`Hello Juiced Beautician, I'd like to enquire about your services.`)}
        aria-label="WhatsApp us"
        className="h-14 w-14 rounded-full bg-[#25D366] text-white shadow-xl flex items-center justify-center hover:bg-[#1ebe5d] transition-colors"
      >
        <MessageCircle className="h-6 w-6 fill-white/20" />
      </button>
    </div>
  )
}
