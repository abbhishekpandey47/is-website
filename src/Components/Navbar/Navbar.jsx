"use client";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import CalendarBooking from "../../app/calendarButton";
import AppContext from "../../context/Infracontext";

// Dropdown content component
const DropdownContent = ({ menuLinks, onLinkClick, openSubmenus, setOpenSubmenus }) => {
  const toggleSubmenu = (index, e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenSubmenus(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="p-3 space-y-1">
      {menuLinks.map((menuLink, index) => {
        if (menuLink.submenu && menuLink.submenu.length > 0) {
          return (
            <div key={index} className="relative">
              {menuLink.hrefLink ? (
                <Link
                  onClick={(e) => {
                    e.preventDefault();
                    onLinkClick(menuLink.hrefLink);
                  }}
                  href={menuLink.hrefLink}
                  className="block px-4 py-2 text-sm hover:bg-slate-800/80 rounded-lg transition-colors duration-150 text-[#CFCAC7]"
                  target={menuLink.hrefLink.includes("http") ? "_blank" : ""}
                >
                  {menuLink.menuName}
                </Link>
              ) : (
                <div
                  onMouseEnter={() => setOpenSubmenus(prev => ({ ...prev, [index]: true }))}
                  onClick={(e) => toggleSubmenu(index, e)}
                  className="flex items-center justify-between px-4 py-2 text-sm hover:bg-slate-800/80 rounded-lg cursor-pointer transition-colors duration-150 text-[#CFCAC7]"
                >
                  <span>{menuLink.menuName}</span>
                  {openSubmenus[index] ? (
                    <ChevronUp size={16} className="transition-transform duration-200" />
                  ) : (
                    <ChevronDown size={16} className="transition-transform duration-200" />
                  )}
                </div>
              )}

              <div 
                className={`ml-4 overflow-hidden transition-all duration-300 ease-in-out ${
                  openSubmenus[index] 
                    ? 'max-h-96 opacity-100 mt-1' 
                    : 'max-h-0 opacity-0'
                }`}
              >
                {menuLink.submenu.map((subItem, subIndex) => (
                  <Link
                    key={subIndex}
                    onClick={(e) => {
                      e.preventDefault();
                      onLinkClick(subItem.hrefLink);
                    }}
                    href={subItem.hrefLink}
                    className="block px-4 py-2 text-sm hover:bg-slate-800/80 rounded-lg transition-colors duration-150 text-[#CFCAC7]"
                    target={subItem.hrefLink.includes("http") ? "_blank" : ""}
                  >
                    {subItem.menuName}
                  </Link>
                ))}
              </div>
            </div>
          );
        } else {
          return (
            <Link
              key={index}
              onClick={(e) => {
                e.preventDefault();
                onLinkClick(menuLink.hrefLink);
              }}
              href={menuLink.hrefLink}
              className="block px-4 py-2 text-sm hover:bg-slate-800/80 rounded-lg transition-colors duration-150 text-[#CFCAC7]"
              target={menuLink.hrefLink.includes("http") ? "_blank" : ""}
            >
              {menuLink.menuName}
            </Link>
          );
        }
      })}
    </div>
  );
};

// Menu trigger button component
const MenuTrigger = ({ head, isOpen, onMouseEnter, onMouseLeave }) => {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="inline-flex items-center gap-1 rounded-md cursor-pointer"
    >
      {head}
      <svg
        fill="currentColor"
        height="10px"
        width="10px"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 491.996 491.996"
        className={`transition-transform duration-300 ease-out ${isOpen ? 'rotate-180' : ''}`}
      >
        <g>
          <path
            d="M484.132,124.986l-16.116-16.228c-5.072-5.068-11.82-7.86-19.032-7.86c-7.208,0-13.964,2.792-19.036,7.86l-183.84,183.848
  L62.056,108.554c-5.064-5.068-11.82-7.856-19.028-7.856s-13.968,2.788-19.036,7.856l-16.12,16.128
  c-10.496,10.488-10.496,27.572,0,38.06l219.136,219.924c5.064,5.064,11.812,8.632,19.084,8.632h0.084
  c7.212,0,13.96-3.572,19.024-8.632l218.932-219.328c5.072-5.064,7.856-12.016,7.864-19.224
  C491.996,136.902,489.204,130.046,484.132,124.986z"
          />
        </g>
      </svg>
    </div>
  );
};

const menuLinksArrServices = [
  {
    hrefLink: "/services/developer-marketing-agency",
    menuName: "Developer Marketing",
  },
  {
    hrefLink: "/services/ai-geo-optimization-agency",
    menuName: "AEO/GEO Services ",
  },
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
    menuName: "Webflow Design and Development",
  },
  {
    hrefLink: "/services/reddit-marketing-services",
    menuName: "Reddit Marketing Services",
  },
  {
    hrefLink: "/services/product-documentation",
    menuName: "Product Documentation",
  },
];


