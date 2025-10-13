"use client";
import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import {  Download, Calendar, TrendingUp, BookOpen, Building} from "lucide-react";
import Image from "next/image";
import { Marquee } from "@devnomic/marquee";
import "@devnomic/marquee/dist/index.css";
import VideoTestimonials from "./testimonials";

import { LuSquareCode } from "react-icons/lu";
import { MdOutlineVideoLibrary } from "react-icons/md";
import {RiUserCommunityFill} from "react-icons/ri"
import { IoBookOutline } from "react-icons/io5";
import { FiUserCheck } from "react-icons/fi";
import { TiDocumentText } from "react-icons/ti";
import { SiMarketo } from "react-icons/si";




const fileList = [
  "aviator.png","mocha.png","cedana.png","dhiwise.png","amnic.png","oso.png","ox-sec.svg",
  "mvp-grow.png","cerbos.png","qodo-logo.png","Codegiant.png","Scalekit-logo.png","cycloid.png",
  "scalr.png","daytona.png","stackOne.png","DevZero.png","terrateam.png","env0-infra-1.png",
  "tracetest.png","firefly.png","TravisCI-Full-Color.png","firstock-logo.png","vapi-logo.png",
  "kapstan.png","Zenml.png","Kubiya.png","lovable-logo.png","Meteor-ops.png","middleware-logo.png"
];

const getLogoPadding = (filename) => {
  const paddingMap = {
    'aviator.png': 'p-3',
    'mocha.png': 'p-8',
    'cedana.png': 'p-5',
    'dhiwise.png': 'p-2',
    'amnic.png': 'p-5 filter brightness-0 invert',
    'mvp-grow.png': 'p-4',
    'cerbos.png': 'p-4',
    'qodo-logo.png': 'p-8',
    'Codegiant.png': 'p-4',
    'Scalekit-logo.png': 'p-4',
    'cycloid.png': 'p-7',
    'scalr.png': 'p-4',
    'daytona.png': 'p-5',
    'oso.png': 'p-12 ',
    'ox-sec.svg': 'p-8',
    'stackOne.png': 'p-4',
    'DevZero.png': 'p-4',
    'terrateam.png': 'p-4',
    'env0-infra-1.png': 'p-6',
    'tracetest.png': 'p-4',
    'firefly.png': 'p-5',
    'TravisCI-Full-Color.png': 'p-5',
    'firstock-logo.png': 'p-5',
    'vapi-logo.png': 'p-10',
    'kapstan.png': 'p-4',
    'Zenml.png': 'p-4',
    'Kubiya.png': 'p-5',
    'lovable-logo.png': 'p-4',
    'Meteor-ops.png': 'p-4',
    'middleware-logo.png': 'p-3',
  };
  return paddingMap[filename] || 'p-4';
};

export const Videos =[
  {
  id: "case-2",
  eyebrow: "CASE STUDIES",
  heading: "Hear directly from our customers",
  blurb: "",
  cta: { label: "See case studies", href: "/case-studies" },

  headshotSrc: "/playbook/firefly.png",
  headshotAlt: "Eric Peters",
  companyLogoSrc: "/playbook/firefly-bg.png",
  companyLogoAlt: "FireFly.ai",
  quote:"Infrasity’s unique ability to create deep, technical content that resonates with engineers has been valuable in helping us identify and address our customers pain points.",
  personName: "Idoo Neeman",
  personTitle: "Co-Founder and CEO, FireFly.ai",
  videoUrl: "https://youtube.com/shorts/AgCQ176pfRU",
},
{
  id: "case-1",
  eyebrow: "CASE STUDIES",
  heading: "Hear directly from our customers",
  blurb: "",
  cta: { label: "See case studies", href: "/case-studies" },

  headshotSrc: "/playbook/cycloid.png",
  headshotAlt: "Ben Hewison",
  companyLogoSrc: "/playbook/cycloid-bg.png",
  companyLogoAlt: "Cycloid",
  quote: "Infrasity’s experience in platform engineering and DevOps gave us confidence that they could translate our technical value into engaging content and videos.",
  personName: "Ben Hewison",
  personTitle: "Content Marketing Manager, Cycloid",
  videoUrl: "https://youtu.be/19Nz5OxaTtc",
}
]


