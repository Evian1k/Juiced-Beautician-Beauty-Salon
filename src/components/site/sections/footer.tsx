'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Instagram, Facebook, Send, ArrowUp, Heart } from 'lucide-react'
import { Logo } from '@/components/site/logo'
import { business, navLinks, serviceCategories } from '@/lib/data'
import { toast } from 'sonner'

export function Footer() {
  const [email, setEmail] = React.useState('')
  const [subscribing, setSubscribing] = React.useState(false)

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email.')
      return
    }
    setSubscribing(true)
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Failed')
      }
      toast.success('Welcome to the Juiced inner circle. Check your inbox.')
      setEmail('')
    } catch (err: any) {
      toast.error(err.message?.includes('unique') ? 'You\'re already on the list!' : 'Could not subscribe. Try again.')
    } finally {
      setSubscribing(false)
    }
  }

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const handleNav = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-charcoal text-ivory pt-20 pb-8 mt-auto overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-rosegold/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-gold/10 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Top: newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-rosegold mb-4 font-sans-lux">
            <Heart className="h-3 w-3" />
            <span>The Inner Circle</span>
          </div>
          <h3 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl text-ivory leading-tight">
            Receive beauty notes,<br /> <span className="italic luxury-gradient-text">first access, and member treats.</span>
          </h3>
          <form onSubmit={subscribe} className="mt-7 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 bg-white/5 border border-white/15 rounded-full px-5 py-3 text-sm text-ivory placeholder:text-white/40 focus:outline-none focus:border-rosegold transition-colors"
            />
            <button
              type="submit"
              disabled={subscribing}
              className="px-6 py-3 rounded-full bg-rosegold text-white text-xs uppercase tracking-[0.18em] font-sans-lux hover:bg-rosegold-deep transition-colors disabled:opacity-60 inline-flex items-center justify-center gap-2"
            >
              {subscribing ? 'Subscribing...' : <>Subscribe <Send className="h-3 w-3" /></>}
            </button>
          </form>
          <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-white/40 font-sans-lux">
            Monthly · No spam · Unsubscribe anytime
          </p>
        </motion.div>

        {/* Middle: links */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <Logo />
            <p className="mt-4 text-sm text-white/60 leading-relaxed font-light">
              Nairobi's premier luxury beauty atelier. Editorial, bridal, lash, brow, nail and skincare rituals — open 24 hours, every day.
            </p>
            <div className="mt-5 flex gap-2">
              <a href={business.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="h-9 w-9 rounded-full border border-white/15 flex items-center justify-center hover:bg-rosegold hover:border-rosegold transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href={business.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="h-9 w-9 rounded-full border border-white/15 flex items-center justify-center hover:bg-rosegold hover:border-rosegold transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href={business.social.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="h-9 w-9 rounded-full border border-white/15 flex items-center justify-center hover:bg-rosegold hover:border-rosegold transition-colors text-xs font-bold">
                TT
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.24em] text-rosegold font-sans-lux mb-4">Explore</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNav(link.href)}
                    className="text-sm text-white/70 hover:text-rosegold transition-colors font-sans-lux font-light"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.24em] text-rosegold font-sans-lux mb-4">Services</h4>
            <ul className="space-y-2">
              {serviceCategories.slice(0, 8).map((c) => (
                <li key={c.name}>
                  <button
                    onClick={() => handleNav('#services')}
                    className="text-sm text-white/70 hover:text-rosegold transition-colors font-sans-lux font-light text-left"
                  >
                    {c.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.24em] text-rosegold font-sans-lux mb-4">Visit</h4>
            <ul className="space-y-3 text-sm text-white/70 font-sans-lux font-light">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-rosegold mt-0.5 shrink-0" />
                <span>{business.address.line1}<br />{business.address.line2}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-rosegold shrink-0" />
                <a href={`tel:${business.phone}`} className="hover:text-rosegold transition-colors">{business.phoneDisplay}</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-rosegold shrink-0" />
                <a href={`mailto:${business.email}`} className="hover:text-rosegold transition-colors break-all">{business.email}</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/50 font-sans-lux">
            © {new Date().getFullYear()} {business.legalName}. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-xs text-white/50 font-sans-lux">
            <button onClick={() => toast.info('Privacy Policy will open in a new window.')} className="hover:text-rosegold transition-colors">Privacy</button>
            <button onClick={() => toast.info('Terms of Service will open in a new window.')} className="hover:text-rosegold transition-colors">Terms</button>
            <button onClick={() => toast.info('Cookie Policy will open in a new window.')} className="hover:text-rosegold transition-colors">Cookies</button>
            <button
              onClick={scrollTop}
              aria-label="Back to top"
              className="h-9 w-9 rounded-full border border-white/15 flex items-center justify-center hover:bg-rosegold hover:border-rosegold transition-colors"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
