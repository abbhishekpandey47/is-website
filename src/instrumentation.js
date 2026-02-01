// Sentry instrumentation - completely disabled for performance
// Removes surveys.js (31 KiB) and other Sentry overhead from bundle

export async function register() {
  // Sentry disabled to prevent surveys.js from loading
}

export const onRequestError = () => {};
