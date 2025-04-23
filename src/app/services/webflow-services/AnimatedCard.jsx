import { motion } from "framer-motion";
import Image from "next/image";
import Acc from "./images/jpg2png/acc.jpg";
import dev from "./images/jpg2png/devzero.jpg";
import kubiya from "./images/jpg2png/kubiya.jpg";
import knidal from "./images/jpg2png/knidal.jpg";
import CalendlyButton from "../service-video-production/calendlyButton";

const projects = [
  { title: "Kubiya", badges: ["Webflow", "Figma"], image: kubiya },
  { title: "Acceldata", badges: ["Figma", "Webflow"], image: Acc },
  { title: "devzero", badges: ["Webflow", "Figma"], image: dev },
  { title: "Knidal", badges: ["Figma", "Webflow"], image: knidal },
];

// export default function AnimatedCard() {
//   const duplicatedProjects = [...projects, ...projects];

//   return (
//     <div className="w-full py-8 md:py-16">
//       <div className="container mx-auto px-4 mb-4">
//         <h2 className="text-2xl md:text-4xl font-bold text-center text-white">
//           Our Recent Webflow Projects
//         </h2>
//       </div>

//       <div className=" w-full p-2">
//         <motion.div
//           className="flex gap-4 md:gap-6 w-max"
//           animate={{
//             x: ["0%", "-50%"], // Infinite scroll animation
//           }}
//           transition={{
//             duration: 15,
//             ease: "linear",
//             repeat: Infinity,
//           }}
//           whileHover={{ x: "0%" }} // Pause animation on hover by setting it to 0%
//         >
//           {duplicatedProjects.map((project, i) => (
//             <motion.div
//               key={i}
//               className="bg-gradient-to-br from-[#231442] to-[#331a63] rounded-xl shadow-md p-3 w-[280px] sm:w-[320px] md:w-[380px] flex-shrink-0 flex flex-col relative lg:h-[730px] md:h-[500px]"
//               style={{
//                 background: `linear-gradient(35deg, rgba(71, 24, 99, 0.2) 10%, rgba(118, 67, 175, 0.5) 50%, rgba(193, 145, 231, 0.2) 100%)`,
//                 boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.36)",
//               }}
//             >
//               <div className="absolute -bottom-20 -right-40 w-40 h-40 bg-gradient-to-r from-blue-500/10 to-purple-500/100 rounded-full blur-3xl"></div>
//               <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-2xl"></div>

//               <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-4 text-white text-start">
//                 {project.title}
//               </h3>

//               <div className="flex gap-2 mb-3 md:mb-4">
//                 {project.badges.map((badge, idx) => (
//                   <span
//                     key={idx}
//                     className="text-xs md:text-sm font-medium px-2 py-1 rounded-full border bg-[#371577] text-white"
//                   >
//                     {badge}
//                   </span>
//                 ))}
//               </div>

//               {/* Project Image with fixed appropriate height */}
//               <div className="rounded-lg w-full lg:h-[700px] md:h-[500px] sm:h-[220px] ">
//                 <Image
//                   src={project.image}
//                   alt={`${project.title} - screenshot`}
//                   className="w-full lg:h-[600px] md:h-[450px] object-cover object-top rounded-lg"
//                   width={500}
//                   height={0}
//                   quality={100}
//                 />
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>

//       <div className="flex justify-center mt-6">
//         <CalendlyButton name="Book a Demo" />
//       </div>
//     </div>
//   );
// }

export default function AnimatedCard() {
  // Duplicate projects array for infinite scrolling
  const duplicatedProjects = [...projects, ...projects];

  return (
    <div className="w-full py-8 md:py-16">
      <div className="container mx-auto px-4 mb-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-white">
          Our Recent Webflow Projects
        </h2>
      </div>

      <div className="w-full p-2 overflow-hidden">
        <motion.div
          className="flex gap-4 md:gap-6 w-max"
          animate={{
            x: ["0%", "-50%"], // Infinite scroll animation
          }}
          transition={{
            duration: 15,
            ease: "linear",
            repeat: Infinity,
          }}
          style={{
            willChange: "transform", // Optimize GPU rendering
          }}
          whileHover={{ x: "0%" }} // Pause animation on hover by setting it to 0%
        >

          {duplicatedProjects.map((project, i) => (
            <motion.div
              key={i}
              className="bg-gradient-to-br from-[#231442] to-[#331a63] rounded-xl shadow-md p-3 w-[280px] sm:w-[320px] md:w-[380px] flex-shrink-0 flex flex-col relative lg:h-[730px] md:h-[500px]"
              style={{
                background: `linear-gradient(35deg, rgba(71, 24, 99, 0.2) 10%, rgba(118, 67, 175, 0.5) 50%, rgba(193, 145, 231, 0.2) 100%)`,
                boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.36)",
              }}
            >
              {/* Gradient blobs */}
              <div className="absolute -bottom-20 -right-40 w-40 h-40 bg-gradient-to-r from-blue-500/10 to-purple-500/100 rounded-full blur-3xl"></div>
              <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-2xl"></div>

              {/* Project Title */}
              <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-4 text-white text-start">
                {project.title}
              </h3>

              {/* Project Badges */}
              <div className="flex gap-2 mb-3 md:mb-4">
                {project.badges.map((badge, idx) => (
                  <span
                    key={idx}
                    className="text-xs md:text-sm font-medium px-2 py-1 rounded-full border bg-[#371577] text-white"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              {/* Project Image */}
              <div className="rounded-lg w-full lg:h-[700px] md:h-[500px] sm:h-[220px]">
                <Image
                  src={project.image}
                  alt={`${project.title} - screenshot`}
                  className="w-full lg:h-[600px] md:h-[450px] object-cover object-top rounded-lg"
                  width={500}
                  height={0}
                  quality={100}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="flex justify-center mt-6">
        <CalendlyButton name="Book a Demo" />
      </div>
    </div>
  );
}
