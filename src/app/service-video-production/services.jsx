export default function Services() {
  // Services data
  const services = [
    {
      title: "Social video ads",
      description:
        "Create and launch video ads on social media that makes your audience stop scrolling and click on your offer.",
      features: [
        "Creative brief",
        "Storyboarding design (Figma)",
        "2D animation",
        "Video workflow (Frame.io)",
        "Music sourcing and licenses",
        "Stock imagery/video sourcing and licenses",
      ],
    },
    {
      title: "YouTube video production",
      description:
        "Create UGC videos, product explainers, and use-case videos for YouTube that engage your audience.",
      features: [
        "Video ideation & creative brief",
        "Storyboarding design (Figma)",
        "2D animation",
        "Access to the Creative Director overseeing production",
        "Up to 2 revisions per round",
        "Music sourcing and licenses",
        "Stock imagery/video sourcing and licenses",
        "Voiceover script, and production*",
        "Voiceover talent*",
        "UGC talent*",
      ],
    },
    {
      title: "End-to-end YouTube management",
      description:
        "Launch, test, and experiment with ad campaigns on YouTube. The result? More opportunities, customers, and revenue.",
      features: [
        'Everything included in "YouTube video production"OR ads provided by your in-house team',
        "Campaigns managed from start to finish",
        "Video ads performance testing",
        "Reporting dashboard",
        "Dedicated Slack channel",
        "Weekly reports on Slack",
        "2x calls per month",
      ],
    },
  ];

  // Service Box
  const ServiceBox = ({ title, description, features }) => {
    return (
      <div className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)] p-0.5 m-2">
        <div
          className="rounded-2xl h-full relative overflow-hidden"
          style={{
            background:
              "linear-gradient(to right, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
            boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.36)",
            border: "2px solid rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div className="p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-3">
              {title}
            </h2>
            <p className="text-gray-300 text-sm mb-6">{description}</p>

            <h3 className="text-white font-semibold mb-4">What's included:</h3>
            <ul className="space-y-3">
              {features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-4 h-4 bg-gradient-to-r from-[#1966ff] to-[#8c1eff] rounded-full flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-2.5 w-2.5 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <span className="text-gray-300 text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-2xl"></div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div
        className="max-w-[1566px] mx-auto overflow-hidden py-16"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, #272b40 0%, transparent 40%)",
        }}
      >
        <div className="text-center mb-12">
          <p className="quicksand-bold text-3xl md:text-5xl lg:text-6xl text-white mb-2">
            Create videos that drive qualified <br className="md:hidden" />
            <span className="bg-gradient-to-r from-[#1966ff] via-[#d129ff] to-[#8c1eff] bg-clip-text animate-gradient text-transparent">
              brand awareness and SQLs
            </span>
          </p>
        </div>

        <div
          className="py-12 relative"
          style={{
            background:
              "radial-gradient(circle at center, rgba(31, 33, 48, 0.5) 0%, rgba(14, 14, 14, 0.3) 70%)",
            backdropFilter: "blur(5px)",
          }}
        >
          {/* Services row */}
          <div className="flex flex-wrap justify-center px-4 sm:px-6 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <ServiceBox
                key={`service-${index}`}
                title={service.title}
                description={service.description}
                features={service.features}
              />
            ))}
          </div>

          {/* CTA Button */}
          <div className="mt-12 text-center">
            <a
              href="https://calendly.com/meet-shan"
              target="_blank"
              rel="noopener noreferrer"
              className="btn bg-gradient-to-r from-[#1966ff] to-[#8c1eff] hover:from-[#0044ff] hover:to-[#7000ff] text-white px-8 py-3 rounded-lg text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center gap-2"
            >
              Get Started
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
