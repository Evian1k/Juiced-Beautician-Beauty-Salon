'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Clock, ShieldCheck, HeartHandshake, Award, Leaf } from 'lucide-react'
import { business } from '@/lib/data'

const values = [
  {
    icon: Award,
    title: 'Editorial Expertise',
    text: 'Six years of Vogue Africa covers, Nairobi Fashion Week runways, and 200+ brides. Our team brings world-class technique to every chair.',
  },
  {
    icon: ShieldCheck,
    title: 'Clinical Hygiene',
    text: 'Hospital-grade sterilisation, single-use tools where it matters, and a spotless suite between every client. Beauty is sacred; so is safety.',
  },
  {
    icon: HeartHandshake,
    title: 'Warm & Personal',
    text: 'You will never feel rushed. Every appointment begins with a consult, ends with a touch-up kit, and includes a glass of something cold.',
  },
  {
    icon: Leaf,
    title: 'Clean Formulas',
    text: 'Vegan-friendly, cruelty-free, and skin-safe product lines. We invest in the world\'s best — because your skin deserves nothing less.',
  },
]

export function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32 bg-background overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-blush/40 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden image-zoom-container">
              <img
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80"
                alt="Inside the Juiced Beautician luxury salon suite"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Floating stats card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute -bottom-8 -left-4 sm:left-8 bg-background border border-border rounded-2xl shadow-2xl p-6 max-w-[280px]"
            >
              <div className="grid grid-cols-2 gap-4">
                {business.stats.map((s) => (
                  <div key={s.label}>
                    <div className="font-serif-display text-2xl sm:text-3xl luxury-gradient-text">{s.value}</div>
                    <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground mt-1 font-sans-lux">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Floating gold accent */}
            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full border border-gold/40 animate-float pointer-events-none" />
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-rosegold mb-5 font-sans-lux">
              <Sparkles className="h-3 w-3" />
              <span>Our Story</span>
            </div>

            <h2 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-foreground">
              A Nairobi atelier,<br />
              <span className="italic font-light luxury-gradient-text">obsessed with the details.</span>
            </h2>

            <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed font-light">
              Founded in 2019 by Wanjiru Kamau after a decade in London, Dubai, and Nairobi editorial circles, Juiced Beautician was born from a simple conviction: Nairobi deserves a beauty destination that meets global standards without losing local soul.
            </p>
            <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed font-light">
              Today, we are a team of six master artists operating from our private suite at Travel House, Kenyatta Avenue — open around the clock, rated 5.0 by 39+ Google reviewers, and trusted by brides, models, executives, and mothers-to-be across the region.
            </p>

            {/* Mission / Vision */}
            <div className="mt-8 grid sm:grid-cols-2 gap-6">
              <div className="border-l-2 border-rosegold pl-4">
                <div className="text-xs uppercase tracking-[0.24em] text-rosegold font-sans-lux mb-1">Mission</div>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  To deliver world-class beauty rituals that leave every client feeling seen, celebrated, and unapologetically themselves.
                </p>
              </div>
              <div className="border-l-2 border-gold pl-4">
                <div className="text-xs uppercase tracking-[0.24em] text-gold font-sans-lux mb-1">Vision</div>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  To be East Africa's most respected beauty atelier — the name whispered between mothers, sisters, and brides-to-be.
                </p>
              </div>
            </div>

            {/* Why choose us */}
            <div className="mt-10 grid sm:grid-cols-2 gap-5">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex gap-3"
                >
                  <div className="shrink-0 h-10 w-10 rounded-full bg-blush-soft flex items-center justify-center text-rosegold">
                    <v.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-serif-display text-lg text-foreground leading-tight">{v.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-1">{v.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
