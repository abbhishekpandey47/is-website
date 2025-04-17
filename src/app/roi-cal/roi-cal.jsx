"use client"

import { useState, useCallback } from 'react';

export default function ContentROICalculator() {
    const [isLoading, setIsLoading] = useState(false);

  const [formValues, setFormValues] = useState({
    budget: 15000,
    blogPosts: 3,
    trafficGrowth: 0,
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

  // Handle budget input with proper validation
  const handleBudgetChange = useCallback((e) => {
    const value = e.target.value.replace(/[^\d]/g, '');
    handleInputChange('budget', value === '' ? '' : parseInt(value, 10) || 0);
  }, [handleInputChange]);

  const handleCalculate = useCallback(() => {
    setIsLoading(true);

    const { blogPosts, timeline } = formValues;
    
    const valOutsourcedCost = blogPosts * 495 * timeline;
    
    let valInHouseCost = 7000 * timeline;
    valInHouseCost = (valInHouseCost + (7000 * 1.5)) * 1.2; 
    
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
    <div className="w-full max-w-6xl mx-auto p-6 font-sans mb-24 bg-gray-900">
      <div>
        <div className="w-full rounded-2xl p-6 bg-gray-800 border border-gray-700 shadow-xl text-white">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left */}
            <div className="w-full lg:w-1/2">
              <h2 className="text-2xl font-bold text-center mb-8">Enter your details</h2>
              
              <div className="mb-5">
                <label className="block text-gray-300 mb-2">Monthly content budget</label>
                <div className="relative">
                  <div className="absolute left-0 top-0 bottom-0 flex items-center pl-3 pointer-events-none">
                    <span className="text-gray-300">$</span>
                  </div>
                  <input 
                    type="text"
                    inputMode="numeric"
                    value={budget}
                    onChange={handleBudgetChange}
                    className="w-full pl-8 pr-4 py-3 border border-gray-700 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </div>
              
              <div className="mb-5">
                <label className="block text-gray-300 mb-2">Blog posts per month</label>
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
              
              <div className="mb-5">
                <div className="flex justify-between items-center">
                  <label className="block text-gray-300">Domain expertise required?</label>
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

              <div className="mb-5">
                <label className="block text-gray-300 mb-2">Target traffic growth</label>
                <div className="relative">
                  <select
                    value={trafficGrowth}
                    onChange={(e) => handleInputChange('trafficGrowth', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-700 rounded-lg appearance-none bg-gray-800 text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="0">0%</option>
                    <option value="25">25%</option>
                    <option value="40">40%</option>
                    <option value="60">60%</option>
                    <option value="90">90%</option>
                    <option value="100">100%</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="mb-5">
                <label className="block text-gray-300 mb-2">Do you have an existing content team?</label>
                <div className="relative">
                  <select
                    value={contentTeam}
                    onChange={(e) => handleInputChange('contentTeam', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-700 rounded-lg appearance-none bg-gray-800 text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-400"
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
              
              <div className="mb-5">
                <label className="block text-gray-300 mb-2">Timeline</label>
                <div className="relative">
                  <select
                    value={timeline}
                    onChange={(e) => handleInputChange('timeline', parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-700 rounded-lg appearance-none bg-gray-800 text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="1">1 month</option>
                    <option value="3">3 months</option>
                    <option value="6">6 months</option>
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
            </div>

            <div className="w-px min-h-full bg-gray-600 hidden lg:block"></div>
            <div className="w-full h-px bg-gray-600 block lg:hidden my-4"></div>
            
            {/* Right */}
            <div className="w-full lg:w-1/2">
              <h2 className="text-2xl font-bold text-center mb-8">Your ROI Results</h2>
              
              {hasCalculated ? (
                <div className="space-y-6">
                  <div className="bg-gray-800 border border-gray-700 shadow-xl rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4">Cost Comparison</h3>
                    
                    <div className="border-b border-gray-700 pb-3 mb-3 flex justify-between">
                      <span>Hiring In-House</span>
                      <span className="font-bold">${inHouseCost.toLocaleString()}</span>
                    </div>
                    
                    <div className="border-b border-gray-700 pb-3 mb-3 flex justify-between">
                      <span>Outsourced (Growth Plan)</span>
                      <span className="font-bold">${outsourcedCost.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex justify-between text-blue-400">
                      <span className="font-bold">Savings:</span>
                      <span className="font-bold">${savings.toLocaleString()} ({savingsPercentage}%)</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800 border border-gray-700 shadow-xl rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-4">Time to Value</h3>
                    
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
                  
                  <div className="bg-gray-800 border border-gray-700 shadow-xl rounded-lg p-6">
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
                <div className="flex flex-col items-center justify-center h-full bg-gray-800 border border-gray-700 rounded-lg p-8">
                  <div className="w-24 h-24 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-full h-full text-gray-600">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-gray-300 text-center mb-4">Enter your details and calculate ROI to see potential savings</p>
                  <p className="text-gray-400 text-sm text-center">Results will appear here after calculation</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}