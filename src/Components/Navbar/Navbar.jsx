"use client";
import React, { useState, useContext } from "react";
import AppContext from "@/context/Infracontext";
import { usePathname } from "next/navigation";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";
import CalendarBooking from "../../app/book-a-demo/calendarButton"

const GivenMenuBar = ({
  head,
  menuLinks,
  setProgress,
  curPage,
  setCurPage,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const checkVisitPage = (el) => {
    el == curPage ? setProgress(0) : setProgress(30);
    setCurPage(el);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <Menu as="div" className="relative inline-block text-left p-0">
      <div>
        <MenuButton
          onClick={toggleMenu}
          className="inline-flex items-center gap-1 p-2 w-full justify-center rounded-md text-sm font-semibold hover:bg-zinc-800/20"
          aria-label="Menu"
        >
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

      {isMenuOpen && (
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
                      closeMenu(); // Close menu when link is clicked
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
      )}
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
    hrefLink: "/services/webflow-agency",
    menuName: "Webflow Agency",
  },
  {
    hrefLink: "/services/reddit-marketing-services",
    menuName: "Reddit Marketing Services",
  },

  // { reddit-marketing-services
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
  const MenuItem2 = ({ children }) => {
    return children;
  };

  const [servicesOpen, setServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const context = useContext(AppContext);
  const pathname = usePathname();
  const { setProgress, progress } = context;
  const [curPage, setCurPage] = useState(pathname);

  const toggleServices = () => {
    setServicesOpen(!servicesOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const checkVisitPage = (el) => {
    el == curPage ? setProgress(0) : setProgress(30);
    setCurPage(el);
  };

  const handleServiceClick = (path) => {
    checkVisitPage(path);

    setTimeout(() => {
      window.location.href = path;
    }, 10);
  };

  return (
    <div className="w-full xs:pt-5 z-20 text-[#CFCAC7] gap-1 absolute">
      <div className="navbar bg-slate-900 w-full sm:w-[90vw] md:w-[85vw] lg:w-[80vw] xl:w-[75vw] max-w-[1200px] p-3 sm:p-5 mx-auto shadow-navshadow rounded-lg  lg:absolute lg:left-[50vw] lg:origin-center lg: transform lg:-translate-x-1/2">
        <div className="navbar-start max-lg:visible invisible">
          <Menu as="div" className="relative inline-block text-left p-0">
            <div>
              <MenuButton
                onClick={toggleMobileMenu}
                className="inline-flex items-center gap-1 p-2 w-full justify-center rounded-md text-sm font-semibold hover:bg-zinc-800/20"
                aria-label="Menu"
              >
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

            {isMobileMenuOpen && (
              <MenuItems
                transition
                className="absolute z-10 mt-6 w-56 origin-top-center rounded-lg bg-slate-900 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"

              >
                <div className="p-2 rounded-lg mx-auto">
                  <MenuItem>
                    <Link
                      onClick={() => {
                        closeMobileMenu();
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
                      onClick={() => {
                        closeMobileMenu();
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
                        closeMobileMenu();
                        checkVisitPage("/case-studies");
                      }}
                      href="/case-studies"
                      className="block px-4 py-2 text-sm hover:bg-slate-800 rounded-lg"
                      target={"/case-studies".includes("http") ? "_blank" : ""}
                    >
                      {"Case Studies"}
                    </Link>
                  </MenuItem>
                  <div className="mobile-menu">
                    <MenuItem2>
                      <div
                        className="flex items-center justify-between px-4 py-2 text-sm hover:bg-slate-800 rounded-lg cursor-pointer"
                        onClick={toggleServices}
                      >
                        <p>Services</p>
                        {servicesOpen ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        )}
                      </div>
                    </MenuItem2>

                    {servicesOpen && (
                      <div className="bg-slate-900 rounded-lg mt-1 mb-2">
                        <MenuItem2>
                          <Link
                            onClick={(e) => {
                              e.preventDefault();
                              handleServiceClick(
                                "/services/technical-writing-services"
                              );
                            }}
                            href="/services/technical-writing-services"
                            className="block px-4 py-2 text-sm hover:bg-slate-800 rounded-lg ml-4"
                            target={
                              "/services/technical-writing-services".includes(
                                "http"
                              )
                                ? "_blank"
                                : ""
                            }
                          >
                            <div>Technical Writing Services</div>
                          </Link>
                        </MenuItem2>

                        <MenuItem2>
                          <Link
                            onClick={(e) => {
                              e.preventDefault();
                              handleServiceClick(
                                "/services/service-video-production"
                              );
                            }}
                            href="/services/service-video-production"
                            className="block px-4 py-2 text-sm hover:bg-slate-800 rounded-lg ml-4"
                            target={
                              "/services/service-video-production".includes(
                                "http"
                              )
                                ? "_blank"
                                : ""
                            }
                          >
                            <div>Video Production</div>
                          </Link>
                        </MenuItem2>

                        <MenuItem2>
                          <Link
                            onClick={(e) => {
                              e.preventDefault(); // Prevent default navigation reddit-marketing-services
                              handleServiceClick("/services/webflow-agency");
                            }}
                            href="/services/webflow-agency"
                            className="block px-4 py-2 text-sm hover:bg-slate-800 rounded-lg ml-4"
                            target={
                              "/services/webflow-agency".includes("http")
                                ? "_blank"
                                : ""
                            }
                          >
                            <div>Webflow Agency</div>
                          </Link>
                        </MenuItem2>
                        <MenuItem2>
                          <Link
                            onClick={(e) => {
                              e.preventDefault(); // Prevent default navigation reddit-marketing-services
                              handleServiceClick("/services/webflow-agency");
                            }}
                            href="/services/webflow-agency"
                            className="block px-4 py-2 text-sm hover:bg-slate-800 rounded-lg ml-4"
                            target={
                              "/services/reddit-marketing-services".includes("http")
                                ? "_blank"
                                : ""
                            }
                          >
                            <div>Reddit Marketing Services</div>
                          </Link>
                        </MenuItem2>
                      </div>
                    )}
                  </div>

                  <MenuItem>
                    <Link
                      onClick={() => {
                        closeMobileMenu();
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
                        closeMobileMenu();
                        checkVisitPage("/about");
                      }}
                      href="/about"
                      className="block px-4 py-2 text-sm hover:bg-slate-800 rounded-lg"
                      target={"/about".includes("http") ? "_blank" : ""}
                    >
                      {"About Us"}
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      onClick={() => {
                        closeMobileMenu();
                        checkVisitPage("/roi-cal");
                      }}
                      href="/roi-cal"
                      className="block px-4 py-2 text-sm hover:bg-slate-800 rounded-lg"
                      target={"/roi-cal".includes("http") ? "_blank" : ""}
                    >
                      {"ROI Calculator"}
                    </Link>
                  </MenuItem>
                </div>
              </MenuItems>
            )}
          </Menu>
        </div>
        <Link
          href="/"
          className="btn btn-ghost w-40 lg:absolute mr-28"
          aria-label="Infrasity Home"
        >
          <div className="flex flex-col my-auto justify-center items-center">
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
            <li>
              <Link
                href="/roi-cal"
                onClick={() => {
                  checkVisitPage("/roi-cal");
                }}
              >
                ROI Calculator
              </Link>
            </li>
          </ul>
          {!isMobileMenuOpen && <CalendarBooking />}
        </div>

      </div>
    </div>
  );
};

export default Navbar;
