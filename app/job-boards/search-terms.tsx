"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

const searchTerms = [
  'site:job-boards.greenhouse.io React TypeScript "Remote, USA"',
  'site:jobs.ashbyhq.com React Next.js "United States"',
  "site:jobs.lever.co frontend React remote",
  'site:myworkdayjobs.com "Front End Developer" remote',
  "site:careers.*.com React WordPress remote",
  '"headless WordPress" React remote developer',
  '"headless CMS" Next.js remote engineer',
  '"WCAG" React TypeScript remote',
  '"Section 508" frontend developer remote',
  '"Advanced Custom Fields" remote developer',
  '"Senior Web Developer" WordPress React remote',
];

export default function SearchTerms() {
  const [copied, setCopied] = useState<string | null>(null);
  const [status, setStatus] = useState("");

  async function copyTerm(term: string) {
    try {
      await navigator.clipboard.writeText(term);
      setCopied(term);
      setStatus(`Copied: ${term}`);
    } catch {
      setCopied(null);
      setStatus("Could not copy. Select the search term and copy it manually.");
    }
  }

  return (
    <section className="mt-12" aria-labelledby="search-terms-heading">
      <h2
        id="search-terms-heading"
        className="font-serif text-3xl tracking-tight sm:text-4xl"
      >
        Search terms
      </h2>
      <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
        Click a search term to copy it, then paste it into your search engine.
      </p>

      <ul className="mt-6 flex list-none flex-col gap-3 p-0">
        {searchTerms.map((term) => (
          <li key={term}>
            <button
              type="button"
              onClick={() => void copyTerm(term)}
              aria-label={`Copy search term: ${term}`}
              className="flex w-full cursor-pointer items-center justify-between gap-4 rounded-xl border border-border bg-card p-5 text-left text-card-foreground shadow-sm transition-colors hover:border-foreground/30 hover:bg-muted/50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              <code className="min-w-0 break-words text-sm leading-relaxed">
                {term}
              </code>
              <span className="flex shrink-0 items-center gap-2 text-sm text-muted-foreground">
                {copied === term ? (
                  <Check aria-hidden="true" className="size-4" />
                ) : (
                  <Copy aria-hidden="true" className="size-4" />
                )}
                <span className="hidden sm:inline">
                  {copied === term ? "Copied!" : "Copy"}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
      <p
        role="status"
        aria-live="polite"
        className="mt-3 min-h-5 text-sm text-muted-foreground"
      >
        {status}
      </p>
    </section>
  );
}
