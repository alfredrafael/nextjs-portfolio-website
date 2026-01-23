"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function PageHeader({
  title = "",
  subtitle = "",
  imgSrc = "",
  alt = "Header Image",
}: {
  title?: string;
  subtitle?: string;
  imgSrc?: string;
  alt?: string;
}) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="relative bg-primary py-24 lg:py-32 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-x-0 -top-1/2 bottom-0 z-0"
        style={{
          // transform: `translateY(${scrollY * 0.5}px)`,
          transform: `translate3d(0, ${scrollY * 0.5}px, 0)`,
        }}
      >
        {imgSrc && (
          <Image
            src={imgSrc || "/placeholder.svg"}
            className="h-full w-full object-cover"
            fill
            priority
            alt={alt}
          />
        )}
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h1
            className="text-balance font-serif text-5xl font-light tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl max-w-3xl"
            style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="mt-6 text-pretty text-lg leading-relaxed text-white/90 lg:text-xl">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </header>
  );
}
