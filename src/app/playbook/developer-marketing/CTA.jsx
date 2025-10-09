import React from "react";
// import CalendarBooking from "../../calendarButton";

// Temporary placeholder component
const CalendarBooking = () => (
  <button className="group relative overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40">
    <div className="relative flex items-center gap-2">
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <span>Book a Meeting</span>
    </div>
  </button>
);

export default function Cta() {
  return (
    <div className="relative py-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 opacity-50"></div>
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 mb-8">
          <span className="text-emerald-300 text-sm font-medium">🚀 Ready to scale?</span>
        </div>

        {/* Main Heading */}
        <h2 className="text-4xl lg:text-6xl font-bold mb-8 leading-tight">
          <span className="text-white">Ready to Build Your </span>
          <br />
          <span className="bg-gradient-to-r from-violet-400 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
            Developer Growth Engine?
          </span>
        </h2>

        {/* Description */}
        <div className="max-w-4xl mx-auto mb-12">
          <p className="text-xl text-gray-300 leading-relaxed mb-6">
            Get the complete playbook and discover how to turn developer 
            marketing into your competitive advantage.
          </p>
          <p className="text-lg text-gray-400">
            50+ DevTool startups figured it out before you. Don't be the one still struggling with generic marketing.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <button className="group relative overflow-hidden bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            <div className="relative flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <span>Download Free Playbook</span>
            </div>
          </button>

          <CalendarBooking />
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 justify-center">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <div className="text-white font-semibold">Instant Access</div>
              <div className="text-gray-400 text-sm">Download immediately</div>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center">
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <div className="text-white font-semibold">No Fluff</div>
              <div className="text-gray-400 text-sm">Only actionable strategies</div>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center">
            <div className="w-8 h-8 bg-gradient-to-r from-violet-400 to-purple-500 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <div className="text-white font-semibold">Free Forever</div>
              <div className="text-gray-400 text-sm">No credit card required</div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 pt-8 border-t border-slate-700">
          <div className="text-gray-400 text-sm mb-6 uppercase tracking-wider">Engineered Developer Marketing, not guesswork</div>
          <div className="text-gray-300">
            Trusted by AI, DevTools, and B2B SaaS founders from YC and beyond.
          </div>
        </div>
      </div>
    </div>
  );
}
