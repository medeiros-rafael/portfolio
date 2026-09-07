import type { Localized } from './common.model'

/** Snippet typed out inside the hero code card. */
export const heroSnippet: Localized<string> = {
  pt: [
    'const rafael: FullStackDeveloper = {',
    "  nome: 'Rafael da Silva Medeiros',",
    "  base: 'Gravataí · RS · Brasil',",
    '  experiencia: 6,',
    "  front: ['React', 'React Native', 'TypeScript'],",
    "  back: ['.NET', 'C#', 'SQL Server'],",
    "  principios: ['Clean Architecture', 'SOLID'],",
    '  disponivel: true,',
    '}',
    '',
    'export default rafael',
  ].join('\n'),
  en: [
    'const rafael: FullStackDeveloper = {',
    "  name: 'Rafael da Silva Medeiros',",
    "  base: 'Gravataí · RS · Brazil',",
    '  experience: 6,',
    "  front: ['React', 'React Native', 'TypeScript'],",
    "  back: ['.NET', 'C#', 'SQL Server'],",
    "  principles: ['Clean Architecture', 'SOLID'],",
    '  available: true,',
    '}',
    '',
    'export default rafael',
  ].join('\n'),
}

export type HeroStat = {
  id: string
  value: string
  label: Localized
}

export const heroStats: HeroStat[] = [
  {
    id: 'years',
    value: '06',
    label: { pt: 'anos construindo software', en: 'years building software' },
  },
  {
    id: 'platforms',
    value: '03',
    label: { pt: 'frentes: web, mobile e back-end', en: 'fronts: web, mobile and back-end' },
  },
  {
    id: 'focus',
    value: '100%',
    label: { pt: 'foco em performance e escala', en: 'focused on performance and scale' },
  },
]
