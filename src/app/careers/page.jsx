import React from 'react';
import CareersHero from './components/CareersHero';
import JobListings from './components/JobListings';
import CompanyCulture from './components/CompanyCulture';

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
      
      <div>
        <CompanyCulture />
      </div>

    </div>
  );
}
