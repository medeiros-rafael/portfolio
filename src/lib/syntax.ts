export type TokenType =
  | 'plain'
  | 'comment'
  | 'string'
  | 'keyword'
  | 'number'
  | 'function'
  | 'punctuation'
  | 'tag'
  | 'attribute'

export type Token = { type: TokenType; value: string }

export type CodeLanguage = 'tsx' | 'ts' | 'csharp' | 'sql'

const KEYWORDS: Record<CodeLanguage, string[]> = {
  ts: ['const', 'let', 'var', 'function', 'return', 'type', 'interface', 'export', 'import', 'from', 'as', 'await', 'async', 'if', 'else', 'new', 'class', 'extends', 'keyof', 'typeof', 'default', 'null', 'undefined', 'true', 'false'],
  tsx: ['const', 'let', 'var', 'function', 'return', 'type', 'interface', 'export', 'import', 'from', 'as', 'await', 'async', 'if', 'else', 'new', 'class', 'extends', 'keyof', 'typeof', 'default', 'null', 'undefined', 'true', 'false'],
  csharp: ['public', 'private', 'protected', 'sealed', 'class', 'record', 'readonly', 'static', 'void', 'new', 'return', 'var', 'async', 'await', 'using', 'namespace', 'string', 'int', 'bool', 'Task', 'null', 'true', 'false'],
  sql: ['SELECT', 'FROM', 'WHERE', 'JOIN', 'INNER', 'LEFT', 'ON', 'GROUP', 'ORDER', 'BY', 'AS', 'WITH', 'CROSS', 'APPLY', 'DECLARE', 'AND', 'OR', 'NOT', 'NULL', 'CASE', 'WHEN', 'THEN', 'END'],
}

const PATTERN =
  /(\/\/[^\n]*|--[^\n]*|\/\*[\s\S]*?\*\/)|('(?:[^'\\\n]|\\.)*'|"(?:[^"\\\n]|\\.)*")|(\b\d+(?:\.\d+)?\b)|([A-Za-z_$][\w$]*)(?=\s*\()|([A-Za-z_$][\w$]*)|([{}()[\];:,.<>=+\-*/?&|!]+)/g

export function tokenize(code: string, language: CodeLanguage): Token[] {
  const keywords = new Set(KEYWORDS[language].map((word) => word.toLowerCase()))
  const tokens: Token[] = []
  let lastIndex = 0

  PATTERN.lastIndex = 0
  let match = PATTERN.exec(code)

  while (match !== null) {
    if (match.index > lastIndex) {
      tokens.push({ type: 'plain', value: code.slice(lastIndex, match.index) })
    }

    const [value, comment, str, num, fn, word, punct] = match

    if (comment) tokens.push({ type: 'comment', value })
    else if (str) tokens.push({ type: 'string', value })
    else if (num) tokens.push({ type: 'number', value })
    else if (fn) tokens.push({ type: keywords.has(fn.toLowerCase()) ? 'keyword' : 'function', value })
    else if (word) tokens.push({ type: keywords.has(word.toLowerCase()) ? 'keyword' : 'plain', value })
    else if (punct) tokens.push({ type: 'punctuation', value })

    lastIndex = match.index + value.length
    match = PATTERN.exec(code)
  }

  if (lastIndex < code.length) {
    tokens.push({ type: 'plain', value: code.slice(lastIndex) })
  }

  return tokens
}

export const TOKEN_CLASS: Record<TokenType, string> = {
  plain: 'text-[var(--fg)]',
  comment: 'text-[var(--syn-comment)] italic',
  string: 'text-[var(--syn-string)]',
  keyword: 'text-[var(--syn-keyword)]',
  number: 'text-[var(--syn-num)]',
  function: 'text-[var(--syn-fn)]',
  punctuation: 'text-[var(--syn-punct)]',
  tag: 'text-[var(--syn-tag)]',
  attribute: 'text-[var(--syn-attr)]',
}
