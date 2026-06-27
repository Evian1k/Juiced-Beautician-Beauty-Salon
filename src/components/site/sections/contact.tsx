'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, MessageCircle, Instagram, Facebook, Sparkles, Send, Navigation } from 'lucide-react'
import { business } from '@/lib/data'
import { openWhatsApp } from '@/lib/utils'
import { toast } from 'sonner'

export function Contact() {
  const [form, setForm] = React.useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [submitting, setSubmitting] = React.useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in your name, email, and message.')
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed to send')
      toast.success('Message sent. We\'ll be in touch within a few hours.')
      setForm({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch (err) {
      toast.error('Could not send message. Please call or WhatsApp us directly.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-background overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-blush/40 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-rosegold mb-4 font-sans-lux">
            <Sparkles className="h-3 w-3" />
            <span>Visit Us</span>
          </div>
          <h2 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl text-foreground leading-[1.05]">
            Come and stay <span className="italic luxury-gradient-text">a while.</span>
          </h2>
          <p className="mt-5 text-base text-muted-foreground font-light">
            We're at Travel House on Kenyatta Avenue, right in the heart of Nairobi CBD. Open 24 hours, every day. Call ahead for the smoothest experience.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left: info + map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-5"
          >
            {/* Info cards */}
            <div className="grid sm:grid-cols-2 gap-3">
              <a
                href={`tel:${business.phone}`}
                className="p-5 rounded-2xl border border-border bg-background hover:border-rosegold transition-colors group"
              >
                <Phone className="h-5 w-5 text-rosegold mb-3" />
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-sans-lux">Call</div>
                <div className="text-sm text-foreground font-sans-lux mt-1">{business.phoneDisplay}</div>
              </a>

              <button
                onClick={() => openWhatsApp(`Hello Juiced Beautician, I'd like to enquire.`)}
                className="p-5 rounded-2xl border border-border bg-background hover:border-rosegold transition-colors text-left"
              >
                <MessageCircle className="h-5 w-5 text-[#25D366] mb-3" />
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-sans-lux">WhatsApp</div>
                <div className="text-sm text-foreground font-sans-lux mt-1">Chat with us</div>
              </button>

              <a
                href={`mailto:${business.email}`}
                className="p-5 rounded-2xl border border-border bg-background hover:border-rosegold transition-colors"
              >
                <Mail className="h-5 w-5 text-rosegold mb-3" />
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-sans-lux">Email</div>
                <div className="text-sm text-foreground font-sans-lux mt-1 break-all">{business.email}</div>
              </a>

              <div className="p-5 rounded-2xl border border-border bg-background">
                <Clock className="h-5 w-5 text-gold mb-3" />
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-sans-lux">Hours</div>
                <div className="text-sm text-foreground font-sans-lux mt-1">{business.hours}</div>
              </div>
            </div>

            {/* Address */}
            <div className="p-6 rounded-2xl border border-border bg-background">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-rosegold mt-1 shrink-0" />
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-sans-lux">Address</div>
                  <div className="text-base text-foreground font-sans-lux mt-1">
                    {business.address.line1}<br />
                    {business.address.line2}, {business.address.city}<br />
                    {business.address.country}
                  </div>
                  <a
                    href={business.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] text-rosegold font-sans-lux hover:text-rosegold-deep"
                  >
                    <Navigation className="h-3 w-3" />
                    Get directions
                  </a>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden border border-border h-72">
              <iframe
                title="Juiced Beautician location"
                src={business.mapEmbed}
                className="w-full h-full"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Social */}
            <div className="flex items-center gap-3">
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-sans-lux">Follow</span>
              <a href={business.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="h-10 w-10 rounded-full border border-border flex items-center justify-center hover:bg-rosegold hover:text-white hover:border-rosegold transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href={business.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="h-10 w-10 rounded-full border border-border flex items-center justify-center hover:bg-rosegold hover:text-white hover:border-rosegold transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href={business.social.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="h-10 w-10 rounded-full border border-border flex items-center justify-center hover:bg-rosegold hover:text-white hover:border-rosegold transition-colors text-xs font-bold">
                TT
              </a>
            </div>
          </motion.div>

          {/* Right: contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-cream rounded-2xl border border-border p-6 sm:p-8"
          >
            <h3 className="font-serif-display text-2xl text-foreground mb-1">Send us a message</h3>
            <p className="text-sm text-muted-foreground font-light mb-6">
              For general enquiries, gift vouchers, partnership requests, or anything else. We reply within a few hours.
            </p>

            <form onSubmit={submit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Name *">
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:border-rosegold transition-colors"
                    placeholder="Your name"
                  />
                </Field>
                <Field label="Phone">
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:border-rosegold transition-colors"
                    placeholder="+254 7XX XXX XXX"
                  />
                </Field>
              </div>

              <Field label="Email *">
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:border-rosegold transition-colors"
                  placeholder="you@example.com"
                />
              </Field>

              <Field label="Subject">
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:border-rosegold transition-colors"
                  placeholder="What's this about?"
                />
              </Field>

              <Field label="Message *">
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:border-rosegold transition-colors resize-none"
                  placeholder="Tell us everything..."
                />
              </Field>

              <button
                type="submit"
                disabled={submitting}
                className="w-full btn-luxury-primary inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full text-xs uppercase tracking-[0.2em] font-sans-lux disabled:opacity-60"
              >
                {submitting ? 'Sending...' : <>Send message <Send className="h-3 w-3" /></>}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-sans-lux mb-2">{label}</span>
      {children}
    </label>
  )
}
