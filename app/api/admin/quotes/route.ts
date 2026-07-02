import { NextResponse } from 'next/server'
import { verifyAdminSession } from '@/lib/auth/session'
import { listQuoteRequests } from '@/lib/db/quote'

export async function GET() {
  const session = await verifyAdminSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
  }

  const quotes = await listQuoteRequests()
  return NextResponse.json({ quotes })
}
