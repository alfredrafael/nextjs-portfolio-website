"use client";

import { useEffect, useState } from "react";
import { resumeNavItems } from "../data";
import { cn } from "@/lib/utils";

export function Navigation() {
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );

    resumeNavItems.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="nav hidden lg:block" aria-label="In-page jump links">
      <ul className="mt-16 w-max">
        {resumeNavItems.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={cn(
                "group flex items-center py-3 transition-all",
                activeSection === id
                  ? "text-foreground"
                  : "text-muted-foreground",
              )}
            >
              <span
                className={cn(
                  "mr-4 h-px transition-all group-hover:w-16 group-hover:bg-foreground",
                  activeSection === id
                    ? "w-16 bg-foreground"
                    : "w-8 bg-muted-foreground",
                )}
              />
              <span className="text-xs font-bold uppercase tracking-widest group-hover:text-foreground">
                {label}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
