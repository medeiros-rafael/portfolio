import { cn } from '@/lib/cn'
import { usePrefersReducedMotion } from '@/controllers/hooks/usePrefersReducedMotion'
import { useTypewriter } from '@/controllers/hooks/useTypewriter'

export type TypewriterProps = {
  words: string[]
  className?: string
  caretClassName?: string
  typeSpeed?: number
  deleteSpeed?: number
  holdDelay?: number
  startDelay?: number
  loop?: boolean
  showCaret?: boolean
}

/**
 * Types and erases a list of words. When the visitor prefers reduced motion the
 * first word is rendered statically and no timer is ever scheduled.
 */
export function Typewriter({
  words,
  className,
  caretClassName,
  typeSpeed,
  deleteSpeed,
  holdDelay,
  startDelay,
  loop = true,
  showCaret = true,
}: TypewriterProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const { text } = useTypewriter({
    words,
    typeSpeed,
    deleteSpeed,
    holdDelay,
    startDelay,
    loop,
    enabled: !prefersReducedMotion,
  })

  return (
    <span className={cn('inline', className)}>
      <span className="sr-only">{words.join(' · ')}</span>
      <span aria-hidden>{text}</span>
      {showCaret ? <span aria-hidden className={cn('caret ml-1', caretClassName)} /> : null}
    </span>
  )
}
