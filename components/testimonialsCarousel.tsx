"use client";

import { useState, useEffect, useCallback, useRef, TouchEvent } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Testimonial } from "@/lib/types";
interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
  autoScroll?: boolean;
  autoScrollInterval?: number;
  showControls?: boolean;
  cardsPerView?: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
}

export function TestimonialsCarousel({
  testimonials,
  autoScroll = false,
  autoScrollInterval = 5000,
  showControls = true,
  cardsPerView = { mobile: 1, tablet: 2, desktop: 3 },
}: TestimonialsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [baseCardsVisible, setBaseCardsVisible] = useState(
    cardsPerView.desktop || 3,
  );
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const peekAmount = baseCardsVisible === 1 ? 0.15 : 0.33;

  const effectiveVisibleCards = baseCardsVisible + peekAmount;

  // Minimum swipe distance (in px) to trigger a slide change
  const minSwipeDistance = 50;

  useEffect(() => {
    const updateCardsVisible = () => {
      const width = window.innerWidth;
      if (width < 768) setBaseCardsVisible(cardsPerView.mobile || 1);
      else if (width < 1024) setBaseCardsVisible(cardsPerView.tablet || 2);
      else setBaseCardsVisible(cardsPerView.desktop || 3);
    };

    updateCardsVisible();
    window.addEventListener("resize", updateCardsVisible);
    return () => window.removeEventListener("resize", updateCardsVisible);
  }, [cardsPerView]);

  const maxIndex = Math.max(0, testimonials.length - baseCardsVisible);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // Touch Handlers for Mobile Swipe
  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null); // Reset for new swipe
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentIndex < maxIndex) {
      goToNext();
    } else if (isRightSwipe && currentIndex > 0) {
      goToPrevious();
    }
  };

  return (
    <div
      className="relative w-full max-w-7xl mx-auto px-2 md:px-16"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="relative">
        {/* 2. This container handles the clipping of the cards */}
        <div className="overflow-hidden px-1">
          {" "}
          {/* px-1 prevents card shadows from being cut off */}
          <div
            ref={containerRef}
            className="flex gap-6 transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${
                currentIndex === maxIndex && currentIndex !== 0
                  ? // Total items minus full visible slots, multiplied by the width of a slot
                    (testimonials.length - baseCardsVisible) *
                    (100 / effectiveVisibleCards)
                  : currentIndex * (100 / effectiveVisibleCards)
              }%)`,
            }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="shrink-0 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-md"
                style={{
                  width: `calc(${100 / effectiveVisibleCards}% - ${
                    (baseCardsVisible * 1.5) / effectiveVisibleCards
                  }rem)`,
                }}
              >
                {/* Card Content ... */}
                <div className="p-6 h-full flex flex-col">
                  <Quote className="h-5 w-5 text-blue-600 mb-4" />
                  <p className="text-gray-700 dark:text-gray-300">
                    "{testimonial.content}"
                  </p>
                  <div className="mt-auto pt-4">
                    <p className="font-bold">{testimonial.author}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Controls */}
        {showControls && (
          <div className="hidden md:block">
            <button
              className="absolute -left-12 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-full shadow-lg p-3 disabled:opacity-30 transition-all hover:scale-110 z-20"
              onClick={goToPrevious}
              disabled={currentIndex === 0}
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            </button>
            <button
              className="absolute -right-12 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-full shadow-lg p-3 disabled:opacity-30 transition-all hover:scale-110 z-20"
              onClick={goToNext}
              disabled={currentIndex >= maxIndex}
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
