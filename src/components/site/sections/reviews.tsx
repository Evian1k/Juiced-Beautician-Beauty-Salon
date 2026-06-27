'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'
import { reviews, business } from '@/lib/data'

export function Reviews() {
  const [index, setIndex] = React.useState(0)
  const [direction, setDirection] = React.useState(1)
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null)

  const next = React.useCallback(() => {
    setDirection(1)
    setIndex((i) => (i + 1) % reviews.length)
  }, [])

  const prev = React.useCallback(() => {
    setDirection(-1)
    setIndex((i) => (i - 1 + reviews.length) % reviews.length)
  }, [])

  const stopAutoplay = React.useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
  }, [])

  const startAutoplay = React.useCallback(() => {
    stopAutoplay()
    intervalRef.current = setInterval(next, 7000)
  }, [next, stopAutoplay])

  React.useEffect(() => {
    startAutoplay()
    return stopAutoplay
  }, [startAutoplay, stopAutoplay])

  const review = reviews[index]

  return (
    <section id="reviews" className="relative py-24 sm:py-32 overflow-hidden bg-[#1A1413] text-[#FBF7F2]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-rosegold/15 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-rosegold mb-4 font-sans-lux">
            <Sparkles className="h-3 w-3" />
            <span>What Clients Say</span>
          </div>
          <h2 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05]">
            39 five-star reviews. <span className="italic luxury-gradient-text">Counting.</span>
          </h2>

          {/* Stats */}
          <div className="mt-8 inline-flex items-center gap-4 px-6 py-3 rounded-full bg-white/5 border border-white/10">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="h-4 w-4 fill-gold text-gold" />
              ))}
            </div>
            <div className="text-sm font-sans-lux">
              <strong className="text-gold">{business.rating.toFixed(1)}</strong> on Google
            </div>
            <div className="h-4 w-px bg-white/20" />
            <div className="text-sm font-sans-lux text-white/70">{business.reviewCount}+ reviews</div>
          </div>
        </div>

        {/* Slider */}
        <div
          className="max-w-4xl mx-auto relative"
          onMouseEnter={stopAutoplay}
          onMouseLeave={startAutoplay}
        >
          <Quote className="absolute -top-8 left-1/2 -translate-x-1/2 h-16 w-16 text-rosegold/30" strokeWidth={1} />

          <div className="relative min-h-[280px] sm:min-h-[240px] flex items-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.blockquote
                key={review.id}
                custom={direction}
                initial={{ opacity: 0, x: direction * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -60 }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                className="text-center"
              >
                <p className="font-serif-display text-xl sm:text-2xl lg:text-3xl italic font-light leading-relaxed text-current/95">
                  "{review.text}"
                </p>
                <footer className="mt-8 flex items-center justify-center gap-4">
                  <img
                    src={review.avatar}
                    alt={review.author}
                    className="h-12 w-12 rounded-full object-cover border-2 border-rosegold"
                    loading="lazy"
                  />
                  <div className="text-left">
                    <div className="font-sans-lux text-sm ">{review.author}</div>
                    <div className="text-xs text-white/60 font-sans-lux">{review.service} · {review.date}</div>
                  </div>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              aria-label="Previous review"
              className="h-11 w-11 rounded-full border border-white/20 flex items-center justify-center hover:bg-rosegold hover:border-rosegold transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex gap-1.5">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i) }}
                  aria-label={`Go to review ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index ? 'w-8 bg-rosegold' : 'w-1.5 bg-white/30 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next review"
              className="h-11 w-11 rounded-full border border-white/20 flex items-center justify-center hover:bg-rosegold hover:border-rosegold transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mini grid */}
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {reviews.slice(0, 4).map((r) => (
            <div key={r.id} className="p-5 rounded-xl bg-white/5 border border-white/10 backdrop-blur">
              <div className="flex gap-0.5 mb-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-3 w-3 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-xs text-white/70 leading-relaxed line-clamp-3 font-light">{r.text}</p>
              <div className="mt-3 text-[10px] uppercase tracking-[0.18em] text-rosegold font-sans-lux">— {r.author}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
