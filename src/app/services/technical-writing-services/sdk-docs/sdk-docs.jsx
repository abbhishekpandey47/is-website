import Image from "next/image";
import CalendlyButton from "../cal";

const CRMAutomationPage = () => {
  const crmSections = [
    {
      id: 1,
      productLabel: "SDK Docs",
      title: "SDK Docs Developers Actually Use",
      subtitle:
        "We turn complex SDKs into clear, real-world walkthroughs with runnable code, multiple language examples, and zero guesswork.",
      videoSrc:
        "/video-blog-technical-services/SDK-Docs-Developers-Actually-Use.png",
      features: [
        {
          title: "Real Projects, Not Just Snippets",
          description:
            "We create working codebases around your SDK, so developers can learn by doing, not just reading.",
        },
        {
          title: "Multi-Stack Coverage",
          description:
            "From React to Node, Python to Java, we show you how to integrate your SDK across the tech stacks your users actually use.",
        },
        {
          title: "End-to-End Use Cases",
          description:
            "Each guide walks through complete flows: setup, API calls, error handling, and production usage.",
        },
        {
          title: "Built for Developers, Clear for Everyone",
          description:
            "We write docs with the technical depth developers need, without losing clarity for non-technical readers.",
        },
      ],
    },
    {
      id: 2,
      productLabel: "SDK Docs",
      title: "SDK Examples That Accelerate Developer Onboarding",
      subtitle:
        "From first install to first success, we help new developers get started fast with real, runnable code in their language of choice. ",
      videoSrc:
        "/video-blog-technical-services/SDK-Examples-That-Accelerate-Developer-Onboarding.png",
      features: [
        {
          title: "From Zero to “It Works” Fast",
          description:
            "We design guides that help developers go from setup to successful SDK usage in minutes, not hours.",
        },
        {
          title: " Progressive Examples That Teach by Doing",
          description:
            "Each guide builds from simple to advanced use cases, giving developers immediate wins and deeper understanding.",
        },
        {
          title: " Copy-Paste Friendly, Project-Ready Code",
          description:
            "No filler or abstract snippets - just clean, tested examples that work out of the box in real projects.",
        },
        {
          title: " Updated with Your SDK’s Growth",
          description:
            "We keep onboarding guides fresh with every SDK change, so developers never get stuck on outdated docs.",
        },
      ],
    },
    {
      id: 3,
      productLabel: "SDK Docs",
      title: "Content That Builds Adoption",
      subtitle:
        "Great SDKs deserve great documentation. We help developers find success quickly and reduce support load along the way.",
      videoSrc:
        "/video-blog-technical-services/Content-That-Builds-Adoption.png",
      features: [
        {
          title: "Feature-Driven Blog Posts",
          description:
            "We turn major SDK updates into blog-style deep dives that show off what’s possible, fast.",
        },
        {
          title: " Task-Oriented Guides",
          description:
            "We write around real goals - “Auth integration,” “Kubernetes Automation,” “Handle auth errors”, not just API endpoints.",
        },
        {
          title: "Support-Ready Content",
          description:
            "Our examples solve common problems before they reach your support team, with known issues and edge cases clearly documented.",
        },
        {
          title: "Consistent, Reliable Format",
          description:
            "Every guide follows the same intuitive structure, so your users always know where to find what they need.",
        },
      ],
    },
  ];

  return (
    <div className="w-full bg-[#0d0a1a] p-4 flex flex-col items-center py-14 px-8 lg:px-16 justify-center overflow-x-hidden">
      {crmSections.map((section) => (
        <div
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, #272b40 0%, transparent 40%)",
          }}
        >
          <div className="w-full h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5 mb-16"></div>
          <div
            key={section.id}
            className="w-full max-w-full rounded-2xl p-8 relative overflow-hidden box-border mb-12"
            style={{
              backgroundColor: "#141318",
              backgroundImage: `radial-gradient(circle at top right, #272b40 0%, transparent 80%)`,
              boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.36)",
              border: "2px solid rgba(60, 63, 84, 0.3)",
            }}
          >
            <div className="flex flex-col lg:flex-row justify-between items-start">
              {/* Left column order */}
              <div className="flex flex-col-reverse md:flex-row w-full">
                <div className="w-full md:w-1/2 md:pr-4 mt-6 md:mt-0">
                  <div className="md:my-8 mx-3 md:mx-6">
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"
                        />
                      </svg>
                      <span className="ml-2 text-gray-300 font-medium">
                        {section.productLabel}
                      </span>
                    </div>
                  </div>

                  <div className="md:mb-8 mx-3 md:mx-6">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-white mb-1">
                      {section.title}
                    </h2>
                  </div>

                  <div className="flex flex-wrap gap-4 md:gap-6 mb-4 mx-3 md:mx-6">
                    <p className="text-gray-300 text-xl sm:text-lg md:text-base lg:text-2xl font-semibold">
                      {section.subtitle}
                    </p>
                  </div>
                </div>

                <div className="w-full md:w-1/2 md:pl-4 mb-4 md:mb-0">
                  <div className="p-2 md:p-4 rounded-lg w-full">
                    <div className="w-full aspect-video relative rounded-md overflow-hidden">
                      <Image
                        src={section.videoSrc}
                        alt={section.title}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                        quality={90}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-700 mb-8"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {section.features.map((feature, index) => (
                <div key={index}>
                  <h3 className="text-2xl font-semibold text-indigo-200 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-300">{feature.description}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-center mb-10 mt-8">
              <CalendlyButton />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CRMAutomationPage;
