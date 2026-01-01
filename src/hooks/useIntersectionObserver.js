import { useEffect, useRef, useState } from "react";

export const useIntersectionObserver = ({
  root = null,
  rootMargin = "0px",
  threshold = 0.1,
} = {}) => {
  const ref = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element || typeof IntersectionObserver === "undefined") {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        root,
        rootMargin,
        threshold,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [root, rootMargin, threshold]);

  return { ref, isIntersecting };
};
