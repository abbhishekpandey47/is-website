import React from 'react';

export default function ByClaudeServicePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">By Claude</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Intelligent AI-powered solutions crafted with precision and innovation
          </p>
        </header>

        <section className="grid md:grid-cols-2 gap-8 mb-16">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Core Capabilities</h2>
            <ul className="space-y-4 text-gray-700 dark:text-gray-300">
              <li>
                <strong>Advanced AI Integration</strong>
                Seamless AI-driven solutions across multiple domains
              </li>
              <li>
                <strong>Adaptive Problem Solving</strong>
                Intelligent systems that learn and evolve with your needs
              </li>
              <li>
                <strong>Comprehensive AI Consulting</strong>
                End-to-end support from concept to implementation
              </li>
            </ul>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Our Approach</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Leveraging cutting-edge AI technologies to deliver innovative,
              intelligent solutions that transform how businesses and developers
              approach complex challenges.
            </p>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Reimagine Possibilities?</h2>
          <div className="space-x-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
              Explore Solutions
            </button>
            <button className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white px-6 py-3 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition">
              Contact Us
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export const metadata = {
  title: 'By Claude - AI-Powered Intelligent Solutions',
  description: 'Innovative AI solutions that transform complex challenges into opportunities',
};