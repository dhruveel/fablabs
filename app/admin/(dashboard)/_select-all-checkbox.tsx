'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { useRowSelection } from './_row-selection'

export function SelectAllCheckbox() {
  const { selected, pageIds, toggleAll } = useRowSelection()

  const selectedOnPage = pageIds.filter((id) => selected.has(id)).length
  const allSelected = pageIds.length > 0 && selectedOnPage === pageIds.length
  const someSelected = selectedOnPage > 0 && !allSelected

  return (
    <Checkbox
      checked={allSelected}
      indeterminate={someSelected}
      onCheckedChange={toggleAll}
      disabled={pageIds.length === 0}
      aria-label="Select all rows on this page"
    />
  )
}
