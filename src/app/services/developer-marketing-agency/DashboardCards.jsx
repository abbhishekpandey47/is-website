import Image from 'next/image'

const DashboardCards = () => {
  return (
    <div className="min-h-screen bg-gray-950 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6">
          
          <div className="flex flex-col order-1 col-span-full md:col-span-3 lg:col-span-5 xl:col-span-4 bg-zinc-900/50 rounded-2xl ring-1 ring-zinc-100/10 h-[480px] overflow-hidden">
            <div className="flex-1 p-6">
              <img 
                src="/landingfolio/i1.png" 
                alt="Analytics Dashboard" 
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="space-y-4 mt-auto px-8 pb-8 w-full">
              <h3 className="font-medium text-lg/none text-zinc-200">Insights at your fingertips</h3>
              <p className="max-w-sm text-sm text-zinc-400/80">All your data and finances in one place to provide quick answers and make decisions instantly.</p>
            </div>
          </div>

          <div className="flex flex-col order-2 col-span-full md:col-span-3 lg:col-span-5 xl:col-span-4 bg-zinc-900/50 rounded-2xl ring-1 ring-zinc-100/10 h-[480px] overflow-hidden">
            <div className="flex-1 p-6">
              <img 
                src="/landingfolio/i2.png" 
                alt="Mobile App Interface" 
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="space-y-4 mt-auto px-8 pb-8 w-full">
              <h3 className="font-medium text-lg/none text-zinc-200">Manage in real time</h3>
              <p className="max-w-sm text-sm text-zinc-400/80">Have full control of your business finances on the go using our iOS/Android mobile apps. Because, you know, it's 2025.</p>
            </div>
          </div>

          <div className="flex flex-col order-3 col-span-full md:col-span-3 lg:col-span-5 xl:col-span-4 bg-zinc-900/50 rounded-2xl ring-1 ring-zinc-100/10 h-[480px] overflow-hidden">
            <div className="flex-1 p-6">
              <img 
                src="/landingfolio/i3.png" 
                alt="Business Alerts" 
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="space-y-4 mt-auto px-8 pb-8 w-full">
              <h3 className="font-medium text-lg/none text-zinc-200">Important business alerts</h3>
              <p className="max-w-sm text-sm text-zinc-400/80">Choose the alerts you need and receive them via email, mobile or Slack. Review and take action in one click.</p>
            </div>
          </div>
</div>
      </div>
       <div className="flex gap-6 mt-8">
          
          <div className="flex flex-col w-[60%] bg-zinc-900/50 rounded-2xl ring-1 ring-zinc-100/10 h-[480px] overflow-hidden">
            <div className="flex-1 p-6">
              <img 
                src="/landingfolio/i4.png" 
                alt="App Integrations" 
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="space-y-4 mt-auto px-8 pb-8 w-full">
              <h3 className="font-medium text-lg/none text-zinc-200">Connect all your apps</h3>
              <p className="max-w-sm text-sm text-zinc-400/80">Bring your data with our built-in integrations for accounting, revenue tools and banking.</p>
            </div>
          </div>

          <div className="flex flex-col w-[40%] bg-zinc-900/50 rounded-2xl ring-1 ring-zinc-100/10 h-[480px] overflow-hidden">
            <div className="flex-1 p-6">
              <img 
                src="/landingfolio/i5.png" 
                alt="Control Panel" 
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="space-y-4 mt-auto px-8 pb-8 w-full">
              <h3 className="font-medium text-lg/none text-zinc-200">You're in control</h3>
              <p className="max-w-sm text-sm text-zinc-400/80">Lightning fast. Shortcuts for everything. Command+K on Mac, Ctrl+K on Windows. Dark mode.</p>
            </div>
          </div>

        </div>
    </div>
  )
}

export default DashboardCards