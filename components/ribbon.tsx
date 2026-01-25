"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";

export default function Ribbon({
  ribbonImage = "",
  ribbonText = "",
  ribbonSubtext = "",
}: {
  ribbonImage: string;
  ribbonText: string;
  ribbonSubtext?: string;
}) {
  const [offsetY, setOffsetY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      // Only apply parallax on screens >= 768px (md breakpoint)
      if (window.innerWidth < 768) {
        setOffsetY(0);
        return;
      }

      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            const scrolled = -rect.top;
            const maxOffset = rect.height * 0.5;
            const clampedOffset = Math.max(
              -maxOffset,
              Math.min(maxOffset, scrolled * 0.4),
            );

            setOffsetY(clampedOffset);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleResize = () => {
      // Reset offset when resizing to/from mobile
      if (window.innerWidth < 768) {
        setOffsetY(0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-primary py-24 lg:py-32 overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 -top-1/2 h-[200%]"
        style={{
          transform: `translate3d(0, ${offsetY}px, 0)`,
          willChange: "transform",
        }}
      >
        <Image
          src={ribbonImage || "/placeholder.svg"}
          alt={ribbonText}
          fill
          className="object-cover"
        />
        {/* <div className="absolute inset-0 bg-black/40" /> */}
        <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/50 to-black/80" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-5xl text-center">
          <h2
            className="text-balance font-serif text-5xl font-light tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl max-w-5xl"
            style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
          >
            {ribbonText}
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-white/90 lg:text-xl">
            {ribbonSubtext}
          </p>
        </div>
      </div>
    </section>
  );
}
