import React from "react";
import CTA from "../../../Components/CTA/CTA";

export default function Cta() {
  return (
    <div>
      <CTA 
        title="Ready to Transform Your AI Content?"
        description="Your AI agent startup is changing the game - now let's make sure the world knows how. Infrasity will craft the technical stories and growth strategy to get you there faster."
        buttonText="Book a Call"
      />
      <div className="max-w-[70%] mx-auto">
        <p className="text-[15px] text-gray-300 leading-relaxed font-light text-center mt-4">
          Let's build your developer growth engine together!
        </p>
      </div>
    </div>
  );
}
