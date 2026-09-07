export type Language = 'pt' | 'en'

export type Theme = 'light' | 'dark'

export type Localized<T = string> = Record<Language, T>

export type SectionId =
  | 'hero'
  | 'about'
  | 'stack'
  | 'projects'
  | 'timeline'
  | 'services'
  | 'contact'
