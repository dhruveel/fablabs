import 'server-only'

const MIN_SCORE = 0.5

export async function verifyRecaptcha(
  token: string,
  remoteIp?: string,
  expectedAction?: string,
) {
  const secret = process.env.RECAPTCHA_SECRET_KEY
  if (!secret) {
    throw new Error('Missing RECAPTCHA_SECRET_KEY environment variable')
  }

  const params = new URLSearchParams({ secret, response: token })
  if (remoteIp) params.set('remoteip', remoteIp)

  const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params,
  })

  if (!res.ok) {
    console.error(`[recaptcha] siteverify HTTP ${res.status} for action "${expectedAction}"`)
    return false
  }

  const data = (await res.json()) as {
    success: boolean
    score?: number
    action?: string
    'error-codes'?: string[]
  }

  if (!data.success || typeof data.score !== 'number' || data.score < MIN_SCORE) {
    console.error(
      `[recaptcha] rejected for action "${expectedAction}": success=${data.success} score=${data.score} errors=${data['error-codes']?.join(',')}`,
    )
    return false
  }
  if (expectedAction && data.action !== expectedAction) {
    console.error(
      `[recaptcha] action mismatch: expected "${expectedAction}", got "${data.action}"`,
    )
    return false
  }

  return true
}
