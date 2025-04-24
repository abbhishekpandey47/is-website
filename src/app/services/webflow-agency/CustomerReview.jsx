import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

const projects = [
  {
    review:
      "As a part of tech content marketing strategy We develop ready-to-use recipe libraries for tech stacks like Node.js, Bun.js, React, and CockroachDB. These libraries provide end users with ready-made boilerplate code, allowing them to jumpstart their projects without having to write code from scratch.",
    customerName: "Rajnikant",
    rank: "co-founder, The Cluless Company",
    location: "India",
  },
  {
    review:
      "As a part of tech content marketing strategy We develop ready-to-use recipe libraries for tech stacks like Node.js, Bun.js, React, and CockroachDB. These libraries provide end users with ready-made boilerplate code, allowing them to jumpstart their projects without having to write code from scratch.",
    customerName: "Rajnikant",
    rank: "CEO, The Cluless Company",
    location: "India",
  },
  {
    review:
      "As a part of tech content marketing strategy We develop ready-to-use recipe libraries for tech stacks like Node.js, Bun.js, React, and CockroachDB. These libraries provide end users with ready-made boilerplate code, allowing them to jumpstart their projects without having to write code from scratch.",
    customerName: "Rajnikant",
    rank: "co-founder, jet learn",
    location: "India",
  },
  {
    review:
      "As a part of tech content marketing strategy We develop ready-to-use recipe libraries for tech stacks like Node.js, Bun.js, React, and CockroachDB. These libraries provide end users with ready-made boilerplate code, allowing them to jumpstart their projects without having to write code from scratch.",
    customerName: "Rajnikant",
    rank: "CEO, jet learn",
    location: "India",
  },
  {
    review:
      "As a part of tech content marketing strategy We develop ready-to-use recipe libraries for tech stacks like Node.js, Bun.js, React, and CockroachDB. These libraries provide end users with ready-made boilerplate code, allowing them to jumpstart their projects without having to write code from scratch.",
    customerName: "Rajnikant",
    rank: "co-founder, jet learn",
    location: "India",
  },
  {
    review:
      "As a part of tech content marketing strategy We develop ready-to-use recipe libraries for tech stacks like Node.js, Bun.js, React, and CockroachDB. These libraries provide end users with ready-made boilerplate code, allowing them to jumpstart their projects without having to write code from scratch.",
    customerName: "Rajnikant",
    rank: "CEO, The Cluless Company",
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
    <div className="overflow-hidden w-full py-10 ">
      <motion.div
        ref={containerRef}
        className="flex gap-6 w-max"
        animate={controls}
        onMouseEnter={() => controls.stop()} //
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
            className="shadow-md p-6 w-[450px] flex-shrink-0 bg-gradient-to-br from-[#231442] to-[#331a63] border border-white rounded-xl"
          >
            <h2 className="font-base text-left mb-2">{project.review}</h2>
            <div className="flex mb-2">
              <span className="text-sm font-semibold px-2 py-1">
                {project.customerName}
              </span>
            </div>
            <div className="flex gap-2">
              <span className="text-sm font-base px-2 ">{project.rank}</span>
            </div>
            <div className="flex mb-2">
              <span className="text-sm font-base px-2">{project.location}</span>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
