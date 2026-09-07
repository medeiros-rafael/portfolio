import { AnimatePresence, motion } from 'motion/react'

import { Icon } from '@/components/icons/Icon'
import { useI18n } from '@/controllers/hooks/useI18n'
import { useTheme } from '@/controllers/hooks/useTheme'
import { cn } from '@/lib/cn'

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme()
  const { t } = useI18n()
  const isDark = theme === 'dark'
  const label = isDark ? t.common.switchToLight : t.common.switchToDark

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={cn(
        'relative grid size-10 place-items-center overflow-hidden rounded-full border border-border bg-surface/70 text-fg-muted transition-colors duration-300 hover:border-accent/50 hover:text-accent',
        className,
      )}
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.span
          key={theme}
          initial={{ opacity: 0, rotate: -70, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 70, scale: 0.6 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="grid place-items-center"
        >
          <Icon name={isDark ? 'Moon' : 'Sun'} size={18} />
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
