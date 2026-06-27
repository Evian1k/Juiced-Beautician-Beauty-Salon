import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { isAdmin } from '@/lib/admin'

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const subscribers = await db.newsletterSubscriber.findMany({
      orderBy: { createdAt: 'desc' },
      take: 500,
    })
    return NextResponse.json({ subscribers })
  } catch (err) {
    console.error('[ADMIN SUBSCRIBERS GET]', err)
    return NextResponse.json({ error: 'Server error.' }, { status: 500 })
  }
}
