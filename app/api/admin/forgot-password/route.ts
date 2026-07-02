import crypto from 'crypto'
import { NextRequest, NextResponse } from 'next/server'
import { ForgotPasswordSchema } from '@/lib/validations/admin'
import { findAdminByEmail, setAdminResetToken } from '@/lib/db/admin'
import { sendPasswordResetEmail } from '@/lib/mail'

const RESET_TOKEN_TTL_MS = 60 * 60 * 1000 // 1 hour

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const parsed = ForgotPasswordSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Enter a valid email.' }, { status: 400 })
  }

  const { email } = parsed.data
  const admin = await findAdminByEmail(email)

  // Only send an email if the account exists, but always return the same
  // response so this endpoint can't be used to enumerate admin emails.
  if (admin) {
    const rawToken = crypto.randomBytes(32).toString('hex')
    const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex')
    const expiresAt = new Date(Date.now() + RESET_TOKEN_TTL_MS)

    await setAdminResetToken(admin.email, tokenHash, expiresAt)

    const resetUrl = new URL(
      `/admin/reset-password?token=${rawToken}`,
      request.nextUrl.origin,
    ).toString()

    try {
      await sendPasswordResetEmail(admin.email, resetUrl)
    } catch (err) {
      // The reset token is already saved — don't fail the request just
      // because SMTP isn't configured yet. Log it so it's visible server-side.
      console.error('Failed to send password reset email:', err)
    }
  }

  return NextResponse.json({ success: true })
}
