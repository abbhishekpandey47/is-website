import React from 'react';

export default function CursorEditServicePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Cursor Edit</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Revolutionize your editing experience with precise, intelligent cursor manipulation
          </p>
        </header>

        <section className="grid md:grid-cols-2 gap-8 mb-16">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
            <ul className="space-y-4 text-gray-700 dark:text-gray-300">
              <li>
                <strong>Intelligent Cursor Positioning</strong>
                Automatically optimize cursor placement for maximum editing efficiency
              </li>
              <li>
                <strong>Multi-Cursor Support</strong>
                Edit multiple lines simultaneously with advanced multi-cursor capabilities
              </li>
              <li>
                <strong>Context-Aware Movement</strong>
                Smart cursor navigation that understands your code structure
              </li>
            </ul>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">How It Works</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Our cursor edit service uses advanced AI and machine learning
              to provide an unparalleled editing experience across various
              programming environments and text editors.
            </p>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Enhance Your Editing?</h2>
          <div className="space-x-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
              Get Started
            </button>
            <button className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white px-6 py-3 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition">
              Learn More
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export const metadata = {
  title: 'Cursor Edit - Intelligent Editing Service',
  description: 'Revolutionize your editing experience with precise, intelligent cursor manipulation',
};