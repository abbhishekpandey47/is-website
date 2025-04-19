"use client";
import React, { useState, useContext } from "react";
import AppContext from "@/context/Infracontext";
import { usePathname } from "next/navigation";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Link from "next/link";
import Image from "next/image";

// import { DownOutlined } from '@ant-design/icons';

const GivenMenuBar = ({
  head,
  menuLinks,
  setProgress,
  curPage,
  setCurPage,
}) => {
  const checkVisitPage = (el) => {
    el == curPage ? setProgress(0) : setProgress(30);
    setCurPage(el);
  };
  return (
    <Menu as="div" className="relative inline-block text-left p-0">
      <div>
        <MenuButton className="inline-flex items-center gap-1 p-2 w-full justify-center rounded-md text-sm font-semibold hover:bg-zinc-800/20">
          {head}{" "}
          <svg
            fill="#CFCAC7"
            height="10px"
            width="10px"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 491.996 491.996"
            stroke="#000000"
          >
            <g>
              <g>
                <path
                  d="M484.132,124.986l-16.116-16.228c-5.072-5.068-11.82-7.86-19.032-7.86c-7.208,0-13.964,2.792-19.036,7.86l-183.84,183.848 
      L62.056,108.554c-5.064-5.068-11.82-7.856-19.028-7.856s-13.968,2.788-19.036,7.856l-16.12,16.128 
      c-10.496,10.488-10.496,27.572,0,38.06l219.136,219.924c5.064,5.064,11.812,8.632,19.084,8.632h0.084 
      c7.212,0,13.96-3.572,19.024-8.632l218.932-219.328c5.072-5.064,7.856-12.016,7.864-19.224 
      C491.996,136.902,489.204,130.046,484.132,124.986z"
                />
              </g>
            </g>
          </svg>
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute z-10 mt-6 w-56 origin-top-center rounded-md bg-slate-900 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="p-2 rounded-lg mx-auto">
          {menuLinks.map((menuLink, index) => {
            return (
              <MenuItem key={index}>
                <Link
                  onClick={() => {
                    checkVisitPage(menuLink.hrefLink);
                  }}
                  href={menuLink.hrefLink}
                  className="block px-4 py-2 text-sm hover:bg-slate-800 rounded-lg"
                  target={menuLink.hrefLink.includes("http") ? "_blank" : ""}
                >
                  {menuLink.menuName}
                </Link>
              </MenuItem>
            );
          })}
        </div>
      </MenuItems>
    </Menu>
  );
};

const menuLinksArrServices = [
  {
    hrefLink: "/services/service-video-production",
    menuName: "Video Production",
  },
  {
    hrefLink: "/services/technical-writing-services",
    menuName: "Technical Writing Services",
  },
  {
    hrefLink: "/services/webflow-services",
    menuName: "Webflow Services",
  },

  // {
  //     hrefLink: "/tutorials",
  //     menuName: "Tutorials"
  // }
];

// const menuLinksArrProducts = [
//   {
//     hrefLink: "https://content.infrasity.com/",
//     menuName: "Outline Generator",
//   },
// ];

