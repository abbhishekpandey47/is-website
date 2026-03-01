import { useState } from "react";

export const HoverTextCell = ({ text, isTitle = false, isTextEngagement = false }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  if (!text) {
    return <span className="text-[rgba(255,255,255,0.25)]">-</span>;
  }

  const handleMouseEnter = () => setShowTooltip(true);
  const handleMouseLeave = () => setShowTooltip(false);

  const renderContent = (className) =>
    isTextEngagement ? (
      <div
        className={className}
        dangerouslySetInnerHTML={{ __html: text }}
      />
    ) : (
      <div className={className}>{text}</div>
    );

  return (
    <div className="relative max-w-sm">
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        title="Hover to see full text"
      >
        {renderContent(
          `text-[13px] ${isTitle ? "text-[#ededed]" : "text-[rgba(255,255,255,0.6)]"} line-clamp-3 cursor-help hover:text-[#ededed] transition-colors duration-150
           [&_a]:text-[#60a5fa] [&_a:hover]:underline`
        )}
      </div>

      {showTooltip && (
        <div
          className="absolute z-50 left-0 top-full -mt-4 w-80 bg-[#141414] border border-[rgba(255,255,255,0.08)] rounded-lg shadow-[0_8px_32px_rgba(0,0,0,0.5)] p-3 animate-drop-in"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="max-h-60 overflow-y-auto">
            {renderContent(
              "text-[13px] text-[#ededed] whitespace-pre-wrap break-words [&_a]:text-[#60a5fa] [&_a:hover]:underline"
            )}
          </div>
          <div className="absolute -top-1 left-4 w-2 h-2 bg-[#141414] border-l border-t border-[rgba(255,255,255,0.08)] rotate-45" />
        </div>
      )}
    </div>
  );
};
