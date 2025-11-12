import Hero from "@/components/docs-landing/Hero";
import TrustGrid from "@/components/docs-landing/TrustGrid";

export const metadata = {
  title: "Infrasity Docs: Documentation That Drives Developer Adoption",
  description: "Engineer-first documentation solutions that transform how developers engage with your product.",
};

export default function DocsLandingPage() {
  return (
    <div className="bg-gray-950 text-white min-h-screen">
      <div className="container mx-auto max-w-[1280px] px-4">
        <Hero />
        <TrustGrid />
      </div>
    </div>
  );
}