const Navbar = () => {
  const checkVisitPage = (el) => {
    el == curPage ? setProgress(0) : setProgress(30);
    setCurPage(el);
  };
  const context = useContext(AppContext);
  const pathname = usePathname();
  const { setProgress, progress } = context;
  const [curPage, setCurPage] = useState(pathname);

  return (
    <div className="w-full xs:pt-5 z-20 text-[#CFCAC7] gap-1 absolute">
      <div className="navbar bg-slate-900 w-full sm:w-[90vw] md:w-[85vw] lg:w-[80vw] xl:w-[75vw] max-w-[1200px] p-3 sm:p-5 mx-auto shadow-navshadow rounded-lg  lg:absolute lg:left-[50vw] lg:origin-center lg: transform lg:-translate-x-1/2">
        <div className="navbar-start max-lg:visible invisible">
          {/*     <div className="dropdown ">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                           
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-md dropdown-content bg-slate-900 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li><Link href="/" onClick={(() => { checkVisitPage("/") })}>Home</Link></li>
                            <li>
                                <span>Products</span>
                                <ul className="p-2">
                                    <li><Link href="https://content.infrasity.com" target='_blank' onClick={(() => { checkVisitPage("/") })}>Outline Generator</Link></li>
                                </ul>
                            </li>
                            <li><Link href="/blog" onClick={(() => { checkVisitPage("/blog") })}>Blog</Link></li>
                            <li>
                                <span>Services</span>
                                <ul className="p-2">
                                    <li><Link href="/services/service-video-production" onClick={(() => { checkVisitPage("/services/service-video-production") })}>Video Production</Link></li>
                                    <li><Link href="/service-blog-as-code" onClick={() => { setProgress(30) }}>Blogs-as-code</Link></li>
                                    
                                </ul>
                            </li>
                            <li><Link href="/faq" onClick={(() => { checkVisitPage("/faq") })}>FAQ</Link></li>
                        </ul>
                    </div>
                    <Link
                        href="/"
                        className="btn btn-ghost w-40"
                        aria-label="Infrasity Home"
                    >
                        <div className="flex flex-col my-auto items-center">
                            <div className="w-full flex justify-start">
                                <Image
                                    width={200}
                                    height={200}
                                    loading='lazy'
                                    src="/logodata/infra_logo_only.png"
                                    className="min-[408px]:hidden block w-[40%]"
                                    alt="Infrasity Logo"
                                />
                            </div>
                            <div>
                                <Image
                                loading='lazy'
                                    width={200}
                                    height={200}
                                    src="/logodata/infrasity_logo.png"
                                    className="max-[408px]:hidden"
                                    alt="Infrasity Logo"
                                />
                            </div>
                        </div>
                    </Link>
                </div> */}
          <Menu as="div" className="relative inline-block text-left p-0">
            <div>
              <MenuButton className="inline-flex items-center gap-1 p-2 w-full justify-center rounded-md text-sm font-semibold hover:bg-zinc-800/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </MenuButton>
            </div>

            <MenuItems
              transition
              className="absolute z-10 mt-6 w-56 origin-top-center rounded-lg bg-slate-900 shadow-lg ring-1 ring-black ring-opacity-5  transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div className="p-2 rounded-lg mx-auto">
                <MenuItem>
                  <Link
                    onClick={() => {
                      checkVisitPage("/");
                    }}
                    href="/"
                    className="block px-4 py-2 text-sm hover:bg-slate-800 rounded-lg"
                    target={"/".includes("http") ? "_blank" : ""}
                  >
                    {"Home"}
                  </Link>
                </MenuItem>
                {/* MProducts */}
                {/* <MenuItem>
                  <p className="block px-4 py-2 text-sm hover:bg-slate-800 rounded-lg">
                    {"Products"}
                  </p>
                </MenuItem> */}
                <MenuItem>
                  <Link
                    href="https://content.infrasity.com/"
                    className="block px-4 py-2 text-sm hover:bg-slate-800 rounded-lg"
                    target={
                      "https://content.infrasity.com/".includes("http")
                        ? "_blank"
                        : ""
                    }
                  >
                    <div className="pl-6">{"Outline Generator"}</div>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    onClick={() => {
                      checkVisitPage("/blog");
                    }}
                    href="/blog"
                    className="block px-4 py-2 text-sm hover:bg-slate-800 rounded-lg"
                    target={"/blog".includes("http") ? "_blank" : ""}
                  >
                    {"Blogs"}
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    onClick={() => {
                      checkVisitPage("/case-studies");
                    }}
                    href="/case-studies"
                    className="block px-4 py-2 text-sm hover:bg-slate-800 rounded-lg"
                    target={"/case-studies".includes("http") ? "_blank" : ""}
                  >
                    {"Case Studies"}
                  </Link>
                </MenuItem>
                <MenuItem>
                  <p className="block px-4 py-2 text-sm hover:bg-slate-800 rounded-lg">
                    {"Services"}
                  </p>
                </MenuItem>
                <MenuItem>
                  <Link
                    onClick={() => {
                      checkVisitPage("/services/service-video-production");
                    }}
                    href="/services/service-video-production"
                    className="block px-4 py-2 text-sm hover:bg-slate-800 rounded-lg"
                    target={
                      "service-video-production".includes("http")
                        ? "_blank"
                        : ""
                    }
                  >
                    <div className="pl-6">{"Video Production"}</div>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    onClick={() => {
                      checkVisitPage("/services/technical-writing-services");
                    }}
                    href="/services/technical-writing-services"
                    className="block px-4 py-2 text-sm hover:bg-slate-800 rounded-lg"
                    target={
                      "/services/technical-writing-services".includes("http")
                        ? "_blank"
                        : ""
                    }
                  >
                    <div className="pl-6">{"Blog-as-code"}</div>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    onClick={() => {
                      checkVisitPage("/faq");
                    }}
                    href="/faq"
                    className="block px-4 py-2 text-sm hover:bg-slate-800 rounded-lg"
                    target={"/faq".includes("http") ? "_blank" : ""}
                  >
                    {"FAQ"}
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    onClick={() => {
                      checkVisitPage("/about");
                    }}
                    href="/about"
                    className="block px-4 py-2 text-sm hover:bg-slate-800 rounded-lg"
                    target={"/about".includes("http") ? "_blank" : ""}
                  >
                    {"About Us"}
                  </Link>
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>
        </div>
        <Link
          href="/"
          className="btn btn-ghost w-40  lg:absolute"
          aria-label="Infrasity Home"
        >
          <div className="flex flex-col my-auto items-center">
            {/*<div className="w-full flex justify-start">
                            <Image
                                width={200}
                                height={200}
                                loading='lazy'
                                src="/logodata/infra_logo_only.png"
                                className="min-[408px]:hidden block w-[60%] "
                                alt="Infrasity Logo"
                            />
                        </div>*/}
            <div>
              <Image
                loading="lazy"
                width={200}
                height={200}
                src="/logodata/infrasity_logo.png"
                alt="Infrasity Logo"
              />
            </div>
          </div>
        </Link>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 quicksand-semibold">
            <li>
              <Link
                href="/"
                onClick={() => {
                  checkVisitPage("/");
                }}
              >
                Home
              </Link>
            </li>
            {/* <li>
              <GivenMenuBar
                head={"Products"}
                menuLinks={menuLinksArrProducts}
                setProgress={setProgress}
                curPage={curPage}
                setCurPage={setCurPage}
              />
            </li> */}
            <li>
              <Link
                href="/blog"
                onClick={() => {
                  checkVisitPage("/blog");
                }}
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/case-studies"
                onClick={() => {
                  checkVisitPage("/case-studies");
                }}
              >
                Case Studies
              </Link>
            </li>
            <li className="flex justify-center items-center">
              <GivenMenuBar
                head={"Services"}
                menuLinks={menuLinksArrServices}
                setProgress={setProgress}
                curPage={curPage}
                setCurPage={setCurPage}
              />
            </li>
            <li>
              <Link
                href="/faq"
                onClick={() => {
                  checkVisitPage("/faq");
                }}
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                onClick={() => {
                  checkVisitPage("/about");
                }}
              >
                About Us
              </Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end  ">
          <Link
            href="/contact"
            onClick={() => {
              checkVisitPage("/contact");
            }}
            className="hidden md:inline-flex md:justify-center md:items-center text-sm quicksand-semibold rounded-[5px] before:ease relative h-12 w-40 overflow-hidden border border-[#3b82f6] bg-[#5F64FF] text-white shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700  hover:before:-translate-x-40"
          >
            Book a Free Demo
          </Link>
        </div>
      </div>

      {/* hidden md:inline-flex btn bg-btnprimary text-white hover:bg-btnprimaryhov quicksand-semibold */}
    </div>
  );
};

export default Navbar;
