import { createContext } from 'react'

import type { Dictionary } from '@/i18n/i18n.types'
import type { Language, Localized } from '@/models/common.model'

export type I18nContextValue = {
  language: Language
  t: Dictionary
  setLanguage: (language: Language) => void
  toggleLanguage: () => void
  localize: <T>(value: Localized<T>) => T
}

export const I18nContext = createContext<I18nContextValue | null>(null)
