'use client'

import { useRef, useState } from 'react'
import { UploadCloudIcon, CheckCircleIcon } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export function QuoteDialog({ trigger }: { trigger?: React.ReactElement }) {
  const fileRef = useRef<HTMLInputElement>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [open, setOpen] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setPending(true)
    setError(null)

    try {
      const formData = new FormData(e.currentTarget)
      const res = await fetch('/api/quote', { method: 'POST', body: formData })

      if (!res.ok) {
        const data = await res.json().catch(() => null)
        setError(data?.error ?? 'Something went wrong. Please try again.')
        return
      }

      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setPending(false)
    }
  }

  function handleOpenChange(next: boolean) {
    setOpen(next)
    if (!next) {
      // reset on close
      setTimeout(() => {
        setSubmitted(false)
        setFileName(null)
        setError(null)
      }, 300)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {trigger ? (
        // Custom triggers here are styled wrapper components (motion span/div
        // around a shadcn Button), not always a bare <button> at the root —
        // nativeButton lets Base UI skip the "must be a real button" check
        // and fall back to ARIA semantics instead.
        <DialogTrigger render={trigger} nativeButton={false} />
      ) : (
        <DialogTrigger
          className="cursor-pointer bg-transparent border-0 p-0 text-left font-bold text-lg sm:text-xl hover:opacity-80 transition-opacity"
          style={{ fontFamily: 'var(--font-k2d)' }}
        >
          {/* #0A64BC on black is 3.56:1 — fails WCAG AA (4.5:1) at this
              18px/bold size, just under the "large text" 3:1 threshold.
              #4F9CE7 (already used elsewhere as the lighter end of the
              brand gradient) passes at 7.24:1. */}
          <span className="text-[#4F9CE7]">Get Your </span>
          <span className="text-white">Quote</span>
        </DialogTrigger>
      )}

      <DialogContent
        className="bg-[#0d0d0d] border border-white/10 text-white sm:max-w-lg p-0 overflow-y-auto max-h-[90svh] rounded-[24px]"
      >
        {submitted ? (
          <SuccessView onClose={() => setOpen(false)} />
        ) : (
          <QuoteForm
            fileName={fileName}
            onFileChange={setFileName}
            fileRef={fileRef}
            onSubmit={handleSubmit}
            pending={pending}
            error={error}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

// ── Success state ─────────────────────────────────────────────────────────────
function SuccessView({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col items-center gap-4 px-8 py-14 text-center">
      <CheckCircleIcon className="size-14 text-[#0A64BC]" strokeWidth={1.5} />
      <h3
        className="text-white font-bold text-2xl"
        style={{ fontFamily: 'var(--font-k2d)' }}
      >
        Quote Requested!
      </h3>
      <p className="text-white/60 text-sm max-w-[280px]" style={{ fontFamily: 'var(--font-k2d)' }}>
        We&apos;ve received your request and will reach out shortly. Thanks for choosing FabLabs!
      </p>
      <button
        onClick={onClose}
        className="mt-4 h-11 px-8 rounded-full font-bold text-white text-sm transition-opacity hover:opacity-90"
        style={{
          fontFamily: 'var(--font-k2d)',
          background: 'linear-gradient(100deg, #0a64bc 5.67%, #4f9ce7 99.53%)',
        }}
      >
        Done
      </button>
    </div>
  )
}

// ── Form ──────────────────────────────────────────────────────────────────────
function QuoteForm({
  fileName,
  onFileChange,
  fileRef,
  onSubmit,
  pending,
  error,
}: {
  fileName: string | null
  onFileChange: (name: string | null) => void
  fileRef: React.RefObject<HTMLInputElement | null>
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  pending: boolean
  error: string | null
}) {
  const inputCls =
    'h-12 rounded-full bg-black border border-white/15 text-white placeholder:text-white/30 px-5 text-sm focus-visible:border-[#0A64BC] focus-visible:ring-[#0A64BC]/20'

  return (
    <div className="px-7 pt-7 pb-8 flex flex-col gap-5">
      {/* Header */}
      <div className="flex flex-col gap-1 pr-8">
        <h2
          className="text-white font-bold text-2xl leading-tight"
          style={{ fontFamily: 'var(--font-k2d)' }}
        >
          Get Your <span className="text-[#0A64BC]">Quote</span>
        </h2>
        <p className="text-white/50 text-sm" style={{ fontFamily: 'var(--font-k2d)' }}>
          Fill in the details and we&apos;ll get back to you shortly.
        </p>
      </div>

      <div className="h-px bg-white/10" />

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        {/* Name */}
        <Field label="Name" required>
          <Input
            required
            name="name"
            placeholder="Your full name"
            className={inputCls}
            style={{ fontFamily: 'var(--font-k2d)' }}
          />
        </Field>

        {/* Contact number */}
        <Field label="Contact Number" required>
          <Input
            required
            name="phone"
            type="tel"
            placeholder="10-digit mobile number"
            className={inputCls}
            style={{ fontFamily: 'var(--font-k2d)' }}
          />
        </Field>

        {/* Email */}
        <Field label="Email" optional>
          <Input
            name="email"
            type="email"
            placeholder="your@email.com"
            className={inputCls}
            style={{ fontFamily: 'var(--font-k2d)' }}
          />
        </Field>

        {/* Requirements */}
        <Field label="Requirements" optional>
          <Textarea
            name="requirements"
            placeholder="Describe your order — product type, quantity, design ideas, deadline..."
            rows={4}
            className="rounded-[16px] bg-black border border-white/15 text-white placeholder:text-white/30 px-5 py-3 text-sm resize-none focus-visible:border-[#0A64BC] focus-visible:ring-[#0A64BC]/20"
            style={{ fontFamily: 'var(--font-k2d)' }}
          />
        </Field>

        {/* Image upload */}
        <Field label="Reference Image" optional>
          <input
            ref={fileRef}
            name="image"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => onFileChange(e.target.files?.[0]?.name ?? null)}
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="w-full flex flex-col items-center gap-2 rounded-[16px] border border-dashed border-white/15 bg-black px-5 py-5 text-center hover:border-[#0A64BC]/60 hover:bg-[#0A64BC]/5 transition-colors"
          >
            <UploadCloudIcon className="size-6 text-white/30" />
            <span
              className="text-sm truncate max-w-full"
              style={{
                fontFamily: 'var(--font-k2d)',
                color: fileName ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.3)',
              }}
            >
              {fileName ?? 'Click to upload a reference image'}
            </span>
          </button>
        </Field>

        {error && (
          <p className="text-sm text-red-400" style={{ fontFamily: 'var(--font-k2d)' }}>
            {error}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={pending}
          className="mt-1 h-12 rounded-full font-bold text-white text-sm transition-opacity hover:opacity-90 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
          style={{
            fontFamily: 'var(--font-k2d)',
            background: 'linear-gradient(100deg, #0a64bc 5.67%, #4f9ce7 99.53%)',
          }}
        >
          {pending ? 'Sending…' : 'Send Quote Request'}
        </button>
      </form>
    </div>
  )
}

// ── Field wrapper ─────────────────────────────────────────────────────────────
function Field({
  label,
  required,
  optional,
  children,
}: {
  label: string
  required?: boolean
  optional?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        className="text-white/60 text-xs flex gap-1.5 items-center"
        style={{ fontFamily: 'var(--font-k2d)' }}
      >
        {label}
        {required && <span className="text-[#0A64BC]">*</span>}
        {optional && <span className="text-white/30">(optional)</span>}
      </label>
      {children}
    </div>
  )
}
