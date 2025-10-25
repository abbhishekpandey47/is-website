"use client";
import React from "react";

export default React.memo(function HeadBanner({ postData }) {
  return (
    <>
      {postData.stats && (
        <div className="w-full pt-16 rounded-lg">
          <div className="flex flex-nowrap justify-center gap-4 overflow-x-auto">
            {postData.stats.map((stat, index) => (
              <div
                key={index}
                className="w-48 min-w-[192px] p-6 rounded-lg flex flex-col items-center justify-center text-center hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer"
                style={{
                  backgroundColor: "#141318",
                  backgroundImage: `radial-gradient(circle at top right, #272b40 0%, transparent 80%)`,
                  boxShadow: "0 8px 32px 0 rgba(255, 255, 255, 0.15)",
                  border: "2px solid rgba(60, 63, 84, 0.3)",
                }}
              >
                <p className="text-gray-400 text-sm mb-4 lg:mb-8 max-sm:mb-2">
                  {stat.title}
                </p>
                <p
                  className={`text-white ${
                    stat.valueClass || "text-2xl font-bold"
                  } max-sm:text-lg`}
                >
                  {stat.value}
                </p>
                {stat.subtext && (
                  <p className="text-gray-400 text-sm mt-4 lg:mt-8 max-sm:mt-2 max-sm:text-xs">
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
