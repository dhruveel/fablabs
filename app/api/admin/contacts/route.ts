import { NextResponse } from 'next/server'
import { verifyAdminSession } from '@/lib/auth/session'
import { listContactSubmissions } from '@/lib/db/contact'

export async function GET() {
  const session = await verifyAdminSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
  }

  const contacts = await listContactSubmissions()
  return NextResponse.json({ contacts })
}
