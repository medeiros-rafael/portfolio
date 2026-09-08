import { motion, useMotionValue, useTransform } from 'motion/react'
import type { MotionValue } from 'motion/react'

import { cn } from '@/lib/cn'

export type GlowFieldProps = {
  pointerX?: MotionValue<number>
  pointerY?: MotionValue<number>
  className?: string
  intensity?: number
}

/**
 * Two soft accent halos that drift against the pointer. Section-scoped light,
 * layered on top of the page-wide {@link CodeBackdrop}.
 */
export function GlowField({ pointerX, pointerY, className, intensity = 40 }: GlowFieldProps) {
  const fallbackX = useMotionValue(0)
  const fallbackY = useMotionValue(0)

  const primaryX = useTransform(pointerX ?? fallbackX, (value) => value * intensity)
  const primaryY = useTransform(pointerY ?? fallbackY, (value) => value * intensity)
  const secondaryX = useTransform(pointerX ?? fallbackX, (value) => value * -intensity * 0.6)
  const secondaryY = useTransform(pointerY ?? fallbackY, (value) => value * -intensity * 0.6)

  return (
    <div
      aria-hidden
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
    >
      <motion.div
        style={{ x: primaryX, y: primaryY }}
        className="absolute -top-[22%] left-[10%] size-[46rem] max-w-[95vw] rounded-full bg-[radial-gradient(circle_at_center,var(--glow),transparent_70%)] opacity-80 blur-[110px]"
      />

      <motion.div
        style={{ x: secondaryX, y: secondaryY }}
        className="absolute right-[4%] bottom-[-18%] size-[38rem] max-w-[95vw] rounded-full bg-[radial-gradient(circle_at_center,var(--accent-soft),transparent_72%)] opacity-70 blur-[120px]"
      />
    </div>
  )
}
