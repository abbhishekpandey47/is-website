"use client";
import React from "react";

export default React.memo(function HeadBanner({ postData }) {
  return (
    <>
      {postData.stats && (
        <div className="w-full pt-12 pr-4 lg:ml-16 rounded-lg">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {postData.stats.map((stat, index) => (
              <div
                key={index}
                className="w-[170px] sm:w-60 p-6 rounded-lg flex flex-col items-center justify-center text-center"
                style={{
                  backgroundColor: "#141318",
                  backgroundImage: `radial-gradient(circle at top right, #272b40 0%, transparent 80%)`,
                  boxShadow: "0 8px 32px 0 rgba(255, 255, 255, 0.15)",
                  border: "2px solid rgba(60, 63, 84, 0.3)",
                }}
              >
                <p className="text-gray-400 text-sm mb-4 lg:mb-8">
                  {stat.title}
                </p>
                <p
                  className={`text-white ${
                    stat.valueClass || "text-2xl font-bold"
                  }`}
                >
                  {stat.value}
                </p>
                {stat.subtext && (
                  <p className="text-gray-400 text-sm mt-4 lg:mt-8">
                    {stat.subtext}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
});
