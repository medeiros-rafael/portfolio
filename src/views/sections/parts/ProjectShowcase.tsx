import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

import { Icon } from '@/components/icons/Icon'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { TypingCodeBlock } from '@/components/ui/TypingCodeBlock'
import { useI18n } from '@/controllers/hooks/useI18n'
import { usePrefersReducedMotion } from '@/controllers/hooks/usePrefersReducedMotion'
import { cn } from '@/lib/cn'
import type { Project } from '@/models/project.model'

type Block = { id: string; label: string; body: string }

export function ProjectShowcase({ project, index }: { project: Project; index: number }) {
  const { t, localize, language } = useI18n()
  const prefersReducedMotion = usePrefersReducedMotion()
  const isReversed = index % 2 === 1

  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const visualY = useTransform(scrollYProgress, [0, 1], [50, -50])
  const markerOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const blocks: Block[] = [
    { id: 'problem', label: t.projects.problem, body: localize(project.problem) },
    { id: 'solution', label: t.projects.solution, body: localize(project.solution) },
    { id: 'outcome', label: t.projects.outcome, body: localize(project.outcome) },
  ]

  return (
    <article
      ref={sectionRef}
      className="relative border-t border-border/70 py-20 first:border-t-0 md:py-28"
    >
      <motion.span
        aria-hidden
        style={prefersReducedMotion ? undefined : { opacity: markerOpacity }}
        className="pointer-events-none absolute top-10 right-6 font-mono text-[16vw] leading-none font-bold text-fg/[0.03] select-none md:right-10 lg:right-16 lg:text-[12vw]"
      >
        {project.marker}
      </motion.span>

      <div className="relative mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-12 px-6 sm:px-10 lg:grid-cols-12 lg:gap-16 lg:px-16 2xl:px-24">
        <div
          className={cn(
            'lg:col-span-5 xl:col-span-5',
            isReversed ? 'lg:order-2 lg:col-start-8' : 'lg:order-1',
          )}
        >
          <div className="lg:sticky lg:top-28">
            <Reveal y={18}>
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-accent">{project.marker}</span>
                <span className="h-px w-8 bg-border-strong" />
                <span className="font-mono text-[11px] tracking-wide text-fg-subtle">
                  {localize(project.category)}
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <h3 className="mt-5 text-4xl font-semibold tracking-[-0.035em] text-balance sm:text-5xl lg:text-6xl">
                {project.name}
              </h3>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-5 text-lg leading-relaxed text-fg-muted text-pretty">
                {localize(project.tagline)}
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <motion.div
                style={prefersReducedMotion ? undefined : { y: visualY }}
                className="mt-8"
              >
                <TypingCodeBlock
                  key={`${project.id}-${language}`}
                  code={project.snippet.code}
                  language={project.snippet.language}
                  filename={project.snippet.filename}
                  speed={10}
                />
              </motion.div>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                {project.links.map((link) =>
                  link.kind === 'private' ? (
                    <Badge key={link.kind} tone="outline" className="h-11 px-4">
                      <Icon name="Lock" size={13} />
                      {t.projects.privateCode}
                    </Badge>
                  ) : (
                    <Button
                      key={link.href}
                      href={link.href}
                      variant={link.kind === 'live' ? 'primary' : 'secondary'}
                      iconRight={<Icon name="ArrowUpRight" size={16} />}
                    >
                      {localize(link.label)}
                    </Button>
                  ),
                )}
              </div>
            </Reveal>
          </div>
        </div>

        <div
          className={cn(
            'lg:col-span-6 xl:col-span-6',
            isReversed ? 'lg:order-1 lg:col-start-1' : 'lg:order-2 lg:col-start-7',
          )}
        >
          <Reveal>
            <p className="text-xl leading-relaxed text-fg text-pretty sm:text-2xl">
              {localize(project.summary)}
            </p>
          </Reveal>

          <dl className="mt-12 space-y-10">
            {blocks.map((block, blockIndex) => (
              <Reveal key={block.id} delay={blockIndex * 0.06}>
                <div className="border-t border-border pt-6">
                  <dt className="font-mono text-[11px] tracking-[0.2em] text-accent uppercase">
                    {block.label}
                  </dt>
                  <dd className="mt-3 text-base leading-relaxed text-fg-muted text-pretty sm:text-lg">
                    {block.body}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>

          <Reveal delay={0.1}>
            <div className="mt-12 grid grid-cols-2 gap-6 border-t border-border pt-8">
              {project.metrics.map((metric) => (
                <div key={metric.value}>
                  <p className="numeric text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
                    {metric.value}
                  </p>
                  <p className="mt-1.5 text-[13px] leading-snug text-fg-subtle">
                    {localize(metric.label)}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-10">
              <p className="font-mono text-[11px] tracking-[0.2em] text-fg-subtle uppercase">
                {t.projects.stack}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-border bg-surface/60 px-3.5 py-1.5 font-mono text-[11.5px] text-fg-muted transition-colors duration-300 hover:border-accent/50 hover:text-fg"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </article>
  )
}
