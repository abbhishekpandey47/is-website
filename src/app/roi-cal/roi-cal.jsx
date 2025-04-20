"use client"

import { useState, useCallback } from 'react';
import ErrorPopup from './error';
import TooltipIcon from './TooltipIcon';

export default function ContentROICalculator() {
    const [isLoading, setIsLoading] = useState(false);

    const [isPopup, setIsPopup] = useState(false);

    const handlePopup = () => {
      setIsPopup(true);
    };

    const closePopup = () => {
      setIsPopup(false);
    };


    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState(null);
    const [blogPerPost, setBlogPerPost] = useState(0);
    const [timelineInMonth, setTimelineInMonth] = useState(0);

  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (email) {
        setIsSubmitted(true);
        // Here you would typically send the email to your backend
        console.log('Email submitted:', email);
      }
    };
  

  const [formValues, setFormValues] = useState({
    budget: '',
    blogPosts: 3,
    trafficGrowth: '',
    contentTeam: "No",
    domainExpertise: false,
    timeline: 1
  });

  const [results, setResults] = useState({
    inHouseCost: 0,
    outsourcedCost: 0,
    savings: 0,
    savingsPercentage: 0,
    hasCalculated: false
  });

  const handleInputChange = useCallback((field, value) => {
    setFormValues(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const handleOutput = () => {
    setResults(prev => ({
      ...prev,
      hasCalculated: false
    }));
  }

  const handleOperation = (msg) => {
      setError(msg);
  };

  // Handle budget input with proper validation
  const handleBudgetChange = useCallback((e) => {
    const value = e.target.value.replace(/[^\d]/g, '');
    handleInputChange('budget', value === '' ? '' : parseInt(value, 10) || 0);
  }, [handleInputChange]);

  const handleTrafficGrowthChange = useCallback((e) => {
    const value = e.target.value.replace(/[^\d]/g, '');
    let numValue = value === '' ? 0 : parseInt(value, 10);
    if (numValue > 100) numValue = 100;
    handleInputChange('trafficGrowth', numValue);
  }, [handleInputChange]);

  const handleCalculate = useCallback(() => {

    setIsLoading(true);

    const { blogPosts, timeline, budget, domainExpertise } = formValues;

    const { hasCalculated } = results;

    if(budget < 1) {
      handleOperation("Budget must be greater than 0.");
      setIsLoading(false);

      if(hasCalculated) {
        handleOutput();
      }

      return;
    }
    
    const currValueOutSource = domainExpertise ? 540 : 495;
    setBlogPerPost(currValueOutSource);
    const valOutsourcedCost = blogPosts * currValueOutSource * timeline;

    if(valOutsourcedCost > budget) {
      const valYouneed = 
      handleOperation(`This setup isn't feasible — your budget can't support ${blogPosts} blogs/month. Consider reducing output to ${Math.round(budget / currValueOutSource)} blogs/month, or increase your budget by $${valOutsourcedCost - budget}.`);
      setIsLoading(false);

      //setRequiredBudget(budget - valOutsourcedCost)

      if(hasCalculated) {
        handleOutput();
      }

      return;
    }

    if(error) {
      setError(null);
    }

    
    let valInHouseCost = 7000 * timeline;
    valInHouseCost = (valInHouseCost + (7000 * 2)) * 1.2; 
    setTimelineInMonth(timeline);
    
    const valSavings = valInHouseCost - valOutsourcedCost;
    const valSavingsPercentage = Math.round((valSavings / valInHouseCost) * 100);
    
    setTimeout(() => {
        setResults({
          inHouseCost: valInHouseCost,
          outsourcedCost: valOutsourcedCost,
          savings: valSavings,
          savingsPercentage: valSavingsPercentage,
          hasCalculated: true
        });
        
        // End loading animation
        setIsLoading(false);
      }, 1000);
         
  }, [formValues]);

  const { budget, blogPosts, trafficGrowth, contentTeam, domainExpertise, timeline } = formValues;
  const { inHouseCost, outsourcedCost, savings, savingsPercentage, hasCalculated } = results;

  return (
    <div className="w-full max-w-6xl mx-auto p-6 font-sans mb-24">
      <div>
        <div className="w-full rounded-2xl p-6 bg-white/5 backdrop-blur-md border border-white/10 shadow-xl text-white">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left */}
            
            <div className="w-full lg:w-1/2">
            
              <h2 className="text-2xl font-bold text-center mb-8">Enter your details</h2>              
              <div className="mb-5 group">
              <div className="relative inline-block">
  <label className="block text-gray-300 mb-2">
    Monthly content budget
    <TooltipIcon description="Estimated amount you want to spend on content per month." />

  </label>
</div>

                <div className="relative">
                  <div className="absolute left-0 top-0 bottom-0 flex items-center pl-3 pointer-events-none">
                    <span className="text-gray-300">$</span>
                  </div>
                  <input 
                  placeholder='Content Budget in USD'
                    type="text"
                    inputMode="numeric"
                    value={budget}
                    onChange={handleBudgetChange}
                    className="w-full pl-8 pr-4 py-3 border border-gray-700 rounded-lg bg-gray-800/50 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </div>
              
              <div className="mb-5 group">
              <div className="relative inline-block">
  <label className="block text-gray-300 mb-2">
  Blog posts per month

  
  <TooltipIcon description="Number of blog articles you expect to publish each month." /> 

  </label>
</div>
                <div className="mt-1">
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={blogPosts}
                    onChange={(e) => handleInputChange('blogPosts', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                  <div className="flex justify-between text-xl text-gray-400 mt-1">
                    <span className="text-blue-400 font-medium">{blogPosts}</span>
                  </div>
                </div>
              </div>
              
              <div className="mb-5 group">
                <div className="flex justify-between items-center">
                  <label className="block text-gray-300">Domain expertise required?

                  <TooltipIcon description="Specify if the content needs specialized industry knowledge or experience." />
                  </label>
                  <div className="relative inline-block w-12 h-6">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={domainExpertise}
                      onChange={() => handleInputChange('domainExpertise', !domainExpertise)}
                      id="toggle"
                    />
                    <label
                      htmlFor="toggle"
                      className={`absolute cursor-pointer rounded-full w-12 h-6 ${
                        domainExpertise ? 'bg-blue-500' : 'bg-gray-700'
                      }`}
                    >
                      <span
                        className={`absolute rounded-full w-4 h-4 top-1 transition-transform duration-300 ease-in-out ${
                          domainExpertise ? 'bg-white transform translate-x-7' : 'bg-white translate-x-1'
                        }`}
                      />
                    </label>
                  </div>
                </div>
                <div className="text-right text-gray-300 mt-1">{domainExpertise ? "Yes" : "No"}</div>
              </div>

              <div className="mb-5 group">
  <label className="relative inline-block text-gray-300 mb-2">
    Target traffic growth

     <TooltipIcon description="Enter the percentage increase in traffic you aim to achieve." />
  </label>
  <div className="relative">
    <input
      type="text"
      value={trafficGrowth}
      onChange={(e) => handleTrafficGrowthChange(e)}
      className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-800/50 text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-400"
      placeholder="Enter percentage"
    />
    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white">%</span>
  </div>
</div>
              
              <div className="mb-5 group">
                <label className="block text-gray-300 mb-2">Do you have an existing content team?
                  
   
                <TooltipIcon description="Tell us if you already have writers, editors, or strategists on your team." /> 

                </label>
                <div className="relative">
                  <select
                    value={contentTeam}
                    onChange={(e) => handleInputChange('contentTeam', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-700 rounded-lg appearance-none bg-gray-800/50 text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>

              
              <div className="mb-5 group ">
                <label className="text-gray-300 mb-2 relative inline-block">Timeline
                  
   
       
                <TooltipIcon description="Set your expected timeline for seeing results or getting deliverables." /> 
                </label>
                <div className="relative">
                  <select
                    value={timeline}
                    onChange={(e) => handleInputChange('timeline', parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-700 rounded-lg appearance-none bg-gray-800/50 text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="1">1 month</option>
                    <option value="2">2 month</option>
                    <option value="3">3 month</option>
                    <option value="4">4 month</option>
                    <option value="5">5 month</option>
                    <option value="6">6 month</option>
                    <option value="7">7 months</option>
                    <option value="8">8 months</option>
                    <option value="9">9 month</option>
                    <option value="10">10 month</option>
                    <option value="11">11 month</option>
                    <option value="12">12 months</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>
              
              <button
        onClick={handleCalculate}
        disabled={isLoading}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200 mt-4 relative"
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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
              <h2 className="text-2xl font-bold text-center mb-8">Your ROI Results</h2>
              
              {hasCalculated ? (
                <div className="space-y-6">
                  <div className="bg-gray-800 border border-white/10 shadow-xl rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4">Cost Comparison</h3>
           

<div className="border-b border-gray-700 pb-3 mb-3">
  <div className="flex justify-between items-center">
    <span>Hiring In-House</span>
    <span className="font-bold">${inHouseCost.toLocaleString()}</span>
  </div>
  <p className="text-gray-300 text-sm mt-1">
    ({timelineInMonth} months × $7,000/month) + (2-month ramp-up × $7,000/month), then × 1.2 overhead
  </p>
</div>

<div className="border-b border-gray-700 pb-3 mb-3">
  <div className="flex justify-between items-center">
    <span>Outsourced (Growth Plan)</span>
    <span className="font-bold">${outsourcedCost.toLocaleString()}</span>
  </div>
  <p className="text-gray-300 text-sm mt-1">
    {blogPosts} blog posts/month × ${blogPerPost} per post
  </p>
</div>


                  
                    
                    <div className="flex justify-between text-blue-400">
                      <span className="font-bold">Savings:</span>
                      <span className="font-bold">${savings.toLocaleString()} ({savingsPercentage}%)</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800 border border-white/10 shadow-xl rounded-lg p-6">
                    

                    <div className="grid grid-cols-3 pb-3 mb-3">
                      <h3 className="text-xl font-bold">Time to Value</h3>
                      <h3 className="text-xl font-bold text-center">In-House</h3>
                      <h3 className="text-xl font-bold text-center">Infrasity</h3>
                    </div>
                    
                    <div className="grid grid-cols-3 border-b border-gray-700 pb-3 mb-3">
                      <span className="col-span-1">Time to First Output</span>
                      <span className="col-span-1 text-center">4-6 weeks</span>
                      <span className="col-span-1 text-center">1-2 weeks</span>
                    </div>
                    
                    <div className="grid grid-cols-3 border-b border-gray-700 pb-3 mb-3">
                      <span className="col-span-1">Output Per Month</span>
                      <span className="col-span-1 text-center">{Math.floor(blogPosts/2)} assets</span>
                      <span className="col-span-1 text-center">{blogPosts} assets</span>
                    </div>
                    
                    <div className="grid grid-cols-3 border-b border-gray-700 pb-3 mb-3">
                      <span className="col-span-1">Ramp-Up Time</span>
                      <span className="col-span-1 text-center">High</span>
                      <span className="col-span-1 text-center">None</span>
                    </div>
                    
                    <p className="mt-4 text-blue-400">You get content 4x faster and save weeks of ramp-up.</p>
                  </div>
                  
                  <div className="bg-gray-800 border border-white/10 shadow-xl rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4">Deliverables Estimate</h3>
                    
                    <div className="mb-2">
                      <p>Month 1: {blogPosts} Blogs + 1 Video</p>
                    </div>
                    <div className="mb-2">
                      <p>Month 2: {blogPosts} Blogs + 2 Docs</p>
                    </div>
                    <div>
                      <p>Month 3: {blogPosts-1} Blogs + 1 Case Study</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="w-24 h-24 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-full h-full text-gray-600">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-gray-400 text-center mb-4">Enter your details and calculate ROI to see potential savings</p>
                  <p className="text-gray-500 text-sm text-center">Results will appear here after calculation</p>
                </div>
              )}
              
              
              
              {/* {hasCalculated && (
                <div className="mt-6 text-center">
                  <button className="py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200"
                  onClick={handlePopup}
                  >
                    Download Full Report
                  </button>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>

      {isPopup && (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
    <div 
      className="rounded-xl p-8 backdrop-blur-md relative overflow-hidden max-w-md w-full"
      style={{
        backgroundColor: 'rgba(30, 32, 45, 0.7)',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.36)',
        border: '1px solid rgba(60, 63, 84, 0.3)',
      }}
    >
      {/* Close button - optional but recommended */}
      <button
  onClick={() => closePopup()}
  className="absolute top-4 right-4 text-gray-400 hover:text-gray-100 cursor-pointer z-20"
  type="button"
>
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
  </svg>
</button>
      
      {/* Decorative glass effect elements */}
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-purple-500 opacity-10 blur-2xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-blue-500 opacity-10 blur-2xl"></div>
      
      <div className="relative z-10">
        {!isSubmitted ? (
          <>
            <h3 className="text-xl font-medium text-gray-100 mb-4">Download Full Report</h3>
            <p className="text-gray-300 mb-6">Enter your email address to receive your report.</p>
            
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
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
              >
                Subscribe
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="mb-4 flex justify-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-medium text-gray-100 mb-2">Thank You!</h3>
            <p className="text-gray-300">You've been successfully subscribed to our newsletter.</p>
          </div>
        )}
      </div>
    </div>
  </div>
)}
    </div>
  );
}