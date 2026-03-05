import React from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const ContactPopupButton = dynamic(
  () => import('../../lp/reddit-marketing-agency/ContactPopupButton'),
  {
    ssr: false,
    loading: () => (
      <div className="h-11 w-40 rounded-lg bg-gray-700 animate-pulse" />
    ),
  }
);

const IntegrationsSection = ({ isAdsVariant = false }) => {
  const topRowIntegrations = [
    {
      name: 'GitHub',
      image: '/integrations/github.png',
      href: '/services/developer-marketing-agency'
    },
    {
      name: 'GitLab',
      image: '/integrations/gitlab.png',
      href: '/services/developer-marketing-agency'
    },
    {
      name: 'Slack',
      image: '/integrations/slack.jpg',
      href: '/services/developer-marketing-agency'
    },
    {
      name: 'VS Code',
      image: '/integrations/vscode.png',
      href: '/services/developer-marketing-agency'
    },
    {
      name: 'Infra & Cloud',
      image: '/integrations/infracloud.png',
      href: '/services/developer-marketing-agency'
    },
    {
      name: 'Kubernetes',
      image: '/integrations/kubernetes.png',
      href: '/services/developer-marketing-agency'
    }
  ];

  const bottomRowIntegrations = [
    {
      name: 'Docker',
      image: '/integrations/docker.avif',
      href: '/services/developer-marketing-agency'
    },
    {
      name: 'AWS',
      image: '/integrations/aws.png',
      href: '/services/developer-marketing-agency'
    },
    {
      name: 'GCP',
      image: '/integrations/gcp.png',
      href: '/services/developer-marketing-agency'
    },
    {
      name: 'AI & Data',
      image: '/integrations/aidata.jpeg',
      href: '/services/developer-marketing-agency'
    },
    {
      name: 'OpenAI',
      image: '/integrations/openai.png',
      href: '/services/developer-marketing-agency'
    }
  ];

  const additionalIntegrations = [
    { name: 'LangChain', image: '/integrations/langchain.png' },
    { name: 'Hugging Face', image: '/integrations/huggingface.png' },
    { name: 'Weights & Biases', image: '/integrations/weightsbiases.png' }
  ];

  const IntegrationCard = ({ integration, index, isLastColumn = false, isFirstColumn = false, showViewDocs = true, href = null }) => (
    <a
      className={`group flex flex-col items-center relative py-[10px] transition-all duration-300 ease-in-out hover:bg-gradient-to-b hover:from-[#1a1f3a] hover:to-transparent
        ${!isLastColumn ? "after:content-[''] after:absolute after:right-0 after:top-0 after:w-[1px] after:h-full after:bg-gradient-to-b after:from-transparent after:via-[#29304b] after:to-transparent" : ""}
      `}
      href={href || "/integrations"}
    >
      {integration.images ? (
        <div className="flex bg-[#0f172a]">
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
  className={`rounded-full ${
    integration.name === "GitHub" ? "bg-white" : "bg-[#0f172a]"
  }`}
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
        {isAdsVariant ? (
          <ContactPopupButton
            buttonText="Talk to a devrel"
            width="w-44"
            height="h-11"
            textSize="text-base"
            textWeight="quicksand-semibold"
          />
        ) : (
          <a
            className="px-6 py-3 border border-gray-500 text-white rounded-lg hover:bg-gray-800 transition-colors font-[quicksand]"
            href="/contact"
          >
            Talk to a devrel
          </a>
        )}
      </div>
    </div>
  );
};

export default IntegrationsSection;