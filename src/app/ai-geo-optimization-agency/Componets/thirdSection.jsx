"use client";

import Image from 'next/image';
import { Search, BarChart3, Map, Rocket, LineChart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const heroImage = 'https://framerusercontent.com/images/aootIzwv3wiOmpUg9vnbUWVqA1U.png';

const timelineSteps = [
  {
    title: 'Measure your current LLM traffic',
    description:
      'We benchmark how much traffic you currently receive from AI search tools like ChatGPT, Perplexity, and Claude, and how that traffic converts.',
    icon: Search,
  },
  {
    title: 'Identify your AI visibility gap',
    description:
      'We evaluate your categories and priority keywords to show where you’re visible today and where competitors are winning.',
    icon: BarChart3,
  },
  {
    title: 'Analyze performance by platform & page type',
    description:
      'We reveal which pages perform best on which LLMs and how optimizing those pages will create the biggest lift.',
    icon: Map,
  },
  {
    title: 'Map who’s influencing AI answers',
    description:
      'We identify the sites, sources, and citations that LLMs rely on, showing where your brand is already mentioned—and where it’s missing.',
    icon: Rocket,
  },
  {
    title: 'Deliver a prioritized action plan',
    description:
      'We walk you through the findings in a strategy call and provide a step-by-step roadmap to improve your AI search visibility.',
    icon: LineChart,
  },
];

const TimelineStep = ({
  stepNumber,
  title,
  description,
  icon: Icon,
  isLast = false,
  delay = 0,
}) => {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.25 });

  return (
    <div ref={ref} className="relative flex gap-6 md:gap-10">
      <div className="flex flex-col items-center">
        <div
          className={cn(
            'relative z-10 w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center',
            'border border-primary/30 bg-gradient-to-br from-primary/20 to-secondary/20',
            'opacity-0 scale-75 transition-all duration-700',
            isIntersecting && 'opacity-100 scale-100'
          )}
          style={{ transitionDelay: `${delay}ms` }}
        >
          <div
            className={cn(
              'absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-1000',
              isIntersecting && 'opacity-100 animate-glow-pulse'
            )}
            style={{ transitionDelay: `${delay + 200}ms` }}
          />
          <Icon
            className={cn(
              'w-6 h-6 md:w-7 md:h-7 text-primary transition-all duration-500',
              isIntersecting && 'text-secondary'
            )}
            style={{ transitionDelay: `${delay + 300}ms` }}
          />
          <div
            className={cn(
              'absolute -top-2 -right-2 w-6 h-6 rounded-full',
              'from-primary to-secondary bg-gradient-to-r text-primary-foreground font-bold',
              'flex items-center justify-center text-xs opacity-0 scale-0 transition-all duration-500',
              isIntersecting && 'opacity-100 scale-100'
            )}
            style={{ transitionDelay: `${delay + 400}ms` }}
          >
            {stepNumber}
          </div>
        </div>

        {!isLast && (
          <div className="relative w-px flex-1 min-h-[80px]">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-secondary/20 to-transparent" />
            <div
              className={cn(
                'absolute top-0 left-0 w-full bg-gradient-to-b from-primary to-secondary',
                'origin-top scale-y-0 transition-transform duration-1000 ease-out',
                isIntersecting && 'scale-y-100'
              )}
              style={{ height: '100%', transitionDelay: `${delay + 500}ms` }}
            />
            <div
              className={cn(
                'absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full',
                'bg-secondary shadow-[0_0_10px_hsl(var(--secondary))]',
                'opacity-0 transition-opacity duration-300',
                isIntersecting && 'opacity-100 animate-flow-down'
              )}
              style={{ transitionDelay: `${delay + 800}ms` }}
            />
          </div>
        )}
      </div>

      <div
        className={cn(
          'flex-1 pb-12 opacity-0 translate-x-8 transition-all duration-700',
          isIntersecting && 'opacity-100 translate-x-0'
        )}
        style={{ transitionDelay: `${delay + 200}ms` }}
      >
        <div className="group relative p-6 md:p-8 rounded-2xl bg-card/50 backdrop-blur-xl border border-card-border/50 hover:border-primary/30 transition-all duration-500 hover:bg-card/70">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10">
            <h3 className="font-heading text-xl md:text-2xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
              {title}
            </h3>
            <p className="font-body text-muted-foreground leading-relaxed text-sm md:text-base">
              {description}
            </p>
          </div>
          <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-2xl">
            <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rotate-45" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ThirdSection() {
  const { ref: ctaRef, isIntersecting: ctaVisible } = useIntersectionObserver({ threshold: 0.5 });
  const { ref: heroRef, isIntersecting: heroVisible } = useIntersectionObserver({ threshold: 0.4 });

  return (
    <section className="relative w-full py-24 px-4 overflow-hidden bg-transparent">
      <div className="absolute inset-0 z-0 pointer-events-none flex justify-center items-center">
        <div
          className="rounded-full blur-[150px]"
          style={{
            background: 'linear-gradient(135deg, rgba(195,15,255,0.45), rgba(39,249,255,0.4))',
            width: '60vw',
            height: '45vh',
            opacity: 0.6,
            maxWidth: 1200,
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center mb-20 text-center">
        <div className="inline-flex items-center justify-center px-6 py-2 mb-4 rounded-full border border-violet-400/40 bg-black/10 shadow-inner shadow-violet-500/20">
          <p className="text-violet-100 text-base font-medium">Activate the fastest growing marketing channel</p>
        </div>
        <h2
          ref={heroRef}
          className={cn(
            'text-4xl md:text-5xl font-bold leading-tight mb-6',
            'bg-gradient-to-r from-white/90 to-white/60 bg-clip-text text-transparent',
            'opacity-0 translate-y-6 transition-all duration-700',
            heroVisible && 'opacity-100 translate-y-0'
          )}
        >
          Turn AI Search into Brand Growth
        </h2>
        <div className="relative w-full flex justify-center mb-6">
          <Image
            src={heroImage}
            alt="AI Search Growth"
            width={420}
            height={260}
            className="w-full absolute object-contain rounded-xl"
            priority
          />
        </div>
        <p className="text-white/80 text-lg max-w-2xl mx-auto" style={{ textAlign: 'center' }}>
          60% of adults are researching products and services on ChatGPT, Google AI Overviews, Perplexity, and Amazon RUFUS, making these key new marketing channels. Monitor how your brand appears, uncover consumer trends, and generate optimized content to lead the AI conversation via our end-to-end workflow.
        </p>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto grid gap-16">
        {timelineSteps.map((step, index) => (
          <TimelineStep
            key={step.title}
            stepNumber={index + 1}
            title={step.title}
            description={step.description}
            icon={step.icon}
            isLast={index === timelineSteps.length - 1}
            delay={index * 140}
          />
        ))}
      </div>
    </section>
  );
}
