import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

import { Icon } from '@/components/icons/Icon'
import type { IconName } from '@/components/icons/icons.data'
import { AvatarCard } from '@/components/ui/AvatarCard'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SpotlightCard } from '@/components/ui/SpotlightCard'
import { useI18n } from '@/controllers/hooks/useI18n'
import { usePrefersReducedMotion } from '@/controllers/hooks/usePrefersReducedMotion'
import { profile } from '@/models/profile.model'

const HIGHLIGHT_ICONS: IconName[] = ['Layers', 'Zap', 'Award']

export function AboutSection() {
  const { t } = useI18n()
  const prefersReducedMotion = usePrefersReducedMotion()

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })
  const asideY = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <Section id="about" className="border-t border-border/70">
      <SectionHeading marker="01" label={t.about.label} title={t.about.title} />

      <div
        ref={containerRef}
        className="mt-16 grid grid-cols-1 gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-16"
      >
        <motion.aside
          style={prefersReducedMotion ? undefined : { y: asideY }}
          className="lg:col-span-5 xl:col-span-4"
        >
          <Reveal y={32}>
            <AvatarCard />
          </Reveal>

          <Reveal delay={0.12} className="mt-6 flex flex-wrap gap-3">
            <Button
              href={profile.resumeUrl}
              variant="secondary"
              download
              iconLeft={<Icon name="Download" size={16} />}
            >
              {t.common.downloadResume}
            </Button>
            <Button
              href={profile.socials[0].href}
              variant="ghost"
              iconRight={<Icon name="ArrowUpRight" size={16} />}
            >
              GitHub
            </Button>
          </Reveal>
        </motion.aside>

        <div className="lg:col-span-7 xl:col-span-8">
          <div className="space-y-6">
            {t.about.paragraphs.map((paragraph, index) => (
              <Reveal key={index} delay={index * 0.08}>
                <p
                  className={
                    index === 0
                      ? 'text-xl leading-relaxed text-fg text-pretty sm:text-2xl'
                      : 'text-base leading-relaxed text-fg-muted text-pretty sm:text-lg'
                  }
                >
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {t.about.highlights.map((highlight, index) => (
              <Reveal key={highlight.title} delay={0.1 + index * 0.08}>
                <SpotlightCard className="h-full">
                  <div className="flex h-full flex-col gap-3 p-6">
                    <span className="grid size-10 place-items-center rounded-xl border border-border bg-surface-2 text-accent">
                      <Icon name={HIGHLIGHT_ICONS[index]} size={18} />
                    </span>
                    <h3 className="text-base font-semibold tracking-tight text-fg">
                      {highlight.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-fg-muted">{highlight.description}</p>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
