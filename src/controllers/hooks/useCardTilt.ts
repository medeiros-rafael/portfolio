import { useCallback } from 'react'
import { useMotionValue, useSpring } from 'motion/react'
import type { PointerEvent as ReactPointerEvent } from 'react'

import { usePrefersReducedMotion } from './usePrefersReducedMotion'

/**
 * Subtle 3D tilt driven by the pointer position inside the element itself.
 * Returns motion values plus the two handlers the element needs.
 */
export function useCardTilt(maxDegrees = 7) {
  const prefersReducedMotion = usePrefersReducedMotion()

  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)

  const springConfig = { stiffness: 150, damping: 18, mass: 0.4 }
  const smoothRotateX = useSpring(rotateX, springConfig)
  const smoothRotateY = useSpring(rotateY, springConfig)

  const onPointerMove = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      if (prefersReducedMotion) return

      const bounds = event.currentTarget.getBoundingClientRect()
      const offsetX = (event.clientX - bounds.left) / bounds.width - 0.5
      const offsetY = (event.clientY - bounds.top) / bounds.height - 0.5

      rotateY.set(offsetX * maxDegrees * 2)
      rotateX.set(-offsetY * maxDegrees * 2)
    },
    [maxDegrees, prefersReducedMotion, rotateX, rotateY],
  )

  const onPointerLeave = useCallback(() => {
    rotateX.set(0)
    rotateY.set(0)
  }, [rotateX, rotateY])

  return {
    style: prefersReducedMotion
      ? undefined
      : { rotateX: smoothRotateX, rotateY: smoothRotateY, transformPerspective: 1000 },
    handlers: { onPointerMove, onPointerLeave },
  }
}
