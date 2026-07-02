import { NextRequest, NextResponse } from 'next/server'
import { ContactFormSchema } from '@/lib/validations/contact'
import { verifyRecaptcha } from '@/lib/recaptcha'
import { createContactSubmission } from '@/lib/db/contact'

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const parsed = ContactFormSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid form data.', issues: parsed.error.flatten().fieldErrors },
      { status: 400 },
    )
  }

  const { recaptchaToken, ...fields } = parsed.data
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null

  const recaptchaOk = await verifyRecaptcha(recaptchaToken, ip ?? undefined)
  if (!recaptchaOk) {
    return NextResponse.json({ error: 'reCAPTCHA verification failed.' }, { status: 400 })
  }

  await createContactSubmission({ ...fields, ip })

  return NextResponse.json({ success: true }, { status: 201 })
}
