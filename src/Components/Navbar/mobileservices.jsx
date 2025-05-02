import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";

const MenuItem = ({ children }) => {
  return children;
};

const MobileMenu = ({ closeParentMenu }) => {
  const [servicesOpen, setServicesOpen] = useState(false);

  const toggleServices = () => {
    setServicesOpen(!servicesOpen);
  };

  const handleServiceClick = (path) => {
    console.log("Visited:", path);
    setServicesOpen(false);
    if (closeParentMenu) closeParentMenu();
  };

  return (
    <div className="mobile-menu">
      <MenuItem>
        <div
          className="flex items-center justify-between px-4 py-2 text-sm hover:bg-slate-800 rounded-lg cursor-pointer"
          onClick={toggleServices}
        >
          <p>Services</p>
          {servicesOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </MenuItem>

      {servicesOpen && (
        <div className="bg-slate-900 rounded-lg mt-1 mb-2">
          <MenuItem>
            <Link
              onClick={() => {
                handleServiceClick("/services/technical-writing-services");
              }}
              href="/services/technical-writing-services"
              className="block px-4 py-2 text-sm hover:bg-slate-800 rounded-lg ml-4"
              target={
                "/services/technical-writing-services".includes("http")
                  ? "_blank"
                  : ""
              }
            >
              <div>Technical Writing Services</div>
            </Link>
          </MenuItem>

          <MenuItem>
            <Link
              onClick={() => {
                handleServiceClick("/services/service-video-production");
              }}
              href="/services/service-video-production"
              className="block px-4 py-2 text-sm hover:bg-slate-800 rounded-lg ml-4"
              target={
                "service-video-production".includes("http") ? "_blank" : ""
              }
            >
              <div>Video Production</div>
            </Link>
          </MenuItem>

          <MenuItem>
            <Link
              onClick={() => {
                handleServiceClick("/services/webflow-agency");
              }}
              href="/services/webflow-agency"
              className="block px-4 py-2 text-sm hover:bg-slate-800 rounded-lg ml-4"
              target={"webflow-agency".includes("http") ? "_blank" : ""}
            >
              <div>Webflow Agency</div>
            </Link>
          </MenuItem>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
