import 'server-only'
import { cache } from 'react'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const SESSION_COOKIE = 'admin_session'
const SESSION_DURATION_MS = 12 * 60 * 60 * 1000 // 12 hours

function getSecretKey() {
  const secret = process.env.SESSION_SECRET
  if (!secret) {
    throw new Error('Missing SESSION_SECRET environment variable')
  }
  if (secret.length < 32) {
    throw new Error('SESSION_SECRET must be at least 32 characters for HS256 signing')
  }
  return new TextEncoder().encode(secret)
}

interface SessionPayload {
  email: string
  [key: string]: unknown
}

async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_MS / 1000}s`)
    .sign(getSecretKey())
}

async function decrypt(session: string | undefined): Promise<SessionPayload | null> {
  if (!session) return null
  try {
    const { payload } = await jwtVerify(session, getSecretKey(), {
      algorithms: ['HS256'],
    })
    return payload as SessionPayload
  } catch {
    return null
  }
}

export async function createAdminSession(email: string) {
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS)
  const session = await encrypt({ email })
  const cookieStore = await cookies()

  cookieStore.set(SESSION_COOKIE, session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
}

export async function deleteAdminSession() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
}

// Memoized per-request: the admin layout and each admin page independently
// verify the session, so this avoids redundant JWT verification within the
// same render.
export const verifyAdminSession = cache(async () => {
  const cookieStore = await cookies()
  const session = cookieStore.get(SESSION_COOKIE)?.value
  const payload = await decrypt(session)

  if (!payload?.email) return null
  return { email: payload.email }
})
