import fs from "fs";
import matter from "gray-matter";
import Markdown from "markdown-to-jsx";
import Image from "next/image";
import { notFound, redirect } from "next/navigation"; // Add this import
import authorMetadata from "../../../../posts/_authorData";
import postMetaData from "../../../../posts/_postMetadata";
import AuthorBanner from "./authorBanner";
import HeadBanner from "./headBanner";
import NotFound from "./NotFound";
import Outline from "./outline";
import Analytics from "./analytics";

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
      <div className="pt-32 pb-12">
        <HeadBanner postData={postData} />

        <Analytics postData={postData} />

        <div className="flex justify-center w-full pb-16 max-lg:flex-col">
          <div className="w-[17%] min-[1900px]:w-[0] 2xl:w-[13%] max-lg:w-full max-lg:pl-[8%] max-xl:w-[21%]">
            {<Outline content={postContent} />}
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

          <div className="w-[70%] min-[1900px]:w-[80%] max-lg:w-[80%] max-md:w-[96%] max-sm:ml-5 pt-2 lg:pt-15 flex justify-center flex-col items-start">
            <article className="text-white prose-p:quicksand-medium prose-p:lg:text-justify prose-p:text-lg prose-ul:text-lg prose-img:w-full prose-img:h-full prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl 2xl:prose-2xl dark:prose-invert mx-auto">
              <div className="max-lg:w-[84vw] min-[1900px]:w-[60vw] max-[1537px]:w-[50vw]">
                <Markdown
                  options={{
                    overrides: {
                      img: {
                        component: ({ src, alt }) => {
                          // Check if the src is a base64 string or a valid URL
                          const isBase64 = src.startsWith("data:image/");
                          const isValidUrl = (url) => {
                            try {
                              new URL(url);
                              return true;
                            } catch {
                              return false;
                            }
                          };

                          // Use next/image for valid URLs, otherwise use a regular img tag
                          if (isBase64 || !isValidUrl(src)) {
                            return (
                              <img
                                src={src}
                                alt={alt}
                                loading="lazy"
                                style={{ width: "100%", height: "auto" }}
                              />
                            );
                          }

                          return (
                            <Image
                              loading="lazy"
                              src={src}
                              alt={alt}
                              width={900}
                              height={900}
                              unoptimized={true}
                            />
                          );
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
        </div>
        <AuthorBanner authorData={authorObj} />
      </div>
    </>
  );
};

export default PostPage;
