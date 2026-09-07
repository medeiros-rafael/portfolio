import { motion } from 'motion/react'

import portraitUrl from '@/assets/rafael-portrait.webp'
import { useCardTilt } from '@/controllers/hooks/useCardTilt'
import { useI18n } from '@/controllers/hooks/useI18n'
import { cn } from '@/lib/cn'
import { profile } from '@/models/profile.model'

type Row = { key: string; value: string; accent?: boolean }

/**
 * Portrait card: the photo framed as an IDE panel, tilting slightly towards
 * the cursor and revealing full colour on hover.
 */
export function AvatarCard({ className }: { className?: string }) {
  const { localize, language } = useI18n()
  const { style, handlers } = useCardTilt(6)

  const rows: Row[] = [
    { key: 'name', value: profile.shortName },
    { key: language === 'pt' ? 'cargo' : 'role', value: localize(profile.role) },
    { key: language === 'pt' ? 'base' : 'based', value: localize(profile.location) },
    { key: 'status', value: language === 'pt' ? 'disponível' : 'available', accent: true },
  ]

  return (
    <motion.div
      {...handlers}
      style={style}
      className={cn(
        'group relative overflow-hidden rounded-3xl border border-border bg-surface shadow-[0_50px_120px_-60px_var(--shadow-color)]',
        className,
      )}
    >
      <div className="flex items-center gap-3 border-b border-border bg-surface-2/50 px-4 py-3">
        <div className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-[#ff5f57] opacity-75" />
          <span className="size-2.5 rounded-full bg-[#febc2e] opacity-75" />
          <span className="size-2.5 rounded-full bg-[#28c840] opacity-75" />
        </div>
        <span className="font-mono text-xs text-fg-subtle">whoami</span>
      </div>

      <div className="relative aspect-square overflow-hidden border-b border-border">
        <img
          src={portraitUrl}
          alt={profile.name}
          width={400}
          height={400}
          loading="lazy"
          decoding="async"
          className="size-full scale-[1.01] object-cover grayscale-[45%] transition-[filter,transform,scale] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05] group-hover:grayscale-0"
        />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,var(--surface)_0%,transparent_42%)] opacity-90"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,transparent_45%,var(--surface)_120%)] opacity-55"
        />

        <span className="pointer-events-none absolute top-4 left-4 font-mono text-[10px] text-white/70 mix-blend-difference">
          {'<Developer'}
        </span>
        <span className="pointer-events-none absolute top-4 right-4 font-mono text-[10px] text-white/70 mix-blend-difference">
          {'/>'}
        </span>

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4">
          <span className="text-gradient-metal font-mono text-4xl leading-none font-bold tracking-tighter">
            {profile.initials}
          </span>
          <span className="rounded-full border border-border bg-surface/80 px-2.5 py-1 font-mono text-[10px] tracking-[0.22em] text-fg-subtle uppercase backdrop-blur-sm">
            full stack
          </span>
        </div>
      </div>

      <dl className="divide-y divide-border">
        {rows.map((row) => (
          <div key={row.key} className="flex items-baseline gap-4 px-5 py-3">
            <dt className="w-16 shrink-0 font-mono text-[11px] text-fg-subtle">{row.key}</dt>
            <dd
              className={cn(
                'font-mono text-[12.5px] leading-snug',
                row.accent ? 'flex items-center gap-2 text-accent' : 'text-fg',
              )}
            >
              {row.accent ? (
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-70" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
                </span>
              ) : null}
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
    </motion.div>
  )
}
