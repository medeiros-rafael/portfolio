import type { Localized } from './common.model'

export type HeroFace = {
  filename: string
  code: Localized<string>
  chips: string[]
}

export const heroFront: HeroFace = {
  filename: 'rafael.frontend.ts',
  code: {
    pt: [
      'const client: FrontendStack = {',
      "  web: ['React', 'TypeScript', 'Vite'],",
      "  mobile: ['React Native', 'Expo'],",
      "  nativo: ['Kotlin', 'Jetpack Compose'],",
      "  ui: ['Tailwind CSS', 'Motion'],",
      "  foco: ['performance', 'acessibilidade'],",
      "  publica: ['Play Store', 'App Store'],",
      '}',
      '',
      'export default client',
    ].join('\n'),
    en: [
      'const client: FrontendStack = {',
      "  web: ['React', 'TypeScript', 'Vite'],",
      "  mobile: ['React Native', 'Expo'],",
      "  native: ['Kotlin', 'Jetpack Compose'],",
      "  ui: ['Tailwind CSS', 'Motion'],",
      "  focus: ['performance', 'accessibility'],",
      "  ships: ['Play Store', 'App Store'],",
      '}',
      '',
      'export default client',
    ].join('\n'),
  },
  chips: ['React', 'TypeScript', 'React Native', 'Expo', 'Kotlin'],
}

export const heroBack: HeroFace = {
  filename: 'rafael.backend.ts',
  code: {
    pt: [
      'const server: BackendStack = {',
      "  runtime: ['.NET', 'C#', 'ASP.NET Core'],",
      "  bancos: ['SQL Server', 'PostgreSQL'],",
      "  tambem: ['MySQL', 'Firebase'],",
      "  consultas: ['T-SQL', 'procedures', 'views'],",
      "  integracoes: ['NF-e', 'EDI', 'REST'],",
      "  base: ['Clean Architecture', 'SOLID'],",
      '}',
      '',
      'export default server',
    ].join('\n'),
    en: [
      'const server: BackendStack = {',
      "  runtime: ['.NET', 'C#', 'ASP.NET Core'],",
      "  databases: ['SQL Server', 'PostgreSQL'],",
      "  alsoUses: ['MySQL', 'Firebase'],",
      "  queries: ['T-SQL', 'procedures', 'views'],",
      "  integrations: ['NF-e', 'EDI', 'REST'],",
      "  ground: ['Clean Architecture', 'SOLID'],",
      '}',
      '',
      'export default server',
    ].join('\n'),
  },
  chips: ['.NET', 'C#', 'SQL Server', 'PostgreSQL', 'MySQL', 'Firebase'],
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
