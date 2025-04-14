const CRMAutomationPage = () => {
  const crmSections = [
    {
      id: 1,
      productLabel: "CLI Docs",
      title: "CLI Docs That Developers Actually Use",
      subtitle: "From install to deploy — docs that walk users through every command, config, and edge case without slowing them down.",
      videoSrc: "/video-blog-technical-services/video1.mp4",
      features: [
        {
          title: "Docs That Start at the Command Line",
          description: "We document what actually runs — with clear commands, expected output, and edge cases. No fluff."
        },
        {
          title: "Written Around Real Workflows",
          description: "Watch deals move smoothly through every stage of your pipeline—automatically, based on real interactions."
        },
        {
          title: "Install to Infra Automation",
          description: "Whether it’s brew install, tool login, or tool deploy --env prod, we cover everything your users need to get started and stay productive."
        },
        {
          title: "Built for DevTools and Infra Products",
          description: "From SDK bootstrapping to Kubernetes deployments, we specialize in CLI docs that support real engineering teams."
        }
      ]
    },
    {
      id: 2,
      productLabel: "Product",
      title: "Revive & Optimize Sales Opportunities",
      subtitle: "Never Let a Deal Go Cold Again",
      videoSrc: "/video-blog-technical-services/video1.mp4",
      features: [
        {
          title: "Daily Deal Monitoring",
          description: "Our AI agents scan your CRM daily to spot deals going stale or slipping through the cracks."
        },
        {
          title: "360° Communication Review",
          description: "We analyze past emails, Zoom calls, phone calls, and Slack messages to pinpoint exactly what needs to be followed up on."
        },
        {
          title: "Automated Follow-Ups",
          description: "The AI crafts personalized follow-ups and sends them out automatically—no manual effort needed."
        },
        {
          title: "Why It Matters",
          description: "In fast-paced, high-volume sales, deals can easily get forgotten or go cold. Our AI keeps your pipeline warm by surfacing mid-funnel opportunities and taking action—saving your team time and making sure no deal is left behind."
        }
      ]
    },
    {
      id: 3,
      productLabel: "Product",
      title: "AI-Powered Follow-Up Emails",
      subtitle: "Personalized. Instant. Effortless.",
      videoSrc: "/video-blog-technical-services/video1.mp4",
      features: [
        {
          title: "Tailored Follow-Ups in Minutes",
          description: "Get highly personalized follow-up emails drafted automatically within 5 minutes after every sales call—directly in your email drafts."
        },
        {
          title: "Context-Rich Messaging",
          description: "Our AI pulls details from the sales call, past messages, and CRM data to craft messages that reflect exactly what was discussed."
        },
        {
          title: "Smart Email Replies",
          description: "AI also handles responses to incoming emails, ensuring replies are always relevant and informed by the full conversation history."
        },
        {
          title: "Why it Matters",
          description: "No more generic follow-ups. No more delays. Your customers feel heard, your team saves time, and personalized, thoughtful communication happens instantly—without extra effort from your reps."
        }
      ]
    }
  ];

  return (
    <div className="w-full bg-[#0d0a1a] p-4 flex flex-col items-center py-24 px-8 lg:px-16 justify-center overflow-x-hidden">
      {crmSections.map((section) => (
        <div 
          key={section.id}
          className="w-full max-w-full rounded-2xl p-8 relative overflow-hidden box-border mb-16"
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
        </div>
      ))}
    </div>
  );
}

export default CRMAutomationPage;