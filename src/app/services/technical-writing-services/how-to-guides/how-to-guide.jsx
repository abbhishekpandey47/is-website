import CalendlyButton from "../cal";

const CRMAutomationPage = () => {
  const crmSections = [
    {
      id: 1,
      productLabel: "How to guides",
      title: " Step-by-Step Guides That Don’t Skip Steps",
      subtitle: "We write hands-on, visual walkthroughs that guide users through every feature, from setup to real-world results.",
      videoSrc: "/video-blog-technical-services/video1.mp4",
      features: [
        {
          title: "Every Step, Clearly Explained",
          description: "We guide users through each task with simple instructions, code snippets, and screenshots - no skipped context, no assumptions."
        },
        {
          title: "Visual, Annotated, Click-by-Click",
          description: "Our guides include screenshots and visual cues to help users follow along confidently, even if they’re new to the tool."
        },
        {
          title: "Video Tutorials That Show, Not Just Tell",
          description: "A short, focused video walkthrough backs each guide for those who prefer to watch and follow along."
        },
        {
          title: "Real Tools, Real Projects",
          description: "We don’t just describe, we show your product working in actual environments, with relevant tools and real outcomes."
        },
      ]
    },
    {
      id: 2,
      productLabel: "How to guides",
      title: "Integrations That Drive Value",
      subtitle: "We show users how your product fits into their existing workflow, and what they can unlock by connecting the dots.",
      videoSrc: "/video-blog-technical-services/video1.mp4",
      features: [
        {
          title: "How to Integrate with Popular Tools",
          description: "From Slack to GitHub to internal CRMs, we write how-to guides that walk users through key integrations step by step."
        },
        {
          title: "Connected Use Cases, Not Just Setup",
          description: "We go beyond installation and show what users can do once integrated, triggering workflows, automating tasks, or sharing data."
        },
        {
          title: "Troubleshooting & Edge Cases Included",
          description: "We help users avoid pitfalls with tips, warnings, and real-world fixes, reducing frustration and support tickets."
        },
        {
          title: "Post-Integration Value",
          description: "We highlight changes after setup: metrics unlocked, workflows simplified, and time saved."
        },
      ]
    },
    {
      id: 3,
      productLabel: "How to Guides",
      title: "Practical Guides for Real-World Use",
      subtitle: "We turn users into confident operators of your product, with faster onboarding, fewer questions, and better adoption.",
      videoSrc: "/video-blog-technical-services/video1.mp4",
      features: [
        {
          title: "Built for First-Time Users and Power Users",
          description: "Whether someone is onboarding or exploring advanced features, our guides meet them where they are."
        },
        {
          title: "Context-First Writing",
          description: "We don’t just tell users how, we explain why, so they understand what they’re doing and when to use it."
        },
        {
          title: "Always-Available Learning",
          description: "No need to ping support or ask around, our guides are searchable, shareable, and always up-to-date."
        },
        {
          title: "Docs That Reduce Support Load",
          description: "Support and success teams can link to our guides instead of re-answering the same questions, saving time."
        },
      ]
    },
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
