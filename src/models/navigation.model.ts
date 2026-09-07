import type { Localized, SectionId } from './common.model'

export type NavItem = {
  id: Exclude<SectionId, 'hero'>
  label: Localized
  /** Numeric marker rendered next to the label, IDE gutter style. */
  marker: string
}

export const navigation: NavItem[] = [
  { id: 'about', marker: '01', label: { pt: 'Sobre', en: 'About' } },
  { id: 'stack', marker: '02', label: { pt: 'Stack', en: 'Stack' } },
  { id: 'projects', marker: '03', label: { pt: 'Projetos', en: 'Work' } },
  { id: 'timeline', marker: '04', label: { pt: 'Trajetória', en: 'Timeline' } },
  { id: 'services', marker: '05', label: { pt: 'Serviços', en: 'Services' } },
  { id: 'contact', marker: '06', label: { pt: 'Contato', en: 'Contact' } },
]
