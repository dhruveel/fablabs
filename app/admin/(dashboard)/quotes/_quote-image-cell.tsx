'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'

export function QuoteImageCell({ src, filename }: { src: string; filename: string }) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="relative block size-12 overflow-hidden rounded-lg ring-1 ring-border transition-all hover:ring-primary"
      >
        {/* unoptimized: authenticated endpoint — next/image's optimizer fetches
            server-side without our session cookie, so it must skip the proxy
            and let the browser request the src directly (same as a plain img). */}
        <Image src={src} alt={filename} fill unoptimized className="object-cover" />
      </button>
      <DialogContent className="sm:max-w-lg">
        <DialogTitle className="truncate">{filename}</DialogTitle>
        {/* Deliberately still a plain <img>, not next/image: this renders at
            the upload's natural aspect ratio (w-full, height auto), which
            varies per quote and isn't stored anywhere to pass as width/height.
            next/image requires either fill (needs a definite-height parent —
            not available here) or known width/height; either would force a
            crop or distortion on uploads that don't match. Also, same as
            above, it's behind an authenticated endpoint. */}
        {/* eslint-disable-next-line @next/next/no-img-element -- see comment above */}
        <img src={src} alt={filename} className="w-full rounded-2xl" />
      </DialogContent>
    </Dialog>
  )
}
