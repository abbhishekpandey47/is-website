"use client";
import { useEffect, useRef } from "react";
import { CheckCircle, Clock, Rocket, Target } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Tailwind-only, colorful variant using tokens from your tailwind.config
// (primary, secondary, accent, approved, muted, card, border, background, etc.)

const processSteps = [
  {
    icon: Target,
    title: "Week 1: Strategy & Setup",
    description:
      "We dig into your product, extract the technical value props, and map them to developer personas and channels. You’ll walk away with a launch-ready plan.",
    deliverables: [
      "GTM strategy document (framed for developers)",
      "Content calendar (first 30–60 days)",
      "Channel selection (where your ICP actually hangs out)",
      "Brand voice guide (engineering-first tone of voice)",
    ],
    timeline: "5 business days",

    // Color theming (use explicit classes so Tailwind can tree-shake correctly)
    theme: {
      iconBg: "bg-[#5f64ff]",
      iconFg: "text-white",
      pill: "bg-[rgba(95,100,255,0.15)] text-[#5f64ff]",
      bar: "from-[#5F64FF] to-[#7F8CFF]",
      halo: "from-primary/30 to-accent/30",
    },
  },
  {
    icon: Rocket,
    title: "Week 2: Content Production",
    description:
      "We start producing adoption assets the docs, examples, and tutorials that get developers hands-on with your product.",
    deliverables: [
      "First 3 blog posts(technical and developer-focused)",
      "SDK documentation(clear, adoption-ready)",
      "Code examples(ready-to-run snippets)",
      "Video tutorials (hands-on walkthroughs)",
    ],
    timeline: "7 business days",
    theme: {
      iconBg: "bg-[#5f64ff]",
      iconFg: "text-white",
      pill: "bg-[rgba(95,100,255,0.15)] text-[#5f64ff]",
      bar: "from-[#5F64FF] to-[#7F8CFF]",
      halo: "from-accent/30 to-approved/30",
    },
  },
  {
    icon: Clock,
    title: "Week 3-4: Distribution & Community",
    description:
      "We extend your GTM beyond content creation activating developer conversations, communities, and platforms where technical buyers discover and trust new tools.”.",
    deliverables: [
      "Publish content across developer-relevant platforms (Docs, GitHub, Blogs, Dev.to)",
      "Seed authentic discussions in niche communities (Reddit, Hacker News, Discord, forums",
      "Drive early feedback loops from real developers",
      "Nurture community touchpoints that compound into long-term advocacy",
    ],
    timeline: "Ongoing weekly",
    theme: {
      iconBg: "bg-[#5f64ff]",
      iconFg: "text-white",
      pill: "bg-[rgba(95,100,255,0.15)] text-[#5f64ff]",
      bar: "from-[#5F64FF] to-[#7F8CFF]",
      halo: "from-approved/30 to-secondary/30",
    },
  },
  {
    icon: CheckCircle,
    title: "Ongoing: Scale & Optimize",
    description:
      "After launch, we shift into scale mode producing advanced technical content, expanding coverage across use cases, and doubling down on what drives product adoption.”.",
    deliverables: [
      "Ongoing content production : blogs, docs, SDKs, tutorials at scale",
      "Use-case expansion : build libraries and templates that widen adoption paths",
      "Performance analytics : track what content converts devs into users",
      "Iterative optimization : refine docs, examples, and guides based on adoption signals",
    ],
    timeline: "Monthly reviews",
    theme: {
      iconBg: "bg-[#5f64ff]",
      iconFg: "text-white",
      pill: "bg-[rgba(95,100,255,0.15)] text-[#5f64ff]",
      bar: "from-[#5F64FF] to-[#7F8CFF]",
      halo: "from-secondary/30 to-primary/30",
    },
  },
];

const ProcessSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Respect reduced motion
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      // Decorative gradient blobs
      gsap.from(".bg-blob", {
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
        y: 20,
        stagger: 0.15,
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
      });

      // Vertical connecting line grows in
      gsap.fromTo(
        ".connecting-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top",
          duration: prefersReduced ? 0 : 1.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // Step cards slide/fade in
      gsap.utils.toArray(".step-card").forEach((card , i) => {
        gsap.from(card, {
          y: prefersReduced ? 0 : 56,
          opacity: 0,
          duration: prefersReduced ? 0.2 : 0.9,
          ease: "power3.out",
          delay: i * 0.12,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });

      // Percentage counters
      gsap.utils.toArray(".progress-value").forEach((el) => {
        const end = parseInt(el.dataset.value, 10) || 0;
        gsap.fromTo(
          el,
          { innerText: 0 },
          {
            innerText: end,
            duration: prefersReduced ? 0.2 : 1.1,
            ease: "power1.out",
            snap: { innerText: 1 },
            scrollTrigger: { trigger: el, start: "top 95%" },
            onUpdate() {
              el.innerText = `${Math.round(Number(el.innerText))}%`;
            },
            onStart() {
              el.innerText = "0%";
            },
          }
        );
      });

      // Progress bar fill
      gsap.utils.toArray(".progress-bar").forEach((bar) => {
        const width = parseFloat(bar.dataset.width || "0");
        gsap.fromTo(
          bar,
          { width: "0%" },
          {
            width: `${width}%`,
            duration: prefersReduced ? 0.2 : 1.1,
            ease: "power2.out",
            scrollTrigger: { trigger: bar, start: "top 95%" },
          }
        );
      });

      // Checklist items subtle stagger
      gsap.utils.toArray(".deliverable-list").forEach((list) => {
        const items = list.querySelectorAll(".deliverable-item");
        gsap.from(items, {
          opacity: 0,
          y: prefersReduced ? 0 : 10,
          duration: prefersReduced ? 0.2 : 0.4,
          stagger: 0.06,
          ease: "power1.out",
          scrollTrigger: { trigger: list, start: "top 90%" },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 overflow-hidden bg-surface text-foreground bg-[radial-gradient(ellipse_at_50%_0%,_#272b40_0%,_transparent_20%)]"
    >

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-approved/20 text-approved rounded-full text-sm font-medium mb-5 shadow-sm bg-white/10">
             No 3–6 month ramp‑up time
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 bg-gradient-to-r from-primary via-accent to-approved bg-clip-text text-white">
            From onboarding to results in 30 days
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          While a DevRel hire ramps for 2–3 months, our engineering-led team starts shipping content in week one.
          </p>
        </div>

        {/* Process Steps with Connecting Line */}
        <div className="relative max-w-5xl mx-auto">
          {/* Connecting Line (desktop) */}
          <div className="connecting-line hidden lg:block absolute left-6 top-14 bottom-14 w-px bg-[#5f64ff]" />

          <div className="space-y-16">
            {processSteps.map((step, index) => (
              <div key={step.title} className="step-card relative flex items-start gap-8">
                {/* Step Icon */}
                <div className="relative shrink-0">
                  <div className={`w-12 h-12 ${step.theme.iconBg} rounded-full flex items-center justify-center shadow-lg border-4 border-background bg-[#5f64ff]`}>
                  <step.icon className={`w-6 h-6 ${step.theme.iconFg}`} />
                  </div>
                  <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 ${step.theme.iconBg} ${step.theme.iconFg} text-xs px-2 py-1 rounded-full font-semibold bg-[#5f64ff]`}>
                    {index + 1}
                  </div>
                </div>

                {/* Content Card */}
                <div className="flex-1 rounded-2xl p-8 shadow-lg ring-1 ring-border bg-card/80 backdrop-blur">
                  <div className="flex flex-col md:flex-row gap-4 justify-center">
                    <div className="flex-1">
                      <div className="mb-4">
                        <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${step.theme.pill}`}>
                          ⏱️ {step.timeline}
                        </div>
                      </div>

                      <p className="text-muted-foreground leading-relaxed mb-6">{step.description}</p>

                      <div className="deliverable-list grid grid-cols-1 md:grid-cols-2 gap-3">
                        {step.deliverables.map((d) => (
                          <div key={d} className="deliverable-item flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/50">
                            <CheckCircle className="w-5 h-5 text-approved" />
                            <span className="font-medium">{d}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Progress Indicator */}
                    <div className="lg:w-64">
                      <div className="p-6 rounded-xl border border-border bg-muted/40">
                        <div className="text-center mb-4">
                          <div className={`progress-value text-3xl font-bold mb-1 ${step.theme.iconBg.replace("bg-", "text-")} text-[#5f64ff]`} data-value={(index + 1) * 25}>0%</div>
                          <div className="text-sm text-muted-foreground">Complete</div>
                        </div>

                        <div className="w-full bg-border rounded-full h-3 mb-4 overflow-hidden">
                          <div className={`progress-bar bg-gradient-to-r ${step.theme.bar} h-3 rounded-full  transition-all duration-500"`} data-width={(index + 1) * 25} />
                        </div>

                        <div className="text-sm text-center text-muted-foreground">Week {index + 1} • {step.deliverables.length} items</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      
      </div>
    </section>
  );
};

export default ProcessSection;