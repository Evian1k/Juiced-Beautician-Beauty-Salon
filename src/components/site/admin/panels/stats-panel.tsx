'use client'

import * as React from 'react'
import { CalendarDays, Mail, Users, Clock, TrendingUp, Loader2, Sparkles } from 'lucide-react'
import { useFetch, type Stats } from '@/components/site/admin/use-fetch'

export function StatsPanel() {
  const { data, loading } = useFetch<Stats>('/api/admin/stats')

  if (loading) return <Loading />
  if (!data) return <Empty label="Could not load stats." />

  const { counts, trend, topServices } = data
  const maxTrend = Math.max(...trend.map((t) => Math.max(t.bookings, t.messages)), 1)
  const maxService = Math.max(...topServices.map((s) => s.count), 1)

  const cards = [
    { label: 'Total Bookings', value: counts.bookings, icon: CalendarDays, tint: 'bg-blush-soft text-rosegold' },
    { label: 'Pending', value: counts.pendingBookings, icon: Clock, tint: 'bg-amber-50 text-amber-600' },
    { label: 'Messages', value: counts.messages, icon: Mail, tint: 'bg-emerald-50 text-emerald-600' },
    { label: 'Subscribers', value: counts.subscribers, icon: Users, tint: 'bg-slate-100 text-slate-600' },
  ]

  return (
    <div className="space-y-8">
      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {cards.map((c) => (
          <div key={c.label} className="bg-background border border-border rounded-xl p-5">
            <div className={`h-10 w-10 rounded-full ${c.tint} flex items-center justify-center mb-3`}>
              <c.icon className="h-4 w-4" />
            </div>
            <div className="font-serif-display text-3xl text-foreground">{c.value}</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-sans-lux mt-1">{c.label}</div>
          </div>
        ))}
      </div>

      {/* Trend chart */}
      <div className="bg-background border border-border rounded-xl p-5">
        <div className="flex items-center gap-2 mb-5">
          <TrendingUp className="h-4 w-4 text-rosegold" />
          <h3 className="font-serif-display text-lg text-foreground">Last 14 days</h3>
        </div>
        <div className="flex items-end gap-1.5 h-40">
          {trend.map((d) => (
            <div key={d.date} className="flex-1 flex flex-col items-center gap-1 group">
              <div className="w-full flex-1 flex flex-col justify-end gap-0.5">
                <div
                  className="w-full bg-rosegold/80 group-hover:bg-rosegold transition-colors rounded-t"
                  style={{ height: `${(d.bookings / maxTrend) * 100}%`, minHeight: d.bookings > 0 ? '4px' : '0' }}
                  title={`${d.bookings} bookings`}
                />
                <div
                  className="w-full bg-gold/70 group-hover:bg-gold transition-colors rounded-t"
                  style={{ height: `${(d.messages / maxTrend) * 100}%`, minHeight: d.messages > 0 ? '4px' : '0' }}
                  title={`${d.messages} messages`}
                />
              </div>
              <span className="text-[8px] text-muted-foreground font-sans-lux">
                {new Date(d.date).getDate()}
              </span>
            </div>
          ))}
        </div>
        <div className="flex gap-4 mt-3 text-[10px] uppercase tracking-[0.16em] text-muted-foreground font-sans-lux">
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-rosegold" />Bookings</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-gold" />Messages</span>
        </div>
      </div>

      {/* Top services */}
      <div className="bg-background border border-border rounded-xl p-5">
        <div className="flex items-center gap-2 mb-5">
          <Sparkles className="h-4 w-4 text-rosegold" />
          <h3 className="font-serif-display text-lg text-foreground">Top requested services</h3>
        </div>
        {topServices.length === 0 ? (
          <p className="text-sm text-muted-foreground font-sans-lux py-4">No bookings to analyse yet.</p>
        ) : (
          <div className="space-y-2.5">
            {topServices.map((s) => (
              <div key={s.service} className="flex items-center gap-3">
                <div className="text-xs text-foreground font-sans-lux w-48 shrink-0 truncate">{s.service}</div>
                <div className="flex-1 bg-cream rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-rosegold to-gold rounded-full transition-all duration-700"
                    style={{ width: `${(s.count / maxService) * 100}%` }}
                  />
                </div>
                <div className="text-xs text-muted-foreground font-sans-lux w-8 text-right">{s.count}</div>
              </div>
            ))}
          </div>
        )}
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
