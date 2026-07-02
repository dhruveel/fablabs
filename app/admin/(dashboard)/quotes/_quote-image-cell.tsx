'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'

export function QuoteImageCell({ src, filename }: { src: string; filename: string }) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="block size-12 overflow-hidden rounded-lg ring-1 ring-border transition-all hover:ring-primary"
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- base64 data URI, next/image adds no value here */}
        <img src={src} alt={filename} className="size-full object-cover" />
      </button>
      <DialogContent className="sm:max-w-lg">
        <DialogTitle className="truncate">{filename}</DialogTitle>
        {/* eslint-disable-next-line @next/next/no-img-element -- base64 data URI, next/image adds no value here */}
        <img src={src} alt={filename} className="w-full rounded-2xl" />
      </DialogContent>
    </Dialog>
  )
}
