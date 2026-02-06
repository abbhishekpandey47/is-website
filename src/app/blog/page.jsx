"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import React, {
    Suspense,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";


import AppContext from "../../context/Infracontext";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "../../Components/ui/pagination";

import { useSearchParams } from "next/navigation";
import NewsletterBlogs from "./NewsletterBlogs";

import Image from "next/image";
import authorData from "../../../posts/_authorData";
import postMetaData from "../../../posts/_postMetadata";

let tabs = [
  { id: "allCategories", label: "All Categories" },
  { id: "Informational", label: "Informational" },
  {id:"LLM Visiblity" , label:"LLM Visiblity"},
  { id: "B2B SaaS- Content Marketing", label: "B2B SaaS- Content Marketing" },
  { id: "B2B SaaS Growth & GTM", label: "B2B SaaS Growth & GTM" },
  { id: "Reddit Marketing B2B SaaS", label: "Reddit Marketing B2B SaaS" },
  { id: "Tech Video Marketing", label: "Tech Video Marketing" },
  { id: "Developer Marketing", label: "Developer Marketing" },
  {id : "Product Documentation", label : "Product Documentation"},
  {id:"Community Engagement", label:"Community Engagement"},

];

const TabDiv = React.memo(({ activeTab, setActiveTab }) => (
  <div className="flex flex-wrap gap-[0.60rem] max-w-7xl mx-auto justify-center">
    {tabs.map((tab) => (
      <button
        key={tab.id}
        onClick={() => setActiveTab(tab.id)}
        className={`relative group px-3 py-3 text-sm font-medium rounded-lg transition-all duration-300 ease-out
          ${activeTab === tab.id 
            ? 'text-white shadow-lg scale-105' 
            : 'text-gray-300 hover:text-white hover:scale-102'
          }
          focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50
          backdrop-blur-sm border border-white/20 hover:border-white/40
          min-w-max whitespace-nowrap
        `}
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        {activeTab === tab.id && (
          <motion.div
            layoutId="activeTab"
            className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-xl"
            transition={{ 
              type: "spring", 
              bounce: 0.15, 
              duration: 0.5 
            }}
          />
        )}
        <span className="relative z-10 flex items-center gap-2">
          {tab.label}
          {activeTab === tab.id && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-2 h-2 bg-white rounded-full"
            />
          )}
        </span>
      </button>
    ))}
  </div>
));


const monthArr = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const CardDiv = React.memo(({ card }) => (
  <Link href={`/blog/${card.slug}`} className="">
    <div className="hover:shadow-2xl hover:scale-105 max-sm:w-72 transition-all duration-200 cursor-pointer card w-96 h-[500px] max-sm:h-[550px] shadow-2xl rounded-md border-[#999] border-2 relative">
      <div className="p-3">
        <figure className="pb-5">
          <Image
            loading="lazy"
            width={600}
            height={342}
            className="object-cover relative overflow-hidden transition duration-150 cursor-pointer"
            src={card.ogImage || "/blog_home/blog_home.png"}
            alt="infrasity"
            style={{
              borderRadius: "7px",
              width: "600px",
              height: "200px",
              objectFit: "contain",
            }}
          />
        </figure>
        <div className="py-0 pb-5">
       <div className="inline-flex items-center justify-center bg-[#f5f4f7] rounded-full px-3 py-1 text-[12px] quicksand-semibold">
  <p className="text-black max-sm:text-xs">{card.category}</p>
</div>
        </div>
        <div className="text-white flex flex-col gap-4">
          <h2 className="card-title quicksand-bold">{card.title}</h2>
          <p className="quicksand-light mt-2">
            {card.description.length > 90
              ? `${card.description.slice(0, 80).trim()} . . .`
              : card.description}
          </p>
          <div className="flex items-center gap-2 absolute bottom-3">
        
            <Image
              className="rounded-full w-10 h-10"
              src={card.authorImage || "/svgPatterns/profile.svg"}
              alt=""
              width={40}
              height={40}
            />
            <p className="quicksand-semibold">{card.author}</p>
            <p className="quicksand-light text-xs tracking-normal">{`${
              monthArr[card.publishedOn.split("-")[1] - 1]
            } ${card.publishedOn.split("-")[2]}, ${
              card.publishedOn.split("-")[0]
            }`}</p>
          </div>
        </div>
      </div>
    </div>
  </Link>
));

const paginArrData = [];

