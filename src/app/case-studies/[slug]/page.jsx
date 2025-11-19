import fs from "fs";
import matter from "gray-matter";
import Markdown from "markdown-to-jsx";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import authorMetadata from "../../../../posts/_authorData";
import postMetaData from "../../../../posts/_postMetadata";
import HeadBanner from "./headBanner";
import NotFound from "./NotFound";
import Outline from "./outline";
import Analytics from "./analytics";
import VideoTestimonials from "./testimonials";
import MoreCaseStudies from "../../../Components/MoreCaseStudies";
import CTA from "../../../Components/CTA/CTA";
import CustomCTA from "./cta";
import CaseStudyLayout from "./CaseStudyLayout";
import CaseStudySidebar from "./CaseStudySidebar";
import { Videos, TerrateamVideos } from "./_videoData";
// Utility function to check if the post file exists
const isValid = (slug) => {
  const folder = "posts/";
  const file = `${folder}${slug}.md`;
  return fs.existsSync(file);
};

// Function to retrieve the post content
const getPostContent = (slug) => {
  const folder = "posts/";
  const file = `${folder}${slug}.md`;
  const content = fs.readFileSync(file, "utf8");
  const matterResult = matter(content);
  return matterResult.content;
};


// Generate static paths for dynamic routes - ONLY for case studies
export const generateStaticParams = async () => {
  return postMetaData
    .filter((post) => post.category === "Case Studies")
    .map((post) => ({
      slug: post.slug,
    }));
};

// Dynamically generate metadata for each post
export async function generateMetadata({ params }) {
  const post = postMetaData.find((element) => element.slug === params.slug);

  if (!post) {
    return {
      title: "Case Study Not Found",
      description: "The case study you are looking for does not exist.",
    };
  }

  if (post.category !== "Case Studies") {
    return {
      title: "Invalid Route",
      description: "This content is not a case study.",
    };
  }

  return {
    title: post.metatitle || post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      images: [
        {
          url: post.ogImage || "/blog_home/blog_home.png",
        },
      ],
    },
  };
}

// Main PostPage component
const PostPage = (props) => {
  const slug = props.params.slug;

  // Check if the post exists
  if (!isValid(slug)) {
    return notFound();
  }

  // Get the post data and check its category
  const postData = postMetaData.find((element) => element.slug === slug);

  // If not found or not a case study, redirect or show 404
  if (!postData) {
    return notFound();
  }

  // If this content is not a case study, redirect to the blog version
  if (postData.category !== "Case Studies") {
    return redirect(`/blog/${slug}`);
  }

  const postContent = getPostContent(slug);
  const authorObj = authorMetadata.find(
    (element) => element.authorId === postData.authorId
  );
  postData.authorName = authorObj.name;
  postData.authorImage = authorObj.profilePic;
  postData.authorLinkedin = authorObj.linkedIn;
  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        #headBanner {
          position: relative;
          z-index: 30;
        }
      `}} />
      <div className="pt-32 pb-12" style={{ overflow: 'visible', position: 'relative', zIndex: 1 }}>
        <HeadBanner postData={postData} />

        <CaseStudyLayout
          toc={<Outline content={postContent} />}
          sidebar={
            <CaseStudySidebar
              companyHighlights={postData.companyHighlights}
              title={postData.title}
            />
          }
        >
          {/* Mobile & Tablet: TOC and Sidebar stack below intro */}
          <div className="xl:hidden space-y-6 my-6">
            <div className="w-full">
              <Outline content={postContent} />
            </div>
            <div className="w-full max-w-2xl space-y-6">
              <CaseStudySidebar
                companyHighlights={postData.companyHighlights}
                title={postData.title}
              />
            </div>
          </div>

          <div className="pt-2 lg:pt-15 flex flex-col items-start">
            <Analytics postData={postData} />

            <article className="text-white prose-p:quicksand-medium prose-p:lg:text-justify prose-p:text-lg prose-ul:text-lg prose-img:w-full prose-img:h-full prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl 2xl:prose-2xl dark:prose-invert">
              <div className="w-full" style={{ maxWidth: '100%' }}>
                <Markdown
                  options={{
                    overrides: {
                      img: {
                        component: ({ src, alt }) => {
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
                            if (src === "/PostImages/case-study-series-a-cloud-developer-marketing/3.png") {
                              return (
                                <span style={{display:"flex",justifyContent:"center", maxWidth: '100%', overflow: 'hidden'}}>
                                  <img
                                    src={src}
                                    alt={alt}
                                    loading="lazy"
                                    style={{ maxWidth: "100%", width: "500px", height: "auto", aspectRatio: "1/1" }}
                                  />
                                </span>
                              );
                            } else if (src === "/PostImages/case-study-series-a-cloud-developer-marketing/2.png") {
                              return (
                                <span style={{display:"flex",justifyContent:"center", maxWidth: '100%', overflow: 'hidden'}}>
                                  <img
                                    src={src}
                                    alt={alt}
                                    loading="lazy"
                                    style={{ maxWidth: "100%", width: "650px", height: "auto", aspectRatio: "650/450" }}
                                  />
                                </span>
                              );
                            } else {
                              return (
                                <img
                                  src={src}
                                  alt={alt}
                                  loading="lazy"
                                  style={{ width: "100%", maxWidth: "100%", height: "auto" }}
                                />
                              );
                            }
                          }

                          return (
                            <div style={{ maxWidth: '100%', overflow: 'hidden' }}>
                              <Image
                                loading="lazy"
                                src={src}
                                alt={alt}
                                width={900}
                                height={900}
                                unoptimized={true}
                                style={{ maxWidth: '100%', height: 'auto' }}
                              />
                            </div>
                          );
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
                                                                <CustomCTA
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
            </article>
          </div>
        </CaseStudyLayout>
        {postData.slug === "case-study-series-a-cloud-developer-marketing" ?
        <div className="flex justify-center items-center w-[80%] mx-auto"><VideoTestimonials items={Videos}/></div> : 
        postData.slug === "terrateam-case-study" ?
        <div className="flex justify-center items-center w-[80%] mx-auto"><VideoTestimonials items={TerrateamVideos}/></div> : null}
        
        {/* CTA Section */}
        <div className="w-[80%] mx-auto">
          <CTA 
            title="Ready to achieve similar results for your startup?"
            description="Let's discuss how we can help you scale through technical content and developer marketing."
            buttonText="Book a Call"
          />
        </div>

        {/* More Case Studies Section */}
        <div className="w-[80%] mx-auto mt-16">
          <MoreCaseStudies currentSlug={postData.slug} />
        </div>

        {/* Back to Developer Marketing Services */}
        <div className="w-[80%] mx-auto mt-12 mb-8 text-center">
          <Link
            href="/services/developer-marketing-agency"
            className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#0B0B14] rounded-md px-3 py-2"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Developer Marketing services
          </Link>
        </div>
      </div>
    </>
  );
};

export default PostPage;
