"use client";
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
import CTA from "../../Components/CTA/CTA";

import Image from "next/image";
import authorData from "../../../posts/_authorData";
import postMetaData from "../../../posts/_postMetadata";

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
  <Link href={`/case-studies/${card.slug}`} className="">
    <div className="hover:shadow-2xl hover:scale-105 max-sm:w-72 transition-all duration-200 cursor-pointer card w-96 h-[540px] max-sm:h-[600px] shadow-2xl rounded-md border-[#999] border-2 relative">
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
              objectFit: "cover",
            }}
          />
        </figure>
        <div className="py-0 pb-5">
          <div className="text-[var(--blue)] bg-[#f5f4f7] rounded-full flex justify-center max-w-[100px] h-6 px-3 text-[12px] quicksand-semibold items-center">
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
          <div className="flex items-center gap-2 absolute bottom-3 my-4">
            <Image
              className="rounded-full"
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

const CaseStudiesPage = () => {
  const context = useContext(AppContext);

  const { setProgress, progress } = context;

  const searchParams = useSearchParams();
  const pageNum = searchParams.get("page") || 1;
  const totalItem = searchParams.get("totalItem") || 6;
  const [cardArr, setCardArr] = useState([]);
  const [cardInfo, setCardInfo] = useState([]);
  const [paginArr, setPaginArr] = useState(paginArrData);

  const sortedCardArr = useMemo(() => {
    return postMetaData
      .filter((post) => post.category === "Case Studies")
      .sort((a, b) => {
        let datea = Math.floor(new Date(a.publishedOn).getTime() / 1000);
        let dateb = Math.floor(new Date(b.publishedOn).getTime() / 1000);
        return dateb - datea;
      });
  }, []);

  useEffect(() => {
    setCardArr(sortedCardArr);
  }, [sortedCardArr]);

  const paginationAlgo = useCallback(
    (filteredData) => {
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
        Math.ceil(filteredData.length / Number(totalItem))
      ) {
        myrtr.pop();
      }
      if (
        myrtr[myrtr.length - 2] >=
        Math.ceil(filteredData.length / Number(totalItem))
      ) {
        myrtr.pop();
      }

      setCardInfo(
        filteredData.slice(
          (pageNum - 1) * totalItem,
          (pageNum - 1) * totalItem + Number(totalItem)
        )
      );
      setPaginArr(myrtr);
    },
    [pageNum, totalItem]
  );

  useEffect(() => {
    paginationAlgo(cardArr);
  }, [cardArr, pageNum, paginationAlgo]);

  useEffect(() => {
    setProgress(100);
  }, []);

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
            Case{" "}
            <span className='relative bg-gradient-to-br from-[#3c00e2] to-[#6530fb] bg-clip-text text-transparent after:content-[""] after:w-8 after:h-8 after:absolute after:top-2 after:right-[-20px] after:bg-[url("/svgPatterns/text-highlight.svg")] after:bg-no-repeat after:bg-contain '>
              Studies
            </span>
          </h1>
        </div>
        <div className="flex justify-center">
          <p className="text-center mb-20 text-white quicksand-light w-1/2 max-md:w-3/4 max-sm:w-4/5">
            Delve into our case studies for expert insights, strategies, and
            trends that elevate your tech content strategies. Discover how to
            enhance visibility and drive engagement, empowering your brand in
            the digital landscape.
          </p>
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
          {cardInfo.map((card, index) => {
            const author = authorData.find((element) => {
              return element.authorId === card.authorId;
            });
            card.author = author?.name;
            card.authorImage = author?.profilePic;
            return (
              <Suspense fallback={"Loading..."} key={card.id || index}>
                <CardDiv card={card} key={card.id || index} />
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
                  href={`?page=${Number(pageNum) - 1}&totalItem=${totalItem}`}
                />
              </PaginationItem>
            )}
            {paginArr.map((item, index) => {
              return (
                <PaginationItem key={item}>
                  <PaginationLink
                    isActive={pageNum == item ? true : false}
                    href={`?page=${item}&totalItem=${totalItem}`}
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
                    href={`?page=${Number(pageNum) + 1}&totalItem=${totalItem}`}
                  />
                </PaginationItem>
              </>
            )}
          </PaginationContent>
        </Pagination>
      </div>

      {/* CTA Section */}
      <div className="w-[80%] mx-auto mt-16">
        <CTA 
          title="Ready to achieve similar results for your startup?"
          description="Let's discuss how we can help you scale through technical content and developer marketing."
          buttonText="Book a Call"
        />
      </div>
    </div>
  );
};

export default function CaseStudiesPageWithSuspense(props) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CaseStudiesPage {...props} />
    </Suspense>
  );
}
