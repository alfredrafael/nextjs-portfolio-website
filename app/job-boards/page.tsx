// Craft Imports
import { Container } from "@/components/craft";
import { ArrowUpRight, BriefcaseBusiness } from "lucide-react";
import type { Metadata } from "next";
import { siteConfig } from "@/site.config";
import SearchTerms from "./search-terms";
import ApplicationChecklist from "./application-checklist";

const thumbnail = {
  url: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
  alt: "Job Boards",
};

const title = "Job Boards";
const description = "Various job boards to find the best opportunities";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/job-boards" },
  openGraph: {
    type: "website",
    url: "/job-boards",
    siteName: siteConfig.site_name,
    title,
    description,
    images: [thumbnail],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [thumbnail],
  },
};

const jobBoards = [
  {
    name: "Built In",
    category: "Front-end engineering",
    description: "Explore remote front-end engineering opportunities.",
    href: "https://builtin.com/jobs/remote/dev-engineering/search/front-end-engineer",
  },
  {
    name: "Welcome to the Jungle",
    category: "Remote · US",
    description: "Find your next opportunity with a remote US job search.",
    href: "https://www.welcometothejungle.com/en/pages/jobs-remote-us",
  },
  {
    name: "Wellfound",
    category: "Remote opportunities",
    description: "Discover remote roles and explore your next career move.",
    href: "https://wellfound.com/remote",
  },
  {
    name: "Tech Jobs for Good",
    category: "Social impact",
    description: "Explore remote opportunities with a focus on doing good.",
    href: "https://techjobsforgood.com/jobs/?locations=remote&sort_by=date&utm_source=chatgpt.com",
  },
  {
    name: "WordPress Jobs",
    category: "WordPress",
    description: "Find opportunities in the WordPress ecosystem.",
    href: "https://jobs.wordpress.net/",
  },
  {
    name: "A11y Jobs",
    category: "Accessibility",
    description: "Explore remote roles focused on digital accessibility.",
    href: "https://www.a11yjobs.com/locations/remote",
  },
  {
    name: "EDUCAUSE Career Center",
    category: "Higher education",
    description: "Explore career opportunities in higher education technology.",
    href: "https://www.educause.edu/careers/educause-career-center",
  },
  {
    name: "We Work Remotely",
    category: "Front-end development",
    description: "Browse remote opportunities for front-end developers.",
    href: "https://weworkremotely.com/remote-jobs-front-end-dev",
  },
  {
    name: "Remote.co",
    category: "Development",
    description: "Explore remote developer roles for your next chapter.",
    href: "https://remote.co/remote-jobs/developer",
  },
  {
    name: "Work at a Startup",
    category: "Startups",
    description: "Discover opportunities to build your career at a startup.",
    href: "https://www.workatastartup.com/",
  },
];

export default function JobBoards() {
  return (
    <div className="bg-alternative">
      <Container className="py-12 sm:py-16">
        <header className="mb-10 max-w-2xl">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground">
            <BriefcaseBusiness aria-hidden="true" className="size-3.5" />
            Career resources
          </span>
          <h1 className="font-serif text-4xl tracking-tight sm:text-5xl">
            Job Boards
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            When a board surfaces an opportunity, search for the company’s own
            careers page and apply there! <ApplicationChecklist />
          </p>
        </header>

        <ul
          className="m-0 flex list-none flex-wrap gap-5 p-0"
          aria-label="Job boards"
        >
          {jobBoards.map((board) => (
            <li
              key={board.name}
              className="flex min-w-0 basis-full sm:basis-[calc(50%-0.625rem)] lg:basis-[calc(33.333333%-0.833334rem)]"
            >
              <a
                href={board.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-full flex-col rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-sm transition duration-200 hover:border-foreground/30 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring motion-safe:hover:-translate-y-1"
              >
                <div className="mb-6 flex items-center justify-between gap-3">
                  <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                    {board.category}
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-5 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground"
                  />
                </div>
                <h2 className="text-xl font-semibold tracking-tight">
                  {board.name}
                </h2>
                <p className="mb-6 mt-3 text-sm leading-relaxed text-muted-foreground">
                  {board.description}
                </p>
                <span className="mt-auto border-t border-border pt-4 text-sm font-medium">
                  Explore jobs <span aria-hidden="true">→</span>
                </span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
        <SearchTerms />
      </Container>
    </div>
  );
}
