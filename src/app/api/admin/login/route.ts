import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { ADMIN_COOKIE_NAME, makeSessionToken, verifyPin } from '@/lib/admin'

const schema = z.object({ pin: z.string().min(3).max(64) })

const rate = new Map<string, { count: number; ts: number }>()
function rateOk(ip: string): boolean {
  const now = Date.now()
  const e = rate.get(ip)
  if (!e || now - e.ts > 60_000) {
    rate.set(ip, { count: 1, ts: now })
    return true
  }
  e.count += 1
  return e.count <= 5
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (!rateOk(ip)) {
    return NextResponse.json({ error: 'Too many attempts. Try again in a minute.' }, { status: 429 })
  }

  try {
    const body = await req.json()
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid PIN.' }, { status: 400 })
    }

    if (!verifyPin(parsed.data.pin)) {
      return NextResponse.json({ error: 'Incorrect PIN.' }, { status: 401 })
    }

    const res = NextResponse.json({ ok: true })
    res.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: makeSessionToken(),
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })
    return res
  } catch (err) {
    console.error('[ADMIN LOGIN]', err)
    return NextResponse.json({ error: 'Server error.' }, { status: 500 })
  }
}
