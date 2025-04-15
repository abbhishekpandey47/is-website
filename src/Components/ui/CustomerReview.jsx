import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

const projects = [
  {
    title: "Joblinx ai",
    customerName: ["Webflow", "Figma"],
    rank: "/images/joblinx.png",
    location: "India",
  },
  {
    title: "Joblinx ai",
    customerName: ["Webflow", "Figma"],
    rank: "/images/joblinx.png",
    location: "India",
  },
  {
    title: "Joblinx ai",
    customerName: ["Webflow", "Figma"],
    rank: "/images/joblinx.png",
    location: "India",
  },
  {
    title: "Joblinx ai",
    customerName: ["Webflow", "Figma"],
    rank: "/images/joblinx.png",
    location: "India",
  },
];

export default function CustomerReview() {
  const duplicatedProjects = [...projects, ...projects];
  const controls = useAnimation();
  const containerRef = useRef(null);

  useEffect(() => {
    controls.start({
      x: ["0%", "-50%"],
      transition: {
        duration: 20,
        ease: "linear",
        repeat: Infinity,
      },
    });
  }, [controls]);

  return (
    <div className="overflow-hidden w-full py-10">
      <motion.div
        ref={containerRef}
        className="flex gap-6 w-max"
        animate={controls}
        onMouseEnter={() => controls.stop()}
        onMouseLeave={() =>
          controls.start({
            x: ["0%", "-50%"],
            transition: {
              duration: 20,
              ease: "linear",
              repeat: Infinity,
            },
          })
        }
      >
        {duplicatedProjects.map((project, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-md p-4 w-[300px] flex-shrink-0"
          >
            <h2 className="font-semibold text-lg mb-2">{project.title}</h2>
            <div className="flex gap-2 mb-2">
              {project.customerName.map((badge, idx) => (
                <span
                  key={idx}
                  className="text-sm bg-gray-200 px-2 py-1 rounded-full"
                >
                  {badge}
                </span>
              ))}
            </div>
            <img
              src={project.rank}
              alt={project.title}
              className="rounded-md w-full h-48 object-cover"
            />
            <p className="text-sm text-black mt-2">{project.location}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
