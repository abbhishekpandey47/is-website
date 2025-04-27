import Image from "next/image";
import { useEffect, useRef } from "react";
import ClutchBadge from "./clutch";

export default function TrustedBySection() {
  const scrollContainerRef = useRef(null);
  const fileList = [
    "mocha.png",
    "aviator.png",
    "firstock-logo.webp",
    "cedana.png",
    "cerbos.png",
    "codegiant-infra-1.png",
    "cycloid.png",
    "daytona-removebg-preview-e1721477918328.png",
    "DevZero.png",
    "env0-infra-1.png",
    "firefly.png",
    "Group-14967.png",
    "images-removebg-preview.png",
    "images__2_-removebg-preview.png",
    "kapstan.png",
    "kubiya.png",
    "logo-landscape-removebg-preview.png",
    "lovable-logo.png",
    "Mask-group.png",
    "middleware-logo.svg",
    "scalr.png",
    "stackOne.svg",
    "TravisCI-Full-Color.png",
    "terrateam.png",
    "vapi.png",
    "qodo-logo.svg",
  ];

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
          <div className="w-[50%]">
            <div ref={scrollContainerRef} className="overflow-x-hidden">
              <div className="inline-flex min-w-full">
                {rows.map((row, rowIndex) => (
                  <div key={rowIndex} className="flex min-w-full">
                    {row.map((company, index) => (
                      <div
                        key={`${rowIndex}-${index}`}
                        className="w-1/3 h-20 flex items-center justify-center px-4"
                      >
                        <div className="flex items-center justify-center">
                          <Image
                            loading="lazy"
                            width={100}
                            height={40}
                            className="max-h-10 w-auto text-gray-400 filter brightness-0 invert"
                            src={`/trustedby/${company}`}
                            alt={`Trusted partner ${company}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right side: ClutchBadge (50% width) */}
          <div className="w-[50%] flex items-center justify-end">
            <div className="flex items-center space-x-4">
              <div className="border-l-2 border-gray-400 h-[25px]"></div>
              <ClutchBadge />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
