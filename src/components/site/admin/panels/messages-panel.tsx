'use client'

import * as React from 'react'
import { Mail, Phone, Trash2, Loader2, Search, MessageSquare } from 'lucide-react'
import { useFetch, type Message } from '@/components/site/admin/use-fetch'
import { toast } from 'sonner'

export function MessagesPanel() {
  const { data, loading, refresh } = useFetch<{ messages: Message[] }>('/api/admin/messages')
  const [search, setSearch] = React.useState('')
  const messages = data?.messages ?? []
  const visible = React.useMemo(() => {
    if (!search) return messages
    const q = search.toLowerCase()
    return messages.filter((m) =>
      m.name.toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q) ||
      m.message.toLowerCase().includes(q) ||
      (m.subject ?? '').toLowerCase().includes(q)
    )
  }, [messages, search])

  const del = async (id: string) => {
    if (!confirm('Delete this message?')) return
    try {
      const res = await fetch(`/api/admin/messages/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed')
      toast.success('Message deleted.')
      refresh()
    } catch {
      toast.error('Could not delete message.')
    }
  }

  if (loading) return <Loading />
  if (!messages.length) return <Empty label="No messages yet." />

  return (
    <div>
      <div className="relative mb-5">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search messages..."
          className="w-full pl-9 pr-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-rosegold"
        />
      </div>

      <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
        {visible.length === 0 ? (
          <Empty label="No messages match." />
        ) : (
          visible.map((m) => (
            <div key={m.id} className="bg-background border border-border rounded-xl p-4 sm:p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <MessageSquare className="h-3.5 w-3.5 text-rosegold" />
                    <span className="font-serif-display text-lg text-foreground">{m.name}</span>
                    {m.subject && <span className="text-[10px] uppercase tracking-[0.16em] text-rosegold font-sans-lux">· {m.subject}</span>}
                  </div>
                  <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground font-sans-lux mb-2">
                    <a href={`mailto:${m.email}`} className="flex items-center gap-1.5 hover:text-rosegold break-all">
                      <Mail className="h-3 w-3 text-rosegold" />{m.email}
                    </a>
                    {m.phone && (
                      <a href={`tel:${m.phone}`} className="flex items-center gap-1.5 hover:text-rosegold">
                        <Phone className="h-3 w-3 text-rosegold" />{m.phone}
                      </a>
                    )}
                    <span className="text-[10px]">{new Date(m.createdAt).toLocaleString('en-KE')}</span>
                  </div>
                  <p className="text-sm text-foreground/80 leading-relaxed font-light">{m.message}</p>
                </div>
                <button
                  onClick={() => del(m.id)}
                  title="Delete"
                  className="h-9 w-9 shrink-0 rounded-lg bg-background border border-border text-muted-foreground hover:bg-destructive hover:text-white hover:border-destructive transition-colors inline-flex items-center justify-center"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="mt-3 text-xs text-muted-foreground font-sans-lux text-right">
        {visible.length} of {messages.length} messages
      </div>
    </div>
  )
}

function Loading() {
  return (
    <div className="py-20 flex items-center justify-center text-muted-foreground">
      <Loader2 className="h-5 w-5 animate-spin" />
    </div>
  )
}

function Empty({ label }: { label: string }) {
  return <div className="py-20 text-center text-sm text-muted-foreground font-sans-lux">{label}</div>
}
