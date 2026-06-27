import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { isAdmin } from '@/lib/admin'
import { z } from 'zod'

const patchSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'cancelled', 'completed']).optional(),
})

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const { id } = await params
    const body = await req.json()
    const parsed = patchSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input.' }, { status: 400 })
    }
    const updated = await db.booking.update({
      where: { id },
      data: parsed.data,
    })
    return NextResponse.json({ ok: true, booking: updated })
  } catch (err) {
    console.error('[ADMIN BOOKINGS PATCH]', err)
    return NextResponse.json({ error: 'Server error.' }, { status: 500 })
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const { id } = await params
    await db.booking.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[ADMIN BOOKINGS DELETE]', err)
    return NextResponse.json({ error: 'Server error.' }, { status: 500 })
  }
}
