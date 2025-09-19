const testimonials = [
  {
    quote: "Infrasity shipped more technical content in their first month than our previous DevRel hire did in six. The quality is exceptional and the distribution reach is incredible.",
    author: "Sarah Chen",
    role: "CTO",
    company: "DevFlow",
    avatar: "SC"
  },
  {
    quote: "We were stuck between hiring an expensive DevRel or going without. Infrasity gave us a full GTM team for a fraction of the cost. Our developer engagement is up 300%.",
    author: "Marcus Rodriguez",
    role: "Founder",
    company: "CloudNative Labs",
    avatar: "MR"
  },
  {
    quote: "The engineering depth they bring to content creation is unmatched. They understand our product better than most of our own team members within weeks.",
    author: "Alex Kim",
    role: "VP Engineering",
    company: "DataStream",
    avatar: "AK"
  }
];

const companies = [
  "DevFlow", "CloudNative Labs", "DataStream", "TechVenture", "BuildPlatform", "CodeBase"
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-20 bg-saas-neutral">
      <div className="max-w-7xl mx-auto px-6">
        {/* Social Proof - Company Logos */}
        <div className="text-center mb-16">
          <p className="text-sm text-muted-foreground mb-8">
            Trusted by engineering teams at high-growth startups
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {companies.map((company) => (
              <div key={company} className="text-lg font-semibold text-saas-neutral-foreground">
                {company}
              </div>
            ))}
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-saas-neutral-foreground mb-6">
            What founders are saying
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join hundreds of engineering leaders who chose scalable GTM over expensive DevRel hires.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.author}
              className="bg-saas-surface p-8 rounded-xl border border-saas-divider shadow-sm hover:shadow-md transition-shadow animate-slide-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="mb-6">
                <svg className="w-8 h-8 text-saas-brand/30 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
                <p className="text-saas-neutral-foreground leading-relaxed">
                  "{testimonial.quote}"
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-saas-brand/10 rounded-full flex items-center justify-center text-saas-brand font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-saas-neutral-foreground">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;