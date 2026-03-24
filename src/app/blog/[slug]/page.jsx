import Markdown from "markdown-to-jsx";
import Image from "next/image";
import Script from "next/script";
import { notFound, redirect } from "next/navigation";
import authorMetadata from "../../../../posts/_authorData";
import postMetaData from "../../../../posts/_postMetadata";
import BookDemo from "../../book-a-demo/cta";
import CTA from "./cta";
import CTA2 from "./cta2";
import Featured from "./featured";
import HeadBanner from "./headBanner";
import Outline from "./outline";
import SummarizeBar from "./summarizeBar";
import { buildFAQSchema, getPostContent, isValidPostSlug } from "@/lib/postUtils";

// Generate static paths for dynamic routes - ONLY for blog posts and tutorials
export const generateStaticParams = async () => {
  try {
    if (!postMetaData || !Array.isArray(postMetaData)) {
      console.error("postMetaData is not available or not an array");
      return [];
    }

    const validPosts = postMetaData
      .filter((post) => {
        // Check if post has required fields and is not a case study
        return post &&
          post.slug &&
          post.category !== "Case Studies" &&
          isValidPostSlug(post.slug);
      })
      .map((post) => ({
        slug: post.slug,
      }));

    console.log(`Generated ${validPosts.length} static params for blog posts`);
    return validPosts;
  } catch (error) {
    console.error("Error in generateStaticParams:", error);
    return [];
  }
};

// Dynamically generate metadata for each post
export async function generateMetadata({ params }) {
  try {
    const {slug} = await params
    if (!params || !slug) {
      return {
        title: "Post Not Found",
        description: "Invalid post parameters.",
      };
    }

    if (!postMetaData || !Array.isArray(postMetaData)) {
      return {
        title: "Post Not Found",
        description: "Post metadata not available.",
      };
    }

    const post = postMetaData.find((element) => element.slug === slug);

    if (!post) {
      return {
        title: "Post Not Found",
        description: "The post you are looking for does not exist.",
      };
    }

    if (post.category === "Case Studies") {
      return {
        title: "Invalid Route",
        description:
          "This content is a case study and should be accessed through the case-studies route.",
      };
    }

    return {
      title: post.metatitle || post.title || "Blog Post",
      description: post.metaDescription || "Blog post description",
      openGraph: {
        title: post.title || "Blog Post",
        description: post.metaDescription || post.description || "Blog post description",
        images: [
          {
            url: post.ogImage || "/blog_home/blog_home.png",
          },
        ],
      },
    };
  } catch (error) {
    console.error("Error in generateMetadata:", error);
    return {
      title: "Error",
      description: "An error occurred while generating metadata.",
    };
  }
}
const ImageHeight = [
  {
    src: "/PostImages/why-startups-hiring-devrel-engineers/1.png",
    width: 400,
    height: 550,
  },
  {
    src: "/PostImages/developer-marketing-strategy/3.png",
    width: 400,
    height: 500,
  },
  {
    src: "/PostImages/developer-marketing-strategy/10.png",
    width: 550,
    height: 600,
  },
  {
    src: "/PostImages/developer-marketing-strategy/11.png",
    width: 550,
    height: 600,
  }, {
    src: "/PostImages/developer-marketing-strategy/7.png",
    width: 550,
    height: 600,
  },
  // KubeAuto Day Europe 2026
  { src: "/PostImages/kubeauto-day-europe-2026-kubecon/2.webp", width: 400, height: 500 },
  { src: "/PostImages/kubeauto-day-europe-2026-kubecon/3.webp", width: 400, height: 500 },
  { src: "/PostImages/kubeauto-day-europe-2026-kubecon/4.webp", width: 400, height: 500 },
  { src: "/PostImages/kubeauto-day-europe-2026-kubecon/5.webp", width: 400, height: 500 },
  { src: "/PostImages/kubeauto-day-europe-2026-kubecon/6.webp", width: 400, height: 500 },
];

