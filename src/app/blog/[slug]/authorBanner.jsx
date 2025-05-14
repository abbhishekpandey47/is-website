import Image from "next/image";
import React from "react";

// Wrapping the component with React.memo to prevent unnecessary re-renders
const AuthorBanner = React.memo(({ authorData }) => {
  return (
    <div
      id="authorBanner"
      className="w-[87%] mt-10 flex flex-row items-center justify-between mx-auto py-6 md:px-6 rounded-lg shadow-lg readytostart"
    >
      {authorData.profilePic && (
        <div className="hidden md:flex justify-center w-[25%] items-center">
          {/* Added priority={false} to avoid preloading the image */}
          <Image
            width={200}
            height={200}
            loading="lazy"
            priority={false} // Prevents image from preloading
            src={authorData.profilePic}
            alt={`Profile picture of ${authorData.name || "the author"}`} // Improved alt attribute for accessibility
            className="rounded-full w-28 h-28 md:w-36 md:h-36 lg:w-48 lg:h-48"
          />
        </div>
      )}
      <div className="w-full md:w-3/4 rounded-lg sm:p-6 flex gap-x-[5%]">
        {authorData.profilePic && (
          <div className="hidden max-md:flex justify-center items-center m-2">
            {/* Added descriptive alt text for accessibility */}
          </div>
        )}
        <div className="flex flex-col justify-center gap-y-2">
          <h3 className="text-xl sm:text-3xl font-bold text-white quicksand-bold">
            {authorData.name || "Name of the author"}
          </h3>
          <p className="text-sm xs:text-lg text-[wheat]">
            {authorData.designation || "Technical Author"}
          </p>
          {authorData.about && (
            <p className="hidden md:block text-sm quicksand-light">
              {authorData.about}
            </p>
          )}
          <div className="flex items-center space-x-4">
            <a
              target="_blank"
              rel="noopener noreferrer" // Added rel="noopener noreferrer" for security
              href={authorData.linkedIn}
              className="text-xs xs:text-sm text-white quicksand-semibold hover:underline transition duration-150 ease-in-out transform hover:scale-110" // Added smooth hover effect
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
});

export default AuthorBanner;
