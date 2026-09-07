import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

import { I18nContext } from '@/controllers/context/i18n.context'
import { dictionaries } from '@/i18n/dictionaries'
import { STORAGE_KEYS, readStorage, writeStorage } from '@/lib/storage'
import type { Language, Localized } from '@/models/common.model'

function resolveInitialLanguage(): Language {
  const stored = readStorage(STORAGE_KEYS.language)
  if (stored === 'pt' || stored === 'en') return stored

  const navigatorLanguage = typeof navigator !== 'undefined' ? navigator.language : 'pt-BR'
  return navigatorLanguage.toLowerCase().startsWith('pt') ? 'pt' : 'en'
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(resolveInitialLanguage)

  useEffect(() => {
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en'
  }, [language])

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next)
    writeStorage(STORAGE_KEYS.language, next)
  }, [])

  const toggleLanguage = useCallback(() => {
    setLanguageState((current) => {
      const next: Language = current === 'pt' ? 'en' : 'pt'
      writeStorage(STORAGE_KEYS.language, next)
      return next
    })
  }, [])

  const value = useMemo(() => {
    function localize<T>(entry: Localized<T>): T {
      return entry[language]
    }

    return {
      language,
      t: dictionaries[language],
      setLanguage,
      toggleLanguage,
      localize,
    }
  }, [language, setLanguage, toggleLanguage])

  return <I18nContext value={value}>{children}</I18nContext>
}
