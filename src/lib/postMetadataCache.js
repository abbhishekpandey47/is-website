/**
 * Lazy load and cache post metadata to reduce initial bundle size
 * Posts are loaded only when needed (e.g., on blog listing pages)
 */

let postMetadataCache = null;

export const getPostMetadata = async () => {
  if (postMetadataCache) {
    return postMetadataCache;
  }

  try {
    // Dynamic import of the metadata file
    const metadata = await import('../../posts/_postMetadata.js');
    postMetadataCache = metadata.default || metadata;
    return postMetadataCache;
  } catch (error) {
    console.error('Error loading post metadata:', error);
    return [];
  }
};

/**
 * Get metadata synchronously if already loaded, otherwise return empty array
 * Use this in components that need immediate access (already cached)
 */
export const getPostMetadataSync = () => {
  return postMetadataCache || [];
};

/**
 * Preload metadata in the background (call this on route changes to blog)
 */
export const preloadPostMetadata = () => {
  if (!postMetadataCache && typeof window !== 'undefined') {
    getPostMetadata();
  }
};
