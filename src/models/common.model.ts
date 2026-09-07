/**
 * Cross-cutting types shared by every model, view and controller.
 */
export type Language = 'pt' | 'en'

export type Theme = 'light' | 'dark'

/** A value that exists in both supported languages. */
export type Localized<T = string> = Record<Language, T>

export type SectionId =
  | 'hero'
  | 'about'
  | 'stack'
  | 'projects'
  | 'timeline'
  | 'services'
  | 'contact'
