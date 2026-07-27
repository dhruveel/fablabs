import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminSession } from '@/lib/auth/session'
import { listQuoteRequests } from '@/lib/db/quote'
import { ADMIN_PAGE_SIZE } from '@/lib/constants/pagination'

export async function GET(request: NextRequest) {
  const session = await verifyAdminSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
  }

  const page = Math.max(1, Number(request.nextUrl.searchParams.get('page')) || 1)
  const { items, total } = await listQuoteRequests({ page, pageSize: ADMIN_PAGE_SIZE })
  return NextResponse.json({ quotes: items, total, page, pageSize: ADMIN_PAGE_SIZE })
}
