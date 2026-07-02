'use client'

import { useEffect, useState } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { ChevronUpIcon } from 'lucide-react'

export function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <m.button
          key="scroll-to-top"
          aria-label="Scroll to top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-24 right-6 z-50 flex size-12 items-center justify-center rounded-full bg-[#0A64BC] text-white shadow-lg hover:bg-[#0851a0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A64BC] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronUpIcon className="size-6" strokeWidth={2.5} />
        </m.button>
      )}
    </AnimatePresence>
  )
}
