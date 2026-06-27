'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Instagram, Sparkles, Star, ArrowUpRight } from 'lucide-react'
import { specialists } from '@/lib/data'
import { useBooking } from '@/components/site/booking-context'

export function Specialists() {
  const { open: openBooking } = useBooking()

  return (
    <section id="specialists" className="relative py-24 sm:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-rosegold mb-4 font-sans-lux">
            <Sparkles className="h-3 w-3" />
            <span>The Artists</span>
          </div>
          <h2 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl text-foreground leading-[1.05]">
            Hands you can <span className="italic luxury-gradient-text">trust.</span>
          </h2>
          <p className="mt-5 text-base text-muted-foreground font-light">
            Six master artists. Decades of combined training across London, Dubai, Seoul, Istanbul, Bali, and Cape Town. Each one chosen for their craft, their calm, and their care.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {specialists.map((s, i) => (
            <motion.article
              key={s.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group relative bg-background rounded-2xl overflow-hidden border border-border hover-lift"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={s.image}
                  alt={`${s.name}, ${s.role} at Juiced Beautician`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-transparent" />

                <a
                  href={s.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-4 right-4 h-10 w-10 rounded-full bg-background/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-rosegold transition-colors"
                  aria-label={`${s.name} on Instagram`}
                >
                  <Instagram className="h-4 w-4" />
                </a>

                <div className="absolute top-4 left-4 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-background/20 backdrop-blur-md text-white text-[10px] uppercase tracking-[0.18em] font-sans-lux">
                  <Star className="h-3 w-3 fill-gold text-gold" />
                  {s.rating.toFixed(1)}
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="text-[10px] uppercase tracking-[0.24em] text-white/70 font-sans-lux">{s.experience}+ years</div>
                  <h3 className="font-serif-display text-2xl mt-1 leading-tight">{s.name}</h3>
                  <div className="text-sm text-rosegold font-sans-lux mt-0.5">{s.role}</div>
                </div>
              </div>

              <div className="p-6">
                <p className="text-sm text-muted-foreground leading-relaxed font-light line-clamp-4">{s.bio}</p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {s.specialties.map((sp) => (
                    <span key={sp} className="px-2.5 py-1 rounded-full bg-blush-soft text-[10px] uppercase tracking-[0.14em] text-rosegold-deep font-sans-lux">
                      {sp}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => openBooking()}
                  className="mt-5 w-full inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-full border border-border text-[10px] uppercase tracking-[0.2em] font-sans-lux text-foreground hover:bg-charcoal hover:text-ivory hover:border-charcoal transition-all duration-300 group/btn"
                >
                  Book with {s.name.split(' ')[0]}
                  <ArrowUpRight className="h-3 w-3 group-hover/btn:rotate-45 transition-transform" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
