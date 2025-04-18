"use client"

import { useState, useEffect } from 'react';

export default function ErrorPopup({ message = "An error occurred", duration = 3000, isVisible = true }) {
  const [show, setShow] = useState(isVisible);
  
  useEffect(() => {
    setShow(isVisible);
    
    if (isVisible && duration !== 0) {
      const timer = setTimeout(() => {
        setShow(false);
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration]);
  
  if (!show) return null;
  
  return (
    <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50">
      <div className="pointer-events-auto bg-red-500 text-white px-6 py-4 rounded-lg shadow-xl max-w-md w-full mx-4 animate-bounce-once">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div className="flex-1 pt-0.5">
            <p className="text-sm font-medium">{message}</p>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button 
              className="bg-red-600 rounded-md inline-flex text-red-300 hover:text-white focus:outline-none"
              onClick={() => setShow(false)}
            >
              <span className="sr-only">Close</span>
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}