// Main PostPage component
const PostPage = async (props) => {
  try {
    const {slug} = await props.params;

    if (!slug) {
      console.error("No slug provided in params");
      return notFound();
    }

    // Check if the post exists
    if (!isValidPostSlug(slug)) {
      console.error(`Post file not found for slug: ${slug}`);
      return notFound();
    }

    // Check if postMetaData is available
    if (!postMetaData || !Array.isArray(postMetaData)) {
      console.error("postMetaData is not available or not an array");
      return notFound();
    }

    // Get the post data and check its category
    const postData = postMetaData.find((element) => element.slug === slug);

    // If not found, show 404
    if (!postData) {
      console.error(`Post data not found for slug: ${slug}`);
      return notFound();
    }

    // If this is a case study, redirect to the case study version
    if (postData.category === "Case Studies") {
      return redirect(`/case-studies/${slug}`);
    }

    const postContent = getPostContent(slug);

    if (!postContent) {
      console.error(`Post content could not be loaded for slug: ${slug}`);
      return notFound();
    }

    const faqSchema = buildFAQSchema(postContent);
    const faqJsonLd =
      faqSchema && faqSchema.length
        ? {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqSchema,
          }
        : null;

    // Safely get author and optional co-author data
    let authorObj = null;
    let coAuthorObj = null;
    if (authorMetadata && Array.isArray(authorMetadata) && postData.authorId) {
      authorObj = authorMetadata.find(
        (element) => element.authorId === postData.authorId
      );

      if (postData.coAuthorId) {
        coAuthorObj = authorMetadata.find(
          (element) => element.authorId === postData.coAuthorId
        );
      }
    }

    // Safely assign author properties (with optional co-author separate)
    if (authorObj) {
      postData.authorName = authorObj.name || "";
      postData.authorImage = authorObj.profilePic || "";
      postData.authorLinkedin = authorObj.linkedIn || "";
      postData.designation = authorObj.designation || "";
      postData.coAuthorName = coAuthorObj?.name || "";
      postData.coAuthorImage = coAuthorObj?.profilePic || "";
      postData.coAuthorLinkedin = coAuthorObj?.linkedIn || "";
      postData.coAuthorDesignation = coAuthorObj?.designation || "";
    } else {
      postData.authorName = "";
      postData.authorImage = "";
      postData.authorLinkedin = "";
      postData.designation = "";
      postData.coAuthorName = "";
      postData.coAuthorImage = "";
      postData.coAuthorLinkedin = "";
      postData.coAuthorDesignation = "";
    }

    // Get outline - Extract headings safely
    let headingLines = [];
    if (postContent && typeof postContent === 'string') {
      headingLines = postContent
        .split('\n')
        .filter((line) => line.startsWith('## ') && line.trim() !== '##')
        .map(line => line.trim().replace(/\*\*/g, ''));
    }
    return (
      <>
        <div className="pt-32 flex flex-col justify-center items-center">
          <HeadBanner postData={postData} />
          {/* Show Summarize with AI for all blog posts */}
          <SummarizeBar
            blogData={{
              title: postData.title,
              description: postData.description,
              content: postContent,
              authorName: postData.authorName,
              category: postData.category,
              slug: slug,
            }}
          />
          <div className="flex items-start w-full pb-16 px-4 lg:px-8 gap-8 xl:gap-12 max-lg:flex-col">
            {/* Left sidebar — sticky, fixed width */}
            <div className="shrink-0 w-[18rem] max-xl:w-[13rem] max-lg:w-full max-lg:flex max-lg:justify-center overflow-hidden md:sticky top-[82px] self-start">
              <Outline content={postContent} />
            </div>
            <div className="h-auto hidden max-lg:flex max-lg:justify-center">
              <div className="w-[84vw]">
                <img
                  src={
                    postData.ogImage ||
                    "https://www.infrasity.com/wp-content/uploads/2024/09/Untitled-design-1-1.png"
                  }
                  alt="Content Illustration"
                  className="w-full h-auto text-center"
                />
              </div>
            </div>
            {/* Center article — capped width, centered in remaining space */}
            <div className="flex-1 min-w-0 max-w-[680px] mx-auto pt-2 lg:pt-15">
              <article className="relative z-10 text-white prose-p:quicksand-medium prose-p:lg:text-justify prose-p:text-lg prose-ul:text-lg prose-img:w-full prose-img:h-full prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl 2xl:prose-2xl dark:prose-invert prose-pre:max-w-full prose-pre:overflow-x-auto prose-code:break-words prose-p:break-words prose-li:break-words">
                <div className="max-lg:w-[84vw] w-full max-w-full overflow-x-hidden">
                  <Markdown
                    options={{
                      overrides: {
                        h2: {
                          component: ({ children, ...props }) => {
                            try {
                              const headingText =
                                typeof children === "string"
                                  ? children
                                  : Array.isArray(children)
                                    ? children[0]?.props?.children[0] || children[0]
                                    : "";
                              const normalizedHeading = String(headingText).trim().toLowerCase();
                              const headingIndex = headingLines.findIndex(
                                line => line.replace('## ', '').trim().toLowerCase() === normalizedHeading
                              );

                              const totalHeadings = headingLines.length;

                              let ctaToShow = null;
                              const newCta = headingLines.find((line) =>
                                typeof line === 'string' && line.toLowerCase().startsWith("## cta")
                              );
                              const customCTA =
                                typeof headingText === 'string' &&
                                headingText.split(":")[0].trim().toLowerCase() === "cta";

                              if (!newCta) {
                                if (headingIndex === 2) {
                                  ctaToShow = "first";
                                }
                                else if (totalHeadings > 4 && headingIndex === totalHeadings - 2) {
                                  ctaToShow = "second";
                                }
                              }

                              return (
                                <>
                                  {ctaToShow === "first" && (
                                    <div className="my-8 mb-10">
                                      <CTA text="Tired of wasting engineering time on content?" />
                                    </div>
                                  )}
                                  {ctaToShow === "second" && (
                                    <div className="my-8 mb-10">
                                      <CTA2 />
                                    </div>
                                  )}
                                  {customCTA ? (
                                    <div className="my-8 mb-10">
                                      {(() => {
                                        const source = (typeof headingText === 'string' && headingText.includes(':'))
                                          ? headingText
                                          : (typeof newCta === 'string' ? newCta : '');
                                        const textValue = source.split(":")[1]?.trim();
                                        return (
                                          <CTA
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
                        p:{
                          component: ({ children, ...props }) => (
                            <p style={{"fontWeight":"400"}}  {...props}>
                              {children}
                            </p>
                          ),
                        },
                        li:{
                          component: ({ children, ...props }) => (
                            <li style={{"fontWeight":"400"}} {...props}>
                              {children}
                            </li>
                          ),
                        },
                        strong:{
                          component: ({ children, ...props }) => (
                            <strong style={{"fontWeight":"700"}} {...props}>
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
      <img
        src={matchedImage.src}
        alt={alt || "Image"}
        loading="lazy"
        style={{
          height: `${matchedImage.height}px`,
          width: `${matchedImage.width}px`,
        }}
        {...props}
      />
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
                      },
                    }}
                  >
                    {postContent}
                  </Markdown>
                </div>
              </article>
            </div>
            {/* Right sidebar — sticky, fixed width */}
            <div className="shrink-0 w-[15rem] max-xl:w-[13rem] max-lg:w-full max-lg:flex max-lg:justify-center overflow-hidden sticky top-[82px] self-start">
              <Featured />
            </div>
          </div>
        </div>
        <div
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, #272b45 0%, transparent 40%)",
          }}
        >
          <div className="w-full h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5"></div>
          <div className=" flex justify-center items-center">
            <BookDemo />
          </div>
        </div>
        {faqJsonLd && (
          <Script id="faq-schema" type="application/ld+json" strategy="beforeInteractive">
            {JSON.stringify(faqJsonLd)}
          </Script>
        )}
        <div className="mb-20"></div>
      </>
    );
  } catch (error) {
    console.error("Error in PostPage component:", error);
    return notFound();
  }
};

export default PostPage;
