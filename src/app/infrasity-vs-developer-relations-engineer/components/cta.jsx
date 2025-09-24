import CalendarBooking from "../../calendarButton";
import Link from "next/link";
import Image from "next/image"

const CtaSection = () => {
  return (
    <>
      <div className="mx-6 mt-16 md:mx-16 bg-gradient-to-r from-blue-800 to-purple-800 relative flex flex-col items-center rounded-xl py-8 text-center overflow-hidden bg-cover bg-no-repeat">
        <h3 className="text-2xl md:text-3xl font-bold mb-3">
          Ready to skip the hiring process?
        </h3>
        <p className="text-xs md:text-lg text-muted-foreground mb-6 max-w-2xl mx-auto ">
          Start getting results in your first week instead of waiting months for
          a DevRel hire to ramp up.
        </p>
        <div className="flex flex-col lg:flex-row gap-4 justify-center">
          {/* <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ring">
              Schedule Strategy Call
            </button> */}
          <CalendarBooking buttonText="Schedule Strategy Call" width="w-52" />
          <Link
            href="/case-studies"
            className="border border-border bg-background hover:bg-muted px-6 py-3 rounded-lg font-semibold transition-transform hover:scale-105 h-12 w-52"
          >
            View Case Studies
          </Link>
        </div>
      </div>
      <div className="flex justify-center">
     {/* <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 1440 420"
  width="100%"
  height="100%"
  preserveAspectRatio="none"
>
  <defs>
    
    <pattern
      id="cell"
      width="240"
      height="240"
      patternUnits="userSpaceOnUse"
    >
      <path
        d="M0 0V240"
        fill="none"
        stroke="rgba(255,255,255,0.5)"
        stroke-width="2"
        stroke-dasharray="10 10"
      />
      <path
        d="M0 0H240"
        fill="none"
        stroke="rgba(255,255,255,0.5)"
        stroke-width="2"
        stroke-dasharray="10 10"
      />
    </pattern>

   
    <pattern
      id="cellAccent"
      width="960"
      height="960"
      patternUnits="userSpaceOnUse"
    >
      <path
        d="M0 0V960"
        fill="none"
        stroke="rgba(255,255,255,0.8)"
        stroke-width="3"
        stroke-dasharray="10 10"
      />
      <path
        d="M0 0H960"
        fill="none"
        stroke="rgba(255,255,255,0.8)"
        stroke-width="3"
        stroke-dasharray="10 10"
      />
    </pattern>

   
    <linearGradient id="topFade" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0%" stop-color="white" stop-opacity="1" />
      <stop offset="65%" stop-color="white" stop-opacity="0.5" />
      <stop offset="100%" stop-color="white" stop-opacity="0.25" />
      <stop offset="100%" stop-color="white" stop-opacity="0" />
    </linearGradient>

    <mask id="fadeMask">
      <rect width="100%" height="100%" fill="url(#topFade)" />
    </mask>

   
    <radialGradient id="spotlight" cx="50%" cy="68%" r="40%">
      <stop offset="0%" stop-color="rgba(255,255,255,0.30)" />
      <stop offset="35%" stop-color="rgba(255,255,255,0.18)" />
      <stop offset="70%" stop-color="rgba(255,255,255,0.08)" />
      <stop offset="100%" stop-color="rgba(255,255,255,0)" />
    </radialGradient>

  
    <filter id="blur8" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="12" />
    </filter>
  </defs>

  <g transform="perspective(600) rotateX(30) skewY(-10)" mask="url(#fadeMask)">
   
    <rect
      x="-200"
      y="-400"
      width="2200"
      height="1600"
      fill="url(#cell)"
    />
    <rect
      x="-200"
      y="-400"
      width="2200"
      height="1600"
      fill="url(#cellAccent)"
    />
  </g>

  
  <ellipse
    cx="720"
    cy="285"
    rx="520"
    ry="220"
    fill="url(#spotlight)"
    filter="url(#blur8)"
  />
</svg> */}
      </div>
    </>
  );
};

export default CtaSection;
