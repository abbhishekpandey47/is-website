import React from "react";

import { FaClipboardList, FaTerminal, FaCogs, FaBook, FaCheckSquare, FaLayerGroup } from "react-icons/fa";

const contentItems = [
  {
    title: "How-to guides",
    icon: <FaClipboardList className="text-xl" />,
    description:
      "Actionable, step-by-step guides for developers to complete specific tasks—from configuring cloud infrastructure to integrating tools into their tech stack.",
  },
  {
    title: "CLI Docs",
    icon: <FaTerminal className="text-xl" />,
    description:
      "Clear, task-oriented documentation for CLI tools—covering installation, authentication, configuration, and infrastructure deployment from the terminal",
  },
  {
    title: "Product & Feature Docs",
    icon: <FaCogs className="text-xl" />,
    description:
      "In-depth documentation that guides users through the implementation, configuration, and optimization of specific product features, including cloud integrations, CLI usage, networking, and more.",
  },
  {
    title: "API reference documentation",
    icon: <FaBook className="text-xl" />,
    description:
      "REST API and SDK documentation with language-specific examples in Python, Go, and TypeScript—built to help developers authenticate, trigger actions, and query data with ease.",
  },
  {
    title: "Release Notes",
    icon: <FaCheckSquare className="text-xl" />,
    description:
      "Clear and structured product updates that highlight new features, improvements, and fixes—crafted to help users stay informed and enable smoother upgrades, demos, and usage.",
  },
  {
    title: "Demo Accelerators",
    icon: <FaLayerGroup className="text-xl" />,
    description:
      "Pre-built templates and GitHub repos designed to showcase real-world solutions during sales demos, speed up proof-of-concepts, and support developer onboarding.",
  },
];

export default function ThirdPartyIntegrations() {
  return (
    <section className=" text-white py-16 px-6">
      <h2 className="text-center text-4xl font-bold mb-12">We do third-party integration as well</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl py-11 p-10 mx-auto ">
        {contentItems.map(({ title, icon, description }) => (
          <div
            key={title}
            className="bg-gradient-to-br from-[#231442] to-[#331a63] border border-white rounded-xl p-6 shadow-md hover:shadow-xl transition duration-300"
          >
            <div className="flex items-start space-x-3 mb-3">
              <div className="text-purple-300">{icon}</div>
              <h3 className="text-lg font-semibold">{title}</h3>
            </div>
            <p className="text-sm text-purple-100">{description}</p>
          </div>
        ))}
      </div>

    </section>
  );
}
