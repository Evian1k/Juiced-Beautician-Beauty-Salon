'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, ArrowUpRight, Sparkles, Star } from 'lucide-react'
import { services, serviceCategories, type ServiceCategory } from '@/lib/data'
import { useBooking } from '@/components/site/booking-context'
import { cn, formatKsh } from '@/lib/utils'

type Filter = 'All' | ServiceCategory

const filters: Filter[] = ['All', ...serviceCategories.map((c) => c.name)]

export function Services() {
  const [active, setActive] = React.useState<Filter>('All')
  const { open: openBooking } = useBooking()

  const visible = React.useMemo(() => {
    if (active === 'All') return services
    return services.filter((s) => s.category === active)
  }, [active])

  return (
    <section id="services" className="relative py-24 sm:py-32 bg-cream">
      <div className="absolute inset-0 pointer-events-none opacity-50"
           style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(183,110,121,0.15) 1px, transparent 0)', backgroundSize: '32px 32px' }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-rosegold mb-4 font-sans-lux"
          >
            <Sparkles className="h-3 w-3" />
            <span>Our Services</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif-display text-4xl sm:text-5xl lg:text-6xl text-foreground leading-[1.05]"
          >
            An atelier of <span className="italic luxury-gradient-text">bespoke rituals.</span>
          </motion.h2>
          <p className="mt-5 text-base text-muted-foreground font-light">
            Every service begins with a consult and ends with you feeling like the most polished version of yourself. Explore by category or scroll through our full menu.
          </p>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
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

        {/* Services grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {visible.map((service) => (
              <motion.article
                key={service.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group relative bg-background rounded-2xl overflow-hidden border border-border hover-lift flex flex-col"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />

                  {service.popular && (
                    <div className="absolute top-3 left-3 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-rosegold text-white text-[10px] uppercase tracking-[0.2em] font-sans-lux">
                      <Star className="h-3 w-3 fill-current" />
                      Popular
                    </div>
                  )}

                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-background/85 backdrop-blur text-[10px] uppercase tracking-[0.18em] text-foreground font-sans-lux">
                    {service.category}
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.2em] text-white/70 font-sans-lux flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {service.duration}
                      </div>
                      <div className="text-white font-serif-display text-xl mt-0.5">{formatKsh(service.startingPrice)}</div>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-serif-display text-2xl text-foreground leading-tight">{service.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed font-light line-clamp-4">{service.description}</p>

                  <ul className="mt-4 space-y-1.5">
                    {service.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-xs text-foreground/80">
                        <span className="mt-1.5 h-1 w-1 rounded-full bg-rosegold shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 pt-5 border-t border-border flex items-center justify-between gap-2">
                    <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-sans-lux">Starting from</span>
                    <button
                      onClick={() => openBooking(service)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-charcoal text-ivory text-[10px] uppercase tracking-[0.18em] font-sans-lux hover:bg-rosegold transition-all duration-300 group/btn"
                    >
                      Book
                      <ArrowUpRight className="h-3 w-3 group-hover/btn:rotate-45 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        <p className="text-center text-xs text-muted-foreground mt-10 font-sans-lux tracking-wide">
          Prices are starting points · Final pricing confirmed at consult · 24-hour cancellation policy
        </p>
      </div>
    </section>
  )
}
