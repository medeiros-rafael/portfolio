import type { Language } from '@/models/common.model'

import { en } from './dictionaries/en'
import { pt } from './dictionaries/pt'
import type { Dictionary } from './i18n.types'

export const dictionaries: Record<Language, Dictionary> = { pt, en }

export const languages: Language[] = ['pt', 'en']
