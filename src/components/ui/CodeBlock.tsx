import { useMemo } from 'react'
import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'
import { TOKEN_CLASS, tokenize } from '@/lib/syntax'
import type { CodeLanguage } from '@/lib/syntax'

export type CodeBlockProps = {
  code: string
  language?: CodeLanguage
  filename?: string
  showLineNumbers?: boolean
  showChrome?: boolean
  ghostCode?: string
  caret?: boolean
  className?: string
  bodyClassName?: string
  headerExtra?: ReactNode
}

const DOTS = ['#ff5f57', '#febc2e', '#28c840']

function renderLines(
  code: string,
  language: CodeLanguage,
  showLineNumbers: boolean,
  caret = false,
) {
  const lines = code.split('\n')

  return lines.map((line, index) => (
    <span key={index} className="grid grid-cols-[auto_1fr] gap-4">
      {showLineNumbers ? (
        <span className="numeric w-6 shrink-0 text-right text-fg-subtle/45 select-none">
          {index + 1}
        </span>
      ) : null}
      <span className="whitespace-pre">
        {line.length === 0
          ? ' '
          : tokenize(line, language).map((token, tokenIndex) => (
              <span key={tokenIndex} className={TOKEN_CLASS[token.type]}>
                {token.value}
              </span>
            ))}
        {caret && index === lines.length - 1 ? (
          <span aria-hidden className="caret ml-0.5" />
        ) : null}
      </span>
    </span>
  ))
}

export function CodeBlock({
  code,
  language = 'ts',
  filename,
  showLineNumbers = true,
  showChrome = true,
  ghostCode,
  caret = false,
  className,
  bodyClassName,
  headerExtra,
}: CodeBlockProps) {
  const content = useMemo(
    () => renderLines(code, language, showLineNumbers, caret),
    [caret, code, language, showLineNumbers],
  )
  const ghost = useMemo(
    () => (ghostCode ? renderLines(ghostCode, language, showLineNumbers) : null),
    [ghostCode, language, showLineNumbers],
  )

  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl border border-border bg-code-bg shadow-[0_40px_90px_-50px_var(--shadow-color)]',
        className,
      )}
    >
      {showChrome ? (
        <div className="flex items-center gap-3 border-b border-border bg-surface-2/50 px-4 py-3">
          <div className="flex items-center gap-1.5">
            {DOTS.map((color) => (
              <span
                key={color}
                className="size-2.5 rounded-full opacity-75"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          {filename ? (
            <span className="truncate font-mono text-xs text-fg-subtle">{filename}</span>
          ) : null}
          {headerExtra ? <div className="ml-auto">{headerExtra}</div> : null}
        </div>
      ) : null}

      <pre
        className={cn(
          'overflow-x-auto px-4 py-4 font-mono text-[12.5px] leading-[1.75] sm:px-5 sm:text-[13.5px]',
          bodyClassName,
        )}
      >
        <code className="relative block">
          {ghost ? (
            <span aria-hidden className="invisible block">
              {ghost}
            </span>
          ) : null}
          <span className={cn('block', ghost && 'absolute inset-0')}>{content}</span>
        </code>
      </pre>
    </div>
  )
}
