import React from "react";
import Image from "next/image";
import icon1 from "./images/icons/icon1.png";
import icon2 from "./images/icons/icon2.png";
import icon3 from "./images/icons/icon3.png";
import icon4 from "./images/icons/make.png";
import icon5 from "./images/icons/icon5.png";
import icon6 from "./images/icons/icon6.png";
import icon7 from "./images/icons/icon7.png";
import icon9 from "./images/icons/icon9.png";
import icon10 from "./images/icons/icon10.png";
import "./webflow.css"

const contentItems = [
  {
    title: "Zapier",
    icon: icon1,
  },
  {
    title: "Make",
    icon: icon4,
  },
  {
    title: "Hubspot",
    icon: icon9,
  },
  {
    title: "Zoho",
    icon: icon3,
  },
  {
    title: "Airtable",
    icon: icon2,
  },
  {
    title: "Google analytics",
    icon: icon10,
  },
  {
    title: "Google Tag manager",
    icon: icon7,
  },
  {
    title: "Cookie Consent",
    icon: icon5,
    
  },
  {
    title: "Weglot",
    icon: icon6,
  },
];


export default function ThirdPartyIntegrations() {
  return (
    <section className="text-white py-16 px-6">
      <h2 className="text-center text-4xl font-bold mb-12">We do third-party integration as well</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
        {contentItems.map(({ title, icon }) => (
          <div
            key={title}
            className="rounded-2xl p-4 sm:p-6 h-full relative overflow-hidden group border border-white/10 transition-all duration-500"
            style={{
              background: `linear-gradient(35deg, rgba(71, 24, 99, 0.2) 10%, rgba(118, 67, 175, 0.5) 50%, rgba(193, 145, 231, 0.2) 100%)`,
              boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.36)",
            }}
          >
            {/* Diagonal Shiny Line Effect */}
            <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 duration-0">
              <div className="absolute -inset-[250%] w-[400%] h-[400%] diagonal-shine"></div>
            </div>

            {/* Border Effect */}
            <div className="absolute inset-0 rounded-2xl opacity-0 ">
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent overflow-hidden">
                <div className="absolute inset-[-2px] bg-gradient-to-r from-purple-300 via-violet-500 to-fuchsia-300 animate-border-flow rounded-2xl"></div>
              </div>
            </div>

            {/* Hover Gradient Overlay */}
            {/* <div className="absolute inset-0 bg-gradient-to-br from-purple-900/0 to-violet-600/0 group-hover:from-purple-900/10 group-hover:to-violet-600/20 transition-all duration-500 rounded-2xl"></div> */}

            <div className="flex mb-3 flex-col justify-center items-center relative z-10">
              {icon ? (
                <Image
                  src={icon.src || "/placeholder.svg"}
                  alt={title || "Card Image"}
                  width={100}
                  height={100}
                  className="object-contain"
                />
              ) : (
                <span className="text-lg">🖼️</span>
              )}
              <h3 className="text-2xl font-semibold mt-5">{title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
