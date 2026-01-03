import { notFound } from "next/navigation";
import path from "path";
import templateIndex from "../../../../templates-data/_templateIndex";
import TemplatePageClient from "./TemplatePageClient";

// Helper function to dynamically load template data
async function getTemplateData(slug) {
  try {
    const templateModule = await import(`../../../../templates-data/${slug}.js`);
    return templateModule.default;
  } catch (error) {
    console.error(`Failed to load template: ${slug}`, error);
    return null;
  }
}

// Generate static paths for all templates
export async function generateStaticParams() {
  return templateIndex.map((template) => ({
    slug: template.slug,
  }));
}

// Generate metadata for each template
export async function generateMetadata({ params }) {
  const { slug } = params;
  const template = await getTemplateData(slug);

  if (!template) {
    return {
      title: "Template Not Found",
    };
  }

  return {
    title: `${template.title} | Infrasity Templates`,
    description: template.description,
    openGraph: {
      title: template.title,
      description: template.description,
      images: [template.bannerImage],
    },
  };
}

// Server Component - Main Page
export default async function TemplateDetailPage({ params }) {
  const { slug } = params;
  const template = await getTemplateData(slug);

  if (!template) {
    notFound();
  }

  // Pass data to client component
  return <TemplatePageClient template={template} />;
}
