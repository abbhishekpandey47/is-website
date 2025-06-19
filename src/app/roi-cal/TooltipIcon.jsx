import { useState } from "react";

const TooltipIcon = ({ description, width }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    setIsVisible(true);

    setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  };

  const showTooltip = isVisible || isHovered;

  const tooltipStyles = width ? { width: width } : { width: "max-content" };

  return (
    <div className="relative inline-block">
      <svg
        className="w-4 h-4 ml-2 inline-block cursor-pointer"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>

      {showTooltip && (
        <div
          className="max-w-md min-w-[200px] whitespace-normal absolute bg-gray-800 text-white text-sm rounded px-3 py-2 z-10 bottom-6 left-1/2 -translate-x-1/2"
          style={tooltipStyles}
        >
          <p>{description}</p>
        </div>
      )}
    </div>
  );
};

export default TooltipIcon;
