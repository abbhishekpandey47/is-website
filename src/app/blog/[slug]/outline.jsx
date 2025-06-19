"use client";
import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { Linkedin, X, Link as LinkIcon } from "lucide-react";

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
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
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
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
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
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  }, [activeOutlineId]);

  // Function to copy the current URL to clipboard
  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    // You could add a toast notification here
  };

  // Function to share on LinkedIn
  const shareOnLinkedin = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      "_blank"
    );
  };

  // Function to share on Twitter
  const shareOnTwitter = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("Check out this great article!");
    window.open(
      `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      "_blank"
    );
  };

  return (
    <nav
      id="outlineComponent"
      aria-label="Outline Navigation"
      className={`w-[18rem] max-xl:w-[13rem] min-[2173px]:w-[22rem] min-[2173px]:text-lg min-[2500px]:w-[30rem] min-[2500px]:text-xl max-lg:w-[20rem] flex flex-col quicksand-light text-sm my-8 ${
        sticky && "sticky"
      } left-0 top-[82px]`}
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
                activeId === element.id ? "white quicksand-semibold" : "#999"
              }`}
            >
              {element?.text}
            </div>
          </div>
        ))}
      </div>
      {/* Share with your community section */}
      <div className=" py-5 px-6 mt-8 rounded-lg mb-4 readytostart text-center">
        <h3 className="text-white text-lg font-semibold mb-4">
          Share with your community!
        </h3>
        <div className="flex gap-5 justify-center">
          <button
            className="bg-black rounded-full p-3 hover:bg-gray-700 transition-colors"
            onClick={shareOnLinkedin}
            aria-label="Share on LinkedIn"
          >
            <Linkedin size={20} className="text-black" />
          </button>
          <button
            className="bg-black rounded-full p-3 hover:bg-gray-700 transition-colors"
            onClick={shareOnTwitter}
            aria-label="Share on Twitter"
          >
            <X size={20} className="text-black" />
          </button>
          <button
            className="bg-black rounded-full p-3 hover:bg-gray-700 transition-colors"
            onClick={copyLinkToClipboard}
            aria-label="Copy link"
          >
            <LinkIcon size={20} className="text-black" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Outline;
