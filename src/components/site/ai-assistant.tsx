'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, X, Send, Bot } from 'lucide-react'
import { Logo } from '@/components/site/logo'
import { cn } from '@/lib/utils'

type Message = { role: 'user' | 'assistant'; content: string }

const WELCOME: Message = {
  role: 'assistant',
  content:
    "Hello, beautiful. I'm Aisha, your AI beauty concierge at Juiced Beautician. I can help you choose a service, recommend an artist, answer pricing questions, or guide you to book. What are you looking for today?",
}

const QUICK = [
  'Bridal makeup pricing',
  'Best facial for glowing skin',
  'Lash aftercare tips',
  'Book an appointment',
]

export function AiAssistant() {
  const [open, setOpen] = React.useState(false)
  const [messages, setMessages] = React.useState<Message[]>([WELCOME])
  const [input, setInput] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const scrollRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, loading])

  const send = async (text?: string) => {
    const content = (text ?? input).trim()
    if (!content || loading) return
    setInput('')
    const next = [...messages, { role: 'user', content } as Message]
    setMessages(next)
    setLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      })
      if (!res.ok) throw new Error('Failed')
      const data = await res.json()
      setMessages((m) => [...m, { role: 'assistant', content: data.reply }])
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: 'assistant',
          content:
            "I'm having trouble responding right now. Please WhatsApp us at +254 759 558872 and our team will help immediately.",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Launcher */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={() => setOpen(true)}
            className="fixed left-4 sm:left-6 bottom-6 z-40 group"
            aria-label="Open AI Beauty Assistant"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-rosegold animate-pulse-glow" />
              <div className="relative h-14 w-14 rounded-full bg-gradient-to-br from-rosegold to-rosegold-deep text-white shadow-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Sparkles className="h-6 w-6" />
              </div>
            </div>
            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-gold border-2 border-background" />
            <span className="absolute top-1/2 -translate-y-1/2 left-16 whitespace-nowrap bg-charcoal text-ivory text-[10px] uppercase tracking-[0.18em] font-sans-lux px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block">
              Ask Aisha
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 280 }}
            className="fixed left-4 sm:left-6 bottom-6 z-50 w-[calc(100vw-2rem)] sm:w-96 h-[32rem] max-h-[80svh] bg-background rounded-3xl shadow-2xl border border-border flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 flex items-center justify-between" style={{ background: 'linear-gradient(to bottom right, #1A1413, #2D2421)', color: '#FBF7F2' }}>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-rosegold to-gold flex items-center justify-center">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-serif-display text-lg leading-none">Aisha</div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-white/60 font-sans-lux flex items-center gap-1 mt-0.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400" /> AI Beauty Concierge
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="h-8 w-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
                aria-label="Close assistant"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-cream/30">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    'flex',
                    m.role === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  <div
                    className={cn(
                      'max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed',
                      m.role === 'user'
                        ? 'bg-charcoal text-ivory rounded-br-sm font-sans-lux font-light'
                        : 'bg-background border border-border text-foreground rounded-bl-sm font-sans-lux font-light'
                    )}
                  >
                    {m.content}
                  </div>
                </motion.div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-background border border-border rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="h-1.5 w-1.5 rounded-full bg-rosegold"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {messages.length === 1 && !loading && (
                <div className="pt-2 space-y-1.5">
                  <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-sans-lux px-1">Quick questions</div>
                  {QUICK.map((q) => (
                    <button
                      key={q}
                      onClick={() => send(q)}
                      className="block w-full text-left text-xs px-3 py-2 rounded-lg bg-background border border-border hover:border-rosegold text-foreground transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-border bg-background flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
                placeholder="Ask Aisha anything..."
                className="flex-1 bg-cream/50 border border-border rounded-full px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-rosegold transition-colors"
              />
              <button
                onClick={() => send()}
                disabled={loading || !input.trim()}
                className="h-10 w-10 rounded-full bg-rosegold text-white flex items-center justify-center hover:bg-rosegold-deep transition-colors disabled:opacity-50"
                aria-label="Send"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>

            <div className="px-4 py-2 bg-cream/50 text-center text-[9px] uppercase tracking-[0.18em] text-muted-foreground font-sans-lux">
              <Logo variant="mark" showText={false} className="h-3 w-3 inline-block mr-1 align-middle" />
              Powered by Juiced Beautician · Nairobi
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
