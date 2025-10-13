import fs from "fs";
import path from "path";
import Markdown from "markdown-to-jsx";
import matter from "gray-matter";
import { notFound, redirect } from "next/navigation";
import postMetaData from "../../../../posts/_postMetadata";
import Outline from "./outline";
import HeadBanner from "./headBanner";
import BookDemo from "../../book-a-demo/cta";
import Featured from "./featured";
import authorMetadata from "../../../../posts/_authorData";
import NotFound from "./NotFound";
import Image from "next/image";
import CTA2 from "./cta2";
import CTA from "./cta"
import Head from "next/head";



// Utility function to check if the post file exists
const isValid = (slug) => {
  try {
    const folder = "posts/";
    const file = path.join(process.cwd(), folder, `${slug}.md`);
    return fs.existsSync(file);
  } catch (error) {
    console.error(`Error checking file existence for slug: ${slug}`, error);
    return false;
  }
};

// Function to retrieve the post content
const getPostContent = (slug) => {
  try {
    const folder = "posts/";
    const file = path.join(process.cwd(), folder, `${slug}.md`);

    if (!fs.existsSync(file)) {
      throw new Error(`Post file not found: ${file}`);
    }

    const content = fs.readFileSync(file, "utf8");
    const matterResult = matter(content);
    return matterResult.content;
  } catch (error) {
    console.error(`Error reading post content for slug: ${slug}`, error);
    return "";
  }
};

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
          isValid(post.slug);
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
    if (!isValid(slug)) {
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

    // Safely get author data
    let authorObj = null;
    if (authorMetadata && Array.isArray(authorMetadata) && postData.authorId) {
      authorObj = authorMetadata.find(
        (element) => element.authorId === postData.authorId
      );
    }

    // Safely assign author properties
    if (authorObj) {
      postData.authorName = authorObj.name || "";
      postData.authorImage = authorObj.profilePic || "";
      postData.authorLinkedin = authorObj.linkedIn || "";
    } else {
      postData.authorName = "";
      postData.authorImage = "";
      postData.authorLinkedin = "";
    }

    // Get outline - Extract headings safely
    let headingLines = [];
    if (postContent && typeof postContent === 'string') {
      headingLines = postContent
        .split('\n')
        .filter((line) => line.startsWith('## ') && line.trim() !== '##')
        .map(line => line.trim().replace(/\*\*/g, ''));
    }
let faqSchema = [];
let inFAQ = false;
let currentQuestion = "";
let currentAnswer = "";

const lines = postContent.split('\n');

for (let line of lines) {
  line = line.trim();

  // Start FAQ section
  if (!inFAQ && /^##\s*\**(FAQ|FAQs|Frequently Asked Questions)\**/i.test(line)) {
    inFAQ = true;
    continue;
  }

  if (inFAQ) {
    // Detect numbered question
    const questionMatch = line.match(/^\d+\.\s*\**(.+?)\**$/);
    if (questionMatch) {
      // Push previous Q&A
      if (currentQuestion && currentAnswer) {
        faqSchema.push({
          "@type": "Question",
          name: currentQuestion,
          acceptedAnswer: { "@type": "Answer", text: currentAnswer.trim() }
        });
      }
      currentQuestion = questionMatch[1].trim();
      currentAnswer = "";
      continue;
    }

    // If next main heading starts, end FAQ
    if (/^##\s+/.test(line) && !/^##\s*\**(FAQ|FAQs|Frequently Asked Questions)\**/i.test(line)) {
      if (currentQuestion && currentAnswer) {
        faqSchema.push({
          "@type": "Question",
          name: currentQuestion,
          acceptedAnswer: { "@type": "Answer", text: currentAnswer.trim() }
        });
      }
      inFAQ = false;
      currentQuestion = "";
      currentAnswer = "";
      continue;
    }

    // Line is part of answer
    if (line.length > 0) {
      currentAnswer += (currentAnswer ? " " : "") + line;
    }
  }
}

// Push last Q&A
if (inFAQ && currentQuestion && currentAnswer) {
  faqSchema.push({
    "@type": "Question",
    name: currentQuestion,
    acceptedAnswer: { "@type": "Answer", text: currentAnswer.trim() }
  });
}

    return (
      <>
      <Head>
  {faqSchema.length > 0 && (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqSchema
        }),
      }}
    />
  )}
</Head>

        <div className="pt-32 flex flex-col justify-center items-center">
          <HeadBanner postData={postData} />
          <div className="flex justify-around w-full pb-16 px-10 max-lg:flex-col">
            <div className=" max-lg:w-full max-lg:flex justify-center">
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
            <div className="w-[40%] min-[1900px]:w-[80%] max-lg:w-[60%] max-md:w-[70%] pt-2 lg:pt-15 flex justify-center flex-col items-start lg:ml-10">
              <article className="text-white prose-p:quicksand-medium prose-p:lg:text-justify prose-p:text-lg prose-ul:text-lg prose-img:w-full prose-img:h-full prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl 2xl:prose-2xl dark:prose-invert mx-auto">
                <div className="max-lg:w-[84vw] min-[1900px]:w-[45vw] max-[1537px]:w-[50vw]">
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

                              if (headingIndex === 2) {
                                ctaToShow = "first";
                              }
                              else if (totalHeadings > 4 && headingIndex === totalHeadings - 2) {
                                ctaToShow = "second";
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
                                  <h2 {...props} className="mt-10 mb-4 text-2xl font-bold">
                                    {children}
                                  </h2>
                                </>
                              );
                            } catch (error) {
                              console.error("Error in h2 component:", error);
                              return <h2 {...props} className="mt-10 mb-4 text-2xl font-bold">{children}</h2>;
                            }

                          },
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
            <div className=" max-lg:w-full max-lg:flex justify-center">
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
        <div className="mb-20"></div>
      </>
    );
  } catch (error) {
    console.error("Error in PostPage component:", error);
    return notFound();
  }
};

export default PostPage;
