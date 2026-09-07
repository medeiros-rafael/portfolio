import { createContext } from 'react'

import type { Dictionary } from '@/i18n/i18n.types'
import type { Language, Localized } from '@/models/common.model'

export type I18nContextValue = {
  language: Language
  /** Full dictionary for the active language. */
  t: Dictionary
  setLanguage: (language: Language) => void
  toggleLanguage: () => void
  /** Picks the active language out of a localized model value. */
  localize: <T>(value: Localized<T>) => T
}

export const I18nContext = createContext<I18nContextValue | null>(null)
