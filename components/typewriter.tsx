import React, { useEffect, useState, useContext } from "react";

type TypewriterProps = {
  text?: string;
  delay?: number;
  infinite?: boolean;
  cursor?: string;
  cursorBlinkMs?: number;
  cursorClassName?: string;
};
const Typewriter = ({
  text = "Your text goes here",
  delay = 100,
  infinite = false,
  cursor = "|",
  cursorBlinkMs = 500,
  cursorClassName = "",
}: TypewriterProps) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cursorOn, setCursorOn] = useState(true);

  // Type effect
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined;

    if (currentIndex < text.length) {
      timeout = setTimeout(() => {
        setCurrentText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, delay);
    } else if (infinite) {
      timeout = setTimeout(() => {
        setCurrentIndex(0);
        setCurrentText("");
      }, delay);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [currentIndex, delay, infinite, text]);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => setCursorOn((v) => !v), cursorBlinkMs);
    return () => clearInterval(interval);
  }, [cursorBlinkMs]);

  return (
    <span>
      {currentText}
      <span
        className={cursorClassName}
        style={{
          opacity: cursorOn ? 1 : 0,
          transition: "opacity 120ms linear",
        }}
        aria-hidden="true"
      >
        {cursor}
      </span>
    </span>
  );
};

export default Typewriter;
