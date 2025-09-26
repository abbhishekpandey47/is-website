"use client";

import React from "react";

const Comparison = () => {
  return (
    <section>
      <div className="font-[quicksand] mx-auto pb-24 max-w-[977px]">
              <div className="w-[50%] text-left">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
            Why choose Better <br /> Stack vs. PagerDuty
          </h2>
          
        </div>
        <div className="mt-6 sm:mt-10 lg:mt-0 flex flex-col sm:flex-row font-bold text-neutral-60">
          <div className="sm:grow self-center sm:self-end text-[#8b93af] font-semibold sm:font-normal sm:border-b sm:border-neutral-600 py-[18px]">
            Key features
          </div>
          <div className="flex grow sm:grow-0 border-t border-b border-neutral-400 sm:border-t-0 sm:border-neutral-700 py-[18px]">
            <div className="flex-1 sm:w-32 md:w-56 flex flex-col items-center">
              <img
                width="40"
                height="40"
                alt="Pagerduty"
                className="hidden sm:block"
                src="https://betterstackcdn.com/assets/uptime/alternative-to/pagerduty-835cc3f7d6db57f50ac8c424f335fb490a0a784196bf1e92a60bfb641e351e50.svg"
              />
              <div className="sm:mt-4">Pagerduty</div>
            </div>
            <div className="flex-1 sm:w-32 md:w-56 flex flex-col items-center">
              <img
                width="40"
                height="40"
                alt="Better Stack"
                className="hidden sm:block"
                src="https://betterstackcdn.com/assets/uptime/alternative-to/better-stack-2d60d7f23f72f9898afd422a872e4f9fd15df642b08e81e40d2c3b89d03eaf2b.svg"
              />
              <div className="sm:mt-4">Better Stack</div>
            </div>
          </div>
        </div>

        <div>
          {[
            "Schedule on-call rotations from your calendar app",
            "Embed system status notice into your app",
            "Heartbeat (CRON) monitoring",
            "Built-in website & ping monitoring",
            "Built-in status page",
            "Helpful alerts",
            "Beautiful dashboard",
            "Phone call alerts",
            "Reliability",
            "Designed for teams and enterprises",
          ].map((feature, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row border-t border-neutral-700 py-[18px]"
            >
              <div className="sm:grow self-center text-[#8b93af]  text-center sm:text-left">
                {feature}
              </div>

              <div className="mt-4 sm:mt-0 flex text-center grow sm:grow-0">
                <div className="flex-1 sm:w-32 md:w-56 flex justify-center">
                  {feature === "Phone call alerts" ||
                  feature === "Reliability" ||
                  feature === "Designed for teams and enterprises" ? (
                    <img
                      width="24"
                      height="24"
                      alt="provided"
                      src="https://betterstackcdn.com/assets/uptime/alternative-to/check-circle-d7c465b9e75c81bf60f39c9fb43e231ceb2b1d8aa869ca03dda3fd65fcb1e26d.svg"
                    />
                  ) : (
                    <span className="text-neutral-700">—</span>
                  )}
                </div>

                <div className="flex-1 sm:w-32 md:w-56 flex justify-center items-center">
                  {feature === "Phone call alerts" ? (
                    <span className="text-[#8b93af]">Unlimited</span>
                  ) : (
                    <img
                      width="24"
                      height="24"
                      alt="provided"
                      src="https://betterstackcdn.com/assets/uptime/alternative-to/check-circle-d7c465b9e75c81bf60f39c9fb43e231ceb2b1d8aa869ca03dda3fd65fcb1e26d.svg"
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Comparison;
