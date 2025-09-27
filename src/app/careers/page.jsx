import React from 'react';
import CareersHero from './components/CareersHero';
import JobListings from './components/JobListings';
import BenefitsSection from './components/BenefitsSection';

export const metadata = {
  title: 'Careers at Infrasity - Join Our Engineering Team',
  description: 'Join Infrasity and help us build the future of developer marketing. We\'re looking for talented engineers, marketers, and growth professionals to join our mission.',
  keywords: 'careers, jobs, engineering, developer marketing, growth, remote work, startup',
  openGraph: {
    title: 'Careers at Infrasity - Join Our Engineering Team',
    description: 'Join Infrasity and help us build the future of developer marketing. We\'re looking for talented engineers, marketers, and growth professionals to join our mission.',
    type: 'website',
  },
};

export default function CareersPage() {
  return (
    <div className="text-white">
      <CareersHero />
      
      <div
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, #272b40 0%, transparent 40%)",
        }}
      >
        <JobListings />
      </div>
      
      
      <div
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, #272b40 0%, transparent 40%)",
        }}
      >
        <BenefitsSection />
      </div>
    </div>
  );
}
