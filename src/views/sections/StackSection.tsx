import { Reveal } from '@/components/ui/Reveal'
import { LevelMeter } from '@/components/ui/LevelMeter'
import { Marquee } from '@/components/ui/Marquee'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SpotlightCard } from '@/components/ui/SpotlightCard'
import { useI18n } from '@/controllers/hooks/useI18n'
import { stackGroups, stackMarquee } from '@/models/stack.model'
import type { SkillLevel } from '@/models/stack.model'

const LEGEND: SkillLevel[] = ['expert', 'advanced', 'proficient', 'learning']

export function StackSection() {
  const { t, localize } = useI18n()

  const marqueeItems = stackMarquee.map((tech) => (
    <span
      key={tech}
      className="rounded-full border border-border bg-surface/60 px-4 py-2 font-mono text-[12px] whitespace-nowrap text-fg-muted"
    >
      {tech}
    </span>
  ))

  return (
    <Section id="stack" className="border-t border-border/70">
      <SectionHeading
        marker="02"
        label={t.stack.label}
        title={t.stack.title}
        subtitle={t.stack.subtitle}
      />

      <Reveal className="mt-14" y={16}>
        <Marquee items={marqueeItems} duration={46} />
      </Reveal>

      <div className="mt-14 grid gap-4 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
        {stackGroups.map((group, index) => (
          <Reveal
            key={group.id}
            delay={(index % 3) * 0.08}
            className={index === 3 ? 'md:col-span-2 lg:col-span-2' : undefined}
          >
            <SpotlightCard className="h-full">
              <div className="flex h-full flex-col gap-5 p-6 sm:p-7">
                <div>
                  <p className="font-mono text-[11px] tracking-wide text-accent">{group.marker}</p>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight text-fg">
                    {localize(group.title)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                    {localize(group.description)}
                  </p>
                </div>

                <ul className="mt-auto flex flex-col gap-2.5 border-t border-border pt-5">
                  {group.skills.map((skill) => (
                    <li
                      key={skill.name}
                      className="flex items-center justify-between gap-4 text-[13.5px] text-fg-muted transition-colors duration-300 hover:text-fg"
                    >
                      <span className="font-mono">{skill.name}</span>
                      <LevelMeter level={skill.level} label={t.stack.levels[skill.level]} />
                    </li>
                  ))}
                </ul>
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1} className="mt-10">
        <ul className="flex flex-wrap items-center gap-x-7 gap-y-3">
          {LEGEND.map((level) => (
            <li key={level} className="flex items-center gap-2.5">
              <LevelMeter level={level} label={t.stack.levels[level]} />
              <span className="font-mono text-[11px] tracking-wide text-fg-subtle">
                {t.stack.levels[level]}
              </span>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  )
}
