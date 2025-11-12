import Hero from '@/components/docs-landing/Hero';

export const metadata = {
  title: 'Documentation That Drives Developer Adoption | Infrasity',
  description: 'We build SDK, API, CLI, and integration docs that engineers actually use—written by engineers, optimized for growth.',
};

export default function CreatedByCursorPage() {
  return (
    <main className="bg-slate-950">
      <Hero />
      {/* Additional sections will be added after approval */}
    </main>
  );
}

