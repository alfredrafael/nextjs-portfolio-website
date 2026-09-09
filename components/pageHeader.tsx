"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Container } from "@/components/craft";
import { stripHtml } from "@/lib/metadata";

export default function PageHeader({
  title = "",
  subtitle = "",
  imgSrc = "",
  alt = "Header Image",
  textAlign = "center",
}: {
  title?: string;
  subtitle?: string;
  imgSrc?: string;
  textAlign?: "left" | "center" | "right";
  alt?: string;
}) {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const applyTransform = () => {
      if (parallaxRef.current) {
        // Clamp to 0 so iOS rubber-band overscroll (negative scrollY)
        // doesn't drag the image past its buffer and reveal the background.
        const scrollY = Math.max(0, window.scrollY);
        parallaxRef.current.style.transform = `translate3d(0, ${scrollY * 0.5}px, 0)`;
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(applyTransform);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="relative bg-primary py-24 lg:py-32 overflow-hidden">
      {/* Background Image */}
      <div
        ref={parallaxRef}
        className="absolute inset-x-0 -top-1/2 bottom-0 z-0"
      >
        {imgSrc && (
          <Image
            src={imgSrc}
            className="h-full w-full object-cover"
            fill
            priority
            alt={alt}
          />
        )}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <Container className="relative z-10 px-4">
        <div
          className={`max-w-3xl ${
            textAlign === "left"
              ? "mr-auto text-left"
              : textAlign === "right"
                ? "ml-auto text-right"
                : "mx-auto text-center"
          }`}
        >
          <h1
            className={`text-balance font-serif text-5xl font-light tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl max-w-3xl`}
            style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
          >
            {stripHtml(title)}
          </h1>
          {subtitle && (
            <p className="mt-6 text-pretty text-lg leading-relaxed text-white/90 lg:text-xl">
              {stripHtml(subtitle)}
            </p>
          )}
        </div>
      </Container>
    </header>
  );
}
