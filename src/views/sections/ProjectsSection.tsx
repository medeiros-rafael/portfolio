import { SectionHeading } from '@/components/ui/SectionHeading'
import { useI18n } from '@/controllers/hooks/useI18n'
import { projects } from '@/models/project.model'
import { ProjectShowcase } from './parts/ProjectShowcase'

export function ProjectsSection() {
  const { t } = useI18n()

  return (
    <section id="projects" className="relative scroll-mt-24 border-t border-border/70">
      <div className="mx-auto w-full max-w-[1440px] px-6 pt-24 pb-4 sm:px-10 lg:px-16 lg:pt-32 2xl:px-24">
        <SectionHeading
          marker="03"
          label={t.projects.label}
          title={t.projects.title}
          subtitle={t.projects.subtitle}
        />
      </div>

      <div className="mt-12 lg:mt-16">
        {projects.map((project, index) => (
          <ProjectShowcase key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  )
}
