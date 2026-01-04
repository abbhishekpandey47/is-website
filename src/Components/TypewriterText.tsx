"use client";
import { useEffect, useRef, useState } from "react";

interface TypewriterTextProps {
  text: string;
  speedMs?: number;
  startDelayMs?: number;
  cursor?: boolean;
  cursorBlinkMs?: number;
  runOnce?: boolean;
  className?: string;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  speedMs = 35,
  startDelayMs = 0,
  cursor = true,
  cursorBlinkMs = 500,
  runOnce = true,
  className = "",
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isTyping, setIsTyping] = useState(true);
  const hasRun = useRef(false);
  const reducedMotion = useRef(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    if (reducedMotion.current || (runOnce && hasRun.current)) {
      setDisplayedText(text);
      setIsTyping(false);
      setShowCursor(false);
      return;
    }

    hasRun.current = true;

    const startTimeout = setTimeout(() => {
      const typingInterval = setInterval(() => {
        if (index < text.length) {
          setDisplayedText((prev) => prev + text[index]);
          setIndex((prev) => prev + 1);
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
          if (runOnce && !cursor) {
            setShowCursor(false);
          }
        }
      }, speedMs);

      return () => clearInterval(typingInterval);
    }, startDelayMs);

    return () => clearTimeout(startTimeout);
  }, [text, speedMs, startDelayMs, index, runOnce, cursor]);

  useEffect(() => {
    if (!cursor || !isTyping) return;

    const blinkInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, cursorBlinkMs);

    return () => clearInterval(blinkInterval);
  }, [cursor, cursorBlinkMs, isTyping]);

  return (
    <span className={className}>
      {displayedText}
      {showCursor && <span className="animate-blink">|</span>}
    </span>
  );
};

export default TypewriterText;
