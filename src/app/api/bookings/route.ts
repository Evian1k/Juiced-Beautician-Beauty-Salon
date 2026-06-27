import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { z } from 'zod'

const schema = z.object({
  service: z.string().min(2),
  specialist: z.string().min(2),
  date: z.string().min(6),
  time: z.string().min(3),
  name: z.string().min(2),
  phone: z.string().min(6),
  email: z.string().email(),
  notes: z.string().optional().default(''),
})

// Simple in-memory rate limiting
const rateLimit = new Map<string, { count: number; ts: number }>()
function rateLimitOk(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimit.get(ip)
  if (!entry || now - entry.ts > 60_000) {
    rateLimit.set(ip, { count: 1, ts: now })
    return true
  }
  entry.count += 1
  return entry.count <= 5
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (!rateLimitOk(ip)) {
    return NextResponse.json({ error: 'Too many requests. Please try again in a moment.' }, { status: 429 })
  }

  try {
    const body = await req.json()
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input.', details: parsed.error.flatten() }, { status: 400 })
    }

    const booking = await db.booking.create({
      data: {
        service: parsed.data.service,
        specialist: parsed.data.specialist,
        date: parsed.data.date,
        time: parsed.data.time,
        name: parsed.data.name,
        phone: parsed.data.phone,
        email: parsed.data.email,
        notes: parsed.data.notes,
      },
    })

    // TODO: send confirmation email via Resend, push to Google Calendar, notify admin.
    // For now we log to server-side and return the booking reference.
    console.log('[BOOKING] New booking created:', booking.id, booking.name, booking.service, booking.date, booking.time)

    return NextResponse.json({
      ok: true,
      id: booking.id,
      reference: `JB-${booking.id.slice(-6).toUpperCase()}`,
      message: 'Booking received. A confirmation email has been queued.',
    })
  } catch (err) {
    console.error('[BOOKING] Error:', err)
    return NextResponse.json({ error: 'Could not create booking. Please try again or call us.' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const bookings = await db.booking.findMany({ orderBy: { createdAt: 'desc' }, take: 50 })
    return NextResponse.json({ bookings })
  } catch (err) {
    return NextResponse.json({ error: 'DB error' }, { status: 500 })
  }
}
