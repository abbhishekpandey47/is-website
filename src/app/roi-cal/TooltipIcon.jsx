const TooltipIcon = ({ description }) => {
    return (
      <div className="group relative inline-block">
        <svg
          className="w-4 h-4 ml-2 inline-block cursor-pointer"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
  
        <div className="w-[250px] absolute hidden group-hover:block bg-gray-800 text-white text-sm rounded px-3 py-2 z-10 bottom-6 left-1/2 -translate-x-1/2">
          <p>{description}</p>
        </div>
      </div>
    );
  };
  
  export default TooltipIcon;
  