export default function Current() {
    return (
        <div className="flex-1 p-4 sm:p-6 lg:p-8 bg-gray-50">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-xl p-4 sm:p-6 lg:p-8 shadow-sm border border-gray-100">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Check Current Mentions</h1>
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Brand Name or Website
                    </label>
                    <input
                      type="text"
                      placeholder="YourBrand or yourbrand.com"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Time Range
                    </label>
                    <select className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base">
                      <option>Last 7 days</option>
                      <option>Last 30 days</option>
                      <option>Last 3 months</option>
                      <option>All time</option>
                    </select>
                  </div>
                  <button className="w-full bg-blue-600 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm sm:text-base">
                    Search Mentions
                  </button>
                </div>
              </div>
            </div>
          </div>
    )
}