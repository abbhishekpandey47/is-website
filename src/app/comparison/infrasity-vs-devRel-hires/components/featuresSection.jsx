import { 
  Zap, 
  TrendingUp, 
  Target, 
  Code, 
  BarChart3, 
  Users 
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Ship Content Week 1",
    description: "No 3-6 month ramp-up. Our engineering team starts producing technical content, demos, and documentation from day one."
  },
  {
    icon: TrendingUp,
    title: "Scale Beyond One Person",
    description: "Get the output of an entire GTM team, not just a single DevRel hire. Multiple specialists working on your growth simultaneously."
  },
  {
    icon: Target,
    title: "Multi-Channel Distribution",
    description: "We don't just create content—we distribute it across 50+ channels including Reddit, HackerNews, dev communities, and more."
  },
  {
    icon: Code,
    title: "Engineering-First Content",
    description: "Technical deep-dives, SDK documentation, code examples, and architectural guides written by actual engineers."
  },
  {
    icon: BarChart3,
    title: "Data-Driven Growth",
    description: "Track every metric that matters: developer engagement, sign-up attribution, community growth, and revenue impact."
  },
  {
    icon: Users,
    title: "Community Building",
    description: "Build and nurture developer communities around your product with authentic engagement and valuable technical contributions."
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-saas-surface">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-saas-success/10 text-saas-success rounded-full text-sm font-medium mb-4">
            ✨ Everything you need to scale
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-saas-neutral-foreground mb-6">
            DevRel + GTM + Engineering
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stop choosing between authentic developer relations and scalable growth. 
            Get both with a dedicated engineering-led GTM team.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="group p-8 bg-saas-surface border border-saas-divider rounded-xl hover:shadow-lg hover:border-saas-brand/50 transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 bg-saas-brand/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-saas-brand/20 transition-colors">
                <feature.icon className="w-6 h-6 text-saas-brand" />
              </div>
              
              <h3 className="text-xl font-semibold text-saas-neutral-foreground mb-4">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-muted-foreground mb-6">
            Ready to see how we compare to traditional DevRel hires?
          </p>
          <a 
            href="#comparison" 
            className="inline-flex items-center text-saas-brand hover:text-saas-brand-hover font-semibold group"
          >
            View the comparison
            <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;