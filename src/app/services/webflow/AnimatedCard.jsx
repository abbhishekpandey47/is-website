// animatedcard/AnimatedCardSlider.tsx
import { motion } from "framer-motion";
import Image from "next/image";
import img1 from "./images/thecss/thecss1.png"
import img2 from "./images/thecss/thecss2.png"
import img3 from "./images/thecss/thecss3.png"

const projects = [
  {
    title: "Joblinx ai",
    badges: ["Webflow", "Figma"],
    image: img1,
  },
  {
    title: "Nirvana Consulting Company",
    badges: ["Figma", "Webflow"],
    image: img2,
  },
  {
    title: "Consolto",
    badges: ["Webflow", "Figma"],
    image: img3,
  },
  {
    title: "My Hotel Line",
    badges: ["Figma", "Webflow"],
    image: img2,
  },
  {
    title: "Aruti",
    badges: ["Figma", "Webflow"],
    image: img1,
  },
  {
    title: "Novabeing",
    badges: ["Figma", "Webflow"],
    image: img3,
  },

];

export default function AnimatedCard() {
  const duplicatedProjects = [...projects, ...projects]; // duplicates for infinite scroll

  return (
    <div className="w-full py-16 ">
      <div className="container mx-auto px-4 mb-8">
        <h2 className="text-4xl font-bold text-center text-white mb-12">Our Recent Webflow Projects</h2>
      </div>
      
      <div className="overflow-hidden w-full p-6">
        <motion.div
          className="flex gap-6 w-max px-4"
          animate={{
            x: ["0%", "-50%"], 
          }}
          transition={{
            duration: 15,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {duplicatedProjects.map((project, i) => (
            <div
              key={i}
              className="bg-gradient-to-br from-[#231442] to-[#331a63] border border-white rounded-xl shadow-md p-5 w-[400px] flex-shrink-0 flex flex-col"
              style={{
                background: `linear-gradient(35deg, rgba(71, 24, 99, 0.2) 10%, rgba(118, 67, 175, 0.5) 50%, rgba(193, 145, 231, 0.2) 100%)`,
                boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.36)",
              }}
  
            >
              <h3 className="text-xl font-semibold mb-4 text-white text-start">{project.title}</h3>
              
              <div className="flex gap-2 mb-6">
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
              <div className="rounded-lg overflow-hidden w-full">
                <Image
                  src={project.image}
                  alt={`${project.title} - screenshot`}
                  className="w-full h-full object-cover rounded-md p-1 "
                  width={550}
                  height={340}
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
      <div className="flex justify-center">
          <button className="bg-[#6169FC] px-4 py-3 rounded-md shadow-md text-white mt-8">
            Book a Call
          </button>
        </div>

    </div>
  );
}