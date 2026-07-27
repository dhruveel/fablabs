import { NextRequest, NextResponse } from 'next/server'
import { AdminLoginSchema } from '@/lib/validations/admin'
import { verifyAdminCredentials } from '@/lib/auth/admin'
import { createAdminSession } from '@/lib/auth/session'
import { rateLimitByKeyOrNull, rateLimitOrNull } from '@/lib/rate-limit'

export async function POST(request: NextRequest) {
  const rateLimited = await rateLimitOrNull(request, 'admin-login', {
    max: 10,
    windowMs: 15 * 60 * 1000,
  })
  if (rateLimited) return rateLimited

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const parsed = AdminLoginSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid email or password.' }, { status: 400 })
  }

  const { email, password } = parsed.data

  // IP-independent limiter keyed on the account being targeted, since the
  // per-IP check above only holds if X-Forwarded-For can be trusted.
  const accountLimited = await rateLimitByKeyOrNull(
    'admin-login-account',
    email.trim().toLowerCase(),
    { max: 10, windowMs: 15 * 60 * 1000 },
  )
  if (accountLimited) return accountLimited

  const isValid = await verifyAdminCredentials(email, password)

  if (!isValid) {
    return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 })
  }

  await createAdminSession(email)

  return NextResponse.json({ success: true })
}
