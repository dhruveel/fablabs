import 'server-only'
import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/db/mongodb'

const COLLECTION = 'rate_limits'

interface RateLimitDoc {
  _id: string
  count: number
  expiresAt: Date
}

export function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for')
  const ip = forwardedFor?.split(',')[0]?.trim()
  return ip || 'unknown'
}

/**
 * Fixed-window rate limit backed by a TTL-indexed Mongo collection, so it
 * stays correct across the cold/warm serverless instances this app runs on.
 */
export async function checkRateLimit(
  scope: string,
  identifier: string,
  { max, windowMs }: { max: number; windowMs: number },
): Promise<{ allowed: boolean; retryAfterSeconds: number }> {
  const db = await getDb()

  const now = Date.now()
  const windowStart = Math.floor(now / windowMs) * windowMs
  const expiresAt = new Date(windowStart + windowMs)
  const _id = `${scope}:${identifier}:${windowStart}`

  const doc = await db.collection<RateLimitDoc>(COLLECTION).findOneAndUpdate(
    { _id },
    { $inc: { count: 1 }, $setOnInsert: { expiresAt } },
    { upsert: true, returnDocument: 'after' },
  )

  const count = doc?.count ?? 1
  const retryAfterSeconds = Math.max(1, Math.ceil((expiresAt.getTime() - now) / 1000))

  return { allowed: count <= max, retryAfterSeconds }
}

function tooManyRequestsResponse(retryAfterSeconds: number): NextResponse {
  return NextResponse.json(
    { error: 'Too many requests. Please try again later.' },
    { status: 429, headers: { 'Retry-After': String(retryAfterSeconds) } },
  )
}

/**
 * Convenience wrapper for route handlers: returns a 429 response when the
 * caller has exceeded `max` requests per `windowMs`, or `null` to continue.
 */
export async function rateLimitOrNull(
  request: NextRequest,
  scope: string,
  limits: { max: number; windowMs: number },
): Promise<NextResponse | null> {
  const { allowed, retryAfterSeconds } = await checkRateLimit(
    scope,
    getClientIp(request),
    limits,
  )

  if (allowed) return null
  return tooManyRequestsResponse(retryAfterSeconds)
}

/**
 * Same as rateLimitOrNull, but keyed on a caller-supplied identifier instead
 * of the client IP. `X-Forwarded-For` is attacker-controlled unless a
 * trusted proxy in front of this app overwrites it, so IP-only limiting can
 * be defeated by sending a different value on every request. Use this to key
 * on something the attacker can't rotate — e.g. the account being targeted.
 */
export async function rateLimitByKeyOrNull(
  scope: string,
  key: string,
  limits: { max: number; windowMs: number },
): Promise<NextResponse | null> {
  const { allowed, retryAfterSeconds } = await checkRateLimit(scope, key, limits)

  if (allowed) return null
  return tooManyRequestsResponse(retryAfterSeconds)
}
