import { useRef } from 'react'
import { motion, useInView } from 'motion/react'

import { Icon } from '@/components/icons/Icon'
import type { IconName } from '@/components/icons/icons.data'
import { useI18n } from '@/controllers/hooks/useI18n'
import { cn } from '@/lib/cn'
import { easeExpo } from '@/lib/motion'
import type { TimelineEntry, TimelineKind } from '@/models/timeline.model'

const KIND_ICON: Record<TimelineKind, IconName> = {
  work: 'Briefcase',
  education: 'GraduationCap',
  certification: 'Award',
}

export function TimelineItem({ entry, index }: { entry: TimelineEntry; index: number }) {
  const { t, localize } = useI18n()
  const itemRef = useRef<HTMLLIElement>(null)
  const isInView = useInView(itemRef, { once: true, amount: 0.4 })

  const achievements = localize(entry.achievements)

  return (
    <li ref={itemRef} className="relative pb-14 pl-10 last:pb-0 sm:pl-14">
      <motion.span
        aria-hidden
        initial={{ scale: 0.4, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : undefined}
        transition={{ duration: 0.5, ease: easeExpo }}
        className={cn(
          'absolute top-1 left-0 grid size-8 -translate-x-1/2 place-items-center rounded-full border transition-colors duration-500',
          isInView
            ? 'border-accent/40 bg-accent-soft text-accent'
            : 'border-border bg-surface text-fg-subtle',
        )}
      >
        <Icon name={KIND_ICON[entry.kind]} size={14} />
      </motion.span>

      <motion.div
        initial={{ opacity: 0, y: 26, filter: 'blur(6px)' }}
        animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : undefined}
        transition={{ duration: 0.8, delay: 0.05 + index * 0.03, ease: easeExpo }}
      >
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="font-mono text-xs tracking-wide text-accent">
            {localize(entry.period)}
          </span>
          <span className="h-px w-6 bg-border-strong" />
          <span className="font-mono text-[11px] tracking-wide text-fg-subtle uppercase">
            {t.timeline.kinds[entry.kind]}
          </span>
          {entry.isCurrent ? (
            <span className="flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent-soft px-2.5 py-0.5 font-mono text-[10px] text-accent">
              <span className="size-1.5 rounded-full bg-accent" />
              {t.timeline.current}
            </span>
          ) : null}
        </div>

        <h3 className="mt-4 text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
          {localize(entry.title)}
        </h3>
        <p className="mt-1.5 text-sm font-medium text-fg-muted">{entry.organization}</p>

        <p className="mt-4 max-w-2xl text-base leading-relaxed text-fg-muted text-pretty">
          {localize(entry.description)}
        </p>

        {achievements.length > 0 ? (
          <ul className="mt-5 max-w-2xl space-y-2.5">
            {achievements.map((achievement) => (
              <li key={achievement} className="flex gap-3 text-[15px] leading-relaxed text-fg-muted">
                <Icon name="Check" size={15} className="mt-1 shrink-0 text-accent" />
                <span>{achievement}</span>
              </li>
            ))}
          </ul>
        ) : null}

        {entry.tags.length > 0 ? (
          <ul className="mt-6 flex flex-wrap gap-2">
            {entry.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-border bg-surface/60 px-3 py-1 font-mono text-[11px] text-fg-subtle"
              >
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
      </motion.div>
    </li>
  )
}
