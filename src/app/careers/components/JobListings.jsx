"use client";
import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  MapPin, 
  Clock, 
  Users, 
  Code, 
  TrendingUp, 
  MessageSquare,
  Filter,
  Search,
  ExternalLink
} from "lucide-react";
import CalendarBooking from "../../calendarButton";


gsap.registerPlugin(ScrollTrigger);

const JobListings = () => {
  const [selectedTeam, setSelectedTeam] = useState("All Teams");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef(null);

  const teams = ["All Teams", "Engineering", "Marketing", "Sales", "Operations", "Content", "Design"];
  const locations = ["All Locations", "New Delhi"];

  const jobs = [
    {
      id: 1,
      title: "Sales Engineer",
      team: "Sales",
      location: "New Delhi",
      type: "Full-time",
      experience: "3-5 years",
      description: "Bridge the gap between technical capabilities and client needs by demonstrating our developer marketing solutions to enterprise clients.",
      requirements: [
        "3–5 years in pre-sales engineering, solutions architecture, or DevRel",
        "Strong hands-on expertise with cloud infrastructure (AWS/GCP/Azure)",
        "Familiarity with IaC (Terraform, Pulumi), Kubernetes, CI/CD pipelines",
        "Understanding of DevTools, APIs, SDKs, and developer adoption journeys",
        "Comfortable with scripting (Python, Bash, or Node.js) for demos/PoCs"
      ],
      benefits: [
        "Competitive salary and equity",
        "Flexible work arrangements",
        "Professional development budget",
        "Top-tier health insurance"
      ],
      posted: "2 days ago",
      fullDescription: {
        aboutUs: "Infrasity is the developer-first growth partner for early-stage SaaS and DevTools startups. We work with YC-backed and VC-funded companies in infra, AI, and DevTools—helping them scale adoption through technical content, demos, and developer relations.",
        jobDescription: "As a Sales Engineer at Infrasity, you'll be the technical voice in our growth motion. You'll work directly with founders and product teams to understand their infrastructure challenges and translate Infrasity's GTM services into clear, adoption-driving solutions.",
        keyResponsibilities: {
          "Client Solutioning": [
            "Partner with founders/CTOs to map adoption blockers into tailored Infrasity solutions",
            "Run technical discovery calls, connecting customer needs with content, GTM, and DevRel playbooks"
          ],
          "Outbound & Partnerships": [
            "Prospect and qualify early-stage infra/AI startups via LinkedIn, VC portfolios, and Reddit",
            "Build and maintain relationships with VCs, accelerators, and ecosystem partners"
          ]
        },
        qualifications: {
          "Must-Haves": [
            "2–4 years in sales engineering, DevRel, or solutions consulting",
            "Understanding of DevOps/Infra domains (Terraform, K8s, CI/CD, Cloud providers)",
            "Strong communication and storytelling skills"
          ],
          "Nice-to-Haves": [
            "Prior experience in SaaS/DevTools GTM",
            "Hands-on with developer communities (Reddit, GitHub, Discord)"
          ]
        },
        whyJoin: [
          "Work directly with founders on GTM strategy",
          "Stay technical while building pipeline and revenue",
          "Exposure to cutting-edge infra and AI startups"
        ],
        howToApply: "Send your CV and a short note on a GTM/sales engineering project you've led to careers@infrasity.com"
      }
    },
    {
      id: 2,
      title: "Technical Writer",
      team: "Content",
      location: "New Delhi",
      type: "Full-time / Contract",
      experience: "2+ years",
      description: "Create developer-grade content that translates complex infrastructure, AI, and DevTools concepts into engaging, accurate resources.",
      requirements: [
        "2+ years of experience writing technical content (blogs, docs, READMEs)",
        "Strong grasp of cloud infrastructure (AWS, GCP, Azure), IaC (Terraform/Pulumi), or Kubernetes",
        "Ability to explain complex topics to both technical and semi-technical readers",
        "Excellent written English with an engineering-first approach"
      ],
      benefits: [
        "Competitive salary and equity",
        "Flexible work arrangements",
        "Professional development budget",
        "Top-tier health insurance"
      ],
      posted: "3 days ago",
      fullDescription: {
        aboutUs: "Infrasity is the developer-first growth partner for SaaS, AI, and DevTools startups. We create content that engineers actually trust—SDK guides, cloud/infra tutorials, use-case playbooks, and technical comparisons that drive adoption.",
        jobDescription: "As a Technical Writer at Infrasity, you'll create developer-grade content that translates complex infrastructure, AI, and DevTools concepts into engaging, accurate resources.",
        keyResponsibilities: {
          "Content Creation": [
            "Research and write long-form technical blogs (cloud infra, Terraform, Kubernetes, SDKs, AI/ML tooling)",
            "Develop clear, concise developer documentation (API guides, SDK examples, quickstarts)"
          ],
          "Collaboration & Review": [
            "Work with engineers to validate technical accuracy",
            "Collaborate with SEO/growth teams to align content with keyword strategy"
          ]
        },
        qualifications: {
          "Must-Haves": [
            "2+ years of experience writing technical content (blogs, docs, READMEs)",
            "Strong grasp of cloud infrastructure (AWS, GCP, Azure), IaC (Terraform/Pulumi), or Kubernetes",
            "Excellent written English with an engineering-first approach"
          ],
          "Nice-to-Haves": [
            "Prior experience in DevTools/infra startups",
            "Familiarity with SEO tools (Ahrefs, Semrush, Surfer)"
          ]
        },
        whyJoin: [
          "Write content for cutting-edge startups in infra, AI, and DevTools",
          "Blend engineering knowledge with storytelling and SEO strategy",
          "Remote/hybrid flexibility with high ownership"
        ],
        howToApply: "Send your CV and links to recent technical writing samples (blogs, docs, READMEs) to contact@infrasity.com"
      }
    },
    {
      id: 3,
      title: "Graphic Designer Intern",
      team: "Design",
      location: "New Delhi",
      type: "Internship (3 months)",
      experience: "Student/Recent Graduate",
      description: "Support our content and growth teams by creating visual assets that bring technical stories to life.",
      requirements: [
        "Pursuing or recently completed a degree/diploma in Design, Visual Arts, or related field",
        "Proficiency with tools like Figma, Adobe Illustrator, Photoshop, or Canva",
        "Strong eye for modern, clean design aligned with tech branding",
        "Portfolio of previous design work (academic or freelance)"
      ],
      benefits: [
        "Hands-on experience with YC-backed startups",
        "Mentorship from growth and content team",
        "Portfolio building opportunities",
        "Potential for full-time conversion"
      ],
      posted: "1 week ago",
      fullDescription: {
        aboutUs: "Infrasity is the developer-first growth partner for SaaS, AI, and DevTools startups. We work with early-stage companies backed by YC and top VCs, helping them scale adoption through technical content, developer relations, and GTM strategy. Alongside deep technical blogs and videos, design is a key layer—turning complex engineering stories into clear, impactful visuals.",
        jobDescription: "As a Graphic Designer Intern at Infrasity, you'll support our content and growth teams by creating visual assets that bring technical stories to life. From social graphics to case study layouts, your work will shape how startups showcase their products to developers, founders, and investors. This role is ideal for someone who wants exposure to tech-driven storytelling while building a strong design portfolio.",
        keyResponsibilities: {
          "Design & Visual Assets": [
            "Create graphics for LinkedIn, Twitter, and other social channels",
            "Design layouts for case studies, whitepapers, and blog illustrations",
            "Support video team with visual elements (thumbnails, slides, overlays)",
            "Develop simple infographics and diagrams for technical explainer content"
          ],
          "Collaboration & Workflow": [
            "Work closely with content writers and DevRel engineers to translate technical topics into visuals",
            "Adapt brand guidelines across client-facing materials",
            "Support marketing campaigns with creatives for ads, landing pages, and presentations"
          ],
          "Learning & Growth": [
            "Gain exposure to developer marketing and tech-focused design",
            "Experiment with motion graphics/animation (nice to have, not mandatory)",
            "Receive mentorship from Infrasity's growth and content team"
          ]
        },
        qualifications: {
          "Must-Haves": [
            "Pursuing or recently completed a degree/diploma in Design, Visual Arts, or related field",
            "Proficiency with tools like Figma, Adobe Illustrator, Photoshop, or Canva",
            "Strong eye for modern, clean design aligned with tech branding",
            "Portfolio of previous design work (academic or freelance)"
          ],
          "Nice-to-Haves": [
            "Interest in tech/infra/AI space",
            "Exposure to motion design (After Effects, Premiere Pro)",
            "Familiarity with social-first content design"
          ]
        },
        whyJoin: [
          "Build a portfolio working with YC-backed and VC-funded startups",
          "Learn how design powers GTM for engineering-first companies",
          "Flexible, collaborative environment with ownership over your work",
          "Potential for full-time conversion after internship"
        ],
        howToApply: "Send your CV and a link to your design portfolio to contact@infrasity.com"
      }
    }
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesTeam = selectedTeam === "All Teams" || job.team === selectedTeam;
    const matchesLocation = selectedLocation === "All Locations" || job.location === selectedLocation;
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTeam && matchesLocation && matchesSearch;
  });

  const handleJobClick = (job) => {
    console.log('Job clicked:', job.title);
    setSelectedJob(job);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
    document.body.style.overflow = 'unset';
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".job-card",
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [filteredJobs]);

  return (
    <section ref={sectionRef} id="open-positions" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white">
            Open Positions ({filteredJobs.length})
          </h2>
          <div className="flex items-center gap-2 text-zinc-400">
            <Filter className="w-4 h-4" />
            <span>All Jobs</span>
          </div>
        </div>


        {/* Job Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <div key={job.id} className="job-card group">
              <div 
                className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-purple-500/50 cursor-pointer h-full"
                onClick={() => handleJobClick(job)}
              >
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <h3 className="text-xl font-bold group-hover:text-purple-400 transition-colors flex-1 text-white">
                      {job.title}
                    </h3>
                    <div className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-medium">
                      {job.team}
                    </div>
                  </div>

                  {/* Location and Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-zinc-400 text-sm">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-400 text-sm">
                      <Clock className="w-4 h-4 flex-shrink-0" />
                      <span>{job.type}</span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-400 text-sm">
                      <Users className="w-4 h-4 flex-shrink-0" />
                      <span>{job.experience}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-zinc-300 leading-relaxed flex-1 mb-6">
                    {job.description}
                  </p>

                  {/* Apply Button */}

                  <div onClick={(e) => e.stopPropagation()}>
                    <CalendarBooking 
                      buttonText="Apply Now" 
                      width="w-full" 
                      textSize="text-sm"
                      height="h-10"
                    />

                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredJobs.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <Search className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-bold mb-4">No positions found</h3>
            <p className="text-muted-foreground mb-8">
              Try adjusting your search criteria or check back later for new openings.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedTeam("All Teams");
                setSelectedLocation("All Locations");
              }}
              className="px-6 py-3 border border-border rounded-xl hover:bg-muted/50 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Job Detail Modal */}
        {isModalOpen && selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={closeModal}>
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              {/* Modal Header */}
              <div className="sticky top-0 bg-zinc-900 border-b border-zinc-800 p-6 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-white">{selectedJob.title}</h2>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-2 text-zinc-400">
                        <MapPin className="w-4 h-4" />
                        <span>{selectedJob.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-zinc-400">
                        <Clock className="w-4 h-4" />
                        <span>{selectedJob.type}</span>
                      </div>
                      <div className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-medium">
                        {selectedJob.team}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={closeModal}
                    className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-8">
                {/* About Us */}
                {selectedJob.fullDescription?.aboutUs && (
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-white">About Us</h3>
                    <div className="text-zinc-300 leading-relaxed whitespace-pre-line">
                      {selectedJob.fullDescription.aboutUs}
                    </div>
                  </div>
                )}

                {/* Job Description */}
                {selectedJob.fullDescription?.jobDescription && (
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-white">Job Description</h3>
                    <div className="text-zinc-300 leading-relaxed">
                      {selectedJob.fullDescription.jobDescription}
                    </div>
                  </div>
                )}

                {/* Key Responsibilities */}
                {selectedJob.fullDescription?.keyResponsibilities && (
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-white">Key Responsibilities</h3>
                    <div className="space-y-6">
                      {Object.entries(selectedJob.fullDescription.keyResponsibilities).map(([category, items]) => (
                        <div key={category}>
                          <h4 className="text-lg font-semibold mb-3 text-purple-400">{category}</h4>
                          <ul className="space-y-2">
                            {items.map((item, index) => (
                              <li key={index} className="flex items-start gap-3 text-zinc-300">
                                <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Qualifications */}
                {selectedJob.fullDescription?.qualifications && (
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-white">Qualifications</h3>
                    <div className="space-y-6">
                      {Object.entries(selectedJob.fullDescription.qualifications).map(([category, items]) => (
                        <div key={category}>
                          <h4 className="text-lg font-semibold mb-3 text-purple-400">{category}</h4>
                          <ul className="space-y-2">
                            {items.map((item, index) => (
                              <li key={index} className="flex items-start gap-3 text-zinc-300">
                                <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Why Join */}
                {selectedJob.fullDescription?.whyJoin && (
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-white">Why Join Infrasity?</h3>
                    <ul className="space-y-2">
                      {selectedJob.fullDescription.whyJoin.map((item, index) => (
                        <li key={index} className="flex items-start gap-3 text-zinc-300">
                          <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* How to Apply */}
                {selectedJob.fullDescription?.howToApply && (
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-white">How to Apply</h3>
                    <div className="text-zinc-300 leading-relaxed">
                      {selectedJob.fullDescription.howToApply}
                    </div>
                  </div>
                )}

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-zinc-800">
                  <CalendarBooking 
                    buttonText="Apply Now" 
                    width="w-52" 
                  />

                  <button
                    onClick={closeModal}
                    className="px-8 py-4 border border-zinc-700 rounded-xl font-semibold text-white hover:bg-zinc-800 transition-all duration-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default JobListings;
