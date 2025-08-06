
import {
    Target,
    Search,
    LineChart,
    MessageCircle
} from 'lucide-react';
import Link from 'next/link';

export default function Home2({ handleNavClick }) {
    const tools = [
        {
            id: 'new-post',
            title: 'New Post Generator',
            description: 'AI generates Reddit post titles based on any company website',
            icon: <Target className="w-6 h-6 stroke-gray-600" />,
            tags: ['AI', 'Reddit Posts', 'Copywriting']
        },
        {
            id: 'competitor',
            title: 'Competitor Analysis',
            description: 'Analyze where, how, and with what content competitors get traction',
            icon: <Search className="w-6 h-6 stroke-gray-600" />,
            tags: ['Brand Visibility', 'Subreddits']
        },
        {
            id: 'current',
            title: 'Check Current Retions',
            description: 'See where your brand is getting mentioned in Reddit threads',
            icon: <LineChart className="w-6 h-6 stroke-gray-600" />,
            tags: ['Brand Monitoring', 'Buzz Tracking']
        },
        {
            link: "/tools/reddit-tools?tab=reddit-comment",
            title: 'Post Commentor',
            description: 'Generate customizable comments for any thread paste',
            icon: <MessageCircle className="w-6 h-6 stroke-gray-600" />,
            tags: ['AI', 'Reddit Contents', 'Growth Analytics']
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
                <div className="absolute h-8 w-8 md:h-10 md:w-10 right-10 mb-6 sm:mb-8 bg-green-800 rounded-full flex items-center justify-center text-white font-semibold">
                    <span>P</span>
                </div>

                {/* Header */}
                <div className="text-center mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                        Hi, XYZ 👋
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-600">
                        Let's make <span className="text-[#ff4500]">Reddit</span> your growth engine!
                    </p>
                </div>

                {/* Tools Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-6 mb-8 sm:mb-12">
                    {tools.map((tool) => {
                        const cardContent = (
                            <>
                                <div className="mb-2 md:mb-2">{tool.icon}</div>
                                <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{tool.title}</h3>
                                <p className="text-[13px] font-[480] text-[#666666] mb-3 sm:mb-4">{tool.description}</p>
                                <div className="flex flex-wrap gap-1 md:gap-1">
                                    {tool.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="px-2 py-1 md:py-[2px] text-gray-700 text-xs rounded-full border border-gray-500/20"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </>
                        );

                        return tool.link ? (
                            <Link
                                key={tool.title}
                                href={tool.link}
                                className="bg-white/20 rounded-xl p-4 md:px-6 shadow-sm border border-gray-500/20 hover:border-gray-500 transition-shadow cursor-pointer block"
                            >
                                {cardContent}
                            </Link>
                        ) : (
                            <div
                                key={tool.id}
                                className="bg-white/20 rounded-xl p-4 md:px-6 shadow-sm border border-gray-500/20 hover:border-gray-500 transition-shadow cursor-pointer"
                                onClick={() => handleNavClick(tool.id)}
                            >
                                {cardContent}
                            </div>
                        );
                    })}

                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="p-4 sm:p-6 border-b border-gray-100">
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Recent Activity</h2>
                    </div>

                    {/* Mobile Card View */}
                    <div className="block sm:hidden">
                        {recentActivity.map((activity, index) => (
                            <div key={index} className="p-4 border-b border-gray-100 last:border-b-0">
                                <div className="space-y-2">
                                    <div className="font-medium text-gray-900 text-sm">{activity.url}</div>
                                    <div className="text-gray-600 text-sm">{activity.tool}</div>
                                    <div className="text-gray-500 text-xs">{activity.time}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Desktop Table View */}
                    <div className="hidden sm:block overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        URL/Domain
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Tool Used
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Last Edited
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {recentActivity.map((activity, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {activity.url}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            {activity.tool}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {activity.time}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
