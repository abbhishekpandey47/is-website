const CRMAutomationPage = () => {
  return (
    <div className="w-full bg-gray-900 p-4 flex items-center py-24 px-16 justify-center overflow-x-hidden">
      <div 
        className="w-full max-w-full rounded-2xl p-8 relative overflow-hidden box-border"
        style={{
          backgroundColor: "#141318",
          backgroundImage: `radial-gradient(circle at top right, #272b40 0%, transparent 80%)`,
          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.36)",
          border: "2px solid rgba(60, 63, 84, 0.3)"
        }}
      >
        <div className="flex flex-col lg:flex-row justify-between items-start">
          {/* Left column  order */}
          <div className="flex flex-col-reverse md:flex-row w-full">
            <div className="w-full md:w-1/2 md:pr-4 mt-6 md:mt-0">
              <div className="md:my-8 mx-3 md:mx-6">
                <div className="flex items-center">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"
                />
              </svg>
                  <span className="ml-2 text-gray-300 font-medium">Product</span>
                </div>
              </div>

              <div className="md:mb-8 mx-3 md:mx-6">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-white mb-1">Effortless CRM Automation</h2>
              </div>

              <div className="flex flex-wrap gap-4 md:gap-6 mb-4 mx-3 md:mx-6">
              <p className="text-gray-300 text-2xl">
              Your CRM, Always Up-to-Date — Without<br />Lifting a Finger
            </p>
              </div>
            </div>

            <div className="w-full md:w-1/2 md:pl-4 md:mt-12 md:mb-0">
              <div className="md:p-4 rounded-lg w-full lg:mb-12">
                <div className="w-full h-48 sm:h-56 md:h-64 rounded-md overflow-hidden">
                <div className="w-full max-w-md h-64 relative">
  <iframe 
    className="absolute top-0 left-0 w-full h-full rounded-md"
    src="https://www.youtube.com/embed/ICUGIdqzmYg?autoplay=1&mute=1" 
    title="YouTube video"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowFullScreen>
  </iframe>
</div>

                </div>
              </div>
            </div>
          </div>
          </div>

        <div className="border-t border-gray-700 mb-8"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 1 */}
          <div>
            <h3 className="text-2xl font-semibold text-indigo-200 mb-3">Real-Time Updates</h3>
            <p className="text-sm text-gray-300">Every email, call, or message automatically updates your CRM fields—no manual input, no missed details.</p>
          </div>
          
          {/* 2 */}
          <div>
            <h3 className="text-2xl font-semibold text-indigo-200 mb-3">Deal Movement Made Easy</h3>
            <p className="text-sm text-gray-300">Watch deals move smoothly through every stage of your pipeline—automatically, based on real interactions.</p>
          </div>
          
          {/* 3 */}
          <div>
            <h3 className="text-2xl font-semibold text-indigo-200 mb-3">Task Creation & Assignment</h3>
            <p className="text-sm text-gray-300">Access personalized assistance whenever you need it from our expert support team, helping you make the most of your benefits.</p>
          </div>
          
          {/* 4 */}
          <div>
            <h3 className="text-2xl font-semibold text-indigo-200 mb-3">Why It Matters</h3>
            <p className="text-sm text-gray-300">Sales teams forget. Details slip. We don't. Our AI captures and updates everything in real-time, keeping your CRM richer, more accurate, and always ready for the next move.</p>
          </div>
        </div>
      </div>
    </div>
  );
}



export default CRMAutomationPage;