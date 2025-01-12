"use client";
import { useEffect, useState, useRef, useCallback, useMemo } from "react";

const generateOutlineObj = (content) => {
  const lines = String(content).split("\n");
  const outline = [];
  const generateId = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  };

  let inCodeBlock = false;

  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      continue;
    }

    if (!inCodeBlock) {
      const headingMatch = line.match(/^(#{1,6})\s+(.*)/);

      if (headingMatch) {
        const level = headingMatch[1].length;
        const text_ = headingMatch[2].trim();
        const text = text_.replace(/[^a-z0-9A-Z\s!.,:?\-]/gi, "");
        
        const item = {
          id: generateId(text),
          level,
          text,
          children: [],
        };
        
        if (level === 2) outline.push(item);
      }
    }
  }

  return outline;
};

const Outline = ({ content }) => {
  const outlineRef = useRef(null);
  const outline = useMemo(() => generateOutlineObj(content), [content]);
  const [activeId, setActiveId] = useState("");
  const [activeOutlineId, setActiveOutlineId] = useState("");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [sticky, setSticky] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  const handleScroll = useCallback(() => {
    const headerOffset = 50;
    const currentScrollY = window.pageYOffset;
    let activeElement = null;
  
    if (currentScrollY > lastScrollY) {
      for (let i = outline.length - 1; i >= 0; i--) {
        const item = outline[i];
        const element = document.getElementById(item.id);
  
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= headerOffset && rect.top <= window.innerHeight) {
            activeElement = item.id;
            break;
          }
        }
      }
      const outlineComponent = document.getElementById("outlineComponent");
      const rect = outlineComponent.getBoundingClientRect();
      if (rect.top <= headerOffset) {
        setSticky(true);
      }
    } else {
      outline.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (item === outline[0] && rect.top > window.innerHeight) {
            activeElement = " ";
            return;
          }
          if (rect.top < headerOffset && rect.bottom > headerOffset) {
            activeElement = item.id;
            return;
          }
        }
      });  
      const headBanner = document.getElementById("headBanner");
      const rect = headBanner.getBoundingClientRect();
      if (rect.bottom >= headerOffset) {
        setSticky(false);
      }
    }
    
    if (activeElement) {
      setActiveId(activeElement);
      setActiveOutlineId(`outline-${activeElement}`);
    }

    setLastScrollY(currentScrollY);
  }, [outline]);

  const handleScrollToElement = useCallback((id) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 50;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      setActiveId(id);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowWidth > 1024) {
      window.addEventListener("scroll", handleScroll);
    } else {
      window.removeEventListener("scroll", handleScroll);
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [windowWidth, handleScroll]);

  useEffect(() => {
    if (outlineRef.current) {
      const activeElement = document.getElementById(activeOutlineId);
      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }
    }
  }, [activeOutlineId]); 

  return (
    <nav
      id="outlineComponent"
      aria-label="Outline Navigation"
      className={`w-[18rem] max-xl:w-[13rem] min-[2173px]:w-[22rem] min-[2173px]:text-lg min-[2500px]:w-[30rem] min-[2500px]:text-xl max-lg:w-[20rem] flex flex-col quicksand-light text-sm my-8 ${sticky && "sticky"} left-0 top-[82px] pt-10`}
    >
      <div className="flex justify-start text-lg py-4 pb-2 mb-0 quicksand-semibold">
        <p className="text-left text-[#3c61e2]"># Overview</p>
      </div>
      <hr className="border-white mb-3" />
      <div
        ref={outlineRef}
        className="flex flex-col max-h-[480px] overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full"
      >
        {outline.map((element, elementIdx) => (
          <div
            id={`outline-${element.id}`}
            key={elementIdx}
            role="link"
            aria-label={`Navigate to section ${element.text}`}
            className={`py-1 transition-all duration-500 ${
              activeId === element.id ? " " : ""
            }`}
            onClick={() => handleScrollToElement(element.id)}
          >
            <div
              className={`hover:underline hover:cursor-pointer ${
                activeId === element.id
                  ? "white quicksand-semibold"
                  : "#999"
              }`}
            >
              {element?.text}
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Outline;
