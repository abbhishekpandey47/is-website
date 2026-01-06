'use client';

import { ArrowRight, Zap, Code, Terminal, GitBranch, Users, Search, CheckCircle2, Settings, ArrowUp, BookOpen, FileText, Layers, Smartphone, Lightbulb, Wrench, TrendingUp, FileStack, Globe, Rocket, AlertCircle, Map, Heart } from 'lucide-react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import NewMarquee from '@/Components/NewMarquee';
import CTA from '../developer-marketing-agency/cta';
import Testimonials from '../developer-marketing-agency/Testimonial';
import Showcase from '../../../Components/docs/Showcase';
import FeaturedResults from '../developer-marketing-agency/FeaturedResults';
import VideoTestimonials from '../../playbook/developer-marketing/testimonials';
import { Videos } from '../../playbook/developer-marketing/videosData';
import FAQSection from "./FAQ"

// Infrasity Studio Component with 3D Tilt Animation
function InfrasityStudioSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  // 3D Tilt Card Component
  const TiltCard = ({ children, delay = 0, className = "" }) => {
    const cardRef = useRef(null);
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);

    const handleMouseMove = (e) => {
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      const rotateXValue = (mouseY / (rect.height / 2)) * -10; // Max 10deg rotation
      const rotateYValue = (mouseX / (rect.width / 2)) * 10;

      setRotateX(rotateXValue);
      setRotateY(rotateYValue);
    };

    const handleMouseLeave = () => {
      setRotateX(0);
      setRotateY(0);
    };

    return (
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: "preserve-3d",
          transition: "transform 0.1s ease-out",
        }}
        className={className}
      >
        {children}
      </motion.div>
    );
  };

  const topBadges = [
    { icon: Code, label: "Engineering-First" },
    { icon: CheckCircle2, label: "CI-Tested Docs" },
    { icon: Rocket, label: "Fast Delivery" },
    { icon: Zap, label: "Growth-Driven" },
  ];

  const featureCards = [
    { icon: AlertCircle, title: "Product Deep Dives", desc: "We run your product end-to-end before writing." },
    { icon: Users, title: "SDK + API Testing", desc: "Every guide validated across interfaces." },
    { icon: Map, title: "Information Architecture", desc: "Map workflows → endpoints → SDKs." },
    { icon: Lightbulb, title: "Developer Experience Design", desc: "Reduce cognitive load with clear flows." },
    { icon: Wrench, title: "CI-Tested Examples", desc: "Never broken; every snippet runs." },
    { icon: FileText, title: "Technical Narratives", desc: 'Explain "why," not just "how."' },
    { icon: Layers, title: "Content Systems", desc: "Versioning, release notes, upgrade guides." },
    { icon: BookOpen, title: "DevRel + GTM Assets", desc: "Tutorials, walkthroughs, launch content." },
    { icon: Globe, title: "Platform-Agnostic Delivery", desc: "Mintlify, GitBook, Docusaurus, custom React/Next.js." },
  ];

  return (
    <div ref={containerRef} className="grid lg:grid-cols-2 gap-16">
      {/* Left Side: Main Content */}
      <motion.div
        className="space-y-8"
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <h2 className="text-5xl lg:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#00D4FF] via-[#7B61FF] to-[#B14EFF] bg-clip-text text-transparent">
              Infrasity Studio™
            </span>
          </h2>
          <p className="text-2xl lg:text-3xl font-semibold text-white mb-8">
            Where Documentation Meets Engineering
          </p>
        </div>

        <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
          <p>
            We're not a content agency. We're an engineering studio for documentation systems — combining technical writing, API testing, information architecture, and developer-first GTM.
          </p>
          <p>
            Every deliverable starts with hands-on product testing. We run your APIs, try your CI flows, explore workflows, and validate SDKs before writing a single sentence.
          </p>
          <p>
            Our docs are built to scale: versioned, CI-tested, consistent, and ready for enterprise adoption — whether you're launching your first docs or rebuilding full documentation stacks.
          </p>
        </div>
      </motion.div>

      {/* Right Side: Feature Badges with 3D Tilt */}
      <div className="space-y-6">
        {/* Top Row Features */}
        <div className="grid grid-cols-2 gap-4">
          {topBadges.map((badge, i) => {
            const Icon = badge.icon;
            return (
              <TiltCard key={i} delay={0.1 * i}>
                <div className="group relative rounded-xl bg-[#0E1018]/80 backdrop-blur-md border border-[#1E2236] p-4 hover:border-[#00D4FF]/50 hover:shadow-[0_0_30px_rgba(0,212,255,0.3)] transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-[#00D4FF] group-hover:scale-110 transition-transform" />
                    <span className="text-white font-medium">{badge.label}</span>
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>

        {/* Feature Cards Grid with 3D Tilt */}
        <div className="grid grid-cols-1 gap-4 mt-8">
          {/* Render cards in rows of 3 */}
          {[0, 3, 6].map((startIdx) => (
            <div key={startIdx} className="grid grid-cols-3 gap-4">
              {featureCards.slice(startIdx, startIdx + 3).map((card, i) => {
                const Icon = card.icon;
                const actualIndex = startIdx + i;
                return (
                  <TiltCard key={actualIndex} delay={0.1 * (actualIndex + 4)}>
                    <div className="group relative rounded-xl bg-[#0E1018]/80 backdrop-blur-md border border-[#1E2236] p-4 hover:border-[#00D4FF]/50 hover:shadow-[0_0_30px_rgba(0,212,255,0.3)] transition-all duration-300 h-full">
                      <Icon className="w-5 h-5 text-[#00D4FF] mb-3 group-hover:scale-110 transition-transform" />
                      <h3 className="text-white font-medium mb-2">{card.title}</h3>
                      <p className="text-sm text-gray-400">{card.desc}</p>
                    </div>
                  </TiltCard>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProductDocumentationPage() {

  const showcaseItems = [
    {
      name: 'Amnic',
      url: 'https://docs.amnic.com',
      description: 'Amnic partnered with Infrasity to design a developer-focused documentation system for its AI-driven observability platform. Across four weeks, we built detailed integration pages, quick-start guides, and troubleshooting docs — each reinforced with GIFs, SDK snippets, and real use cases. The result is a GitBook documentation hub that not only explains Amnic\'s product capabilities but also showcases its engineering depth to enterprise teams.',
      mediaLabel: 'Amnic docs preview',
      loomId: 'af4d20e3a62b41dcae9afb0c06d9466f',
    },
    {
      name: 'DevZero',
      url: 'https://www.devzero.io/docs',
      description: 'DevZero partnered with Infrasity to create documentation that accelerates developer onboarding for its secure cloud development environments. We built SDK and CLI references, environment setup flows, and troubleshooting guides focused on how engineers spin up, connect, and scale their sandboxes. Each doc combines code samples, animated sequences, and short deployment walkthroughs — helping DevZero users move from first command to first build in minutes. The documentation now doubles as both a product guide and a GTM asset, showcasing DevZero\'s engineering strength to teams adopting remote dev environments.',
      mediaLabel: 'DevZero onboarding docs preview',
      loomId: '1f571827c2fd4bdfac1962bf562d0184',
    },
    {
      name: 'Kubiya',
      url: 'https://docs.kubiya.ai',
      description: 'Kubiya\'s team worked with Infrasity to turn their AI agent platform into documentation engineers actually use. We built a clear hierarchy for SDKs, APIs, and workflows — showing how Kubiya connects prompts to real infrastructure actions. Each guide includes runnable examples, CLI outputs, and embedded GIFs illustrating how agents execute tasks like provisioning environments or managing secrets. The documentation became a live extension of Kubiya\'s product — helping engineers understand, trust, and adopt AI-driven DevOps automation faster.',
      mediaLabel: 'Kubiya docs preview',
      loomId: 'b098784944f843d8b76e979e194f966f',
    },
    {
      name: 'StackGen',
      url: 'https://stackgen.example.com/docs',
      description: 'StackGen\'s documentation is designed to make complex, AI-driven infrastructure automation accessible to engineers. Infrasity structured the content around real-world workflows — from stack generation to IaC validation — ensuring every guide balances conceptual clarity with command-level depth. Each section integrates CLI examples, architecture diagrams, and agent-execution visuals to help developers understand how AI interacts with Terraform and cloud APIs. The resulting docs act as a complete narrative of how StackGen translates infrastructure intent into working code — written for those who build, not just read.',
      mediaLabel: 'StackGen integration docs preview',
      loomId: '97d1ab6b2aac49e09208a6c3deadfb9a',
    },
  ];

  const differenceCards = [
    {
      icon: Users,
      title: 'Engineer-First Approach',
      description: 'We test your product before we write a single line of doc.',
    },
    {
      icon: Search,
      title: 'Growth-Driven Structure',
      description: 'Docs optimized for both SEO and developer intent.',
    },
    {
      icon: Code,
      title: 'Real-World Examples',
      description: 'Every doc includes working code, commands, and context.',
    },
  ];

  const deliverables = [
    {
      id: 'quickstart',
      icon: Zap,
      title: 'Developer Quickstarts',
      metric: 'TTFX ↓ 35-60%',
      benefit: '• Reduce Time-to-First-Success',
      description: 'Guides that get users from install → run → output in minutes. Linear, tested, persona-specific flows for SDKs, CLIs, and APIs.',
    },
    {
      id: 'api',
      icon: Code,
      title: 'API & SDK Reference Systems',
      metric: 'Self-serve ↑',
      benefit: '• Increase self-serve adoption',
      description: 'Versioned endpoints, runnable examples, and error docs that ship tested in CI — no broken snippets, ever.',
    },
    {
      id: 'cli',
      icon: Terminal,
      title: 'CLI & Agent Workflow Docs',
      metric: '0-1 Clarity',
      benefit: '• Operational clarity',
      description: 'Command-line and agent prompts mapped to real workflows — provisioning, secret rotation, onboarding. Every flow reproducible.',
    },
    {
      id: 'integration',
      icon: GitBranch,
      title: 'Integration Recipes',
      metric: 'Integration Time ↓',
      benefit: '• End-to-end trust',
      description: 'Examples for Terraform, K8s, GitHub Actions tested live with verification + teardown steps.',
    },
    {
      id: 'troubleshooting',
      icon: Settings,
      title: 'Troubleshooting & Runbooks',
      metric: 'Tickets ↓ 22-40%',
      benefit: '• Lower support load',
      description: 'Top 20 error modes with copy-paste fixes, expected logs, and decision trees for instant debugging.',
    },
    {
      id: 'release-notes',
      icon: ArrowUp,
      title: 'Release Notes & Upgrade Guides',
      metric: 'Migration Errors ↓',
      benefit: '• Predictable versioning',
      description: 'Semantic changes mapped to SDK/API behavior with migration guides that prevent breaking updates.',
    },
  ];

  const docOpsPipeline = [
    {
      number: '01',
      title: 'Product Discovery',
      description: 'Test APIs, SDKs, and workflows firsthand.',
    },
    {
      number: '02',
      title: 'Information Architecture',
      description: 'Map user journeys to documentation structure.',
    },
    {
      number: '03',
      title: 'Content Development',
      description: 'Write developer-focused guides with working code.',
    },
    {
      number: '04',
      title: 'Code Validation',
      description: 'CI-test all examples against live endpoints.',
    },
    {
      number: '05',
      title: 'Platform Setup',
      description: 'Configure Mintlify, GitBook, or custom engine.',
    },
    {
      number: '06',
      title: 'SEO & Metadata',
      description: 'Optimize for discoverability and search rankings.',
    },
    {
      number: '07',
      title: 'Deploy & Measure',
      description: 'Ship docs and track engagement metrics.',
    },
  ];

  const metrics = [
    { value: '+48%', label: 'time-on-page', company: '(Kubiya)' },
    { value: '+30%', label: 'onboarding completions', company: '(DevZero)' },
    { value: '-35%', label: 'support tickets', company: '(Tracetest)' },
  ];

  const edgeFeatures = [
    {
      icon: Lightbulb,
      title: 'Developer Experience Design',
      description: 'Reduce cognitive load with clear flows.',
    },
    {
      icon: Wrench,
      title: 'CI-Tested Examples',
      description: 'All code snippets validated in CI pipelines.',
    },
    {
      icon: TrendingUp,
      title: 'Technical Narratives',
      description: 'Stories that connect concepts to real workflows.',
    },
    {
      icon: FileStack,
      title: 'Content Systems',
      description: 'Scalable architecture for growing documentation.',
    },
    {
      icon: BookOpen,
      title: 'DevRel + GTM Assets',
      description: 'Docs that double as marketing and sales enablement.',
    },
    {
      icon: Globe,
      title: 'Platform-Agnostic Delivery',
      description: 'Ship to any platform your team prefers.',
    },
  ];

  const heroFeatures = [
    {
      icon: Code,
      title: 'Engineering-First',
      description: 'Built by engineers, for engineers.',
    },
    {
      icon: CheckCircle2,
      title: 'CI-Tested Docs',
      description: 'Every example validated in CI pipelines.',
    },
    {
      icon: Rocket,
      title: 'Fast Delivery',
      description: 'Ship production-ready docs in weeks.',
    },
    {
      icon: Zap,
      title: 'Growth-Driven',
      description: 'Docs optimized for SEO and developer adoption.',
    },
    {
      icon: AlertCircle,
      title: 'Product Deep Dives',
      description: 'We run your product end-to-end before writing.',
    },
    {
      icon: Layers,
      title: 'SDK + API Testing',
      description: 'Every guide validated across interfaces.',
    },
    {
      icon: Map,
      title: 'Information Architecture',
      description: 'Map workflows → endpoints → SDKs.',
    },
    {
      icon: Lightbulb,
      title: 'Developer Experience Design',
      description: 'Reduce cognitive load with clear flows.',
    },
    {
      icon: Wrench,
      title: 'CI-Tested Examples',
      description: 'Never broken; every snippet runs.',
    },
    {
      icon: FileText,
      title: 'Technical Narratives',
      description: 'Explain "why," not just "how."',
    },
    {
      icon: FileStack,
      title: 'Content Systems',
      description: 'Versioning, release notes, upgrade guides.',
    },
    {
      icon: Heart,
      title: 'DevRel + GTM Assets',
      description: 'Tutorials, walkthroughs, launch content.',
    },
    {
      icon: Globe,
      title: 'Platform-Agnostic Delivery',
      description: 'Mintlify, GitBook, Docusaurus, custom React/Next.js.',
    },
  ];

  // DocOps Pipeline Component with Animations
  function DocOpsPipelineFlow({ steps }) {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.2 });

    const lineVariants = {
      hidden: { scaleX: 0, originX: 0 },
      visible: {
        scaleX: 1,
        transition: {
          duration: 1.5,
          ease: [0.25, 0.1, 0.25, 1],
          delay: 0.3,
        },
      },
    };

    const stepVariants = {
      hidden: { opacity: 0, scale: 0.8, y: 20 },
      visible: (i) => ({
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
          duration: 0.6,
          delay: 0.5 + i * 0.15,
          ease: [0.25, 0.1, 0.25, 1],
        },
      }),
    };

    const circlePulseVariants = {
      animate: {
        scale: [1, 1.05, 1],
        boxShadow: [
          '0 0 20px rgba(0,212,255,0.4)',
          '0 0 30px rgba(0,212,255,0.6)',
          '0 0 20px rgba(0,212,255,0.4)',
        ],
        transition: {
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
          repeatDelay: 1,
        },
      },
    };

    return (
      <div className="relative" ref={containerRef}>
        {/* Animated Connecting Line */}
        <motion.div
          className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00D4FF]/30 via-[#7B61FF]/30 to-[#00D4FF]/30 transform -translate-y-1/2 z-0 origin-left"
          style={{ top: '60px' }}
          variants={lineVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        />

        {/* Pipeline Steps */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-6 lg:gap-4">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              className="relative flex flex-col items-center"
              variants={stepVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              custom={i}
            >
              {/* Step Number Circle with Pulse Animation */}
              <motion.div
                className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#7B61FF] flex items-center justify-center mb-4 border-2 border-[#06080D] shadow-[0_0_20px_rgba(0,212,255,0.4)]"
                variants={circlePulseVariants}
                animate={isInView ? 'animate' : {}}
              >
                <div className="w-14 h-14 rounded-full bg-[#06080D] flex items-center justify-center">
                  <span className="text-lg font-bold text-white">{step.number}</span>
                </div>
              </motion.div>

              {/* Step Content */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.7 + i * 0.15, duration: 0.4 }}
              >
                <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{step.description}</p>
              </motion.div>

              {/* Connector Arrow (hidden on mobile, shown between steps on desktop) */}
              {i < steps.length - 1 && (
                <motion.div
                  className="hidden lg:block absolute top-[60px] -right-2 w-4 h-0.5 bg-[#00D4FF]/30 z-0"
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
                  transition={{ delay: 0.8 + i * 0.15, duration: 0.4 }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-l-[6px] border-l-[#00D4FF]/30 border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent"></div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#06080D] via-[#0B0E18] to-[#11142B]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-24 px-6">
        {/* Background Pattern */}
        <svg
          className="absolute inset-0 -z-10 h-full w-full stroke-white/10 [mask-image:radial-gradient(75%_50%_at_top_center,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="hero"
              width="80"
              height="80"
              x="50%"
              y="-1"
              patternUnits="userSpaceOnUse"
            >
              <path d="M.5 200V.5H200" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" strokeWidth="0" fill="url(#hero)" />
        </svg>

        <div className="absolute inset-0 -z-10 bg-[radial-gradient(70%_80%_at_50%_-20%,rgba(123,97,255,0.3),rgba(255,255,255,0))]" />

        <div className="relative max-w-7xl mx-auto">
          {/* Trust badge */}
          <div className="text-center mb-8">
            <span className="inline-block px-4 py-2 rounded-full text-xs uppercase tracking-widest text-cyan-400/70 border border-cyan-400/20 bg-cyan-400/5">
              ✨ trusted by engineering-led startups
            </span>
          </div>

          {/* Hero content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight text-white">
                Documentation That Drives{' '}
                <span className="bg-gradient-to-r from-[#00D4FF] via-[#7B61FF] to-[#B14EFF] text-transparent bg-clip-text">
                  Developer Adoption
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
                We build SDK, API, CLI, and integration docs that engineers actually use — written by engineers, optimized for growth.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#00D4FF] to-[#7B61FF] text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(123,97,255,0.4)]"
                >
                  See Example Docs
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-[#0E1018]/80 backdrop-blur-md text-white font-semibold rounded-lg border border-[#1E2236] hover:bg-[#0E1018] transition-all duration-300 hover:shadow-[0_0_30px_rgba(123,97,255,0.15)]"
                >
                  Book a Docs Audit
                </Link>
              </div>

              {/* Trust line */}
              <p className="text-sm text-gray-500 font-mono">
                Built by engineers, not copywriters.
              </p>
            </div>

            {/* Code preview */}
            <div className="relative">
              <div className="bg-[#0E1018]/80 backdrop-blur-md rounded-2xl border border-[#1E2236] overflow-hidden shadow-[0_0_40px_rgba(123,97,255,0.15)]">
                <div className="flex items-center gap-2 px-4 py-3 bg-[#0A0C14] border-b border-[#1E2236]">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <div className="w-3 h-3 rounded-full bg-green-500/60" />
                  </div>
                  <span className="ml-2 text-xs text-gray-500 font-mono">quickstart.md</span>
                  <div className="ml-auto text-xs text-gray-600">→ rendered-docs</div>
                </div>

                <div className="grid grid-cols-2 divide-x divide-[#1E2236]">
                  {/* Markdown */}
                  <div className="p-6 bg-[#0A0C14]">
                    <div className="space-y-3 font-mono text-sm">
                      <div className="text-cyan-400">## Quick Start</div>
                      <div className="text-gray-400">Install the SDK:</div>
                      <div className="bg-[#06080D] px-3 py-2 rounded border border-[#1E2236]">
                        <code className="text-emerald-400">npm install @infrasity/sdk</code>
                      </div>
                      <div className="text-gray-400">Initialize in your app</div>
                      <div className="text-gray-600">_</div>
                    </div>
                  </div>

                  {/* Rendered */}
                  <div className="p-6 bg-gradient-to-br from-[#0E1018] to-[#0A0C14]">
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                        Quick Start
                      </h3>
                      <p className="text-sm text-gray-300">Install the SDK:</p>
                      <div className="bg-[#06080D] px-3 py-2 rounded font-mono text-sm border border-[#1E2236]">
                        <code className="text-emerald-400">$ npm install @infrasity/sdk</code>
                      </div>
                      <div className="text-xs text-green-400 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        Ready to use
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shared: Trusted By Logos Marquee */}
      <div
        style={{
          background: "radial-gradient(ellipse at 50% 0%, #272b40 0%, transparent 40%)",
        }}
      >
        <div className="w-full h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5 mt-8 mb-1"></div>
        
        <div className="text-center pt-20 pb-10 px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Trusted by <span className="bg-gradient-to-r from-[#00D4FF] via-[#7B61FF] to-[#B14EFF] text-transparent bg-clip-text">Engineering-Led Startups</span>
          </h2>
        </div>
        
        <NewMarquee />
          </div>

      {/* Shared: Docs in Action Showcase */}
      <div
        style={{
          background: "radial-gradient(ellipse at 50% 0%, #272b40 0%, transparent 40%)",
        }}
      >
        <div className="w-full h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5 mt-16 mb-1"></div>
        <Showcase items={showcaseItems} />
      </div>

      {/* The Infrasity Difference */}
      <div
        style={{
          background: "radial-gradient(ellipse at 50% 0%, #272b40 0%, transparent 40%)",
        }}
      >
        <div className="w-full h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5 mt-16 mb-1"></div>
        <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">The Infrasity Difference</h2>
              <p className="text-lg md:text-xl text-gray-400">Why founders choose Infrasity for docs</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {differenceCards.map((card, i) => {
              const Icon = card.icon;
              return (
                  <div key={i} className="bg-[#0E1018]/80 backdrop-blur-md rounded-2xl border border-[#1E2236] p-8 hover:border-[#7B61FF]/30 hover:shadow-[0_0_30px_rgba(123,97,255,0.15)] transition-all duration-300">
                    <Icon className="w-12 h-12 mb-6" style={{ color: '#00D4FF' }} />
                  <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
                    <p className="text-gray-400">{card.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      </div>

      {/* What We Build */}
      <div
        style={{
          background: "radial-gradient(ellipse at 50% 0%, #272b40 0%, transparent 40%)",
        }}
      >
        <div className="w-full h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5 mt-16 mb-1"></div>
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl lg:text-6xl font-bold text-white mb-4">
                What We{' '}
                <span className="bg-gradient-to-r from-[#00D4FF] via-[#7B61FF] to-[#B14EFF] bg-clip-text text-transparent">
                  Build
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Documentation and GTM systems that shorten activation time, increase self-serve adoption, and reduce support load for engineering-led startups.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
            {deliverables.map((item) => {
              const Icon = item.icon;
              return (
                  <div
                  key={item.id}
                    className="group relative rounded-2xl bg-[#0E1018]/80 backdrop-blur-md border border-[#1E2236] p-6 hover:border-[#00D4FF]/50 transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,212,255,0.3)] hover:shadow-[#00D4FF]/20"
                  >
                    {/* Icon in square */}
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#00D4FF]/20 to-[#7B61FF]/20 border border-[#00D4FF]/30 flex items-center justify-center mb-4 group-hover:border-[#00D4FF]/70 group-hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all duration-300">
                      <Icon className="w-6 h-6 text-[#00D4FF] group-hover:scale-110 transition-transform duration-300" />
                    </div>

                    {/* Metric */}
                    <div className="text-sm font-semibold text-[#00D4FF] mb-2">
                      {item.metric}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-2">
                      {item.title}
                    </h3>

                    {/* Benefit bullet */}
                    <div className="text-sm text-gray-300 mb-3">
                      {item.benefit}
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
              );
            })}
            </div>
          </div>
        </section>
          </div>

      {/* Where We Publish Documentation */}
      <div
        style={{
          background: "radial-gradient(ellipse at 50% 0%, #272b40 0%, transparent 40%)",
        }}
      >
        <div className="w-full h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5 mt-16 mb-1"></div>
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl lg:text-6xl font-bold text-white mb-4">
                Where We{' '}
                <span className="bg-gradient-to-r from-[#00D4FF] via-[#7B61FF] to-[#B14EFF] bg-clip-text text-transparent">
                  Publish Documentation
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                We work across any documentation platform your team prefers — from modern MDX systems like Mintlify to fully custom React/Next.js-powered docs engines.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Mintlify Docs Systems */}
              <div className="group relative rounded-2xl bg-[#0E1018]/80 backdrop-blur-md border border-[#1E2236] p-6 hover:border-[#00D4FF]/50 transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,212,255,0.3)] hover:shadow-[#00D4FF]/20">
                <div className="w-12 h-12 rounded-lg bg-green-500/20 border border-green-500/30 flex items-center justify-center mb-4 group-hover:border-green-500/70 group-hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all duration-300">
                  <span className="text-2xl font-bold text-green-400">M</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Mintlify Docs Systems</h3>
                <ul className="space-y-1.5 text-sm text-gray-400">
                  <li>• MDX components</li>
                  <li>• SDK switchers</li>
                  <li>• Custom navigation</li>
                  <li>• OpenAPI → API reference</li>
                </ul>
              </div>

              {/* GitBook Enterprise Docs */}
              <div className="group relative rounded-2xl bg-[#0E1018]/80 backdrop-blur-md border border-[#00D4FF]/50 p-6 hover:border-[#00D4FF]/70 transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,212,255,0.4)] hover:shadow-[#00D4FF]/30">
                <div className="w-12 h-12 rounded-lg bg-orange-500/20 border border-orange-500/30 flex items-center justify-center mb-4 group-hover:border-orange-500/70 group-hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] transition-all duration-300">
                  <BookOpen className="w-6 h-6 text-orange-400 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">GitBook Enterprise Docs</h3>
                <ul className="space-y-1.5 text-sm text-gray-400">
                  <li>• Versioning</li>
                  <li>• Integration guides</li>
                  <li>• Structured categories</li>
                  <li>• Multi-team workflows</li>
                </ul>
              </div>

              {/* ReadMe / Stoplight */}
              <div className="group relative rounded-2xl bg-[#0E1018]/80 backdrop-blur-md border border-[#1E2236] p-6 hover:border-[#00D4FF]/50 transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,212,255,0.3)] hover:shadow-[#00D4FF]/20">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center group-hover:border-blue-500/70 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-300">
                    <FileText className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-white/10 border border-gray-600/30 flex items-center justify-center group-hover:border-yellow-500/70 transition-all duration-300">
                    <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center">
                      <span className="text-xs font-bold text-gray-900">S</span>
                    </div>
          </div>
        </div>
                <h3 className="text-xl font-bold text-white mb-3">ReadMe / Stoplight (API Docs)</h3>
                <ul className="space-y-1.5 text-sm text-gray-400">
                  <li>• OpenAPI import</li>
                  <li>• Try-it playgrounds</li>
                  <li>• Error code library</li>
                  <li>• SDK examples</li>
                </ul>
              </div>

              {/* Docusaurus / Nextra */}
              <div className="group relative rounded-2xl bg-[#0E1018]/80 backdrop-blur-md border border-[#1E2236] p-6 hover:border-[#00D4FF]/50 transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,212,255,0.3)] hover:shadow-[#00D4FF]/20">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-green-500/20 border border-green-500/30 flex items-center justify-center group-hover:border-green-500/70 transition-all duration-300">
                    <span className="text-2xl">🦖</span>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-white/10 border border-gray-600/30 flex items-center justify-center group-hover:border-gray-400/70 transition-all duration-300">
                    <span className="text-xs font-semibold text-gray-300">Nextra</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Docusaurus / Nextra</h3>
                <ul className="space-y-1.5 text-sm text-gray-400">
                  <li>• Custom React theming</li>
                  <li>• Multi-versioning</li>
                  <li>• Live code blocks</li>
                  <li>• Link-check CI</li>
                </ul>
              </div>

              {/* Custom React/Next.js Doc Engine */}
              <div className="group relative rounded-2xl bg-[#0E1018]/80 backdrop-blur-md border border-[#1E2236] p-6 hover:border-[#00D4FF]/50 transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,212,255,0.3)] hover:shadow-[#00D4FF]/20">
                <div className="w-12 h-12 rounded-lg bg-white/10 border border-gray-600/30 flex items-center justify-center mb-4 group-hover:border-gray-400/70 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-300">
                  <div className="flex items-baseline">
                    <span className="text-xl font-bold text-white">N</span>
                    <span className="text-xs text-gray-400 ml-0.5">js</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Custom React/Next.js Doc Engine</h3>
                <ul className="space-y-1.5 text-sm text-gray-400">
                  <li>• Fully custom docs routing</li>
                  <li>• MDX components</li>
                  <li>• Interactive examples</li>
                  <li>• Search + tagging system</li>
                </ul>
              </div>

              {/* In-App / Embedded Documentation */}
              <div className="group relative rounded-2xl bg-[#0E1018]/80 backdrop-blur-md border border-[#1E2236] p-6 hover:border-[#00D4FF]/50 transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,212,255,0.3)] hover:shadow-[#00D4FF]/20">
                <div className="w-12 h-12 rounded-lg bg-white/10 border border-gray-600/30 flex items-center justify-center mb-4 group-hover:border-gray-400/70 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-300">
                  <Smartphone className="w-6 h-6 text-gray-300 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">In-App / Embedded Documentation</h3>
                <ul className="space-y-1.5 text-sm text-gray-400">
                  <li>• Embedded Quickstarts</li>
                  <li>• UI workflow walkthroughs</li>
                  <li>• Contextual triggers</li>
                  <li>• Shorter activation time</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        </div>

      {/* DocOps Pipeline */}
      <div
        style={{
          background: "radial-gradient(ellipse at 50% 0%, #272b40 0%, transparent 40%)",
        }}
      >
        <div className="w-full h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5 mt-16 mb-1"></div>
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-5xl lg:text-6xl font-bold text-white mb-4">
                <span className="bg-gradient-to-r from-[#00D4FF] via-[#7B61FF] to-[#B14EFF] bg-clip-text text-transparent">
                  DocOps
                </span>{' '}
                Pipeline
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                From discovery to deployment — a proven system for building developer documentation that drives adoption.
              </p>
            </motion.div>

            {/* Horizontal Pipeline Flow */}
            <DocOpsPipelineFlow steps={docOpsPipeline} />
        </div>
      </section>
      </div>

      {/* Metrics */}
      <div
        style={{
          background: "radial-gradient(ellipse at 50% 0%, #272b40 0%, transparent 40%)",
        }}
      >
        <div className="w-full h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5 mt-16 mb-1"></div>
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
            What Happens After Launch
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
              {metrics.map((metric, i) => (
                <div key={i} className="bg-gradient-to-br from-[#00D4FF]/10 via-[#7B61FF]/5 to-[#B14EFF]/10 backdrop-blur-md rounded-2xl border border-[#00D4FF]/30 p-8 text-center hover:shadow-[0_0_40px_rgba(123,97,255,0.2)] transition-all duration-300">
                  <div className="text-5xl font-bold bg-gradient-to-r from-[#00D4FF] to-[#7B61FF] text-transparent bg-clip-text mb-2">{metric.value}</div>
                  <div className="text-lg text-white mb-1">{metric.label}</div>
                  <div className="text-sm text-gray-500">{metric.company}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
        </div>

      {/* Infrasity Studio™ Section */}
      <div
        style={{
          background: "radial-gradient(ellipse at 50% 0%, #272b40 0%, transparent 40%)",
        }}
      >
        <div className="w-full h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5 mt-16 mb-1"></div>
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <InfrasityStudioSection />
          </div>
        </section>
      </div>

      {/* Case Study Section - Using FeaturedResults from developer marketing agency */}
      <div
        style={{
          background: "radial-gradient(ellipse at 50% 0%, #272b40 0%, transparent 40%)",
        }}
      >
        <div className="w-full h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5 mt-10"></div>
        <FeaturedResults />
      </div>

      {/* Shared: Testimonials */}
      <div
        style={{
          background: "radial-gradient(ellipse at 50% 0%, #272b40 0%, transparent 40%)",
        }}
      >
        <div className="w-full h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5 mt-10"></div>
        <Testimonials />
      </div>

      {/* Video Testimonials Section - Using existing component */}
      <div className="mt-16">
        <div className="w-full h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5 mb-12"></div>

        <div
          className="relative p-16 md:p-20"
          style={{
            background: "radial-gradient(ellipse at 50% 0%, #272b40 0%, transparent 60%)"
          }}
        >
          <div className="flex justify-center">
            {Videos && Videos.length > 0 ? (
              <VideoTestimonials className="max-w-6xl" items={Videos} />
            ) : (
              <div className="text-center p-8">
                <div className="text-white text-lg">Video testimonials loading...</div>
                <div className="text-gray-400 text-sm mt-2">Videos: {Videos ? Videos.length : 'undefined'}</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Shared: CTA Banner */}
      <div
        style={{
          background: "radial-gradient(ellipse at 50% 0%, #272b40 0%, transparent 40%)",
        }}
      >
        <div className="w-full h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5 mt-10 mb-12"></div>
        <CTA />
        </div>
      <FAQSection />
    </div>
  );
}
