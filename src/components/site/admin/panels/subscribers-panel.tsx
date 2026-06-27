'use client'

import * as React from 'react'
import { Mail, Trash2, Loader2, Download } from 'lucide-react'
import { useFetch, type Subscriber } from '@/components/site/admin/use-fetch'
import { toast } from 'sonner'

export function SubscribersPanel() {
  const { data, loading, refresh } = useFetch<{ subscribers: Subscriber[] }>('/api/admin/subscribers')
  const subscribers = data?.subscribers ?? []

  const del = async (id: string) => {
    if (!confirm('Remove this subscriber?')) return
    try {
      const res = await fetch(`/api/admin/subscribers/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed')
      toast.success('Subscriber removed.')
      refresh()
    } catch {
      toast.error('Could not remove subscriber.')
    }
  }

  const exportCsv = () => {
    if (!subscribers.length) {
      toast.error('No subscribers to export.')
      return
    }
    const rows = [
      ['Email', 'Name', 'Subscribed At'],
      ...subscribers.map((s) => [s.email, s.name ?? '', new Date(s.createdAt).toISOString()]),
    ]
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `juiced-subscribers-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
    toast.success(`Exported ${subscribers.length} subscribers.`)
  }

  if (loading) return <Loading />
  if (!subscribers.length) return <Empty label="No subscribers yet." />

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div className="text-xs text-muted-foreground font-sans-lux">
          {subscribers.length} subscriber{subscribers.length !== 1 ? 's' : ''}
        </div>
        <button
          onClick={exportCsv}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-charcoal text-ivory text-[10px] uppercase tracking-[0.16em] font-sans-lux hover:bg-rosegold transition-colors"
        >
          <Download className="h-3 w-3" /> Export CSV
        </button>
      </div>

      <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
        {subscribers.map((s) => (
          <div key={s.id} className="bg-background border border-border rounded-xl p-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="h-9 w-9 rounded-full bg-blush-soft flex items-center justify-center shrink-0">
                <Mail className="h-3.5 w-3.5 text-rosegold" />
              </div>
              <div className="min-w-0">
                <div className="text-sm text-foreground font-sans-lux truncate">{s.email}</div>
                <div className="text-[10px] text-muted-foreground font-sans-lux">
                  {s.name ? `${s.name} · ` : ''}Joined {new Date(s.createdAt).toLocaleDateString('en-KE')}
                </div>
              </div>
            </div>
            <button
              onClick={() => del(s.id)}
              title="Remove"
              className="h-9 w-9 shrink-0 rounded-lg bg-background border border-border text-muted-foreground hover:bg-destructive hover:text-white hover:border-destructive transition-colors inline-flex items-center justify-center"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
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
