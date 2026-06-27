'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn, Sparkles } from 'lucide-react'
import { portfolio, type PortfolioItem } from '@/lib/data'
import { cn } from '@/lib/utils'

const filters = ['All', 'Makeup', 'Lashes', 'Brows', 'Nails', 'Bridal', 'Skin Care'] as const
type Filter = typeof filters[number]

export function Portfolio() {
  const [active, setActive] = React.useState<Filter>('All')
  const [lightbox, setLightbox] = React.useState<PortfolioItem | null>(null)

  const visible = React.useMemo(() => {
    if (active === 'All') return portfolio
    return portfolio.filter((p) => p.category === active)
  }, [active])

  // Lock scroll when lightbox open
  React.useEffect(() => {
    if (lightbox) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [lightbox])

  // Keyboard nav
  React.useEffect(() => {
    if (!lightbox) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowRight') {
        const idx = visible.findIndex((p) => p.id === lightbox.id)
        setLightbox(visible[(idx + 1) % visible.length])
      }
      if (e.key === 'ArrowLeft') {
        const idx = visible.findIndex((p) => p.id === lightbox.id)
        setLightbox(visible[(idx - 1 + visible.length) % visible.length])
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox, visible])

  return (
    <section id="portfolio" className="relative py-24 sm:py-32 bg-cream">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-rosegold mb-4 font-sans-lux">
            <Sparkles className="h-3 w-3" />
            <span>The Portfolio</span>
          </div>
          <h2 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl text-foreground leading-[1.05]">
            A gallery of <span className="italic luxury-gradient-text">faces we love.</span>
          </h2>
          <p className="mt-5 text-base text-muted-foreground font-light">
            Sixteen of our favourite moments — bridal, editorial, lashes, brows, nails, and skin. Filter by category, click any image to view full size.
          </p>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={cn(
                'px-4 py-2 rounded-full text-xs uppercase tracking-[0.18em] font-sans-lux transition-all duration-300 border',
                active === f
                  ? 'bg-charcoal text-ivory border-charcoal shadow-lg'
                  : 'bg-transparent text-foreground/70 border-border hover:border-rosegold hover:text-foreground'
              )}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Masonry */}
        <div className="masonry">
          {visible.map((item, i) => (
            <motion.button
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              onClick={() => setLightbox(item)}
              className="group relative w-full rounded-xl overflow-hidden bg-background border border-border block text-left"
            >
              <img
                src={item.image}
                alt={`${item.category} — ${item.title}`}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <div className="text-[10px] uppercase tracking-[0.24em] text-rosegold font-sans-lux">{item.category}</div>
                <div className="text-white font-serif-display text-lg mt-0.5 flex items-center justify-between">
                  {item.title}
                  <ZoomIn className="h-4 w-4" />
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-charcoal/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-6 right-6 h-11 w-11 rounded-full bg-white/10 text-white hover:bg-rosegold transition-colors flex items-center justify-center"
              onClick={() => setLightbox(null)}
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <motion.div
              key={lightbox.id}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl max-h-[85vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightbox.image}
                alt={`${lightbox.category} — ${lightbox.title}`}
                className="w-full h-full object-contain rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                <div className="text-[10px] uppercase tracking-[0.28em] text-rosegold font-sans-lux">{lightbox.category}</div>
                <div className="text-white font-serif-display text-2xl mt-1">{lightbox.title}</div>
                <div className="text-white/50 text-xs mt-2">Use ← → arrows to navigate · Esc to close</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
