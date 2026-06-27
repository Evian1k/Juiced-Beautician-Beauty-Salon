'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Calendar, Phone, Sparkles } from 'lucide-react'
import { business } from '@/lib/data'
import { useBooking } from '@/components/site/booking-context'
import { openWhatsApp } from '@/lib/utils'

export function CtaBanner() {
  const { open: openBooking } = useBooking()
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden bg-charcoal">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=2400&q=80')] bg-cover bg-center opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/85 to-charcoal/40" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-2xl text-ivory">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-rosegold mb-4 font-sans-lux"
          >
            <Sparkles className="h-3 w-3" />
            <span>Ready When You Are</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05]"
          >
            Your most beautiful self <span className="italic luxury-gradient-text">is one appointment away.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-5 text-base sm:text-lg text-white/70 font-light"
          >
            Open 24 hours. Five-star rated. Six master artists at your service. Book online in under two minutes — we'll confirm within hours.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <button
              onClick={() => openBooking()}
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white text-charcoal text-xs uppercase tracking-[0.2em] font-sans-lux font-medium hover:bg-rosegold hover:text-white transition-all duration-500"
            >
              <Calendar className="h-4 w-4" />
              Book Appointment
            </button>
            <a
              href={`tel:${business.phone}`}
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-white/30 text-white text-xs uppercase tracking-[0.2em] font-sans-lux hover:bg-white/10 transition-all duration-500"
            >
              <Phone className="h-4 w-4" />
              {business.phoneDisplay}
            </a>
            <button
              onClick={() => openWhatsApp(`Hello Juiced Beautician, I'd like to book an appointment.`)}
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#25D366] text-white text-xs uppercase tracking-[0.2em] font-sans-lux hover:bg-[#1ebe5d] transition-all duration-500"
            >
              WhatsApp Us
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
