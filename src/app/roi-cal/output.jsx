"use client"

import { useState } from 'react';
import ROIOutsourcing from './output';

export default function ContentROICalculator() {
  const [budget, setBudget] = useState("15,000");
  const [blogPosts, setBlogPosts] = useState(3);
  const [trafficGrowth, setTrafficGrowth] = useState("100 %");
  const [contentTeam, setContentTeam] = useState("No");
  const [domainExpertise, setDomainExpertise] = useState(false);
  const [timeline, setTimeline] = useState("6 months");

  //when calulation is ready then I can upadte this values
  const [inHouseCost, setInHouseCost] = useState(42000);
  const [outsourcedCost, setOutsourcedCost] = useState(18000);
  const [savings, setSavings] = useState(24000);
  const [savingsPercentage, setSavingsPercentage] = useState(57);
  
  const [hasCalculated, setHasCalculated] = useState(false);

  const handleCalculate = () => {
    // Here you would normally do calculations based on input
    // For now we'll just use the preset values
    setHasCalculated(true);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 font-sans mb-24">
      <div>
        
        <div className="w-full rounded-2xl p-6 bg-white/5 backdrop-blur-md border border-white/10 shadow-xl text-white">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left  */}
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
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 border border-gray-700 rounded-lg bg-gray-800/50 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                    onChange={(e) => setBlogPosts(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
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
                      onChange={() => setDomainExpertise(!domainExpertise)}
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
                <input 
                  type="text" 
                  value={trafficGrowth}
                  onChange={(e) => setTrafficGrowth(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-800/50 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              
              <div className="mb-5">
                <label className="block text-gray-300 mb-2">Do you have an existing content team?</label>
                <div className="relative">
                  <select
                    value={contentTeam}
                    onChange={(e) => setContentTeam(e.target.value)}
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
              
              <div className="mb-5">
                <label className="block text-gray-300 mb-2">Timeline</label>
                <div className="relative">
                  <select
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-700 rounded-lg appearance-none bg-gray-800/50 text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="3 months">3 months</option>
                    <option value="6 months">6 months</option>
                    <option value="12 months">12 months</option>
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
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200 mt-4"
              >
                Calculate ROI
              </button>
            </div>

            <div className="w-px min-h-full bg-gray-600"></div>

            
            {/* Right */}
            <div className="w-full lg:w-1/2">
              <h2 className="text-2xl font-bold text-center mb-8">Your ROI Results</h2>
              
              {hasCalculated ? (
                <div className="space-y-5">
                {/* Cost Comparison */}
                <div className="bg-white/5 backdrop-blur-md border border-white/10 shadow-xl rounded-lg p-5">
                  <h3 className="text-lg font-semibold mb-4 text-gray-100">Cost Comparison</h3>
                  
                  <div className="border-b border-gray-700/60 pb-2.5 mb-2.5 flex justify-between text-sm">
                    <span className="text-gray-300">Hiring In-House</span>
                    <span className="font-medium text-white">${inHouseCost.toLocaleString()}</span>
                  </div>
                  
                  <div className="border-b border-gray-700/60 pb-2.5 mb-2.5 flex justify-between text-sm">
                    <span className="text-gray-300">Outsourced (Growth Plan)</span>
                    <span className="font-medium text-white">${outsourcedCost.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between text-sky-400 text-sm">
                    <span className="font-medium">Savings:</span>
                    <span className="font-medium">${savings.toLocaleString()} ({savingsPercentage}%)</span>
                  </div>
                </div>
                
                {/* Time to Value */}
                <div className="bg-white/5 backdrop-blur-md border border-white/10 shadow-xl rounded-lg p-5">
                  <h3 className="text-lg font-semibold mb-4 text-gray-100">Time to Value</h3>
                  
                  <div className="grid grid-cols-3 border-b border-gray-700/60 pb-2.5 mb-2.5 text-sm">
                    <span className="col-span-1 text-gray-300">Time to First Output</span>
                    <span className="col-span-1 text-center text-gray-400">4-6 weeks</span>
                    <span className="col-span-1 text-center text-gray-400">1-2 weeks</span>
                  </div>
                  
                  <div className="grid grid-cols-3 border-b border-gray-700/60 pb-2.5 mb-2.5 text-sm">
                    <span className="col-span-1 text-gray-300">Output Per Month</span>
                    <span className="col-span-1 text-center text-gray-400">{Math.floor(blogPosts/2)} assets</span>
                    <span className="col-span-1 text-center text-gray-400">{blogPosts} assets</span>
                  </div>
                  
                  <div className="grid grid-cols-3 border-b border-gray-700/60 pb-2.5 mb-2.5 text-sm">
                    <span className="col-span-1 text-gray-300">Ramp-Up Time</span>
                    <span className="col-span-1 text-center text-gray-400">High</span>
                    <span className="col-span-1 text-center text-gray-400">None</span>
                  </div>
                  
                  <p className="mt-3 text-sky-400 text-xs font-normal">You get content 4x faster and save weeks of ramp-up.</p>
                </div>
                
                {/* Deliverables Estimate */}
                <div className="bg-white/5 backdrop-blur-md border border-white/10 shadow-xl rounded-lg p-5">
                  <h3 className="text-lg font-semibold mb-4 text-gray-100">Deliverables Estimate</h3>
                  
                  <div className="text-sm space-y-2 text-gray-300">
                    <p>Month 1: <span className="text-white">{blogPosts} Blogs + 1 Video</span></p>
                    <p>Month 2: <span className="text-white">{blogPosts} Blogs + 2 Docs</span></p>
                    <p>Month 3: <span className="text-white">{blogPosts-1} Blogs + 1 Case Study</span></p>
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
              
              {hasCalculated ? <div className="mt-6 text-center">
                <button className="py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200">
                  Download Full Report
                </button>
              </div> : <div> </div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}