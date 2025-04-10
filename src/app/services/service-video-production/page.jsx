"use client";
import React, { useState, useEffect, useContext, useMemo } from "react";
import { ArrowRightOutlined, PlayCircleOutlined } from "@ant-design/icons";
import { gsap } from "gsap";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import _videometadata from "../../../../services-data/_videoMetadata.js";
import SaasGlassyBoxes from "./whychooseus.jsx";

import AppContext from "@/context/Infracontext";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../../Components/ui/pagination.jsx";
import ReadyToStart from "@/Components/HomePage/ReadyToStart";
import HowWorks from "@/Components/HomePage/HowWorks";
import { ScrollTrigger, CustomEase, Power3 } from "gsap/all";
import { MarqueeDemo } from "./MarqueeData.jsx";
import Services from "./services.jsx";
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(CustomEase);

const YtCard = ({ handleOnOpen, item, setYtContentLink }) => {
  const handleOnYtCard = () => {
    if (item.type === "yt") {
      setYtContentLink({
        ytEmbedLink: item.ytEmbedLink,
        title: item.topic,
        category: "Podcasts",
      });
    } else if (item.type === "cdn") {
      setYtContentLink({
        ytEmbedLink: item.vidLink,
        title: item.topic,
        category: "Editorials",
      });
    }
  };
  return (
    <div
      onClick={handleOnYtCard}
      className="w-96 flex items-center rounded-md relative cursor-pointer hover:scale-105 transition-all bg-black ytCardDiv"
    >
      <figure className="flex justify-center items-center">
        {item.type === "yt" ? (
          <img
            className="rounded-md"
            src={`https://img.youtube.com/vi/${item.ytEmbedLink}/hqdefault.jpg`}
            alt="Shoes"
          />
        ) : (
          <img className="rounded-md" src={item.imgLink} alt="Shoes" />
        )}
      </figure>
      <div
        onClick={handleOnOpen}
        className="absolute w-full h-full bg-black top-0 rounded-md opacity-[0] hover:opacity-[0.8] transition-all"
      >
        <div className="w-full h-full flex justify-center items-center absolute">
          <PlayCircleOutlined className="text-3xl" />
        </div>
        <div className="p-5 quicksand-bold h-full flex flex-col justify-end">
          <p>
            Watch Now <ArrowRightOutlined />
          </p>
        </div>
      </div>
    </div>
  );
};

