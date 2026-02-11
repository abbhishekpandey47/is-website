"use client";

import {
  GithubOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  MailOutlined,
  XOutlined,
  YoutubeFilled,
} from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AdsFooter = () => {
  const pathname = usePathname() ?? "";
  const isGeoPage = pathname.startsWith("/services/ai-geo-optimization-agency");
  const heroDescription = isGeoPage
    ? "AI visibility & GEO optimization services for B2B SaaS and devtool startups. Strategic, data-backed and execution-focused. Infrasity tracks your brand’s presence across ChatGPT, Gemini, Perplexity and AI Overviews measuring prompt rankings, citation share, sentiment and competitive positioning and aligns your narrative to win inside answer engines."
    : "Reddit marketing services for B2B SaaS startups. Fast, result-driven and execution ready. Infrasity tracks your upvotes, thread visibility, comment rankings, sentiment, etc and align on your startup's positioning.";
  return (
    <footer className="bg-zing-800 backdrop-blur-lg py-4 px-14 mt-8 text-white flex justify-center flex-col w-full opacity-1 footerClassHome">
      <div className="flex flex-col gap-6">
        <div className="max-w-7xl justify-between mx-auto flex flex-wrap items-start w-full border-t border-[#999] pt-12 max-lg:flex-col max-lg:gap-10">
          <div className="w-full lg:w-1/4 flex flex-col items-start space-y-4 max-lg:items-center max-lg:text-center mb-8 lg:mb-0">
            <Image
              height={640}
              width={131}
              loading="lazy"
              src="/logodata/infrasity_logo.png"
              alt="Infra Logo"
              className="w-[50%]"
            />
            <p className="w-full lg:w-4/5">
             {heroDescription}
            </p>
          </div>

          <div className="flex flex-wrap max-lg:justify-center">

            {/* Services section */}
            <div className="mb-8 lg:mb-0 text-center sm:text-left">
              <h3 className="font-bold mb-4">Services</h3>
              <div className="flex">
              <div>
              <ul className="space-y-3 pr-4">
                <li>
                  <a
                    // href="/services/developer-marketing-agency"
                    className="hover:underline lg:mr-2"
                  >
                    Developer Marketing Agency
                  </a>
                </li>
                <li>
                  <a
                    // href="/services/ai-geo-optimization-agency"
                    className="hover:underline lg:mr-2"
                  >
                    AEO/GEO Services 
                  </a>
                </li>
                <li>
                  <a
                    // href="/services/technical-writing-services"
                    className="hover:underline lg:mr-2"
                  >
                    Technical Writing Services
                  </a>
                </li>
                {/* //reddit-marketing-services */}
              </ul>
              </div>
              <div>
              <ul className="space-y-3 pr-4">
                <li>
                  <a
                    // href="/services/service-video-production"
                    className="hover:underline"
                  >
                    Video Production
                  </a>
                </li>
                <li>
                  <a
                    // href="/services/webflow-agency"
                    className="hover:underline"
                  >
                    Webflow Agency
                  </a>
                </li>
                <li>
                  <a
                    // href="/services/reddit-marketing-services"
                    className="hover:underline"
                  >
                    Reddit Marketing Services
                  </a>
                </li>
              </ul>
              </div>
              </div>
            </div>
          </div>
             <div className="flex flex-wrap max-lg:justify-center">
          {/* Follow us section */}
            <div className="text-center sm:text-left">
              <h3 className="font-bold mb-4">Follow us</h3>
              <ul className="space-y-3 pr-4">
                <li>
                  <a
                    href="https://www.youtube.com/@Infrasity"
                    rel="noopener noreferrer"
                    target="_blank"
                    className="hover:underline flex items-center justify-center sm:justify-start gap-2"
                  >
                    <span>
                      <YoutubeFilled />
                    </span>
                    Youtube
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/company/infrasity/"
                    rel="noopener noreferrer"
                    target="_blank"
                    className="hover:underline flex items-center justify-center sm:justify-start gap-2"
                  >
                    <span>
                      <LinkedinOutlined />
                    </span>
                    LinkedIn
                  </a>
                </li>
              </ul>
              <h3 className="font-bold my-4">Contact</h3>
              <ul className="space-y-3 pr-4">
                <li>
                  <a
                    href="mailto:contact@infrasity.com"
                    className="hover:underline flex items-center justify-center sm:justify-start gap-2"
                  >
                    <span>
                      <MailOutlined />
                    </span>
                    contact@infrasity.com
                  </a>
                </li>

              </ul>
            </div>
            </div>

        </div>

        {/* Copyright section with the changes you requested */}
        <div className="border-t w-full border-[#999] mt-4 pt-4 text-sm flex items-center max-w-7xl mx-auto">
          {" "}
          <div className="flex max-xs:text-xs max-xs:flex-col gap-1 w-1/2">
            {" "}
            <div>© 2025 Infrasity. All rights reserved.</div>{" "}
          </div>{" "}
          <div className="flex max-xs:text-xs max-sm:flex-col w-1/2 justify-end items-end max-sm:gap-1 gap-3">
            {" "}
            <Link href="/privacy-policy" className="hover:underline">
              {" "}
              Privacy Policy{" "}
            </Link>{" "}
            <Link href="/terms-of-services" className="hover:underline">
              {" "}
              Terms of Service{" "}
            </Link>{" "}
          </div>{" "}
        </div>
      </div>
    </footer>
  );
};

export default AdsFooter;
