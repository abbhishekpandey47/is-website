import fs from "fs";
import matter from "gray-matter";
import path from "path";

const postsDirectory = path.join(process.cwd(), "posts");

export const getPostFilePath = (slug) => path.join(postsDirectory, `${slug}.md`);

export const isValidPostSlug = (slug) => {
  if (!slug || typeof slug !== "string") {
    return false;
  }
  return fs.existsSync(getPostFilePath(slug));
};

export const getPostContent = (slug) => {
  try {
    if (!isValidPostSlug(slug)) {
      return null;
    }

    const file = getPostFilePath(slug);
    const content = fs.readFileSync(file, "utf8");
    const matterResult = matter(content);
    return matterResult.content || "";
  } catch (error) {
    console.error(`Error reading post content for slug: ${slug}`, error);
    return null;
  }
};

const stripMarkdown = (value) =>
  value
    .replace(/\[(.*?)\]\((.*?)\)/g, "$1")
    .replace(/[*_`~]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const FAQ_HEADING_REGEX = /^##\s*\**(FAQ|FAQs|Frequently Asked Questions)\**/i;
const QUESTION_REGEX = /^\d+\.\s*\**(.+?)\**$/;
const MAIN_HEADING_REGEX = /^##\s+/;

export const buildFAQSchema = (postContent) => {
  if (!postContent || typeof postContent !== "string") {
    return [];
  }

  const lines = postContent.split(/\r?\n/);
  const faqSchema = [];
  let inFAQ = false;
  let currentQuestion = "";
  let currentAnswer = "";

  for (let line of lines) {
    line = line.trim();

    if (!inFAQ && FAQ_HEADING_REGEX.test(line)) {
      inFAQ = true;
      continue;
    }

    if (!inFAQ) {
      continue;
    }

    const normalizedLine = line.replace(/^#+\s*/, "");
    const questionMatch = normalizedLine.match(QUESTION_REGEX);
    if (questionMatch) {
      if (currentQuestion && currentAnswer) {
        const sanitizedQuestion = stripMarkdown(currentQuestion);
        const sanitizedAnswer = stripMarkdown(currentAnswer);
        if (sanitizedQuestion && sanitizedAnswer) {
          faqSchema.push({
            "@type": "Question",
            name: sanitizedQuestion,
            acceptedAnswer: { "@type": "Answer", text: sanitizedAnswer },
          });
        }
      }
      currentQuestion = questionMatch[1].trim();
      currentAnswer = "";
      continue;
    }

    if (MAIN_HEADING_REGEX.test(line) && !FAQ_HEADING_REGEX.test(line)) {
      if (currentQuestion && currentAnswer) {
        const sanitizedQuestion = stripMarkdown(currentQuestion);
        const sanitizedAnswer = stripMarkdown(currentAnswer);
        if (sanitizedQuestion && sanitizedAnswer) {
          faqSchema.push({
            "@type": "Question",
            name: sanitizedQuestion,
            acceptedAnswer: { "@type": "Answer", text: sanitizedAnswer },
          });
        }
      }
      inFAQ = false;
      currentQuestion = "";
      currentAnswer = "";
      continue;
    }

    if (line.length > 0) {
      currentAnswer += (currentAnswer ? " " : "") + line;
    }
  }

  if (inFAQ && currentQuestion && currentAnswer) {
    const sanitizedQuestion = stripMarkdown(currentQuestion);
    const sanitizedAnswer = stripMarkdown(currentAnswer);
    if (sanitizedQuestion && sanitizedAnswer) {
      faqSchema.push({
        "@type": "Question",
        name: sanitizedQuestion,
        acceptedAnswer: { "@type": "Answer", text: sanitizedAnswer },
      });
    }
  }

  return faqSchema;
};