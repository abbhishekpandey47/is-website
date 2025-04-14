import CalendlyButton from "../cal";

const CRMAutomationPage = () => {
  const crmSections = [
    {
      id: 1,
      productLabel: "Release Notes",
      title: "Updates That Makes Sense to Everyone Release Communication That Builds Trust Understandable Release Notes, Every Time",
      subtitle: "Clear, useful, human-readable updates - not walls of changelog text. We help engineering teams ship with confidence and clarity.",
      videoSrc: "/video-blog-technical-services/video1.mp4",
      features: [
        {
          title: "PRs to Clarity, Not Confusion",
          description: "We translate pull requests into clear, user-facing updates - no dev speak, just what changed and why it matters."
        },
        {
          title: "Known Issues, Upfront",
          description: "We flag current limitations or edge cases so clients don’t waste time or overwhelm your support team."
        },
        {
          title: "Feature Launches That Land",
          description: "We explain new features in plain language, with usage context, so users actually adopt what you ship."
        },
        {
          title: "Scales with Your Product and Team",
          description: "From internal betas to public releases, we maintain a consistent tone, structure, and cadence, no matter how fast you ship."
        }
      ]
    },
    {
      id: 2,
      productLabel: "Release Notes",
      title: "Consistent, Categorized, and Clear Release Notes",
      subtitle: "From semantic versioning to breaking changes, we bring consistency and hierarchy to every release.",
      videoSrc: "/video-blog-technical-services/video1.mp4",
      features: [
        {
          title: "Version-Aware Formatting",
          description: "Major vs minor vs patch? We highlight the impact and risk so readers don’t have to guess."
        },
        {
          title: "Change-Type Tagging",
          description: "We categorize everything, including features, bug fixes, performance, infra, and security, so that teams can scan fast."
        },
        {
          title: "Breaking Change Warnings",
          description: "Critical changes get called out with visual cues and migration steps if needed."
        },
        {
          title: "Real Impact in Real Stacks",
          description: "Good release notes reduce rollout risk, boost adoption, and make engineering more transparent across orgs."
        }
      ]
    },
    {
      id: 3,
      productLabel: "Release Notes",
      title: "Release Notes That Speak to Everyone",
      subtitle: "Whether you're shipping once a week or ten times a day, we help your team stay consistent and communicative.",
      videoSrc: "/video-blog-technical-services/video1.mp4",
      features: [
        {
          title: "User-Focused Summaries",
          description: "We turn technical changes into plain-language updates that show users what changed, how it affects them, and what they can do next."
        },
        {
          title: "No More Changelog Dumps",
          description: "We turn raw commit messages and PR titles into clean, categorized release notes people can actually read."
        },
        {
          title: "Cross-Team Friendly",
          description: "Whether you’re building for engineers, product managers, or support, we shape notes to the right audience."
        },
        {
          title: "Built Into Your Workflow",
          description: "Notes delivered when and where you need them - GitHub releases, docs, Notion, or internal portals."
        }
      ]
    }
  ];

  return (
    <div className="w-full bg-[#0d0a1a] p-4 flex flex-col items-center py-14 px-8 lg:px-16 justify-center overflow-x-hidden">
      {crmSections.map((section) => (

        <div          style={{
          background:
            "radial-gradient(ellipse at 50% 0%, #272b40 0%, transparent 40%)",
        }}>
        <div className="w-full h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5 mb-16"></div>
        <div
          key={section.id}
          className="w-full max-w-full rounded-2xl p-8 relative overflow-hidden box-border mb-12"
          style={{
            backgroundColor: "#141318",
            backgroundImage: `radial-gradient(circle at top right, #272b40 0%, transparent 80%)`,
            boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.36)",
            border: "2px solid rgba(60, 63, 84, 0.3)"
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
                    <span className="ml-2 text-gray-300 font-medium">{section.productLabel}</span>
                  </div>
                </div>

                <div className="md:mb-8 mx-3 md:mx-6">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-white mb-1">{section.title}</h2>
                </div>

                <div className="flex flex-wrap gap-4 md:gap-6 mb-4 mx-3 md:mx-6">
                <p className="text-gray-300 text-xl sm:text-lg md:text-base lg:text-2xl font-semibold">
                {section.subtitle}
                  </p>
                </div>
              </div>

              <div className="w-full md:w-1/2 md:pl-4 md:mt-12 md:mb-0">
                <div className="md:p-4 rounded-lg w-full lg:mb-12">
                  <div className="w-full h-48 sm:h-56 md:h-64 rounded-md overflow-hidden">
                    <div className="w-full max-w-md min-h-80 relative">
                      <video
                        className="absolute top-0 left-0 w-full h-full rounded-md object-cover"
                        src={section.videoSrc}
                        controls
                        autoPlay
                        muted
                        loop
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mb-8"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {section.features.map((feature, index) => (
              <div key={index}>
                <h3 className="text-2xl font-semibold text-indigo-200 mb-3">{feature.title}</h3>
                <p className="text-sm text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center mb-10 mt-8"> 
        < CalendlyButton />
        </div>
        </div>

        </div>
      ))}
    </div>
  );
}

export default CRMAutomationPage;
