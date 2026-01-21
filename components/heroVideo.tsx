"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Typewriter from "@/components/typewriter";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {/* Video for desktop */}
        <video
          src="https://www.alfredorafael.com/wp-content/uploads/2023/12/hero-clip.mp4"
          className="hidden h-full w-full object-cover will-change-transform md:block"
          autoPlay
          loop
          muted
        />
        {/* Image for mobile */}
        <img
          src="http://www.alfredorafael.com/wp-content/uploads/2026/01/pexels-life-of-pix-7974-scaled-e1769021899692.jpg"
          alt="Hero background"
          className="block h-full w-full object-cover md:hidden"
        />
      </div>
      {/* <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/10 to-background" /> */}

      <div className="hero-gradient" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-60 text-center sm:px-8 sm:pb-24 lg:px-12 lg:pb-45">
        <h1
          className="text-balance text-4xl tracking-tight text-white sm:text-4xl md:text-5xl lg:text-7xl mt-1"
          style={{
            textShadow: "2px 2px 4px rgba(0, 0, 0, 1)",
            fontFamily: "'Courier New', monospace",
            // fontWeight: "530",
          }}
        >
          <Typewriter text="Front-End Developer" delay={160} />
        </h1>

        {/* <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/contact">
            <Button size="lg" className="w-full sm:w-auto">
              Start a Project
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto bg-transparent"
            onClick={(e) => {
              e.preventDefault();
              const projectsSection = document.getElementById("projects");
              if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            View Work
          </Button>
        </div> */}
      </div>
    </section>
  );
}
