import crypto from 'crypto'
import bcrypt from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'
import { ResetPasswordSchema } from '@/lib/validations/admin'
import { resetAdminPassword } from '@/lib/db/admin'

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const parsed = ResetPasswordSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid input.', issues: parsed.error.flatten().fieldErrors },
      { status: 400 },
    )
  }

  const { token, password } = parsed.data
  const tokenHash = crypto.createHash('sha256').update(token).digest('hex')
  const passwordHash = await bcrypt.hash(password, 12)

  const ok = await resetAdminPassword(tokenHash, passwordHash)
  if (!ok) {
    return NextResponse.json(
      { error: 'This reset link is invalid or has expired.' },
      { status: 400 },
    )
  }

  return NextResponse.json({ success: true })
}
