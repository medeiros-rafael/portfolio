import { useMemo, useState } from 'react'

import { Icon } from '@/components/icons/Icon'
import type { IconName } from '@/components/icons/icons.data'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SpotlightCard } from '@/components/ui/SpotlightCard'
import { TextArea, TextField } from '@/components/ui/TextField'
import { useI18n } from '@/controllers/hooks/useI18n'
import { profile } from '@/models/profile.model'
import type { SocialLink } from '@/models/profile.model'

const SOCIAL_ICON: Record<SocialLink['id'], IconName> = {
  github: 'CodeXml',
  linkedin: 'Briefcase',
  whatsapp: 'MessageCircle',
  email: 'AtSign',
  instagram: 'CircleDot',
}

const WHATSAPP_NUMBER = '5551981061315'

export function ContactSection() {
  const { t, localize, language } = useI18n()

  const [name, setName] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  const { whatsappHref, mailtoHref } = useMemo(() => {
    const greeting =
      language === 'pt'
        ? `Olá Rafael! Aqui é ${name || '[seu nome]'}.`
        : `Hi Rafael! This is ${name || '[your name]'}.`

    const defaultSubject = language === 'pt' ? 'Contato pelo portfólio' : 'Message from your portfolio'
    const finalSubject = subject.trim() || defaultSubject
    const body = `${greeting}\n\n${message}`.trim()

    return {
      whatsappHref: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        `${greeting}\n\n${subject.trim() ? `${finalSubject}\n\n` : ''}${message}`.trim(),
      )}`,
      mailtoHref: `mailto:${profile.email}?subject=${encodeURIComponent(
        finalSubject,
      )}&body=${encodeURIComponent(body)}`,
    }
  }, [language, message, name, subject])

  return (
    <Section id="contact" className="border-t border-border/70">
      <SectionHeading
        marker="06"
        label={t.contact.label}
        title={t.contact.title}
        subtitle={t.contact.subtitle}
      />

      <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-accent/25 bg-accent-soft px-3.5 py-1.5">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              <span className="font-mono text-[11px] tracking-wide text-accent">
                {t.contact.availability}
              </span>
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mt-10 font-mono text-[11px] tracking-[0.2em] text-fg-subtle uppercase">
              {t.contact.directTitle}
            </p>
          </Reveal>

          <ul className="mt-5 divide-y divide-border border-y border-border">
            {profile.socials.map((social, index) => (
              <Reveal key={social.id} delay={0.1 + index * 0.05}>
                <li>
                  <a
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noreferrer noopener' : undefined}
                    className="group flex items-center gap-4 py-4 transition-colors duration-300"
                  >
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-border bg-surface text-fg-subtle transition-colors duration-300 group-hover:border-accent/40 group-hover:text-accent">
                      <Icon name={SOCIAL_ICON[social.id]} size={17} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium text-fg">{social.label}</span>
                      <span className="block truncate font-mono text-xs text-fg-subtle">
                        {social.handle}
                      </span>
                    </span>
                    <Icon
                      name="ArrowUpRight"
                      size={16}
                      className="shrink-0 text-fg-subtle transition-[color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    />
                  </a>
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.3}>
            <div className="mt-8 flex items-center gap-3 text-sm text-fg-muted">
              <Icon name="MapPin" size={16} className="text-fg-subtle" />
              <span>{localize(profile.location)}</span>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={0.1}>
            <SpotlightCard>
              <form
                className="flex flex-col gap-5 p-6 sm:p-8"
                onSubmit={(event) => event.preventDefault()}
              >
                <p className="text-lg font-medium tracking-tight text-fg">{t.contact.form.title}</p>

                <div className="grid gap-5 sm:grid-cols-2">
                  <TextField
                    label={t.contact.form.name}
                    placeholder={t.contact.form.namePlaceholder}
                    value={name}
                    autoComplete="name"
                    onChange={(event) => setName(event.target.value)}
                  />
                  <TextField
                    label={t.contact.form.subject}
                    placeholder={t.contact.form.subjectPlaceholder}
                    value={subject}
                    onChange={(event) => setSubject(event.target.value)}
                  />
                </div>

                <TextArea
                  label={t.contact.form.message}
                  placeholder={t.contact.form.messagePlaceholder}
                  value={message}
                  rows={5}
                  onChange={(event) => setMessage(event.target.value)}
                />

                <div className="flex flex-wrap gap-3">
                  <Button
                    href={whatsappHref}
                    size="lg"
                    iconRight={<Icon name="ArrowUpRight" size={16} />}
                  >
                    {t.contact.form.sendWhatsapp}
                  </Button>
                  <Button
                    href={mailtoHref}
                    size="lg"
                    variant="secondary"
                    iconRight={<Icon name="Send" size={16} />}
                  >
                    {t.contact.form.sendEmail}
                  </Button>
                </div>

                <p className="flex items-start gap-2.5 text-xs leading-relaxed text-fg-subtle">
                  <Icon name="Lock" size={13} className="mt-0.5 shrink-0" />
                  <span>{t.contact.form.note}</span>
                </p>
              </form>
            </SpotlightCard>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
