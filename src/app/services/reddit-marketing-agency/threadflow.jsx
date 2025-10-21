import React, { useState } from "react";

export default function Threadflow() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex justify-center items-center py-20 mx-8 bg-[#000000]">
      <div
        className="md:flex md:justify-between max-w-6xl w-full overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-blue-800 rounded-2xl p-6 shadow-2xl border border-purple-700/50"
        style={{
          background:
            "linear-gradient(to right, #0e1329 0%, #0e1329 50%, #353586 100%)",
          border: "2px solid #393a52",
          transition: "all 0.3s ease",
        }}
      >
        {/* Left: Content */}
        <div className="flex-1 p-10 flex flex-col justify-center">
          <h2 className="font-[quicksand] text-3xl md:text-4xl font-bold text-white mb-40 leading-tight">
            Threadflow
          </h2>
          <ul className="space-y-3 text-[#4a4d66] text-base ">
            <li className="border-b border-gray-200 pb-3">
              <button
                onClick={() => toggleItem(0)}
                className="flex items-center justify-between gap-2 w-full text-left hover:text-gray-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12M8 12h12M8 17h12M3 7h.01M3 12h.01M3 17h.01" />
                  </svg>
                  <span className="font-medium">
                    Advanced bidirectional operations
                  </span>
                </div>
                <svg
                  className={`w-5 h-5 text-gray-400 transition-transform ${openIndex === 0 ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === 0 && (
                <div className="mt-3 pl-8 text-gray-600">
                  Content for Advanced bidirectional operations goes here.
                </div>
              )}
            </li>
            <li className="border-b border-gray-200 pb-3">
              <button
                onClick={() => toggleItem(1)}
                className="flex items-center justify-between gap-2 w-full text-left hover:text-gray-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <span className="font-medium ">
                    AI-assisted extensibility{" "}
                    <span className="text-[#7c82a1]">(Magic Mapping - AI)</span>
                  </span>
                </div>
                <svg
                  className={`w-5 h-5 text-gray-400 transition-transform ${openIndex === 1 ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === 1 && (
                <div className="mt-3 pl-8 text-gray-600">
                  Content for AI-assisted extensibility goes here.
                </div>
              )}
            </li>
            <li className="pb-3">
              <button
                onClick={() => toggleItem(2)}
                className="flex items-center justify-between gap-2 w-full text-left hover:text-gray-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="font-medium">
                    SLA-guaranteed integrations and coverage
                  </span>
                </div>
                <svg
                  className={`w-5 h-5 text-gray-400 transition-transform ${openIndex === 2 ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === 2 && (
                <div className="mt-3 pl-8 text-gray-600">
                  Content for SLA-guaranteed integrations goes here.
                </div>
              )}
            </li>
          </ul>
        </div>
        {/* Right: Illustration */}
        <div className="flex flex-1 items-center justify-center">
          <img
            src="https://assets.stackone.com/illustrations/api-card.png"
            alt="API Illustration"
            className="w-[90%] max-w-xs rounded-xl shadow-lg border border-[#e5e7eb]"
            style={{ objectFit: "cover" }}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        </div>
      </div>
    </div>
  );
}
