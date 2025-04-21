// "use client"
// import Image from "next/image"
// import icon1 from "./images/icons/icon1.png"
// import icon2 from "./images/icons/icon2.png"
// import icon3 from "./images/icons/icon3.png"
// import icon4 from "./images/icons/make.png"
// import icon5 from "./images/icons/icon5.png"
// import icon6 from "./images/icons/icon6.png"
// import icon7 from "./images/icons/icon7.png"
// import icon9 from "./images/icons/icon9.png"
// import icon10 from "./images/icons/icon10.png"
// import "./webflow.css"

// const contentItems = [
//   {
//     title: "Zapier",
//     icon: icon1,
//   },
//   {
//     title: "Make",
//     icon: icon4,
//   },
//   {
//     title: "Hubspot",
//     icon: icon9,
//   },
//   {
//     title: "Zoho",
//     icon: icon3,
//   },
//   {
//     title: "Airtable",
//     icon: icon2,
//   },
//   {
//     title: "Google analytics",
//     icon: icon10,
//   },
//   {
//     title: "Google Tag manager",
//     icon: icon7,
//   },
//   {
//     title: "Cookie Consent",
//     icon: icon5,
//   },
//   {
//     title: "Weglot",
//     icon: icon6,
//   },
// ]

// export default function ThirdPartyIntegrations() {
//   return (
//     <section
//       className="text-white py-16 px-6"
//       style={{
//         // background: "linear-gradient(180deg, rgba(30, 20, 40, 0.8) 0%, rgba(20, 10, 30, 0.9) 100%)",
//         backgroundSize: "cover",
//       }}
//     >
//       <h2 className="text-center text-4xl font-bold mb-12">We do third-party integration as well</h2>

//       <div 
//       className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
//         {contentItems.map(({ title, icon }) => (
//           // <div
//           //   key={title}
//             // className="rounded-2xl p-4 sm:p-6 h-full relative overflow-hidden border border-white/5 transition-all duration-500 card-container"
//           //   style={{
//           //     // background: `linear-gradient(135deg, rgba(97, 105, 252, 0.5) 30%, rgba(101, 110, 240, 0.8) 60%, rgba(86, 76, 226, 0.5) 100%)`,
//           //     boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.4)",
//           //     backdropFilter: "blur(4px)",
//           //   }}
//           // >
//           <div
//           className="rounded-2xl p-4 sm:p-6 h-full relative overflow-hidden border border-white/5 transition-all duration-500 card-container"
//           style={{
//             background:
//               "linear-gradient(to right, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
//             boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.36)",
//             border: "2px solid rgba(255, 255, 255, 0.1)",
//             backdropFilter: "blur(10px)",
//           }}
//         >
//           <div className="absolute -bottom-20 -right-40 w-40 h-40 bg-gradient-to-r from-blue-500/10 to-purple-500/100 rounded-full blur-3xl"></div>
//           <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-2xl"></div>

//             {/* Subtle Inner Glow */}
//             <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/5 to-violet-600/5"></div>

//             <div className="flex mb-3 flex-col justify-center items-center relative z-10">
//               {icon ? (
//                 <Image
//                   src={icon || "/placeholder.svg"}
//                   alt={title || "Card Image"}
//                   width={100}
//                   height={100}
//                   className="object-contain"
//                 />
//               ) : (
//                 <span className="text-lg">🖼️</span>
//               )}
//               <h3 className="text-2xl font-semibold mt-5 text-center">{title}</h3>
//             </div>
//           </div>
//         ))}
//       </div>

//       <style jsx global>{`
// @keyframes diagonal-shine-animation {
//   0% {
//     transform: translateX(-100%) translateY(-100%) rotate(45deg);
//   }
//   100% {
//     transform: translateX(100%) translateY(100%) rotate(45deg);
//   }
// }

// .diagonal-shine {
//   background: linear-gradient(
//     45deg,
//     transparent 45%,
//     rgba(255, 255, 255, 0.4) 50%,
//     transparent 55%
//   );
//   transform: translateX(-100%) translateY(-100%) rotate(45deg);
//   animation: diagonal-shine-animation 3s infinite linear;
//   pointer-events: none;
//   opacity: 0.5;
// }

// .card-container {
//   position: relative;
//   isolation: isolate;
// }

// .card-container::before {
//   content: "";
//   position: absolute;
//   inset: 0;
//   border-radius: 1rem;
//   padding: 1.5px;
//   background: linear-gradient(
//     140deg,
//     rgba(160, 120, 220, 0.5) 0%,
//     rgba(200, 160, 255, 0.8) 50%,
//     rgba(160, 120, 220, 0.5) 100%
//   );
//   -webkit-mask: 
//     linear-gradient(#fff 0 0) content-box, 
//     linear-gradient(#fff 0 0);
//   -webkit-mask-composite: xor;
//   mask-composite: exclude;
//   pointer-events: none;
//   opacity: 0.7;
// }`
// }</style>
//     </section>
//   )
// }

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
        We do third-party integration as well
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
        {contentItems.map(({ title, icon }) => (
          <div
            key={title}
            className="card rounded-2xl p-4 sm:p-6 h-full relative overflow-hidden"
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