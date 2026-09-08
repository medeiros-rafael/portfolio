import { useState } from 'react'
import { motion, useMotionValueEvent, useScroll, useTransform } from 'motion/react'

import { usePrefersReducedMotion } from '@/controllers/hooks/usePrefersReducedMotion'

/** Height of one "line of code" — must match --code-line in globals.css. */
const LINE_HEIGHT = 30

/** Lines rendered in the gutter: enough to cover a tall viewport plus bleed. */
const VISIBLE_LINES = 54

/** Bleed above and below the viewport, kept a multiple of LINE_HEIGHT so the
 *  baselines and the gutter numbers stay locked to the same rhythm. */
const BLEED = LINE_HEIGHT * 2

/**
 * Page-wide backdrop with the texture of a code editor: horizontal baselines
 * on a fixed rhythm and a numbered gutter that scrolls with the document,
 * finished with a film grain that keeps large flat areas from looking dead.
 *
 * It is a single fixed layer behind the whole site, not a per-section
 * decoration, so the page keeps its depth below the fold.
 */
export function CodeBackdrop() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const { scrollY } = useScroll()
  const [firstLine, setFirstLine] = useState(1)

  const offsetY = useTransform(scrollY, (value) =>
    prefersReducedMotion ? 0 : -(value % LINE_HEIGHT),
  )

  useMotionValueEvent(scrollY, 'change', (value) => {
    if (prefersReducedMotion) return
    const next = Math.floor(value / LINE_HEIGHT) + 1
    setFirstLine((current) => (current === next ? current : next))
  })

  /* The layer bleeds BLEED px above the viewport, so the first number the
     visitor actually sees at the top of the screen is `firstLine`. */
  const topLine = firstLine - BLEED / LINE_HEIGHT

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        style={{ y: offsetY, top: -BLEED, bottom: -BLEED }}
        className="bg-code-rhythm mask-fade-y absolute inset-x-0"
      />

      <div className="mask-fade-y absolute inset-y-0 left-0 hidden w-16 lg:block 2xl:w-24">
        <motion.ul
          style={{ y: offsetY, top: -BLEED, color: 'var(--gutter-fg)' }}
          className="numeric absolute right-0 left-0 pr-3 text-right font-mono text-[10px] leading-[30px] tracking-tight"
        >
          {Array.from({ length: VISIBLE_LINES }, (_, index) => {
            const line = topLine + index
            return (
              <li key={line} className="h-[30px]">
                {line < 1 ? null : String(line).padStart(2, '0')}
              </li>
            )
          })}
        </motion.ul>

        <div
          className="absolute inset-y-0 right-0 w-px"
          style={{ backgroundColor: 'var(--gutter-line)' }}
        />
      </div>

      <div className="grain absolute inset-0" />
    </div>
  )
}
