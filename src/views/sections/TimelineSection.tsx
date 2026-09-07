import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'

import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { useI18n } from '@/controllers/hooks/useI18n'
import { timeline } from '@/models/timeline.model'
import { TimelineItem } from './parts/TimelineItem'

export function TimelineSection() {
  const { t } = useI18n()
  const listRef = useRef<HTMLOListElement>(null)

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start 65%', 'end 65%'],
  })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 })

  return (
    <Section id="timeline" className="border-t border-border/70">
      <SectionHeading
        marker="04"
        label={t.timeline.label}
        title={t.timeline.title}
        subtitle={t.timeline.subtitle}
      />

      <div className="mt-16 lg:mt-24">
        <ol ref={listRef} className="relative">
          <span aria-hidden className="absolute inset-y-0 left-0 w-px bg-border" />
          <motion.span
            aria-hidden
            style={{ scaleY: progress }}
            className="absolute inset-y-0 left-0 w-px origin-top bg-accent"
          />

          {timeline.map((entry, index) => (
            <TimelineItem key={entry.id} entry={entry} index={index} />
          ))}
        </ol>
      </div>
    </Section>
  )
}
