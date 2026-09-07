import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

import { Icon } from '@/components/icons/Icon'
import { Button } from '@/components/ui/Button'
import { LanguageToggle } from '@/components/ui/LanguageToggle'
import { Logo } from '@/components/ui/Logo'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { useI18n } from '@/controllers/hooks/useI18n'
import { useScrollSpy } from '@/controllers/hooks/useScrollSpy'
import { useScrolled } from '@/controllers/hooks/useScrolled'
import { cn } from '@/lib/cn'
import { easeExpo } from '@/lib/motion'
import { navigation } from '@/models/navigation.model'

export function Header() {
  const { t, localize } = useI18n()
  const isScrolled = useScrolled(24)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const sectionIds = useMemo(() => navigation.map((item) => item.id), [])
  const activeId = useScrollSpy(sectionIds)

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500',
        isScrolled || isMenuOpen
          ? 'glass border-b border-border'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <div className="mx-auto flex h-[72px] w-full max-w-[1440px] items-center justify-between gap-6 px-6 sm:px-10 lg:px-16 2xl:px-24">
        <a href="#hero" className="shrink-0" aria-label={t.common.backToTop}>
          <Logo />
        </a>

        <nav aria-label="primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navigation.map((item) => {
              const isActive = activeId === item.id

              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={cn(
                      'group relative flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm transition-colors duration-300',
                      isActive ? 'text-fg' : 'text-fg-muted hover:text-fg',
                    )}
                  >
                    <span className="font-mono text-[10px] text-fg-subtle">{item.marker}</span>
                    {localize(item.label)}
                    {isActive ? (
                      <motion.span
                        layoutId="nav-active"
                        transition={{ type: 'spring', stiffness: 340, damping: 32 }}
                        className="absolute inset-0 -z-10 rounded-full bg-surface-2"
                      />
                    ) : null}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageToggle className="hidden sm:flex" />
          <ThemeToggle />
          <Button
            href={`#contact`}
            size="md"
            className="hidden md:inline-flex"
            iconRight={<Icon name="ArrowRight" size={15} />}
          >
            {localize({ pt: 'Contato', en: 'Contact' })}
          </Button>

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? t.common.closeMenu : t.common.openMenu}
            className="grid size-10 place-items-center rounded-full border border-border bg-surface/70 text-fg-muted transition-colors hover:text-fg lg:hidden"
          >
            <Icon name={isMenuOpen ? 'X' : 'Menu'} size={18} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: easeExpo }}
            className="glass border-b border-border lg:hidden"
          >
            <ul className="mx-auto flex max-w-[1440px] flex-col gap-1 px-6 py-6 sm:px-10">
              {navigation.map((item, index) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 + index * 0.05, ease: easeExpo }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-baseline gap-3 border-b border-border/60 py-3 text-2xl font-medium tracking-tight text-fg"
                  >
                    <span className="font-mono text-xs text-accent">{item.marker}</span>
                    {localize(item.label)}
                  </a>
                </motion.li>
              ))}
              <li className="pt-5">
                <LanguageToggle className="sm:hidden" />
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
