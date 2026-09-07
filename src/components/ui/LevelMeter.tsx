import { cn } from '@/lib/cn'
import type { SkillLevel } from '@/models/stack.model'

const FILLED: Record<SkillLevel, number> = {
  learning: 1,
  proficient: 2,
  advanced: 3,
  expert: 4,
}

/** Four-segment meter describing how deep a skill goes. */
export function LevelMeter({ level, label }: { level: SkillLevel; label: string }) {
  const filled = FILLED[level]

  return (
    <span className="flex items-center gap-[3px]" title={label} aria-label={label}>
      {[0, 1, 2, 3].map((index) => (
        <span
          key={index}
          className={cn(
            'h-[3px] w-2 rounded-full transition-colors duration-500',
            index < filled ? 'bg-accent' : 'bg-border-strong/60',
          )}
        />
      ))}
    </span>
  )
}
