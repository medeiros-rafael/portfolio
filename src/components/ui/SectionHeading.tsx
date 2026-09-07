import type { ReactNode } from 'react'

import { MonoLabel } from './MonoLabel'
import { Reveal } from './Reveal'
import { cn } from '@/lib/cn'

export type SectionHeadingProps = {
  marker?: string
  label: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  action?: ReactNode
  className?: string
}

export function SectionHeading({
  marker,
  label,
  title,
  subtitle,
  align = 'left',
  action,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between',
        align === 'center' && 'items-center text-center lg:flex-col lg:items-center',
        className,
      )}
    >
      <div className={cn('max-w-3xl', align === 'center' && 'mx-auto')}>
        <Reveal y={16}>
          <MonoLabel marker={marker}>{label}</MonoLabel>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="mt-5 text-4xl font-semibold tracking-[-0.03em] text-balance sm:text-5xl lg:text-6xl xl:text-7xl">
            {title}
          </h2>
        </Reveal>

        {subtitle ? (
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-fg-muted text-pretty sm:text-lg">
              {subtitle}
            </p>
          </Reveal>
        ) : null}
      </div>

      {action ? (
        <Reveal delay={0.2} className="shrink-0">
          {action}
        </Reveal>
      ) : null}
    </div>
  )
}
