import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional().default(''),
  subject: z.string().optional().default(''),
  message: z.string().min(5),
})

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
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
  }

  try {
    const body = await req.json()
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input.' }, { status: 400 })
    }

    const msg = await db.contactMessage.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        subject: parsed.data.subject,
        message: parsed.data.message,
      },
    })

    console.log('[CONTACT] New message:', msg.id, msg.name, msg.email)

    return NextResponse.json({ ok: true, id: msg.id })
  } catch (err) {
    console.error('[CONTACT] Error:', err)
    return NextResponse.json({ error: 'Could not send message.' }, { status: 500 })
  }
}
