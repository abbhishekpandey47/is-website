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
  startWhenVisible?: boolean;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  speedMs = 70,
  startDelayMs = 0,
  cursor = true,
  cursorBlinkMs = 500,
  runOnce = true,
  className = "",
  startWhenVisible = true,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [isTyping, setIsTyping] = useState(true);
  const hasRun = useRef(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reducedMotion = useRef(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const clearTimers = () => {
      if (startTimeoutRef.current) {
        clearTimeout(startTimeoutRef.current);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };

    clearTimers();

    if (!startWhenVisible) {
      return clearTimers;
    }

    if (reducedMotion.current || (runOnce && hasRun.current)) {
      setDisplayedText(text);
      setIsTyping(false);
      setShowCursor(false);
      return clearTimers;
    }

    hasRun.current = true;
    setDisplayedText("");
    setIsTyping(true);
    setShowCursor(cursor);

    startTimeoutRef.current = setTimeout(() => {
      let i = 0;
      intervalRef.current = setInterval(() => {
        i += 1;
        setDisplayedText(text.slice(0, i));
        if (i >= text.length) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setIsTyping(false);
          if (runOnce && !cursor) {
            setShowCursor(false);
          }
        }
      }, speedMs);
    }, startDelayMs);

    return clearTimers;
  }, [text, speedMs, startDelayMs, runOnce, cursor, startWhenVisible]);

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
