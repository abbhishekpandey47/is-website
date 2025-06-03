"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import TooltipIcon from "./TooltipIcon";
import { saveUserData } from "./user";
import CalendarBooking from "../book-a-demo/calendarButton";
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
    trafficGrowth: 50,
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

  const handleTrafficGrowthChange = useCallback(
    (e) => {
      const value = e.target.value.replace(/[^\d]/g, "");
      let numValue = value === "" ? 0 : parseInt(value, 10);
      if (numValue > 100) numValue = 100;
      handleInputChange("trafficGrowth", numValue);
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

    setblogPerPostQunt(blogPosts);
    const currValueOutSource = domainExpertise ? 540 : 495;
    setBlogPerPost(currValueOutSource);
    const valOutsourcedCost = blogPosts * currValueOutSource * timeline;

    if (blogPosts * currValueOutSource > budget) {
      const valYouneed = Math.round(budget / currValueOutSource);
      handleOperation(
        `This setup isn't feasible — your budget can't support ${blogPosts} blogs/month. ${valYouneed <= blogPosts
          ? `Consider reducing output to ${valYouneed} blogs/month, or increase your budget by $${valOutsourcedCost - budget
          }.`
          : `Increase your budget by $${valOutsourcedCost - budget}.`
        }`
      );

      setIsLoading(false);

      //setRequiredBudget(budget - valOutsourcedCost)

      if (hasCalculated) {
        handleOutput();
      }

      return;
    }

    if (error) {
      setError(null);
    }

    if (domainExpertise) {
      setDomainExpertisResult(true);
    } else {
      setDomainExpertisResult(false);
    }

    let valInHouseCost = timeline * 7000;

    valInHouseCost = (valInHouseCost + 7000 * 2) * 1.2;
    setTimelineInMonth(timeline);

    if (trafficGrowth > 0 && trafficGrowth <= 25) {
      setTrafficGrowthBlogPost(10);
    } else if (trafficGrowth > 25 && trafficGrowth <= 50) {
      setTrafficGrowthBlogPost(20);
    } else if (trafficGrowth > 50 && trafficGrowth <= 75) {
      setTrafficGrowthBlogPost(30);
    } else {
      setTrafficGrowthBlogPost(40);
    }

    const valSavings = valInHouseCost - valOutsourcedCost;
    const valSavingsPercentage = Math.round(
      (valSavings / valInHouseCost) * 100
    );

    setTimeout(() => {
      setResults({
        inHouseCost: valInHouseCost,
        outsourcedCost: valOutsourcedCost,
        savings: valSavings,
        savingsPercentage: valSavingsPercentage,
        hasCalculated: true,
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

  const optionsContent = [
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" },
  ];

  const toggleDropdownContent = () => setIsOpenContent(!isOpenContent);

  const handleSelectContent = (value) => {
    handleInputChange("contentTeam", value);
    setIsOpenContent(false);
  };

  const selectedOptionContent = optionsContent.find(
    (option) => option.value === contentTeam
  );

  const dropdownRef = useRef(null);
  const dropdownRefContent = useRef(null);

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
        <div className="w-full rounded-2xl p-6 bg-white/5 backdrop-blur-md border border-white/10 shadow-xl text-white">
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
                      description="Specify if the content needs specialized industry knowledge or experience."
                      width="330px"
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
                <label className="relative inline-block text-gray-300 mb-2">
                  Target traffic growth
                  <TooltipIcon
                    description="Enter the percentage increase in traffic you aim to achieve."
                    width="390px"
                  />
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={trafficGrowth}
                    onChange={(e) => handleTrafficGrowthChange(e)}
                    className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-800/50 text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter percentage"
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white">
                    %
                  </span>
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
                  <div className="bg-gradient-to-br from-gray-900/95 via-gray-800/90 to-gray-700/95 backdrop-blur-sm border border-white/10 shadow-2xl rounded-2xl p-6">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-500/90 to-green-600/80 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/10">
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
                          Current State
                        </span>
                        <span className="font-bold text-white text-md">
                          ${inHouseCost.toLocaleString()}/mo
                        </span>
                      </div>
                      <div className="w-full bg-gray-700/30 backdrop-blur-sm rounded-full h-3 border border-white/5">
                        <div
                          className="bg-gradient-to-r from-orange-500/90 to-red-500/80 h-3 rounded-full backdrop-blur-sm"
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
                      <div className="w-full bg-gray-700/30 backdrop-blur-sm rounded-full h-3 border border-white/5">
                        <div
                          className="bg-gradient-to-r from-green-500/90 to-blue-500/80 h-3 rounded-full backdrop-blur-sm"
                          style={{ width: `${100 - savingsPercentage}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 gap-6">
                      {/* Cost Reduction */}
                      <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                        <div className="text-2xl font-bold text-green-400">
                          {savingsPercentage}%
                        </div>
                        <div className="text-gray-300 text-md">
                          Cost Reduction
                        </div>
                      </div>

                      {/* Annual Savings */}
                      <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                        <div className="text-2xl font-bold text-blue-400">
                          ${(savings * 12).toLocaleString()}
                        </div>
                        <div className="text-gray-300 text-md text-md">
                          Annual Savings
                        </div>
                      </div>

                      {/* Payback Period */}
                      <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                        <div className="text-2xl font-bold text-yellow-400">
                          0.0 mo
                        </div>
                        <div className="text-gray-300 text-md">
                          Payback Period
                        </div>
                      </div>

                      {/* 3-Year ROI */}
                      <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                        <div className="text-2xl font-bold text-cyan-400">
                          {Math.round(((savings * 36) / outsourcedCost) * 100)}%
                        </div>
                        <div className="text-gray-300 text-md">3-Year ROI</div>
                      </div>
                    </div>
                  </div>
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
                      <span className="col-span-1">Time to First Output</span>
                      <span className="col-span-1 text-center blur-sm">
                        4-6 weeks
                      </span>
                      <span className="col-span-1 text-center blur-sm">
                        1-2 weeks
                      </span>
                    </div>

                    <div className="grid grid-cols-3 border-b border-gray-700 pb-3 mb-3">
                      <span className="col-span-1">Output Per Month</span>
                      <span className="col-span-1 text-center blur-sm">
                        {Math.floor(blogPerPostQunt / 2) + 1} assets
                      </span>
                      <span className="col-span-1 text-center blur-sm">
                        {blogPerPostQunt} assets
                      </span>
                    </div>

                    <div className="grid grid-cols-3 border-b border-gray-700 pb-3 mb-3">
                      <span className="col-span-1">Ramp-Up Time</span>
                      <span className="col-span-1 text-center blur-sm">
                        High
                      </span>
                      <span className="col-span-1 text-center blur-sm">
                        None
                      </span>
                    </div>

                    <p className="mt-4 text-blue-400">
                      You get content{" "}
                      <span className="mt-4 text-blue-400 blur-sm">4 </span>x
                      faster and save weeks of ramp-up.
                    </p>
                  </div>

                  <div className="bg-gray-800 border border-white/10 shadow-xl rounded-lg p-6">
                    <div>
                      {/* <p className="text-[12px] text-gray-300">
                        Note: To hit {trafficGrowth}% traffic growth, aim for{" "}
                        {trafficGrowthBlogPost} high-quality blog
                        posts each month.
                      </p> */}

                      <p className="text-center">
                        Start saving{" "}
                        <span className="font-bold">
                          ${(inHouseCost - outsourcedCost).toLocaleString()}
                        </span>{" "}
                        every month
                      </p>

                      <div className="mt-3 text-center">
                        <CalendarBooking buttonText="Get Started Today" />
                      </div>
                    </div>
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
      {isPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div
            className="rounded-xl p-8 backdrop-blur-md relative overflow-hidden max-w-md w-full"
            style={{
              backgroundColor: "rgba(30, 32, 45, 0.7)",
              boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.36)",
              border: "1px solid rgba(60, 63, 84, 0.3)",
            }}
          >
            {/* Close button - optional but recommended */}
            <button
              onClick={() => closePopup()}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-100 cursor-pointer z-20"
              type="button"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Decorative glass effect elements */}
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-purple-500 opacity-10 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-blue-500 opacity-10 blur-2xl"></div>

            <div className="relative z-10">
              {!isSubmitted ? (
                <>
                  <h3 className="text-xl font-medium text-gray-100 mb-4">
                    Download Full Report
                  </h3>
                  <p className="text-gray-300 mb-6">
                    Enter your email address to receive your report.
                  </p>

                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isEmailSending}
                      className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
                    >
                      {isEmailSending ? (
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
                          Submiting...
                        </span>
                      ) : (
                        "Submit"
                      )}
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="mb-4 flex justify-center">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-xl font-medium text-gray-100 mb-2">
                    Thank You!
                  </h3>
                  <p className="text-gray-300">
                    Your email has been successfully submitted.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentROICalculator;
