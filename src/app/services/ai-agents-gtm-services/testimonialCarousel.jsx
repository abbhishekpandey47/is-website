import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 2,
      videoId: "_TrEJAJPp0M",
      features: [
        {
          title: "Self-Guided Platform Tour:",
          description:
            "Scripted and produced an interactive platform tour, showcasing Slack command to automated workflow in minutes. A key lead-gen asset.",
        },
        {
          title: "Onboarding & SDK Documentation:",
          description:
            'Revamped developer docs and Quick Start guides. Clear onboarding paths for their open-source SDK. "Hello World" agent in hours, not days.',
        },
        {
          title: "Use-Case Driven Blogs:",
          description:
            'SEO-friendly articles (e.g., "5 ChatOps Workflows with Kubiya") improved search rankings and educated DevOps engineers. One blog hit Google\'s first page within a week.',
        },
      ],
      rating: 5,
      name: "Cindy Blake",
      image: "/Testimon/cindyFirefly.jpg",
      alt: "Cindy Blake, VP Marketing, Firefly",
      position: "VP Marketting, Firefly",
      quote:
        "Infrasity was quick to onboard and understand how to best show off the capabilities of Firefly's cloud asset management. Team has been super responsive and collaborative.",
      highlight: ["quick to onboard", "responsive", "collaborative"],
    },
    {
      id: 3,
      videoId: "_TrEJAJPp0M",
      features: [
        {
          title: "Self-Guided Platform Tour:",
          description:
            "Scripted and produced an interactive platform tour, showcasing Slack command to automated workflow in minutes. A key lead-gen asset.",
        },
        {
          title: "Onboarding & SDK Documentation:",
          description:
            'Revamped developer docs and Quick Start guides. Clear onboarding paths for their open-source SDK. "Hello World" agent in hours, not days.',
        },
        {
          title: "Use-Case Driven Blogs:",
          description:
            'SEO-friendly articles (e.g., "5 ChatOps Workflows with Kubiya") improved search rankings and educated DevOps engineers. One blog hit Google\'s first page within a week.',
        },
      ],
      rating: 5,
      name: "Josh",
      image: "/Testimon/joshTerraTeam.jpg",
      alt: "Josh, Co-Founder, Terrateam",
      position: "Co-Founder, Terrateam",
      quote:
        "The Infrasity team has been fantastic to work with. Their attention to detail and level of accuracy is top notch. I'd fully recommend their services to anyone.",
      highlight: ["attention to detail", "level of accuracy", "top notch"],
    },
    {
      id: 4,
      videoId: "_TrEJAJPp0M",
      features: [
        {
          title: "Self-Guided Platform Tour:",
          description:
            "Scripted and produced an interactive platform tour, showcasing Slack command to automated workflow in minutes. A key lead-gen asset.",
        },
        {
          title: "Onboarding & SDK Documentation:",
          description:
            'Revamped developer docs and Quick Start guides. Clear onboarding paths for their open-source SDK. "Hello World" agent in hours, not days.',
        },
        {
          title: "Use-Case Driven Blogs:",
          description:
            'SEO-friendly articles (e.g., "5 ChatOps Workflows with Kubiya") improved search rankings and educated DevOps engineers. One blog hit Google\'s first page within a week.',
        },
      ],
      rating: 5,
      name: "Shaked Askayo",
      image: "/Testimon/Shaked.png",
      alt: "Shaked Askayo, CTO, Kubiya.ai",
      position: "CTO, Kubiya.ai",
      quote:
        "Infrasity's creative content has significantly enhanced the visibility and appeal of our product in a competitive market. Crafting content that engages our audience and eloquently highlights the advanced capabilities of Kubiya.ai.",
      highlight: [
        "significantly enhanced the visibility and appeal of our product",
      ],
    },
    {
      id: 5,
      videoId: "_TrEJAJPp0M",
      features: [
        {
          title: "Self-Guided Platform Tour:",
          description:
            "Scripted and produced an interactive platform tour, showcasing Slack command to automated workflow in minutes. A key lead-gen asset.",
        },
        {
          title: "Onboarding & SDK Documentation:",
          description:
            'Revamped developer docs and Quick Start guides. Clear onboarding paths for their open-source SDK. "Hello World" agent in hours, not days.',
        },
        {
          title: "Use-Case Driven Blogs:",
          description:
            'SEO-friendly articles (e.g., "5 ChatOps Workflows with Kubiya") improved search rankings and educated DevOps engineers. One blog hit Google\'s first page within a week.',
        },
      ],
      rating: 5,
      name: "Frank Weissmann",
      image: "/Testimon/Frank.jpg",
      alt: "Frank Weissmann, Customer Success Lead, firefly.ai",
      position: "Customer Success Lead, firefly.ai",
      quote:
        "Infrasity's work has improved the client's SEO, earning a score of over 75%. They'vs also enabled the client to onboard end customers faster. Moreover, the team listens to the client's content needs, produces work that aligns with their conversation and delivers output in a quick turnaround time.",
      highlight: ["over 75%", "quick turnaround time"],
    },
    {
      id: 6,
      videoId: "_TrEJAJPp0M",
      features: [
        {
          title: "Self-Guided Platform Tour:",
          description:
            "Scripted and produced an interactive platform tour, showcasing Slack command to automated workflow in minutes. A key lead-gen asset.",
        },
        {
          title: "Onboarding & SDK Documentation:",
          description:
            'Revamped developer docs and Quick Start guides. Clear onboarding paths for their open-source SDK. "Hello World" agent in hours, not days.',
        },
        {
          title: "Use-Case Driven Blogs:",
          description:
            'SEO-friendly articles (e.g., "5 ChatOps Workflows with Kubiya") improved search rankings and educated DevOps engineers. One blog hit Google\'s first page within a week.',
        },
      ],
      rating: 5,
      name: "Igal Zeifman",
      image: "/Testimon/igalEnv0.jpg",
      alt: "Igal Zeifman, VP Marketing, Env0",
      position: "VP Marketing, Env0",
      quote:
        "Infrasity provided exceptional tech content on infrastructure engineering, with deep expertise in Terraform and the tech stack. Their collaborative approach and hands-on, developer-focused writing make their work impactful. Highly recommend them for technical content creation.",
      highlight: [
        "exceptional tech content",
        "deep expertise",
        "collaborative approach",
        "impactful",
      ],
    },
    {
      id: 7,
      videoId: "_TrEJAJPp0M",
      features: [
        {
          title: "Self-Guided Platform Tour:",
          description:
            "Scripted and produced an interactive platform tour, showcasing Slack command to automated workflow in minutes. A key lead-gen asset.",
        },
        {
          title: "Onboarding & SDK Documentation:",
          description:
            'Revamped developer docs and Quick Start guides. Clear onboarding paths for their open-source SDK. "Hello World" agent in hours, not days.',
        },
        {
          title: "Use-Case Driven Blogs:",
          description:
            'SEO-friendly articles (e.g., "5 ChatOps Workflows with Kubiya") improved search rankings and educated DevOps engineers. One blog hit Google\'s first page within a week.',
        },
      ],
      rating: 5,
      name: "Sri Krishna",
      image: "/Testimon/sriMiddleware.jpeg",
      alt: "Sri Krishna, Content Head, Middleware",
      position: "Content Head, Middleware",
      quote:
        "Infrasity is incredibly responsive and understands client needs exceptionally well, always delivering promptly and as expected. Their attention to detail and outstanding customer support truly set them apart. Communication through email and messaging was seamless, and while the quality of work is top-notch, we look forward to even faster delivery in the future.",
      highlight: [
        "responsive",
        "attention to detail",
        "outstanding customer support",
        "quality of work is top-notch",
      ],
    },
    {
      id: 8,
      videoId: "_TrEJAJPp0M",
      features: [
        {
          title: "Self-Guided Platform Tour:",
          description:
            "Scripted and produced an interactive platform tour, showcasing Slack command to automated workflow in minutes. A key lead-gen asset.",
        },
        {
          title: "Onboarding & SDK Documentation:",
          description:
            'Revamped developer docs and Quick Start guides. Clear onboarding paths for their open-source SDK. "Hello World" agent in hours, not days.',
        },
        {
          title: "Use-Case Driven Blogs:",
          description:
            'SEO-friendly articles (e.g., "5 ChatOps Workflows with Kubiya") improved search rankings and educated DevOps engineers. One blog hit Google\'s first page within a week.',
        },
      ],
      rating: 5,
      name: "Debosmit Ray",
      image: "/Testimon/devzeroDebo1.png",
      alt: "Debosmit Ray, Founder, DevZero",
      position: "Founder, DevZero",
      quote:
        "Infrasity has helped us create technical content, product documentation, and recipe libraries for integrating DevZero with different tech stacks. Their product videos showcase our key features, making it easier to engage users. A great content partner in our journey!",
      highlight: [
        "technical content",
        "tech stacks",
        "easier to engage users",
        "great content partner",
      ],
    },
    {
      id: 9,
      videoId: "_TrEJAJPp0M",
      features: [
        {
          title: "Self-Guided Platform Tour:",
          description:
            "Scripted and produced an interactive platform tour, showcasing Slack command to automated workflow in minutes. A key lead-gen asset.",
        },
        {
          title: "Onboarding & SDK Documentation:",
          description:
            'Revamped developer docs and Quick Start guides. Clear onboarding paths for their open-source SDK. "Hello World" agent in hours, not days.',
        },
        {
          title: "Use-Case Driven Blogs:",
          description:
            'SEO-friendly articles (e.g., "5 ChatOps Workflows with Kubiya") improved search rankings and educated DevOps engineers. One blog hit Google\'s first page within a week.',
        },
      ],
      rating: 5,
      name: "Saif Ali Shaik",
      image: "/Testimon/SaifScalekit.png",
      alt: "Saif Ali Shaik, Devloper Advocate, Scalekit",
      position: "Developer Advocate, Scalekit",
      quote:
        "Infrasity has helped the client achieve increased organic traffic, higher engagement rates on content, and measurable improvements in search rankings. The team's work has contributed to the client's strengthened market position and visibility among key audiences in identification technology.",
      highlight: [
        "organic traffic",
        "higher engagement rates",
        "measurable improvements",
        "strengthened market position",
      ],
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div
      style={{
        background: `
    radial-gradient(circle at top right, rgb(57 63 158) 0%, transparent 40%),
    radial-gradient(circle at bottom left, rgba(9, 12, 25, 1) 0%, transparent 40%),
    #060911
  `,
      }}
    >
      <div className="max-w-6xl mx-auto text-center relative z-10 mb-8">
        <div className="quicksand-bold text-[37px] max-sm:text-[1em] tracking-tighter leading-[80px] text-white text-center flex justify-center mb-2">
          <h1 className=" leading-[80px] max-sm:leading-[69px] text-center max-lg:text-center max-lg:mx-auto">
            Success Spotlight: Helping Kubiya.ai Scale Content
          </h1>
        </div>

        {/* Description */}
        <div className="max-w-[70%] mx-auto">
          <p className="text-[17px] md:text-[17px] text-gray-300 leading-relaxed font-light">
            Kubiya.ai, a pioneer in conversational DevOps agents, partnered with
            Infrasity to accelerate its content and onboarding pipeline. Here's
            what we achieved together:
          </p>
        </div>
      </div>
      <div className="relative flex items-center justify-center p-4">
        {/* Navigation arrows */}
        <button
          onClick={prevTestimonial}
          className="absolute left-4 mr-24 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full border border-white p-2 transition-all duration-300 group"
        >
          <ChevronLeft className="w-6 h-6 text-white  group-hover:scale-110 transition-transform" />
        </button>

        <button
          onClick={nextTestimonial}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full border border-white p-2 transition-all duration-300 group"
        >
          <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
        </button>
        <div className="max-w-5xl w-full">
          {/* Main Card */}
          <div
            className=" from-[#2a2e72] via-blue-900/70 to-[#2a2e72] backdrop-blur-xl rounded-3xl p-8 shadow-2xl border-[2px] border-[#31353d]"
            style={{
              background: `
    radial-gradient(circle at top right, rgb(57 63 158) 0%, transparent 40%),
    radial-gradient(circle at bottom left, rgb(44 49 119) 0%, transparent 80%),
    #060911
  `,
              border: "2px solid rgb(77 80 136)",
            }}
          >
            {/* Video Section */}
            <div className="mb-8">
              <div className="aspect-video rounded-2xl overflow-hidden bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${currentTestimonial.videoId}?rel=0&modestbranding=1`}
                  title="Testimonial Video"
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {currentTestimonial.features.map((feature, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-700/30 rounded-2xl p-6 border border-white/5">
              <blockquote className="text-white text-xl italic mb-4 leading-relaxed">
                "{currentTestimonial.quote}"
              </blockquote>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="rounded-full flex items-center justify-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden mr-3 sm:mr-4 border-2 border-indigo-400">
                      <img
                        src={currentTestimonial.image}
                        alt={currentTestimonial.name}
                        className="w-full h-full object-cover"
                        draggable="false"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-white font-medium">
                      {currentTestimonial.name}
                    </p>

                    <div className="flex space-x-1 mt-2">
                      {[...Array(currentTestimonial.rating)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-5 h-5 text-yellow-400"
                          viewBox="0 0 20 20"
                          fill="#facc15"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/*  Navigation */}
          <div className="flex justify-center space-x-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-white scale-125"
                    : "bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
