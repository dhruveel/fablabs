'use client'

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'

interface RowSelectionContextValue {
  selected: Set<string>
  pageIds: string[]
  toggle: (id: string) => void
  toggleAll: () => void
  clear: () => void
}

const RowSelectionContext = createContext<RowSelectionContextValue | null>(null)

export function RowSelectionProvider({
  pageIds,
  children,
}: {
  pageIds: string[]
  children: ReactNode
}) {
  const [selected, setSelected] = useState<Set<string>>(new Set())

  // Drop selections for rows no longer on the page (e.g. after a delete or
  // navigating to a different page) so stale ids don't linger silently. Pruning
  // during render (rather than in an effect) avoids an extra cascading render.
  const pageKey = pageIds.join(',')
  const [prevPageKey, setPrevPageKey] = useState(pageKey)
  if (pageKey !== prevPageKey) {
    setPrevPageKey(pageKey)
    const pruned = new Set([...selected].filter((id) => pageIds.includes(id)))
    if (pruned.size !== selected.size) setSelected(pruned)
  }

  const value = useMemo<RowSelectionContextValue>(
    () => ({
      selected,
      pageIds,
      toggle: (id) =>
        setSelected((prev) => {
          const next = new Set(prev)
          if (next.has(id)) next.delete(id)
          else next.add(id)
          return next
        }),
      toggleAll: () =>
        setSelected((prev) => {
          const allSelected = pageIds.length > 0 && pageIds.every((id) => prev.has(id))
          return allSelected ? new Set() : new Set(pageIds)
        }),
      clear: () => setSelected(new Set()),
    }),
    [selected, pageIds],
  )

  return <RowSelectionContext.Provider value={value}>{children}</RowSelectionContext.Provider>
}

export function useRowSelection() {
  const ctx = useContext(RowSelectionContext)
  if (!ctx) throw new Error('useRowSelection must be used within a RowSelectionProvider')
  return ctx
}
