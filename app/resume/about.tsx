export function About() {
  return (
    <section
      id="about"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
    >
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-background/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-foreground lg:sr-only">
          About
        </h2>
      </div>
      <div className="space-y-4 text-base text-foreground md:leading-8">
        <p>
          I&apos;m a developer passionate about crafting accessible,
          pixel-perfect user interfaces that blend thoughtful design with robust
          engineering. My favorite work lies at the intersection of design and
          development, creating experiences that not only look great but are
          meticulously built for performance and usability.
        </p>
        <p>
          Currently, I&apos;m a Senior Software Engineer at{" "}
          <a
            href="#"
            className="font-medium text-foreground hover:text-primary"
          >
            TechCorp
          </a>
          , specializing in full-stack development. I contribute to building and
          maintaining the core platform that powers millions of users, ensuring
          our applications meet the highest standards of quality and
          accessibility.
        </p>
        {/* <p>
          In the past, I&apos;ve had the opportunity to develop software across
          a variety of settings — from{" "}
          <a
            href="#"
            className="font-medium text-foreground hover:text-primary"
          >
            innovative startups
          </a>{" "}
          and{" "}
          <a
            href="#"
            className="font-medium text-foreground hover:text-primary"
          >
            tech giants
          </a>{" "}
          to{" "}
          <a
            href="#"
            className="font-medium text-foreground hover:text-primary"
          >
            creative agencies
          </a>
          . I also enjoy sharing knowledge through technical writing and
          open-source contributions.
        </p>
        <p>
          When I&apos;m not at the computer, I&apos;m usually exploring hiking
          trails, experimenting with new recipes, or diving into a good sci-fi
          novel.
        </p> */}
      </div>
    </section>
  );
}
