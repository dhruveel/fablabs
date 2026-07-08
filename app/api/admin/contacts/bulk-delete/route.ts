import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminSession } from '@/lib/auth/session'
import { deleteContactSubmissions } from '@/lib/db/contact'
import { BulkDeleteSchema } from '@/lib/validations/bulk-delete'

export async function POST(request: NextRequest) {
  const session = await verifyAdminSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const parsed = BulkDeleteSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const deletedCount = await deleteContactSubmissions(parsed.data.ids)
  return NextResponse.json({ success: true, deletedCount })
}
