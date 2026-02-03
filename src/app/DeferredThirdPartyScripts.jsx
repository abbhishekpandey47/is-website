'use client';

import { useEffect } from 'react';

export function DeferredThirdPartyScripts() {
  useEffect(() => {
    // Defer Koala (customer insights) - not critical
    const koalaScript = document.createElement('script');
    koalaScript.src = 'https://cdn.getkoala.com/v1/pixel.js?rk=1693411519';
    koalaScript.async = true;
    koalaScript.defer = true;
    document.body.appendChild(koalaScript);

    // Defer Surveys.com - not critical for initial load
    setTimeout(() => {
      const surveysScript = document.createElement('script');
      surveysScript.src = 'https://static.surveys.com/static/surveys.js?v=1.298.1';
      surveysScript.async = true;
      surveysScript.defer = true;
      document.body.appendChild(surveysScript);
    }, 3000); // Defer by 3 seconds

  }, []);

  return null;
}
