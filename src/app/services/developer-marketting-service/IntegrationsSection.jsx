import React from 'react';
import Image from 'next/image';

const IntegrationsSection = () => {
  const topRowIntegrations = [
    {
      name: 'Java',
      image: '/integrations/java-spring.png',
      href: 'https://docs.treblle.com/integrations/java/spring/'
    },
    {
      name: '.NET',
      image: '/integrations/dotnet.webp',
      href: 'https://docs.treblle.com/integrations/net/net/'
    },
    {
      name: 'NodeJS',
      image: '/integrations/node.webp',
      href: 'https://docs.treblle.com/integrations/javascript/node/'
    },
    {
      name: 'Laravel',
      image: '/integrations/laravel.webp',
      href: 'https://docs.treblle.com/integrations/php/laravel/'
    },
    {
      name: 'Ruby on Rails',
      image: '/integrations/ruby-on-rails.png',
      href: 'https://docs.treblle.com/integrations/ruby/rails/'
    },
    {
      name: 'Django',
      image: '/integrations/django.webp',
      href: 'https://docs.treblle.com/integrations/python/django/'
    }
  ];

  const bottomRowIntegrations = [
    {
      name: 'Kong Gateway',
      image: '/integrations/kong.webp',
      href: 'https://docs.treblle.com/integrations/kong/'
    },
    {
      name: 'Traefik API Gateway',
      image: '/integrations/traefik.webp',
      href: 'https://docs.treblle.com/integrations/traefik/'
    },
    {
      name: 'WSO2 API Gateway',
      image: '/integrations/traefik.webp',
      href: 'https://docs.treblle.com/integrations/wso2/'
    },
    {
      name: 'Cloudflare',
      image: '/integrations/traefik.webp',
      href: 'https://docs.treblle.com/integrations/cloudflare/'
    },
    {
      name: 'Strapi',
      image: '/integrations/traefik.webp',
      href: 'https://docs.treblle.com/integrations/strapi/'
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
      <span className="block text-gray-500 transition-opacity duration-200 ease-in-out opacity-0 group-hover:opacity-100">
        {showViewDocs ? 'View Docs' : 'View All'}
        <svg width="15" height="15" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg" className="inline ml-1">
          <path d="M1.595 7.673c0 .352.285.636.637.636l9.434.015-2.734 2.728a.634.634 0 0 0 .45 1.085.636.636 0 0 0 .45-.186l3.822-3.814a.634.634 0 0 0 0-.898L9.833 3.425a.637.637 0 0 0-.9.899l2.733 2.728-9.434-.014a.636.636 0 0 0-.637.635z" fill="currentColor" fillRule="nonzero"></path>
        </svg>
      </span>
    </a>
  );

  return (
    <div className=" mx-3">
      <h2 className="font-medium text-[32px] lg:text-[38px] text-white text-center font-[quicksand] mb-4">
        Integrate with any Framework or Gateway
      </h2>
      <p className="font-['Inter'] text-[18px] text-gray-400 max-w-[928px] mx-auto text-center mb-10">
        Our open-source SDKs let you seamlessly add Treblle to your APIs. We support 20+ platforms and API gateways, including Javascript, PHP, Azure, Mulesoft, Laravel, .Net, Cloudflare, Python, etc.
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
          Need a private cloud or on-prem solution?
        </p>
        <a 
          className="px-6 py-3 border border-gray-500 text-white rounded-lg hover:bg-gray-800 transition-colors font-[quicksand]"
          href="/book-a-demo"
        >
          Talk to sales
        </a>
      </div>
    </div>
  );
};

export default IntegrationsSection;