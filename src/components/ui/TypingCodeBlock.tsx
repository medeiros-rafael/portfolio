import { useRef } from 'react'
import { useInView } from 'motion/react'

import { CodeBlock } from './CodeBlock'
import type { CodeBlockProps } from './CodeBlock'
import { usePrefersReducedMotion } from '@/controllers/hooks/usePrefersReducedMotion'
import { useTypewriter } from '@/controllers/hooks/useTypewriter'

export type TypingCodeBlockProps = Omit<CodeBlockProps, 'ghostCode' | 'caret'> & {
  /** Milliseconds per character. */
  speed?: number
  startDelay?: number
}

/**
 * Writes a snippet character by character the first time it scrolls into view,
 * keeping the final height reserved so nothing below it jumps.
 */
export function TypingCodeBlock({ code, speed = 12, startDelay = 300, ...rest }: TypingCodeBlockProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.35 })
  const prefersReducedMotion = usePrefersReducedMotion()

  const { text } = useTypewriter({
    words: [code],
    typeSpeed: speed,
    startDelay,
    loop: false,
    enabled: isInView && !prefersReducedMotion,
  })

  const visibleCode = prefersReducedMotion ? code : isInView ? text : ''
  const isComplete = visibleCode === code

  return (
    <div ref={containerRef}>
      <CodeBlock {...rest} code={visibleCode} ghostCode={code} caret={!isComplete} />
    </div>
  )
}
