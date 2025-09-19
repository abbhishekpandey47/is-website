import { CheckCircle, Clock, Rocket, Target } from "lucide-react";

const processSteps = [
  {
    icon: Target,
    title: "Week 1: Strategy & Setup",
    description: "We analyze your product, identify key technical selling points, and map out your ideal developer persona.",
    deliverables: ["GTM strategy document", "Content calendar", "Channel selection", "Brand voice guide"],
    timeline: "5 business days"
  },
  {
    icon: Rocket,
    title: "Week 2: Content Production",
    description: "Our engineering team starts creating technical content, documentation, and developer resources.",
    deliverables: ["First 3 blog posts", "SDK documentation", "Code examples", "Video tutorials"],
    timeline: "7 business days"
  },
  {
    icon: Clock,
    title: "Week 3-4: Distribution & Community",
    description: "We launch across all selected channels and begin building your developer community presence.",
    deliverables: ["Multi-channel posting", "Community engagement", "Reddit/HN submissions", "Social amplification"],
    timeline: "Ongoing weekly"
  },
  {
    icon: CheckCircle,
    title: "Ongoing: Scale & Optimize",
    description: "Continuous content creation, performance tracking, and strategy optimization based on data.",
    deliverables: ["Weekly reports", "A/B testing", "Channel optimization", "Lead nurturing"],
    timeline: "Monthly reviews"
  }
];

const ProcessSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-saas-surface via-saas-neutral to-saas-surface">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-saas-success/10 text-saas-success rounded-full text-sm font-medium mb-4">
            ⚡ No 3-6 month ramp-up time
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-saas-neutral-foreground mb-6">
            From onboarding to results in 30 days
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            While traditional DevRel hires spend months learning your product, 
            our engineering team starts delivering from day one.
          </p>
        </div>

        {/* Process Steps with Connecting Line */}
        <div className="relative max-w-4xl mx-auto">
          {/* Connecting Line */}
          <div className="absolute left-6 top-12 bottom-12 w-0.5 bg-gradient-to-b from-saas-brand via-saas-brand/50 to-saas-brand hidden lg:block"></div>
          
          <div className="space-y-16">
            {processSteps.map((step, index) => (
              <div 
                key={step.title}
                className="relative flex items-start gap-8 animate-slide-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Step Icon */}
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 bg-saas-brand rounded-full flex items-center justify-center shadow-lg border-4 border-saas-surface">
                    <step.icon className="w-6 h-6 text-saas-brand-foreground" />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-saas-brand text-saas-brand-foreground text-xs px-2 py-1 rounded-full font-semibold">
                    {index + 1}
                  </div>
                </div>
                
                {/* Content Card */}
                <div className="flex-1 bg-saas-surface rounded-xl p-8 shadow-lg border border-saas-divider hover:shadow-xl transition-all duration-300">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-1">
                      <div className="mb-4">
                        <h3 className="text-2xl font-bold text-saas-neutral-foreground mb-2">
                          {step.title}
                        </h3>
                        <div className="inline-flex items-center px-3 py-1 bg-saas-brand/10 text-saas-brand rounded-full text-sm font-medium">
                          ⏱️ {step.timeline}
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {step.description}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {step.deliverables.map((deliverable) => (
                          <div key={deliverable} className="flex items-center gap-3 p-3 bg-saas-neutral rounded-lg">
                            <CheckCircle className="w-5 h-5 text-saas-success flex-shrink-0" />
                            <span className="text-saas-neutral-foreground font-medium">
                              {deliverable}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Progress Indicator */}
                    <div className="lg:w-64">
                      <div className="bg-saas-neutral/50 p-6 rounded-lg border border-saas-divider/50">
                        <div className="text-center mb-4">
                          <div className="text-3xl font-bold text-saas-brand mb-1">
                            {(index + 1) * 25}%
                          </div>
                          <div className="text-sm text-muted-foreground">Complete</div>
                        </div>
                        
                        <div className="w-full bg-saas-divider rounded-full h-3 mb-4">
                          <div 
                            className="bg-gradient-to-r from-saas-brand to-saas-brand/70 h-3 rounded-full transition-all duration-1000"
                            style={{ width: `${(index + 1) * 25}%` }}
                          ></div>
                        </div>
                        
                        <div className="text-sm text-center text-muted-foreground">
                          Week {index + 1} • {step.deliverables.length} items
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 p-8 bg-saas-brand/5 rounded-xl border border-saas-brand/20">
          <h3 className="text-2xl font-bold text-saas-neutral-foreground mb-4">
            Ready to skip the hiring process?
          </h3>
          <p className="text-muted-foreground mb-6">
            Start getting results in your first week instead of waiting months for a DevRel hire to ramp up.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-saas-brand hover:bg-saas-brand-hover text-saas-brand-foreground px-6 py-3 rounded-lg font-semibold">
              Schedule Strategy Call
            </button>
            <button className="border border-saas-divider hover:bg-saas-surface-hover px-6 py-3 rounded-lg font-semibold">
              View Case Studies
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;