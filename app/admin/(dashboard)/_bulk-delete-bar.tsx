'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2Icon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useRowSelection } from './_row-selection'

export function BulkDeleteBar({ resource }: { resource: 'contacts' | 'quotes' }) {
  const router = useRouter()
  const { selected, clear } = useRowSelection()
  const [pending, setPending] = useState(false)
  const [open, setOpen] = useState(false)

  if (selected.size === 0) return null

  async function handleDelete() {
    setPending(true)
    try {
      const res = await fetch(`/api/admin/${resource}/bulk-delete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: [...selected] }),
      })
      if (res.ok) {
        setOpen(false)
        clear()
        router.refresh()
      }
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl bg-muted px-4 py-3">
      <span className="text-sm font-medium">
        {selected.size} {selected.size === 1 ? 'entry' : 'entries'} selected
      </span>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger render={<Button variant="destructive" size="sm" />}>
          <Trash2Icon />
          Delete selected
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {selected.size} entries?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the selected submissions. This can&apos;t be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={pending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {pending ? 'Deleting…' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
