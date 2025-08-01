import { Button } from "@headlessui/react";


export default function Credits({ handleNavClick }) {
    const tools = [
        {
            id: 'new-post',
            title: 'New Post Generator',
            description: 'Offer ends: 0 days: 9 hrs: 26 mins 1 secs',
            boldTitle: "Trial",
            price: "$100",
            discount: "$25",
            buttonText: "Buy 75 Credits"
        },
        {
            id: 'competitor',
            title: 'Competitor Analysis',
            description: 'Offer ends: 0 days: 9 hrs: 26 mins 1 socs',
            boldTitle: "Startup",
            price: "$200",
            discount: "$50",
            buttonText: "Buy 150 Credits"

        },
        {
            id: 'current-retions',
            title: 'Check Current Retions',
            description: 'Offer ends: 0 days 19 hrs: 26 mins 1 secs',
            boldTitle: "Serious Business",
            price: "$400",
            discount: "$100",
            buttonText: "Buy 300 Credits"

        },
        {
            id: 'post-commentor',
            title: 'Post Commentor',
            description: 'Offer ends: 0 days: 9 hrs: 26 mins 1 secs',
            boldTitle: "Growth Co",
            price: "$800",
            discount: "$200",
            buttonText: "Buy 600 Credits"

        },
        {
            id: 'post-commentor',
            title: 'Post Commentor',
            description: 'Offer ends: 0 days: 9 hrs: 26 mins 1 secs',
            boldTitle: "Business Titan",
            price: "$4000",
            discount: "$1000",
            buttonText: "Buy 2000 Credits"

        }
    ];

    const recentActivity = [
        { url: 'www.devzero.io', tool: 'New Post Generator', time: '7 hours ago' },
        { url: '-', tool: 'Competitor Analysis', time: '7 hours ago' },
        { url: 'infrasity.com', tool: 'Post Commentor', time: '7 hours ago' }
    ];

    return (
        <div className="flex-1 p-4 sm:p-6 lg:p-8 bg-gray-50">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-lrft mb-6">
                    <h1 className="text-xl font-bold text-gray-900">
                        Buy Credits
                    </h1>
                    <p className="text-md text-gray-600">
                        Out of credits? Let's get you back on track!
                    </p>
                </div>

                {/* Tools Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-6 mb-8 sm:mb-12">
                    {tools.map((tool) => (
                        <div
                            key={tool.id}
                            className="bg-white/20 rounded-xl p-4 md:px-6  shadow-sm border border-gray-500/20 hover:border-gray-500 transition-shadow cursor-pointer"
                            onClick={() => handleNavClick(tool.id)}
                        >
                            <div className="mb-2 text-2xl font-bold text-gray-900">{tool.boldTitle}</div>
                            <div className="flex items-center gap-2 mb-3 sm:mb-4">
                                <span className="text-xs line-through text-gray-500">{tool.discount}</span>
                                <span className="text-2xl font-bold text-green-600">{tool.price}</span>

                            </div>
                            <div className="flex mb-2">
                               <Button className="w-full text-black bg-gray-800/5 border border-gray-600/20 p-1 rounded-xl">{tool.buttonText}</Button>
                            </div>
                            <span className="bg-gray-600/5 px-2 py-1 md:py-[2px] text-gray-700 text-xs rounded-full border border-gray-500/20" >
                                {tool.description}
                            </span>
                            
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}