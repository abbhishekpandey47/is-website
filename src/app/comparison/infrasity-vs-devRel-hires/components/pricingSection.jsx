import { Button } from "@/components/ui/button";
import { Check, Star, Zap } from "lucide-react";

const pricingPlans = [
  {
    name: "Starter",
    price: "$3,000",
    period: "/month",
    description: "Perfect for early-stage startups testing GTM strategies",
    features: [
      "4 technical blog posts/month",
      "Basic SDK documentation",
      "Reddit & HackerNews distribution",
      "Monthly strategy calls",
      "Email support"
    ],
    popular: false,
    cta: "Start Trial"
  },
  {
    name: "Growth",
    price: "$8,000",
    period: "/month",
    description: "Scale your developer marketing with comprehensive GTM",
    features: [
      "12 technical pieces/month",
      "Video tutorials & demos",
      "Multi-channel distribution (20+)",
      "Community building",
      "Weekly strategy calls",
      "Priority Slack support",
      "Custom landing pages"
    ],
    popular: true,
    cta: "Start Trial"
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Full-scale engineering-led GTM for high-growth companies",
    features: [
      "Unlimited content production",
      "Dedicated GTM team",
      "Custom distribution strategy",
      "Developer relations management",
      "24/7 priority support",
      "Custom integrations",
      "Executive reporting"
    ],
    popular: false,
    cta: "Contact Sales"
  }
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-20 bg-saas-surface">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-saas-success/10 text-saas-success rounded-full text-sm font-medium mb-4">
            💰 Fraction of a DevRel hire cost
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-saas-neutral-foreground mb-6">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Get enterprise-level GTM capabilities without the enterprise price tag. 
            All plans include a 14-day free trial.
          </p>
          
          {/* Cost Comparison Callout */}
          <div className="inline-flex items-center gap-6 bg-saas-brand/5 border border-saas-brand/20 rounded-xl p-6 text-left max-w-2xl">
            <div className="flex-shrink-0 w-12 h-12 bg-saas-brand/10 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-saas-brand" />
            </div>
            <div>
              <div className="font-semibold text-saas-neutral-foreground">
                DevRel Hire: $150k-$200k/year + equity + 3-6 month ramp-up
              </div>
              <div className="text-sm text-muted-foreground">
                Our Growth plan: $96k/year, starts shipping week 1
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div 
              key={plan.name}
              className={`relative p-8 rounded-2xl border transition-all duration-300 hover:shadow-lg animate-slide-up ${
                plan.popular 
                  ? "border-saas-brand bg-saas-brand/5 shadow-lg scale-105" 
                  : "border-saas-divider bg-saas-surface hover:border-saas-brand/50"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-saas-brand text-saas-brand-foreground px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-saas-neutral-foreground mb-2">
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-saas-neutral-foreground">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground">
                    {plan.period}
                  </span>
                </div>
                <p className="text-muted-foreground">
                  {plan.description}
                </p>
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-saas-success flex-shrink-0 mt-0.5" />
                    <span className="text-saas-neutral-foreground">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <Button 
                className={`w-full ${
                  plan.popular 
                    ? "bg-saas-brand hover:bg-saas-brand-hover text-saas-brand-foreground" 
                    : "bg-saas-neutral hover:bg-saas-surface-hover border border-saas-divider"
                }`}
                size="lg"
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-4">
            Have questions? Want to see how we stack up against DevRel hires?
          </p>
          <Button variant="outline" size="lg" className="border-saas-divider">
            Schedule a Demo
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;