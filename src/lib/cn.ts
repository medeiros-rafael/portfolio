type ClassValue = string | false | null | undefined

/** Joins class names, dropping every falsy value. */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(' ')
}
