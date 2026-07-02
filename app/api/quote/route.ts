import { NextRequest, NextResponse } from 'next/server'
import { QuoteFormSchema } from '@/lib/validations/quote'
import { createQuoteRequest, type QuoteImage } from '@/lib/db/quote'

const MAX_IMAGE_BYTES = 5 * 1024 * 1024 // 5MB

function emptyToUndefined(value: FormDataEntryValue | null) {
  if (typeof value !== 'string') return undefined
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : undefined
}

export async function POST(request: NextRequest) {
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
    if (!imageField.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'Reference image must be an image file.' },
        { status: 400 },
      )
    }
    if (imageField.size > MAX_IMAGE_BYTES) {
      return NextResponse.json(
        { error: 'Reference image must be smaller than 5MB.' },
        { status: 400 },
      )
    }

    const buffer = Buffer.from(await imageField.arrayBuffer())
    image = {
      data: buffer.toString('base64'),
      contentType: imageField.type,
      filename: imageField.name,
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
