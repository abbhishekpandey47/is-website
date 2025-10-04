"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import TooltipIcon from "./TooltipIcon";
import { saveUserData } from "./user";
import CalendarBooking from "../../book-a-demo/calendarButton";
import { ChevronDown, ChevronUp } from "lucide-react";

const ContentROICalculator = () => {
  const [isMobile, setIsMobile] = useState(false);
  //const [contentTeamExist, setContentTeamExist] = useState(false);
  const [trafficGrowthBlogPost, setTrafficGrowthBlogPost] = useState(10);
  const [domainExpertisResult, setDomainExpertisResult] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };

      handleResize();

      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const [isLoading, setIsLoading] = useState(false);

  const [isEmailSending, setIsEmailSending] = useState(false);

  const [isPopup, setIsPopup] = useState(false);

  const handlePopup = () => {
    setIsPopup(true);
  };

  const closePopup = () => {
    setIsPopup(false);
  };

  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null);
  const [blogPerPost, setBlogPerPost] = useState(0);
  const [blogPerPostQunt, setblogPerPostQunt] = useState(0);
  const [timelineInMonth, setTimelineInMonth] = useState(0);
  const [budgetError, setBudgetError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsEmailSending(true);

    const {
      budget,
      blogPosts,
      trafficGrowth,
      contentTeam,
      domainExpertise,
      timeline,
    } = formValues;

    if (!email) {
      setIsEmailSending(false);
      return;
    }

    try {
      const userData = {
        email,
        budget,
        blogPosts,
        trafficGrowth: trafficGrowth || "",
        contentTeam: contentTeam || "No",
        domainExpertise: domainExpertise || "False",
        timeline: timeline || "",
        submittedAt: new Date().toISOString(),
      };

      console.log("Submitting form data:", userData);

      const result = await saveUserData(userData);

      if (result && result.status === "success") {
        setIsEmailSending(false);
        setIsSubmitted(true);

        console.log("Form data saved successfully:", userData);
      } else {
        throw new Error("Received unsuccessful response from saveUserData");
      }
    } catch (error) {
      setIsEmailSending(false);
      setErrorMessage("Failed to submit form. Please try again.");
      console.error("Error saving form data:", error);
    }
  };

  const [formValues, setFormValues] = useState({
    budget: "",
    blogPosts: 3,
    trafficGrowth: "Quarter",
    contentTeam: "No",
    domainExpertise: false,
    timeline: 1,
  });

  const [results, setResults] = useState({
    inHouseCost: 0,
    outsourcedCost: 0,
    savings: 0,
    savingsPercentage: 0,
    hasCalculated: false,
    monthsInHouse: 0,
    monthsAgency: 0,
    timeSaved: 0,
    projectSavings: 0,
  });

  const handleInputChange = useCallback((field, value) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const handleOutput = () => {
    setResults((prev) => ({
      ...prev,
      hasCalculated: false,
    }));
  };

  const handleOperation = (msg) => {
    setError(msg);
  };

  const handleInfo = (msg) => {
    setInfo(msg);
  };

  const handlePostChange = (domainExpertis, valueOfBlogePost) => {
    const { blogPosts } = formValues;

    const currValueOutSource = domainExpertis ? 540 : 495;
    const budgetValue = valueOfBlogePost
      ? valueOfBlogePost * currValueOutSource
      : blogPosts * currValueOutSource;

    setBudgetError(false);
    handleInputChange("budget", budgetValue);
  };

  // Handle budget input with proper validation
  const handleBudgetChange = useCallback(
    (e) => {
      const { domainExpertise } = formValues;

      if (parseInt(e.target.value) < 495) {
        setBudgetError(true);
      } else {
        setBudgetError(false);
      }

      const value = e.target.value.replace(/[^\d]/g, "");
      handleInputChange("budget", value === "" ? "" : parseInt(value, 10) || 0);

      const currValueOutSource = domainExpertise ? 540 : 495;
      handleInputChange("blogPosts", Math.floor(value / currValueOutSource));

      handleInputChange("");
    },
    [handleInputChange]
  );


  const handleCalculate = useCallback(() => {
    setIsLoading(true);

    const { blogPosts, timeline, budget, domainExpertise, trafficGrowth } =
      formValues;

    const { hasCalculated } = results;

    if (budget < 1) {
      handleOperation("Budget must be greater than 0.");
      setIsLoading(false);

      if (hasCalculated) {
        handleOutput();
      }

      return;
    }

    if (blogPosts <= 0) {
      handleOperation("To proceed, select one or more posts.");
      setIsLoading(false);
      return;
    }

    // Scope-based calculation model
    const targetAssets = blogPosts;
    const inHouseMonthlyCost = 6500;
    const inHouseCapacity = 2.5; // midpoint of 2-3 assets/month
    const agencyPricePerAsset = domainExpertise ? 540 : 495;
    const agencyCapacity = 6; // max capacity per month

    // Calculate months needed
    const monthsInHouse = Math.ceil(targetAssets / inHouseCapacity);
    let monthsAgency = Math.ceil(targetAssets / agencyCapacity);
    
    // Calculate recommended timeline if assets exceed monthly capacity
    if (targetAssets > 6) {
      monthsAgency = Math.ceil(targetAssets / 6); // 6 is the max capacity per month
      // Show as error if timeline doesn't comply, info if it does
      if (timeline < monthsAgency) {
        handleOperation(
          `For ${targetAssets} assets, we recommend a ${monthsAgency}-month timeline (6 assets/month max). This will deliver all ${targetAssets} assets over ${monthsAgency} months.`
        );
      } else {
        handleInfo(
          `For ${targetAssets} assets, we recommend a ${monthsAgency}-month timeline (6 assets/month max). This will deliver all ${targetAssets} assets over ${monthsAgency} months.`
        );
      }
    }

    // Calculate costs for scope mode (for project summary)
    const valInHouseCost = monthsInHouse * inHouseMonthlyCost;
    const valOutsourcedCost = targetAssets * agencyPricePerAsset;
    const valProjectSavings = valInHouseCost - valOutsourcedCost;

    // Calculate monthly mode costs (for main ROI card)
    const monthlyInHouseCost = inHouseMonthlyCost; // $6,500
    // Monthly agency cost = min(assets per month, capacity) × price per asset
    const assetsPerMonth = Math.min(targetAssets / monthsAgency, agencyCapacity);
    const monthlyAgencyCost = assetsPerMonth * agencyPricePerAsset;
    const monthlySavings = monthlyInHouseCost - monthlyAgencyCost;
    const monthlySavingsPercentage = Math.round((monthlySavings / monthlyInHouseCost) * 100);

    // Calculate time saved
    const timeSaved = monthsInHouse - monthsAgency;

    // Clear previous messages at the start
    if (error) {
      setError(null);
    }
    if (info) {
      setInfo(null);
    }

    setblogPerPostQunt(targetAssets);
    setBlogPerPost(agencyPricePerAsset);
    setTimelineInMonth(monthsAgency);

    if (domainExpertise) {
      setDomainExpertisResult(true);
    } else {
      setDomainExpertisResult(false);
    }

    if (trafficGrowth === "Immediately") {
      setTrafficGrowthBlogPost(10);
    } else if (trafficGrowth === "Quarter") {
      setTrafficGrowthBlogPost(20);
    } else if (trafficGrowth === "Year") {
      setTrafficGrowthBlogPost(40);
    } else {
      setTrafficGrowthBlogPost(20);
    }

    setTimeout(() => {
      setResults({
        inHouseCost: monthlyInHouseCost,
        outsourcedCost: monthlyAgencyCost,
        savings: monthlySavings,
        savingsPercentage: monthlySavingsPercentage,
        hasCalculated: true,
        monthsInHouse: monthsInHouse,
        monthsAgency: monthsAgency,
        timeSaved: timeSaved,
        projectSavings: valProjectSavings,
      });

      // End loading animation
      setIsLoading(false);
    }, 1000);
  }, [formValues]);

  const {
    budget,
    blogPosts,
    trafficGrowth,
    contentTeam,
    domainExpertise,
    timeline,
  } = formValues;
  const {
    inHouseCost,
    outsourcedCost,
    savings,
    savingsPercentage,
    hasCalculated,
    monthsInHouse,
    monthsAgency,
    timeSaved,
    projectSavings,
  } = results;

  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { value: 1, label: "1 month" },
    { value: 2, label: "2 months" },
    { value: 3, label: "3 months" },
    { value: 4, label: "4 months" },
    { value: 5, label: "5 months" },
    { value: 6, label: "6 months" },
    { value: 7, label: "7 months" },
    { value: 8, label: "8 months" },
    { value: 9, label: "9 months" },
    { value: 10, label: "10 months" },
    { value: 11, label: "11 months" },
    { value: 12, label: "12 months" },
  ];

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (value) => {
    handleInputChange("timeline", parseInt(value));
    setIsOpen(false);
  };

  const selectedOption = options.find((option) => option.value === timeline);

  const [isOpenContent, setIsOpenContent] = useState(false);
  const [isOpenTraffic, setIsOpenTraffic] = useState(false);

  const optionsContent = [
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" },
  ];

  const optionsTraffic = [
    { value: "Immediately", label: "Immediately" },
    { value: "Quarter", label: "Quarter" },
    { value: "Year", label: "Year" },
  ];

  const toggleDropdownContent = () => setIsOpenContent(!isOpenContent);

  const handleSelectContent = (value) => {
    handleInputChange("contentTeam", value);
    setIsOpenContent(false);
  };

  const toggleDropdownTraffic = () => setIsOpenTraffic(!isOpenTraffic);

  const handleSelectTraffic = (value) => {
    handleInputChange("trafficGrowth", value);
    setIsOpenTraffic(false);
  };

  const selectedOptionContent = optionsContent.find(
    (option) => option.value === contentTeam
  );

  const selectedOptionTraffic = optionsTraffic.find(
    (option) => option.value === trafficGrowth
  );

  const dropdownRef = useRef(null);
  const dropdownRefContent = useRef(null);
  const dropdownRefTraffic = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
      if (
        dropdownRefContent.current &&
        !dropdownRefContent.current.contains(event.target)
      ) {
        setIsOpenContent(false);
      }
      if (
        dropdownRefTraffic.current &&
        !dropdownRefTraffic.current.contains(event.target)
      ) {
        setIsOpenTraffic(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    setIsVisible(true);

    setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  };

  const showTooltip = isVisible || isHovered;

  return (
    <div className="w-full max-w-6xl mx-auto p-6 font-sans mb-24">
      <div>
        <div className="w-full rounded-2xl p-6 bg-white/5 border border-white/10 shadow-xl text-white">
          <div className={`flex ${isMobile ? "flex-col" : "flex-row"} gap-8`}>
            {/* Left */}

            <div className="w-full lg:w-1/2">
              <h2 className="text-2xl font-bold text-center mb-8">
                Enter your details
              </h2>
              <div className="mb-5 group">
                <div className="relative inline-block">
                  <label className="block text-gray-300 mb-2">
                    Monthly content budget
                    <TooltipIcon
                      description="Estimated amount you want to spend on content per month."
                      width="400px"
                    />
                  </label>
                </div>

                <div className="relative">
                  <div className="absolute left-0 top-0 bottom-0 flex items-center pl-3 pointer-events-none">
                    <span className="text-gray-300">$</span>
                  </div>
                  <input
                    placeholder="Content Budget in USD"
                    type="text"
                    inputMode="numeric"
                    value={budget}
                    onChange={handleBudgetChange}
                    className="w-full pl-8 pr-4 py-3 border border-gray-700 rounded-lg bg-gray-800/50 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                {budgetError && (
                  <div className="mt-2 text-red-500 text-sm flex items-center">
                    Budget must be at least $495.
                  </div>
                )}
              </div>

              <div className="mb-5 group">
                <div className="relative inline-block">
                  <label className="block text-gray-300 mb-2">
                    Blog posts per month
                    <TooltipIcon
                      description="Number of blog articles you expect to publish each month."
                      width="390px"
                    />
                  </label>
                </div>
                <div className="mt-1">
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={blogPosts}
                    onChange={(e) => {
                      handleInputChange("blogPosts", parseInt(e.target.value));
                      handlePostChange(
                        domainExpertise,
                        parseInt(e.target.value)
                      );
                    }}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                  <div className="flex justify-between text-xl text-gray-400 mt-1">
                    <span className="text-blue-400 font-medium">
                      {blogPosts}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-5 group">
                <div className="flex justify-between items-center">
                  <label className="block text-gray-300">
                    Domain expertise required?
                    <TooltipIcon
                      description="K8s, IAM, SDK docs, etc."
                      width="200px"
                    />
                  </label>
                  <div className="relative inline-block w-12 h-6">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={domainExpertise}
                      onChange={() => {
                        handleInputChange("domainExpertise", !domainExpertise);
                        handlePostChange(!domainExpertise);
                      }}
                      id="toggle"
                    />
                    <label
                      htmlFor="toggle"
                      className={`absolute cursor-pointer rounded-full w-12 h-6 ${domainExpertise ? "bg-blue-500" : "bg-gray-700"
                        }`}
                    >
                      <span
                        className={`absolute rounded-full w-4 h-4 top-1 transition-transform duration-300 ease-in-out ${domainExpertise
                          ? "bg-white transform translate-x-7"
                          : "bg-white translate-x-1"
                          }`}
                      />
                    </label>
                  </div>
                </div>
                <div className="text-right text-gray-300 mt-1">
                  {domainExpertise ? "Yes" : "No"}
                </div>
              </div>

              <div className="mb-5 group">
                <label className="block text-gray-300 mb-2">
                  Target traffic growth
                  <TooltipIcon
                    description="Select when you expect to see traffic growth results."
                    width="280px"
                  />
                </label>
                <div ref={dropdownRefTraffic} className="relative">
                  <button
                    onClick={toggleDropdownTraffic}
                    className="w-full px-4 py-3 bg-gray-800/50 rounded-lg text-left appearance-none font-medium focus:outline-none border border-gray-700 flex justify-between items-center"
                  >
                    <span className="text-md text-white">
                      {selectedOptionTraffic?.label}
                    </span>
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </div>
                  </button>

                  {isOpenTraffic && (
                    <div className="absolute mt-1 w-full bg-black border border-gray-700 rounded-lg shadow-lg z-10 overflow-hidden">
                      <ul className="py-2 px-4 max-h-60 rounded-lg overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-black">
                        {optionsTraffic.map((option) => (
                          <li
                            key={option.value}
                            onClick={() => handleSelectTraffic(option.value)}
                            className={`px-4 py-3 my-2 rounded-xl cursor-pointer text-md ${trafficGrowth === option.value
                              ? "bg-gray-800"
                              : "hover:bg-gray-900"
                              }`}
                          >
                            <div className="flex justify-between items-center">
                              <span
                                className={
                                  trafficGrowth === option.value
                                    ? "text-white font-medium"
                                    : "text-gray-300"
                                }
                              >
                                {option.label}
                              </span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-5 group">
                <label className="block text-gray-300 mb-2">
                  Do you have an existing content team?
                  <TooltipIcon
                    description="Tell us if you already have writers, editors, or strategists in your team."
                    width="280px"
                  />
                </label>
                <div ref={dropdownRefContent} className="relative">
                  <button
                    onClick={toggleDropdownContent}
                    className="w-full px-4 py-3 bg-gray-800/50 rounded-lg text-left appearance-none font-medium focus:outline-none border border-gray-700 flex justify-between items-center"
                  >
                    <span className="text-md text-white">
                      {selectedOptionContent?.label}
                    </span>
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </div>
                  </button>

                  {isOpenContent && (
                    <div className="absolute mt-1 w-full bg-black border border-gray-700 rounded-lg shadow-lg z-10 overflow-hidden">
                      <ul className="py-2 px-4 max-h-60 rounded-lg overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-black">
                        {optionsContent.map((option) => (
                          <li
                            key={option.value}
                            onClick={() => handleSelectContent(option.value)}
                            className={`px-4 py-3 my-2 rounded-xl cursor-pointer text-md ${contentTeam === option.value
                              ? "bg-gray-800"
                              : "hover:bg-gray-900"
                              }`}
                          >
                            <div className="flex justify-between items-center">
                              <span
                                className={
                                  contentTeam === option.value
                                    ? "text-white font-medium"
                                    : "text-gray-300"
                                }
                              >
                                {option.label}
                              </span>
                              {contentTeam === option.value && (
                                <div className="w-4 h-4 ml-2 rounded-full bg-black flex items-center justify-center">
                                  <svg
                                    className="w-3 h-3 text-gray-400"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2.5"
                                      d="M5 12l5 5L20 7"
                                    />
                                  </svg>
                                </div>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-5 group ">
                <label className="text-gray-300 mb-2 relative inline-block">
                  Timeline
                  {/* <TooltipIcon description="Set your expected timeline for seeing results or getting deliverables." /> */}
                  <div className="group relative inline-block">
                    <svg
                      className="w-4 h-4 ml-2 inline-block cursor-pointer"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={handleClick}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>

                    {showTooltip && (
                      <div className="max-w-md min-w-[300px] whitespace-normal absolute bg-gray-800 text-white text-sm rounded px-3 py-2 z-10 ml-36 bottom-6 left-1/2 -translate-x-1/2">
                        <p>
                          Set your expected timeline for seeing results or
                          getting deliverables.
                        </p>
                      </div>
                    )}
                  </div>
                </label>
                <div ref={dropdownRef} className="relative h-20 ">
                  <button
                    onClick={toggleDropdown}
                    className="w-full px-4 py-3 bg-gray-800/50 rounded-lg text-left appearance-none font-medium focus:outline-none border border-gray-700 flex justify-between items-center"
                  >
                    <span className="text-md text-white">
                      {selectedOption?.label}
                    </span>
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </div>
                  </button>

                  {isOpen && (
                    <div className="absolute mt-1 w-full bg-black border border-gray-700 rounded-lg shadow-lg z-10 overflow-hidden">
                      <ul className="py-2 px-4 max-h-60 rounded-lg overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-black">
                        {options.map((option) => (
                          <li
                            key={option.value}
                            onClick={() => handleSelect(option.value)}
                            className={`px-4 py-3 my-2 rounded-xl cursor-pointer text-md ${timeline === option.value
                              ? "bg-gray-800"
                              : "hover:bg-gray-900"
                              }`}
                          >
                            <div className="flex justify-between items-center">
                              <span
                                className={
                                  timeline === option.value
                                    ? "text-white font-medium"
                                    : "text-gray-300"
                                }
                              >
                                {option.label}
                              </span>
                              {timeline === option.value && (
                                <div className="w-4 h-4 ml-2 rounded-full bg-black flex items-center justify-center">
                                  <svg
                                    className="w-3 h-3 text-gray-400"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2.5"
                                      d="M5 12l5 5L20 7"
                                    />
                                  </svg>
                                </div>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={handleCalculate}
                disabled={isLoading}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200 mt-4 relative"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Calculating...
                  </span>
                ) : (
                  "Calculate ROI"
                )}
              </button>

              {error && (
                <div className="mt-2 text-red-500 text-sm flex items-center">
                  {error}
                </div>
              )}
              
              {info && (
                <div className="mt-2 text-blue-400 text-sm flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  {info}
                </div>
              )}
            </div>

            <div className="w-px min-h-full bg-gray-600"></div>
            <div className="w-full h-px md:w-px md:h-full bg-gray-600"></div>

            {/* Right */}
            <div className="w-full lg:w-1/2">
              <h2 className="text-2xl font-bold text-center mb-8">
                Your ROI Results
              </h2>

              {hasCalculated ? (
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-gray-900/95 via-gray-800/90 to-gray-700/95 border border-white/10 shadow-2xl rounded-2xl p-6">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-500/90 to-green-600/80 rounded-xl flex items-center justify-center border border-white/10">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-white">
                        ROI Analysis
                      </h3>
                    </div>

                    {/* Current vs Optimized State */}
                    <div className="space-y-2 mb-8">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 text-md">
                          In-house Full Time Cost
                        </span>
                        <span className="font-bold text-white text-md">
                          $6,500/mo
                        </span>
                      </div>
                      <div className="w-full bg-gray-700/30 rounded-full h-3 border border-white/5">
                        <div
                          className="bg-gradient-to-r from-orange-500/90 to-red-500/80 h-3 rounded-full"
                          style={{ width: "100%" }}
                        ></div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 text-md mt-4">
                          With Infrasity
                        </span>
                        <span className="font-bold text-white text-md">
                          $
                          {Math.round(
                            outsourcedCost / timelineInMonth
                          ).toLocaleString()}
                          /mo
                        </span>
                      </div>
                      <div className="w-full bg-gray-700/30 rounded-full h-3 border border-white/5">
                        <div
                          className="bg-gradient-to-r from-green-500/90 to-blue-500/80 h-3 rounded-full"
                          style={{ width: `${Math.min(100, Math.max(0, 100 - savingsPercentage))}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Metrics Grid - Now 3 columns for better balance */}
                    <div className="grid grid-cols-3 gap-4">
                      {/* Cost Reduction */}
                      <div className="bg-gray-800/60 rounded-2xl p-5 border border-white/10 hover:border-green-500/30 transition-all duration-300">
                        <div className="text-2xl font-bold text-green-400 mb-1">
                          {savingsPercentage}%
                        </div>
                        <div className="text-gray-300 text-md">
                          Cost Reduction
                        </div>
                      </div>

                      {/* Annual Savings */}
                      <div className="bg-gray-800/60 rounded-2xl p-5 border border-white/10 hover:border-blue-500/30 transition-all duration-300">
                        <div className="text-2xl font-bold text-blue-400 mb-1">
                          ${(savings * 12).toLocaleString()}
                        </div>
                        <div className="text-gray-300 text-md">
                          Annual Savings
                        </div>
                      </div>

                      <div className="bg-gray-800/60 rounded-2xl p-5 border border-white/10 hover:border-cyan-500/30 transition-all duration-300">
                        <div className="text-2xl font-bold text-cyan-400 mb-1">
                          {Math.round((outsourcedCost / timelineInMonth) / (savings / timelineInMonth) * 10) / 10} {Math.round((outsourcedCost / timelineInMonth) / (savings / timelineInMonth) * 10) / 10 === 1 ? 'month' : 'months'}
                        </div>
                        <div className="text-gray-300 text-md">Payback Period</div>
                      </div>
                    </div>
                  </div>

                  {/* Summary Section */}
                  <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-white mb-4 text-center">
                      Project Summary
                    </h3>
                    <div className="text-center text-gray-200 text-lg">
                      For <span className="font-bold text-blue-400">{blogPosts} assets</span>: In-house ≈ <span className="font-bold text-orange-400">{monthsInHouse} months</span> (<span className="font-bold text-orange-400">${(monthsInHouse * 6500 / 1000).toFixed(1)}k</span>) vs Infrasity ≈ <span className="font-bold text-green-400">{monthsAgency} months</span> (<span className="font-bold text-green-400">${(blogPosts * (domainExpertise ? 540 : 495) / 1000).toFixed(1)}k</span>). Save ≈ <span className="font-bold text-cyan-400">${(projectSavings / 1000).toFixed(0)}k</span> and ~<span className="font-bold text-cyan-400">{timeSaved} months</span>.
                    </div>
                  </div>

                  {/* Capacity Warning/Info */}
                  {blogPosts > 5 && (
                    <div className={`rounded-xl p-4 ${timeline < Math.ceil(blogPosts / 6) ? 'bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border border-yellow-500/30' : 'bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border border-blue-500/30'}`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${timeline < Math.ceil(blogPosts / 6) ? 'bg-yellow-500/20' : 'bg-blue-500/20'}`}>
                          <svg className={`w-4 h-4 ${timeline < Math.ceil(blogPosts / 6) ? 'text-yellow-400' : 'text-blue-400'}`} fill="currentColor" viewBox="0 0 20 20">
                            {timeline < Math.ceil(blogPosts / 6) ? (
                              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            ) : (
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            )}
                          </svg>
                        </div>
                        <div className={`text-sm ${timeline < Math.ceil(blogPosts / 6) ? 'text-yellow-200' : 'text-blue-200'}`}>
                          {timeline < Math.ceil(blogPosts / 6) ? (
                            <>
                              <span className="font-semibold">Capacity Warning:</span> For {blogPosts} assets, we recommend a {Math.ceil(blogPosts / 6)}-month timeline (6 assets/month max). This will deliver all {blogPosts} assets over {Math.ceil(blogPosts / 6)} months.
                            </>
                          ) : (
                            <>
                              <span className="font-semibold">Timeline Info:</span> For {blogPosts} assets, we recommend a {Math.ceil(blogPosts / 6)}-month timeline (6 assets/month max). This will deliver all {blogPosts} assets over {Math.ceil(blogPosts / 6)} months.
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="bg-gray-800 border border-white/10 shadow-xl rounded-lg p-6">
                    <div className="grid grid-cols-3 pb-3 mb-3">
                      <h3 className="text-xl font-bold">Time to Value</h3>
                      <h3 className="text-xl font-bold text-center">
                        In-House
                      </h3>
                      <h3 className="text-xl font-bold text-center">
                        Infrasity
                      </h3>
                    </div>

                    <div className="grid grid-cols-3 border-b border-gray-700 pb-3 mb-3">
                      <span className="col-span-1">Time to Complete</span>
                      <span className="col-span-1 text-center">
                        {monthsInHouse} months
                      </span>
                      <span className="col-span-1 text-center">
                        {monthsAgency} months
                      </span>
                    </div>

                    <div className="grid grid-cols-3 border-b border-gray-700 pb-3 mb-3">
                      <span className="col-span-1">Output Per Month</span>
                      <span className="col-span-1 text-center">
                        {Math.ceil(blogPerPostQunt / monthsInHouse)} assets
                      </span>
                      <span className="col-span-1 text-center">
                        {Math.ceil(blogPerPostQunt / monthsAgency)} assets
                      </span>
                    </div>

                    <div className="grid grid-cols-3 border-b border-gray-700 pb-3 mb-3">
                      <span className="col-span-1">Ramp-Up Time</span>
                      <span className="col-span-1 text-center">
                        High
                      </span>
                      <span className="col-span-1 text-center">
                        None
                      </span>
                    </div>

                    <p className="mt-4 text-blue-400">
                      You get content{" "}
                      <span className="mt-4 text-blue-400">{Math.round(monthsInHouse / monthsAgency * 10) / 10}x </span>
                      faster and save <span className="font-bold">{timeSaved} months</span> of ramp-up.
                    </p>
                  </div>
                  <div className="bg-gray-800 border border-white/10 shadow-xl rounded-lg p-6">
                    <div>
                      <p className="text-[12px] text-gray-300">
                        Note: To achieve {trafficGrowth.toLowerCase()} traffic growth, aim for{" "}
                        {trafficGrowthBlogPost} high-quality blog
                        posts each month.
                      </p>

                      <p className="text-center">
                        Start saving{" "}
                        <span className="font-bold">
                          ${(inHouseCost - outsourcedCost).toLocaleString()}
                        </span>{" "}
                        every month
                      </p>


                    </div>
                  </div>
                  <div className="mt-3 text-center">
                    <CalendarBooking buttonText="Get Started Today" />
                  </div>
                </div>


              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="w-24 h-24 mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-full h-full text-gray-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-400 text-center mb-4">
                    Enter your details and calculate ROI to see potential
                    savings
                  </p>
                  <p className="text-gray-500 text-sm text-center">
                    Results will appear here after calculation
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentROICalculator;
