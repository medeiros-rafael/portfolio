import { useCallback, useRef } from 'react'
import type { CSSProperties, MouseEvent as ReactMouseEvent, ReactNode } from 'react'

import { cn } from '@/lib/cn'

export type SpotlightCardProps = {
  children: ReactNode
  className?: string
  radius?: number
}

export function SpotlightCard({ children, className, radius = 340 }: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((event: ReactMouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return

    const bounds = card.getBoundingClientRect()
    card.style.setProperty('--spotlight-x', `${event.clientX - bounds.left}px`)
    card.style.setProperty('--spotlight-y', `${event.clientY - bounds.top}px`)
  }, [])

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={cn(
        'group elevated relative overflow-hidden rounded-3xl border border-border bg-surface transition-colors duration-500 hover:border-border-strong',
        className,
      )}
      style={{ '--spotlight-x': '50%', '--spotlight-y': '0%' } as CSSProperties}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(${radius}px circle at var(--spotlight-x) var(--spotlight-y), var(--accent-soft), transparent 68%)`,
        }}
      />
      <div className="relative">{children}</div>
    </div>
  )
}