const toolsTab = [
  {
    hrefLink: "/tools/roi-cal",
    menuName: "ROI Calculator",
  },
  // {
  //   hrefLink: "/outline-gen",
  //   menuName: "Outline Generator",
  // },
  {
    hrefLink: "/tools/reddit-comment-generator",
    menuName: "Reddit Comment Generator",
  },
  {
    hrefLink: "/tools/ai-script-generator",
    menuName: "Script Generator",
  },
  {
    hrefLink: "/tools/geo-audit",
    menuName: "GEO Audit",
  }
];

const resourcesTab = [
  {
    hrefLink: "/blog",
    menuName: "Blogs",
  },
  {
    hrefLink: "/case-studies",
    menuName: "Case Studies",
  },
  {
    menuName: "Playbook",
    submenu: [
      {
        hrefLink: "/playbook/reddit-b2b-marketing",
        menuName: "Reddit B2B Playbook",
      },
      {
        hrefLink: "/playbook/developer-marketing",
        menuName: "Developer Playbook",
      },
    ],
  },
];

const Navbar = () => {
  const MenuItem2 = ({ children }) => {
    return children;
  };

  const [servicesOpen, setServicesOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [playbookOpen, setPlaybookOpen] = useState(false);
  
  // Shared state for desktop dropdowns
  const [openMenu, setOpenMenu] = useState(null);
  const [openSubmenus, setOpenSubmenus] = useState({});
  const [dropdownPosition, setDropdownPosition] = useState(0);
  const closeTimeoutRef = useRef(null);
  const menuRefs = useRef({});
  const dropdownRef = useRef(null);

  const context = useContext(AppContext);
  const pathname = usePathname();
  const { setProgress } = context;
  const [curPage, setCurPage] = useState(pathname);

  // Menu configurations
  const menuConfig = {
    services: { label: "Services", links: menuLinksArrServices },
    tools: { label: "Tools", links: toolsTab },
    resources: { label: "Resources", links: resourcesTab }
  };

  // Dropdown width in pixels (matches w-64 which is 256px)
  const DROPDOWN_WIDTH = 256;

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const checkVisitPage = (el) => {
    el === curPage ? setProgress(0) : setProgress(30);
    setCurPage(el);
  };

  const handleMenuEnter = (menuId) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    
    if (openMenu !== menuId) {
      setOpenSubmenus({});
    }
    
    const menuElement = menuRefs.current[menuId];
    if (menuElement) {
      const rect = menuElement.getBoundingClientRect();
      const parentRect = menuElement.offsetParent.getBoundingClientRect();
      // Center dropdown under menu item (DROPDOWN_WIDTH / 2)
      setDropdownPosition(rect.left - parentRect.left + rect.width / 2 - DROPDOWN_WIDTH / 2);
    }
    
    setOpenMenu(menuId);
  };

  const handleMenuLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setOpenMenu(null);
      setOpenSubmenus({});
    }, 150);
  };

  const handleLinkClick = (path) => {
    if (path) {
      checkVisitPage(path);
      setOpenMenu(null);
      setOpenSubmenus({});
      setTimeout(() => {
        window.location.href = path;
      }, 10);
    }
  };

  const togglePlaybook = () => setPlaybookOpen(!playbookOpen);
  const toggleServices = () => setServicesOpen(!servicesOpen);
  const toggleResources = () => setResourcesOpen(!resourcesOpen);
  const toggleTools = () => setToolsOpen(!toolsOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleServiceClick = (path) => {
    checkVisitPage(path);
    setTimeout(() => {
      window.location.href = path;
    }, 10);
  };

  return (
    <div className="w-full xs:pt-5 z-20 text-[#CFCAC7] gap-1 absolute">
      <div className={`navbar ${pathname === '/careers' ? 'bg-transparent' : 'bg-slate-900'} w-full sm:w-[80vw] md:max-w-6xl p-3 sm:p-5 mx-auto shadow-navshadow rounded-xl lg:absolute lg:left-[50vw] flex justify-center items-center lg:origin-center lg:transform lg:-translate-x-1/2`}>
        <div className="navbar-start max-lg:visible invisible">
          <Menu as="div" className="absolute inline-block text-left">
            <div>
              <MenuButton
                onClick={toggleMobileMenu}
                className="inline-flex items-center gap-20 w-full justify-center rounded-md text-sm font-semibold hover:bg-zinc-800/20"
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
                                "/services/developer-marketing-agency"
                              );
                            }}
                            href="/services/developer-marketing-agency"
                            className="block px-4 py-2 text-sm hover:bg-slate-800 rounded-lg ml-4"
                            target={
                              "/services/developer-marketing-agency".includes(
                                "http"
                              )
                                ? "_blank"
                                : ""
                            }
                          >
                            <div>Developer Marketing</div>
                          </Link>
                        </MenuItem2>
                         <MenuItem2>
                          <Link
                            onClick={(e) => {
                              e.preventDefault();
                              handleServiceClick(
                                "/services/ai-geo-optimization-agency"
                              );
                            }}
                            href="/services/ai-geo-optimization-agency"
                            className="block px-4 py-2 text-sm hover:bg-slate-800 rounded-lg ml-4"
                            target={
                              "/services/ai-geo-optimization-agency".includes(
                                "http"
                              )
                                ? "_blank"
                                : ""
                            }
                          >
                            <div>AEO/GEO Services </div>
                          </Link>
                        </MenuItem2>

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
                            <div>Webflow Design and Development</div>
                          </Link>
                        </MenuItem2>
                        <MenuItem2>
                          <Link
                            onClick={(e) => {
                              e.preventDefault();
                              handleServiceClick("/services/reddit-marketing-services");
                            }}
                            href="/services/reddit-marketing-services"
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
                          <MenuItem2>
                          <Link
                            onClick={(e) => {
                              e.preventDefault();
                              handleServiceClick(
                                "/services/product-documentation"
                              );
                            }}
                            href="/services/product-documentation"
                            className="block px-4 py-2 text-sm hover:bg-slate-800 rounded-lg ml-4"
                            target={
                              "/services/product-documentation".includes(
                                "http"
                              )
                                ? "_blank"
                                : ""
                            }
                          >
                            <div>Product Documentation</div>
                          </Link>
                        </MenuItem2>
                      </div>
                    )}
                  </div>

                  <MenuItem>
                    <Link
                      onClick={() => {
                        closeMobileMenu();
                        checkVisitPage("/pricing");
                      }}
                      href="/pricing"
                      className="block px-4 py-2 text-sm hover:bg-slate-800 rounded-lg"
                      target={"/pricing".includes("http") ? "_blank" : ""}
                    >
                      {"Pricing"}
                    </Link>
                  </MenuItem>

                  <div className="mobile-menu">
                    {/* Resources Dropdown */}
                    <MenuItem2>
                      <div
                        className="flex items-center justify-between px-4 py-2 text-sm hover:bg-slate-800 rounded-lg cursor-pointer"
                        onClick={toggleResources}
                      >
                        <p>Resources</p>
                        {resourcesOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </div>
                    </MenuItem2>

                    {resourcesOpen && (
                      <div className="bg-slate-900 rounded-lg mt-1 mb-2">
                        <MenuItem2>
                          <Link
                            onClick={(e) => {
                              e.preventDefault();
                              handleServiceClick("/blog");
                            }}
                            href="/blog"
                            className="block px-4 py-2 text-sm hover:bg-slate-800 rounded-lg ml-4"
                          >
                            <div>Blogs</div>
                          </Link>
                        </MenuItem2>
                        <MenuItem2>
                          <Link
                            onClick={(e) => {
                              e.preventDefault();
                              handleServiceClick("/case-studies");
                            }}
                            href="/case-studies"
                            className="block px-4 py-2 text-sm hover:bg-slate-800 rounded-lg ml-4"
                          >
                            <div>Case Studies</div>
                          </Link>
                        </MenuItem2>

                        {/* Playbook with Submenu */}
                        <MenuItem2>
                          <div
                            onClick={togglePlaybook}
                            className="flex items-center justify-between px-4 py-2 text-sm hover:bg-slate-800 rounded-lg ml-4 cursor-pointer"
                          >
                            <p>Playbook</p>
                            {playbookOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </div>
                        </MenuItem2>

                        {playbookOpen && (
                          <div className="ml-6 bg-slate-900 rounded-lg mt-1 mb-2">
                            <MenuItem2>
                              <Link
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleServiceClick("/playbook/reddit-b2b-marketing");
                                }}
                                href="/playbook/reddit-b2b-marketing"
                                className="block px-4 py-2 text-sm hover:bg-slate-800 rounded-lg"
                              >
                                Reddit B2B Playbook
                              </Link>
                            </MenuItem2>
                                <MenuItem2>
                              <Link
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleServiceClick("/playbook/developer-marketing");
                                }}
                                href="/playbook/developer-marketing"
                                className="block px-4 py-2 text-sm hover:bg-slate-800 rounded-lg"
                              >
                                Developer Marketing Playbook
                              </Link>
                            </MenuItem2>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="mobile-menu">
                    <MenuItem2>
                      <div
                        className="flex items-center justify-between px-4 py-2 text-sm hover:bg-slate-800 rounded-lg cursor-pointer"
                        onClick={toggleTools}
                      >
                        <p>Tools</p>
                        {toolsOpen ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        )}
                      </div>
                    </MenuItem2>

                    {toolsOpen && (
                      <div className="bg-slate-900 rounded-lg mt-1 mb-2">
                        <MenuItem2>
                          <Link
                            onClick={(e) => {
                              e.preventDefault();
                              handleServiceClick(
                                "/tools/roi-cal"
                              );
                            }}
                            href="/tools/roi-cal"
                            className="block px-4 py-2 text-sm hover:bg-slate-800 rounded-lg ml-4"
                            target={
                              "/tools/roi-cal".includes(
                                "http"
                              )
                                ? "_blank"
                                : ""
                            }
                          >
                            <div>ROI Calculator</div>
                          </Link>
                        </MenuItem2>

                        {/* <MenuItem2>
                          <Link
                            onClick={(e) => {
                              e.preventDefault();
                              handleServiceClick(
                                "/outline-gen"
                              );
                            }}
                            href="/outline-gen"
                            className="block px-4 py-2 text-sm hover:bg-slate-800 rounded-lg ml-4"
                            target={
                              "/outline-gen".includes(
                                "http"
                              )
                                ? "_blank"
                                : ""
                            }
                          >
                            <div>Outline Generator</div>
                          </Link>
                        </MenuItem2> */}
                        <MenuItem2>
                          <Link
                            onClick={(e) => {
                              e.preventDefault();
                              handleServiceClick(
                                "/tools/reddit-comment-generator"
                              );
                            }}
                            href="/tools/reddit-comment-generator"
                            className="block px-4 py-2 text-sm hover:bg-slate-800 rounded-lg ml-4"
                            target={
                              "/tools/reddit-comment-generator".includes(
                                "http"
                              )
                                ? "_blank"
                                : ""
                            }
                          >
                            <div>Reddit Comment Generator</div>
                          </Link>
                        </MenuItem2>

                        <MenuItem2>
                          <Link
                            onClick={(e) => {
                              e.preventDefault();
                              handleServiceClick(
                                "/tools/ai-script-generator"
                              );
                            }}
                            href="/tools/ai-script-generator"
                            className="block px-4 py-2 text-sm hover:bg-slate-800 rounded-lg ml-4"
                            target={
                              "/tools/ai-script-generator".includes(
                                "http"
                              )
                                ? "_blank"
                                : ""
                            }
                          >
                            <div>Script Generator</div>
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
                      href="/tools/roi-cal"
                      className="block px-4 py-2 text-sm hover:bg-slate-800 rounded-lg"
                      target={"/tools/roi-cal".includes("http") ? "_blank" : ""}
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
          className="btn btn-ghost w-full md:w-40"
          aria-label="Infrasity Home"
        >
          <div className="flex flex-col justify-center items-center">
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
        <div className="navbar-center hidden lg:flex relative">
          <ul className="menu menu-horizontal px-1 quicksand-semibold flex justify-center items-center">
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

            {Object.entries(menuConfig).map(([menuId, config]) => (
              <li key={menuId} ref={el => menuRefs.current[menuId] = el}>
                <MenuTrigger
                  head={config.label}
                  isOpen={openMenu === menuId}
                  onMouseEnter={() => handleMenuEnter(menuId)}
                  onMouseLeave={handleMenuLeave}
                />
              </li>
            ))}

            {openMenu && (
              <div
                ref={dropdownRef}
                className="absolute left-0 top-full mt-2 w-64 z-50"
                style={{ 
                  transform: `translateX(${dropdownPosition}px)`,
                  transition: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                onMouseEnter={() => {
                  if (closeTimeoutRef.current) {
                    clearTimeout(closeTimeoutRef.current);
                  }
                }}
                onMouseLeave={handleMenuLeave}
              >
                <div className="bg-slate-900 rounded-lg shadow-2xl ring-1 ring-white/10 backdrop-blur-xl opacity-100">
                  <DropdownContent
                    menuLinks={menuConfig[openMenu]?.links || []}
                    onLinkClick={handleLinkClick}
                    openSubmenus={openSubmenus}
                    setOpenSubmenus={setOpenSubmenus}
                  />
                </div>
              </div>
            )}

            <li>
              <Link
                href="/pricing"
                onClick={() => {
                  checkVisitPage("/pricing");
                }}
              >
                Pricing
              </Link>
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

            <li className="lg:mr-10">
              {!isMobileMenuOpen && <CalendarBooking buttonText="Book a Free Consultation" width="w-52" />}
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default Navbar;
