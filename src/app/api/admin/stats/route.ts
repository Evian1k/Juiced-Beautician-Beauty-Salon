import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { isAdmin } from '@/lib/admin'

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const [bookings, messages, subscribers, pendingBookings, recentBookings, recentMessages] = await Promise.all([
      db.booking.count(),
      db.contactMessage.count(),
      db.newsletterSubscriber.count(),
      db.booking.count({ where: { status: 'pending' } }),
      db.booking.findMany({
        where: { createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } },
        select: { createdAt: true, status: true },
      }),
      db.contactMessage.findMany({
        where: { createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } },
        select: { createdAt: true },
      }),
    ])

    // Group by day for last 14 days
    const days: { date: string; bookings: number; messages: number }[] = []
    for (let i = 13; i >= 0; i--) {
      const d = new Date()
      d.setHours(0, 0, 0, 0)
      d.setDate(d.getDate() - i)
      const next = new Date(d)
      next.setDate(d.getDate() + 1)
      const dateStr = d.toISOString().split('T')[0]
      const bookingsCount = recentBookings.filter((b) => b.createdAt >= d && b.createdAt < next).length
      const messagesCount = recentMessages.filter((m) => m.createdAt >= d && m.createdAt < next).length
      days.push({ date: dateStr, bookings: bookingsCount, messages: messagesCount })
    }

    // Service popularity
    const allBookings = await db.booking.findMany({ select: { service: true } })
    const serviceCounts = new Map<string, number>()
    for (const b of allBookings) {
      serviceCounts.set(b.service, (serviceCounts.get(b.service) ?? 0) + 1)
    }
    const topServices = Array.from(serviceCounts.entries())
      .map(([service, count]) => ({ service, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8)

    return NextResponse.json({
      counts: { bookings, messages, subscribers, pendingBookings },
      trend: days,
      topServices,
    })
  } catch (err) {
    console.error('[ADMIN STATS]', err)
    return NextResponse.json({ error: 'Server error.' }, { status: 500 })
  }
}
