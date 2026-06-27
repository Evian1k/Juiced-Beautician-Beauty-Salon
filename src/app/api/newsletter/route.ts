import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid email.' }, { status: 400 })
    }

    const sub = await db.newsletterSubscriber.upsert({
      where: { email: parsed.data.email },
      update: { name: parsed.data.name ?? null },
      create: {
        email: parsed.data.email,
        name: parsed.data.name ?? null,
      },
    })

    console.log('[NEWSLETTER] Subscribed:', sub.email)

    return NextResponse.json({ ok: true, email: sub.email })
  } catch (err) {
    console.error('[NEWSLETTER] Error:', err)
    return NextResponse.json({ error: 'Could not subscribe.' }, { status: 500 })
  }
}
