'use client'

import * as React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Calendar, Phone, MessageCircle, ArrowDown, Sparkles, Star } from 'lucide-react'
import { useBooking } from '@/components/site/booking-context'
import { business } from '@/lib/data'
import { openWhatsApp } from '@/lib/utils'

export function Hero() {
  const { open: openBooking } = useBooking()
  const ref = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1])

  const scrollToServices = () => {
    document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" ref={ref} className="relative min-h-[100svh] w-full overflow-hidden flex items-center">
      {/* Background image with parallax */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1595959183082-7b570b7e08e2?auto=format&fit=crop&w=2400&q=80')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/50 to-charcoal/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/70 via-transparent to-transparent" />
      </motion.div>

      {/* Decorative gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-rosegold/30 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-gold/20 blur-[120px] pointer-events-none" />

      <motion.div
        style={{ opacity }}
        className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24"
      >
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full glass-card text-xs uppercase tracking-[0.28em] text-white/90"
          >
            <Sparkles className="h-3 w-3 text-gold" />
            <span>Nairobi's Luxury Beauty Atelier · Est. {business.founded}</span>
          </motion.div>

          <h1 className="font-serif-display text-white text-5xl sm:text-7xl lg:text-8xl xl:text-9xl leading-[0.95] tracking-tight">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="block italic font-light"
            >
              Where Beauty
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.45 }}
              className="block luxury-gradient-text font-medium animate-gradient"
            >
              Meets Artistry
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            className="mt-8 max-w-xl text-base sm:text-lg text-white/80 font-sans-lux font-light leading-relaxed"
          >
            From editorial makeup to bespoke lash artistry, Juiced Beautician crafts timeless beauty rituals in the heart of Nairobi. Open 24 hours. Five-star rated. Yours, on your schedule.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.75 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <button
              onClick={() => openBooking()}
              className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white text-charcoal text-xs uppercase tracking-[0.2em] font-sans-lux font-medium hover:bg-rosegold hover:text-white transition-all duration-500 hover:shadow-2xl hover:shadow-rosegold/40"
            >
              <Calendar className="h-4 w-4" />
              Book Appointment
              <ArrowDown className="h-3 w-3 -rotate-90 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href={`tel:${business.phone}`}
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full glass-card text-white text-xs uppercase tracking-[0.2em] font-sans-lux hover:bg-white/15 transition-all duration-500"
            >
              <Phone className="h-4 w-4" />
              Call Now
            </a>

            <button
              onClick={() => openWhatsApp(`Hello Juiced Beautician, I'd like to book an appointment.`)}
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#25D366] text-white text-xs uppercase tracking-[0.2em] font-sans-lux hover:bg-[#1ebe5d] transition-all duration-500"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </button>

            <button
              onClick={scrollToServices}
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-white/30 text-white text-xs uppercase tracking-[0.2em] font-sans-lux hover:bg-white/10 transition-all duration-500"
            >
              View Services
            </button>
          </motion.div>

          {/* Rating bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 text-white/80"
          >
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </div>
              <span className="text-sm font-sans-lux">
                <strong className="text-white">5.0</strong> · 39+ Google reviews
              </span>
            </div>
            <div className="hidden sm:block h-4 w-px bg-white/30" />
            <div className="text-sm font-sans-lux">
              <strong className="text-white">Open 24 hours</strong> · 7 days a week
            </div>
            <div className="hidden sm:block h-4 w-px bg-white/30" />
            <div className="text-sm font-sans-lux">
              <strong className="text-white">Travel House</strong> · Kenyatta Avenue
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToServices}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/70 hover:text-white transition-colors"
        aria-label="Scroll to services"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-sans-lux">Scroll</span>
        <div className="relative h-12 w-6 rounded-full border border-white/40 flex items-start justify-center p-1.5">
          <span className="block h-2 w-1 rounded-full bg-white animate-scroll-down" />
        </div>
        <ArrowDown className="h-3 w-3" />
      </motion.button>
    </section>
  )
}
