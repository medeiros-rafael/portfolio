import type { Localized } from './common.model'

export type ServiceIcon = 'globe' | 'smartphone' | 'database' | 'gauge'

export type Service = {
  id: string
  icon: ServiceIcon
  marker: string
  title: Localized
  description: Localized
  deliverables: Localized<string[]>
}

export type ProcessStep = {
  id: string
  step: string
  title: Localized
  description: Localized
}

export const services: Service[] = [
  {
    id: 'web',
    icon: 'globe',
    marker: '<web />',
    title: { pt: 'Sites e aplicações web', en: 'Websites & web apps' },
    description: {
      pt: 'Do site institucional que vende ao painel administrativo que a sua equipe usa todo dia.',
      en: 'From the website that sells to the admin panel your team uses every day.',
    },
    deliverables: {
      pt: ['Landing pages de alta conversão', 'Painéis e dashboards', 'Integrações com APIs', 'SEO técnico e performance'],
      en: ['High-conversion landing pages', 'Dashboards and admin panels', 'API integrations', 'Technical SEO and performance'],
    },
  },
  {
    id: 'mobile',
    icon: 'smartphone',
    marker: '{ mobile }',
    title: { pt: 'Aplicativos mobile', en: 'Mobile apps' },
    description: {
      pt: 'Apps Android e iOS publicados nas lojas, com a mesma base de código ou nativos quando o caso exige.',
      en: 'Android and iOS apps shipped to the stores — shared codebase, or fully native when the case demands it.',
    },
    deliverables: {
      pt: ['React Native e Expo', 'Kotlin e Jetpack Compose', 'Publicação nas lojas', 'Atualizações e manutenção'],
      en: ['React Native and Expo', 'Kotlin and Jetpack Compose', 'Store publishing', 'Updates and maintenance'],
    },
  },
  {
    id: 'systems',
    icon: 'database',
    marker: '[ systems ]',
    title: { pt: 'Sistemas sob medida & ERP', en: 'Custom systems & ERP' },
    description: {
      pt: 'Quando a planilha não dá mais conta: modelagem de dados, regras de negócio e integrações fiscais.',
      en: 'When the spreadsheet no longer holds: data modeling, business rules and fiscal integrations.',
    },
    deliverables: {
      pt: ['Modelagem de banco de dados', 'APIs em .NET', 'Integrações NF-e, CT-e e MDF-e', 'Relatórios e automações'],
      en: ['Database modeling', '.NET APIs', 'NF-e, CT-e, and MDF-e integrations', 'Reporting and automation'],
    },
  },
  {
    id: 'evolution',
    icon: 'gauge',
    marker: '// refactor',
    title: { pt: 'Evolução de produtos existentes', en: 'Evolving existing products' },
    description: {
      pt: 'Seu sistema funciona, mas cada mudança custa caro. Eu entro para reduzir esse custo.',
      en: 'Your system works, but every change is expensive. I come in to bring that cost down.',
    },
    deliverables: {
      pt: ['Refatoração e modularização', 'Otimização de performance', 'Pipelines de CI/CD', 'Code review e padronização'],
      en: ['Refactoring and modularization', 'Performance optimization', 'CI/CD pipelines', 'Code review and standards'],
    },
  },
]

export const processSteps: ProcessStep[] = [
  {
    id: 'discovery',
    step: '01',
    title: { pt: 'Entender o problema', en: 'Understand the problem' },
    description: {
      pt: 'Antes de escrever código, eu entendo a operação, os gargalos e o que realmente gera resultado.',
      en: 'Before writing code, I map the operation, the bottlenecks and what actually drives results.',
    },
  },
  {
    id: 'architecture',
    step: '02',
    title: { pt: 'Desenhar a arquitetura', en: 'Design the architecture' },
    description: {
      pt: 'Camadas desacopladas e decisões documentadas, para o projeto continuar barato de evoluir no ano que vem.',
      en: 'Decoupled layers and documented decisions, so the project stays cheap to evolve next year.',
    },
  },
  {
    id: 'build',
    step: '03',
    title: { pt: 'Construir e revisar', en: 'Build and review' },
    description: {
      pt: 'Entregas curtas, código revisado, testes e padrões — você acompanha a evolução sem surpresas.',
      en: 'Short increments, reviewed code, tests and standards — you follow the progress without surprises.',
    },
  },
  {
    id: 'ship',
    step: '04',
    title: { pt: 'Publicar e sustentar', en: 'Ship and support' },
    description: {
      pt: 'Deploy automatizado, monitoramento e suporte contínuo. Entregar é o começo, não o fim.',
      en: 'Automated deploys, monitoring and ongoing support. Shipping is the start, not the finish.',
    },
  },
]
