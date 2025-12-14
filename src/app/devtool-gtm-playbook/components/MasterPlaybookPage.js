"use client";

export default function MasterPlaybookPage() {
  const problems = [
    {
      icon: (
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-none stroke-2">
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#f5deb3', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <circle cx="12" cy="12" r="10" stroke="url(#grad1)"/>
          <path d="M12 16v-4M12 8h.01" stroke="url(#grad1)"/>
        </svg>
      ),
      title: "Docs are ad-hoc",
      description: "Onboarding sucks, developers bounce"
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-none stroke-2">
          <defs>
            <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#f5deb3', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="url(#grad2)"/>
        </svg>
      ),
      title: "Marketing is incoherent",
      description: "Efforts scattered without strategy"
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-none stroke-2">
          <defs>
            <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#f5deb3', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <circle cx="12" cy="12" r="3" stroke="url(#grad3)"/>
          <circle cx="12" cy="12" r="10" stroke="url(#grad3)"/>
        </svg>
      ),
      title: "Distribution is random",
      description: "No systematic channel approach"
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-none stroke-2">
          <defs>
            <linearGradient id="grad4" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#f5deb3', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" stroke="url(#grad4)"/>
        </svg>
      ),
      title: "Traction is elusive",
      description: "Early growth feels impossible"
    }
  ];

  return (
    <div className="min-h-screen relative text-white">
      {/* Background with theme */}
      <div className="absolute inset-0 bg-black">
        <div className="whyinfra absolute inset-0"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl quicksand-bold mb-4">
            Why This <span className="specialtext">Master Playbook</span>?
          </h1>
          <p className="text-[wheat] text-base quicksand-semibold">
            Sound familiar? These are the problems every early-stage dev/SaaS team faces.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="relative bg-[#888]/20 backdrop-blur-sm border border-white/10 ring-1 ring-black/5 rounded-lg p-6 text-center transition-all duration-300 hover:border-white/30 hover:-translate-y-0.5 group"
              style={{
                boxShadow: 'none',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Icon with background circle */}
              <div className="flex justify-center mb-4">
                <div 
                  className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(245, 222, 179, 0.15))',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                >
                  {problem.icon}
                </div>
              </div>
              
              {/* Content */}
              <h3 className="text-sm quicksand-semibold mb-2 text-white">
                {problem.title}
              </h3>
              <p className="text-[wheat] text-xs leading-relaxed quicksand-light">
                {problem.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="max-w-3xl mx-auto bg-[#888]/20 backdrop-blur-sm border border-white/10 ring-1 ring-black/5 rounded-lg p-10 text-center">
          <p className="text-base leading-relaxed text-[wheat] quicksand-semibold">
            This master playbook is built from{' '}
            <span className="text-white quicksand-bold">real-world experience</span> with
            dozens of early-stage DevTools & infrastructure startups — a synthesis of what
            actually works to achieve{' '}
            <span className="text-white quicksand-bold">repeatable growth</span>.
          </p>
        </div>
      </div>
    </div>
  );
}