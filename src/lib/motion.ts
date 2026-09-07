import type { Transition, Variants } from 'motion/react'

export const easeExpo: [number, number, number, number] = [0.16, 1, 0.3, 1]
export const easeQuint: [number, number, number, number] = [0.83, 0, 0.17, 1]

export const softSpring: Transition = {
  type: 'spring',
  stiffness: 120,
  damping: 20,
  mass: 0.6,
}

export const viewportOnce = { once: true, amount: 0.25 } as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.85, ease: easeExpo },
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7, ease: easeExpo } },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: easeExpo } },
}

export function staggerContainer(stagger = 0.08, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren },
    },
  }
}
