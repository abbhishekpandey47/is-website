import { motion } from "framer-motion";
import Image from "next/image";
import Acc from "./images/jpg2png./acc.jpg"
import dev from "./images/jpg2png./devzero.jpg"
import kubiya from "./images/jpg2png./kubiya.jpg"
import knidal from "./images/jpg2png./knidal.jpg"

import CalendlyButton from "../service-video-production/calendlyButton";

const projects = [
  {
    title: "Kubiya",
    badges: ["Webflow", "Figma"],
    image: kubiya,
  },
  {
    title: "Acceldata",
    badges: ["Figma", "Webflow"],
    image: Acc,
  },
  {
    title: "devzero",
    badges: ["Webflow", "Figma"],
    image: dev,
  },
  {
    title: "Knidal",
    badges: ["Figma", "Webflow"],
    image: knidal,
  },

];

export default function AnimatedCard() {
  const duplicatedProjects = [...projects, ...projects]; // duplicates for infinite scroll

  return (
    <div className="w-full py-16">
      <div className="container mx-auto px-4 mb-4">
        <h2 className="text-4xl font-bold text-center text-white ">
          Our Recent Webflow Projects
        </h2>
      </div>

      <div className="overflow-hidden w-full p-2">
        <motion.div
          className="flex gap-6 w-max "
          animate={{
            x: ["0%", "-50%"], // Infinite scroll animation
          }}
          transition={{
            duration: 15,
            ease: "linear",
            repeat: Infinity,
          }}
          whileHover={{ x: 0 }} // Pause animation on hover
        >
          {duplicatedProjects.map((project, i) => (
            <motion.div
              key={i}
              className="bg-gradient-to-br from-[#231442] to-[#331a63] border border-white rounded-xl shadow-md p-3 w-[450px] flex-shrink-0 flex flex-col"
              style={{
                background: `linear-gradient(35deg, rgba(71, 24, 99, 0.2) 10%, rgba(118, 67, 175, 0.5) 50%, rgba(193, 145, 231, 0.2) 100%)`,
                boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.36)",
              }}
              whileHover={{ scale: 1.05 }} // Slight zoom effect on hover
            >
              <h3 className="text-xl font-semibold mb-4 text-white text-start">
                {project.title}
              </h3>

              <div className="flex gap-2 mb-4">
                {project.badges.map((badge, idx) => (
                  <span
                    key={idx}
                    className="text-sm font-medium px-2 py-1 rounded-full border bg-[#371577] text-white"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              {/* Single Project Image */}
              <div className="rounded-lg overflow-hidden w-full h-[700px] items-stretch">
                <Image
                  src={project.image}
                  alt={`${project.title} - screenshot`}
                  className="w-full h-full object-contain object-top rounded-lg"
                  width={500} // Adjusted width
                  height={450} // Adjusted height
                  quality={100} // Ensures the image is rendered with maximum quality
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="flex justify-center">
        <div className="flex justify-center md:justify-start mt-1">
          <CalendlyButton name="Book a Demo" />
        </div>
      </div>
    </div>
  );
}