import SocialLinks from "./socialLinks";

export function Header() {
  return (
    <div>
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Alfredo R. Pabon
          </h1>
          <h2 className="mt-3 text-lg font-medium tracking-tight textBlue sm:text-xl">
            Front-End Software Engineer
          </h2>
        </div>
      </div>
      <SocialLinks />
      <br />
      <div className="space-y-4 text-base text-foreground md:leading-8 pr-4">
        <p>
          Front-End Software Engineer with experience building production-grade
          React and Next.js applications in enterprise, headless CMS, and
          design-driven environments.{" "}
        </p>
        <p className="hidden md:block">
          I specialize in reusable component architecture, accessibility-first
          development (WCAG 2.1 / Section 508), and modern UI systems powered by
          TypeScript, Tailwind CSS, GraphQL, and REST APIs. I've worked across
          regulated, large-scale organizations including Trane Technologies,
          MIT, and Merrill Lynch, delivering maintainable solutions that scale
          across teams and products.
        </p>
      </div>
    </div>
  );
}
