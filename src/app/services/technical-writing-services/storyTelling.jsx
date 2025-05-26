import React from "react";
import CalendarBooking from "../../calendarButton";

const StorytellingSection = () => {
  return (
    <section className="w-full py-20 px-6 md:px-10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex justify-center max-md:flex-col sm:flex-col lg:flex-row items-center">
        {/* Left side content */}
        <div className="lg:w-1/2 mb-12 lg:mb-0">
          <span className="text-[#5F64FF] text-xl quicksand-medium mb-4 block">
            BUILT FOR SPEED. WRITTEN FOR ENGINEERS.
          </span>

          <h2 className="text-5xl md:text-6xl quicksand-bold text-white mb-6 leading-tight">
            We turn your features into content.
            <br />
            that clicks,convert <br />
            and gets used
          </h2>

          <p className="text-white quicksand-medium text-xl max-w-lg mb-10">
            No onboarding lag. No extra hires. Just shipping, faster.
          </p>
          <div className="flex justify-center md:justify-center lg:justify-start">
            <CalendarBooking buttonText="Get Started" />
          </div>
        </div>

        {/* Right side image */}
        <div className="lg:w-1/2 w-full flex justify-center lg:justify-end">
          <img
            src="/blog_as_service/storySecImg.svg"
            alt="Marketing illustration with megaphone and mobile"
            className="w-full max-w-lg h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default StorytellingSection;
