import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminSession } from '@/lib/auth/session'
import { getQuoteRequestById } from '@/lib/db/quote'
import { readQuoteImage } from '@/lib/storage/quote-images'

function safeFilename(name: string) {
  // Strip quotes/control characters so the user-uploaded name can't break
  // out of the Content-Disposition header value.
  return name.replace(/[^\x20-\x7e]/g, '').replace(/"/g, '')
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await verifyAdminSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
  }

  const { id } = await params
  const quote = await getQuoteRequestById(id)
  if (!quote?.image) {
    return NextResponse.json({ error: 'Not found.' }, { status: 404 })
  }

  let buffer: Buffer
  try {
    buffer = await readQuoteImage(quote.image.filename)
  } catch {
    return NextResponse.json({ error: 'Not found.' }, { status: 404 })
  }

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      'Content-Type': quote.image.contentType,
      'Content-Disposition': `inline; filename="${safeFilename(quote.image.originalName)}"`,
      'Cache-Control': 'private, max-age=3600',
    },
  })
}
