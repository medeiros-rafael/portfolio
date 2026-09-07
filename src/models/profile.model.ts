import type { Localized } from './common.model'

export type SocialLink = {
  id: 'github' | 'linkedin' | 'whatsapp' | 'email' | 'instagram'
  label: string
  handle: string
  href: string
}

export type Profile = {
  name: string
  shortName: string
  initials: string
  role: Localized
  headline: Localized
  location: Localized
  experienceYears: number
  email: string
  phone: string
  resumeUrl: string
  socials: SocialLink[]
}

export const profile: Profile = {
  name: 'Rafael da Silva Medeiros',
  shortName: 'Rafael Medeiros',
  initials: 'RM',
  role: {
    pt: 'Desenvolvedor Full Stack',
    en: 'Full Stack Developer',
  },
  headline: {
    pt: 'Construo produtos web e mobile que aguentam escala — do modelo de dados à última animação.',
    en: 'I build web and mobile products that hold up at scale — from the data model to the last animation.',
  },
  location: {
    pt: 'Gravataí · Rio Grande do Sul · Brasil',
    en: 'Gravataí · Rio Grande do Sul · Brazil',
  },
  experienceYears: 6,
  email: 'rafael.silva.medeiros@hotmail.com',
  phone: '+55 51 98106-1315',
  resumeUrl: '/rafael-medeiros-cv.pdf',
  socials: [
    {
      id: 'github',
      label: 'GitHub',
      handle: 'medeiros-rafael',
      href: 'https://github.com/medeiros-rafael',
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      handle: 'rafael-da-silva-medeiros',
      href: 'https://www.linkedin.com/in/rafael-da-silva-medeiros',
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      handle: '+55 51 98106-1315',
      href: 'https://wa.me/5551981061315',
    },
    {
      id: 'email',
      label: 'E-mail',
      handle: 'rafael.silva.medeiros@hotmail.com',
      href: 'mailto:rafael.silva.medeiros@hotmail.com',
    },
  ],
}
