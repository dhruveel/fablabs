'use client'

import type { HTMLMotionProps } from 'framer-motion'
import { motion } from 'framer-motion'

interface MotionWrapperProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode
}

export function MotionWrapper({ children, ...props }: MotionWrapperProps) {
  return <motion.div {...props}>{children}</motion.div>
}
