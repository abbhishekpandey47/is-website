"use client";
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

const contentItems = [
  { title: "Zapier", icon: icon1 },
  { title: "Make", icon: icon4 },
  { title: "Hubspot", icon: icon9 },
  { title: "Zoho", icon: icon3 },
  { title: "Airtable", icon: icon2 },
  { title: "Google Analytics", icon: icon10 },
  { title: "Google Tag Manager", icon: icon7 },
  { title: "Cookie Consent", icon: icon5 },
  { title: "Weglot", icon: icon6 },
];

export default function ThirdPartyIntegrations() {
  return (
    <section
      className="text-white py-16 px-6"
      style={{
        backgroundSize: "cover",
      }}
    >
      <h2 className="text-center text-4xl font-bold mb-12">
      From lead capture to product analytics — we wire it all up
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
        {contentItems.map(({ title, icon }) => (
          <div
            key={title}
            className="card rounded-2xl p-4 sm:p-6 h-full relative overflow-hidden"
            style={{
              backgroundColor: "#141318",
              backgroundImage: `radial-gradient(circle at top right, #272b40 0%, transparent 80%)`,
              boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.36)",
              border: "2px solid rgba(60, 63, 84, 0.3)",
            }}
          >
            <div className="flex mb-3 flex-col justify-center items-center relative z-10">
              {icon ? (
                <Image
                  src={icon || "/placeholder.svg"}
                  alt={title || "Card Image"}
                  width={100}
                  height={100}
                  className="object-contain"
                />
              ) : (
                <span className="text-lg">🖼️</span>
              )}
              <h3 className="text-2xl font-semibold mt-5 text-center">
                {title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      <style jsx global>{`
        .card {
          position: relative;
          background: linear-gradient(
            140deg,
            transparent 20%,
            rgba(101, 110, 240, 0.3) 50%,
            transparent 75%
          );
          padding: 2rem;
          border-radius: 16px;
          width: 100%;
          color: #fff;
          box-shadow: 10px 10px 40px rgba(97, 105, 252, 0.1);
          overflow: hidden;
          transition: box-shadow 0.4s ease-in-out;
        }

        /* Diagonal line shine effect */
        .card::before {
          content: "";
          position: absolute;
          top: -100%;
          left: -100%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            130deg,
            transparent 45%,
            rgba(86, 76, 226, 0.2) 50%,
            transparent 55%
          );
          transform: translateX(-100%) translateY(-100%);
          opacity: 0;
          pointer-events: none;
          z-index: 0;
          transition: transform 2.4s ease, opacity 1.2s ease;
        }

        .card:hover::before {
          transform: translateX(100%) translateY(100%);
          opacity: 1;
        }

        .card:not(:hover)::before {
          transform: translateX(-100%) translateY(-100%);
          opacity: 0;
        }

        .card:hover {
          box-shadow: 0 0 40px rgba(97, 105, 252, 0.5);
        }
      `}</style>
    </section>
  );
}