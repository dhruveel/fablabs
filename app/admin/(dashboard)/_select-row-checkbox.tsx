'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { useRowSelection } from './_row-selection'

export function SelectRowCheckbox({ id, name }: { id: string; name: string }) {
  const { selected, toggle } = useRowSelection()

  return (
    <Checkbox
      checked={selected.has(id)}
      onCheckedChange={() => toggle(id)}
      aria-label={`Select entry from ${name}`}
    />
  )
}
