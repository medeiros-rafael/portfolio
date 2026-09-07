import { AboutSection } from '@/views/sections/AboutSection'
import { ContactSection } from '@/views/sections/ContactSection'
import { HeroSection } from '@/views/sections/HeroSection'
import { ProjectsSection } from '@/views/sections/ProjectsSection'
import { ServicesSection } from '@/views/sections/ServicesSection'
import { StackSection } from '@/views/sections/StackSection'
import { TimelineSection } from '@/views/sections/TimelineSection'
import { Footer } from '@/views/layout/Footer'
import { Header } from '@/views/layout/Header'
import { ScrollProgress } from '@/views/layout/ScrollProgress'
import { useI18n } from '@/controllers/hooks/useI18n'

export function App() {
  const { t } = useI18n()

  return (
    <>
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:rounded-full focus:bg-accent focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-on-accent"
      >
        {t.common.skipToContent}
      </a>

      <ScrollProgress />
      <Header />

      <main>
        <HeroSection />
        <AboutSection />
        <StackSection />
        <ProjectsSection />
        <TimelineSection />
        <ServicesSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  )
}
