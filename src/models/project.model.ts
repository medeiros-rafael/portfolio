import type { Localized } from './common.model'

export type ProjectLinkKind = 'live' | 'repository' | 'private'

export type ProjectLink = {
  kind: ProjectLinkKind
  label: Localized
  href: string
}

export type ProjectSnippet = {
  filename: string
  language: 'tsx' | 'ts' | 'csharp' | 'sql'
  code: string
}

export type ProjectMetric = {
  value: string
  label: Localized
}

export type Project = {
  id: string
  marker: string
  name: string
  category: Localized
  tagline: Localized
  summary: Localized
  problem: Localized
  solution: Localized
  outcome: Localized
  stack: string[]
  metrics: ProjectMetric[]
  links?: ProjectLink[]
  snippet: ProjectSnippet
}

export const projects: Project[] = [
  {
    id: 'vecttex',
    marker: '01',
    name: 'Vecttex',
    category: { pt: 'Site institucional · Marca própria', en: 'Company website · Own brand' },
    tagline: {
      pt: 'A marca para vender software sob medida.',
      en: 'The brand to sell custom software.',
    },
    summary: {
      pt: 'Identidade visual, copy e site institucional — do símbolo hexagonal ao último pixel da landing page.',
      en: 'Visual identity, copy and website — from the hexagonal symbol to the last pixel of the landing page.',
    },
    problem: {
      pt: 'Vender desenvolvimento sob medida sem uma marca sólida é vender preço. Faltava um lugar que provasse competência antes da primeira conversa.',
      en: 'Selling custom development without a solid brand means selling on price. There was no place proving competence before the first conversation.',
    },
    solution: {
      pt: 'Construção da marca inteira: naming, símbolo isométrico com degradê dourado, sistema de cores, tom de voz e um site rápido, responsivo e otimizado para conversão.',
      en: 'Building the entire brand: naming, isometric symbol with a gold gradient, color system, tone of voice and a fast, responsive, conversion-focused site.',
    },
    outcome: {
      pt: 'Um canal comercial no ar que apresenta serviços, portfólio e contato — e sustenta a prospecção de clientes de forma profissional.',
      en: 'A live commercial channel presenting services, portfolio and contact — supporting client outreach professionally.',
    },
    stack: ['React', 'TypeScript', 'CSS Moderno', 'SEO', 'Design de Marca'],
    metrics: [
      { value: '100%', label: { pt: 'Responsivo', en: 'Responsive' } },
      { value: '1', label: { pt: 'Marca criada do zero', en: 'Brand built from zero' } },
    ],
    links: [
      { kind: 'live', label: { pt: 'Ver site', en: 'Visit site' }, href: 'https://www.vecttex.com.br' },
    ],
    snippet: {
      filename: 'brand.tokens.ts',
      language: 'ts',
      code: [
        'export const brand = {',
        "  name: 'Vecttex',",
        "  slogan: 'CONEXÃO. INOVAÇÃO. TECNOLOGIA.',",
        '  palette: {',
        "    primary: '#FFB000',",
        "    deep: '#FF8A00',",
        "    light: '#FFD166',",
        '  },',
        '} as const',
      ].join('\n'),
    },
  },
  {
    id: 'brasa-nove',
    marker: '02',
    name: 'Brasa Nove',
    category: { pt: 'Web app + Mobile · Restaurante & Delivery', en: 'Web app + Mobile · Restaurant & Delivery' },
    tagline: {
      pt: 'Um produto de delivery configurável, não um site de restaurante.',
      en: 'A configurable delivery product — not a restaurant website.',
    },
    summary: {
      pt: 'Aplicação de cardápio, pedidos e delivery com painel administrativo completo: o dono do restaurante liga e desliga cada recurso sem tocar em uma linha de código.',
      en: 'Menu, ordering and delivery application with a full admin panel: the restaurant owner toggles every feature without touching a line of code.',
    },
    problem: {
      pt: 'Restaurantes pagam mensalidade cara por marketplaces e ainda perdem a relação direta com o cliente. Cada novo cliente exigiria um sistema do zero.',
      en: 'Restaurants pay expensive marketplace fees and still lose the direct relationship with the customer. Each new client would demand a system from scratch.',
    },
    solution: {
      pt: 'Arquitetei uma base white-label: toda a configuração vive no admin, com flags no banco definindo o que aparece na tela — inclusive tema claro/escuro e seletor de cor da marca.',
      en: 'I architected a white-label base: every setting lives in the admin, with database flags defining what shows up on screen — including light/dark theme and a brand color picker.',
    },
    outcome: {
      pt: 'Um mesmo código atende vários restaurantes. O que era projeto sob medida virou produto replicável, com deploy contínuo e testes verdes a cada entrega.',
      en: 'One codebase serves many restaurants. What was a bespoke project became a replicable product, with continuous deploys and green tests on every release.',
    },
    stack: ['React', 'TypeScript', 'CSS Modules', 'React Native', 'Node', 'Vercel'],
    metrics: [
      { value: 'N', label: { pt: 'Restaurantes por base', en: 'Restaurants per codebase' } },
      { value: '2', label: { pt: 'Temas + cor de marca', en: 'Themes + brand color' } },
    ],
    snippet: {
      filename: 'FeatureFlags.ts',
      language: 'ts',
      code: [
        'type Feature = keyof typeof defaults',
        '',
        'const defaults = {',
        '  delivery: true,',
        '  tableOrders: false,',
        '  loyaltyProgram: false,',
        '} as const',
        '',
        'export function isEnabled(flags: Settings, key: Feature) {',
        '  return flags[key] ?? defaults[key]',
        '}',
      ].join('\n'),
    },
  },
  {
    id: 'erp',
    marker: '03',
    name: 'ERP Mobile & Web',
    category: { pt: 'Sistema corporativo · Célebre Informática', en: 'Enterprise system · Célebre Informática' },
    tagline: {
      pt: 'Onde o código encontra a operação real de uma empresa.',
      en: 'Where code meets a company real operation.',
    },
    summary: {
      pt: 'Aplicações web e mobile de ERP usadas no dia a dia por equipes inteiras: cadastro, faturamento, integrações fiscais e relatórios que não podem falhar.',
      en: 'Web and mobile ERP applications used daily by entire teams: records, invoicing, fiscal integrations and reports that cannot fail.',
    },
    problem: {
      pt: 'Sistema legado, telas acopladas e consultas pesadas: cada nova regra fiscal virava semanas de retrabalho e risco de quebrar o que já funcionava.',
      en: 'A legacy system with coupled screens and heavy queries: every new fiscal rule meant weeks of rework and the risk of breaking what already worked.',
    },
    solution: {
      pt: 'Apliquei Clean Architecture, MVVM e modularização, separei camadas, escrevi consultas T-SQL otimizadas para NF-e e EDI e implantei pipelines de CI/CD.',
      en: 'I applied Clean Architecture, MVVM and modularization, separated layers, wrote optimized T-SQL for NF-e and EDI, and set up CI/CD pipelines.',
    },
    outcome: {
      pt: 'Menos bugs, menos gargalos e entregas previsíveis — com padronização de boas práticas disseminada no time via code review.',
      en: 'Fewer bugs, fewer bottlenecks and predictable delivery — with engineering standards spread across the team through code review.',
    },
    stack: ['.NET', 'C#', 'React', 'React Native', 'Kotlin', 'SQL Server', 'Azure DevOps'],
    metrics: [
      { value: '4+', label: { pt: 'Anos em produção', en: 'Years in production' } },
      { value: 'CI/CD', label: { pt: 'Deploy automatizado', en: 'Automated delivery' } },
    ],
    links: [
      { kind: 'private', label: { pt: 'Código privado', en: 'Private codebase' }, href: '' },
    ],
    snippet: {
      filename: 'InvoiceRepository.cs',
      language: 'csharp',
      code: [
        'public sealed class InvoiceRepository : IInvoiceRepository',
        '{',
        '    private readonly IDbConnection _db;',
        '',
        '    public Task<Invoice?> FindAsync(string accessKey) =>',
        '        _db.QuerySingleOrDefaultAsync<Invoice>(',
        '            InvoiceQueries.ByAccessKey,',
        '            new { accessKey });',
        '}',
      ].join('\n'),
    },
  },
]
