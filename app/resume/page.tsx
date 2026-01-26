// Resume Imports
import { Header } from "./header";
import { Experience } from "./experience";
import SocialLinks from "./socialLinks";
import { Skills } from "./skills";
import { Education } from "./education";

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
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
