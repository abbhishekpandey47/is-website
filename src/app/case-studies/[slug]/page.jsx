import fs from "fs";
import matter from "gray-matter";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import authorMetadata from "../../../../posts/_authorData";
import postMetaData from "../../../../posts/_postMetadata";
import MoreCaseStudies from "../../../Components/MoreCaseStudies";
import SummarizeBar from "../../blog/[slug]/summarizeBar";
import { TerrateamVideos, Videos } from "./_videoData";
import Analytics from "./analytics";
import CaseStudyLayout from "./CaseStudyLayout";
import CaseStudySidebar from "./CaseStudySidebar";
import HeadBanner from "./headBanner";
import Outline from "./outline";
import PostContent from "./PostContent";
import VideoTestimonials from "./testimonials";

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
  // Await params as required by Next.js 15+
  const resolvedParams = await params;
  const post = postMetaData.find((element) => element.slug === resolvedParams.slug);

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
    description: post.metaDescription,
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
const PostPage = async (props) => {
  // Await params as required by Next.js 15+
  const resolvedParams = await props.params;
  const slug = resolvedParams.slug;

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
  postData.designation = authorObj.designation;
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

        {/* Summarize with AI for Case Studies */}
        <div className="flex justify-center">
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
        </div>

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

            <PostContent
              postContent={postContent}
              postData={postData}
            />
          </div>
        </CaseStudyLayout>
        {postData.slug === "case-study-series-a-cloud-developer-marketing" ?
        <div className="flex justify-center items-center w-[80%] mx-auto"><VideoTestimonials items={Videos}/></div> :
        postData.slug === "terrateam-case-study" ?
        <div className="flex justify-center items-center w-[80%] mx-auto"><VideoTestimonials items={TerrateamVideos}/></div> : null}


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
