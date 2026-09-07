import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'
import type { SectionId } from '@/models/common.model'

export type SectionProps = {
  id: SectionId
  children: ReactNode
  className?: string
  containerClassName?: string
  fullHeight?: boolean
}

export function Section({
  id,
  children,
  className,
  containerClassName,
  fullHeight = true,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'relative w-full scroll-mt-24 overflow-hidden',
        fullHeight ? 'flex min-h-screen items-center py-24 md:py-28' : 'py-24 md:py-32',
        className,
      )}
    >
      <div
        className={cn(
          'mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-16 2xl:px-24',
          containerClassName,
        )}
      >
        {children}
      </div>
    </section>
  )
}
