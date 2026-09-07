import { cn } from '@/lib/cn'

/** Section eyebrow rendered as an IDE-style comment: `// 03 — Projetos`. */
export function MonoLabel({
  marker,
  children,
  className,
}: {
  marker?: string
  children: string
  className?: string
}) {
  return (
    <p className={cn('font-mono text-xs tracking-[0.22em] text-accent uppercase', className)}>
      <span className="text-fg-subtle">{'// '}</span>
      {marker ? <span className="text-fg-subtle">{marker} — </span> : null}
      {children}
    </p>
  )
}
