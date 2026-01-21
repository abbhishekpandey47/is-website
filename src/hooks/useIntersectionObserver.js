
import { useEffect, useRef, useState } from "react";

/**
 * Enhanced Intersection Observer hook
 * Includes hasBeenVisible to prevent re-rendering of components after they've loaded
 * Useful for lazy loading images, components, and animations
 */
export const useIntersectionObserver = ({
  root = null,
  rootMargin = "50px",
  threshold = 0.1,
  unobserveAfterVisible = true,
} = {}) => {
  const ref = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element || typeof IntersectionObserver === "undefined") {
      // Fallback for browsers without IntersectionObserver
      setHasBeenVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        
        // Mark as visible once it intersects
        if (entry.isIntersecting) {
          setHasBeenVisible(true);
          
          // Optionally stop observing after first intersection
          if (unobserveAfterVisible) {
            observer.unobserve(element);
          }
        }
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
  }, [root, rootMargin, threshold, unobserveAfterVisible]);

  return { ref, isIntersecting, hasBeenVisible };
};
