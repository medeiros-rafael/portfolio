import { useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react'

import { Icon } from '@/components/icons/Icon'
import { Button } from '@/components/ui/Button'
import { FlipCard } from '@/components/ui/FlipCard'
import { GlowField } from '@/components/ui/GlowField'
import { TypingCodeBlock } from '@/components/ui/TypingCodeBlock'
import { Typewriter } from '@/components/ui/Typewriter'
import { useI18n } from '@/controllers/hooks/useI18n'
import { usePointerParallax } from '@/controllers/hooks/usePointerParallax'
import { usePrefersReducedMotion } from '@/controllers/hooks/usePrefersReducedMotion'
import { easeExpo } from '@/lib/motion'
import { heroBack, heroFront, heroStats } from '@/models/hero.model'
import { profile } from '@/models/profile.model'

function FaceTag({ label }: { label: string }) {
  return (
    <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-wide text-fg-subtle">
      <Icon name="Rotate3d" size={12} />
      {label}
    </span>
  )
}

export function HeroSection() {
  const { t, localize, language } = useI18n()
  const prefersReducedMotion = usePrefersReducedMotion()
  const { smoothX, smoothY } = usePointerParallax()
  const [isCardFlipped, setIsCardFlipped] = useState(false)

  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const cardY = useTransform(scrollYProgress, [0, 1], [0, 220])

  const tiltX = useTransform(smoothX, (value) => value * 26)
  const tiltY = useTransform(smoothY, (value) => value * 18)

  const [firstName, ...restName] = profile.name.split(' ')
  const lastName = restName[restName.length - 1]

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-[100svh] w-full items-center overflow-hidden pt-28 pb-20 md:pt-[72px] md:pb-0"
    >
      <GlowField pointerX={smoothX} pointerY={smoothY} intensity={46} />

      <div className="relative mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-14 px-6 sm:px-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16 lg:px-16 2xl:px-24">
        <motion.div
          style={prefersReducedMotion ? undefined : { y: contentY, opacity: contentOpacity }}
          className="relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeExpo }}
            className="inline-flex items-center gap-2.5 rounded-full border border-accent/25 bg-accent-soft px-3.5 py-1.5"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            <span className="font-mono text-[11px] tracking-wide text-accent">
              {t.hero.availability}
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.06, ease: easeExpo }}
            className="mt-8 font-mono text-sm text-fg-subtle"
          >
            {t.hero.greeting}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 26, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.95, delay: 0.12, ease: easeExpo }}
            className="mt-2 text-[clamp(2.75rem,8.5vw,7rem)] leading-[0.92] font-semibold tracking-[-0.045em]"
          >
            <span className="block">{firstName}</span>
            <span className="text-gradient-metal block">{lastName}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.24, ease: easeExpo }}
            className="mt-6 flex flex-wrap items-baseline gap-2 font-mono text-base text-fg-muted sm:text-lg"
          >
            <span className="text-accent">$</span>
            <Typewriter words={t.hero.typedRoles} className="text-fg" />
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.32, ease: easeExpo }}
            className="mt-7 max-w-xl text-base leading-relaxed text-fg-muted text-pretty sm:text-lg"
          >
            {t.hero.subheadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: easeExpo }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Button href="#projects" size="lg" iconRight={<Icon name="ArrowRight" size={17} />}>
              {t.hero.primaryCta}
            </Button>
            <Button href="#contact" size="lg" variant="secondary">
              {t.hero.secondaryCta}
            </Button>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.55, ease: easeExpo }}
            className="mt-12 grid max-w-xl grid-cols-3 gap-6 border-t border-border pt-7"
          >
            {heroStats.map((stat) => (
              <div key={stat.id}>
                <dt className="numeric text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-xs leading-snug text-fg-subtle sm:text-[13px]">
                  {localize(stat.label)}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <motion.div
          style={
            prefersReducedMotion
              ? undefined
              : { y: cardY, x: tiltX, rotateX: tiltY, transformPerspective: 1400 }
          }
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.3, ease: easeExpo }}
          className="relative z-10"
        >
          <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-[radial-gradient(circle_at_30%_20%,var(--accent-soft),transparent_65%)] blur-2xl" />

          <FlipCard
            flipped={isCardFlipped}
            onToggle={() => setIsCardFlipped((flipped) => !flipped)}
            label={t.hero.flipAria}
            flippedLabel={t.hero.flipAriaActive}
            front={
              <TypingCodeBlock
                key={`front-${language}`}
                code={localize(heroFront.code)}
                language="ts"
                filename={heroFront.filename}
                speed={16}
                startDelay={900}
                className="h-full backdrop-blur-sm"
                headerExtra={<FaceTag label={t.hero.frontFace} />}
              />
            }
            back={
              <TypingCodeBlock
                key={`back-${language}-${isCardFlipped}`}
                code={localize(heroBack.code)}
                language="ts"
                filename={heroBack.filename}
                speed={12}
                startDelay={220}
                className="h-full backdrop-blur-sm"
                headerExtra={<FaceTag label={t.hero.backFace} />}
              />
            }
          />

          <p
            aria-hidden
            className="mt-3 flex items-center justify-end gap-1.5 font-mono text-[10px] tracking-wide text-fg-subtle"
          >
            <Icon name={isCardFlipped ? 'Undo2' : 'Rotate3d'} size={12} />
            {isCardFlipped ? t.hero.flipHintActive : t.hero.flipHint}
          </p>

          <div className="mt-4 flex min-h-9 flex-wrap gap-2">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isCardFlipped ? 'back' : 'front'}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.32, ease: easeExpo }}
                className="flex flex-wrap gap-2"
              >
                {(isCardFlipped ? heroBack.chips : heroFront.chips).map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-border bg-surface/60 px-3 py-1.5 font-mono text-[11px] text-fg-muted"
                  >
                    {tech}
                  </span>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        style={prefersReducedMotion ? undefined : { opacity: contentOpacity }}
        className="absolute inset-x-0 bottom-7 mx-auto hidden w-fit flex-col items-center gap-2 text-fg-subtle transition-colors hover:text-accent md:flex"
      >
        <span className="font-mono text-[10px] tracking-[0.28em] uppercase">
          {t.common.scrollHint}
        </span>
        <motion.span
          animate={prefersReducedMotion ? undefined : { y: [0, 7, 0] }}
          transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Icon name="ArrowDown" size={16} />
        </motion.span>
      </motion.a>
    </section>
  )
}
