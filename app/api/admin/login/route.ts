import { NextRequest, NextResponse } from 'next/server'
import { AdminLoginSchema } from '@/lib/validations/admin'
import { verifyAdminCredentials } from '@/lib/auth/admin'
import { createAdminSession } from '@/lib/auth/session'

export async function POST(request: NextRequest) {
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
  const isValid = await verifyAdminCredentials(email, password)

  if (!isValid) {
    return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 })
  }

  await createAdminSession(email)

  return NextResponse.json({ success: true })
}
