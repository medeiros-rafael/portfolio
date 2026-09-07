import { Icon } from '@/components/icons/Icon'
import type { IconName } from '@/components/icons/icons.data'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SpotlightCard } from '@/components/ui/SpotlightCard'
import { useI18n } from '@/controllers/hooks/useI18n'
import { processSteps, services } from '@/models/service.model'
import type { ServiceIcon } from '@/models/service.model'

const SERVICE_ICON: Record<ServiceIcon, IconName> = {
  globe: 'Globe',
  smartphone: 'Smartphone',
  database: 'Database',
  gauge: 'Gauge',
}

export function ServicesSection() {
  const { t, localize } = useI18n()

  return (
    <Section id="services" className="border-t border-border/70">
      <SectionHeading
        marker="05"
        label={t.services.label}
        title={t.services.title}
        subtitle={t.services.subtitle}
      />

      <div className="mt-14 grid gap-4 md:grid-cols-2 lg:mt-20">
        {services.map((service, index) => (
          <Reveal key={service.id} delay={(index % 2) * 0.08}>
            <SpotlightCard className="h-full">
              <div className="flex h-full flex-col gap-5 p-7 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <span className="grid size-11 place-items-center rounded-2xl border border-border bg-surface-2 text-accent">
                    <Icon name={SERVICE_ICON[service.icon]} size={20} />
                  </span>
                  <span className="font-mono text-[11px] text-fg-subtle">{service.marker}</span>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold tracking-tight text-fg">
                    {localize(service.title)}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-fg-muted text-pretty">
                    {localize(service.description)}
                  </p>
                </div>

                <ul className="mt-auto grid gap-2.5 border-t border-border pt-5 sm:grid-cols-2">
                  {localize(service.deliverables).map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[14px] text-fg-muted">
                      <Icon name="Check" size={14} className="mt-1 shrink-0 text-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>

      <div className="mt-24 lg:mt-32">
        <Reveal>
          <h3 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl lg:text-5xl">
            {t.services.processTitle}
          </h3>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-fg-muted sm:text-lg">
            {t.services.processSubtitle}
          </p>
        </Reveal>

        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {processSteps.map((step, index) => (
            <Reveal key={step.id} delay={index * 0.08}>
              <li className="relative">
                <div className="flex items-center gap-4">
                  <span className="numeric font-mono text-sm text-accent">{step.step}</span>
                  <span className="h-px flex-1 bg-border" />
                </div>
                <h4 className="mt-5 text-lg font-semibold tracking-tight text-fg">
                  {localize(step.title)}
                </h4>
                <p className="mt-2.5 text-[15px] leading-relaxed text-fg-muted text-pretty">
                  {localize(step.description)}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  )
}
