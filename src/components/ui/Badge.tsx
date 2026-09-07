import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'

export type BadgeTone = 'neutral' | 'accent' | 'outline'

const TONES: Record<BadgeTone, string> = {
  neutral: 'bg-surface-2 text-fg-muted border-border',
  accent: 'bg-accent-soft text-accent border-accent/30',
  outline: 'bg-transparent text-fg-subtle border-border',
}

export function Badge({
  children,
  tone = 'neutral',
  className,
}: {
  children: ReactNode
  tone?: BadgeTone
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[11px] leading-none tracking-tight',
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
