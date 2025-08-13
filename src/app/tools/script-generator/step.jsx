import Image from "next/image";

export default function AIScriptStep() {
  const steps = [
    {
      id: 1,
      title: "Define Your Video Objective",
      label: "STEP 1",
      img: "/script-tool/i1.avif",
      imgAlt: "Define video objective",
      subTitle: "Options",
      options: [
        { title: "How-to guide"  },
        { title: "Use-case walkthrough"  },
        { title: "Feature deep-dive" },
        { title: "Comparison" },
        { title: "Performance benchmark"},
        { title: "Cost optimization"},
        { title: "Troubleshooting guide" },
      ],
    },
    {
      id: 2,
      title: "Choose Your Context",
      label: "STEP 2",
      img: "/script-tool/i2.avif",
      imgAlt: "Choose context",
      subTitle: "Example categories:",
      options: [
        { title: "AI Agent Platforms (Kubiya, LangChain, CrewAI…)"},
        { title: "DevTools (Devbox, Gitpod, Spacelift…)"},
        { title: "Testing (Playwright, Cypress, Postman…)"},
        { title: "Code Review (Qodo, CodeRabbit, GitHub PR reviews…)"},
        { title: "Cost Optimization (Kubernetes workloads, Spot instances, Bedrock model costs…)"},
      ],
    },
    {
      id: 3,
      title: "Select Your Target Audience",
      label: "STEP 3",
      img: "/script-tool/i3.avif",
      imgAlt: "Select audience",
      subTitle: "Options",
      options: [
        { title: "Developers"},
        { title: "Platform Engineers"},
        { title: "QA / Testers"},
        { title: "CTO / VP Eng"},
        { title: "FinOps teams"},
        { title: "AI / ML Engineers"},
      ],
    },
    {
      id: 4,
      title: "Input Your Prompt or Topic",
      label: "STEP 4",
      img: "/script-tool/i1.avif",
      imgAlt: "Input prompt",
      subTitle: "e.g.",
      options: [
        { title: "Comparing Qodo vs GitHub PR reviews for enterprise code quality"},
      ],
    },
    {
      id: 5,
      title: "Generate Your Script",
      label: "STEP 5",
      img: "/script-tool/i2.avif",
      imgAlt: "Generate script",
      subTitle: "cript includes",
      options: [
        { title: "Hook, Key talking points, Supporting examples, CTA."},
        { title: "Auto-optimized for technical depth + storytelling."},
      ],
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 px-4">
          <h1 className="mx-auto max-w-3xl font-[quicksand] text-lg md:text-2xl font-extrabold text-white leading-snug tracking-tight">
            Script Generator for Technical GTM Videos
            <span className="block mt-2 text-indigo-300 font-semibold">
              Purpose-built for AI Agents, DevTools, Infra, Testing, and Developer Platforms
            </span>
          </h1>
        </div>

        {/* Primary grid (first 3 cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.slice(0, 3).map((step) => (
            <article
              key={step.id}
              className="bg-gray-800/60 rounded-2xl p-6 shadow-xl border border-gray-700 hover:shadow-2xl transition-all duration-300 flex flex-col"
            >
              <div>
                <div className="flex items-center justify-center mb-4">
                  <div className="w-36 h-36 relative rounded-xl overflow-hidden bg-gray-900/20">
                    <Image
                      src={step.img}
                      alt={step.imgAlt}
                      fill
                      sizes="(max-width: 768px) 160px, 144px"
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="mb-2">
                  <span className="text-xs text-gray-300 font-medium tracking-wider">
                    {step.label}
                  </span>
                </div>

                <h2 className="text-white font-[quicksand] text-xl font-bold mb-3">
                  {step.title}
                </h2>

                <ul className="mt-2 space-y-2 text-gray-200">
                  {step.options.map((opt, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-sm text-indigo-300 font-semibold">•</span>
                      <div>
                        <div className="text-sm">
                          <span className="text-white">{opt.title}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

            </article>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {steps.slice(3).map((step) => (
            <article
              key={step.id}
              className="bg-gray-800/60 rounded-2xl p-6 shadow-xl border border-gray-700 hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 relative rounded-lg overflow-hidden bg-gray-900/20">
                  <Image
                    src={step.img}
                    alt={step.imgAlt}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>

                <div className="flex-1">
                  <div className="mb-1">
                    <span className="text-xs text-gray-300 font-medium tracking-wider">
                      {step.label}
                    </span>
                  </div>

                  <h3 className="text-white text-lg font-[quicksand] font-bold mb-2">
                    {step.title}
                  </h3>

                
                </div>
              </div>
                <ul className="mt-2 space-y-2 text-gray-200">
                    {step.options.map((opt, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-sm text-indigo-300 font-semibold">•</span>
                        <div>
                          <div className="text-sm">
                            <span className="text-white">{opt.title}</span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
