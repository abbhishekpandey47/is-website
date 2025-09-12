import React from 'react';
import Image from 'next/image';

const IntegrationsSection = () => {
  const topRowIntegrations = [
    {
      name: 'Java',
      image: '/integrations/java-spring.png',
      href: '/services/developer-marketing-agency'
    },
    {
      name: '.NET',
      image: '/integrations/dotnet.webp',
      href: '/services/developer-marketing-agency'
    },
    {
      name: 'NodeJS',
      image: '/integrations/node.webp',
      href: '/services/developer-marketing-agency'
    },
    {
      name: 'Laravel',
      image: '/integrations/laravel.webp',
      href: '/services/developer-marketing-agency'
    },
    {
      name: 'Ruby on Rails',
      image: '/integrations/ruby-on-rails.png',
      href: '/services/developer-marketing-agency'
    },
    {
      name: 'Django',
      image: '/integrations/django.webp',
      href: '/services/developer-marketing-agency'
    }
  ];

  const bottomRowIntegrations = [
    {
      name: 'Kong Gateway',
      image: '/integrations/kong.webp',
      href: '/services/developer-marketing-agency'
    },
    {
      name: 'Traefik API Gateway',
      image: '/integrations/traefik.webp',
      href: '/services/developer-marketing-agency'
    },
    {
      name: 'WSO2 API Gateway',
      image: '/integrations/traefik.webp',
      href: '/services/developer-marketing-agency'
    },
    {
      name: 'Cloudflare',
      image: '/integrations/traefik.webp',
      href: '/services/developer-marketing-agency'
    },
    {
      name: 'Strapi',
      image: '/integrations/traefik.webp',
      href: '/services/developer-marketing-agency'
    }
  ];

  const additionalIntegrations = [
    { name: 'GraphQL', image: '/integrations/traefik.webp' },
    { name: 'FastAPI', image: '/integrations/traefik.webp' },
    { name: 'Symfony', image: '/integrations/traefik.webp' }
  ];

  const IntegrationCard = ({ integration, index, isLastColumn = false, isFirstColumn = false, showViewDocs = true, href = null }) => (
    <a
      className={`group flex flex-col items-center relative py-[10px] transition-all duration-300 ease-in-out hover:bg-gradient-to-b hover:from-[#1a1f3a] hover:to-transparent
        ${!isLastColumn ? "after:content-[''] after:absolute after:right-0 after:top-0 after:w-[1px] after:h-full after:bg-gradient-to-b after:from-transparent after:via-[#29304b] after:to-transparent" : ""}
      `}
      href={href || "/integrations"}
    >
      {integration.images ? (
        <div className="flex">
          {integration.images.map((img, imgIndex) => (
            <Image
              key={imgIndex}
              alt={img.name}
              loading="lazy"
              width={32}
              height={32}
              className={`bg-[#0f172a] rounded-full ${imgIndex > 0 ? '-ml-2' : ''}`}
              src={img.image}
            />
          ))}
        </div>
      ) : (
        <Image
          alt={integration.name}
          loading="lazy"
          width={32}
          height={32}
          className="bg-[#0f172a] rounded-full"
          src={integration.image}
        />
      )}
      <p className="font-[quicksand] text-gray-400 transition-colors duration-100 ease-in-out mt-2 mb-4 group-hover:text-white">
        {integration.name}
      </p>
    </a>
  );

  return (
    <div className=" mx-3">
      <h2 className="font-medium text-[32px] lg:text-[38px] text-white text-center font-[quicksand] mb-4">
      Trusted by SaaS teams across DevTools, Infra, and AI
      </h2>
      <p className="font-['Inter'] text-[18px] text-gray-400 max-w-[928px] mx-auto text-center mb-10">
      From MLOps to Cloud Infra, from YC-backed startups to growth-stage SaaS — we’ve built adoption engines that scale.
      </p>

      <div className="relative max-w-[1200px] mx-auto">
        <div className="grid grid-cols-6 border-b border-[#29304b]">
          {topRowIntegrations.map((integration, index) => (
            <IntegrationCard
              key={integration.name}
              integration={integration}
              index={index}
              isLastColumn={index === 5}
              isFirstColumn={index === 0}
              href={integration.href}
            />
          ))}
        </div>

        <div className="grid grid-cols-6">
          {bottomRowIntegrations.map((integration, index) => (
            <IntegrationCard
              key={integration.name}
              integration={integration}
              index={index}
              isLastColumn={index === 4}
              isFirstColumn={index === 0}
              href={integration.href}
            />
          ))}
          
          {/* "+ 4 more" card */}
          <IntegrationCard
            integration={{
              name: '+ 4 more',
              images: additionalIntegrations
            }}
            index={5}
            isLastColumn={true}
            showViewDocs={false}
          />
        </div>
      </div>

      <div className="mt-[60px] flex flex-col items-center gap-4">
        <p className="font-[quicksand] text-gray-400">
          Drowning in product and GTM tasks? Let's take developer marketing off your plate
        </p>
        <a 
          className="px-6 py-3 border border-gray-500 text-white rounded-lg hover:bg-gray-800 transition-colors font-[quicksand]"
          href="/contact"
        >
          Talk to sales
        </a>
      </div>
    </div>
  );
};

export default IntegrationsSection;