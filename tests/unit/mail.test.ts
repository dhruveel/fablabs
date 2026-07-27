import { describe, it, expect, beforeEach, vi } from 'vitest'

const sentMessages: Array<Record<string, unknown>> = []

vi.mock('nodemailer', () => ({
  default: {
    createTransport: () => ({
      sendMail: async (message: Record<string, unknown>) => {
        sentMessages.push(message)
        return { messageId: 'test' }
      },
    }),
  },
}))

const { sendContactSubmissionEmails, sendQuoteSubmissionEmails } = await import('@/lib/mail')

describe('sendContactSubmissionEmails / sendQuoteSubmissionEmails', () => {
  beforeEach(() => {
    sentMessages.length = 0
    process.env.SMTP_HOST = 'smtp.example.com'
    process.env.SMTP_PORT = '587'
    process.env.SMTP_USER = 'user@example.com'
    process.env.SMTP_PASS = 'password'
    process.env.SMTP_FROM = 'FabLabs <noreply@fablabs.in>'
    process.env.ADMIN_NOTIFICATION_EMAIL = 'admin-inbox@example.com'
  })

  it('sends an admin notification and a sender confirmation for contact submissions, escaping HTML', async () => {
    await sendContactSubmissionEmails({
      name: 'Test <script>alert(1)</script> User',
      phone: '9999999999',
      email: 'sender@example.com',
      subject: 'XSS test & <b>bold</b>',
      message: 'Hello <img src=x onerror=alert(1)>, this is a test message.',
    })

    expect(sentMessages).toHaveLength(2)

    const admin = sentMessages.find((m) => m.to === 'admin-inbox@example.com')
    const confirmation = sentMessages.find((m) => m.to === 'sender@example.com')
    expect(admin).toBeDefined()
    expect(confirmation).toBeDefined()

    for (const msg of [admin, confirmation]) {
      expect(msg!.html).not.toContain('<script>')
      expect(msg!.html).not.toContain('<img src=x onerror=')
      expect(msg!.html).toContain('&lt;script&gt;')
    }
    expect(admin!.replyTo).toBe('sender@example.com')
  })

  it('sends both emails for a quote request that includes an email', async () => {
    await sendQuoteSubmissionEmails({
      name: 'Quote Tester',
      phone: '8888888888',
      email: 'quotesender@example.com',
      requirements: 'Need <script>evil()</script> 50 shirts',
    })

    expect(sentMessages).toHaveLength(2)
    const admin = sentMessages.find((m) => m.to === 'admin-inbox@example.com')
    expect(admin!.html as string).toContain('&lt;script&gt;evil()&lt;/script&gt;')
  })

  it('skips the confirmation email when the quote has no email, but still notifies admin', async () => {
    await sendQuoteSubmissionEmails({
      name: 'No Email Quote Tester',
      phone: '7777777777',
      email: null,
      requirements: 'Testing missing email path',
    })

    expect(sentMessages).toHaveLength(1)
    expect(sentMessages[0].to).toBe('admin-inbox@example.com')
  })

  it('skips the admin notification when ADMIN_NOTIFICATION_EMAIL is unset, without throwing', async () => {
    delete process.env.ADMIN_NOTIFICATION_EMAIL

    await sendContactSubmissionEmails({
      name: 'No Admin Env',
      phone: '1231231234',
      email: 'sender2@example.com',
      subject: 'test',
      message: 'test',
    })

    expect(sentMessages).toHaveLength(1)
    expect(sentMessages[0].to).toBe('sender2@example.com')
  })

  it('never throws even if the transport rejects (e.g. broken SMTP creds)', async () => {
    vi.resetModules()
    vi.doMock('nodemailer', () => ({
      default: {
        createTransport: () => ({
          sendMail: async () => {
            throw new Error('535 Authentication failed')
          },
        }),
      },
    }))
    const { sendContactSubmissionEmails: sendWithBrokenTransport } = await import('@/lib/mail')

    await expect(
      sendWithBrokenTransport({
        name: 'Failure Path',
        phone: '1234567890',
        email: 'fail@example.com',
        subject: 'Should not throw',
        message: 'SMTP is broken but this must not reject.',
      }),
    ).resolves.toBeUndefined()
  })
})
