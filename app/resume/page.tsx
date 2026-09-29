// Resume Imports
import { Header } from "./header";
import { Experience } from "./experience";
import SocialLinks from "./socialLinks";
import { Skills } from "./skills";
import { Education } from "./education";
import type { Metadata } from "next";
import { siteConfig } from "@/site.config";

const title = "Resume | Alfredo R. Pabon — Front-End Software Engineer";
const description =
  "Explore Alfredo R. Pabon's experience, skills, and education as a Front-End Software Engineer specializing in React, Next.js, TypeScript, and accessible web applications.";

const thumbnailUrl = new URL("/api/og", siteConfig.site_domain);
thumbnailUrl.searchParams.set("title", "Alfredo R. Pabon | Resume");
thumbnailUrl.searchParams.set(
  "description",
  "Front-End Software Engineer • React, Next.js, TypeScript & Accessibility",
);

const thumbnail = {
  url: thumbnailUrl.toString(),
  width: 1200,
  height: 630,
  alt: "Alfredo R. Pabon — Resume — Front-End Software Engineer specializing in React, Next.js, TypeScript, and accessibility",
};

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/resume" },
  openGraph: {
    type: "website",
    url: "/resume",
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

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-alternative">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
        <div className="lg:flex lg:justify-between lg:gap-4">
          {/* Left Column - Fixed */}
          <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
            <div>
              <Header />
            </div>
          </header>

          {/* Right Column - Scrollable */}
          <main className="pt-6 lg:w-1/2 lg:py-24">
            <Experience />
            <Skills />
            <Education />
          </main>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="mt-16 pb-16 text-sm text-muted-foreground lg:pb-0">
      <p>
        Loosely designed in{" "}
        <a
          href="https://figma.com"
          className="font-medium text-foreground hover:text-primary"
          target="_blank"
          rel="noreferrer noopener"
        >
          Figma
        </a>{" "}
        and coded in{" "}
        <a
          href="https://code.visualstudio.com/"
          className="font-medium text-foreground hover:text-primary"
          target="_blank"
          rel="noreferrer noopener"
        >
          Visual Studio Code
        </a>
        . Built with{" "}
        <a
          href="https://nextjs.org/"
          className="font-medium text-foreground hover:text-primary"
          target="_blank"
          rel="noreferrer noopener"
        >
          Next.js
        </a>{" "}
        and{" "}
        <a
          href="https://tailwindcss.com/"
          className="font-medium text-foreground hover:text-primary"
          target="_blank"
          rel="noreferrer noopener"
        >
          Tailwind CSS
        </a>
        , deployed with{" "}
        <a
          href="https://vercel.com/"
          className="font-medium text-foreground hover:text-primary"
          target="_blank"
          rel="noreferrer noopener"
        >
          Vercel
        </a>
        .
      </p>
    </footer>
  );
}
