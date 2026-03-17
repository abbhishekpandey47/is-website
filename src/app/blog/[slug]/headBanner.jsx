import Image from "next/image";
import React from "react";

// React.memo to prevent unnecessary re-renders if props don't change
const monthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default React.memo(function HeadBanner({ postData }) {

  // Use JavaScript's Date object for better date parsing
  const publishedDate = postData.publishedOn
    ? new Date(postData.publishedOn)
    : new Date("2024-09-23");

  return (
    <div
      id="headBanner"
      className="flex min-[1900px]:mx-52 flex-row items-center justify-between max-sm:mx-8 mx-14 my-4 py-8 px-8 max-sm:px-0 max-sm:py-0 rounded-lg shadow-lg readytostart"
    >
      {/* Left Section (Text Section) */}
      <div className="max-sm:w-[100%] w-[50%] p-7 h-auto flex flex-col justify-center max-lg:w-full">
        <span className="w-fit text-center max-lg:text-xs bg-purple-100 text-purple-700 quicksand-semibold text-sm px-4 py-1 rounded-full uppercase tracking-wide mb-4">
          {postData.category || "Category"}
        </span>

        <h1 className="text-5xl max-xl:text-3xl max-md:text-2xl max-xs:text-xl quicksand-bold mb-6 text-white">
          {postData.title || "Name of the blog"}
        </h1>

        <p style={{"fontWeight": "400"}} className="text-lg mb-6 text-[wheat] quicksand-light block max-md:hidden">
          {postData.description || "Blog description"}
        </p>

        {/* Use the Date object for better readability */}
        <p className="text-white text-sm mb-6">
          {`${monthArr[publishedDate.getMonth()]} ${publishedDate.getDate()}, ${publishedDate.getFullYear()}`}
        </p>

        <div className="flex items-center space-x-6 text-white">
          {/* Primary Author Info */}
          <a
            href={postData.authorLinkedin || "#"} 
            target="_blank" // Open the link in a new tab
            rel="noopener noreferrer" // Improves security
            className="flex items-center space-x-2 transition duration-300 ease-in-out transform hover:scale-105"
          >
            {/* Added smooth hover effect */}
            <Image
              width={50}
              height={50}
              loading="lazy" // Added lazy loading
              priority={false}
              src={postData.authorImage || "https://via.placeholder.com/40"}
              alt={`Author picture of ${postData.authorName || "the author"}`} // More descriptive alt text for accessibility
              className="rounded-full w-10 h-10 transition duration-300 ease-in-out transform hover:scale-105" // Added transition effect for smooth scaling on hover
            />
            <div>
              <p className="text-sm max-xs:text-xs quicksand-semibold transition duration-300 ease-in-out transform hover:scale-105">
                Written by
              </p>{" "}
              {/* Added transition */}
              <p className="text-sm max-xs:text-xs quicksand-semibold transition duration-300 ease-in-out transform hover:scale-105">
                {postData.authorName || " "} | {postData.designation || " "} {/* Added transition */}
              </p>
            </div>
          </a>

          {/* Co-Author Info (if exists) */}
          {postData.coAuthorName && (
            <a
              href={postData.coAuthorLinkedin || "#"} 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 transition duration-300 ease-in-out transform hover:scale-105 border-l border-white/30 pl-6"
            >
              <Image
                width={50}
                height={50}
                loading="lazy"
                priority={false}
                src={postData.coAuthorImage || "https://via.placeholder.com/40"}
                alt={`Co-author picture of ${postData.coAuthorName}`}
                className="rounded-full w-10 h-10 transition duration-300 ease-in-out transform hover:scale-105"
              />
              <div>
                <p className="text-sm max-xs:text-xs quicksand-semibold transition duration-300 ease-in-out transform hover:scale-105">
                  Co-author
                </p>
                <p className="text-sm max-xs:text-xs quicksand-semibold transition duration-300 ease-in-out transform hover:scale-105">
                  {postData.coAuthorName || " "} | {postData.coAuthorDesignation || " "}
                </p>
              </div>
            </a>
          )}
        </div>

      </div>

      {/* Right Section (Image Section) */}
      <div className="w-2/5 flex justify-center h-auto max-lg:w-0">
        <Image
          width={900}
          height={900}
          loading="lazy" // Lazy loading for performance
          priority={false}
          src={postData.ogImage || "/blog_home/blog_home.png"}
          alt={`Illustration for ${postData.title || "the blog"}`} // Improved alt text for accessibility
          className="rounded-lg w-full h-auto max-lg:hidden"
        />
      </div>
    </div>
  );
});
