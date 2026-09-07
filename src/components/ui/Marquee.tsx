import type { ReactNode } from 'react'

import { usePrefersReducedMotion } from '@/controllers/hooks/usePrefersReducedMotion'
import { cn } from '@/lib/cn'

export type MarqueeProps = {
  items: ReactNode[]
  duration?: number
  reverse?: boolean
  className?: string
}

export function Marquee({ items, duration = 42, reverse = false, className }: MarqueeProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const track = prefersReducedMotion ? items : [...items, ...items]

  return (
    <div className={cn('group mask-fade-x relative overflow-hidden', className)}>
      <div
        className={cn(
          'flex items-center gap-3 group-hover:[animation-play-state:paused]',
          prefersReducedMotion ? 'flex-wrap' : 'w-max',
        )}
        style={
          prefersReducedMotion
            ? undefined
            : {
                animation: `marquee ${duration}s linear infinite`,
                animationDirection: reverse ? 'reverse' : 'normal',
              }
        }
      >
        {track.map((item, index) => (
          <span key={index} className="shrink-0">
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
