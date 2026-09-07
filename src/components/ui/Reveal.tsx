import type { ReactNode } from 'react'
import { motion } from 'motion/react'

import { usePrefersReducedMotion } from '@/controllers/hooks/usePrefersReducedMotion'
import { easeExpo } from '@/lib/motion'

export type RevealProps = {
  children: ReactNode
  delay?: number
  y?: number
  blur?: boolean
  className?: string
  once?: boolean
  amount?: number
}

/** Scroll-triggered entrance used by every section. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  blur = true,
  className,
  once = true,
  amount = 0.3,
}: RevealProps) {
  const prefersReducedMotion = usePrefersReducedMotion()

  if (prefersReducedMotion) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: blur ? 'blur(8px)' : 'blur(0px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once, amount }}
      transition={{ duration: 0.85, delay, ease: easeExpo }}
    >
      {children}
    </motion.div>
  )
}
