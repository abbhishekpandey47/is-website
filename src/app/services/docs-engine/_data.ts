import { ArrowRight, Zap, Code, Terminal, GitBranch, Users, Search, CheckCircle2, TrendingUp, Clock, MessageSquare, Settings, ArrowUp } from 'lucide-react';
import type { ComponentType } from 'react';

export interface Company {
  name: string;
  initial: string;
}

export interface CaseStudy {
  name: string;
  url: string;
  description: string;
  mediaLabel: string;
  loomId?: string;
}

export interface Card {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

export interface Deliverable extends Card {
  id: string;
  metric: string;
  benefit: string;
}

export interface ProcessStep extends Card {
  number: string;
  file: string;
}

export interface Metric {
  icon: ComponentType<{ className?: string }>;
  value: string;
  label: string;
  company: string;
}

export const trustedCompanies: Company[] = [
  { name: 'Kubiya', initial: 'K' },
  { name: 'DevZero', initial: 'DZ' },
  { name: 'Firefly', initial: 'F' },
  { name: 'Tracetest', initial: 'T' },
];

export const caseStudies: CaseStudy[] = [
  {
    name: 'Amnic',
    url: 'https://docs.amnic.com',
    description: 'AI-powered platform documentation — structured and written by Infrasity.',
    mediaLabel: 'Amnic docs preview',
    loomId: 'af4d20e3a62b41dcae9afb0c06d9466f',
  },
  {
    name: 'DevZero',
    url: 'https://www.devzero.io/docs',
    description: 'Developer cloud platform with fast-onboarding documentation crafted for engineers.',
    mediaLabel: 'DevZero onboarding docs preview',
    loomId: '1f571827c2fd4bdfac1962bf562d0184',
  },
  {
    name: 'Kubiya',
    url: 'https://docs.kubiya.ai',
    description: 'Automating DevOps with AI agents — structured and written by Infrasity.',
    mediaLabel: 'Kubiya docs preview',
    loomId: 'b098784944f843d8b76e979e194f966f',
  },
  {
    name: 'StackGen',
    url: 'https://stackgen.example.com/docs',
    description: 'GenAI-powered infrastructure automation — explained for builders.',
    mediaLabel: 'StackGen integration docs preview',
    loomId: '97d1ab6b2aac49e09208a6c3deadfb9a',
  },
];

export const differenceCards: Card[] = [
  {
    icon: Users,
    title: 'Engineer-First Approach',
    description: 'We test your product before we write a single line of doc.',
  },
  {
    icon: TrendingUp,
    title: 'Growth-Driven Structure',
    description: 'Docs optimized for both SEO and developer intent.',
  },
  {
    icon: Code,
    title: 'Real-World Examples',
    description: 'Every doc includes working code, commands, and context.',
  },
];

export const deliverables: Deliverable[] = [
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

export const process: ProcessStep[] = [
  {
    number: '01',
    icon: Search,
    file: 'discovery.yaml',
    title: 'Understand your product',
    description: 'We dive deep into your codebase and test your product hands-on',
  },
  {
    number: '02',
    icon: GitBranch,
    file: 'toc.json',
    title: 'Structure content flow',
    description: 'Build an information architecture that matches developer intent',
  },
  {
    number: '03',
    icon: Code,
    file: 'drafts.md',
    title: 'Write + review',
    description: 'Create docs with real code examples and your team\'s feedback',
  },
  {
    number: '04',
    icon: CheckCircle2,
    file: 'deploy.sh',
    title: 'Publish + measure',
    description: 'Launch your docs and track adoption metrics that matter',
  },
];

export const metrics: Metric[] = [
  {
    icon: Clock,
    value: '+48%',
    label: 'time-on-page',
    company: '(Kubiya)',
  },
  {
    icon: CheckCircle2,
    value: '+30%',
    label: 'onboarding completions',
    company: '(DevZero)',
  },
  {
    icon: MessageSquare,
    value: '-35%',
    label: 'support tickets',
    company: '(Tracetest)',
  },
];

export const edgeFeatures: Card[] = [
  {
    icon: Users,
    title: 'Engineer-Led Research',
    description: 'We test your product and understand your codebase before writing a single line',
  },
  {
    icon: Search,
    title: 'SEO + Growth Optimization',
    description: 'Docs structured for both search engines and developer success',
  },
  {
    icon: Code,
    title: 'Code-First Examples',
    description: 'Every guide includes working code examples, tested end-to-end',
  },
];

