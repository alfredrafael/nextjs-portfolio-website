"use client";

import { useEffect, useRef, type ComponentPropsWithoutRef } from "react";

export default function ApplicationDetails(
  props: ComponentPropsWithoutRef<"details">,
) {
  const animation = useRef<Animation | null>(null);
  const expanded = useRef(false);

  useEffect(() => () => animation.current?.cancel(), []);

  return (
    <details
      {...props}
      onClick={(event) => {
        const details = event.currentTarget;
        const summary = details.querySelector("summary");
        if (!(event.target instanceof Element) ||
            event.target.closest("summary") !== summary || !summary) return;

        event.preventDefault();
        expanded.current = !expanded.current;
        const startHeight = details.getBoundingClientRect().height;
        animation.current?.cancel();

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          details.open = expanded.current;
          return;
        }

        // Keep the full-width card open until its closing animation finishes.
        details.open = true;
        const borderHeight = details.offsetHeight - details.clientHeight;
        const endHeight = expanded.current
          ? details.scrollHeight + borderHeight
          : summary.getBoundingClientRect().height + borderHeight;

        const current = details.animate(
          { height: [`${startHeight}px`, `${endHeight}px`] },
          { duration: 360, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
        );
        animation.current = current;
        current.onfinish = () => {
          const before = details.getBoundingClientRect();
          details.open = expanded.current;
          animation.current = null;

          if (!expanded.current) {
            const after = details.getBoundingClientRect();
            if (Math.abs(before.width - after.width) < 1) return;

            // Animate the grid's full-width-to-half-width change without
            // scaling the text or changing the final grid placement.
            const resize = details.animate(
              [
                {
                  width: `${before.width}px`,
                  height: `${before.height}px`,
                  transform: `translate(${before.left - after.left}px, ${before.top - after.top}px)`,
                },
                {
                  width: `${after.width}px`,
                  height: `${after.height}px`,
                  transform: "translate(0, 0)",
                },
              ],
              { duration: 360, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
            );
            animation.current = resize;
            resize.onfinish = () => {
              animation.current = null;
            };
          }
        };
      }}
    />
  );
}
