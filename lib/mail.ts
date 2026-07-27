import 'server-only'
import nodemailer from 'nodemailer'

// Cached and pooled across sends (and across warm invocations, same pattern
// as lib/db/mongodb.ts) so concurrent/successive emails reuse a handful of
// already-authenticated SMTP connections instead of renegotiating one per send.
const globalForMail = globalThis as unknown as {
  _mailTransport?: nodemailer.Transporter
}

function getTransport() {
  if (globalForMail._mailTransport) return globalForMail._mailTransport

  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT ?? 587)
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS

  if (!host || !user || !pass) {
    throw new Error('Missing SMTP_HOST, SMTP_USER, or SMTP_PASS environment variable')
  }

  globalForMail._mailTransport = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    pool: true,
  })

  return globalForMail._mailTransport
}

export async function sendPasswordResetEmail(to: string, resetUrl: string) {
  const from = process.env.SMTP_FROM || process.env.SMTP_USER
  const transport = getTransport()

  await transport.sendMail({
    from,
    to,
    subject: 'Reset your FabLabs admin password',
    text: `Reset your FabLabs admin password:\n\n${resetUrl}\n\nThis link expires in 1 hour. If you didn't request this, you can ignore this email.`,
    html: `
      <p>Reset your FabLabs admin password by clicking the link below:</p>
      <p><a href="${resetUrl}">${resetUrl}</a></p>
      <p>This link expires in 1 hour. If you didn't request this, you can ignore this email.</p>
    `,
  })
}

// User-submitted text is interpolated into HTML email bodies below; unlike
// JSX, nodemailer sends `html` as-is, so it must be escaped by hand.
function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

// Runs a send and swallows any failure so a broken mail provider never
// fails the form submission it's notifying about — the DB write already
// succeeded by the time this runs.
async function safeSend(label: string, send: () => Promise<void>) {
  try {
    await send()
  } catch (err) {
    console.error(`[mail] Failed to send ${label}:`, err)
  }
}

interface ContactSubmissionEmailData {
  name: string
  phone: string
  email: string
  subject: string
  message: string | null
}

async function sendContactAdminNotification(data: ContactSubmissionEmailData) {
  const to = process.env.ADMIN_NOTIFICATION_EMAIL
  if (!to) return

  const from = process.env.SMTP_FROM || process.env.SMTP_USER
  const transport = getTransport()

  await transport.sendMail({
    from,
    to,
    replyTo: data.email,
    subject: `New contact submission: ${data.subject}`,
    text: `New contact form submission.\n\nName: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email}\nSubject: ${data.subject}\n\nMessage:\n${data.message ?? '—'}`,
    html: `
      <p>New contact form submission.</p>
      <ul>
        <li><strong>Name:</strong> ${escapeHtml(data.name)}</li>
        <li><strong>Phone:</strong> ${escapeHtml(data.phone)}</li>
        <li><strong>Email:</strong> ${escapeHtml(data.email)}</li>
        <li><strong>Subject:</strong> ${escapeHtml(data.subject)}</li>
      </ul>
      <p><strong>Message:</strong></p>
      <p>${data.message ? escapeHtml(data.message) : '—'}</p>
    `,
  })
}

async function sendContactConfirmation(data: ContactSubmissionEmailData) {
  const from = process.env.SMTP_FROM || process.env.SMTP_USER
  const transport = getTransport()

  await transport.sendMail({
    from,
    to: data.email,
    subject: "We've received your message — FabLabs",
    text: `Hi ${data.name},\n\nThanks for reaching out to FabLabs. We've received your message about "${data.subject}" and will get back to you shortly.\n\n— FabLabs`,
    html: `
      <p>Hi ${escapeHtml(data.name)},</p>
      <p>Thanks for reaching out to FabLabs. We've received your message about
      "${escapeHtml(data.subject)}" and will get back to you shortly.</p>
      <p>— FabLabs</p>
    `,
  })
}

export async function sendContactSubmissionEmails(data: ContactSubmissionEmailData) {
  await Promise.all([
    safeSend('contact admin notification', () => sendContactAdminNotification(data)),
    safeSend('contact confirmation', () => sendContactConfirmation(data)),
  ])
}

interface QuoteSubmissionEmailData {
  name: string
  phone: string
  email: string | null
  requirements: string | null
}

async function sendQuoteAdminNotification(data: QuoteSubmissionEmailData) {
  const to = process.env.ADMIN_NOTIFICATION_EMAIL
  if (!to) return

  const from = process.env.SMTP_FROM || process.env.SMTP_USER
  const transport = getTransport()

  await transport.sendMail({
    from,
    to,
    replyTo: data.email ?? undefined,
    subject: `New quote request from ${data.name}`,
    text: `New quote request.\n\nName: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email ?? '—'}\n\nRequirements:\n${data.requirements ?? '—'}`,
    html: `
      <p>New quote request.</p>
      <ul>
        <li><strong>Name:</strong> ${escapeHtml(data.name)}</li>
        <li><strong>Phone:</strong> ${escapeHtml(data.phone)}</li>
        <li><strong>Email:</strong> ${data.email ? escapeHtml(data.email) : '—'}</li>
      </ul>
      <p><strong>Requirements:</strong></p>
      <p>${data.requirements ? escapeHtml(data.requirements) : '—'}</p>
    `,
  })
}

async function sendQuoteConfirmation(data: QuoteSubmissionEmailData) {
  if (!data.email) return

  const from = process.env.SMTP_FROM || process.env.SMTP_USER
  const transport = getTransport()

  await transport.sendMail({
    from,
    to: data.email,
    subject: "We've received your quote request — FabLabs",
    text: `Hi ${data.name},\n\nThanks for your quote request. We've received your requirements and will get back to you shortly with pricing.\n\n— FabLabs`,
    html: `
      <p>Hi ${escapeHtml(data.name)},</p>
      <p>Thanks for your quote request. We've received your requirements and
      will get back to you shortly with pricing.</p>
      <p>— FabLabs</p>
    `,
  })
}

export async function sendQuoteSubmissionEmails(data: QuoteSubmissionEmailData) {
  await Promise.all([
    safeSend('quote admin notification', () => sendQuoteAdminNotification(data)),
    safeSend('quote confirmation', () => sendQuoteConfirmation(data)),
  ])
}
