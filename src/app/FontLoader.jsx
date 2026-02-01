'use client';

import { useEffect } from 'react';

export function FontLoader() {
  useEffect(() => {
    // Load fonts.css asynchronously after page interactive
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/fonts.css';
    link.media = 'print';
    link.onload = function() {
      link.media = 'all';
    };
    document.head.appendChild(link);
  }, []);

  return null;
}
