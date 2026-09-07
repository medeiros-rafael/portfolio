import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import { cn } from '@/lib/cn'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'
export type ButtonSize = 'md' | 'lg'

type BaseProps = {
  variant?: ButtonVariant
  size?: ButtonSize
  iconLeft?: ReactNode
  iconRight?: ReactNode
  className?: string
  children: ReactNode
}

type ButtonAsButton = BaseProps & ComponentPropsWithoutRef<'button'> & { href?: undefined }
type ButtonAsLink = BaseProps & ComponentPropsWithoutRef<'a'> & { href: string }

const BASE =
  'group relative inline-flex items-center justify-center gap-2.5 rounded-full font-medium tracking-tight whitespace-nowrap transition-[transform,background-color,border-color,color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50'

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    'bg-accent text-on-accent shadow-[0_8px_28px_-14px_var(--glow)] hover:bg-accent-hi hover:shadow-[0_16px_40px_-16px_var(--glow)]',
  secondary:
    'border border-border-strong bg-surface/70 text-fg backdrop-blur-sm hover:border-accent/60 hover:bg-surface-2',
  ghost: 'text-fg-muted hover:text-fg hover:bg-surface-2',
}

const SIZES: Record<ButtonSize, string> = {
  md: 'h-11 px-5 text-sm',
  lg: 'h-14 px-7 text-base',
}

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const {
    variant = 'primary',
    size = 'md',
    iconLeft,
    iconRight,
    className,
    children,
    ...rest
  } = props

  const classes = cn(BASE, VARIANTS[variant], SIZES[size], className)

  const content = (
    <>
      {iconLeft}
      <span>{children}</span>
      {iconRight}
    </>
  )

  if (typeof rest.href === 'string') {
    const anchorProps = rest as ComponentPropsWithoutRef<'a'>
    const isExternal = anchorProps.href?.startsWith('http')

    return (
      <a
        {...anchorProps}
        className={classes}
        target={anchorProps.target ?? (isExternal ? '_blank' : undefined)}
        rel={anchorProps.rel ?? (isExternal ? 'noreferrer noopener' : undefined)}
      >
        {content}
      </a>
    )
  }

  return (
    <button {...(rest as ComponentPropsWithoutRef<'button'>)} className={classes}>
      {content}
    </button>
  )
}
