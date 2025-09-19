import { Button } from "@/components/ui/button";
import { 
  DollarSign, 
  Clock, 
  FileText, 
  TrendingUp, 
  Users 
} from "lucide-react";

const comparisonData = [
  {
    icon: DollarSign,
    category: "Cost",
    devrel: "$150k–$200k/year + equity",
    infrasity: "Fraction of cost, flat pricing"
  },
  {
    icon: Clock,
    category: "Speed to First Output", 
    devrel: "3–6 months ramp-up",
    infrasity: "Content shipping in week 1"
  },
  {
    icon: FileText,
    category: "Output Formats",
    devrel: "Blogs, talks, occasional demos",
    infrasity: "Blogs, SDK docs, explainer videos, Reddit GTM"
  },
  {
    icon: TrendingUp,
    category: "Scalability",
    devrel: "Limited to one person's bandwidth",
    infrasity: "Team-based, scalable output"
  },
  {
    icon: Users,
    category: "Community/GTM Reach",
    devrel: "Evangelism within niche communities",
    infrasity: "Multi-channel distribution + developer engagement"
  }
];

const InfrasityComparison = () => {
  return (
    <section id="comparison" className="py-20 bg-saas-neutral">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-saas-brand/10 text-saas-brand rounded-full text-sm font-medium mb-4">
            ⚡ Side-by-side comparison
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-saas-neutral-foreground mb-6 leading-tight">
            DevRel is authentic but expensive. <br />
            Infrasity gives you DevRel + GTM at scale.
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Founders often face the trade-off: hire a single DevRel, or plug into a full engineering-led GTM team.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="bg-saas-surface rounded-xl shadow-sm border border-saas-divider overflow-hidden mb-12">
          {/* Table Header */}
          <div className="grid grid-cols-3 bg-saas-surface border-b border-saas-divider">
            <div className="p-6"></div>
            <div className="p-6 text-center border-l border-saas-divider">
              <h3 className="text-xl font-semibold text-saas-neutral-foreground">DevRel Hire</h3>
            </div>
            <div className="p-6 text-center border-l border-saas-divider bg-saas-brand/5">
              <h3 className="text-xl font-semibold text-saas-brand">Infrasity</h3>
            </div>
          </div>

          {/* Table Rows */}
          {comparisonData.map((row, index) => (
            <div 
              key={row.category}
              className={`grid grid-cols-3 ${
                index % 2 === 0 ? "bg-saas-surface" : "bg-saas-neutral"
              } border-b border-saas-divider last:border-b-0`}
            >
              {/* Category */}
              <div className="p-6 flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-saas-brand/10 rounded-lg flex items-center justify-center">
                  <row.icon className="w-5 h-5 text-saas-brand" />
                </div>
                <span className="font-medium text-saas-neutral-foreground">
                  {row.category}
                </span>
              </div>

              {/* DevRel */}
              <div className="p-6 border-l border-saas-divider flex items-center">
                <span className="text-muted-foreground">
                  {row.devrel}
                </span>
              </div>

              {/* Infrasity */}
              <div className="p-6 border-l border-saas-divider bg-saas-brand/5 flex items-center">
                <span className="text-saas-neutral-foreground font-medium">
                  {row.infrasity}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Callout Quote */}
        <div className="bg-saas-surface border-l-4 border-saas-brand rounded-r-xl p-8 mb-12 shadow-sm">
          <blockquote className="text-2xl md:text-3xl font-semibold text-saas-neutral-foreground text-center">
            "Why settle for one voice, when you can have an entire GTM team?"
          </blockquote>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button 
            size="lg" 
            className="bg-saas-brand hover:bg-saas-brand/90 text-saas-brand-foreground px-8 py-3 text-lg font-semibold"
          >
            See How We Compare
          </Button>
        </div>
      </div>
    </section>
  );
};

export default InfrasityComparison;