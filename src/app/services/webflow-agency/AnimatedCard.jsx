import { motion } from "framer-motion";
import Image from "next/image";

import Acc from "/public/webflow-age/jpg2png/acc.png";
import dev from "/public/webflow-age/jpg2png/devzero.jpg";
import kubiya from "/public/webflow-age/jpg2png/kubiya.png";
import knidal from "/public/webflow-age/jpg2png/knidal.jpg";
import CalendlyButton from "../tech-video-production/calendlyButton";

const projects = [
  { title: "Kubiya", badges: ["Webflow", "Figma"], image: kubiya },
  { title: "Acceldata", badges: ["Figma", "Webflow"], image: Acc },
  { title: "devzero", badges: ["Webflow", "Figma"], image: dev },
  { title: "Knidal", badges: ["Figma", "Webflow"], image: knidal },
];

export default function AnimatedCard() {
  // Duplicate projects array for infinite scrolling
  const duplicatedProjects = [...projects, ...projects];

  return (
    <div className="w-full py-8 md:py-16">
      <div className="container mx-auto px-4 mb-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-white">
          Trusted by fast-moving B2B AI and infra startups
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
          whileHover={{ x: "-1" }} // Pause animation on hover by setting it to 0%
        >
          {duplicatedProjects.map((project, i) => (
            <motion.div
              key={i}
              className="bg-gradient-to-br from-[#231442] to-[#331a63] rounded-xl shadow-md p-3 w-[280px] sm:w-[320px] md:w-[380px] flex-shrink-0 flex flex-col relative lg:h-[730px] md:h-[500px]"
              style={{
                backgroundColor: "#141318",
                backgroundImage: `radial-gradient(circle at top right, #272b40 0%, transparent 80%)`,
                boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.36)",
                border: "2px solid rgba(60, 63, 84, 0.3)",
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
                    className="text-xs md:text-sm font-medium px-2 py-1 rounded-full text-white"
                    style={{
                      backgroundColor: "#141318",
                      backgroundImage: `radial-gradient(circle at top right, #272b40 0%, transparent 80%)`,
                      boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.36)",
                      border: "2px solid rgba(60, 63, 84, 0.3)",
                    }}
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
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* <div className="flex justify-center mt-6">
        <CalendlyButton name="Book a Demo" />
      </div> */}
    </div>
  );
}
