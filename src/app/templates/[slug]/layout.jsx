import templateMetadata from "../../../../templates-data/_templateMetadata";

export async function generateMetadata({ params }) {
  const template = templateMetadata.find((t) => t.slug === params.slug);

  if (!template) {
    return {
      title: "Template Not Found | Infrasity",
      description: "The requested template could not be found.",
    };
  }

  return {
    title: `${template.title} | Infrasity Templates`,
    description: template.description,
    keywords: `${template.category}, ${template.title}, Content Marketing Template, B2B SaaS Templates, Technical Writing`,
    openGraph: {
      title: `${template.title} | Infrasity Templates`,
      description: template.description,
      images: [
        {
          url: template.bannerImage,
          width: 1200,
          height: 630,
          alt: template.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${template.title} | Infrasity Templates`,
      description: template.description,
      images: [template.bannerImage],
    },
  };
}

export default function TemplateLayout({ children }) {
  return children;
}
