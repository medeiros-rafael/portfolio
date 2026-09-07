import { useId } from 'react'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import { cn } from '@/lib/cn'

type FieldBaseProps = {
  label: string
  hint?: string
  className?: string
}

export type TextFieldProps = FieldBaseProps & Omit<ComponentPropsWithoutRef<'input'>, 'className'>
export type TextAreaProps = FieldBaseProps & Omit<ComponentPropsWithoutRef<'textarea'>, 'className'>

const CONTROL =
  'w-full rounded-2xl border border-border bg-surface px-4 py-3 text-[15px] text-fg placeholder:text-fg-subtle/70 outline-none transition-colors duration-300 hover:border-border-strong focus:border-accent'

function FieldShell({
  fieldId,
  label,
  hint,
  className,
  children,
}: FieldBaseProps & { fieldId: string; children: ReactNode }) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label
        htmlFor={fieldId}
        className="font-mono text-[11px] tracking-[0.16em] text-fg-subtle uppercase"
      >
        {label}
      </label>
      {children}
      {hint ? <p className="text-xs leading-relaxed text-fg-subtle">{hint}</p> : null}
    </div>
  )
}

export function TextField({ label, hint, className, ...inputProps }: TextFieldProps) {
  const generatedId = useId()
  const fieldId = inputProps.id ?? generatedId

  return (
    <FieldShell fieldId={fieldId} label={label} hint={hint} className={className}>
      <input {...inputProps} id={fieldId} className={CONTROL} />
    </FieldShell>
  )
}

export function TextArea({ label, hint, className, ...textareaProps }: TextAreaProps) {
  const generatedId = useId()
  const fieldId = textareaProps.id ?? generatedId

  return (
    <FieldShell fieldId={fieldId} label={label} hint={hint} className={className}>
      <textarea
        {...textareaProps}
        id={fieldId}
        className={cn(CONTROL, 'min-h-36 resize-y leading-relaxed')}
      />
    </FieldShell>
  )
}
