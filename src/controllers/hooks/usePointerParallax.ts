import { useEffect } from 'react'
import { useMotionValue, useSpring, useTransform } from 'motion/react'
import type { MotionValue } from 'motion/react'

import { usePrefersReducedMotion } from './usePrefersReducedMotion'

export type PointerParallax = {
  /** Raw pointer position, normalized to -0.5 … 0.5 around the viewport center. */
  x: MotionValue<number>
  y: MotionValue<number>
  /** Same values, spring-smoothed — use these for anything visible. */
  smoothX: MotionValue<number>
  smoothY: MotionValue<number>
}

/**
 * Tracks the pointer once for the whole page. Components derive their own
 * displacement from it with `useTransform`, so there is a single listener.
 */
export function usePointerParallax(): PointerParallax {
  const prefersReducedMotion = usePrefersReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const smoothX = useSpring(x, { stiffness: 90, damping: 22, mass: 0.4 })
  const smoothY = useSpring(y, { stiffness: 90, damping: 22, mass: 0.4 })

  useEffect(() => {
    if (prefersReducedMotion) {
      x.set(0)
      y.set(0)
      return
    }

    let frame = 0
    const handlePointerMove = (event: PointerEvent) => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        x.set(event.clientX / window.innerWidth - 0.5)
        y.set(event.clientY / window.innerHeight - 0.5)
      })
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [prefersReducedMotion, x, y])

  return { x, y, smoothX, smoothY }
}

/** Convenience helper: maps the pointer to a pixel offset. */
export function useParallaxOffset(value: MotionValue<number>, distance: number) {
  return useTransform(value, (position) => position * distance)
}
