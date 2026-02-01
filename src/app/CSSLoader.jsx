'use client';

import { useEffect } from 'react';

export function CSSLoader() {
  useEffect(() => {
    // Defer main CSS chunks using media query trick
    // media='print' makes the link non-critical, then switch to 'all' on load
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
        // Add immediately but marked as print (non-critical)
        document.head.appendChild(link);
      }
    });
  }, []);

  return null;
}
