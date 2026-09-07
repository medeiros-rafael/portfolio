import { useEffect } from 'react'
import { useMotionValue, useSpring, useTransform } from 'motion/react'
import type { MotionValue } from 'motion/react'

import { usePrefersReducedMotion } from './usePrefersReducedMotion'

export type PointerParallax = {
  x: MotionValue<number>
  y: MotionValue<number>
  smoothX: MotionValue<number>
  smoothY: MotionValue<number>
}

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

export function useParallaxOffset(value: MotionValue<number>, distance: number) {
  return useTransform(value, (position) => position * distance)
}
