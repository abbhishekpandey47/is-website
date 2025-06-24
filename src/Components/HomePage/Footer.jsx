import {
  GithubOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  SlackOutlined,
  XOutlined,
  YoutubeFilled,
} from "@ant-design/icons";
import Image from "next/image";
import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-zing-800 backdrop-blur-lg py-4 px-14 mt-8 text-white flex justify-center flex-col w-full opacity-1 footerClassHome">
      <div className="flex flex-col gap-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-start w-full border-t border-[#999] pt-12 max-lg:flex-col max-lg:gap-10">
          <div className="w-full lg:w-1/3 flex flex-col items-start space-y-4 max-lg:items-center max-lg:text-center mb-8 lg:mb-0">
            <Image
              height={640}
              width={131}
              loading="lazy"
              src="/logodata/infrasity_logo.png"
              alt="Infra Logo"
              className="w-[30%]"
            />
            <p className="w-full lg:w-4/5">
              Amplifying product visibility through technical content and SEO
              that drives awareness and boosts search rankings.
            </p>
            <div className="flex gap-x-4 max-lg:w-full max-lg:justify-center">
              <Image
                loading="lazy"
                width={100}
                height={100}
                src="/awards/color-badge.svg"
                alt="AICPA SOC"
                className="h-20 max-sm:h-16"
              />
              <Image
                loading="lazy"
                width={100}
                height={100}
                src="/awards/clutch.svg"
                alt="GDPR"
                className="h-20 max-sm:h-16"
              />
            </div>
            <a
              href="https://www.producthunt.com/posts/infrasity-outline-generator-2?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-infrasity&#0045;outline&#0045;generator&#0045;2"
              target="_blank"
              className="inline-block"
              rel="noopener noreferrer"
            >
              <img
                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=544443&theme=light"
                alt="Infrasity Outline Generator - Assisting Engineering Startups with tech Content | Product Hunt"
                className="w-[250px] h-[54px]"
              />
            </a>
          </div>

          <div className="w-full lg:w-2/3 flex flex-wrap max-lg:justify-center lg:pl-32">
            {/* Tools section - made full width on small screens */}
            <div className="w-full sm:w-1/2 lg:w-1/4 mb-8 lg:mb-0 text-center sm:text-left">
              <h3 className="font-bold mb-4">Tools</h3>
              <ul className="space-y-3">
                <li>
                  <a href="/roi-cal" className="hover:underline">
                    ROI Calculator
                  </a>
                </li>
              </ul>
              <h3 className="font-bold mb-2 mt-5">Awards</h3>
              <ul className="space-y-3">
                <li>
                  <div className="flex items-center justify-center flex-grow gap-0 sm:gap-2 text-xs sm:text-sm md:text-base">
                    <Link
                      href="https://hackernoon.com/startups/winner-award?type=city&slug=asia-new-delhi-dl-india&rank=1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      <span className="z-10">
                        #1 Startup in New Delhi,India
                      </span>
                      <Image
                        height={640}
                        width={131}
                        loading="lazy"
                        src="/awards/HackerNoon_Logo.png"
                        alt="Infra Logo"
                        className="w-[100%] lg:w-[80%] mt-2"
                      />
                    </Link>
                  </div>
                </li>
              </ul>
              <h3 className="font-bold mb-2 mt-5">Mentioned</h3>
              <ul className="space-y-3">
                <li>
                  <div className="items-center justify-center flex-grow ">
                    <Link
                      href="https://content.techgig.com/leadership/revolutionizing-engineering-content-infrasitys-approach-to-developer-focused-resources/articleshow/120793276.cms"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      <span className="z-10">Recognized by TechGig</span>
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
            {/* Services section - made full width on small screens */}
            <div className="w-full sm:w-1/2 lg:w-1/4 mb-8 lg:mb-0 text-center sm:text-left">
              <h3 className="font-bold mb-4">Services</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="/services/technical-writing-services"
                    className="hover:underline lg:mr-2"
                  >
                    Technical Writing Services
                  </a>
                </li>
                <li>
                  <a
                    href="/services/service-video-production"
                    className="hover:underline"
                  >
                    Video Production
                  </a>
                </li>
                <li>
                  <a
                    href="/services/webflow-agency"
                    className="hover:underline"
                  >
                    Webflow Agency
                  </a>
                </li>
                <li>
                  <a
                    href="/services/reddit-marketing-services"
                    className="hover:underline"
                  >
                    Reddit Marketing Services
                  </a>
                </li>
                {/* //reddit-marketing-services */}
              </ul>
            </div>

            {/* Resources section - made full width on small screens */}
            <div className="w-full sm:w-1/2 lg:w-1/4 mb-8 lg:mb-0 text-center sm:text-left">
              <h3 className="font-bold mb-4">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <a href="/" className="hover:underline">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/blog" className="hover:underline">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="/case-studies" className="hover:underline">
                    Case Studies
                  </a>
                </li>
                <li>
                  <a href="/faq" className="hover:underline">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:underline">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Follow us section - made full width on small screens */}
            <div className="w-full sm:w-1/2 lg:w-1/4 text-center sm:text-left">
              <h3 className="font-bold mb-4">Follow us</h3>
              <ul className="space-y-3">
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
                    href="https://x.com/InfrasityHub"
                    rel="noopener noreferrer"
                    target="_blank"
                    className="hover:underline flex items-center justify-center sm:justify-start gap-2"
                  >
                    <span>
                      <XOutlined />
                    </span>
                    X
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
                <li>
                  <a
                    href="https://www.instagram.com/infrasity/"
                    rel="noopener noreferrer"
                    target="_blank"
                    className="hover:underline flex items-center justify-center sm:justify-start gap-2"
                  >
                    <span>
                      <InstagramOutlined />
                    </span>
                    Instagram
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

export default Footer;
