/**
 * Performance Monitoring & Optimization Utilities
 * 
 * Helps identify and optimize slow components and heavy JavaScript
 */

/**
 * Log component render time in development
 * Helps identify expensive components
 * 
 * Usage:
 * logRenderTime('ComponentName', () => {
 *   // component code
 * });
 */
export function logRenderTime(componentName, callback) {
  if (process.env.NODE_ENV === 'development') {
    const start = performance.now();
    const result = callback();
    const end = performance.now();
    
    if (end - start > 16) { // Longer than one frame (60fps)
      console.warn(`⚠️  ${componentName} took ${(end - start).toFixed(2)}ms to render`);
    }
    
    return result;
  }
  return callback();
}

/**
 * Memoization utility for expensive computations
 * Caches results based on input parameters
 */
export function createMemoizedFunction(fn, options = {}) {
  const cache = new Map();
  const maxSize = options.maxSize || 100;
  
  return (...args) => {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = fn(...args);
    
    if (cache.size >= maxSize) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }
    
    cache.set(key, result);
    return result;
  };
}

/**
 * Defer non-critical operations to prevent main thread blocking
 * Uses requestIdleCallback with setTimeout fallback
 */
export function deferExecution(callback, timeout = 1000) {
  if (typeof window === 'undefined') return;
  
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(callback, { timeout });
  } else {
    window.setTimeout(callback, Math.min(timeout, 100));
  }
}

/**
 * Lazy load an external script
 * Useful for third-party libraries loaded conditionally
 */
export function lazyLoadScript(src, options = {}) {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('lazyLoadScript: window is not defined'));
      return;
    }
    
    // Check if script already loaded
    if (window[options.globalVar]) {
      resolve(window[options.globalVar]);
      return;
    }
    
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      resolve(window[options.globalVar]);
    };
    
    script.onerror = () => {
      reject(new Error(`Failed to load script: ${src}`));
    };
    
    document.head.appendChild(script);
  });
}

/**
 * Intersection Observer wrapper for lazy loading components
 * 
 * Usage:
 * const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });
 * 
 * return (
 *   <div ref={ref}>
 *     {isVisible && <ExpensiveComponent />}
 *   </div>
 * );
 */
export function useIntersectionObserver(options = {}) {
  const [isVisible, setIsVisible] = React.useState(false);
  const ref = React.useRef(null);
  
  React.useEffect(() => {
    if (!ref.current) return;
    
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, {
      threshold: options.threshold || 0.1,
      ...options,
    });
    
    observer.observe(ref.current);
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options]);
  
  return { ref, isVisible };
}

/**
 * Debounce function to prevent excessive function calls
 * Useful for scroll/resize events
 */
export function debounce(fn, delay = 300) {
  let timeoutId;
  
  return function debounced(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Throttle function to limit function calls over time
 * Useful for scroll/mousemove events
 */
export function throttle(fn, limit = 100) {
  let inThrottle;
  
  return function throttled(...args) {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Monitor Core Web Vitals
 * Reports on Largest Contentful Paint, First Input Delay, Cumulative Layout Shift
 */
export function initWebVitalsMonitoring() {
  if (typeof window === 'undefined') return;
  
  // Largest Contentful Paint
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (process.env.NODE_ENV === 'development') {
            console.log('LCP:', entry.renderTime || entry.loadTime);
          }
        }
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      // LCP observer not supported
    }
  }
  
  // First Input Delay
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (process.env.NODE_ENV === 'development') {
            console.log('FID:', entry.processingDuration);
          }
        }
      });
      observer.observe({ entryTypes: ['first-input'] });
    } catch (e) {
      // FID observer not supported
    }
  }
}

/**
 * Batch DOM updates to prevent layout thrashing
 */
export function batchDOMUpdates(callback) {
  if (typeof window === 'undefined') {
    callback();
    return;
  }
  
  if ('requestAnimationFrame' in window) {
    requestAnimationFrame(callback);
  } else {
    callback();
  }
}

export default {
  logRenderTime,
  createMemoizedFunction,
  deferExecution,
  lazyLoadScript,
  useIntersectionObserver,
  debounce,
  throttle,
  initWebVitalsMonitoring,
  batchDOMUpdates,
};