export default function Page() {
  const [formData, setFormData] = useState({
    fullName: "",
    workEmail: "",
    companyName: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Add scroll-based lighting effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Calculate scroll progress (0 to 1)
      const scrollProgress = scrollY / (documentHeight - windowHeight);
      
      // Calculate glow position based on scroll
      const glowY = 40 + (scrollProgress * 40); // Move from 40% to 80%
      const glowX = 50 + (Math.sin(scrollProgress * Math.PI) * 10); // Subtle horizontal movement
      
      // Update background gradient
      const container = document.getElementById('main-container');
      if (container) {
        container.style.background = `
          radial-gradient(2000px circle at ${glowX}% ${glowY}%, rgba(162, 89, 255, ${0.15 + scrollProgress * 0.05}), transparent 70%),
          linear-gradient(180deg, #2B0A4E 0%, #1C062F 50%, #0B0811 100%)
        `;
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const validateForm = () => {
    const { workEmail, fullName, companyName } = formData;

    if (!workEmail || !fullName || !companyName) {
      setErrorMessage("All fields are required");
      return false;
    }

  const emailRegex = /^(?!.*@(gmail|yahoo|hotmail|outlook|live|aol|icloud|protonmail|pm\.me|yandex|gmx|zoho|mail|rediffmail)\.)[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(workEmail)) {
      setErrorMessage("Please enter a valid work email address");
      return false;
    }

    return true;
  };

  const handleDownload = async (e) => {
    e.preventDefault();
    
    setErrorMessage("");

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const payload = {
        fields: [
          { name: "fullname", value: formData.fullName },
          { name: "companyname", value: formData.companyName },
          { name: "email", value: formData.workEmail },
        ],
        context: {
          pageUri: window.location.href,
          pageName: "Developer Marketing Playbook",
        },
      };

      const response = await fetch("/api/playbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setIsSubmitted(true);
        // Download the PDF after successful submission
        setTimeout(() => {
          const link = document.createElement('a');
          link.href = "https://drive.google.com/uc?export=download&id=1g7crihLTZ_ikb0y_RVzZb1cLl2L4yNP2";
          link.download = 'Developer-Marketing-Playbook.pdf';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }, 100);
      } else {
        setErrorMessage("Failed to submit form. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Failed to submit form. Please try again.");
    } finally{
      setIsSubmitting(false);
    }
  };

  const handleBookDemo = () => {
    window.open('https://www.infrasity.com/contact', '_blank');
  };
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // adds smooth scrolling
    });
  };

  return (
    <>
      <style jsx global>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
        
        /* Smooth fade at left/right edges: mask-image works well (with -webkit prefix fallback) */
        .custom-marquee-mask {
          /* adjust percentages to change width of fade */
          -webkit-mask-image: linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 10%, rgba(0,0,0,1) 90%, rgba(0,0,0,0) 100%);
          mask-image: linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 10%, rgba(0,0,0,1) 90%, rgba(0,0,0,0) 100%);
          -webkit-mask-size: 100% 100%;
          mask-size: 100% 100%;
          /* ensure overlays/gaps are not clipped by mask */
        }

        /* Force the library's animated track to run slower.
           innerClassName attaches this class to the moving track, so overriding animation-duration
           here slows the scroll. */
        .custom-marquee-track {
          -webkit-animation-duration: 80s !important;
          animation-duration: 80s !important;
          /* keep linear timing for smooth constant speed */
          -webkit-animation-timing-function: linear !important;
          animation-timing-function: linear !important;
        }

        /* Some environments set animation on a child; add a safer override for any descendant animation */
        .custom-marquee-track * {
          -webkit-animation-duration: 80s !important;
          animation-duration: 80s !important;
        }

        /* Optional: nice image smoothing */
        .custom-marquee-mask img {
          transition: transform 300ms ease, opacity 300ms ease;
          will-change: transform, opacity;
        }

        /* responsive tweak: smaller height on small screens */
        @media (max-width: 640px) {
          .custom-marquee-mask img { height: 36px; width: auto; }
        }
      `}</style>
      <div 
     
        className="min-h-screen relative"

      >
      {/* Hero Section - First Fold */}
      <section 
        className="relative overflow-hidden flex flex-col justify-center"
      >
        
        <div 
          className="relative max-w-7xl mx-auto px-6 py-16 pt-40 w-full"
        >
          <div className="grid grid-cols-12 gap-8 items-center">
            {/* Left Content - Cols 1-6 */}
            <div className="col-span-12 lg:col-span-6 space-y-6">
              {/* Badge */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center bg-white/5 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium border border-[#A259FF]/30"
              >
                <span className="w-2 h-2 bg-[#A259FF] rounded-full mr-2 animate-pulse"></span>
                2025 Edition
              </motion.div>
              
              {/* Main Heading */}
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-white font-black leading-[1.05]"
                style={{ 
                  fontFamily: 'Geist Sans, Inter, sans-serif',
                  fontWeight: 800,
                  fontSize: 'clamp(42px, 5.2vw, 64px)',
                  letterSpacing: '-0.01em',
                  color: '#EDEAF2',
                  textShadow: '0 0 12px rgba(162, 89, 255, 0.15)'
                }}
              >
                The 2025 Developer Marketing <span className="text-[#A259FF]" style={{ textShadow: '0 0 8px rgba(162, 89, 255, 0.4)' }}>Playbook</span> for DevTool, B2B SaaS, AI Startups
              </motion.h1>
              
              {/* Subtitle */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl leading-relaxed"
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 400,
                  maxWidth: '42ch',
                  color: '#C9C4D6'
                }}
              >
                Trusted by Series A B2B SaaS startups like <span className="text-[#A259FF] font-semibold">Firefly ($23 M)</span>, <span className="text-[#A259FF] font-semibold">Scalekit ($5.5 M)</span>, <span className="text-[#A259FF] font-semibold">Kubiya</span>, and <span className="text-[#A259FF] font-semibold">Qodo ($40 M)</span> to scale developer marketing and adoption.
              </motion.p>
              
              {/* CTA Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <button 
                  onClick={handleBookDemo}
                  className="border-2 border-[#A259FF] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:bg-[#A259FF]/10 hover:shadow-[0_0_20px_rgba(162,89,255,0.3)] flex items-center justify-center"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Book a Free Demo
                </button>
              </motion.div>
              
            </div>

            {/* Right Form - Cols 7-12 */}
             {!isSubmitted ? (
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="col-span-12 lg:col-span-6"
              style={{
                background: 'rgba(255,255,255,.02)',
                border: '1px solid rgba(162,89,255,.15)',
                backdropFilter: 'blur(8px)',
                borderRadius: '16px',
                padding: '20px',
                boxShadow: '0 4px 20px rgba(0,0,0,.2), 0 0 20px rgba(162,89,255,.1)'
              }}
            >

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Full Name</label>
                  <input 
                    type="text" 
                    onChange={handleInputChange}
                    name="fullName"
                    value={formData.fullName}
                    className="w-full px-4 bg-white/3 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#A259FF] focus:border-[#A259FF] focus:shadow-[0_0_10px_rgba(162,89,255,0.3)] transition-all duration-200"
                    style={{ height: '48px' }}
                    placeholder="Full Name:"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Work Email</label>
                  <input 
                    type="email" 
                    name="workEmail"
                    value={formData.workEmail}
                    onChange={handleInputChange}
                    className="w-full px-4 bg-white/3 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#A259FF] focus:border-[#A259FF] focus:shadow-[0_0_10px_rgba(162,89,255,0.3)] transition-all duration-200"
                    style={{ height: '48px' }}
                    placeholder="Work Email:"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Company Name</label>
                  <input 
                    type="text" 
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="w-full px-4 bg-white/3 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#A259FF] focus:border-[#A259FF] focus:shadow-[0_0_10px_rgba(162,89,255,0.3)] transition-all duration-200"
                    style={{ height: '48px' }}
                    placeholder="Company Name:"
                  />
                </div>
                {/* <div> */}
                    {errorMessage && (
                  <div className="text-red-400 text-sm text-left">
                    {errorMessage}
                  </div>
                )}
                {/* </div> */}
                <div className="pt-2">
                <button 
                  type="button"
                  onClick={handleDownload}
                  disabled={isSubmitting}
                  className="w-full text-white py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center"
                  style={{ 
                    background: 'linear-gradient(90deg,#A259FF,#5B36FF)',
                    boxShadow: '0 0 20px rgba(162,89,255,0.3)'
                  }}
                >
                  <Download className="w-5 h-5 mr-2" />
                   {isSubmitting ? "Submitting..." : "Download Playbook"}
                </button>
                </div>
              </div>
            </motion.div>
            ): (
            <div className="col-span-12 lg:col-span-6">
              <div className="text-center">
                <div className="text-green-400 text-6xl mb-4">✓</div>
                <h2 className="text-3xl font-bold text-white mb-4">Success!</h2>
                <p className="text-gray-300 text-lg mb-6">
                  Thank you for your submission. Your playbook download will
                  begin shortly.
                </p>
              </div>
            </div>
          )}
          </div>


          {/* Trusted by Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="text-center"
          >
            <p className="text-sm mb-6" style={{ color: '#C9C4D6', opacity: 0.8 }}>
              Trusted by Leading DevTools
            </p>
            <div className="max-w-4xl mx-auto">
              <div
                className="relative w-full mx-auto overflow-hidden px-5 lg:px-12"
                aria-hidden={false}
              >
                <Marquee
                  className="custom-marquee-mask"
                  innerClassName="custom-marquee-track"
                  pauseOnHover={true}
                  fade={false}
                  direction="left"
                >
                  <div className="flex gap-10 items-center mx-4">
                    {fileList.map((file, index) => (
                      <div key={index} className={`mix-blend-color-burn ${getLogoPadding(file)}`}>
                        <Image
                          loading="lazy"
                          width={100}
                          height={80}
                          className="object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                          src={`/trustedby-bw/bw/${file}`}
                          alt={file}
                        />
                      </div>
                    ))}
                  </div>
                </Marquee>
              </div>
            </div>
          </motion.div>
        </div>
      </section>


      {/* Problem Section - Second Fold */}
      <section 
        className="py-20 relative"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl lg:text-5xl font-extrabold mb-8"
              style={{
                fontFamily: 'Quicksand',
                fontWeight: 800,
                letterSpacing: '-0.01em',
                color: '#EDEAF2',
                textShadow: '0 0 12px rgba(162, 89, 255, 0.15)'
              }}
            >
              Why Developer Marketing is the <span className="text-[#A259FF]" style={{ textShadow: '0 0 8px rgba(162, 89, 255, 0.4)' }}>Engine</span> Behind Every Successful DevTool
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl max-w-4xl mx-auto leading-relaxed"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                color: '#C9C4D6'
              }}
            >
              We've seen it first hand AI and infra teams move fast in product, but their story rarely keeps up.<br />
              That's why developer marketing can't be an afterthought anymore.
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-[#A259FF]/30 hover:shadow-[0_0_20px_rgba(162,89,255,0.2)] transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-[#A259FF] to-[#5B36FF] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <TiDocumentText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center font-['Inter',sans-serif]">Inconsistent Content</h3>
              <p className="text-gray-300 text-center leading-relaxed font-['Inter',sans-serif]">
                Your blog, docs, and social posts don't speak the same technical language developers expect.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:shadow-[0_0_20px_rgba(162,89,255,0.2)] transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-[#A259FF] to-[#5B36FF] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <LuSquareCode className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center font-['Inter',sans-serif]">Underfunded DevRel</h3>
              <p className="text-gray-300 text-center leading-relaxed font-['Inter',sans-serif]">
                Without dedicated developer advocates, your product stays invisible in the communities that matter.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="group bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:shadow-[0_0_20px_rgba(162,89,255,0.2)] transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-[#A259FF] to-[#5B36FF] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <FiUserCheck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center font-['Inter',sans-serif]">Lack of Technical Credibility</h3>
              <p className="text-gray-300 text-center leading-relaxed font-['Inter',sans-serif]">
                Marketing fluff without code samples, real use cases, and technical depth kills trust instantly.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
   <div
              className="mb-10"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 0%, #272b40 0%, transparent 40%)",
              }}
            >
              <div className="w-full mt-10 h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5"></div>
      {/* What You'll Learn Section - Third Fold */}
      <section 
        className="py-20 relative"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl lg:text-5xl mb-6"
              style={{
                fontFamily: 'Quicksand',
                fontWeight: 800,
                letterSpacing: '-0.01em',
                color: '#EDEAF2',
                textShadow: '0 0 12px rgba(162, 89, 255, 0.15)'
              }}
            >
              What You'll <span 
                style={{
                  color: '#A259FF',
                  textShadow: '0 0 8px rgba(162, 89, 255, 0.4)'
                }}
              >Learn</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl max-w-4xl mx-auto leading-relaxed"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                color: '#C9C4D6'
              }}
            >
              A comprehensive guide to building developer-first marketing strategies that actually worked for AI companies.
            </motion.p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Learning cards */}
            <div className="space-y-4">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="group p-4 rounded-2xl transition-all duration-300 hover:transform hover:-translate-y-1"
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(162, 89, 255, 0.25)',
                  backdropFilter: 'blur(12px)',
                  boxShadow: `
                    0 8px 32px rgba(0, 0, 0, 0.5),
                    0 0 40px rgba(162, 89, 255, 0.15)
                  `
                }}
              >
                <div className="flex items-start space-x-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                    style={{
                      background: 'linear-gradient(90deg, #A259FF, #5B36FF)',
                      boxShadow: '0 0 20px rgba(162, 89, 255, 0.3)'
                    }}
                  >
                    <SiMarketo className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 
                      className="text-xl mb-2" 
                      style={{ 
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 700,
                        letterSpacing: '-0.01em',
                        color: '#C9C4D6',
                        textShadow: '0 0 8px rgba(162, 89, 255, 0.1)'
                      }}
                    >
                      6 Core Pillars of Developer Marketing
                    </h3>
                    <p 
                      className="leading-relaxed" 
                      style={{ 
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 400,
                        letterSpacing: '-0.005em',
                        color: '#C9C4D6'
                      }}
                    >
                      Master the framework that drives developer adoption
                    </p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="group p-4 rounded-2xl transition-all duration-300 hover:transform hover:-translate-y-1"
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(162, 89, 255, 0.25)',
                  backdropFilter: 'blur(12px)',
                  boxShadow: `
                    0 8px 32px rgba(0, 0, 0, 0.5),
                    0 0 40px rgba(162, 89, 255, 0.15)
                  `
                }}
              >
                <div className="flex items-start space-x-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                    style={{
                      background: 'linear-gradient(90deg, #A259FF, #5B36FF)',
                      boxShadow: '0 0 20px rgba(162, 89, 255, 0.3)'
                    }}
                  >
                    <FiUserCheck  className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 
                      className="text-xl mb-2" 
                      style={{ 
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 700,
                        letterSpacing: '-0.01em',
                        color: '#C9C4D6',
                        textShadow: '0 0 8px rgba(162, 89, 255, 0.1)'
                      }}
                    >
                      Building Developer Trust
                    </h3>
                    <p 
                      className="leading-relaxed" 
                      style={{ 
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 400,
                        letterSpacing: '-0.005em',
                        color: '#C9C4D6'
                      }}
                    >
                      Learn how to create authentic technical content that resonates
                    </p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="group p-4 rounded-2xl transition-all duration-300 hover:transform hover:-translate-y-1"
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(162, 89, 255, 0.25)',
                  backdropFilter: 'blur(12px)',
                  boxShadow: `
                    0 8px 32px rgba(0, 0, 0, 0.5),
                    0 0 40px rgba(162, 89, 255, 0.15)
                  `
                }}
              >
                <div className="flex items-start space-x-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                    style={{
                      background: 'linear-gradient(90deg, #A259FF, #5B36FF)',
                      boxShadow: '0 0 20px rgba(162, 89, 255, 0.3)'
                    }}
                  >
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 
                      className="text-xl mb-2" 
                      style={{ 
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 700,
                        letterSpacing: '-0.01em',
                        color: '#C9C4D6',
                        textShadow: '0 0 8px rgba(162, 89, 255, 0.1)'
                      }}
                    >
                      Docs & SDKs as Growth Engines
                    </h3>
                    <p 
                      className="leading-relaxed" 
                      style={{ 
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 400,
                        letterSpacing: '-0.005em',
                        color: '#C9C4D6'
                      }}
                    >
                      Transform documentation into your most powerful marketing asset
                    </p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="group p-4 rounded-2xl transition-all duration-300 hover:transform hover:-translate-y-1"
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(162, 89, 255, 0.25)',
                  backdropFilter: 'blur(12px)',
                  boxShadow: `
                    0 8px 32px rgba(0, 0, 0, 0.5),
                    0 0 40px rgba(162, 89, 255, 0.15)
                  `
                }}
              >
                <div className="flex items-start space-x-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                    style={{
                      background: 'linear-gradient(90deg, #A259FF, #5B36FF)',
                      boxShadow: '0 0 20px rgba(162, 89, 255, 0.3)'
                    }}
                  >
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 
                      className="text-xl mb-2" 
                      style={{ 
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 700,
                        letterSpacing: '-0.01em',
                        color: '#C9C4D6',
                        textShadow: '0 0 8px rgba(162, 89, 255, 0.1)'
                      }}
                    >
                      Measuring Developer Marketing ROI
                    </h3>
                    <p 
                      className="leading-relaxed" 
                      style={{ 
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 400,
                        letterSpacing: '-0.005em',
                        color: '#C9C4D6'
                      }}
                    >
                      Track what matters with real metrics and case studies
                    </p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="group p-4 rounded-2xl transition-all duration-300 hover:transform hover:-translate-y-1"
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(162, 89, 255, 0.25)',
                  backdropFilter: 'blur(12px)',
                  boxShadow: `
                    0 8px 32px rgba(0, 0, 0, 0.5),
                    0 0 40px rgba(162, 89, 255, 0.15)
                  `
                }}
              >
                <div className="flex items-start space-x-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                    style={{
                      background: 'linear-gradient(90deg, #A259FF, #5B36FF)',
                      boxShadow: '0 0 20px rgba(162, 89, 255, 0.3)'
                    }}
                  >
                    <Building className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 
                      className="text-xl mb-2" 
                      style={{ 
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 700,
                        letterSpacing: '-0.01em',
                        color: '#C9C4D6',
                        textShadow: '0 0 8px rgba(162, 89, 255, 0.1)'
                      }}
                    >
                      Case Studies from Firefly & Scalekit
                    </h3>
                    <p 
                      className="leading-relaxed" 
                      style={{ 
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 400,
                        letterSpacing: '-0.005em',
                        color: '#C9C4D6'
                      }}
                    >
                      Real-world examples of 781%+ traffic growth strategies
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right side - 3D Book */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 0.9 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative flex justify-center lg:w-[30rem] lg:h-[32rem] xl:w-[33rem] xl:h-[37rem] rounded-[15px] bg-gradient-to-r from-[#A259FF] to-[#5B36FF] "
            >
              <Image loading="lazy"
              className="min-w-[130%] -ml-12"
                          width={800}
                          height={700}
                          src='/playbook/playbook.png'
                          alt='Developer Marketing Playbook' />
            </motion.div>
          </div>
        </div>
      </section>
</div>
      {/* Results Section - Fourth Fold */}
      <section 
        className="py-20 relative"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl lg:text-5xl font-black mb-8"
              style={{
                fontFamily: 'Quicksand',
                fontWeight: 800,
                letterSpacing: '-0.01em',
                color: '#EDEAF2',
                textShadow: '0 0 12px rgba(162, 89, 255, 0.15)'
              }}
            >
              Success Stories from <span className="text-[#A259FF]" style={{ textShadow: '0 0 8px rgba(162, 89, 255, 0.4)' }}>B2B SAAS Startups</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl max-w-4xl mx-auto leading-relaxed"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                color: '#C9C4D6'
              }}
            >
              See how leading startups transformed their developer marketing into growth engines.
            </motion.p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white/3 backdrop-blur-sm p-10 rounded-2xl border border-white/10 hover:shadow-[0_0_20px_rgba(162,89,255,0.2)] transition-all duration-300"
            >
              <h3 className="text-2xl font-bold text-white mb-2 font-['Inter',sans-serif]">Firefly.ai - $23 M Series A Startup</h3>
              <p className="text-gray-400 mb-6 text-sm font-['Inter',sans-serif] italic">
                Shifted from fragmented documentation to a developer-first content engine.
              </p>
              <div className="text-6xl font-black text-[#A259FF] mb-3">+781%</div>
              <div className="text-xl text-white mb-4 font-medium">Organic Traffic Growth</div>
              <p className="text-gray-300 mb-6 leading-relaxed font-['Inter',sans-serif]">
                From 3.7K to 32.6K monthly organic visitors through developer-first content strategy.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="w-2 h-2 bg-[#A259FF] rounded-full"></div>
                  <span className="font-['Inter',sans-serif]">Strategic technical content</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="w-2 h-2 bg-[#A259FF] rounded-full"></div>
                  <span className="font-['Inter',sans-serif]">Developer community activation</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="w-2 h-2 bg-[#A259FF] rounded-full"></div>
                  <span className="font-['Inter',sans-serif]">SEO-optimized documentation</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-white hover:text-[#A259FF] transition-colors cursor-pointer">
                <TrendingUp className="w-4 h-4 text-[#A259FF]" />
                <span className="font-medium font-['Inter',sans-serif]">Case Study</span>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white/3 backdrop-blur-sm p-10 rounded-2xl border border-white/10 hover:shadow-[0_0_20px_rgba(162,89,255,0.2)] transition-all duration-300"
            >
              <h3 className="text-2xl font-bold text-white mb-2 font-['Inter',sans-serif]">Scalekit.com - $5.5 M Seed Startup</h3>
              <p className="text-gray-400 mb-6 text-sm font-['Inter',sans-serif] italic">
                Launched from stealth to developer adoption in under 9 months.
              </p>
              <div className="text-6xl font-black text-[#A259FF] mb-3">+828%</div>
              <div className="text-xl text-white mb-4 font-medium">Developer Signups</div>
              <p className="text-gray-300 mb-6 leading-relaxed font-['Inter',sans-serif]">
                Achieved 44% more developer signups in just 9 months with targeted DevRel.
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="w-2 h-2 bg-[#A259FF] rounded-full"></div>
                  <span className="font-['Inter',sans-serif]">Interactive code samples</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="w-2 h-2 bg-[#A259FF] rounded-full"></div>
                  <span className="font-['Inter',sans-serif]">Developer-first messaging</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="w-2 h-2 bg-[#A259FF] rounded-full"></div>
                  <span className="font-['Inter',sans-serif]">Community-driven growth</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-white hover:text-[#A259FF] transition-colors cursor-pointer">
                <TrendingUp className="w-4 h-4 text-[#A259FF]" />
                <span className="font-medium font-['Inter',sans-serif]">Case Study</span>
              </div>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white/3 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:shadow-[0_0_20px_rgba(162,89,255,0.1)] transition-all duration-300"
            >
              <div className="text-5xl font-black text-[#A259FF] mb-3">781%</div>
              <div className="text-white font-medium font-['Inter',sans-serif]">Average Traffic Growth</div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/3 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:shadow-[0_0_20px_rgba(162,89,255,0.1)] transition-all duration-300"
            >
              <div className="text-5xl font-black text-[#A259FF] mb-3">44%</div>
              <div className="text-white font-medium font-['Inter',sans-serif]">More Developer Signups</div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white/3 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:shadow-[0_0_20px_rgba(162,89,255,0.1)] transition-all duration-300"
            >
              <div className="text-5xl font-black text-[#A259FF] mb-3">30+</div>
              <div className="text-white font-medium font-['Inter',sans-serif]">DevTool & AI Startups Served</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Infrasity Section - Fifth Fold */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                 fontFamily: 'Quicksand'
              }}
              className="text-4xl lg:text-5xl font-black text-white mb-8 font-['Inter',sans-serif]"
            >
              Built by <span className="text-[#A259FF]">Engineers.</span> Designed for <span className="text-[#A259FF]">Developers.</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-white max-w-4xl mx-auto leading-relaxed font-['Inter',sans-serif]"
            >
              Infrasity specializes in developer-centric GTM — from content strategy and video explainers 
              to documentation and community activation.
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group text-center bg-white/3 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:shadow-[0_0_20px_rgba(162,89,255,0.1)] transition-all duration-300"
            >
              <div className="w-16 h-16 bg-[#A259FF] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <IoBookOutline className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 font-['Inter',sans-serif]">Content Strategy</h3>
              <p className="text-gray-300 leading-relaxed font-['Inter',sans-serif]">
                Technical content that developers actually want to read.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group text-center bg-white/3 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:shadow-[0_0_20px_rgba(162,89,255,0.1)] transition-all duration-300"
            >
              <div className="w-16 h-16 bg-[#A259FF] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <LuSquareCode className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 font-['Inter',sans-serif]">Documentation</h3>
              <p className="text-gray-300 leading-relaxed font-['Inter',sans-serif]">
                Transform docs into your most powerful growth asset.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="group text-center bg-white/3 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:shadow-[0_0_20px_rgba(162,89,255,0.1)] transition-all duration-300"
            >
              <div className="w-16 h-16 bg-[#A259FF] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <MdOutlineVideoLibrary className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 font-['Inter',sans-serif]">Video Explainers</h3>
              <p className="text-gray-300 leading-relaxed font-['Inter',sans-serif]">
                Visual storytelling for complex technical concepts.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="group text-center bg-white/3 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:shadow-[0_0_20px_rgba(162,89,255,0.1)] transition-all duration-300"
            >
              <div className="w-16 h-16 bg-[#A259FF] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <RiUserCommunityFill  className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 font-['Inter',sans-serif]">Community Activation</h3>
              <p className="text-gray-300 leading-relaxed font-['Inter',sans-serif]">
                Build and engage developer communities that scale.
              </p>
            </motion.div>
          </div>
          
         <div className='mt-28'> 
         <VideoTestimonials items={Videos}/>
         </div> 
        </div>
      </section>

      {/* Final CTA Section - Last Fold */}
      <div
              className="mb-10"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 0%, #272b40 0%, transparent 40%)",
              }}
            >
              <div className="w-full mt-10 h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5"></div>
      
                <section 
        className="py-20 relative overflow-hidden"
      >
        
        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl lg:text-5xl font-black mb-8"
              style={{
                fontFamily: 'Quicksand',
                fontWeight: 800,
                letterSpacing: '-0.01em',
                color: '#EDEAF2',
                textShadow: '0 0 12px rgba(162, 89, 255, 0.15)'
              }}
            >
              Ready to Build Your <span className="text-[#A259FF]" style={{ textShadow: '0 0 8px rgba(162, 89, 255, 0.4)' }}>Developer</span> <span className="text-[#A259FF]" style={{ textShadow: '0 0 8px rgba(162, 89, 255, 0.4)' }}>Growth Engine?</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl max-w-4xl mx-auto leading-relaxed"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                color: '#C9C4D6'
              }}
            >
              Get the complete playbook and discover how to turn developer marketing into your competitive advantage.
            </motion.p>
          </div>
          
          <div className="text-center mb-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <button
                onClick={handleScrollToTop}
                className="text-white py-4 px-8 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center"
                style={{ 
                  background: 'linear-gradient(90deg,#A259FF,#5B36FF)',
                  boxShadow: '0 0 20px rgba(162,89,255,0.3)'
                }}
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Download Free Playbook
              </button>
              <button 
                onClick={handleBookDemo}
                className="border-2 border-[#A259FF] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:bg-[#A259FF]/10 hover:shadow-[0_0_20px_rgba(162,89,255,0.3)] flex items-center justify-center"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book a Free Demo
              </button>
            </motion.div>
          </div>
          
        </div>
      </section>
      </div>
 
      </div>
    </>
  );
}
