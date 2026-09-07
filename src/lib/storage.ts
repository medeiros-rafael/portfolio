export const STORAGE_KEYS = {
  theme: 'portfolio.theme',
  language: 'portfolio.language',
} as const

export function readStorage(key: string): string | null {
  try {
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}

export function writeStorage(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value)
  } catch {
    /* storage can be unavailable (private mode, blocked cookies) */
  }
}
