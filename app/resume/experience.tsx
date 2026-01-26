import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { experienceData } from "@/app/data/resumeData";

export function Experience() {
  return (
    <section
      id="experience"
      className="mb-8 scroll-mt-16 md:mb-24 lg:mb-12 lg:scroll-mt-24"
    >
      <h2 className="text-sm font-bold uppercase tracking-widest text-foreground">
        Experience
      </h2>
      <hr />
      <br />
      <div>
        <ol className="group/list">
          {experienceData.map((exp, index) => (
            <li key={index} className="mb-12">
              <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:opacity-100! lg:group-hover/list:opacity-50">
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
                    className="mt-2 flex flex-wrap gap-2 technologiesUsedResume"
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
      </div>
    </section>
  );
}
