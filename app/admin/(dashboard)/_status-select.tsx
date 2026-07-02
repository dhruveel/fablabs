'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { LEAD_STATUSES, LEAD_STATUS_LABELS, type LeadStatus } from '@/lib/constants/lead-status'
import { cn } from '@/lib/utils'

const STATUS_STYLES: Record<LeadStatus, string> = {
  talking: 'bg-blue-500/15 text-blue-400',
  ordered: 'bg-amber-500/15 text-amber-400',
  completed: 'bg-emerald-500/15 text-emerald-400',
  cold: 'bg-slate-500/15 text-slate-400',
}

export function StatusSelect({
  resource,
  id,
  status,
}: {
  resource: 'contacts' | 'quotes'
  id: string
  status: LeadStatus | null
}) {
  const router = useRouter()
  const [pending, setPending] = useState(false)

  async function handleChange(value: string | null) {
    const nextStatus = value === 'none' ? null : (value as LeadStatus)
    setPending(true)
    try {
      const res = await fetch(`/api/admin/${resource}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      })
      if (res.ok) router.refresh()
    } finally {
      setPending(false)
    }
  }

  return (
    <Select value={status ?? 'none'} onValueChange={handleChange} disabled={pending}>
      <SelectTrigger
        size="sm"
        className={cn('font-medium', status ? STATUS_STYLES[status] : 'text-muted-foreground')}
      >
        <SelectValue>
          {(value: string | null) =>
            !value || value === 'none' ? 'Untagged' : LEAD_STATUS_LABELS[value as LeadStatus]
          }
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="none">Untagged</SelectItem>
        {LEAD_STATUSES.map((s) => (
          <SelectItem key={s} value={s}>
            {LEAD_STATUS_LABELS[s]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
