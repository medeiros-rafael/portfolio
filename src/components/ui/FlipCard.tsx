import type { KeyboardEvent as ReactKeyboardEvent, ReactNode } from 'react'
import { motion } from 'motion/react'

import { usePrefersReducedMotion } from '@/controllers/hooks/usePrefersReducedMotion'
import { cn } from '@/lib/cn'

export type FlipCardProps = {
  front: ReactNode
  back: ReactNode
  flipped: boolean
  onToggle: () => void
  label: string
  flippedLabel: string
  className?: string
}

export function FlipCard({
  front,
  back,
  flipped,
  onToggle,
  label,
  flippedLabel,
  className,
}: FlipCardProps) {
  const prefersReducedMotion = usePrefersReducedMotion()

  const handleToggle = () => {
    const selection = window.getSelection()?.toString()

    if (selection && selection.length > 0) 
      return

    onToggle()
  }

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') 
      return

    event.preventDefault()
    
    onToggle()
  }

  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      aria-label={flipped ? flippedLabel : label}
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      animate={{ rotateY: flipped ? 180 : 0 }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { type: 'spring', stiffness: 70, damping: 16, mass: 1 }
      }
      style={{ transformPerspective: 1800, transformStyle: 'preserve-3d' }}
      className={cn(
        'relative cursor-pointer rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]',
        className,
      )}
    >
      <div className="[backface-visibility:hidden] [transform:translateZ(1px)]">{front}</div>

      <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)_translateZ(1px)]">
        {back}
      </div>
    </motion.div>
  )
}
