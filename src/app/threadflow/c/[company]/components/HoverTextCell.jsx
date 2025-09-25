import { useState } from "react";

export const HoverTextCell = ({ text, isTitle = false, isTextEngagement = false }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  if (!text) {
    return <span className="text-muted-foreground">-</span>;
  }

  const handleMouseEnter = () => setShowTooltip(true);
  const handleMouseLeave = () => setShowTooltip(false);

  // helper to render content safely
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
      {/* Truncated preview */}
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        title="Hover to see full text"
      >
        {renderContent(
          `text-sm ${isTitle ? "text-white" : "text-muted-foreground"} line-clamp-3 cursor-help hover:text-foreground transition-colors duration-200
           [&_a]:text-blue-500 [&_a:hover]:underline`
        )}
      </div>

      {/* Tooltip with full content */}
      {showTooltip && (
        <div
          className="absolute z-50 left-0 top-full -mt-6 w-80 bg-popover border border-border rounded-lg shadow-lg p-3 animate-in fade-in-0 zoom-in-95"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="max-h-60 overflow-y-auto">
            {renderContent(
              "text-sm text-popover-foreground whitespace-pre-wrap break-words [&_a]:text-blue-500 [&_a:hover]:underline"
            )}
          </div>
          {/* Arrow pointer */}
          <div className="absolute -top-1 left-4 w-2 h-2 bg-popover border-l border-t border-border rotate-45"></div>
        </div>
      )}
    </div>
  );
};