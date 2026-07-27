'use client'

import Script from 'next/script'
import { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ''

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void
      execute: (siteKey: string, options: { action: string }) => Promise<string>
    }
  }
}

function BlueOutlineBtn({
  children,
  type,
  disabled,
  className,
}: {
  children: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  className?: string
}) {
  return (
    <Button
      type={type ?? 'button'}
      disabled={disabled}
      variant="outline"
      className={cn(
        'h-auto rounded-full border-[3px] border-[#0A64BC] bg-transparent px-7 py-2.5',
        'text-[#0A64BC] hover:bg-[#0A64BC]/10 hover:text-[#0A64BC]',
        'text-base sm:text-lg whitespace-nowrap',
        'disabled:opacity-40 disabled:cursor-not-allowed',
        className,
      )}
      style={{ fontFamily: 'var(--font-jersey10)' }}
    >
      {children}
    </Button>
  )
}

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [recaptchaReady, setRecaptchaReady] = useState(false)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const form = formRef.current
    if (!form || !window.grecaptcha) return

    setStatus('submitting')
    setErrorMessage(null)

    try {
      const token = await window.grecaptcha.execute(SITE_KEY, { action: 'contact' })
      const formData = new FormData(form)

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          phone: formData.get('phone'),
          email: formData.get('email'),
          subject: formData.get('subject'),
          message: formData.get('message'),
          recaptchaToken: token,
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => null)
        setErrorMessage(data?.error ?? 'Something went wrong. Please try again.')
        setStatus('error')
        return
      }

      form.reset()
      setStatus('success')
    } catch {
      setErrorMessage('Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  return (
    <>
      {/* reCAPTCHA v3 API script — invisible, no npm package required */}
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`}
        strategy="lazyOnload"
        onLoad={() => window.grecaptcha?.ready(() => setRecaptchaReady(true))}
      />

      <form ref={formRef} className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          className="h-14 rounded-full bg-black border border-white/75 text-white placeholder:text-[#5f5e5e] px-6 text-base focus-visible:border-[#0A64BC] focus-visible:ring-[#0A64BC]/20"
          style={{ fontFamily: 'var(--font-k2d)' }}
        />
        <Input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          required
          className="h-14 rounded-full bg-black border border-white/75 text-white placeholder:text-[#5f5e5e] px-6 text-base focus-visible:border-[#0A64BC] focus-visible:ring-[#0A64BC]/20"
          style={{ fontFamily: 'var(--font-k2d)' }}
        />
        <Input
          type="email"
          name="email"
          placeholder="Email ID"
          required
          className="h-14 rounded-full bg-black border border-white/75 text-white placeholder:text-[#5f5e5e] px-6 text-base focus-visible:border-[#0A64BC] focus-visible:ring-[#0A64BC]/20"
          style={{ fontFamily: 'var(--font-k2d)' }}
        />
        <Input
          type="text"
          name="subject"
          placeholder="Subject"
          required
          className="h-14 rounded-full bg-black border border-white/75 text-white placeholder:text-[#5f5e5e] px-6 text-base focus-visible:border-[#0A64BC] focus-visible:ring-[#0A64BC]/20"
          style={{ fontFamily: 'var(--font-k2d)' }}
        />
        <Textarea
          name="message"
          placeholder="Message"
          rows={6}
          required
          className="min-h-40 sm:min-h-46 rounded-[29px] bg-black border border-white/75 text-white placeholder:text-[#5f5e5e] px-6 py-4 text-base resize-none focus-visible:border-[#0A64BC] focus-visible:ring-[#0A64BC]/20"
          style={{ fontFamily: 'var(--font-k2d)' }}
        />

        {status === 'success' && (
          <p className="text-sm text-green-400">
            Thanks! Your message has been sent — we&apos;ll get back to you soon.
          </p>
        )}
        {status === 'error' && errorMessage && (
          <p className="text-sm text-red-400">{errorMessage}</p>
        )}

        <div className="pt-2">
          <BlueOutlineBtn type="submit" disabled={!recaptchaReady || status === 'submitting'}>
            {status === 'submitting' ? 'Sending…' : "Let's Talk"}
          </BlueOutlineBtn>
        </div>
      </form>
    </>
  )
}
