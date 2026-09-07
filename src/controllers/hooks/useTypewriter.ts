import { useEffect, useState } from 'react'

export type TypewriterOptions = {
  words: string[]
  typeSpeed?: number
  deleteSpeed?: number
  holdDelay?: number
  startDelay?: number
  loop?: boolean
  /** When false the full first word is shown and no timer runs. */
  enabled?: boolean
}

export type TypewriterState = {
  text: string
  wordIndex: number
  isDeleting: boolean
  isTyping: boolean
}

/**
 * Types a word, holds it, erases it and moves to the next one.
 * Every transition is a single timeout, so it stays cheap on mobile.
 */
export function useTypewriter({
  words,
  typeSpeed = 62,
  deleteSpeed = 32,
  holdDelay = 1800,
  startDelay = 350,
  loop = true,
  enabled = true,
}: TypewriterOptions): TypewriterState {
  const [text, setText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    if (!enabled) return
    const timer = window.setTimeout(() => setHasStarted(true), startDelay)
    return () => window.clearTimeout(timer)
  }, [enabled, startDelay])

  useEffect(() => {
    if (!enabled || !hasStarted || words.length === 0) return

    const current = words[wordIndex % words.length]
    const isWordComplete = text === current
    const isWordCleared = text.length === 0

    if (!isDeleting && isWordComplete) {
      const isLastWord = wordIndex === words.length - 1
      if (!loop && isLastWord) return

      const timer = window.setTimeout(() => setIsDeleting(true), holdDelay)
      return () => window.clearTimeout(timer)
    }

    if (isDeleting && isWordCleared) {
      // The typewriter is a timer-driven state machine: the effect *is* the
      // external system here, so advancing to the next word inside it is
      // intentional and cannot be derived during render.
      // oxlint-disable-next-line react/set-state-in-effect
      setIsDeleting(false)
      setWordIndex((index) => (index + 1) % words.length)
      return
    }

    const delay = isDeleting ? deleteSpeed : typeSpeed
    const timer = window.setTimeout(() => {
      setText((value) =>
        isDeleting ? current.slice(0, value.length - 1) : current.slice(0, value.length + 1),
      )
    }, delay)

    return () => window.clearTimeout(timer)
  }, [enabled, hasStarted, words, wordIndex, text, isDeleting, loop, typeSpeed, deleteSpeed, holdDelay])

  if (!enabled) {
    return { text: words[0] ?? '', wordIndex: 0, isDeleting: false, isTyping: false }
  }

  return { text, wordIndex, isDeleting, isTyping: hasStarted }
}
