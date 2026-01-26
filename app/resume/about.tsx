export function About() {
  return (
    <section
      id="about"
      className="mb-8 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
    >
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-background/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-foreground lg:sr-only">
          About
        </h2>
      </div>
      <div className="space-y-4 text-base text-foreground md:leading-8">
        <p>
          Front-End Software Engineer with experience building production-grade
          React and Next.js applications in enterprise, headless CMS, and
          design-driven environments.{" "}
        </p>
        <p>
          I specialize in reusable component architecture, accessibility-first
          development (WCAG 2.1 / Section 508), and modern UI systems powered by
          TypeScript, Tailwind CSS, GraphQL, and REST APIs. I've worked across
          regulated, large-scale organizations including Trane Technologies,
          MIT, and Merrill Lynch, delivering maintainable solutions that scale
          across teams and products.
        </p>
      </div>
    </section>
  );
}
