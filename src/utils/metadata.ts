export const createMetadata = (
  title: string,
  description: string,
  url: string,
  ogImage?: string
) => {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url,
      ...(ogImage && {
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      }),
    }
  };
};
