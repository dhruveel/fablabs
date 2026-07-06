import { NextRequest, NextResponse } from 'next/server'
import { QuoteFormSchema } from '@/lib/validations/quote'
import { createQuoteRequest, type QuoteImage } from '@/lib/db/quote'
import { saveQuoteImage } from '@/lib/storage/quote-images'
import { rateLimitOrNull } from '@/lib/rate-limit'

const MAX_IMAGE_BYTES = 5 * 1024 * 1024 // 5MB
// Multipart overhead (field boundaries, headers) on top of the image itself.
const MAX_REQUEST_BYTES = MAX_IMAGE_BYTES + 64 * 1024

function emptyToUndefined(value: FormDataEntryValue | null) {
  if (typeof value !== 'string') return undefined
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : undefined
}

// Identify the real format from file bytes rather than trusting the
// client-reported File.type, which is trivially spoofable.
function sniffImageType(buffer: Buffer): string | null {
  if (buffer.length >= 8 && buffer.subarray(0, 8).equals(
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
  )) {
    return 'image/png'
  }
  if (buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return 'image/jpeg'
  }
  if (buffer.length >= 6 && buffer.subarray(0, 4).toString('ascii') === 'GIF8') {
    return 'image/gif'
  }
  if (
    buffer.length >= 12 &&
    buffer.subarray(0, 4).toString('ascii') === 'RIFF' &&
    buffer.subarray(8, 12).toString('ascii') === 'WEBP'
  ) {
    return 'image/webp'
  }
  return null
}

export async function POST(request: NextRequest) {
  const rateLimited = await rateLimitOrNull(request, 'quote', {
    max: 5,
    windowMs: 10 * 60 * 1000,
  })
  if (rateLimited) return rateLimited

  const contentLength = Number(request.headers.get('content-length'))
  if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BYTES) {
    return NextResponse.json(
      { error: 'Reference image must be smaller than 5MB.' },
      { status: 413 },
    )
  }

  let formData: FormData
  try {
    formData = await request.formData()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const parsed = QuoteFormSchema.safeParse({
    name: emptyToUndefined(formData.get('name')) ?? '',
    phone: emptyToUndefined(formData.get('phone')) ?? '',
    email: emptyToUndefined(formData.get('email')),
    requirements: emptyToUndefined(formData.get('requirements')),
  })

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid form data.', issues: parsed.error.flatten().fieldErrors },
      { status: 400 },
    )
  }

  const imageField = formData.get('image')
  let image: QuoteImage | null = null

  if (imageField instanceof File && imageField.size > 0) {
    if (imageField.size > MAX_IMAGE_BYTES) {
      return NextResponse.json(
        { error: 'Reference image must be smaller than 5MB.' },
        { status: 400 },
      )
    }

    const buffer = Buffer.from(await imageField.arrayBuffer())
    const sniffedType = sniffImageType(buffer)
    if (!sniffedType) {
      return NextResponse.json(
        { error: 'Reference image must be a valid PNG, JPEG, GIF, or WEBP file.' },
        { status: 400 },
      )
    }

    const savedFilename = await saveQuoteImage(buffer, sniffedType)
    image = {
      filename: savedFilename,
      originalName: imageField.name,
      contentType: sniffedType,
    }
  }

  const { name, phone, email, requirements } = parsed.data
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null

  await createQuoteRequest({
    name,
    phone,
    email: email ?? null,
    requirements: requirements ?? null,
    image,
    ip,
  })

  return NextResponse.json({ success: true }, { status: 201 })
}
