'use client'

import * as React from 'react'
import { Calendar, Clock, User, Phone, Mail, FileText, Check, X, Trash2, Loader2, Search } from 'lucide-react'
import { useFetch, type Booking } from '@/components/site/admin/use-fetch'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

const STATUS_STYLES: Record<Booking['status'], string> = {
  pending: 'bg-amber-100 text-amber-800 border-amber-200',
  confirmed: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  cancelled: 'bg-rose-100 text-rose-800 border-rose-200',
  completed: 'bg-slate-100 text-slate-800 border-slate-200',
}

export function BookingsPanel() {
  const { data, loading, refresh } = useFetch<{ bookings: Booking[] }>('/api/admin/bookings')
  const [filter, setFilter] = React.useState<'all' | Booking['status']>('all')
  const [search, setSearch] = React.useState('')
  const [updatingId, setUpdatingId] = React.useState<string | null>(null)

  const bookings = data?.bookings ?? []
  const visible = React.useMemo(() => {
    return bookings
      .filter((b) => filter === 'all' ? true : b.status === filter)
      .filter((b) => {
        if (!search) return true
        const q = search.toLowerCase()
        return b.name.toLowerCase().includes(q) ||
               b.email.toLowerCase().includes(q) ||
               b.phone.includes(q) ||
               b.service.toLowerCase().includes(q) ||
               b.specialist.toLowerCase().includes(q)
      })
  }, [bookings, filter, search])

  const updateStatus = async (id: string, status: Booking['status']) => {
    setUpdatingId(id)
    try {
      const res = await fetch(`/api/admin/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (!res.ok) throw new Error('Failed')
      toast.success(`Booking marked as ${status}.`)
      refresh()
    } catch {
      toast.error('Could not update booking.')
    } finally {
      setUpdatingId(null)
    }
  }

  const del = async (id: string) => {
    if (!confirm('Permanently delete this booking?')) return
    try {
      const res = await fetch(`/api/admin/bookings/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed')
      toast.success('Booking deleted.')
      refresh()
    } catch {
      toast.error('Could not delete booking.')
    }
  }

  if (loading) return <Loading />
  if (!bookings.length) return <Empty label="No bookings yet." />

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, phone, service..."
            className="w-full pl-9 pr-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:border-rosegold"
          />
        </div>
        <div className="flex gap-1 flex-wrap">
          {(['all', 'pending', 'confirmed', 'completed', 'cancelled'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={cn(
                'px-3 py-2 rounded-lg text-xs uppercase tracking-[0.14em] font-sans-lux transition-all border',
                filter === s ? 'bg-charcoal text-ivory border-charcoal' : 'bg-background border-border hover:border-rosegold'
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
        {visible.length === 0 ? (
          <Empty label="No bookings match this filter." />
        ) : (
          visible.map((b) => (
            <div key={b.id} className="bg-background border border-border rounded-xl p-4 sm:p-5">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <span className={cn('inline-flex px-2 py-0.5 rounded-full text-[10px] uppercase tracking-[0.16em] font-sans-lux border', STATUS_STYLES[b.status])}>
                      {b.status}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.16em] text-rosegold font-sans-lux">{b.service}</span>
                  </div>
                  <div className="font-serif-display text-xl text-foreground">{b.name}</div>
                  <div className="mt-2 grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs text-muted-foreground font-sans-lux">
                    <div className="flex items-center gap-1.5"><User className="h-3 w-3 text-rosegold" />{b.specialist}</div>
                    <div className="flex items-center gap-1.5"><Calendar className="h-3 w-3 text-rosegold" />{new Date(b.date + 'T00:00').toLocaleDateString('en-KE', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</div>
                    <div className="flex items-center gap-1.5"><Clock className="h-3 w-3 text-rosegold" />{b.time}</div>
                    <div className="flex items-center gap-1.5"><Phone className="h-3 w-3 text-rosegold" /><a href={`tel:${b.phone}`} className="hover:text-rosegold">{b.phone}</a></div>
                    <div className="flex items-center gap-1.5 sm:col-span-2"><Mail className="h-3 w-3 text-rosegold" /><a href={`mailto:${b.email}`} className="hover:text-rosegold break-all">{b.email}</a></div>
                    {b.notes && <div className="flex items-start gap-1.5 sm:col-span-2"><FileText className="h-3 w-3 text-rosegold mt-0.5" /><span className="italic">{b.notes}</span></div>}
                  </div>
                </div>

                <div className="flex sm:flex-col gap-1.5 shrink-0">
                  <button
                    onClick={() => updateStatus(b.id, 'confirmed')}
                    disabled={updatingId === b.id}
                    title="Confirm"
                    className="h-9 px-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] uppercase tracking-[0.16em] font-sans-lux hover:bg-emerald-100 transition-colors inline-flex items-center gap-1 disabled:opacity-50"
                  >
                    <Check className="h-3 w-3" /> Confirm
                  </button>
                  <button
                    onClick={() => updateStatus(b.id, 'completed')}
                    disabled={updatingId === b.id}
                    title="Mark completed"
                    className="h-9 px-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 text-[10px] uppercase tracking-[0.16em] font-sans-lux hover:bg-slate-100 transition-colors inline-flex items-center gap-1 disabled:opacity-50"
                  >
                    Done
                  </button>
                  <button
                    onClick={() => updateStatus(b.id, 'cancelled')}
                    disabled={updatingId === b.id}
                    title="Cancel"
                    className="h-9 px-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-[10px] uppercase tracking-[0.16em] font-sans-lux hover:bg-rose-100 transition-colors inline-flex items-center gap-1 disabled:opacity-50"
                  >
                    <X className="h-3 w-3" /> Cancel
                  </button>
                  <button
                    onClick={() => del(b.id)}
                    title="Delete"
                    className="h-9 px-3 rounded-lg bg-background border border-border text-muted-foreground text-[10px] uppercase tracking-[0.16em] font-sans-lux hover:bg-destructive hover:text-white hover:border-destructive transition-colors inline-flex items-center gap-1"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="mt-3 text-xs text-muted-foreground font-sans-lux text-right">
        {visible.length} of {bookings.length} bookings
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
  return (
    <div className="py-20 text-center text-sm text-muted-foreground font-sans-lux">
      {label}
    </div>
  )
}
