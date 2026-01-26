import { skillsData } from "@/app/data/resumeData";
export function Skills() {
  return (
    <section
      id="skills"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-12 lg:scroll-mt-24"
    >
      <h2 className="text-sm font-bold uppercase tracking-widest text-foreground">
        Skills
      </h2>
      <hr />
      <br />
      <div className="grid gap-6 sm:grid-cols-2 md:pl-8">
        {skillsData.map((category) => (
          <div
            key={category.title}
            className="rounded-lg border border-border/50 bg-card/50 p-4"
          >
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
              {category.title}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