const PopupVideo = ({ handleOnClose, ytContentLink }) => {
  return (
    <>
      <div
        onClick={handleOnClose}
        className="fixed hidden bg-black/10 left-0 top-0 right-0 bottom-0 z-30 backdrop-blur-lg"
        id="popUpDisplayId"
      ></div>
      <div
        className="fixed left-0 top-0 right-0 bottom-0 z-40 backdrop-blur-lg hidden"
        id="videoShowId"
      >
        <div className="flex justify-center">
          <div className="fixed top-[50%] left-[50%] origin-center transform -translate-x-1/2 -translate-y-1/2 bg-zinc-800 p-5 rounded-lg">
            <div className="pb-5 flex justify-between items-center gap-3">
              <div>
                <h2 className="quicksand-bold ">{ytContentLink.title}</h2>
              </div>
              <div className="gap-2 flex">
                {ytContentLink.category === "Podcasts" ? (
                  <a
                    target="_blank"
                    href={`https://www.youtube.com/watch?v=${ytContentLink.ytEmbedLink}`}
                    className="btn bg-btnprimary hover:bg-btnprimaryhov text-white text-center border-none"
                  >
                    Open in new tab
                  </a>
                ) : (
                  <a
                    target="_blank"
                    href={ytContentLink.ytEmbedLink}
                    className="btn bg-btnprimary hover:bg-btnprimaryhov text-white text-center border-none"
                  >
                    Open video new tab
                  </a>
                )}
                <button
                  onClick={handleOnClose}
                  className="btn bg-btnprimary hover:bg-btnprimaryhov text-white text-center border-none"
                >
                  Close
                </button>
              </div>
            </div>
            <div className="pb-5">
              <hr className="border-[#999]" />
            </div>
            <div>
              {ytContentLink.category === "Podcasts" ? (
                <iframe
                  className="rounded-[20px] max-md:w-[630px] max-md:h-[359px] max-sm:w-[350px] max-sm:h-[181px] max-lg:w-[760px] max-lg:h-[439px] shadow-3xl relative p-[2px] bg-gradient-to-r from-purple-600 via-blue-500 to-slate-200"
                  width="950"
                  height="550"
                  src={`https://www.youtube.com/embed/${ytContentLink.ytEmbedLink}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Embedded youtube"
                />
              ) : (
                <iframe
                  className="rounded-[20px] max-md:w-[630px] max-md:h-[359px] max-sm:w-[350px] max-sm:h-[181px] max-lg:w-[760px] max-lg:h-[439px] shadow-3xl relative p-[2px] bg-gradient-to-r from-purple-600 via-blue-500 to-slate-200"
                  width="950"
                  height="550"
                  src={ytContentLink.ytEmbedLink}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Embedded youtube"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

let tabs = [
  { id: "allCategories", label: "All Categories" },
  { id: "Editorials", label: "Editorials" },
  { id: "Podcasts", label: "Podcasts" },
];

const TabDiv = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex space-x-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => {
            setActiveTab(tab.id);
          }}
          className={`max-sm:w-full ${
            activeTab === tab.id ? "" : "hover:text-white/60"
          } relative rounded-full px-6 py-2.5 max-sm:py-1 max-sm:px-1 max-sm:text-xs text-sm quicksand-light text-white outline-sky-400 transition focus-visible:outline-1`}
          style={{
            WebkitTapHighlightColor: "transparent",
          }}
        >
          {activeTab === tab.id && (
            <motion.span
              layoutId="bubble"
              className="absolute inset-0 z-10 bg-white mix-blend-difference"
              style={{ borderRadius: 9999 }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          {tab.label}
        </button>
      ))}
    </div>
  );
};

const serviceArr = [
  {
    head: "Text to video in minutes",
    desc: "Describe your idea, optionally add details such as video length, platform, voiceover accent, and watch as the video gets generated.",
    link: "https://via.placeholder.com/450x450",
  },
  {
    head: "Text to video in minutes",
    desc: "Describe your idea, optionally add details such as video length, platform, voiceover accent, and watch as the video gets generated.",
    link: "https://via.placeholder.com/450x450",
  },
  {
    head: "Text to video in minutes",
    desc: "Describe your idea, optionally add details such as video length, platform, voiceover accent, and watch as the video gets generated.",
    link: "https://via.placeholder.com/450x450",
  },
];

const serviceArrHowWorks = [
  {
    id: "1",
    head: "In-Depth Understanding",
    para: "Our process starts with a deep dive into your product to pinpoint its key features and functionalities, such as integrating your product with existing developer tools. While there may already be guides available, video content makes it easier and faster for users to follow along and understand the process.",
  },
  {
    id: "2",
    head: "Hands-On Testing",
    para: "We conduct hands-on testing to showcase these features, ensuring that the demonstration is authentic and insightful.",
  },
  {
    id: "3",
    head: "Recording the Video",
    para: "A live demonstration is recorded, capturing the essence of your product in action.",
  },
  {
    id: "4",
    head: "Editorial Enhancements",
    para: "The recorded video is handed over to our editorial team, who adds necessary branding elements, logos, and engaging effects. Informative infographics are also incorporated to enhance clarity.",
  },
  {
    id: "5",
    head: "Final Distribution",
    para: "The polished video is then shared with the appropriate communities and channels to maximize its reach and engagement",
  },
];

const serviceArrHowWorks2 = [
  {
    id: "1",
    head: "Faceless Hands-On Showcase",
    para: "We start by recording a faceless demonstration highlighting your product's essential features.",
  },
  {
    id: "2",
    head: "Technical Write-Up",
    para: "A detailed technical write-up is created based on the demonstration.",
  },
  {
    id: "3",
    head: "AI Video Creation",
    para: "This write-up is input into an AI tool, generating a visually engaging video that complements the hands-on footage.",
  },
  {
    id: "4",
    head: "Merging Content",
    para: "The AI-generated video is combined with our recorded content, providing a cohesive and comprehensive overview of your product.",
  },
  {
    id: "5",
    head: "Delivery for Publication",
    para: "The final video is delivered to you, ready for publication, and designed to capture your audience's attention.",
  },
];

const paginArrData = [];

const page = () => {
  const searchParams = useSearchParams();
  const [ytList, setYtList] = useState(_videometadata);
  const ytMemo = useMemo(() => ytList, [ytList]);
  const pageNum = searchParams.get("page") || 1;
  const totalItem = searchParams.get("totalItem") || 6;
  const prevTabId = searchParams.get("prevTab") || tabs[0].id;
  const [paginArr, setPaginArr] = useState(paginArrData);
  const [activeTab, setActiveTab] = useState(prevTabId);
  const [ytInfo, setYtInfo] = useState(
    ytMemo.slice(
      (pageNum - 1) * totalItem,
      (pageNum - 1) * totalItem + Number(totalItem)
    )
  );
  const [searchData, setSearchData] = useState("");

  const context = useContext(AppContext);

  const { setProgress, progress } = context;

  useEffect(() => {
    setProgress(100);

    return () => {};
  }, []);

  const paginationAlgo = (oostData) => {
    // let ctr = 3;
    let myrtr = [];
    myrtr = [Number(pageNum), Number(pageNum) + 1, Number(pageNum) + 2];
    // }
    if (
      myrtr[myrtr.length - 1] >= Math.ceil(oostData.length / Number(totalItem))
    ) {
      myrtr.pop();
    }
    if (
      myrtr[myrtr.length - 2] >= Math.ceil(oostData.length / Number(totalItem))
    ) {
      myrtr.pop();
    }
    setYtInfo(
      oostData.slice(
        (pageNum - 1) * totalItem,
        (pageNum - 1) * totalItem + Number(totalItem)
      )
    );
    // console.log("page changing ", myrtr)
    setPaginArr(myrtr);
  };

  useEffect(() => {
    gsap.fromTo(
      ".service1VideoItem",
      {
        opacity: 0,
        y: 100,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.easeOut",
        scrollTrigger: {
          trigger: ".service1VideoItem",
          toggleActions: "restart none none none",
        },
      }
    );

    gsap.fromTo(
      ".ytCardDiv",
      {
        opacity: 0,
        y: 100,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.easeOut",
        stagger: 0.3,
        scrollTrigger: {
          trigger: ".ytCardDiv",
          toggleActions: "restart none none none",
        },
      }
    );

    return () => {};
  }, []);

  useEffect(() => {
    let currTabArr = [];
    if (activeTab === "allCategories") {
      currTabArr = ["Podcasts", "Editorials"];
    } else {
      currTabArr = [activeTab];
    }
    const filteredAgainstTab = ytMemo.filter((element) =>
      currTabArr.includes(element.category)
    );
    const filteredAgainstSearch = filteredAgainstTab.filter((element) =>
      element.topic.toLowerCase().includes(searchData.toLowerCase().trim())
    );
    setYtInfo(
      filteredAgainstSearch.slice(
        (pageNum - 1) * totalItem,
        (pageNum - 1) * totalItem + Number(totalItem)
      )
    );
    paginationAlgo(filteredAgainstSearch);
  }, [activeTab, searchData]);

  const [ytContentLink, setYtContentLink] = useState({
    ytEmbedLink: "",
    title: "Loading...",
    category: "Podcasts",
  });

  const handleOnClose = () => {
    gsap.to("#videoShowId", { duration: 0.1, opacity: 0, display: "none" });
    gsap.to("#videoShowId", { duration: 0.3, top: "100%" });
    gsap.to("#popUpDisplayId", { duration: 0.1, display: "none", delay: 0.3 });
    setYtContentLink({
      ytEmbedLink: "",
      title: "Loading...",
      category: "Podcasts",
    });
  };
  const handleOnOpen = () => {
    gsap.to("#videoShowId", { duration: 0.1, opacity: 1, display: "block" });
    gsap.to("#videoShowId", { duration: 0.3, top: "0%" });
    gsap.to("#popUpDisplayId", { duration: 0.1, display: "block" });
  };

  const handleInputChange = (event) => {
    setSearchData(event.target.value);
  };

  const scrollToSection = () => {
    const youtubeSectionIdService = document.getElementById(
      "youtubeSectionIdService"
    );
    if (youtubeSectionIdService) {
      youtubeSectionIdService.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (pageNum > 1 || searchParams.get("page") == 1) {
      scrollToSection();
    }
  }, []);

  return (
    <div className="max-w-[1566px] mx-auto overflow-hidden">
      <div
        className="pt-28 lg:pt-28 space-y-9 relative blogDiv"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, #111113, #1b1b1f, #18151e, #0d0a1a)",
        }}
      >
        <div className="whyinfra"></div>
        <div className="text-center lg:text-left">
          <span className="bg-white/10 text-blue-500 px-4 py-2 rounded-lg text-xs sm:text-[14px] font-medium mb-2 inline-block mx-auto lg:ml-40">
            #1 AI VIDEO PLATFORM FOR MARKETING
          </span>
        </div>
        <div className="quicksand-bold text-[5em] max-sm:text-[4em] tracking-tighter leading-[80px] text-white text-center flex justify-center">
          <h1 className="w-3/4 max-sm:w-[95%] leading-[80px] max-sm:leading-[69px] text-left max-lg:text-center max-lg:mx-auto">
            B2B Video Production for{" "}
            <span className="bg-gradient-to-r from-[#1966ff] via-[#d129ff] to-[#8c1eff] bg-clip-text animate-gradient text-transparent">
              Early-Stage Startups
            </span>
          </h1>
        </div>

        <div className="text-white quicksand-semibold lg:ml-40">
          <p className="w-3/4 max-sm:w-[90%] text-left max-lg:text-center max-lg:mx-auto">
            Your extended Developer Relations team to initiate conversations,
            increase user sign ups, and accelerate pipeline faster than ever
            before with developer focused video, scripted and created by
            developers
          </p>
        </div>

        <div className="flex justify-center lg:justify-start lg:ml-40">
          <Link
            href="https://calendly.com/meet-shan"
            target="_blank"
            className="btn bg-btnprimary hover:bg-btnprimaryhov text-white text-center relative z-[12]"
          >
            Get Started
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
      {/* Why Choose Us */}
      <div className="flex flex-col gap-10 mt-24 mb-16"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, #272b45 0%, transparent 40%)",
        }}
        
      >
        <div className="w-full h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5 mb-5"></div>

        
        <SaasGlassyBoxes />
      </div>
      <div className="w-full h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5 mt-4"></div>

      {/* //Services */}
      <div>
        <Services />
      </div>

      <div className="flex flex-col gap-10 mt-24 mb-16"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, #272b45 0%, transparent 40%)",
        }}
        
      >
        <div className="w-full h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5 mb-5"></div>

      <div className="flex justify-center pt-10 service1VideoItem">
        <div className="rounded-lg p-[2px] bg-gradient-to-r from-purple-600 via-blue-500 to-slate-200">
          <iframe
            className="rounded-lg max-md:w-[630px] max-md:h-[359px] max-sm:w-[350px] max-sm:h-[181px] max-lg:w-[760px] max-lg:h-[439px] shadow-3xl relative p-[2px] bg-gradient-to-r from-purple-600 via-blue-500 to-slate-200"
            width="950"
            height="550"
            src={`https://www.youtube.com/embed/ICUGIdqzmYg`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
          />
        </div>
      </div>
      </div>
      <div className="flex justify-center w-full flex-col items-center">
        <div className="max-w-[1450px] mx-auto flex justify-center flex-col items-center gap-5 text-center">
          <div className="divider-line divider-top max-lg:hidden" />
          <div className="divider-line divider-left max-lg:hidden" />
          <div className="divider-line divider-right max-lg:hidden" />
          <HowWorks
            mainHeading="Technical Videos Showcasing <span class='specialtext'>Hands-On Use Cases</span>"
            subHeading="Steps for Video Production"
            serviceArr={serviceArrHowWorks}
          />
          <div className=" w-6/5 m-auto flex flex-col gap-4 max-sm:gap-2">
            <div className="w-full text-center pt-20 text-3xl quicksand-bold text-[wheat]">
              <h2>Steps for Video Production</h2>
            </div>
          </div>
          <div className="pt-5" />
          <MarqueeDemo />
        </div>
        {/* <div className="max-w-[1450px] mx-auto flex justify-center flex-col items-center gap-5 text-center">
          <div className="divider-line divider-left max-lg:hidden" />
          <div className="divider-line divider-right max-lg:hidden" />
          <HowWorks
            mainHeading="AI-Generated Videos Enhanced with <span class='specialtext'>Human Touch</span>"
            subHeading=""
            serviceArr={serviceArrHowWorks2}
          />
        </div> */}
      </div>
      <div className="relative bg-[url('https://cdn.prod.website-files.com/62fe4c0cf9e612b304ecd08b/662837ec30851f0543c18f14_Grid3.svg')]  top-10">
        <div className="flex justify-center w-full pt-32 flex-col gap-10">
          <div>
            <h1 className="text-center text-white text-7xl quicksand-bold max-sm:text-[3.5rem]">
              Editorials{" "}
              <span className='relative bg-gradient-to-br from-[#3c00e2] to-[#6530fb] bg-clip-text text-transparent after:content-[""] after:w-8 after:h-8 after:absolute after:top-2 after:right-[-20px] after:bg-[url("https://assets-global.website-files.com/63ea91a878b2a06196ffc825/6574480f9f60d7965d70b4b0_v2_highlight-image.svg")] after:bg-no-repeat after:bg-contain '>
                and Podcasts
              </span>
            </h1>
          </div>
          <div className="flex justify-center">
            <p className="text-center text-white quicksand-light w-1/2 max-md:w-3/4 max-sm:w-4/5">
              Our in-house engineers specialize in SaaS video production,
              creating high-quality, technically detailed videos that delve into
              the nuanced use cases of your products. These are not just
              overviews but instructional guides that demonstrate how your
              products solve real-world infrastructure, security, or
              data-related problems.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center pt-20 max-md:pt-28 text-white">
        <label className="input h-[3.5rem] input-bordered flex items-center gap-2 w-1/3 bg-transparent max-sm:w-[80%] border-white border-2 blogLabelSearchClass">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-6 w-6 opacity-70"
          >
             <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="text"
            className="grow"
            placeholder="search..."
            value={searchData}
            onChange={handleInputChange}
          />
        </label>

        {/* <input type="text" placeholder="Search..." className="input input-bordered w-1/3 " /> */}
      </div>
      <div className="w-full flex justify-center pt-20 pb-10 text-white">
        <div className="p-2 py-1 border-[#fff] border-2 rounded-full max-sm:w-[90%]">
          <TabDiv activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </div>
      <div className="max-w-[1450px] mx-auto justify-center flex pt-12">
        <div
          className="w-[90%] flex flex-wrap gap-5 justify-center"
          id="youtubeSectionIdService"
        >
          {ytInfo.map((item) => {
            return (
              <YtCard
                ytContentLink={ytContentLink}
                setYtContentLink={setYtContentLink}
                handleOnOpen={handleOnOpen}
                item={item}
              />
            );
          })}
        </div>
      </div>
      <PopupVideo ytContentLink={ytContentLink} handleOnClose={handleOnClose} />
      <div className="py-12">
        <Pagination>
          <PaginationContent>
            {Number(pageNum) - 1 > 0 && (
              <PaginationItem>
                <PaginationPrevious
                  href={`?page=${
                    Number(pageNum) - 1
                  }&totalItem=${totalItem}&prevTab=${activeTab}`}
                />
              </PaginationItem>
            )}
            {paginArr.map((item, index) => {
              return (
                <PaginationItem key={item}>
                  <PaginationLink
                    isActive={pageNum == item ? true : false}
                    href={`?page=${item}&totalItem=${totalItem}&prevTab=${activeTab}`}
                  >
                    {item}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            {Number(pageNum) + 1 <= paginArr[paginArr.length - 1] && (
              <>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    href={`?page=${
                      Number(pageNum) + 1
                    }&totalItem=${totalItem}&prevTab=${activeTab}`}
                  />
                </PaginationItem>
              </>
            )}
          </PaginationContent>
        </Pagination>
      </div>
      <ReadyToStart />
    </div>
  );
};

export default page;
