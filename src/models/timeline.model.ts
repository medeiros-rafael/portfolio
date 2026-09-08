import type { Localized } from './common.model'

export type TimelineKind = 'work' | 'education' | 'certification'

export type TimelineEntry = {
  id: string
  kind: TimelineKind
  period: Localized
  isCurrent: boolean
  title: Localized
  organization: string
  description: Localized
  achievements: Localized<string[]>
  tags: string[]
}

export const timeline: TimelineEntry[] = [
  {
    id: 'celebre',
    kind: 'work',
    period: { pt: '2022 — atual', en: '2022 — present' },
    isCurrent: true,
    title: { pt: 'Desenvolvedor de Software', en: 'Software Developer' },
    organization: 'Célebre Informática',
    description: {
      pt: 'Arquiteto e desenvolvo aplicações web e mobile de ERP, atuando das decisões de arquitetura até a entrega em produção.',
      en: 'I architect and build web and mobile ERP applications, from architecture decisions all the way to production.',
    },
    achievements: {
      pt: [
        'Decisões arquiteturais aplicando Clean Architecture, MVVM e SOLID.',
        'Refatorações, modularização e ganho de performance nas soluções web e mobile.',
        'Redução de bugs e gargalos via code review e padronização de boas práticas.',
        'Implementação e manutenção de pipelines de CI/CD.',
      ],
      en: [
        'Architecture decisions applying Clean Architecture, MVVM and SOLID.',
        'Refactoring, modularization and performance gains across web and mobile.',
        'Fewer bugs and bottlenecks through code review and engineering standards.',
        'Built and maintained CI/CD pipelines.',
      ],
    },
    tags: ['React', 'React Native', '.NET', 'Kotlin', 'CI/CD'],
  },
  {
    id: 'freelancer',
    kind: 'work',
    period: { pt: '2020 — 2021', en: '2020 — 2021' },
    isCurrent: false,
    title: { pt: 'Desenvolvedor Mobile & Banco de Dados', en: 'Mobile & Database Developer' },
    organization: 'Freelancer / EB',
    description: {
      pt: 'Desenvolvimento e manutenção de aplicações móveis em Kotlin e React Native, com entregas ágeis e escaláveis.',
      en: 'Built and maintained Kotlin and React Native mobile apps, with agile and scalable delivery.',
    },
    achievements: {
      pt: [
        'Interfaces complexas migradas de sistema legado para Jetpack Compose.',
        'Clean Code e SOLID aplicados em arquiteturas MVVM e MVI.',
        'Modelagem de banco e consultas para regras de negócio.',
      ],
      en: [
        'Complex UIs migrated from a legacy system to Jetpack Compose.',
        'Clean Code and SOLID applied across MVVM and MVI architectures.',
        'Database modeling and queries for business rules.',
      ],
    },
    tags: ['Kotlin', 'React Native', 'Jetpack Compose', 'MVI', 'SQL'],
  },
  {
    id: 'ritter',
    kind: 'education',
    period: { pt: '2021 — 2026', en: '2021 — 2026' },
    isCurrent: true,
    title: { pt: 'Ciência da Computação', en: 'Computer Science' },
    organization: 'Centro Universitário Ritter dos Reis',
    description: {
      pt: 'Formação em Ciência da Computação, com reconhecimento acadêmico por trabalhos bem projetados.',
      en: 'Computer Science degree, with academic recognition for well-designed projects.',
    },
    achievements: {
      pt: ['Alto índice de confiabilidade.', 'Referência acadêmica entre os colegas.'],
      en: ['High reliability record.', 'Academic reference among peers.'],
    },
    tags: ['Algoritmos', 'Engenharia de Software'],
  },
  {
    id: 'redhat',
    kind: 'certification',
    period: { pt: '2022', en: '2022' },
    isCurrent: false,
    title: { pt: 'Red Hat System Administration I & II', en: 'Red Hat System Administration I & II' },
    organization: 'Red Hat Academy',
    description: {
      pt: 'Administração de sistemas Linux: shell, permissões, serviços, redes e automação.',
      en: 'Linux system administration: shell, permissions, services, networking and automation.',
    },
    achievements: { pt: [], en: [] },
    tags: ['Linux', 'Shell'],
  },
  {
    id: 'fluencypass',
    kind: 'education',
    period: { pt: '2025 — atual', en: '2025 — present' },
    isCurrent: true,
    title: { pt: 'Inglês — nível intermediário', en: 'English — intermediate level' },
    organization: 'Fluencypass',
    description: {
      pt: 'Aprimoramento contínuo de inglês técnico e conversacional para atuação em times globais.',
      en: 'Continuous improvement of technical and conversational English for global teams.',
    },
    achievements: { pt: [], en: [] },
    tags: ['English'],
  },
]
