'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LogOutIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function LogoutButton() {
  const router = useRouter()
  const [pending, setPending] = useState(false)

  async function handleLogout() {
    setPending(true)
    try {
      await fetch('/api/admin/logout', { method: 'POST' })
      router.push('/admin/login')
      router.refresh()
    } finally {
      setPending(false)
    }
  }

  return (
    <Button
      variant="outline"
      onClick={handleLogout}
      disabled={pending}
      className="w-full justify-start"
    >
      <LogOutIcon />
      {pending ? 'Signing out…' : 'Sign out'}
    </Button>
  )
}
