import { Icon } from '@/components/icons/Icon'
import { Logo } from '@/components/ui/Logo'
import { useI18n } from '@/controllers/hooks/useI18n'
import { navigation } from '@/models/navigation.model'
import { profile } from '@/models/profile.model'

export function Footer() {
  const { t, localize } = useI18n()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-bg-alt/40">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-14 sm:px-10 lg:px-16 2xl:px-24">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-fg-muted">
              {t.footer.sourceNote}
            </p>
            <p className="mt-4 font-mono text-xs text-fg-subtle">{localize(profile.location)}</p>
          </div>

          <nav aria-label="footer" className="lg:col-span-4">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
              {navigation.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-sm text-fg-muted transition-colors duration-300 hover:text-fg"
                  >
                    {localize(item.label)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <ul className="flex flex-col gap-3">
              {profile.socials.map((social) => (
                <li key={social.id}>
                  <a
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noreferrer noopener' : undefined}
                    className="group inline-flex items-center gap-2 text-sm text-fg-muted transition-colors duration-300 hover:text-fg"
                  >
                    {social.label}
                    <Icon
                      name="ArrowUpRight"
                      size={14}
                      className="text-fg-subtle transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-fg-subtle">
            © {year} {profile.name}. {t.footer.rights}
          </p>

          <div className="flex items-center gap-6">
            <p className="hidden font-mono text-xs text-fg-subtle sm:block">{t.footer.builtWith}</p>
            <a
              href="#hero"
              className="group inline-flex items-center gap-2 font-mono text-xs text-fg-muted transition-colors duration-300 hover:text-accent"
            >
              {t.common.backToTop}
              <Icon
                name="ArrowDown"
                size={14}
                className="rotate-180 transition-transform duration-300 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
