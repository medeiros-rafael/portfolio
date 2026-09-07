import { motion } from 'motion/react'

import { useI18n } from '@/controllers/hooks/useI18n'
import { cn } from '@/lib/cn'
import { languages } from '@/i18n/dictionaries'

export function LanguageToggle({ className }: { className?: string }) {
  const { language, setLanguage, t } = useI18n()

  return (
    <div
      role="group"
      aria-label={t.common.switchLanguage}
      className={cn(
        'relative flex h-10 items-center rounded-full border border-border bg-surface/70 p-1',
        className,
      )}
    >
      {languages.map((code) => {
        const isActive = code === language

        return (
          <button
            key={code}
            type="button"
            onClick={() => setLanguage(code)}
            aria-pressed={isActive}
            className={cn(
              'relative z-10 h-8 rounded-full px-3 font-mono text-xs tracking-wider uppercase transition-colors duration-300',
              isActive ? 'text-on-accent' : 'text-fg-subtle hover:text-fg',
            )}
          >
            {isActive ? (
              <motion.span
                layoutId="language-pill"
                transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                className="absolute inset-0 -z-10 rounded-full bg-accent"
              />
            ) : null}
            {code}
          </button>
        )
      })}
    </div>
  )
}
