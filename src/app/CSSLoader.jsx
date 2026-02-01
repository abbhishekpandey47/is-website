'use client';

import { useEffect } from 'react';

export function CSSLoader() {
  useEffect(() => {
    // Defer main CSS chunks that aren't critical
    // Load them with low priority after page interactive
    const links = [
      '/_next/static/css/chunks/19d7b415bdc069ad.css',
      '/_next/static/css/chunks/1a01acfb1b6bc028.css'
    ];

    links.forEach(href => {
      // Check if link already loaded
      if (!document.querySelector(`link[href="${href}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        link.media = 'print';
        link.onload = function() {
          link.media = 'all';
        };
        // Use requestIdleCallback for truly non-blocking load
        if ('requestIdleCallback' in globalThis) {
          globalThis.requestIdleCallback(() => document.head.appendChild(link));
        } else {
          setTimeout(() => document.head.appendChild(link), 1000);
        }
      }
    });
  }, []);

  return null;
}
