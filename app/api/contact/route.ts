import { NextRequest, NextResponse } from 'next/server'
import { ContactFormSchema } from '@/lib/validations/contact'
import { verifyRecaptcha } from '@/lib/recaptcha'
import { createContactSubmission } from '@/lib/db/contact'
import { rateLimitOrNull } from '@/lib/rate-limit'
import { sendContactSubmissionEmails } from '@/lib/mail'

export async function POST(request: NextRequest) {
  const rateLimited = await rateLimitOrNull(request, 'contact', {
    max: 5,
    windowMs: 10 * 60 * 1000,
  })
  if (rateLimited) return rateLimited

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

  const { name, phone, email, subject, message, recaptchaToken } = parsed.data
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null

  const recaptchaOk = await verifyRecaptcha(recaptchaToken, ip ?? undefined, 'contact')
  if (!recaptchaOk) {
    return NextResponse.json({ error: 'reCAPTCHA verification failed.' }, { status: 400 })
  }

  await createContactSubmission({ name, phone, email, subject, message: message ?? null, ip })

  // Fire-and-forget: email delivery must never delay or fail this response.
  void sendContactSubmissionEmails({ name, phone, email, subject, message: message ?? null })

  return NextResponse.json({ success: true }, { status: 201 })
}
