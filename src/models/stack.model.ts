import type { Localized } from './common.model'

export type SkillLevel = 'expert' | 'advanced' | 'proficient' | 'learning'

export type Skill = {
  name: string
  level: SkillLevel
}

export type StackGroup = {
  id: string
  marker: string
  title: Localized
  description: Localized
  skills: Skill[]
}

export const stackGroups: StackGroup[] = [
  {
    id: 'frontend',
    marker: '<frontend />',
    title: { pt: 'Front-end', en: 'Front-end' },
    description: {
      pt: 'Interfaces rápidas, acessíveis e componentizadas — pensadas para quem usa e para quem mantém.',
      en: 'Fast, accessible, component-driven interfaces — built for the user and for whoever maintains them.',
    },
    skills: [
      { name: 'React', level: 'expert' },
      { name: 'TypeScript', level: 'advanced' },
      { name: 'React Hooks', level: 'advanced' },
      { name: 'Tailwind CSS', level: 'advanced' },
      { name: 'Bootstrap', level: 'proficient' },
      { name: 'Vite', level: 'advanced' },
      { name: 'HTML & CSS', level: 'expert' },
    ],
  },
  {
    id: 'mobile',
    marker: '{ mobile }',
    title: { pt: 'Mobile', en: 'Mobile' },
    description: {
      pt: 'Apps nativos e híbridos publicados nas lojas, com foco em performance e retenção.',
      en: 'Native and hybrid apps shipped to the stores, focused on performance and retention.',
    },
    skills: [
      { name: 'React Native', level: 'expert' },
      { name: 'Expo', level: 'advanced' },
      { name: 'Kotlin', level: 'advanced' },
      { name: 'Jetpack Compose', level: 'advanced' },
      { name: 'Coroutines & Flow', level: 'advanced' },
      { name: 'Play Store / App Store', level: 'advanced' },
    ],
  },
  {
    id: 'backend',
    marker: '[ backend ]',
    title: { pt: 'Back-end & Dados', en: 'Back-end & Data' },
    description: {
      pt: 'APIs, regras de negócio e consultas que sustentam o produto quando o volume cresce.',
      en: 'APIs, business rules and queries that hold the product up when volume grows.',
    },
    skills: [
      { name: '.NET / C#', level: 'advanced' },
      { name: 'ASP.NET Core', level: 'advanced' },
      { name: 'SQL Server / T-SQL', level: 'advanced' },
      { name: 'PostgreSQL', level: 'proficient' },
      { name: 'Oracle', level: 'proficient' },
      { name: 'REST APIs', level: 'advanced' },
      { name: 'Java', level: 'learning' },
    ],
  },
  {
    id: 'architecture',
    marker: '// architecture',
    title: { pt: 'Arquitetura & Qualidade', en: 'Architecture & Quality' },
    description: {
      pt: 'Camadas desacopladas, código previsível e revisões que impedem a dívida técnica de nascer.',
      en: 'Decoupled layers, predictable code and reviews that stop technical debt before it starts.',
    },
    skills: [
      { name: 'Clean Architecture', level: 'advanced' },
      { name: 'MVVM / MVI / MVC', level: 'advanced' },
      { name: 'SOLID', level: 'advanced' },
      { name: 'Design Patterns', level: 'advanced' },
      { name: 'Modularização', level: 'advanced' },
      { name: 'Testes Unitários', level: 'proficient' },
      { name: 'Code Review', level: 'advanced' },
    ],
  },
  {
    id: 'devops',
    marker: '$ devops',
    title: { pt: 'DevOps & Ferramentas', en: 'DevOps & Tooling' },
    description: {
      pt: 'Pipelines que entregam sozinhos, com build reprodutível e deploy sem drama.',
      en: 'Pipelines that ship on their own, with reproducible builds and drama-free deploys.',
    },
    skills: [
      { name: 'CI/CD', level: 'advanced' },
      { name: 'Azure DevOps', level: 'advanced' },
      { name: 'Git / GitHub / GitLab', level: 'expert' },
      { name: 'Gradle', level: 'proficient' },
      { name: 'Docker', level: 'learning' },
      { name: 'Vercel', level: 'proficient' },
    ],
  },
]

export const stackMarquee: string[] = [
  'React',
  'TypeScript',
  'React Native',
  'Expo',
  'Kotlin',
  'Jetpack Compose',
  '.NET',
  'C#',
  'ASP.NET Core',
  'SQL Server',
  'PostgreSQL',
  'Oracle',
  'Clean Architecture',
  'SOLID',
  'MVVM',
  'CI/CD',
  'Azure DevOps',
  'Docker',
  'Tailwind CSS',
  'Vite',
]
