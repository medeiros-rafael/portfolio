import { cn } from '@/lib/cn'
import { profile } from '@/models/profile.model'

export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'font-mono text-[15px] font-semibold tracking-tight text-fg transition-colors duration-300',
        className,
      )}
    >
      <span className="text-accent">{'<'}</span>
      {profile.initials}
      <span className="text-accent">{' />'}</span>
    </span>
  )
}
