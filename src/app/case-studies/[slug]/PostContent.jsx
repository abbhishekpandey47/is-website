"use client";

import Markdown from "markdown-to-jsx";
import Image from "next/image";
import CTA2 from "./cta";
import TestimonialCard from "./testimonialCard";
import { DevZeroCard } from "./testimonialData";

const ImageHeight = [
  {
    src: "/PostImages/case-study-series-a-cloud-developer-marketing/3.png",
    width: 500,
    height: 500,
    mobileWidth: 300,
    mobileHeight: 300,
  },
  {
    src: "/PostImages/case-study-series-a-cloud-developer-marketing/2.png",
    width: 650,
    height: 450,
    mobileWidth: 350,
    mobileHeight: 280,
  },
  { 
    src: "/PostImages/how-notion-grows-strategies/7.webp",
    width: 650,
    height: 650,
    mobileWidth: 300,
    mobileHeight: 350,
  },
  {
    src: "/PostImages/how-notion-grows-strategies/8.webp",
    width: 650,
    height: 650,
    mobileWidth: 300,
    mobileHeight: 350,
  },
  {
    src: "/PostImages/how-notion-grows-strategies/9.webp",
    width: 650,
    height: 650,
    mobileWidth: 300,
    mobileHeight: 350,
  }
];

export default function PostContent({ postContent, postData }) {
  return (
    <article className="text-white prose-p:quicksand-medium prose-p:lg:text-justify prose-p:text-lg prose-ul:text-lg prose-img:w-full prose-img:h-full prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl 2xl:prose-2xl dark:prose-invert">
      <div className="w-full" style={{ maxWidth: '100%' }}>
        <Markdown
          options={{
            overrides: {
              p: {
                component: ({ children, ...props }) => (
                  <p style={{ "fontWeight": "400" }} {...props}>
                    {children}
                  </p>
                ),
              },
              li: {
                component: ({ children, ...props }) => (
                  <li style={{ "fontWeight": "400" }} {...props}>
                    {children}
                  </li>
                ),
              },
              strong: {
                component: ({ children, ...props }) => (
                  <strong style={{ "fontWeight": "700" }} {...props}>
                    {children}
                  </strong>
                ),
              },
              img: {
                component: ({ src, alt, ...props }) => {
                  try {
                    // Safety checks
                    if (!src || typeof src !== 'string') {
                      return <div className="text-gray-500">Image not available</div>;
                    }

                    const isBase64 = src.startsWith("data:image/");
                    const isValidUrl = (url) => {
                      try {
                        new URL(url);
                        return true;
                      } catch {
                        return false;
                      }
                    };

                    if (isBase64 || !isValidUrl(src)) {
                      // Special case: target a single image by its URL
                      const matchedImage = ImageHeight.find((img) => img.src === src);

                      if (matchedImage) {
                        return (
                          <span
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <picture>
                              <source
                                media="(max-width: 768px)"
                                srcSet={matchedImage.src}
                              />
                              <img
                                src={matchedImage.src}
                                alt={alt || "Image"}
                                loading="lazy"
                                style={{
                                  height: `${matchedImage.height}px`,
                                  width: `${matchedImage.width}px`,
                                }}
                                className="responsive-image"
                                {...props}
                              />
                            </picture>
                            <style jsx>{`
                              @media (max-width: 768px) {
                                .responsive-image {
                                  width: ${matchedImage.mobileWidth || matchedImage.width}px !important;
                                  height: ${matchedImage.mobileHeight || matchedImage.height}px !important;
                                }
                              }
                            `}</style>
                          </span>
                        );
                      }

                      return (
                        <img
                          src={src}
                          alt={alt || "Image"}
                          loading="lazy"
                          style={{ width: "100%", height: "auto" }}
                          {...props}
                        />
                      );
                    }

                    return (
                      <Image
                        loading="lazy"
                        src={src}
                        alt={alt || "Image"}
                        width={900}
                        height={900}
                        unoptimized={true}
                        {...props}
                      />
                    );
                  } catch (error) {
                    console.error("Error in img component:", error);
                    return <div className="text-gray-500">Failed to load image</div>;
                  }
                },
              },
              h2: {
                component: ({ children, ...props }) => {
                  try {
                    const headingText =
                      typeof children === "string"
                        ? children
                        : Array.isArray(children)
                          ? children[0]?.props?.children[0] || children[0]
                          : "";
                   

                    let ctaToShow = null;
                    const newCta = headingText === 'string' && headingText.toLowerCase().startsWith("## cta")
                    const customCTA =
                      typeof headingText === 'string' &&
                      headingText.split(":")[0].trim().toLowerCase() === "cta";

                   

                    return (
                      <>
                        {customCTA ? (
                          <div className="my-8 mb-10">
                            {(() => {
                              const source = (typeof headingText === 'string' && headingText.includes(':'))
                                ? headingText
                                : (typeof newCta === 'string' ? newCta : '');
                              const textValue = source.split(":")[1]?.trim();
                              return (
                                <CTA2
                                  text={ textValue || "Tired of wasting engineering time on content?" }
                                />
                              );
                            })()}
                          </div>
                        ) : (
                          <h2
                            {...props}
                            className="mt-10 mb-4 text-2xl font-bold"
                          >
                            {children}
                          </h2>
                        )}
                      </>
                    );
                  } catch (error) {
                    console.error("Error in h2 component:", error);
                    return <h2 {...props} className="mt-10 mb-4 text-2xl font-bold">{children}</h2>;
                  }
                },
              },
            },
          }}
        >
          {postContent}
        </Markdown>
      </div>
      {postData.slug === "case-study-product-documentation" ?
        <TestimonialCard data={DevZeroCard} /> : null
      }
    </article>
  );
}
