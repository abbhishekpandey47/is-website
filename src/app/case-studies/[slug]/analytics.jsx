"use client";
import { useState } from "react";
import React from "react";

export default React.memo(function HeadBanner({ postData }) {
  return (
    <div className="flex items-center justify-center">
      {postData.stats && (
        <div className="w-full p-8 md:p-12 rounded-lg">
          <div className="flex flex-wrap justify-center gap-8">
            {postData.stats.map((stat, index) => (
              <div
                key={index}
                className="w-full sm:w-48 p-6 rounded-lg flex flex-col items-center justify-center text-center"
                style={{
                  backgroundColor: "#141318",
                  backgroundImage: `radial-gradient(circle at top right, #272b40 0%, transparent 80%)`,
                  boxShadow: "0 8px 32px 0 rgba(255, 255, 255, 0.15)",
                  border: "2px solid rgba(60, 63, 84, 0.3)",
                }}
              >
                <p className="text-gray-400 text-sm mb-8">{stat.title}</p>
                <p
                  className={`text-white ${
                    stat.valueClass || "text-2xl font-bold"
                  }`}
                >
                  {stat.value}
                </p>
                {stat.subtext && (
                  <p className="text-gray-400 text-sm mt-8">{stat.subtext}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});
