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
      <h2 className="text-center text-4xl font-bold mb-12">
        We do third-party integration as well
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto ">
        {contentItems.map(({ title, icon }) => (
          <div
            key={title}
            className="rounded-2xl p-4 sm:p-6 h-full relative overflow-hidden group border border-white"
            style={{
              background: `linear-gradient(35deg, rgba(71, 24, 99, 0.2) 10%, rgba(118, 67, 175, 0.5) 50%, rgba(193, 145, 231, 0.2) 100%)`,
              boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.36)",
            }}
          >
            {/* Shiny Border */}
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:animate-shiny-border pointer-events-none"></div>

            <div className="flex mb-3 flex-col justify-center items-center relative z-10">
              {icon ? (
                <Image
                  src={icon.src}
                  alt={title || "Card Image"}
                  width={100} // Adjust width as needed
                  height={100} // Adjust height as needed
                  className="object-contain"
                />
              ) : (
                <span className="text-lg">🖼️</span> // Fallback icon
              )}
              <h3 className="text-2xl font-semibold mt-5">{title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}