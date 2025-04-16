"use client"

import { useState } from 'react';

export default function ContentROICalculator() {
  const [budget, setBudget] = useState("15,000");
  const [blogPosts, setBlogPosts] = useState(3);
  const [trafficGrowth, setTrafficGrowth] = useState("100 %");
  const [contentTeam, setContentTeam] = useState("No");
  const [domainExpertise, setDomainExpertise] = useState(false);
  const [timeline, setTimeline] = useState("6 months");

  //when calulation is ready then I can upadte this values
  
  const [hasCalculated, setHasCalculated] = useState(false);

  return (
    <div className="w-full max-w-6xl mx-auto p-6 font-sans">
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
              
            </div>
            
            {/* Right */}
            <div className="w-full lg:w-1/2">
              <h2 className="text-2xl font-bold text-center mb-8">ROI Calculation Results</h2>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-300">Your Content Marketing Investment</h3>
                
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Monthly Content Investment</span>
                  <span className="font-medium text-white">{hasCalculated ? "$" + budget : "$0.00"}</span>
                </div>
                
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Total Investment (Over {timeline})</span>
                  <span className="font-medium text-white">
                    {hasCalculated ? "$" + (parseFloat(budget.replace(/,/g, '')) * parseInt(timeline)).toLocaleString() : "$0.00"}
                  </span>
                </div>
                
                <div className="flex justify-between mb-6">
                  <span className="text-gray-400">Content Production</span>
                  <span className="font-medium text-white">{hasCalculated ? blogPosts + " posts/month" : "0 posts/month"}</span>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}