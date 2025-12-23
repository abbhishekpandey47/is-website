import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ClutchBadge from "./clutch";
import { serviceClientLogo  , clientPaddingMap} from "@/clients";

export default function TrustedBySection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };

      handleResize();

      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const scrollContainerRef = useRef(null);
  const fileList = serviceClientLogo

  const getLogoPadding = (filename) => {
    const paddingMap = clientPaddingMap;

    // Return specific padding or default p-4
    return paddingMap[filename] || 'p-4';
  };


  // Create rows with 5 logos each
  const rows = [];
  for (let i = 0; i < fileList.length; i += 5) {
    rows.push(fileList.slice(i, i + 5));
  }

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let scrollPosition = 0;
    const totalWidth =
      scrollContainer.scrollWidth - scrollContainer.clientWidth;

    const scroll = () => {
      // Increment scroll
      scrollPosition += 0.5;

      // Reset scroll position when we end
      if (scrollPosition >= totalWidth) {
        scrollPosition = 0;
      }

      scrollContainer.scrollLeft = scrollPosition;

      requestAnimationFrame(scroll);
    };

    const animationId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="w-full py-2 px-6 lg:pl-40">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-[20px] text-[#858588] font-normal mb-4">
          Trusted by
        </h2>

        <div className="flex flex-row">
          {/* Left side: Scrolling logos (50% width) */}
          <div className="w-full lg:w-[37%]">
            <div ref={scrollContainerRef} className="overflow-x-hidden">
              <div className="inline-flex min-w-full">
                {rows.map((row, rowIndex) => (
                  <div key={rowIndex} className="flex min-w-full">
                    {row.map((company, index) => (
                      <div
                        key={`${rowIndex}-${index}`}
                        className="w-1/3 h-32 flex items-center justify-center"
                      >
                        <div className="flex items-center justify-center -mt-8">
                          <Image
                            loading="lazy"
                            width={160}
                            height={80}
                            className={`${getLogoPadding(company)} object-contain opacity-90`}
                            src={`/trustedby-bw/bw/${company}`}
                            alt="Trusted by logo"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {!isMobile && (
            <div className="w-[63%] lg:w-[53%] flex items-center justify-end">
              <div className="flex items-center space-x-4">
                <div className="flex mb-6 h-6 border-l-2 border-gray-400"></div>
                <ClutchBadge />
              </div>
            </div>
          )}{" "}
        </div>
      </div>
      {isMobile && (
        <div className="w-full flex items-center justify-center mt-4">
          <div className="flex items-center space-x-4">
            <ClutchBadge />
          </div>
        </div>
      )}
    </div>
  );
}
