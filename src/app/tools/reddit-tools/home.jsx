
import {
    LineChart,
    MessageCircle,
    Search,
    Target
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
        <div className="min-h-screen bg-background p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="glass-card px-8 py-6 rounded-xl shadow-md mb-8 animate-fade-in">
                    <h1 className="text-3xl font-bold mb-1"><span className="gradient-text">Welcome to Reddit Tools</span> <span className="">👋</span></h1>
                    <p className="text-lg text-foreground-muted">Let's make <span className="text-reddit-orange">Reddit</span> your growth engine!</p>
                </div>

                {/* Tools Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-12">
                    {tools.map((tool) => {
                        const cardContent = (
                            <div className="flex flex-col items-start animate-fade-in">
                                <div className="mb-2 md:mb-2">{tool.icon}</div>
                                <h3 className="font-semibold text-foreground text-base mb-1">{tool.title}</h3>
                                <p className="text-sm text-foreground-muted mb-3">{tool.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {tool.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="px-2 py-1 text-xs rounded-full border border-border-muted text-foreground-muted"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        );

                        return tool.link ? (
                            <Link
                                key={tool.title}
                                href={tool.link}
                                className="glass-card rounded-xl p-6 shadow-md border border-border-muted hover:shadow-glow transition-shadow cursor-pointer block animate-fade-in"
                            >
                                {cardContent}
                            </Link>
                        ) : (
                            <div
                                key={tool.id}
                                className="glass-card rounded-xl p-6 shadow-md border border-border-muted hover:shadow-glow transition-shadow cursor-pointer animate-fade-in"
                                onClick={() => handleNavClick(tool.id)}
                            >
                                {cardContent}
                            </div>
                        );
                    })}
                </div>

                {/* Recent Activity */}
                <div className="glass-card rounded-xl shadow-md border border-border-muted mb-12 animate-fade-in">
                    <div className="p-6 border-b border-border-muted">
                        <h2 className="text-xl font-semibold text-foreground">Recent Activity</h2>
                    </div>
                    {/* Mobile Card View */}
                    <div className="block md:hidden">
                        {recentActivity.map((activity, index) => (
                            <div key={index} className="p-4 border-b border-border-muted last:border-b-0">
                                <div className="space-y-2">
                                    <div className="font-medium text-foreground text-sm">{activity.url}</div>
                                    <div className="text-foreground-muted text-sm">{activity.tool}</div>
                                    <div className="text-foreground-subtle text-xs">{activity.time}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Desktop Table View */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-background">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-foreground-muted uppercase tracking-wider">URL/Domain</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-foreground-muted uppercase tracking-wider">Tool Used</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-foreground-muted uppercase tracking-wider">Last Edited</th>
                                </tr>
                            </thead>
                            <tbody className="bg-background divide-y divide-border-muted">
                                {recentActivity.map((activity, index) => (
                                    <tr key={index} className="hover:bg-surface">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">{activity.url}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground-muted">{activity.tool}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground-subtle">{activity.time}</td>
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
