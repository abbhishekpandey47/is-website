// animatedcard/AnimatedCardSlider.tsx
import { motion } from "framer-motion";

const projects = [
  {
    title: "Joblinx ai",
    badges: ["Webflow", "Figma"],
    image: "/images/joblinx.png",
  },
  {
    title: "Nirvana Consulting Company",
    badges: ["Figma", "Webflow"],
    image: "/images/nirvana.png",
  },
  {
    title: "Consolto",
    badges: ["Webflow", "Figma"],
    image: "/images/consolto.png",
  },
  {
    title: "My Hotel Line",
    badges: ["Figma", "Webflow"],
    image: "/images/myhotel.png",
  },
];

export default function AnimatedCard() {
  const duplicatedProjects = [...projects, ...projects]; // duplicates for infinite scroll

  return (
    <div className="overflow-hidden w-full py-10">
      <motion.div
        className="flex gap-6 w-max"
        animate={{
          x: ["0%", "-50%"], // only go halfway because we duplicated
        }}
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {duplicatedProjects.map((project, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-md p-4 w-[300px] flex-shrink-0"
          >
            <h2 className="font-semibold text-lg mb-2">{project.title}</h2>
            <div className="flex gap-2 mb-2">
              {project.badges.map((badge, idx) => (
                <span
                  key={idx}
                  className="text-sm bg-gray-200 px-2 py-1 rounded-full"
                >
                  {badge}
                </span>
              ))}
            </div>
            <img
              src={project.image}
              alt={project.title}
              className="rounded-md w-full h-48 object-cover"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
