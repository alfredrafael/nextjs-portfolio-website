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
        if (
          !(event.target instanceof Element) ||
          event.target.closest("summary") !== summary ||
          !summary
        )
          return;

        event.preventDefault();
        expanded.current = !expanded.current;
        const beforeToggle = details.getBoundingClientRect();
        const startHeight = beforeToggle.height;
        animation.current?.cancel();

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          delete details.dataset.closing;
          details.open = expanded.current;
          return;
        }

        // Keep content visible while width and height animate together.
        details.open = true;
        if (expanded.current) {
          delete details.dataset.closing;
        } else {
          details.dataset.closing = "";
        }
        const borderHeight = details.offsetHeight - details.clientHeight;
        const endHeight = expanded.current
          ? details.scrollHeight + borderHeight
          : summary.getBoundingClientRect().height + borderHeight;
        const afterToggle = details.getBoundingClientRect();

        const current = details.animate(
          [
            {
              height: `${startHeight}px`,
              width: `${beforeToggle.width}px`,
              transform: `translate(${beforeToggle.left - afterToggle.left}px, ${beforeToggle.top - afterToggle.top}px)`,
            },
            {
              height: `${endHeight}px`,
              width: `${afterToggle.width}px`,
              transform: "translate(0, 0)",
            },
          ],
          { duration: 360, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
        );
        animation.current = current;
        current.onfinish = () => {
          details.open = expanded.current;
          delete details.dataset.closing;
          animation.current = null;
        };
      }}
      style={{ minHeight: "7rem" }}
    />
  );
}