const BlogPage = () => {
  const context = useContext(AppContext);

  const { setProgress, progress } = context;

  const searchParams = useSearchParams();
  const pageNum = searchParams.get("page") || 1;
  const prevTabId = searchParams.get("prevTab") || tabs[0].id;
  const totalItem = searchParams.get("totalItem") || 6;
  const [cardArr, setCardArr] = useState(postMetaData);
  const [cardInfo, setCardInfo] = useState(
    cardArr.slice(
      (pageNum - 1) * totalItem,
      (pageNum - 1) * totalItem + Number(totalItem)
    )
  );
  const [paginArr, setPaginArr] = useState(paginArrData);
  const [activeTab, setActiveTab] = useState(prevTabId);
  const [searchData, setSearchData] = useState("");

  const sortedCardArr = useMemo(() => {
    return postMetaData.sort((a, b) => {
      let datea = Math.floor(new Date(a.publishedOn).getTime() / 1000);
      let dateb = Math.floor(new Date(b.publishedOn).getTime() / 1000);
      return dateb - datea;
    });
  }, [postMetaData]);

  useEffect(() => {
    setCardArr(sortedCardArr);
  }, [sortedCardArr]);

  useEffect(() => {
    setProgress(100);
    return () => {};
  }, []);

  const handleInputChange = useCallback((event) => {
    setSearchData(event.target.value);
  }, []);

  const paginationAlgo = useCallback(
    (oostData) => {
      let myrtr = [];
      if (pageNum === 1) {
        myrtr = [1, 2, 3];
      } else if (pageNum == 2) {
        myrtr = [2, 3, 4];
      } else {
        myrtr = [Number(pageNum), Number(pageNum) + 1, Number(pageNum) + 2];
      }
      if (
        myrtr[myrtr.length - 1] >=
        Math.ceil(oostData.length / Number(totalItem))
      ) {
        myrtr.pop();
      }
      if (
        myrtr[myrtr.length - 2] >=
        Math.ceil(oostData.length / Number(totalItem))
      ) {
        myrtr.pop();
      }
      setCardInfo(
        oostData.slice(
          (pageNum - 1) * totalItem,
          (pageNum - 1) * totalItem + Number(totalItem)
        )
      );
      setPaginArr(myrtr);
    },
    [pageNum, totalItem]
  );

  useEffect(() => {
    let currTabArr = [];
    if (activeTab === "allCategories") {
      currTabArr = ["Informational", "Tutorials" , "B2B SaaS- Content Marketing", "B2B SaaS Growth & GTM", "Reddit Marketing B2B SaaS", "Tech Video Marketing" , "Developer Marketing" , "Product Documentation" , "Community Engagement" , "LLM Visiblity"];
    } else {
      currTabArr = [activeTab];
    }
    // Always filter and sort from postMetaData
    const filteredAgainstTab = postMetaData.filter((element) =>
      currTabArr.includes(element.category)
    );
    const filteredAgainstSearch = filteredAgainstTab.filter((element) =>
      element.title.toLowerCase().includes(searchData.toLowerCase().trim())
    );
    // Sort by publishedOn descending
    const sortedFiltered = filteredAgainstSearch.sort((a, b) => {
      let datea = Math.floor(new Date(a.publishedOn).getTime() / 1000);
      let dateb = Math.floor(new Date(b.publishedOn).getTime() / 1000);
      return dateb - datea;
    });
    setCardInfo(
      sortedFiltered.slice(
        (pageNum - 1) * totalItem,
        (pageNum - 1) * totalItem + Number(totalItem)
      )
    );
    paginationAlgo(sortedFiltered);
  }, [activeTab, searchData, pageNum, totalItem]);

  const scrollToSection = useCallback(() => {
    const cardDivBlogSection = document.getElementById("cardDivBlogSection");
    if (cardDivBlogSection) {
      cardDivBlogSection.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    if (pageNum > 1 || searchParams.get("page") == 1) {
      scrollToSection();
    }
  }, [pageNum, searchParams, scrollToSection]);

  return (
    <div className="blogDiv relative">
      <div className="whyinfra2"></div>
      <div className="h-[50vh] pt-56 flex flex-col justify-center gap-7">
        <div>
          <h1 className="text-center text-white text-7xl quicksand-bold max-sm:text-[3.5rem]">
            Resources and{" "}
            <span className='relative bg-gradient-to-br from-[#3c00e2] to-[#6530fb] bg-clip-text text-transparent after:content-[""] after:w-8 after:h-8 after:absolute after:top-2 after:right-[-20px] after:bg-[url("/svgPatterns/text-highlight.svg")] after:bg-no-repeat after:bg-contain '>
              Insights
            </span>
          </h1>
        </div>
        <div className="flex justify-center">
          <p className="text-center text-white quicksand-light w-1/2 max-md:w-3/4 max-sm:w-4/5">
            Delve into our blog for expert insights, strategies, and trends that
            elevate your tech content strategies. Discover how to enhance
            visibility and drive engagement, empowering your brand in the
            digital landscape.
          </p>
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
      </div>
       <div className="w-full flex justify-center pt-20 pb-10">
        <div className="p-2 bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl max-w-7xl w-full mx-4">
          <TabDiv activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </div>
      <div className="flex justify-center ">
        <div
          className="divider-line divider-blog-left max-sm:hidden"
          style={{ height: "80%" }}
        ></div>
        <div
          className="divider-line divider-blog-right max-sm:hidden"
          style={{ height: "80%" }}
        ></div>
        <div
          className="p-12 flex gap-10 flex-wrap justify-center max-w-[1450px]"
          id="cardDivBlogSection"
        >
          {cardInfo.map((card) => {
            const author = authorData.find((element) => {
              return element.authorId === card.authorId;
            });
            card.author = author?.name;
            card.authorImage = author?.profilePic;
            return (
              <Suspense fallback={"Loading..."} key={card.slug}>
                <CardDiv card={card} />
              </Suspense>
            );
          })}
        </div>
      </div>

      <div className="pb-20">
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
      <NewsletterBlogs />
    </div>
  );
};

export default function BlogPageWithSuspense(props) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogPage {...props} />
    </Suspense>
  );
}
