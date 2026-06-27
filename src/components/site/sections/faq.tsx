'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react'
import { faqs } from '@/lib/data'
import { cn } from '@/lib/utils'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export function Faq() {
  const categories = React.useMemo(() => {
    const map = new Map<string, typeof faqs>()
    for (const f of faqs) {
      if (!map.has(f.category)) map.set(f.category, [])
      map.get(f.category)!.push(f)
    }
    return Array.from(map.entries())
  }, [])

  return (
    <section id="faq" className="relative py-24 sm:py-32 bg-cream">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-rosegold mb-4 font-sans-lux">
            <Sparkles className="h-3 w-3" />
            <span>Good To Know</span>
          </div>
          <h2 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl text-foreground leading-[1.05]">
            Frequently asked <span className="italic luxury-gradient-text">questions.</span>
          </h2>
          <p className="mt-5 text-base text-muted-foreground font-light">
            Everything you need to know about booking, payments, walk-ins, cancellations, bridal, and gift vouchers. Can't find your answer? WhatsApp us anytime.
          </p>
        </div>

        <div className="max-w-3xl mx-auto grid gap-10">
          {categories.map(([cat, items], idx) => (
            <motion.div
              key={cat}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <HelpCircle className="h-4 w-4 text-rosegold" />
                <h3 className="text-xs uppercase tracking-[0.24em] text-rosegold font-sans-lux">{cat}</h3>
              </div>

              <Accordion type="single" collapsible className="space-y-2">
                {items.map((item, i) => (
                  <AccordionItem
                    key={i}
                    value={`${cat}-${i}`}
                    className="bg-background rounded-xl border border-border px-5 data-[state=open]:border-rosegold transition-colors"
                  >
                    <AccordionTrigger className="font-serif-display text-lg text-foreground text-left hover:no-underline py-5 [&[data-state=open]>svg]:rotate-180">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground leading-relaxed font-light pb-5">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
