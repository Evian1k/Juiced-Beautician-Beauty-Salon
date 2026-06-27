import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { isAdmin } from '@/lib/admin'

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const bookings = await db.booking.findMany({
      orderBy: { createdAt: 'desc' },
      take: 200,
    })
    return NextResponse.json({ bookings })
  } catch (err) {
    console.error('[ADMIN BOOKINGS GET]', err)
    return NextResponse.json({ error: 'Server error.' }, { status: 500 })
  }
}
