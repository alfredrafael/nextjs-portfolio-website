import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { experienceData } from "@/app/data/resumeData";

export function Experience() {
  return (
    <section
      id="experience"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
    >
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-background/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-foreground lg:sr-only">
          Experience
        </h2>
      </div>
      <div>
        <ol className="group/list">
          {experienceData.map((exp, index) => (
            <li key={index} className="mb-12">
              <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-secondary/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg" />
                <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:col-span-2">
                  {exp.period}
                </header>
                <div className="z-10 sm:col-span-6 experience-content ml-0 -sm:ml-2">
                  <h3 className="text-base font-medium leading-tight text-foreground">
                    <span className="relative inline-block">
                      <strong className="block">{exp.title}</strong>
                      <i className="block text-muted-foreground">
                        {exp.company}
                      </i>
                    </span>
                  </h3>
                  <div className="mt-2 text-sm leading-relaxed text-foreground">
                    {exp.description}
                  </div>
                  <ul
                    className="mt-2 flex flex-wrap gap-2"
                    aria-label="Technologies used"
                  >
                    {exp.technologies.map((tech) => (
                      <li key={tech}>
                        <Badge
                          variant="secondary"
                          className="bg-primary/10 text-primary hover:bg-primary/20"
                        >
                          {tech}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-12">
          <a
            href="/resume.pdf"
            className="group inline-flex items-center font-semibold leading-tight text-foreground hover:text-primary"
          >
            View Full Résumé
            <ExternalLink className="ml-1 inline-block h-4 w-4 shrink-0 translate-y-px transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 motion-reduce:transition-none" />
          </a>
        </div>
      </div>
    </section>
  );
}
