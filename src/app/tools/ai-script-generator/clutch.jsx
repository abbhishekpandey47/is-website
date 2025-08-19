import Link from "next/link";
import React from "react";

export default function ClutchBadge() {
  return (
    <div className=" flex items-center justify-center">
    <Link
      href="https://clutch.co/profile/infrasity#reviews"
      target="_blank"
      className="z-10"
    >
      <div className="flex flex-col items-start max-w-xs">
        <div className="flex items-center justify-between w-full mb-1">
          <span className="text-gray-400 text-[14px] font-medium tracking-wide">
            REVIEWED ON
          </span>
          <div className="flex ml-2">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className="h-5 w-5"
                fill="#FF6240" // Direct hex color
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between -mt-7">
          <div className="w-24">
            <svg
              viewBox="0 0 652 652"
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
            >
              <g>
                <path fill="#9ca3af" d="M177,235.9h27.6v170.4H177V235.9z" />
                <path
                  fill="#9ca3af"
                  d="M300.6,352.3c0,26.4-21.6,28.8-28.8,28.8c-16.8,0-19.2-15.6-19.2-24v-66H225v64.8c0,15.6,4.8,30,14.4,38.4
                c8.4,8.4,19.2,12,32.4,12c9.6,0,21.6-2.4,28.8-9.6v9.6h27.6V291.1h-27.6C300.6,291.1,300.6,352.3,300.6,352.3z"
                />
                <path
                  fill="#9ca3af"
                  d="M382.2,249.1h-27.6v42h-20.4v26.4h20.4v88.8h27.6v-88.8h20.4v-26.4h-20.4V249.1z"
                />
                <path
                  fill="#9ca3af"
                  d="M489,371.5c-6,4.8-14.4,8.4-22.8,8.4c-19.2,0-32.4-14.4-32.4-33.6s13.2-32.4,32.4-32.4
                c8.4,0,16.8,2.4,22.8,8.4l3.6,3.6l19.2-18l-4.8-3.6c-10.8-9.6-25.2-15.6-40.8-15.6c-33.6,0-58.8,25.2-58.8,58.8
                s25.2,58.8,58.8,58.8c15.6,0,30-6,40.8-15.6l4.8-3.6l-19.2-19.2L489,371.5z"
                />
                <path
                  fill="#9ca3af"
                  d="M609,300.7c-8.4-8.4-16.8-12-30-12c-9.6,0-19.2,2.4-26.4,9.6v-62.4H525v170.4h27.6v-63.6
                c0-26.4,18-28.8,25.2-28.8c16.8,0,15.6,15.6,15.6,24v67.2H621v-66C621,323.5,617.4,309.1,609,300.7z"
                />
                <circle fill="#EF4335" cx="465" cy="347.5" r="19.2" />
                <path
                  fill="#9ca3af"
                  d="M138.6,364.3c-9.6,9.6-24,15.6-39.6,15.6c-30,0-51.6-24-51.6-56.4s21.6-56.4,52.8-56.4
                c14.4,0,28.8,6,39.6,16.8l3.6,3.6l18-18l-3.6-3.6c-15.6-15.6-36-24-57.6-24C54.6,240.7,21,276.7,21,323.5s33.6,82.8,78,82.8
                c21.6,0,43.2-8.4,57.6-24l3.6-3.6l-18-18L138.6,364.3z"
                />
              </g>
            </svg>
          </div>

          <span className="text-gray-400 text-[20px] ml-3">
            4.8 <span className=" text-gray-400 text-[16px]"> Rating </span>
          </span>
        </div>
      </div>
    </Link>
    </div>
  );
}
